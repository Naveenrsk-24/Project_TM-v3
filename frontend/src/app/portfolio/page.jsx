// src/app/portfolio/page.jsx

import PortfolioCategoryCards from "../../components/Portfolio/PortfolioCategoryCards";

export const metadata = pageMeta({
title: "Portfolio",
description: "Browse TM Studios wedding, lifestyle, and portrait photography.",
path: "/portfolio",
});
/**
 * Renders the main Portfolio Categories page.
 * The categories component handles all the visual layout and navigation.
 */
export default function PortfolioPage() {
  return (
    <div>
      <PortfolioCategoryCards />
    </div>
  );
}