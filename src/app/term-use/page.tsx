"use client";
import React, { useEffect, useState } from "react";
import { getTermUse } from "@/sanity/sanity-utils";
import { TermUse } from "@/types/TermUse";
import { PortableText } from "@portabletext/react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "motion/react";

function Privacy() {
  const [termuse, setTermUse] = useState<TermUse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log("Fetching cookies...");
        const termRes = await getTermUse();
        console.log("term response:", termRes);
        // Handle if termRes is an array
        const term = Array.isArray(termRes) ? termRes[0] : termRes;
        setTermUse(term || null);
      } catch (err) {
        console.error("Error fetching term:", err);
        setError("Failed to load term.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="mt-[100px]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">Loading cookies...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-[100px]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div>
        <AuroraBackground>
              <motion.div
                initial={{ opacity: 0.0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 0.8,
                  ease: "easeInOut",
                }}
                className="container mx-auto relative flex flex-col gap-4  px-4"
              >
                <div className="max-w-[1024px]">
                  <div className="text-3xl md:text-6xl font-normal text-black leading-[1.2] max-w-[1000px]">
                   Term of Use
                  </div>
                  {/* <div className="font-extralight text-base md:text-2xl dark:text-neutral-200 py-4 max-w-[1024px]">
                  test
                  </div> */}
                </div>
              </motion.div>
            </AuroraBackground>
      <div className="max-w-6xl mx-auto px-4  py-[40px]">
        {/* term Use Section */}
        <div className="mb-6">
          {termuse ? (
            <div>
              <h2 className="text-[32px] font-semibold mb-6 text-black">
                {termuse.heading}
              </h2>
              <div className="text-gray-600 prose prose-sm max-w-none">
                {Array.isArray(termuse.description) && termuse.description.length > 0 ? (
                  <PortableText value={termuse.description} />
                ) : (
                  <p>No content available.</p>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              No Term of Use found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Privacy;