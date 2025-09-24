"use client";
import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import { getTestimonialSliderAbout } from "@/sanity/sanity-utils";
import { TestimonialSliderAbout } from "@/types/aboutPage";

function TestimonialCard() {
  const [testimonials, setTestimonials] = useState<
    { title: string; address: string; description: string; image?: string }[]
  >([]);

  useEffect(() => {
    async function fetchData() {
      const data: TestimonialSliderAbout[] = await getTestimonialSliderAbout();

      // 🔑 map SanityImage -> plain URL string
      const formatted = data.map((item) => ({
        title: item.title,
        address: item.address,
        description: item.description,
        image: (item.image as any)?.asset?.url || undefined, // safely extract url
      }));

      setTestimonials(formatted);
    }
    fetchData();
  }, []);

  if (testimonials.length === 0) {
    return <p className="text-center py-10">Loading testimonials...</p>;
  }

  return (
    <div className="w-full relative flex flex-col items-center justify-center overflow-hidden">
      <div className="flex justify-center w-full overflow-hidden px-0 sm:px-6 lg:px-8">
        <div className="w-full">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="normal"
          />
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;
