"use client" 
import React, { useState } from "react";

// ✅ Dynamic data object — easy to update or fetch from API later
const portfolioData = {
  section: {
    subtitle: "Our Photography Portfolio",
    title: "Capturing Moments That Tell Stories",
    description:
      "Explore our finest photography works — from portraits to landscapes and events — each frame crafted to capture emotions, light, and timeless beauty.",
  },
  categories: [
    { name: "All Projects", key: "all" },
    { name: "Portraits", key: "portraits" },
    { name: "Nature", key: "nature" },
    { name: "Events", key: "events" },
    { name: "Commercial", key: "commercial" },
  ],
  projects: [
    {
      id: 1,
      category: "portraits",
      title: "Elegant Portrait Session",
      image:
        "https://cdn.tailgrids.com/assets/images/marketing/portfolio/portfolio-01/image-01.jpg",
      buttonText: "View Gallery",
      buttonHref: "#",
    },
    {
      id: 2,
      category: "events",
      title: "Wedding Photography",
      image:
        "https://cdn.tailgrids.com/assets/images/marketing/portfolio/portfolio-01/image-06.jpg",
      buttonText: "View Gallery",
      buttonHref: "#",
    },
    {
      id: 3,
      category: "events",
      title: "Corporate Conference Highlights",
      image:
        "https://cdn.tailgrids.com/assets/images/marketing/portfolio/portfolio-01/image-02.jpg",
      buttonText: "View Gallery",
      buttonHref: "#",
    },
    {
      id: 4,
      category: "commercial",
      title: "Product Photography",
      image:
        "https://cdn.tailgrids.com/assets/images/marketing/portfolio/portfolio-01/image-03.jpg",
      buttonText: "View Gallery",
      buttonHref: "#",
    },
    {
      id: 5,
      category: "nature",
      title: "Landscape Photography",
      image:
        "https://cdn.tailgrids.com/assets/images/marketing/portfolio/portfolio-01/image-04.jpg",
      buttonText: "View Gallery",
      buttonHref: "#",
    },
    {
      id: 6,
      category: "events",
      title: "Fashion Show Coverage",
      image:
        "https://cdn.tailgrids.com/assets/images/marketing/portfolio/portfolio-01/image-05.jpg",
      buttonText: "View Gallery",
      buttonHref: "#",
    },
  ],
};

const PortfolioSection = () => {
  const [showCard, setShowCard] = useState("all");

  const handleProject = (category) => {
    setShowCard(category);
  };

  const { section, categories, projects } = portfolioData;

  // Filter projects dynamically
  const filteredProjects =
    showCard === "all"
      ? projects
      : projects.filter(
          (project) => project.category.toLowerCase() === showCard
        );

  return (
    <section className="pt-20 pb-12 lg:pt-[120px] lg:pb-[90px] dark:bg-dark">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[510px] text-center">
              <span className="text-primary mb-2 block text-lg font-semibold">
                {section.subtitle}
              </span>
              <h2 className="text-dark mb-3 text-3xl leading-[1.208] font-bold sm:text-4xl md:text-[40px]">
                {section.title}
              </h2>
              <p className="text-body-color text-base dark:text-dark-6">
                {section.description}
              </p>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="w-full flex flex-wrap justify-center -mx-4">
          <div className="w-full px-4">
            <ul className="flex flex-wrap justify-center mb-12 space-x-1">
              {categories.map((item) => (
                <li className="mb-1" key={item.key}>
                  <button
                    onClick={() => handleProject(item.key)}
                    className={`inline-block rounded-lg py-2 px-5 text-center text-base font-semibold transition md:py-3 lg:px-8 ${
                      showCard === item.key
                        ? "bg-primary text-white"
                        : "text-body-color dark:text-dark-6 hover:bg-primary hover:text-white"
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Portfolio Cards */}
        <div className="flex flex-wrap -mx-4">
          {filteredProjects.map((project) => (
            <PortfolioCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;

// ✅ Reusable dynamic card component
const PortfolioCard = ({ project }) => {
  const { image, category, title, buttonText, buttonHref } = project;
  return (
    <div className="w-full px-4 md:w-1/2 xl:w-1/3">
      <div className="relative mb-12">
        <div className="overflow-hidden rounded-[10px]">
          <img src={image} alt={title} className="w-full" />
        </div>
        <div className="relative z-10 mx-7 -mt-20 rounded-lg bg-white dark:bg-dark-2 py-[34px] px-3 text-center shadow-portfolio dark:shadow-box-dark">
          <span className="text-primary mb-2 block text-sm font-medium capitalize">
            {category}
          </span>
          <h3 className="text-dark dark:text-white mb-5 text-xl font-bold">
            {title}
          </h3>
          <a
            href={buttonHref}
            className="text-body-color dark:text-dark-6 hover:border-primary hover:bg-primary inline-block rounded-md border border-stroke dark:border-dark-3 py-[10px] px-7 text-sm font-medium transition hover:text-white"
          >
            {buttonText}
          </a>
        </div>
      </div>
    </div>
  );
};
