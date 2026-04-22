import { db } from "@/lib/db";

// ================= TYPES =================
type OrderItemInput = {
  productId: string;
  quantity: number;
};

type ServiceResponse<T = any> =
  | { success: true; data: T }
  | { success: false; message: string };

// ================= PLACE ORDER =================
export async function placeOrder(
  userId: string,
  items: OrderItemInput[]
): Promise<ServiceResponse> {
  try {
    // ✅ Basic validation
    if (!userId) throw new Error("User ID is required");
    if (!items?.length) {
      throw new Error("Order must contain at least one item");
    }

    // 📦 Fetch products
    const productIds = items.map((i) => i.productId);

    const products = await db.product.findMany({
      where: { id: { in: productIds } },
    });

    let totalAmount = 0;

    // 🔍 Validate + calculate
    const orderItems = items.map((item) => {
      const product = products.find((p) => p.id === item.productId);

      if (!product) {
        throw new Error(`Product not found: ${item.productId}`);
      }

      if (item.quantity <= 0) {
        throw new Error("Quantity must be greater than 0");
      }

      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for ${product.name}`);
      }

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      return {
        productId: product.id,
        quantity: item.quantity,
        price: product.price,
      };
    });

    // ✅ CREATE ORDER ONLY (NO STOCK UPDATE HERE)
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

    return {
      success: true,
      data: order,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";

    console.error("🔥 placeOrder Error:", message);

    return {
      success: false,
      message,
    };
  }
}

// ================= CONFIRM PAYMENT =================
export async function confirmPayment(
  orderId: string,
  paymentId: string
): Promise<ServiceResponse> {
  try {
    const result = await db.$transaction(async (tx) => {
      const order = await tx.order.findUnique({
        where: { id: orderId },
        include: { items: true },
      });

      if (!order) throw new Error("Order not found");

      // ✅ prevent duplicate execution
      if (order.status === "PAID") {
        return order;
      }

      // ✅ update stock
      for (const item of order.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: { decrement: item.quantity },
            sold: { increment: item.quantity },
          },
        });
      }

      // ✅ mark as paid
      return tx.order.update({
        where: { id: orderId },
        data: {
          status: "PAID",
          paymentId,
          paidAt: new Date(),
        },
      });
    });

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Payment confirmation failed";

    console.error("🔥 confirmPayment Error:", message);

    return {
      success: false,
      message,
    };
  }
}

// ================= FAIL ORDER =================
export async function failOrder(
  orderId: string
): Promise<ServiceResponse> {
  try {
    const order = await db.order.update({
      where: { id: orderId },
      data: {
        status: "FAILED",
      },
    });

    return {
      success: true,
      data: order,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Order fail update error";

    console.error("🔥 failOrder Error:", message);

    return {
      success: false,
      message,
    };
  }
}