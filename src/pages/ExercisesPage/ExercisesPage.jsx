import React from "react";
import { Link } from "react-router-dom";

export default function ExercisesPage() {
  const demoLinks = [
    {
      to: "/playground/e-commerce",
      title: "Inaccessible eCommerce",
      desc: "E-commerce page with accessibility issues to fix",
    },
    {
      to: "/playground/card-wrapper",
      title: "Card Accessibility",
      desc: "Enhanced card components with proper accessibility",
    },
    {
      to: "/playground/product-grid",
      title: "Product Grid Accessibility",
      desc: "Improved product grid layout with accessibility in mind",
    },
    {
      to: "/playground/grid-active-descendant",
      title: "Grid keyboard navigation with active descendant",
      desc: "Simple grid layout with active descendant demo",
    },
    {
      to: "/playground/filter-menu",
      title: "Filter Menu Accessibility (popup/overlay + trigger connectivity with accessibility)",
      desc: "Improved filter menu with accessibility in mind",
    },
    {
      to: "/playground/cart-modal",
      title: "Modal (powered by Overlay) with focus trap",
      desc: "Improved Overlay modal usecase with focus trap",
    },
    {
      to: "/playground/filter-combo",
      title: "A popup multi-select listbox + active aria descendant ???",
      desc: "Improved Combo Menu variant with accessibility in mind",
    },
    {
      to: "/playground/edge-cases",
      title: "Edge Cases Accessibility",
      desc: "Improved handling of edge cases with accessibility in mind",
    },
    {
      to: "/solved/e-commerce",
      title: "Completely Accessible eCommerce",
      desc: "E-commerce page fully accessible",
    },
    // Add more demo links here as needed
  ];

  return (
    <div
      className="bg-gray-50 flex flex-col items-center justify-center p-6"
      style={{ width: "100%", minHeight: "60vh" }}
    >
      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        Let's do some hands-on Accessibility:
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {demoLinks.map((demo) => (
          <Link
            key={demo.to}
            to={demo.to}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow w-full"
          >
            <h2 className="text-2xl font-semibold text-gray-700">{demo.title}</h2>
            <p className="text-gray-600 mt-2">{demo.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
