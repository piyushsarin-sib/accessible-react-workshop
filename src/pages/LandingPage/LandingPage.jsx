import React from "react";
import { FaLinkedin } from "react-icons/fa";

export default function LandingPage() {
  return (
    <div style={{ backgroundColor: 'var(--brand-mint-green-500)', padding: '30px', width: '100%', height: '100vh' }} className="space-y-10">
      <section
        className="rounded-b-3xl"
        aria-label="Workshop Introduction"
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-4xl font-extrabold mb-4 drop-shadow-md">
            Build for Everyone. Build with Accessibility.
          </h1>
          <span
            href="https://www.reactindia.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center hover:underline"
          >
            <svg
              width="50"
              height="50"
              viewBox="0 0 37 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="18.5" cy="18.5" r="18.5" fill="#0B1337"></circle>
              <path
                d="M30.7742 18.5417C30.7742 17.7432 30.3436 17.041 29.6933 16.4608C29.0427 15.8802 28.1295 15.3801 27.0436 14.9702C24.8682 14.1491 21.8964 13.6515 18.6384 13.6515C15.3804 13.6515 12.4086 14.1491 10.2332 14.9702C9.14727 15.3801 8.23405 15.8802 7.58345 16.4608C6.93323 17.041 6.50263 17.7432 6.50263 18.5417C6.50263 19.3403 6.93323 20.0425 7.58345 20.6227C8.23405 21.2033 9.14727 21.7034 10.2332 22.1133C12.4086 22.9343 15.3804 23.4319 18.6384 23.4319C21.8964 23.4319 24.8682 22.9343 27.0436 22.1133C28.1295 21.7034 29.0427 21.2033 29.6933 20.6227C30.3436 20.0425 30.7742 19.3403 30.7742 18.5417Z"
                stroke="#FBFAE0"
                strokeWidth="0.994734"
              ></path>
              <path
                d="M12.4287 29.0869C13.1156 29.4914 13.9386 29.4722 14.7666 29.2025C15.5955 28.9324 16.4891 28.3946 17.3935 27.6618C19.2052 26.1939 21.1458 23.8735 22.806 21.0542C24.4662 18.2349 25.5542 15.4124 25.9592 13.116C26.1613 11.9698 26.1982 10.9274 26.0323 10.0716C25.8666 9.21659 25.4842 8.48766 24.7973 8.08314C24.1104 7.67862 23.2874 7.69777 22.4594 7.96754C21.6305 8.2376 20.7368 8.77544 19.8325 9.50816C18.0208 10.9761 16.0802 13.2965 14.42 16.1158C12.7598 18.9351 11.6718 21.7576 11.2668 24.054C11.0647 25.2002 11.0278 26.2426 11.1937 27.0984C11.3594 27.9534 11.7418 28.6823 12.4287 29.0869Z"
                stroke="#23A278"
                strokeWidth="0.994734"
              ></path>
              <path
                d="M24.4073 29.0758C25.1079 28.6964 25.5186 27.9846 25.718 27.1385C25.9175 26.2918 25.9215 25.2529 25.7645 24.1054C25.4499 21.8065 24.4733 18.9621 22.9247 16.1027C21.3761 13.2433 19.5275 10.8712 17.7741 9.3515C16.8988 8.59293 16.0265 8.02867 15.2084 7.73309C14.3909 7.43771 13.5703 7.39275 12.8697 7.77217C12.1691 8.15158 11.7584 8.86341 11.559 9.70952C11.3596 10.5562 11.3555 11.5951 11.5125 12.7426C11.8271 15.0415 12.8038 17.8859 14.3524 20.7453C15.901 23.6047 17.7495 25.9769 19.5029 27.4965C20.3782 28.2551 21.2505 28.8193 22.0686 29.1149C22.8862 29.4103 23.7068 29.4553 24.4073 29.0758Z"
                stroke="#ED5D26"
                strokeWidth="0.994734"
              ></path>
              <ellipse
                cx="18.6209"
                cy="18.5588"
                rx="1.96015"
                ry="1.96015"
                fill="#51C9EE"
              ></ellipse>
            </svg>
          </span>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 font-light text-center">
            Join us at React India, for a hands-on workshop on <strong>Accessibility from Day One: React Development Done Right</strong>.
            Learn to build inclusive, user-friendly web experiences by applying accessibility best practices directly into your React workflow.
          </p>

        </div>
      </section>
      <div className="flex flex-row flex-wrap justify-center space-x-10">
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
            <li className="bg-white/10 rounded-lg py-2 px-4 flex items-center gap-2">
              <a
                href="https://www.linkedin.com/in/piyush-sarin/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:underline hover:text-blue-300 transition-colors"
              >
                <FaLinkedin className="text-blue-500 text-xl" />
                Piyush Sarin
              </a>
              <span>: Lead Frontend Engineer, Brevo</span>
            </li>

            <li className="bg-white/10 rounded-lg py-2 px-4 flex items-center gap-2">
              <a
                href="https://www.linkedin.com/in/shambhavi-sivan/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:underline hover:text-blue-300 transition-colors"
              >
                <FaLinkedin className="text-blue-500 text-xl" />
                Shambhavi Sivan
              </a>
              <span>: Lead Frontend Engineer, Brevo</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
