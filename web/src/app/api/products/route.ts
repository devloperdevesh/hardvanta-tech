import { esClient } from "@/lib/elasticsearch";

type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
  category: string;
  image: string;
};

function getTotal(total: number | { value: number } | undefined): number {
  if (typeof total === "number") return total;
  return total?.value ?? 0;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const query = searchParams.get("search") || "";
  const category = searchParams.get("category");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const page = Number(searchParams.get("page") || 1);
  const limit = 8;

  const from = (page - 1) * limit;

  try {
    const filters: any[] = [];

    if (category) {
      filters.push({ term: { category } });
    }

    if (minPrice || maxPrice) {
      filters.push({
        range: {
          price: {
            ...(minPrice && { gte: Number(minPrice) }),
            ...(maxPrice && { lte: Number(maxPrice) }),
          },
        },
      });
    }

    const esQuery: any = {
      bool: {
        must: [],
        filter: filters,
      },
    };

    if (query.trim()) {
      esQuery.bool.must.push({
        multi_match: {
          query,
          type: "bool_prefix",
          fields: ["name", "name._2gram", "name._3gram"],
        },
      });
    }

    const result = await esClient.search({
      index: "products",
      from,
      size: limit,
      query: esQuery,
    });

    const products: Product[] =
      result.hits?.hits?.map((hit: any) => hit._source) || [];

    const total = getTotal(result.hits?.total);

    return Response.json({
      products,
      total,
      hasMore: from + limit < total,
    });

  } catch (error: any) {
    console.error("ES Error:", error.message);

    return Response.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}