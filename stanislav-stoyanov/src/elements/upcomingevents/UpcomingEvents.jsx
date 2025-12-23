import { InfoText } from "../common/InfoText";
import eventsData from "../../generated/events.json";

const DATE_FORMATTER = new Intl.DateTimeFormat("bg-BG", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

const events = Array.isArray(eventsData?.items)
  ? eventsData.items.map((event, index) => {
      const dateString =
        typeof event.date === "string" ? event.date : event.eventDate ?? null;
      const parsed = dateString ? Date.parse(dateString) : null;
      const formattedDate =
        parsed && !Number.isNaN(parsed) ? DATE_FORMATTER.format(parsed) : "";

      return {
        id: event.id ?? event.slug ?? `event-${index}`,
        title: event.title ?? "Събитие",
        date: formattedDate || dateString || "",
        time: event.time ?? "",
        location: event.location ?? "",
        url: event.url ?? "#",
      };
    })
  : [];

const UpcomingEvents = () => {
  return (
    <section className="bg-gradient-to-b from-white via-emerald-50 to-emerald-100 py-16">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <header className="max-w-3xl text-green-900">
          <InfoText label="Следете моята дейност" headline="Какво предстои?" />
        </header>

        {events.length === 0 ? (
          <div className="mt-10 rounded-md border border-emerald-200 bg-white/80 p-6 text-center text-emerald-800 shadow">
            <p className="text-base font-semibold">Няма налични събития.</p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {events.map(({ id, title, date, time, location, url }) => (
              <div key={id} className="group flex h-full cursor-default flex-col justify-between border border-emerald-200/70 bg-white/80 p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-400/80">
                <div className="space-y-3">
                  <time className="block text-xs font-semibold uppercase tracking-[0.35em] text-emerald-600/80">
                    {date}
                  </time>
                  <h3 className="text-xl font-semibold text-green-900 group-hover:text-emerald-700">
                    {title}
                  </h3>
                  {time ? (
                    <p className="text-sm font-medium text-emerald-700/80">
                      {time}
                    </p>
                  ) : null}
                  {location ? (
                    <p className="text-sm leading-relaxed text-green-800/80">
                      {location}
                    </p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingEvents;
