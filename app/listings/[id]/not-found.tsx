import Link from "next/link";

export default function ListingNotFound() {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
      <p className="text-lg font-semibold text-slate-700">Listing not found</p>
      <p className="mt-1 text-sm text-slate-500">
        This rental may have been removed.
      </p>
      <Link
        href="/"
        className="mt-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-800"
      >
        Back to all rentals
      </Link>
    </div>
  );
}
