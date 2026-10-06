"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const TYPES = ["House", "Apartment", "Condo", "Townhouse"];

const CITY_CENTERS: Record<string, [number, number]> = {
  Clarksville: [36.5298, -87.3595],
  Nashville: [36.1627, -86.7816],
  Charlotte: [35.2271, -80.8431],
  Tampa: [27.9506, -82.4572],
};

type FormState = {
  title: string;
  description: string;
  price: string;
  beds: string;
  baths: string;
  sqft: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  propertyType: string;
  imageUrl: string;
  amenities: string;
  lat: string;
  lng: string;
};

const EMPTY: FormState = {
  title: "",
  description: "",
  price: "",
  beds: "",
  baths: "",
  sqft: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  propertyType: "House",
  imageUrl: "",
  amenities: "",
  lat: "",
  lng: "",
};

export default function NewListingPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const set =
    (key: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  function validate(): string[] {
    const errs: string[] = [];
    if (!form.title.trim()) errs.push("Title is required.");
    if (!form.description.trim()) errs.push("Description is required.");
    if (!(Number(form.price) > 0)) errs.push("Price must be greater than 0.");
    if (!Number.isInteger(Number(form.beds)) || Number(form.beds) < 0)
      errs.push("Beds must be a whole number of 0 or more.");
    if (!(Number(form.baths) > 0)) errs.push("Baths must be greater than 0.");
    if (!Number.isInteger(Number(form.sqft)) || Number(form.sqft) <= 0)
      errs.push("Square feet must be greater than 0.");
    if (!form.address.trim()) errs.push("Street address is required.");
    if (!form.city.trim()) errs.push("City is required.");
    if (!form.state.trim()) errs.push("State is required.");
    if (!form.zip.trim()) errs.push("ZIP code is required.");
    if (form.lat && (Number(form.lat) < -90 || Number(form.lat) > 90))
      errs.push("Latitude must be between -90 and 90.");
    if (form.lng && (Number(form.lng) < -180 || Number(form.lng) > 180))
      errs.push("Longitude must be between -180 and 180.");
    return errs;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (errs.length > 0) return;

    setSubmitting(true);
    const center = CITY_CENTERS[form.city.trim()] ?? [39.8283, -98.5795];

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      beds: Number(form.beds),
      baths: Number(form.baths),
      sqft: Number(form.sqft),
      address: form.address.trim(),
      city: form.city.trim(),
      state: form.state.trim(),
      zip: form.zip.trim(),
      propertyType: form.propertyType,
      imageUrl: form.imageUrl.trim() || undefined,
      amenities: form.amenities.trim(),
      lat: form.lat ? Number(form.lat) : center[0],
      lng: form.lng ? Number(form.lng) : center[1],
    };

    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors(
          data.details ?? [data.error ?? "Could not save the listing."]
        );
        setSubmitting(false);
        return;
      }
      router.push(`/listings/${data.id}`);
    } catch {
      setErrors(["Network error. Please try again."]);
      setSubmitting(false);
    }
  }

  const inputCls =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-blue-600 focus:outline-none";
  const labelCls =
    "mb-1 block text-sm font-medium text-slate-700";

  const field = (
    key: keyof FormState,
    label: string,
    type = "text",
    placeholder = ""
  ) => (
    <div>
      <label className={labelCls}>{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={set(key)}
        placeholder={placeholder}
        className={inputCls}
      />
    </div>
  );

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold text-slate-900">Add a listing</h1>
      <p className="mt-1 text-slate-500">
        Fill in the details below. Latitude and longitude are optional and
        default to the city center.
      </p>

      {errors.length > 0 && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <ul className="list-disc pl-5">
            {errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <form
        onSubmit={onSubmit}
        className="mt-6 space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        {field("title", "Title", "text", "Sunny 3BR near downtown")}
        <div>
          <label className={labelCls}>Description</label>
          <textarea
            value={form.description}
            onChange={set("description")}
            rows={4}
            placeholder="Describe the property..."
            className={inputCls}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {field("price", "Rent ($/mo)", "number")}
          {field("beds", "Bedrooms", "number")}
          {field("baths", "Bathrooms", "number")}
          {field("sqft", "Sq ft", "number")}
        </div>
        <div>
          <label className={labelCls}>Property type</label>
          <select
            value={form.propertyType}
            onChange={set("propertyType")}
            className={inputCls}
          >
            {TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        {field("address", "Street address", "text", "123 Main St")}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {field("city", "City", "text", "Nashville")}
          {field("state", "State", "text", "TN")}
          {field("zip", "ZIP", "text", "37201")}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {field("lat", "Latitude (optional)", "text", "36.1627")}
          {field("lng", "Longitude (optional)", "text", "-86.7816")}
        </div>
        {field("imageUrl", "Image URL (optional)", "text", "Leave blank for a placeholder")}
        {field(
          "amenities",
          "Amenities (comma separated)",
          "text",
          "Garage, Pool, Pet Friendly"
        )}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? "Saving..." : "Publish listing"}
        </button>
      </form>
    </div>
  );
}
