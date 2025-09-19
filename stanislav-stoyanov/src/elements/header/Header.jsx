import { Link } from "react-router-dom";

const baseClasses =
  "text-center py-4 px-6 font-medium font-semibold uppercase text-xl tracking-wide";
const defaultClasses = "bg-white text-emerald-950 hover:bg-green-50 hover:text-green-700";
const ctaClasses = "bg-emerald-950 text-white hover:bg-green-800";

const Heading = ({ text, to, href = "#", isCta = false, onClick }) => {
  const className = `${baseClasses} ${isCta ? ctaClasses : defaultClasses}`;

  if (to) {
    return (
      <Link to={to} onClick={onClick} className={className}>
        {text}
      </Link>
    );
  }

  return (
    <a href={href} onClick={onClick} className={className}>
      {text}
    </a>
  );
};

const Header = ({ onShowAllNews }) => {
  const handleAllNewsClick = (event) => {
    if (!onShowAllNews) return;

    event.preventDefault();
    onShowAllNews();

    setTimeout(() => {
      document
        .getElementById("all-news")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  return (
    <header className="relative w-full sticky top-0 z-50">
      {/* White background is only as wide as the nav inside it */}
      <div className="absolute inset-y-0 right-0 bg-white">
        <nav className="flex">
          <Heading text="Новини" to="/news" />
          <Heading text="Лорем" href="#home" />
          <Heading text="Ипсум" href="#about" />
          <Heading text="Долор" href="#services" />
          <Heading text="Сит" href="#contact" />
          <Heading text="Амет" href="#get-started" />
          <Heading text="Get Started" href="#get-started" isCta />
        </nav>
      </div>
    </header>
  );
};

export default Header;
