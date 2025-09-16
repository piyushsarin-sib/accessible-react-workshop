import React from "react";

export default function LandingPage() {
  return (
    <>
      <section
        className="rounded-b-3xl"
        aria-label="Workshop Introduction"
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-md">
            Build for Everyone. Build with Accessibility.
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 font-light">
            Join our hands-on workshop to learn the principles of web accessibility and create digital experiences that are inclusive for all users.
          </p>
        </div>
      </section>
      <div className="flex flex-row justify-center space-x-10">
        <img
          src="./landing-page.jpeg"
          alt="Illustration representing web accessibility"
          className="rounded-xl shadow-lg max-w-full h-64 object-cover"
        />
      <section
        className="bg-white/20 backdrop-blur-md rounded-2xl shadow-lg p-8 md:p-10"
        aria-label="Presenters"
      >
        <h1 className="flex items-center justify-center text-xl font-semibold mb-6">
          Presented by:
        </h1>
        <ul className="space-y-4 text-lg md:text-xl font-medium">
          <li className="bg-white/10 rounded-lg py-2 px-4">Piyush Sarin: Lead Frontend Engineer, Brevo</li>
          <li className="bg-white/10 rounded-lg py-2 px-4">Shambhavi Sivan: Lead Frontend Engineer, Brevo</li>
        </ul>
      </section>
      </div>
    </>
  );
}
