const Heading = ({ text, href = "#", isCta = false }) => (
  <a
    href={href}
    className={`text-center py-4 px-6 font-medium font-semibold uppercase text-xl tracking-wide
      ${isCta
        ? "bg-emerald-950 text-white hover:bg-green-800"
        : "bg-white text-emerald-950 hover:bg-green-50 hover:text-green-700"
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
          <Heading text="??????" href="#all-news" />
          <Heading text="Ипсум" href="#home" />
          <Heading text="Долор" href="#about" />
          <Heading text="Сит" href="#services" />
          <Heading text="??????" href="#contact" />
          <Heading text="Трафопост сега" href="#get-started" />
          <Heading text="Get Started" href="#get-started" isCta />
        </nav>
      </div>  
    </header>
  );
};

export default Header;
