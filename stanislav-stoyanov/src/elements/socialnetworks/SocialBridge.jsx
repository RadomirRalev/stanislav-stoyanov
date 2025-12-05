import { SocialIcon } from "react-social-icons";

const SocialBridge = () => {
  const items = [
    { name: "Facebook", href: "https://www.facebook.com/stanislav.stoyanov.vazrazhdane.bg" },
    { name: "X", href: "https://x.com/Stn_Stoyanov" },
    { name: "TikTok", href: "https://www.tiktok.com/@stanislav__stoyanov" },
  ];

  return (
    <section className="relative z-10 -mt-12 bg-gradient-to-b transparent via-emerald-900 to-emerald-900 shadow-xl md:-mt-16">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-8 text-center md:flex-row md:justify-between md:gap-8 md:text-left">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-300/70">
            Последвай Станислав
          </p>
          <p className="mt-1 text-lg font-semibold text-white">
            Присъедини се към разговора и сподели своите идеи.
          </p>
        </div>
        <div className="flex gap-4">
          {items.map(({ name, href }) => (
            <SocialIcon
              key={name}
              url={href}
              title={name}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-emerald-500/50 shadow-lg transition hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-100"
              fgColor="#065f46"
              bgColor="#ffffff"
              style={{ height: 48, width: 48 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialBridge;
