import { NextRequest } from "next/server";
import { getUser } from "@/lib/auth";
import { ROLES } from "@/lib/roles";

// ================= GET ORDERS =================
export async function GET(req: NextRequest) {
  try {
    // ✅ AUTH
    const user = await getUser();

    if (!user || user.role !== ROLES.ADMIN) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // ✅ QUERY PARAMS
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const skip = (page - 1) * limit;

    // ✅ MOCK DATA (no DB yet)
    const [orders, total] = await Promise.all([
      getAllOrders({ skip, limit }),
      getOrdersCount(),
    ]);

    return Response.json({
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
    console.error("Orders API Error:", err);

    return Response.json(
      { success: false, message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

// ================= MOCK HELPERS =================
async function getAllOrders({ skip, limit }: any) {
  return Array.from({ length: limit }, (_, i) => ({
    orderId: `order_${skip + i + 1}`,
    userId: "user_1",
    totalAmount: 999,
    status: "completed",
  }));
}

async function getOrdersCount() {
  return 100; // mock total
}