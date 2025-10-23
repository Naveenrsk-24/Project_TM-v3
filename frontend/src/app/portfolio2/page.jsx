// src/app/portfolio/page.jsx

import PortfolioCategoryCards from "../../components/Portfolio/PortfolioCategoryCards";

// Set metadata for the page
export const metadata = {
  title: 'Photography Collections | Your Photography Studio',
  description: 'Explore our specialized photography services, including Portraits, Pre-Weddings, and Traditional Weddings.',
};

/**
 * Renders the main Portfolio Categories page.
 * The categories component handles all the visual layout and navigation.
 */
export default function PortfolioPage() {
  return (
    <div className="pt-16 pb-24">
      <PortfolioCategoryCards />
    </div>
  );
}