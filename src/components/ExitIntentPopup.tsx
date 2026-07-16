"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Building2, Mail, Phone, User, X } from "lucide-react";

const EXIT_INTENT_STORAGE_KEY = "formasharp-exit-intent-shown";
export const OPEN_CONTACT_POPUP_EVENT = "formasharp:open-contact-popup";

export function openContactPopup(): void {
  window.dispatchEvent(new CustomEvent(OPEN_CONTACT_POPUP_EVENT));
}

function hasSeenExitIntent(): boolean {
  try {
    return localStorage.getItem(EXIT_INTENT_STORAGE_KEY) === "true";
  } catch {
    return true;
  }
}

function markExitIntentShown(): void {
  try {
    localStorage.setItem(EXIT_INTENT_STORAGE_KEY, "true");
  } catch {
    // Ignore storage failures (private browsing, etc.)
  }
}

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    company: "",
    email: "",
    contactNumber: "",
    message: "",
  });

  const enabledRef = useRef(true);

  const openFromExitIntent = useCallback(() => {
    if (hasSeenExitIntent() || !enabledRef.current) return;
    enabledRef.current = false;
    markExitIntentShown();
    setIsSubmitted(false);
    setIsOpen(true);
  }, []);

  const openManually = useCallback(() => {
    setIsSubmitted(false);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Navbar / explicit CTA opens the popup anytime.
  useEffect(() => {
    const handleOpen = () => openManually();
    window.addEventListener(OPEN_CONTACT_POPUP_EVENT, handleOpen);
    return () =>
      window.removeEventListener(OPEN_CONTACT_POPUP_EVENT, handleOpen);
  }, [openManually]);

  // Desktop exit intent: cursor leaving through the top of the window.
  useEffect(() => {
    if (hasSeenExitIntent()) {
      enabledRef.current = false;
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) openFromExitIntent();
    };
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    return () =>
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave,
      );
  }, [openFromExitIntent]);

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
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Close button */}
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 flex size-9 items-center justify-center rounded-full bg-black/5 text-black/60 transition-colors hover:bg-black/10 hover:text-black"
        >
          <X className="size-5" strokeWidth={2.5} />
        </button>

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
                  label="Company Name"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  icon={<Building2 className="size-4" />}
                  autoComplete="organization"
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
  autoComplete?: string;
};

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  icon,
  required,
  autoComplete,
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
          autoComplete={autoComplete}
          className={`w-full rounded-lg border border-neutral-300 py-2.5 text-sm text-neutral-900 outline-none transition-colors focus:border-[#01628a] focus:ring-2 focus:ring-[#01628a]/30 ${
            icon ? "pl-10 pr-4" : "px-4"
          }`}
        />
      </div>
    </div>
  );
}
