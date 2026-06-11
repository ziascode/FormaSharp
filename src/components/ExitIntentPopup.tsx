"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Mail, Phone, User, X } from "lucide-react";

const VALUE_POINTS = [
  "We design innovative products that align with your vision and market needs",
  "We develop your concepts using the latest technology and engineering expertise",
  "We offer end-to-end manufacturing with quality control and delivery",
];

const REARM_DELAY_MS = 1200;

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    message: "",
  });

  const armedRef = useRef(true);

  const open = useCallback(() => {
    if (!armedRef.current) return;
    armedRef.current = false;
    setIsSubmitted(false);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    // Re-arm after a short delay so it does not immediately reopen.
    window.setTimeout(() => {
      armedRef.current = true;
    }, REARM_DELAY_MS);
  }, []);

  // Desktop exit intent: cursor leaving through the top of the window.
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) open();
    };
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    return () =>
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave,
      );
  }, [open]);

  // Escape to close + lock body scroll while open.
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Contact FormaSharp"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={close}
        aria-hidden
      />

      {/* Card */}
      <div className="relative z-10 grid w-full max-w-4xl grid-cols-1 overflow-hidden rounded-2xl bg-white shadow-2xl md:grid-cols-2">
        {/* Close button */}
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 flex size-9 items-center justify-center rounded-full bg-black/5 text-black/60 transition-colors hover:bg-black/10 hover:text-black md:bg-white/15 md:text-white md:hover:bg-white/25 md:hover:text-white"
        >
          <X className="size-5" strokeWidth={2.5} />
        </button>

        {/* Left panel */}
        <div className="relative flex flex-col justify-between overflow-hidden bg-[#ff6726] p-8 md:p-10">
          {/* Faint dot texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.6) 1.5px, transparent 1.5px)",
              backgroundSize: "22px 22px",
            }}
            aria-hidden
          />

          <ul className="relative z-10 space-y-6">
            {VALUE_POINTS.map((point) => (
              <li
                key={point}
                className="text-lg font-bold leading-snug text-white md:text-xl"
              >
                {point}
              </li>
            ))}
          </ul>

          {/* Illustration cluster */}
          <div
            className="relative z-10 mt-10 flex items-end gap-6"
            aria-hidden
          >
            <Mail className="absolute -top-2 left-28 size-6 text-white/80" strokeWidth={2} />
            <div className="flex size-20 items-center justify-center rounded-2xl bg-white shadow-lg">
              <Phone className="size-9 text-[#1d4ed8]" strokeWidth={2} fill="#1d4ed8" />
            </div>
            <div className="relative ml-4 flex flex-col items-center">
              <span className="size-9 rounded-full bg-[#101828]" />
              <span className="-mt-1 h-9 w-14 rounded-t-3xl bg-[#2563eb]" />
              <span className="absolute right-[-10px] top-2 h-3 w-7 rotate-45 rounded-full bg-[#2563eb]" />
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex flex-col justify-center p-8 md:p-10">
          {isSubmitted ? (
            <div className="py-8 text-center">
              <h2 className="!mb-3 !text-3xl !font-bold text-neutral-950">
                Thank you!
              </h2>
              <p className="!mb-6">
                We have received your message and will be in touch shortly.
              </p>
              <button
                type="button"
                onClick={close}
                className="mx-auto inline-flex w-fit rounded-full bg-[linear-gradient(to_bottom_right,#121926,#01628a)] px-8 py-3 font-semibold text-white transition-opacity hover:opacity-90"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <h2 className="!mb-3 !text-3xl !font-bold leading-tight text-neutral-950 md:!text-4xl">
                Innovation Starts With a Conversation.
              </h2>
              <p className="!mb-6 !text-base">
                Your project deserves a team that cares as much as you do. Let's
                connect!
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Field
                  label="Full Name"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  icon={<User className="size-4" />}
                  required
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  icon={<Mail className="size-4" />}
                  required
                />
                <Field
                  label="Contact Number"
                  name="contactNumber"
                  type="tel"
                  value={form.contactNumber}
                  onChange={handleChange}
                  icon={<Phone className="size-4" />}
                />

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="exit-message"
                    className="text-sm font-semibold text-neutral-800"
                  >
                    Message
                  </label>
                  <textarea
                    id="exit-message"
                    name="message"
                    rows={3}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full resize-none rounded-lg border border-neutral-300 px-4 py-2.5 text-sm text-neutral-900 outline-none transition-colors focus:border-[#01628a] focus:ring-2 focus:ring-[#01628a]/30"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 inline-flex w-fit rounded-full bg-[linear-gradient(to_bottom_right,#121926,#01628a)] px-8 py-3 font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Submit
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

type FieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  icon?: React.ReactNode;
  required?: boolean;
};

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  icon,
  required,
}: FieldProps) {
  const id = `exit-${name}`;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-neutral-800">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
            {icon}
          </span>
        )}
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full rounded-lg border border-neutral-300 py-2.5 text-sm text-neutral-900 outline-none transition-colors focus:border-[#01628a] focus:ring-2 focus:ring-[#01628a]/30 ${
            icon ? "pl-10 pr-4" : "px-4"
          }`}
        />
      </div>
    </div>
  );
}
