import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { db } from "@/lib/db"; 
import { getUser, authorize } from "@/lib/auth";
import { ROLES } from "@/lib/roles";
import { z } from "zod";

// ================= SCHEMA =================
const productSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  price: z.number().positive(),
  stock: z.number().int().nonnegative().default(0),
});

// ================= AUTH =================
async function requireAdmin() {
  const user = await getUser();
  const error = authorize(user, [ROLES.ADMIN]);

  if (error) throw error;
  return user;
}

// ================= BULK IMPORT =================
export async function POST(req: NextRequest) {
  try {
    await requireAdmin();

    const buffer = await req.arrayBuffer();

    // 📄 Parse Excel
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rawData = XLSX.utils.sheet_to_json(sheet);

    if (!rawData.length) {
      return NextResponse.json(
        { success: false, message: "Empty file" },
        { status: 400 }
      );
    }

    // ✅ Validate
    const validProducts = (rawData as any[])
      .map((item) =>
        productSchema.safeParse({
          name: item.name,
          category: item.category,
          price: Number(item.price),
          stock: item.stock ? Number(item.stock) : 0,
        })
      )
      .filter((p) => p.success)
      .map((p) => p.data);

    if (validProducts.length === 0) {
      return NextResponse.json(
        { success: false, message: "No valid products found" },
        { status: 400 }
      );
    }

    // 🚀 Bulk Insert
    const result = await db.product.createMany({
      data: validProducts,
      skipDuplicates: true,
    });

    return NextResponse.json({
      success: true,
      message: "Products imported successfully",
      data: {
        inserted: result.count,
        total: rawData.length,
        skipped: rawData.length - result.count,
      },
    });

  } catch (err: any) {
    console.error("BULK_IMPORT_ERROR:", err);

    return NextResponse.json(
      {
        success: false,
        message: err.message || "Import failed",
      },
      { status: 500 }
    );
  }
}