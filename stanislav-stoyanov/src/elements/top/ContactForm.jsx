import { useState } from "react";

const ContactForm = () => {
  const [status, setStatus] = useState({ state: "idle", message: "" });
  const ENDPOINT = "https://formspree.io/f/yourContactFormId";

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name")?.toString().trim();
    const email = form.get("email")?.toString().trim();
    const message = form.get("message")?.toString().trim();

    if (!name)
      return setStatus({ state: "error", message: "Име е задължително." });
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return setStatus({
        state: "error",
        message: "Моля, въведете валиден имейл.",
      });
    }
    if (!message)
      return setStatus({ state: "error", message: "Съобщението е празно." });

    setStatus({ state: "loading", message: "" });
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: form,
      });
      if (res.ok) {
        setStatus({
          state: "success",
          message: "Благодаря! Получихме съобщението.",
        });
        e.currentTarget.reset();
      } else {
        setStatus({ state: "error", message: "Грешка. Опитайте отново." });
      }
    } catch {
      setStatus({ state: "error", message: "Мрежова грешка. Опитайте пак." });
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-md p-5 backdrop-blur bg-white/85 shadow-lg ring-1 ring-black/10"
      aria-labelledby="contact-title"
    >
      <h3
        id="contact-title"
        className="font-bold text-4xl uppercase tracking-wide text-emerald-900"
      >
        Свържете се
      </h3>
      {/* <p className="mt-1 text-lg text-emerald-900">Пишете ми директно на имейл.</p> */}

      <div className="mt-4 grid gap-3 text-lg">
        <label className="block">
          <span className="text-sm font-medium text-emerald-900">Име</span>
          <input
            name="name"
            type="text"
            className="w-full border border-gray-300 px-3 py-2 text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-emerald-900">Имейл</span>
          <input
            name="email"
            type="email"
            required
            className="w-full border border-gray-300 px-3 py-2 text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-emerald-900">
            Съобщение
          </span>
          <textarea
            name="message"
            rows={4}
            className="w-full border border-gray-300 px-3 py-2 text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
        </label>

        <button
          type="submit"
          disabled={status.state === "loading"}
          className="mt-2 inline-flex items-center justify-center bg-emerald-900 px-4 py-2 font-semibold text-white hover:bg-emerald-800 disabled:opacity-60"
        >
          {status.state === "loading" ? "Изпращане..." : "Изпрати"}
        </button>

        {status.message && (
          <div
            className={
              status.state === "success"
                ? "mt-1 text-sm text-emerald-800"
                : "mt-1 text-sm text-red-700"
            }
            role={status.state === "success" ? "status" : "alert"}
          >
            {status.message}
          </div>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
