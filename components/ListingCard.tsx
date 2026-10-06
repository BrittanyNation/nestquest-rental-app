import Image from "next/image";
import Link from "next/link";
import type { Listing } from "@prisma/client";

export default function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link
      href={`/listings/${listing.id}`}
      className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={listing.imageUrl}
          alt={listing.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700">
          {listing.propertyType}
        </span>
      </div>
      <div className="p-4">
        <p className="text-xl font-bold text-slate-900">
          ${listing.price.toLocaleString()}
          <span className="text-sm font-normal text-slate-500">/mo</span>
        </p>
        <h3 className="mt-1 truncate font-semibold text-slate-800">
          {listing.title}
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          {listing.beds} bd · {listing.baths} ba ·{" "}
          {listing.sqft.toLocaleString()} sqft
        </p>
        <p className="mt-1 truncate text-sm text-slate-500">
          {listing.address}, {listing.city}, {listing.state} {listing.zip}
        </p>
      </div>
    </Link>
  );
}
