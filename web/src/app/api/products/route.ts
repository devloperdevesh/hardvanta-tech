import { esClient } from "@/lib/elasticsearch";
import { authorize, getUser } from "@/lib/auth";
import { ROLES } from "@/lib/roles";

// ================= TYPES =================
type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  sold: number;
  createdBy?: string;
};

// ================= CONSTANTS =================
const DEFAULT_LIMIT = 8;
const MAX_LIMIT = 50;

// ================= HELPERS =================
function getTotal(total: number | { value: number } | undefined): number {
  return typeof total === "number" ? total : total?.value ?? 0;
}

function parseNumber(value: string | null): number | undefined {
  if (!value) return undefined;
  const num = Number(value);
  return Number.isNaN(num) ? undefined : num;
}

function buildFilters({
  category,
  minPrice,
  maxPrice,
}: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}) {
  const filters: any[] = [];

  if (category) {
    filters.push({ term: { category } });
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    filters.push({
      range: {
        price: {
          ...(minPrice !== undefined && { gte: minPrice }),
          ...(maxPrice !== undefined && { lte: maxPrice }),
        },
      },
    });
  }

  return filters;
}

// ================= GET PRODUCTS =================
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const query = searchParams.get("search")?.trim() || "";
    const category = searchParams.get("category") || undefined;
    const minPrice = parseNumber(searchParams.get("minPrice"));
    const maxPrice = parseNumber(searchParams.get("maxPrice"));

    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = Math.min(
      MAX_LIMIT,
      Math.max(1, Number(searchParams.get("limit")) || DEFAULT_LIMIT)
    );

    const from = (page - 1) * limit;

    const filters = buildFilters({ category, minPrice, maxPrice });

    const esQuery = {
      bool: {
        must: query
          ? [
              {
                multi_match: {
                  query,
                  type: "bool_prefix",
                  fields: [
                    "name",
                    "name._2gram",
                    "name._3gram",
                    "brand",
                    "category",
                  ],
                },
              },
            ]
          : [],
        filter: filters,
      },
    };

    const result = await esClient.search({
      index: "products",
      from,
      size: limit,
      query: esQuery as any, // ✅ FIX (TypeScript issue solved)
      sort: [
        {
          _score: {
            order: "desc",
          },
        },
      ],
    });

    const products: Product[] =
      result.hits?.hits?.map((hit: any) => hit._source) ?? [];

    const total = getTotal(result.hits?.total);

    return Response.json({
      success: true,
      data: {
        products,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
          hasMore: from + limit < total,
        },
      },
    });

  } catch (error: any) {
    console.error("🔥 GET Error:", error);

    return Response.json(
      { success: false, message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// ================= CREATE PRODUCT =================
export async function POST(req: Request) {
  try {
    const user = await getUser();

    authorize(user, [ROLES.ADMIN, ROLES.MEMBER]);

    const body = await req.json();

    if (!body.name || !body.price || !body.category || !body.brand) {
      return Response.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const product: Product = {
      id: Date.now(),
      name: body.name.trim(),
      brand: body.brand.trim(),
      category: body.category,
      image: body.image || "",
      price: Number(body.price),
      stock: Number(body.stock ?? 0),
      sold: 0,
      createdBy: user.id,
    };

    await esClient.index({
      index: "products",
      id: String(product.id),
      document: product,
      refresh: false,
    });

    return Response.json({
      success: true,
      data: product,
    });

  } catch (error: any) {
    console.error("🔥 POST Error:", error);

    return Response.json(
      {
        success: false,
        message: error.message || "Failed to create product",
      },
      { status: error.status || 500 }
    );
  }
}