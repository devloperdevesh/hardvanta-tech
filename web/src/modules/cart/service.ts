// ================= TYPES =================
type CartItem = {
  productId: string;
  quantity: number;
};

type Cart = {
  userId: string;
  items: CartItem[];
  updatedAt: Date;
};

// ================= STORE (In-memory) =================
const carts: Record<string, Cart> = {};

// ================= GET CART =================
export function getCart(userId: string): Cart {
  if (!userId) {
    throw new Error("User ID is required");
  }

  if (!carts[userId]) {
    carts[userId] = {
      userId,
      items: [],
      updatedAt: new Date(),
    };
  }

  return carts[userId];
}

// ================= ADD TO CART =================
export function addToCart(
  userId: string,
  productId: string,
  quantity: number
) {
  try {
    if (!userId || !productId) {
      throw new Error("Missing required fields");
    }

    if (quantity <= 0) {
      throw new Error("Quantity must be greater than 0");
    }

    const cart = getCart(userId);

    const existingItem = cart.items.find(
      (item) => item.productId === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    cart.updatedAt = new Date();

    return {
      success: true,
      data: cart,
    };

  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}

// ================= REMOVE FROM CART =================
export function removeFromCart(userId: string, productId: string) {
  try {
    const cart = getCart(userId);

    cart.items = cart.items.filter(
      (item) => item.productId !== productId
    );

    cart.updatedAt = new Date();

    return {
      success: true,
      data: cart,
    };

  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}

// ================= CLEAR CART =================
export function clearCart(userId: string) {
  carts[userId] = {
    userId,
    items: [],
    updatedAt: new Date(),
  };

  return {
    success: true,
    data: carts[userId],
  };
}