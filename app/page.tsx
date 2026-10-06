"use client";

import { useEffect, useState } from "react";
import type { Listing } from "@prisma/client";
import ListingCard from "@/components/ListingCard";

const TYPES = ["", "House", "Apartment", "Condo", "Townhouse"];
const CITIES = ["", "Clarksville", "Nashville", "Charlotte", "Tampa"];

type Filters = {
  q: string;
  minPrice: string;
  maxPrice: string;
  beds: string;
  baths: string;
  type: string;
  city: string;
  sort: string;
};

const DEFAULT_FILTERS: Filters = {
  q: "",
  minPrice: "",
  maxPrice: "",
  beds: "",
  baths: "",
  type: "",
  city: "",
  sort: "newest",
};

function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="h-48 bg-slate-200" />
      <div className="space-y-2 p-4">
        <div className="h-5 w-1/3 rounded bg-slate-200" />
        <div className="h-4 w-2/3 rounded bg-slate-200" />
        <div className="h-4 w-1/2 rounded bg-slate-200" />
      </div>
    </div>
  );
}

export default function BrowsePage() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [debouncedQ, setDebouncedQ] = useState("");
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(filters.q.trim()), 350);
    return () => clearTimeout(t);
  }, [filters.q]);

  useEffect(() => {
    let cancelled = false;
    const params = new URLSearchParams();
    if (debouncedQ) params.set("q", debouncedQ);
    if (filters.minPrice) params.set("minPrice", filters.minPrice);
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
    if (filters.beds) params.set("beds", filters.beds);
    if (filters.baths) params.set("baths", filters.baths);
    if (filters.type) params.set("type", filters.type);
    if (filters.city) params.set("city", filters.city);
    params.set("sort", filters.sort);

    fetch(`/api/listings?${params.toString()}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load listings");
        return (await res.json()) as Listing[];
      })
      .then((data) => {
        if (cancelled) return;
        setListings(data);
        setError("");
      })
      .catch(() => {
        if (!cancelled) setError("Could not load listings. Please try again.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [
    debouncedQ,
    filters.minPrice,
    filters.maxPrice,
    filters.beds,
    filters.baths,
    filters.type,
    filters.city,
    filters.sort,
  ]);

  const set =
    (key: keyof Filters) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setLoading(true);
      setFilters((f) => ({ ...f, [key]: e.target.value }));
    };

  const clearFilters = () => {
    setLoading(true);
    setFilters(DEFAULT_FILTERS);
  };

  const inputCls =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-blue-600 focus:outline-none";
  const labelCls =
    "mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500";

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">
          Find your next rental
        </h1>
        <p className="mt-1 text-slate-500">
          Search houses, apartments, condos, and townhomes across the Southeast.
        </p>
      </div>

      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <input
          type="text"
          value={filters.q}
          onChange={set("q")}
          placeholder="Search by keyword, address, or city..."
          className={inputCls}
        />
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
          <div>
            <label className={labelCls}>Min price</label>
            <input
              type="number"
              min={0}
              value={filters.minPrice}
              onChange={set("minPrice")}
              placeholder="Any"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Max price</label>
            <input
              type="number"
              min={0}
              value={filters.maxPrice}
              onChange={set("maxPrice")}
              placeholder="Any"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Beds</label>
            <select value={filters.beds} onChange={set("beds")} className={inputCls}>
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Baths</label>
            <select value={filters.baths} onChange={set("baths")} className={inputCls}>
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Type</label>
            <select value={filters.type} onChange={set("type")} className={inputCls}>
              {TYPES.map((t) => (
                <option key={t} value={t}>
                  {t === "" ? "Any" : t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>City</label>
            <select value={filters.city} onChange={set("city")} className={inputCls}>
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c === "" ? "Any" : c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Sort</label>
            <select value={filters.sort} onChange={set("sort")} className={inputCls}>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </div>
        </div>
        <button
          onClick={clearFilters}
          className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          Clear all filters
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : listings.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-lg font-semibold text-slate-700">
            No rentals match your filters
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Try widening the price range or clearing the search.
          </p>
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-slate-500">
            {listings.length} {listings.length === 1 ? "rental" : "rentals"}{" "}
            found
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
