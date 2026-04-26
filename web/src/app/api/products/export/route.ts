import * as XLSX from "xlsx";
import { db } from "@/lib/db"; 

// ================= EXPORT PRODUCTS =================
export async function GET() {
  try {
    const products = await db.product.findMany();

    // 📄 Convert to Excel
    const worksheet = XLSX.utils.json_to_sheet(products);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

    const buffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    return new Response(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": "attachment; filename=products.xlsx",
      },
    });

  } catch (err) {
    console.error("EXPORT_PRODUCTS_ERROR:", err);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to export products",
      }),
      { status: 500 }
    );
  }
}