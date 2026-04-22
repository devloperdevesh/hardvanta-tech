import { products } from "./model";

// ================= TYPES =================
export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  sold: number; // ✅ FIXED (no optional)
};

type ServiceResponse<T = any> =
  | { success: true; data: T; message?: string }
  | { success: false; message: string };

// ================= GET ALL =================
export function getAllProducts(): Product[] {
  return products.map((p) => ({
    ...p,
    sold: p.sold ?? 0, // ✅ ensure number
  }));
}

// ================= GET (ASYNC READY) =================
export async function getProducts(): Promise<ServiceResponse<Product[]>> {
  try {
    return {
      success: true,
      data: getAllProducts(),
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch products";

    console.error("🔥 getProducts Error:", message);

    return {
      success: false,
      message,
    };
  }
}

// ================= GET BY ID =================
export async function getProductById(id: string): Promise<Product> {
  if (!id) throw new Error("Product ID is required");

  const product = products.find((p) => p.id === id);

  if (!product) {
    throw new Error(`Product not found: ${id}`);
  }

  return {
    ...product,
    sold: product.sold ?? 0, // ✅ ensure safe
  };
}

// ================= SAVE PRODUCT =================
export async function saveProduct(
  updatedProduct: Product
): Promise<Product> {
  const index = products.findIndex((p) => p.id === updatedProduct.id);

  if (index === -1) {
    throw new Error("Product not found while saving");
  }

  // ✅ immutable + safe
  const newProduct: Product = {
    ...updatedProduct,
    sold: updatedProduct.sold ?? 0,
  };

  products[index] = newProduct;

  return newProduct;
}

// ================= UPDATE STOCK =================
export async function updateProductStock(
  id: string,
  qty: number
): Promise<ServiceResponse<Product>> {
  try {
    // ✅ validation
    if (!id) throw new Error("Product ID is required");
    if (qty <= 0) throw new Error("Quantity must be greater than 0");

    const product = await getProductById(id);

    if (product.stock < qty) {
      throw new Error(
        `Not enough stock for ${product.name} (Available: ${product.stock})`
      );
    }

    // ✅ update logic
    const updatedProduct: Product = {
      ...product,
      stock: product.stock - qty,
      sold: product.sold + qty, // ✅ safe now
    };

    const savedProduct = await saveProduct(updatedProduct);

    return {
      success: true,
      data: savedProduct,
      message: "Stock updated successfully",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Stock update failed";

    console.error("🔥 updateProductStock Error:", message);

    return {
      success: false,
      message,
    };
  }
}