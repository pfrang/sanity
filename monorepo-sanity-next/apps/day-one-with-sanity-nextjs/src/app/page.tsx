import Link from "next/link";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/live";
import React from "react";
import Image from "next/image";
import { imgUrlFor } from "@/sanity/get-image-url";

const ASSOCIATION_QUERY = defineQuery(`*[
  _type == "association"
  && defined(slug.current)
]{_id, name, slug, date, logo, events[]->}|order(date desc)`);

export default async function IndexPage() {
  const { data: associations } = await sanityFetch({ query: ASSOCIATION_QUERY });

  associations.forEach((association) => {
    console.log("Association:", association);
  });

  return (
    <main className="flex bg-gray-100 min-h-screen flex-col p-24 gap-12">
      <h1 className="text-4xl font-bold tracking-tighter">Associations</h1>
      <ul className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {associations.map((association) => (
          <li className="bg-white p-4 rounded-lg" key={association._id}>
            <h2 className="text-xl font-semibold">{association?.name}</h2>
            <Image 
              src={association?.logo && imgUrlFor(association?.logo)?.url() || "https://placehold.co/550x310/png"}
              alt={association?.name || "Association Logo"}
              height="310"
              width="550"
            />
            <ul className="text-lg text-gray-700">
              Eventer:
              {association?.events?.map((event) => (
                <li key={event._id}>
                  <Link href={`/events/${event.slug?.current || event._id}`} className="hover:underline">
                    <p className="text-gray-600">{event.name}</p>
                    <p className="text-gray-500">
                      {event?.date ? new Date(event.date).toLocaleDateString() : "No date"}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </main>
  );
}