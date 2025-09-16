import GreenQuoteSection from "./elements/GreenQuoteSection";
import Header from "./elements/Header";
import NewsSection from "./elements/NewsSection";
import Footer from "./elements/Footer";
import SocialBridge from "./elements/SocialBridge";

export default function App() {
  return (
    <div className="min-h-screen w-full">
      <section
        className="relative w-full min-h-[90vh] bg-cover bg-top bg-no-repeat"
        style={{ backgroundImage: "url('/background.jpg')" }}
      >
        <Header />
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

      <Footer />
    </div>
  );
}
