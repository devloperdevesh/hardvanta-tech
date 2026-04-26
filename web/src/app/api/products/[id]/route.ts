import { NextRequest, NextResponse } from "next/server";
import { getESClient } from "@/lib/elasticsearch"; 
import { getUser, authorize } from "@/lib/auth";
import { ROLES } from "@/lib/roles";

// ================= DELETE PRODUCT =================
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // 🔐 AUTH
    const user = await getUser();
    const authError = authorize(user, [ROLES.ADMIN]);
    if (authError) return authError;

    // ✅ params (Next 16 async)
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Product ID required" },
        { status: 400 }
      );
    }

    // 🔎 Elastic client (safe)
    const esClient = getESClient();

    // 🗑 DELETE FROM ELASTICSEARCH (only if configured)
    if (esClient) {
      await esClient.delete({
        index: "products",
        id,
        refresh: true,
      });
    } else {
      console.warn("⚠️ Elastic not configured, skipping delete");
    }

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (err: any) {
    console.error("DELETE_PRODUCT_ERROR:", err);

    return NextResponse.json(
      {
        success: false,
        message: err.message || "Failed to delete product",
      },
      { status: 500 }
    );
  }
}