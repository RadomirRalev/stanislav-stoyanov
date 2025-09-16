import { useState } from "react";

const Heading = ({ text, href = "#", isCta = false }) => (
  <a
    href={href}
    className={`text-center py-4 px-6 font-medium font-semibold uppercase text-xl tracking-wide
      ${isCta
        ? "bg-green-900 text-white hover:bg-green-800"
        : "bg-white text-green-900 hover:bg-green-50 hover:text-green-700"
      }`}
  >
    {text}
  </a>
);

const Header = () => {
  return (
    <header className="relative w-full sticky top-0 z-50">
      {/* White background is only as wide as the nav inside it */}
      <div className="absolute inset-y-0 right-0 bg-white">
        <nav className="flex">
          <Heading text="Лорем" href="#contact" />
          <Heading text="Ипсум" href="#home" />
          <Heading text="Долор" href="#about" />
          <Heading text="Сит" href="#services" />
          <Heading text="Амет" href="#contact" />
          <Heading text="Трафопост сега" href="#get-started" />
          <Heading text="Get Started" href="#get-started" isCta />
        </nav>
      </div>

      {/* Optional logo or content on the left side (transparent area) */}
      <div className="relative px-4 py-3">
        <a href="/" className="text-2xl font-bold text-blue-600 uppercase">
          MySite
        </a>
      </div>
    </header>
  );
};

export default Header;
