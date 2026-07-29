"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLeft, ArrowRight, Building2, Check, Mail, Phone, User } from "lucide-react";
import Seo from "@/components/Seo";
import {
  BUDGET_OPTIONS,
  PROJECT_STAGE_OPTIONS,
  QUOTE_SERVICE_OPTIONS,
  TIMELINE_OPTIONS,
  resolveQuoteService,
  type QuoteServiceSlug,
} from "@/lib/quoteForm";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  service: QuoteServiceSlug;
  stage: string;
  timeline: string;
  budget: string;
  description: string;
};

const INITIAL_FORM: FormState = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  service: "not-sure",
  stage: "",
  timeline: "",
  budget: "",
  description: "",
};

const inputClass =
  "w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-[#01628a] focus:ring-2 focus:ring-[#01628a]/30";

const selectClass =
  "w-full appearance-none rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition-colors focus:border-[#01628a] focus:ring-2 focus:ring-[#01628a]/30";

function ProgressBar({ step }: { step: 1 | 2 }) {
  return (
    <div className="mb-8">
      <div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
        <span className={step === 1 ? "text-[#ff6726]" : "text-neutral-400"}>
          About you
        </span>
        <span className={step === 2 ? "text-[#ff6726]" : "text-neutral-400"}>
          Your project
        </span>
      </div>
      <div className="flex gap-2">
        <div
          className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
            step >= 1 ? "bg-[#ff6726]" : "bg-neutral-200"
          }`}
        />
        <div
          className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
            step >= 2 ? "bg-[#ff6726]" : "bg-neutral-200"
          }`}
        />
      </div>
      <p className="mt-2 text-xs text-neutral-500">Step {step} of 2</p>
    </div>
  );
}

