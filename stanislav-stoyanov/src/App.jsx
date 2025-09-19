import { useState } from "react";
import GreenQuoteSection from "./elements/GreenQuoteSection";
import Header from "./elements/header/Header";
import NewsSection from "./elements/articles/NewsSection";
import Footer from "./elements/footer/Footer";
import SocialBridge from "./elements/socialnetworks/SocialBridge";
import YouTubeShowcase from "./elements/videos/YouTubeShowcase";
import AllNewsSection from "./elements/articles/AllNewsSection";
import UpcomingEvents from "./elements/upcomingevents/UpcomingEvents";

export default function App() {
  const [showAllNews, setShowAllNews] = useState(false);

  return (
    <div className="min-h-screen w-full">
      <section
        className="relative w-full min-h-[90vh] bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}background.jpg)`,
        }}
      >
        <Header onShowAllNews={() => setShowAllNews(true)} />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40
               bg-gradient-to-b from-transparent via-teal-300/40 to-teal-600/60"
          aria-hidden="true"
        />
      </section>

      <section>
        <GreenQuoteSection />
      </section>

      <SocialBridge />

      <section>
        <NewsSection />
      </section>

      {showAllNews && <AllNewsSection onClose={() => setShowAllNews(false)} />}

      <YouTubeShowcase />

      <UpcomingEvents />

      <Footer />
    </div>
  );
}
