import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type SeedListing = {
  title: string;
  description: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  lat: number;
  lng: number;
  propertyType: string;
  imageUrl: string;
  amenities: string;
};

const listings: SeedListing[] = [
  {
    title: "Sunny 3BR Bungalow near Downtown",
    description:
      "Updated bungalow with refinished hardwoods, a fenced backyard, and a covered front porch. Walk to downtown shops and the riverwalk. Washer and dryer included.",
    price: 1450,
    beds: 3,
    baths: 2,
    sqft: 1400,
    address: "1230 Madison St",
    city: "Clarksville",
    state: "TN",
    zip: "37040",
    lat: 36.5312,
    lng: -87.361,
    propertyType: "House",
    imageUrl: "https://picsum.photos/seed/nest1/800/600",
    amenities: "Fenced Yard,Washer/Dryer,Covered Porch,Central A/C",
  },
  {
    title: "Modern 2BR Apartment by the River",
    description:
      "Top floor unit with vaulted ceilings, stainless appliances, and river views from the balcony. Community pool and fitness center on site. Pet friendly.",
    price: 1150,
    beds: 2,
    baths: 2,
    sqft: 980,
    address: "450 Riverside Dr Apt 2B",
    city: "Clarksville",
    state: "TN",
    zip: "37040",
    lat: 36.535,
    lng: -87.368,
    propertyType: "Apartment",
    imageUrl: "https://picsum.photos/seed/nest2/800/600",
    amenities: "Pool,Fitness Center,Balcony,Pet Friendly,Dishwasher",
  },
  {
    title: "Spacious 4BR Family Home with Big Yard",
    description:
      "Two story home in a quiet cul-de-sac. Primary suite downstairs, three bedrooms up, plus a bonus room. Huge backyard with deck, great for kids and cookouts.",
    price: 1895,
    beds: 4,
    baths: 2.5,
    sqft: 2100,
    address: "88 Peachers Mill Rd",
    city: "Clarksville",
    state: "TN",
    zip: "37042",
    lat: 36.512,
    lng: -87.335,
    propertyType: "House",
    imageUrl: "https://picsum.photos/seed/nest3/800/600",
    amenities: "Garage,Deck,Central A/C,Washer/Dryer,Fireplace",
  },
  {
    title: "East Nashville Duplex Unit",
    description:
      "Half of a well kept duplex in the heart of East Nashville. Open kitchen, original trim, private patio out back. Minutes to Five Points and Shelby Park.",
    price: 1750,
    beds: 2,
    baths: 1,
    sqft: 950,
    address: "1412 Woodland St",
    city: "Nashville",
    state: "TN",
    zip: "37206",
    lat: 36.178,
    lng: -86.751,
    propertyType: "Townhouse",
    imageUrl: "https://picsum.photos/seed/nest4/800/600",
    amenities: "Patio,Off-Street Parking,Dishwasher,Central A/C",
  },
  {
    title: "Downtown High-Rise 1BR",
    description:
      "Corner unit on the 12th floor with floor to ceiling windows and city views. Building has a rooftop deck, 24 hour concierge, and secure parking garage.",
    price: 2100,
    beds: 1,
    baths: 1,
    sqft: 780,
    address: "301 Demonbreun St Unit 1204",
    city: "Nashville",
    state: "TN",
    zip: "37201",
    lat: 36.158,
    lng: -86.775,
    propertyType: "Condo",
    imageUrl: "https://picsum.photos/seed/nest5/800/600",
    amenities: "Rooftop Deck,Concierge,Secure Parking,Gym,Elevator",
  },
  {
    title: "Quiet 3BR in Green Hills",
    description:
      "Brick ranch on a tree lined street. Renovated kitchen with quartz counters, updated baths, and a screened sunroom. Top rated school zone.",
    price: 2600,
    beds: 3,
    baths: 2,
    sqft: 1700,
    address: "4215 Granny White Pike",
    city: "Nashville",
    state: "TN",
    zip: "37204",
    lat: 36.095,
    lng: -86.805,
    propertyType: "House",
    imageUrl: "https://picsum.photos/seed/nest6/800/600",
    amenities: "Garage,Sunroom,Quartz Counters,Fenced Yard,Central A/C",
  },
  {
    title: "Uptown 2BR with Skyline View",
    description:
      "Eighth floor apartment with skyline views, quartz counters, and wood style flooring. Walk to the light rail, Romare Bearden Park, and uptown dining.",
    price: 1980,
    beds: 2,
    baths: 2,
    sqft: 1150,
    address: "333 W Trade St Apt 8C",
    city: "Charlotte",
    state: "NC",
    zip: "28202",
    lat: 35.228,
    lng: -80.846,
    propertyType: "Apartment",
    imageUrl: "https://picsum.photos/seed/nest7/800/600",
    amenities: "Skyline View,Gym,Pool,Secure Entry,Dishwasher",
  },
  {
    title: "Charming Bungalow in NoDa",
    description:
      "Arts district bungalow with original hardwoods, a big front porch, and an updated kitchen. Fenced yard with a storage shed. Walk to galleries and music venues.",
    price: 1695,
    beds: 3,
    baths: 2,
    sqft: 1350,
    address: "3221 N Davidson St",
    city: "Charlotte",
    state: "NC",
    zip: "28205",
    lat: 35.248,
    lng: -80.806,
    propertyType: "House",
    imageUrl: "https://picsum.photos/seed/nest8/800/600",
    amenities: "Front Porch,Fenced Yard,Storage Shed,Dishwasher,Central A/C",
  },
  {
    title: "New Build Townhome in South End",
    description:
      "Brand new three level townhome with a rooftop terrace, two car garage, and designer finishes throughout. Steps to the rail trail and South End breweries.",
    price: 2250,
    beds: 3,
    baths: 2.5,
    sqft: 1600,
    address: "1800 Camden Rd Unit 204",
    city: "Charlotte",
    state: "NC",
    zip: "28203",
    lat: 35.21,
    lng: -80.859,
    propertyType: "Townhouse",
    imageUrl: "https://picsum.photos/seed/nest9/800/600",
    amenities: "Rooftop Terrace,Garage,Quartz Counters,Smart Thermostat",
  },
  {
    title: "Waterfront 2BR Condo",
    description:
      "Harbour Island condo with water views from the living room and primary bedroom. Resort style pool, fitness center, and gated entry. Covered parking included.",
    price: 2400,
    beds: 2,
    baths: 2,
    sqft: 1250,
    address: "720 S Harbour Island Blvd Unit 512",
    city: "Tampa",
    state: "FL",
    zip: "33602",
    lat: 27.941,
    lng: -82.452,
    propertyType: "Condo",
    imageUrl: "https://picsum.photos/seed/nest10/800/600",
    amenities: "Water View,Resort Pool,Gym,Gated Entry,Covered Parking",
  },
  {
    title: "Cozy 2BR near Ybor City",
    description:
      "Updated Florida bungalow with tile floors, a remodeled bath, and a shady patio. Great location near Ybor City nightlife and downtown Tampa.",
    price: 1495,
    beds: 2,
    baths: 1,
    sqft: 900,
    address: "1910 N 19th St",
    city: "Tampa",
    state: "FL",
    zip: "33605",
    lat: 27.965,
    lng: -82.437,
    propertyType: "House",
    imageUrl: "https://picsum.photos/seed/nest11/800/600",
    amenities: "Patio,Tile Floors,Off-Street Parking,Central A/C",
  },
  {
    title: "Resort Style 3BR Apartment",
    description:
      "Third floor unit in a resort style community with a lazy river pool, 24 hour gym, and dog park. Open floor plan with a large lanai.",
    price: 1850,
    beds: 3,
    baths: 2,
    sqft: 1300,
    address: "5500 Cypress St Apt 310",
    city: "Tampa",
    state: "FL",
    zip: "33607",
    lat: 27.956,
    lng: -82.505,
    propertyType: "Apartment",
    imageUrl: "https://picsum.photos/seed/nest12/800/600",
    amenities: "Lazy River Pool,Gym,Dog Park,Lanai,Pet Friendly",
  },
];

async function main() {
  await prisma.listing.deleteMany();
  for (const l of listings) {
    await prisma.listing.create({ data: l });
  }
  console.log(`Seeded ${listings.length} listings`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
