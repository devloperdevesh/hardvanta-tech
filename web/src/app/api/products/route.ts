import { NextRequest, NextResponse } from "next/server";
import { getESClient } from "@/lib/elasticsearch";
import { getUser, authorize } from "@/lib/auth";
import { ROLES } from "@/lib/roles";
import { z } from "zod";
import { db } from "@/lib/db";

// ================= SCHEMA =================
const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  brand: z.string().min(1, "Brand is required"),
  category: z.string().min(1, "Category is required"),
  price: z.number().positive("Price must be positive"),
  image: z.string().optional(),
  stock: z.number().optional(),
});

// ================= CONSTANTS =================
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;

// ================= HELPERS =================
function getPagination(params: URLSearchParams) {
  const page = Math.max(1, Number(params.get("page")) || 1);
  const limit = Math.min(
    MAX_LIMIT,
    Math.max(1, Number(params.get("limit")) || DEFAULT_LIMIT)
  );

  return {
    page,
    limit,
    from: (page - 1) * limit,
  };
}

function parseNumber(val: string | null) {
  if (!val) return undefined;
  const num = Number(val);
  return isNaN(num) ? undefined : num;
}

// ================= GET PRODUCTS =================
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const query = searchParams.get("search") || "";
    const category = searchParams.get("category") || undefined;
    const minPrice = parseNumber(searchParams.get("minPrice"));
    const maxPrice = parseNumber(searchParams.get("maxPrice"));

    const { page, limit, from } = getPagination(searchParams);

    const esClient = getESClient();

    // 🔥 ELASTIC SEARCH
    if (esClient) {
      const filters: any[] = [];

      if (category) filters.push({ term: { category } });

      if (minPrice || maxPrice) {
        filters.push({
          range: {
            price: {
              ...(minPrice && { gte: minPrice }),
              ...(maxPrice && { lte: maxPrice }),
            },
          },
        });
      }

      const result = await esClient.search({
        index: "products",
        from,
        size: limit,
        query: {
          bool: {
            must: query
              ? [
                  {
                    multi_match: {
                      query,
                      type: "bool_prefix",
                      fields: ["name", "brand", "category"],
                    },
                  },
                ]
              : [],
            filter: filters,
          },
        } as any,
      });

      const products =
        result.hits?.hits?.map((hit: any) => hit._source) ?? [];

      const total =
        typeof result.hits.total === "number"
          ? result.hits.total
          : result.hits.total?.value ?? 0;

      return NextResponse.json({
        success: true,
        data: {
          products,
          pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
          },
        },
      });
    }

    // 🧠 FALLBACK DB
    const products = await db.product.findMany({
      skip: from,
      take: limit,
      where: {
        ...(category && { category }),
        ...(query && {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { category: { contains: query, mode: "insensitive" } },
          ],
        }),
        ...(minPrice || maxPrice
          ? {
              price: {
                ...(minPrice && { gte: minPrice }),
                ...(maxPrice && { lte: maxPrice }),
              },
            }
          : {}),
      },
    });

    const total = await db.product.count();

    return NextResponse.json({
      success: true,
      data: {
        products,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
    });

  } catch (err) {
    console.error("GET_PRODUCTS_ERROR", err);

    return NextResponse.json(
      { success: false, message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// ================= CREATE PRODUCT =================
export async function POST(req: NextRequest) {
  try {
    const user = await getUser();
    const authError = authorize(user, [ROLES.ADMIN]);

    if (authError) return authError;

    const body = await req.json();
    const parsed = productSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: parsed.error.issues[0]?.message || "Invalid data",
        },
        { status: 400 }
      );
    }

    const product = {
      id: crypto.randomUUID(),
      ...parsed.data,
      sold: 0,
      createdBy: user.id,
      stock: parsed.data.stock ?? 0, // ✅ FINAL FIX
    };

    // 💾 SAVE DB
    await db.product.create({
      data: product,
    });

    // 🔎 INDEX ELASTIC
    const esClient = getESClient();
    if (esClient) {
      await esClient.index({
        index: "products",
        id: product.id,
        document: product,
        refresh: true,
      });
    }

    return NextResponse.json({
      success: true,
      data: product,
    });

  } catch (err: any) {
    console.error("CREATE_PRODUCT_ERROR", err);

    return NextResponse.json(
      {
        success: false,
        message: err.message || "Failed to create product",
      },
      { status: 500 }
    );
  }
}