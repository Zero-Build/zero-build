"use client";

import React, { useState, useEffect } from "react";
import { getProjects, getProjectsBanner } from "@/sanity/sanity-utils";
import { Project } from "@/types/Project";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { motion } from "motion/react";
import { AuroraBackground } from "@/components/ui/aurora-background";
export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const [banner, setBanner] = useState<{
    title: string;
    description: string;
  } | null>(null);

  const filteredProjects = projects.filter((project) =>
    project.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Add debugging logs
        console.log("Fetching banner data...");
        const [res, bannerRes] = await Promise.all([
          getProjects(),
          getProjectsBanner(),
        ]);

        console.log("Projects:", res);
        console.log("Banner data received:", bannerRes);

        setProjects(res);
        setBanner(bannerRes);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="pb-[40px]">
      <div className="min-h-[1px] bg-white mt-[64px]">
             <AuroraBackground>
               <motion.div
                 initial={{ opacity: 0.0, y: 40 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{
                   delay: 0.3,
                   duration: 0.8,
                   ease: "easeInOut",
                 }}
                 className="container mx-auto relative flex flex-col gap-4 px-4"
               >
                 <div className="max-w-[1024px]">
                   {/* Add loading state and fallback for banner */}
                   <div className="text-3xl md:text-6xl font-normal text-black leading-[1.2] max-w-[1000px]">
                     {loading ? (
                       <div className="h-12 md:h-20 bg-gray-200 animate-pulse rounded" />
                     ) : (
                       banner?.title || "Default Title"
                     )}
                   </div>
                   <div className="font-extralight text-base md:text-2xl dark:text-neutral-200 py-4 max-w-[1024px]">
                     {loading ? (
                       <div className="h-6 md:h-8 bg-gray-200 animate-pulse rounded mt-4" />
                     ) : (
                       banner?.description || "Default description"
                     )}
                   </div>
                 </div>
               </motion.div>
             </AuroraBackground>
           </div>

      <div className="mb-16  px-[2rem] mt-[20px] md:mt-[60px]  relative w-full">
        <div className="relative  max-w-[832px]">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-16 pl-6 py-4 border border-[#757575] focus:ring-1 rounded-full text-black bg-white h-[40px] md:h-[76px] text-base"
          />
          <span className="absolute rotate-90 right-6 top-1/2 -translate-y-1/2 text-black">
            <Search />
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6  px-[2rem]">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <div key={index} className="group">
              <div className="rounded-md overflow-hidden aspect-[4/3] bg-gray-100">
                <Link href={`/projects/${project.slug}`}>
                  {" "}
                  <Image
                    src={project.image?.asset?.url ?? "/placeholder.png"}
                    alt={project.title}
                    width={900}
                    height={500}
                    className="rounded-xl object-cover h-full"
                  />{" "}
                </Link>
              </div>
              <div className="mt-3">
                <Link href={`/projects/${project.slug}`}>
                  <h3 className="text-lg font-medium font-serif leading-snug text-black mb-[1rem] line-clamp-2">
                    {project.title}
                  </h3>
                </Link>
                <p className="text-[#757575]">{project.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No projects found.
          </p>
        )}
      </div>
    </div>
  );
}
