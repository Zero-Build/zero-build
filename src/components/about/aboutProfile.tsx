// components/AboutProfile.tsx
"use client"; // keep this if using Next.js App Router

import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface AboutProfileProps {
  profileImage?: {
    asset?: {
      url: string;
      metadata?: {
        dimensions?: {
          width: number;
          height: number;
        };
      };
    };
    alt?: string;
  };
  name?: string;
  title?: string;
  description?: string;
  bio?: string;
  contactButtonText?: string;
  contactButtonUrl?: string;
  linkedinUrl?: string;
  linkedinButtonText?: string;
}

export default function AboutProfile({
  profileImage,
  name,
  title,
  description,
  bio,
  contactButtonText,
  contactButtonUrl,
  linkedinUrl,
  linkedinButtonText,
}: AboutProfileProps) {
  return (
    <div className="pt-[0px] md:pt-[80px]">
      <div className="container mx-auto">
        <h2 className="mb-[25px]  text-[20px] md:text-[28px]  lg:text-[32px] font-serif font-medium text-gray-900 px-[16px]">
          Meet the Founder
        </h2>
      </div>
      <div className="flex flex-col md:flex-row   container mx-auto pb-[0px] md:pb-[80px] gap-8 px-[16px]">
        {/* Left Image */}
        <div className="flex-shrink-0 w-full md:w-1/3">
          <Image
            src={
              profileImage?.asset?.url ||
              "/assets/images/di-thornhill-and-policies.webp"
            }
            alt={profileImage?.alt || "Profile Image"}
            width={profileImage?.asset?.metadata?.dimensions?.width || 500}
            height={profileImage?.asset?.metadata?.dimensions?.height || 500}
            className="rounded-lg object-cover w-full h-full"
          />
        </div>

        {/* Right Text Section */}
        <div className="flex flex-col justify-start md:w-2/3">
          {name && (
            <h2 className="mb-[15px] md:mb-0 text-[20px] md:text-[40px] lg:text-[48px] font-serif font-medium text-gray-900">
              {name}
            </h2>
          )}

          {contactButtonText && contactButtonUrl && (
            <a
              href={contactButtonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-0 md:mt-[15px] gap-[15px] text-black text-[16px] md:text-[20px] px-[20px] items-center max-w-[238px] md:max-w-[280px] font-bold mb-[24px] rounded-full inline-flex leading-[100%] border border-[#757575] min-h-[44px]"
            >
              {contactButtonText} <ArrowRight />
            </a>
          )}

          {title && (
            <p className="text-black text-[14px] md:text-[20px] mb-[8px]">
              {title}
            </p>
          )}

          {(bio || description) && (
            <p className="text-gray-700 text-[14px] md:text-[16px]  mb-0 md:mb-[15px]">
              {bio || description}
            </p>
          )}

          {linkedinUrl && linkedinButtonText && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[16px] md:text-[24px] text-black hover:underline inline-flex items-center gap-[10px] mt-[15px] md:mt-[24px]"
            >
              {linkedinButtonText}
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8.98h5V24H0V8.98zM7.5 8.98h4.78v2.06h.07c.66-1.26 2.3-2.6 4.73-2.6 5.06 0 6 3.32 6 7.63V24h-5v-6.84c0-1.63-.03-3.72-2.27-3.72-2.28 0-2.63 1.78-2.63 3.6V24h-5V8.98z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
