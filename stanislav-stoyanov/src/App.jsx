import GreenQuoteSection from "./elements/GreenQuoteSection";
import Header from "./elements/Header";
import NewsletterForm from "./elements/NewsLetterForm";
import SocialNetworkIcons from "./elements/SocialNetworkIcons";
import { motion } from "motion/react";
import PromoVideoSection from "./elements/PromoVideoSection";
import NewsSection from "./elements/NewsSection";

export default function App() {
  return (
    <div className="min-h-screen w-full">
      <section
        className="relative w-full min-h-[90vh] bg-cover bg-top bg-no-repeat"
        style={{ backgroundImage: "url('/background.jpg')" }}
      >
        <Header />
        {/* <div className="absolute top-1/3 right-40 -translate-y-1/2 z-10 w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, x: 200 }} // start fully right and invisible
            animate={{ opacity: 1, x: 0 }} // slide into place, fade in
            transition={{ duration: 1.4, easing: "ease-out" }} // slow & smooth
          >
            <NewsletterForm />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 200 }} // start fully right and invisible
            animate={{ opacity: 1, x: 0 }} // slide into place, fade in
            transition={{ duration: 1.4, easing: "ease-out" }} // slow & smooth
          >
            <SocialNetworkIcons />
          </motion.div>
        </div> */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40
               bg-gradient-to-b from-transparent to-green-900/50"
          aria-hidden="true"
        />
      </section>

      <section>
        <GreenQuoteSection />
        {/* <PromoVideoSection
          title="A Plan That Works For Everyone"
          blurb="Watch this short message outlining our priorities for safer neighborhoods, better schools, and a stronger local economy."
          youtubeId="PROMO_VIDEO_ID"
          fullUrl="https://www.youtube.com/watch?v=PROMO_VIDEO_ID"
        /> */}
        <NewsSection />
      </section>
    </div>
  );
}