export default function RequestAQuotePage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );

  useEffect(() => {
    if (!router.isReady) return;
    const service = resolveQuoteService(router.query.service);
    setForm((prev) => ({ ...prev, service }));
  }, [router.isReady, router.query.service]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateStep1 = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) next.fullName = "Please enter your name.";
    if (!form.email.trim()) {
      next.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Please enter a valid email address.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const validateStep2 = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.stage) next.stage = "Please select a project stage.";
    if (!form.description.trim()) {
      next.description = "Please tell us a little about your project.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleContinue = () => {
    if (validateStep1()) setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div>
      <Seo
        title="Request a Quote"
        description="Request a tailored quote from FormaSharp for product design, CAD, engineering, prototyping, and manufacturing support."
        canonical="/request-a-quote/"
      />

      <section className="relative min-h-screen overflow-hidden bg-[linear-gradient(to_bottom_right,#121926,#01628a)] pb-20 pt-[22vh] md:pb-28">
        <div className="relative z-10 mx-auto max-w-2xl px-6">
          <div className="mb-10 text-center">
            <h1 className="!text-4xl !font-bold !leading-tight text-white md:!text-5xl">
              Tell us about your project
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-base !text-white/90">
              A few details help us respond with a relevant estimate. Sketches,
              early ideas, and rough concepts are welcome.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white p-6 shadow-[0_12px_48px_rgba(18,25,38,0.28),0_2px_8px_rgba(18,25,38,0.12)] md:p-10">
            {isSubmitted ? (
              <div className="py-6 text-center">
                <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-[#ff6726]/10">
                  <Check className="size-7 text-[#ff6726]" strokeWidth={2.5} />
                </div>
                <h2 className="!mb-3 !text-3xl !font-bold text-neutral-950">
                  Request received
                </h2>
                <p className="mx-auto !mb-2 max-w-md text-neutral-600">
                  Thank you, {form.fullName.split(" ")[0] || "there"}. We will
                  review your project details and respond within one business
                  day.
                </p>
                <p className="mx-auto !mb-8 max-w-md text-sm text-neutral-500">
                  Prefer to talk sooner? Book a free strategy call on our contact
                  page.
                </p>
                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link href="/contact" className="button-primary inline-block">
                    Book a Call
                  </Link>
                  <Link href="/" className="button-tertiary inline-block">
                    Back to Home
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <ProgressBar step={step} />

                {step === 1 ? (
                  <div className="animate-in fade-in duration-300">
                    <h2 className="!mb-1 !text-2xl !font-bold text-neutral-950">
                      About you
                    </h2>
                    <p className="!mb-6 text-sm text-neutral-500">
                      We will use this to follow up with your quote.
                    </p>

                    <div className="flex flex-col gap-4">
                      <Field
                        label="Full name"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        required
                        error={errors.fullName}
                        icon={<User className="size-4" />}
                        autoComplete="name"
                      />
                      <Field
                        label="Email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        error={errors.email}
                        icon={<Mail className="size-4" />}
                        autoComplete="email"
                      />
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field
                          label="Phone"
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={handleChange}
                          optional
                          icon={<Phone className="size-4" />}
                          autoComplete="tel"
                        />
                        <Field
                          label="Company Name"
                          name="company"
                          value={form.company}
                          onChange={handleChange}
                          optional
                          icon={<Building2 className="size-4" />}
                          autoComplete="organization"
                        />
                      </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                      <button
                        type="button"
                        onClick={handleContinue}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#ff6726] px-8 py-3 text-sm font-semibold text-[#121926] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,103,38,0.35)] sm:w-auto"
                      >
                        Continue
                        <ArrowRight className="size-4" strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="animate-in fade-in duration-300">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
                    >
                      <ArrowLeft className="size-4" strokeWidth={2} />
                      Back
                    </button>

                    <h2 className="!mb-1 !text-2xl !font-bold text-neutral-950">
                      Your project
                    </h2>
                    <p className="!mb-6 text-sm text-neutral-500">
                      The more context you share, the more useful our response
                      will be.
                    </p>

                    <div className="flex flex-col gap-4">
                      <SelectField
                        label="Service needed"
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        required
                        options={QUOTE_SERVICE_OPTIONS.map((option) => ({
                          value: option.slug,
                          label: option.label,
                        }))}
                      />
                      <SelectField
                        label="Project stage"
                        name="stage"
                        value={form.stage}
                        onChange={handleChange}
                        required
                        error={errors.stage}
                        placeholder="Select a stage"
                        options={PROJECT_STAGE_OPTIONS.map((option) => ({
                          value: option.value,
                          label: option.label,
                        }))}
                      />
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <SelectField
                          label="Timeline"
                          name="timeline"
                          value={form.timeline}
                          onChange={handleChange}
                          optional
                          placeholder="Select timeline"
                          options={TIMELINE_OPTIONS.map((option) => ({
                            value: option.value,
                            label: option.label,
                          }))}
                        />
                        <SelectField
                          label="Budget range"
                          name="budget"
                          value={form.budget}
                          onChange={handleChange}
                          optional
                          hint="Helps us suggest the right scope."
                          options={BUDGET_OPTIONS.map((option) => ({
                            value: option.value,
                            label: option.label,
                          }))}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="description"
                          className="text-sm font-semibold text-neutral-800"
                        >
                          Tell us about your project{" "}
                          <span className="text-[#ff6726]">*</span>
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          rows={5}
                          value={form.description}
                          onChange={handleChange}
                          placeholder="e.g. consumer product concept, need CAD from sketches, reverse engineer a bracket..."
                          className={`${inputClass} resize-y`}
                        />
                        {errors.description ? (
                          <p className="text-xs text-red-600">
                            {errors.description}
                          </p>
                        ) : (
                          <p className="text-xs text-neutral-400">
                            Sketches, photos, or CAD files can be shared after
                            we reply.
                          </p>
                        )}
                      </div>
                    </div>

                    <p className="mt-6 text-xs leading-relaxed text-neutral-400">
                      No commitment required. We use this information to prepare
                      a relevant response, not to add you to a mailing list.
                    </p>

                    <div className="mt-6 flex justify-end">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(to_bottom_right,#121926,#01628a)] px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                      >
                        {isSubmitting ? "Sending..." : "Submit Request"}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>

          {!isSubmitted ? (
            <p className="mt-6 text-center text-xs !text-white/70">
              Typical response within 1 business day · No obligation
            </p>
          ) : null}
        </div>
      </section>
    </div>
  );
}

type FieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  type?: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  icon?: React.ReactNode;
  autoComplete?: string;
};

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  required,
  optional,
  error,
  icon,
  autoComplete,
}: FieldProps) {
  const id = `quote-${name}`;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-neutral-800">
        {label}
        {required ? (
          <span className="text-[#ff6726]"> *</span>
        ) : optional ? (
          <span className="font-normal text-neutral-400"> (optional)</span>
        ) : null}
      </label>
      <div className="relative">
        {icon ? (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
            {icon}
          </span>
        ) : null}
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete}
          className={`${inputClass} ${icon ? "pl-10" : ""} ${error ? "border-red-400 focus:border-red-500 focus:ring-red-500/20" : ""}`}
        />
      </div>
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}

type SelectFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  optional?: boolean;
  error?: string;
  hint?: string;
  placeholder?: string;
};

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  required,
  optional,
  error,
  hint,
  placeholder,
}: SelectFieldProps) {
  const id = `quote-${name}`;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-neutral-800">
        {label}
        {required ? (
          <span className="text-[#ff6726]"> *</span>
        ) : optional ? (
          <span className="font-normal text-neutral-400"> (optional)</span>
        ) : null}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`${selectClass} ${error ? "border-red-400 focus:border-red-500 focus:ring-red-500/20" : ""}`}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option.value || "empty"} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? (
        <p className="text-xs text-red-600">{error}</p>
      ) : hint ? (
        <p className="text-xs text-neutral-400">{hint}</p>
      ) : null}
    </div>
  );
}
