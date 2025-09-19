import { useState } from "react";
import EnterAnimation from "../animation/Animation";
import { motion } from "motion/react";

const NewsletterForm = () => {
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const ENDPOINT = "https://formspree.io/f/yourFormId";

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email")?.toString().trim();
    const name = form.get("name")?.toString().trim();
    const consent = form.get("consent");

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus({ state: "error", message: "Please enter a valid email." });
      return;
    }
    if (!consent) {
      setStatus({
        state: "error",
        message: "Please confirm consent to receive emails.",
      });
      return;
    }

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
          message: "Thanks! Check your inbox to confirm.",
        });
        e.currentTarget.reset();
      } else {
        setStatus({
          state: "error",
          message: "Something went wrong. Please try again.",
        });
      }
    } catch {
      setStatus({
        state: "error",
        message: "Network error. Please try again.",
      });
    }
  };

  return (
      <form
        onSubmit={onSubmit}
        className="backdrop-blur bg-white/85 shadow-lg ring-1 ring-black/10 p-5 w-full max-w-md"
        aria-labelledby="newsletter-title"
      >
        <h3
          id="newsletter-title"
          className="font-medium text-4xl font-bold text-emerald-900 uppercase tracking-wide"
        >
          Бюлетин
        </h3>
        <p className="mt-1 text-lg text-emerald-900">
          Получавай последните новини от мен по електронната си поща.
        </p>

        <div className="mt-4 text-lg grid gap-3">
          <label className="block">
            <span className="text-sm font-medium text-emerald-900">Име</span>
            <input
              name="name"
              type="text"
              className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-emerald-900">
              Електронна поща
            </span>
            <input
              name="email"
              type="email"
              required
              className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </label>

          <label className="flex items-start gap-2 text-sm text-emerald-900">
            <input
              name="consent"
              type="checkbox"
              className="mt-1 h-4 w-4 border-gray-300 text-emerald-900 focus:ring-emerald-600"
            />
            <span>
              Съгласен съм да получавам новини по имейл и приемам политиката за
              поверителност.
            </span>
          </label>

          <button
            type="submit"
            disabled={status.state === "loading"}
            className="mt-2 inline-flex items-center justify-center bg-emerald-900 px-4 py-2 font-semibold text-white hover:bg-emerald-800 disabled:opacity-60"
          >
            {status.state === "loading" ? "Sending…" : "Изпрати"}
          </button>

          {status.message && (
            <div
              className={
                status.state === "success"
                  ? "text-emerald-800 text-sm mt-1"
                  : "text-red-700 text-sm mt-1"
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

export default NewsletterForm;
