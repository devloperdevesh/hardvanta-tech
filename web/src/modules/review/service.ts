import { Review, Rating } from "./model";

// ================= CONSTANTS =================
const MIN_RATING = 1;
const MAX_RATING = 5;

// ================= MOCK DB =================
const reviews: Review[] = [];

// ================= TYPES =================
type ServiceResponse<T = any> =
  | { success: true; data: T; message?: string }
  | { success: false; message: string };

// ================= HELPERS =================
function validateRating(rating: number): asserts rating is Rating {
  if (rating < MIN_RATING || rating > MAX_RATING) {
    throw new Error("Rating must be between 1 and 5");
  }
}

async function findReview(productId: string, userId: string) {
  return reviews.find(
    (r) => r.productId === productId && r.userId === userId
  );
}

async function saveReview(review: Review) {
  const index = reviews.findIndex((r) => r.id === review.id);

  if (index === -1) {
    reviews.push(review);
  } else {
    reviews[index] = review;
  }

  return review;
}

async function fetchReviewsByProduct(productId: string) {
  return reviews.filter((r) => r.productId === productId);
}

async function getReviewById(id: string) {
  return reviews.find((r) => r.id === id);
}

// ================= ADD REVIEW =================
export async function addReview(data: {
  productId: string;
  userId: string;
  rating: number;
  comment?: string;
}): Promise<ServiceResponse<Review>> {
  try {
    const { productId, userId, rating, comment } = data;

    if (!productId || !userId) {
      throw new Error("Missing required fields");
    }

    validateRating(rating);

    // ❗ Prevent duplicate review
    const existing = await findReview(productId, userId);
    if (existing) {
      throw new Error("You already reviewed this product");
    }

    const review: Review = {
      id: crypto.randomUUID(),
      productId,
      userId,
      rating,
      comment: comment?.trim() || "",
      createdAt: new Date(),
      updatedAt: new Date(),
      isEdited: false,
    };

    await saveReview(review);

    return {
      success: true,
      data: review,
      message: "Review added successfully",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to add review";

    console.error("🔥 addReview Error:", message);

    return {
      success: false,
      message,
    };
  }
}

// ================= GET REVIEWS =================
export async function getReviews(
  productId: string
): Promise<ServiceResponse<{
  reviews: Review[];
  meta: { total: number; averageRating: number };
}>> {
  try {
    if (!productId) {
      throw new Error("Product ID required");
    }

    const data = await fetchReviewsByProduct(productId);

    const total = data.length;

    const avgRating =
      total > 0
        ? data.reduce((sum, r) => sum + r.rating, 0) / total
        : 0;

    return {
      success: true,
      data: {
        reviews: data,
        meta: {
          total,
          averageRating: Number(avgRating.toFixed(1)),
        },
      },
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch reviews";

    console.error("🔥 getReviews Error:", message);

    return {
      success: false,
      message,
    };
  }
}

// ================= UPDATE REVIEW =================
export async function updateReview(
  reviewId: string,
  userId: string,
  data: { rating?: number; comment?: string }
): Promise<ServiceResponse<Review>> {
  try {
    const review = await getReviewById(reviewId);

    if (!review) {
      throw new Error("Review not found");
    }

    // 🔐 Only owner
    if (review.userId !== userId) {
      throw new Error("Not allowed");
    }

    if (data.rating !== undefined) {
      validateRating(data.rating);
      review.rating = data.rating;
    }

    if (data.comment !== undefined) {
      review.comment = data.comment.trim();
    }

    review.isEdited = true;
    review.updatedAt = new Date();

    await saveReview(review);

    return {
      success: true,
      data: review,
      message: "Review updated successfully",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update review";

    console.error("🔥 updateReview Error:", message);

    return {
      success: false,
      message,
    };
  }
}