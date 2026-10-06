"use client";

import nextDynamic from "next/dynamic";

const PropertyMap = nextDynamic(() => import("@/components/PropertyMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-72 w-full items-center justify-center rounded-xl bg-slate-100 text-sm text-slate-500">
      Loading map...
    </div>
  ),
});

type Props = {
  lat: number;
  lng: number;
  title: string;
  address: string;
};

export default function MapLoader(props: Props) {
  return <PropertyMap {...props} />;
}
