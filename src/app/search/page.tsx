"use client";
import { sessionProps } from "@/types/types";
import axios from "axios";
import { Session } from "next-auth";

import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function generateMidtoneColor() {
  while (true) {
    // Generate random RGB values
    var r = Math.floor(Math.random() * 151) + 50; // Range: 50-200
    var g = Math.floor(Math.random() * 151) + 50; // Range: 50-200
    var b = Math.floor(Math.random() * 151) + 50; // Range: 50-200

    // Convert RGB to hexadecimal
    var hexColor =
      "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

    // Check if the color has enough contrast
    var luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b; // Calculate luminance
    var contrast = (Math.max(r, g, b) + Math.min(r, g, b)) / 2; // Calculate contrast

    if (contrast > 100 && contrast < 210) {
      // Adjust the contrast range as per your preference
      return hexColor;
    }
  }
}

type MyType = {
  href: string;
  icons: [
    {
      height: number;
      url: string;
      width: number;
    }
  ];
  id: string;
  name: string;
};

const Search = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { status } = useSession({
    required: true,
    });

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const session = await getSession();

      await axios
        .get("https://api.spotify.com/v1/browse/categories?limit=30", {
          headers: {
            Authorization: "Bearer " + (session as sessionProps)?.access_token,
          },
        })
        .then((e) => {
          setCategories(e.data.categories.items), setLoading(false);
          console.log(e.data);
        })
        .catch((e) => console.log("catched ", e));
    };
    fetchData();
  }, []);
  if (status === "loading" || loading) {
    return <p>Loading...</p>;
  }
  if (status === "authenticated") {
    return (
      <div className={`grid gap-6 categoriesContainer relative px-6`}>
        {categories.map((e: MyType, index) => (
          <Link
            href={`/category/${e.id}`}
            className="rounded-lg overflow-hidden relative p-4 "
            style={{ backgroundColor: `${generateMidtoneColor()}` }}
            key={index}
          >
            <div className="after:block after:pb-[100%]">
              <Image
                className="categoryImg"
                src={e.icons[0].url}
                alt="/"
                height={100}
                width={100}
              />
              <p className="text-2xl font-bold max-w-full absolute categoryText">
                {e.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    );
  }
  return <div>You have to log in first.</div>;
};

export default Search;
