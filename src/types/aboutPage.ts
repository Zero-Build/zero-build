export interface AboutPage {
  _updatedAt: any;
  _id: string;
  title: string;
  description: string;
  introContent?: any;
  mainHeading?: string;
  newBuildButtonText?: string;
  retrofitSelectorButtonText?: string;
  retrofitButtonText?: string;

  newBuildIntroText?: any;
  newBuildSummaryText?: string;
  newBuildResultText?: string;
  newBuildResultCta?: { text?: string; link?: string };
  retrofitIntroText?: string;
  retrofitContent?: any;
  retrofitSlider?: Array<{
    image: { asset?: { url: string; metadata?: { dimensions?: { width: number; height: number } } } };
    altText: string;
  }>;

  retrofitResultText?: string;
  retrofitButtonUrl?: string;

  // Profile Section
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
  profileName?: string;
  profileTitle?: string;
  profileBio?: string;
  contactButtonText?: string;
  contactButtonUrl?: string;
  linkedinUrl?: string;
  linkedinButtonText?: string;
  // Global Section
  globallyTitle?: string;
  globallyDescription?: string;
}

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

export interface TestimonialSliderAbout {
  _id: string;
  _createdAt: string;
  title: string;
  address: string;
  description: string;
  isActive: boolean;
  image?: SanityImage; 
}