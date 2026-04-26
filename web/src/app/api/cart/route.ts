import { NextRequest, NextResponse } from "next/server";
import { getUser, authorize } from "@/lib/auth";
import { ROLES } from "@/lib/roles";
import {
  addToCart,
  getCart,
  removeFromCart,
} from "@/modules/cart/service";
import { z } from "zod";

// ================= SCHEMA =================
const addSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1).optional(),
});

const updateSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1),
});

const removeSchema = z.object({
  productId: z.string(),
});

// ================= AUTH HELPER =================
async function requireUser() {
  const user = await getUser();

  const error = authorize(user, [
    ROLES.USER,
    ROLES.ADMIN,
    ROLES.MEMBER,
  ]);

  if (error) throw error;

  return user;
}

// ================= GET CART =================
export async function GET() {
  try {
    const user = await requireUser();

    const cart = await getCart(user.id);

    return NextResponse.json({
      success: true,
      data: cart,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Unauthorized" },
      { status: 401 }
    );
  }
}

// ================= ADD ITEM =================
export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();

    const body = await req.json();
    const parsed = addSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid request" },
        { status: 400 }
      );
    }

    const { productId, quantity = 1 } = parsed.data;

    const result = await addToCart(user.id, productId, quantity);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Failed to add item" },
      { status: 500 }
    );
  }
}

// ================= UPDATE QTY =================
export async function PATCH(req: NextRequest) {
  try {
    const user = await requireUser();

    const body = await req.json();
    const parsed = updateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid request" },
        { status: 400 }
      );
    }

    const { productId, quantity } = parsed.data;

    const result = await addToCart(user.id, productId, quantity);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Update failed" },
      { status: 500 }
    );
  }
}

// ================= REMOVE ITEM =================
export async function DELETE(req: NextRequest) {
  try {
    const user = await requireUser();

    const body = await req.json();
    const parsed = removeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid request" },
        { status: 400 }
      );
    }

    const { productId } = parsed.data;

    const result = await removeFromCart(user.id, productId);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Delete failed" },
      { status: 500 }
    );
  }
}