import NewsletterForm from "./NewsLetterForm";
import Quote from "./Quote";
import HeroImage from "./HeroImage";
import ContactForm from "./ContactForm";
import SocialBridge from "../socialnetworks/SocialBridge";

const TopSection = () => {
  return (
    <div>
      <HeroImage />
      <HeroOverlay
        QuoteComponent={Quote}
        UserInputComponent={ContactForm}
      />
      <SocialBridge />
    </div>
  );
};

const HeroOverlay = ({ QuoteComponent, UserInputComponent }) => {
  return (
    <section className="relative w-full text-white -mt-170">
      <div className="bg-gradient-to-b transparent via-emerald-900/35 to-emerald-900/95">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid items-center gap-10 md:grid-cols-2">
            {QuoteComponent && <QuoteComponent />}
            {UserInputComponent && (
              <div className="md:-mt-6">
                <UserInputComponent />
              </div>
            )}
          </div>
          <div className="mt-12 h-px w-full bg-gradient-to-r from-green-500/40 via-green-300/30 to-green-500/40" />
        </div>
      </div>
    </section>
  );
};

export default TopSection;
