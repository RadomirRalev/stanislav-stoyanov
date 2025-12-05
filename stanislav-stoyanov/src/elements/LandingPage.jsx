import { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TopSection from "./top/TopSection";
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
    [searchParams, setSearchParams]
  );

  return (
    <div className="min-h-screen w-full">
      <TopSection />
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
