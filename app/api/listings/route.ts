import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const VALID_TYPES = ["House", "Apartment", "Condo", "Townhouse"];
const VALID_SORTS = ["price-asc", "price-desc", "newest"];

function parseNumber(value: string | null): number | undefined {
  if (value === null || value === "") return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;

  const q = sp.get("q")?.trim() || undefined;
  const minPrice = parseNumber(sp.get("minPrice"));
  const maxPrice = parseNumber(sp.get("maxPrice"));
  const beds = parseNumber(sp.get("beds"));
  const baths = parseNumber(sp.get("baths"));
  const type = sp.get("type")?.trim() || undefined;
  const city = sp.get("city")?.trim() || undefined;
  const sort = sp.get("sort") || "newest";

  const where = {
    available: true,
    ...(q
      ? {
          OR: [
            { title: { contains: q } },
            { address: { contains: q } },
            { city: { contains: q } },
          ],
        }
      : {}),
    ...(minPrice !== undefined || maxPrice !== undefined
      ? {
          price: {
            ...(minPrice !== undefined ? { gte: minPrice } : {}),
            ...(maxPrice !== undefined ? { lte: maxPrice } : {}),
          },
        }
      : {}),
    ...(beds !== undefined ? { beds: { gte: beds } } : {}),
    ...(baths !== undefined ? { baths: { gte: baths } } : {}),
    ...(type && VALID_TYPES.includes(type) ? { propertyType: type } : {}),
    ...(city ? { city: { contains: city } } : {}),
  };

  const orderBy =
    sort === "price-asc"
      ? { price: "asc" as const }
      : sort === "price-desc"
        ? { price: "desc" as const }
        : { createdAt: "desc" as const };

  if (!VALID_SORTS.includes(sort)) {
    return NextResponse.json(
      { error: "Invalid sort. Use price-asc, price-desc, or newest." },
      { status: 400 }
    );
  }

  const listings = await prisma.listing.findMany({ where, orderBy });
  return NextResponse.json(listings);
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const b = body as Record<string, unknown>;
  const errors: string[] = [];

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const num = (v: unknown) =>
    typeof v === "number" && Number.isFinite(v) ? v : NaN;

  const title = str(b.title);
  const price = num(b.price);
  const beds = num(b.beds);
  const baths = num(b.baths);
  const sqft = num(b.sqft);
  const address = str(b.address);
  const city = str(b.city);
  const state = str(b.state);
  const zip = str(b.zip);
  const propertyType = str(b.propertyType);
  const description = str(b.description);
  const lat = num(b.lat);
  const lng = num(b.lng);

  if (!title) errors.push("title is required");
  if (!Number.isInteger(price) || price <= 0)
    errors.push("price must be a positive whole number");
  if (!Number.isInteger(beds) || beds < 0)
    errors.push("beds must be a whole number of 0 or more");
  if (!(baths > 0)) errors.push("baths must be greater than 0");
  if (!Number.isInteger(sqft) || sqft <= 0)
    errors.push("sqft must be a positive whole number");
  if (!address) errors.push("address is required");
  if (!city) errors.push("city is required");
  if (!state) errors.push("state is required");
  if (!zip) errors.push("zip is required");
  if (!VALID_TYPES.includes(propertyType))
    errors.push(`propertyType must be one of: ${VALID_TYPES.join(", ")}`);
  if (!description) errors.push("description is required");
  if (!Number.isFinite(lat) || lat < -90 || lat > 90)
    errors.push("lat must be between -90 and 90");
  if (!Number.isFinite(lng) || lng < -180 || lng > 180)
    errors.push("lng must be between -180 and 180");

  if (errors.length > 0) {
    return NextResponse.json({ error: "Validation failed", details: errors }, { status: 400 });
  }

  const imageUrl =
    str(b.imageUrl) ||
    `https://picsum.photos/seed/nest${Date.now()}/800/600`;
  const amenities = str(b.amenities);

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      price,
      beds,
      baths,
      sqft,
      address,
      city,
      state,
      zip,
      lat,
      lng,
      propertyType,
      imageUrl,
      amenities,
    },
  });

  return NextResponse.json(listing, { status: 201 });
}
