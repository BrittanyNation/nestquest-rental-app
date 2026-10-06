import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import MapLoader from "@/components/MapLoader";

export const dynamic = "force-dynamic";

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = await prisma.listing.findUnique({
    where: { id: Number(id) },
  });

  if (!listing) notFound();

  const amenities = listing.amenities
    .split(",")
    .map((a) => a.trim())
    .filter(Boolean);

  return (
    <div>
      <Link
        href="/"
        className="mb-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-800"
      >
        Back to all rentals
      </Link>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="relative h-72 w-full sm:h-96">
          <Image
            src={listing.imageUrl}
            alt={listing.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700">
            {listing.propertyType}
          </span>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {listing.title}
              </h1>
              <p className="mt-1 text-slate-500">
                {listing.address}, {listing.city}, {listing.state}{" "}
                {listing.zip}
              </p>
            </div>
            <p className="text-3xl font-bold text-blue-700">
              ${listing.price.toLocaleString()}
              <span className="text-base font-normal text-slate-500">/mo</span>
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              ["Bedrooms", String(listing.beds)],
              ["Bathrooms", String(listing.baths)],
              ["Square feet", listing.sqft.toLocaleString()],
              ["Type", listing.propertyType],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-lg bg-slate-50 p-4 text-center"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {label}
                </p>
                <p className="mt-1 text-lg font-bold text-slate-900">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-slate-900">
              About this rental
            </h2>
            <p className="mt-2 leading-relaxed text-slate-600">
              {listing.description}
            </p>
          </div>

          {amenities.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-slate-900">Amenities</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {amenities.map((a) => (
                  <span
                    key={a}
                    className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6">
            <h2 className="mb-2 text-lg font-semibold text-slate-900">
              Location
            </h2>
            <MapLoader
              lat={listing.lat}
              lng={listing.lng}
              title={listing.title}
              address={listing.address}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
