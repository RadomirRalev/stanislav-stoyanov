import { Facebook, Twitter, Music4 } from "lucide-react";

const SocialBridge = () => {
  const items = [
    { name: "Facebook", href: "https://facebook.com", Icon: Facebook },
    { name: "X", href: "https://x.com", Icon: Twitter },
    { name: "TikTok", href: "https://www.tiktok.com", Icon: Music4 },
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
          {items.map(({ name, href, Icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-emerald-500/50 bg-white text-emerald-700 shadow-lg transition hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-100 hover:text-emerald-900"
              aria-label={name}
            >
              <Icon className="h-6 w-6" aria-hidden />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialBridge;
