import { Facebook, Twitter, Music4 } from "lucide-react";

const FooterColumn = ({ title, children }) => (
  <div className="space-y-3">
    <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">
      {title}
    </h3>
    <div className="space-y-2 text-sm text-emerald-100/80">{children}</div>
  </div>
);

const Footer = () => {
  return (
    <footer className="relative bg-emerald-950 text-emerald-100">
      <div className="absolute inset-x-0 -top-8 mx-auto hidden h-16 max-w-5xl rounded-full bg-emerald-600/20 blur-3xl md:block" aria-hidden />

      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-16 pt-20 md:grid-cols-3 md:px-12">
        <div className="space-y-4">
          <p className="text-base font-semibold uppercase tracking-[0.3em] text-emerald-200">
            Станислав Стоянов
          </p>
          <p className="text-sm text-emerald-100/70">
            Съществуват много варианти на пасажи от Lorem Ipsum, но повечето са претърпели някаква промяна, чрез вмъкване на хумор или произволни думи.
          </p>
        </div>

        <FooterColumn title="Ресурси">
          <div>Често задавани въпроси</div>
          <div>Новини</div>
          <div>Медиен комплект</div>
          <div>Контакт</div>
        </FooterColumn>

        <FooterColumn title="Последвай ме">
          <div className="flex gap-3">
            {[Facebook, Twitter, Music4].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-900/40 transition hover:border-emerald-200/80 hover:text-white"
              >
                <Icon className="h-4 w-4" aria-hidden />
              </a>
            ))}
          </div>
          <p className="text-xs text-emerald-100/60">
            Абонирайте се за нашия бюлетин за актуализации относно събитията в общността.
          </p>
        </FooterColumn>
      </div>

      <div className="border-t border-emerald-800/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 text-xs text-emerald-200/60 md:flex-row md:items-center md:justify-between md:px-12">
          <p>� {new Date().getFullYear()} Станислав Стоянов. Всички права запазени.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-emerald-100">
              Политика на поверителност
            </a>
            <a href="#" className="hover:text-emerald-100">
              Правила
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
