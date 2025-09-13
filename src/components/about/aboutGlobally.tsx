"use client";
import React, { useEffect, useState } from "react";
import { getAbout } from "@/sanity/sanity-utils";
import { AboutPage } from "@/types/aboutPage";

function AboutGloballyCard() {
  const [aboutPage, setAboutPage] = useState<AboutPage | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const aboutPageData: AboutPage[] = await getAbout();
        setAboutPage(aboutPageData?.[0] || null);
      } catch (error) {
        console.error("Error fetching About page data:", error);
      }
    };

    fetchData();
  }, []);

  if (!aboutPage) return null; 

  return (
    <div className="w-full relative flex flex-col items-center justify-center overflow-hidden max-w-[920px] px-[16px] mt-[20px] md:mt-0">
      <div className="flex justify-center w-full overflow-hidden px-0 sm:px-6 lg:px-8 mb-[50px]">
        <div className="w-full">
          <h2 className="text-black font-semibold text-[20px] md:text-[32px] mb-[10px]">
            {aboutPage.globallyTitle}
          </h2>
          <p className="text-black text-[14px] md:text-[16px]">
            {aboutPage.globallyDescription}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutGloballyCard;
