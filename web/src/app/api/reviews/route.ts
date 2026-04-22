import { addReview, getReviews } from "@/modules/review/service";
import { authorize, getUser } from "@/lib/auth"; // ✅ FIXED
import { ROLES } from "@/lib/roles";

// ================= CREATE REVIEW =================
export async function POST(req: Request) {
  try {
    const user = await getUser();

    if (!user) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    authorize(user, [ROLES.USER, ROLES.ADMIN, ROLES.MEMBER]);

    const body = await req.json();

    const { productId, rating, comment } = body;

    // ✅ Validation
    if (!productId) {
      return Response.json(
        { success: false, message: "Product ID is required" },
        { status: 400 }
      );
    }

    if (!rating || rating < 1 || rating > 5) {
      return Response.json(
        { success: false, message: "Rating must be 1–5" },
        { status: 400 }
      );
    }

    const result = await addReview({
      productId,
      rating: Number(rating),
      comment: comment || "",
      userId: user.id,
    });

    return Response.json(result, {
      status: result.success ? 201 : 400,
    });

  } catch (error: any) {
    console.error("🔥 POST /reviews Error:", error);

    return Response.json(
      {
        success: false,
        message: error.message || "Internal server error",
      },
      { status: error.status || 500 }
    );
  }
}

// ================= GET REVIEWS =================
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return Response.json(
        { success: false, message: "Product ID is required" },
        { status: 400 }
      );
    }

    const result = await getReviews(productId);

    return Response.json(result, {
      status: result.success ? 200 : 400,
    });

  } catch (error) {
    console.error("🔥 GET /reviews Error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch reviews",
      },
      { status: 500 }
    );
  }
}