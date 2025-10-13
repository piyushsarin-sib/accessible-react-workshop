import React from "react";

const Footer = () => (
  <footer
    className="bg-gray-800 text-white py-10 rounded-t-3xl sticky bottom-0 z-50"
    role="contentinfo"
    style={{ backgroundColor: "var(--brand-forest-green-950)", height: "50px" }}
  >
    <div className="container mx-auto px-4 text-center text-sm">
      <p>&copy;Brevo 2025, Web Accessibility Workshop at React India by Brevo. All Rights Reserved by Brevo.</p>
    </div>
  </footer>
);

export default Footer;