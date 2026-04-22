import { getUser, authorize } from "@/lib/auth";
import { ROLES } from "@/lib/roles";
import {
  addToCart,
  getCart,
  removeFromCart,
} from "@/modules/cart/service";

// ================= GET CART =================
export async function GET() {
  try {
    const user = await getUser();

    authorize(user, [ROLES.USER, ROLES.ADMIN, ROLES.MEMBER]);

    const cart = await getCart(user.id); // ✅ await added

    return Response.json({
      success: true,
      data: cart,
    });

  } catch (err: any) {
    return Response.json(
      { success: false, message: err.message || "Unauthorized" },
      { status: 401 }
    );
  }
}

// ================= ADD ITEM =================
export async function POST(req: Request) {
  try {
    const user = await getUser();

    authorize(user, [ROLES.USER, ROLES.ADMIN, ROLES.MEMBER]);

    const body = await req.json();

    if (!body.productId) {
      return Response.json(
        { success: false, message: "Product ID required" },
        { status: 400 }
      );
    }

    const result = await addToCart(
      user.id,
      body.productId,
      Number(body.quantity || 1)
    );

    return Response.json(result);

  } catch (err: any) {
    return Response.json(
      { success: false, message: err.message || "Failed to add item" },
      { status: 400 }
    );
  }
}

// ================= UPDATE QTY =================
export async function PATCH(req: Request) {
  try {
    const user = await getUser();

    authorize(user, [ROLES.USER, ROLES.ADMIN, ROLES.MEMBER]);

    const { productId, quantity } = await req.json();

    if (!productId || !quantity) {
      return Response.json(
        { success: false, message: "Invalid data" },
        { status: 400 }
      );
    }

    const result = await addToCart(user.id, productId, Number(quantity));

    return Response.json(result);

  } catch (err: any) {
    return Response.json(
      { success: false, message: err.message || "Update failed" },
      { status: 400 }
    );
  }
}

// ================= REMOVE =================
export async function DELETE(req: Request) {
  try {
    const user = await getUser();

    authorize(user, [ROLES.USER, ROLES.ADMIN, ROLES.MEMBER]);

    const { productId } = await req.json();

    if (!productId) {
      return Response.json(
        { success: false, message: "Product ID required" },
        { status: 400 }
      );
    }

    const result = await removeFromCart(user.id, productId);

    return Response.json(result);

  } catch (err: any) {
    return Response.json(
      { success: false, message: err.message || "Delete failed" },
      { status: 400 }
    );
  }
}