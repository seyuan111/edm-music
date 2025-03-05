import React from "react";

const Banner = () => {
  // Random sentence for the banner
  const randomSentence =
    "Discover the latest hits and enjoy uninterrupted music streaming on Diesel FM all day long!";

  return (
    <div className="w-full overflow-hidden bg-black text-red-200 py-1">
      <div className="inline-block whitespace-nowrap animate-marquee">
        <span className="text-sm md:text-base">{randomSentence}</span>
      </div>
    </div>
  );
};

export default Banner;

// Add this custom CSS in your global styles (e.g., index.css or a separate CSS file)
const styles = `
  @keyframes marquee {
    0% {
      transform: translateX(100%); /* Start from the right side (off-screen) */
    }
    100% {
      transform: translateX(-100%); /* Move to the left side (off-screen) */
    }
  }

  .animate-marquee {
    animation: marquee 15s linear infinite; /* Slides right to left continuously */
  }

  /* Accessibility: Pause animation for users who prefer reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .animate-marquee {
      animation: none;
    }
  }
`;

// If you're using a CSS-in-JS solution or need to add the styles inline, you can add this to your app:
<style>{styles}</style>;