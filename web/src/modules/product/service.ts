import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

// ================= TYPES =================
type Product = Prisma.ProductGetPayload<{}>;

type ServiceResponse<T> =
  | { success: true; data: T; message?: string }
  | { success: false; message: string };

// ================= GET ALL =================
export async function getAllProducts(): Promise<Product[]> {
  return db.product.findMany({
    orderBy: { createdAt: "desc" },
  });
}

// ================= GET FILTERED =================
export async function getFilteredProducts(query: {
  search?: string;
  category?: string;
}): Promise<Product[]> {
  const { search, category } = query;

  const where: Prisma.ProductWhereInput = {
    AND: [
      search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { category: { contains: search, mode: "insensitive" } },
            ],
          }
        : {},
      category ? { category } : {},
    ],
  };

  return db.product.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
}

// ================= GET PRODUCTS =================
export async function getProducts(): Promise<ServiceResponse<Product[]>> {
  try {
    const data = await getAllProducts();

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("🔥 getProducts Error:", error);

    return {
      success: false,
      message: "Failed to fetch products",
    };
  }
}

// ================= GET BY ID =================
export async function getProductById(id: string): Promise<Product> {
  if (!id) throw new Error("Product ID is required");

  const product = await db.product.findUnique({
    where: { id },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
}

// ================= UPDATE PRODUCT =================
export async function updateProduct(
  id: string,
  data: Partial<Prisma.ProductUpdateInput>
): Promise<Product> {
  if (!id) throw new Error("Product ID is required");

  return db.product.update({
    where: { id },
    data,
  });
}

// ================= DELETE PRODUCT =================
export async function deleteProduct(id: string): Promise<Product> {
  if (!id) throw new Error("Product ID is required");

  return db.product.delete({
    where: { id },
  });
}

// ================= UPDATE STOCK =================
export async function updateProductStock(
  id: string,
  qty: number
): Promise<ServiceResponse<Product>> {
  try {
    if (!id) throw new Error("Product ID is required");
    if (qty <= 0) throw new Error("Quantity must be greater than 0");

    // 🔒 Atomic safe update (no race condition)
    const updated = await db.product.update({
      where: {
        id,
      },
      data: {
        stock: { decrement: qty },
        sold: { increment: qty },
      },
    });

    return {
      success: true,
      data: updated,
      message: "Stock updated successfully",
    };
  } catch (error) {
    console.error("🔥 updateProductStock Error:", error);

    return {
      success: false,
      message: "Stock update failed",
    };
  }
}