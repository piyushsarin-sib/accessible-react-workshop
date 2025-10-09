import React from "react";
import { Link } from "react-router-dom";

export default function ExercisesPage() {
  const demoLinks = [
    {
      to: "/demos/vertical-lists",
      title: "Vertical List Example",
      desc: "Accessible vertical list component demo",
    },
    {
      to: "/demos/horizontal-lists",
      title: "Horizontal List Example",
      desc: "Accessible horizontal list component demo",
    },
    {
      to: "/demos/single-select",
      title: "Single Selection Example",
      desc: "Accessible single selection list demo",
    },
    {
      to: "/demos/multi-select",
      title: "Multi Selection Example",
      desc: "Accessible multi selection list demo",
    },
    {
      to: "/demos/menu-skeleton",
      title: "Uncontrolled Menu Example",
      desc: "Accessible uncontrolled menu demo",
    },
    {
      to: "/demos/expansion",
      title: "Collapsible Tree Example",
      desc: "Accessible collapsible tree demo",
    },
    {
      to: "/demos/key-nav/roving-index",
      title: "Roving Index Example",
      desc: "Accessible roving tabindex demo",
    },
    {
      to: "/demos/overlay/menu",
      title: "Menu With Overlay",
      desc: "Accessible menu with overlay demo",
    },
    {
      to: "/demos/overlay/modal",
      title: "Modal Example",
      desc: "Accessible modal dialog demo",
    },
    {
      to: "/demos/overlay/tooltip",
      title: "Simple Tooltip",
      desc: "Accessible tooltip component demo",
    },
  ];

  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center p-6" style={{ width: "100%", minHeight: "60vh" }}>
      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        Let's share some theories on Accessibility:
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
