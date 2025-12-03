export const InfoText = ({ label, headline, subtext }) => (
  <div>
    <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-600/70">
      {label}
    </p>
    <h2 className="mt-3 text-3xl font-bold uppercase tracking-wide md:text-4xl">
      {headline}
    </h2>
    {subtext && <p className="mt-1 text-sm text-emerald-600/70">{subtext}</p>}
  </div>
);
