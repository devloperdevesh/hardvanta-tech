import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db"; // ✅ FIXED
import { getUser, authorize } from "@/lib/auth";
import { ROLES } from "@/lib/roles";
import { z } from "zod";
import { OrderStatus } from "@prisma/client";

// ================= SCHEMA =================
const updateSchema = z.object({
  id: z.string(),
  status: z.enum(["PLACED", "SHIPPED", "DELIVERED"]),
});

// ================= AUTH =================
async function requireAdmin() {
  const user = await getUser();
  const error = authorize(user, [ROLES.ADMIN]);

  if (error) throw error;
  return user;
}

// ================= GET ORDERS =================
export async function GET(req: NextRequest) {
  try {
    await requireAdmin();

    const { searchParams } = new URL(req.url);

    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = Math.min(
      50,
      Math.max(1, Number(searchParams.get("limit")) || 10)
    );

    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      db.order.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      db.order.count(),
    ]);

    return NextResponse.json({
      success: true,
      data: orders,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });

  } catch (err: any) {
    console.error("GET_ORDERS_ERROR:", err);

    return NextResponse.json(
      { success: false, message: err.message || "Unauthorized" },
      { status: 401 }
    );
  }
}

// ================= UPDATE ORDER =================
export async function PATCH(req: NextRequest) {
  try {
    await requireAdmin();

    const body = await req.json();
    const parsed = updateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid request" },
        { status: 400 }
      );
    }

    const { id, status } = parsed.data;

    const updated = await db.order.update({
      where: { id },
      data: {
        status: status as OrderStatus, // ✅ Prisma enum match
      },
    });

    return NextResponse.json({
      success: true,
      data: updated,
    });

  } catch (err: any) {
    console.error("UPDATE_ORDER_ERROR:", err);

    return NextResponse.json(
      { success: false, message: err.message || "Update failed" },
      { status: 500 }
    );
  }
}