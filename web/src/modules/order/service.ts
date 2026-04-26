import { db } from "@/lib/db";

// ================= TYPES =================
type OrderItemInput = {
  productId: string;
  quantity: number;
};

type ServiceResponse<T = any> =
  | { success: true; data: T }
  | { success: false; message: string };

// ================= HELPERS =================
function assert(condition: any, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

// ================= PLACE ORDER =================
export async function placeOrder(
  userId: string,
  items: OrderItemInput[]
): Promise<ServiceResponse> {
  try {
    // 🔐 VALIDATION
    assert(userId, "User ID is required");
    assert(items?.length > 0, "Order must contain at least one item");

    const productIds = items.map((i) => i.productId);

    // ⚡ FETCH PRODUCTS (single query)
    const products = await db.product.findMany({
      where: { id: { in: productIds } },
    });

    // 🧠 MAP for O(1) lookup
    const productMap = new Map(products.map((p) => [p.id, p]));

    let totalAmount = 0;

    const orderItems = items.map((item) => {
      const product = productMap.get(item.productId);

      assert(product, `Product not found: ${item.productId}`);
      assert(item.quantity > 0, "Quantity must be greater than 0");
      assert(
        product.stock >= item.quantity,
        `Insufficient stock for ${product.name}`
      );

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      return {
        productId: product.id,
        quantity: item.quantity,
        price: product.price,
      };
    });

    // 🧾 CREATE ORDER
    const order = await db.order.create({
      data: {
        userId,
        total: totalAmount,
        status: "PENDING",
        items: {
          create: orderItems,
        },
      },
      include: { items: true },
    });

    return { success: true, data: order };

  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";

    console.error("🔥 placeOrder Error:", message);

    return { success: false, message };
  }
}

// ================= CONFIRM PAYMENT =================
export async function confirmPayment(
  orderId: string,
  paymentId: string
): Promise<ServiceResponse> {
  try {
    assert(orderId, "Order ID required");
    assert(paymentId, "Payment ID required");

    const result = await db.$transaction(async (tx) => {
      const order = await tx.order.findUnique({
        where: { id: orderId },
        include: { items: true },
      });

      assert(order, "Order not found");

      // ⚠️ idempotency (important in production)
      if (order.status === "PAID") {
        return order;
      }

      // 📉 STOCK UPDATE (safe)
      for (const item of order.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: { decrement: item.quantity },
            sold: { increment: item.quantity },
          },
        });
      }

      // 💰 MARK PAID
      return tx.order.update({
        where: { id: orderId },
        data: {
          status: "PAID",
          paymentId,
          paidAt: new Date(),
        },
      });
    });

    return { success: true, data: result };

  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Payment confirmation failed";

    console.error("🔥 confirmPayment Error:", message);

    return { success: false, message };
  }
}

// ================= FAIL ORDER =================
export async function failOrder(
  orderId: string
): Promise<ServiceResponse> {
  try {
    assert(orderId, "Order ID required");

    const order = await db.order.update({
      where: { id: orderId },
      data: {
        status: "FAILED",
      },
    });

    return { success: true, data: order };

  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Order fail update error";

    console.error("🔥 failOrder Error:", message);

    return { success: false, message };
  }
}