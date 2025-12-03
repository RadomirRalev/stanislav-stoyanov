import { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "./header/Header";
import GreenQuoteSection from "./header/GreenQuoteSection";
import SocialBridge from "./socialnetworks/SocialBridge";
import NewsSection from "./articles/NewsSection";
import YouTubeShowcase from "./videos/YouTubeShowcase";
import UpcomingEvents from "./upcomingevents/UpcomingEvents";
import Footer from "./footer/Footer";

const LandingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showAllNews, setShowAllNews] = useState(false);
  const activeArticleSlug = searchParams.get("article");

  const handleActiveSlugChange = useCallback(
    (slug) => {
      const nextParams = new URLSearchParams(searchParams.toString());
      if (slug) {
        nextParams.set("article", slug);
        setSearchParams(nextParams, { replace: false });
      } else {
        nextParams.delete("article");
        setSearchParams(nextParams, { replace: true });
      }
    },
    [searchParams, setSearchParams],
  );

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
      <GreenQuoteSection />
      <SocialBridge />
      <NewsSection
        showBackLink={false}
        initialSlug={activeArticleSlug}
        onActiveSlugChange={handleActiveSlugChange}
      />
      {showAllNews && <AllNewsSection onClose={() => setShowAllNews(false)} />}
      <YouTubeShowcase />
      <UpcomingEvents />
      <Footer />
    </div>
  );
};

export default LandingPage;
