import Link from "next/link";

const LOGO_URL =
  "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/07/logo-light2.png";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/patent-ip", label: "Patent & IP" },
];

const SOCIAL_LINKS = [
  {
    href: "https://www.instagram.com/formasharp",
    label: "Instagram",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
        aria-hidden
      >
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/company/formasharp/",
    label: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden>
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#121926]">
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-8 md:py-12">
        <div className="flex items-start justify-between gap-6 md:items-center">
          <Link href="/" aria-label="FormaSharp — home" className="shrink-0">
            <img src={LOGO_URL} alt="FormaSharp" className="h-10 w-auto md:h-12" />
          </Link>

          <div className="flex flex-col items-end gap-5 md:flex-row md:items-center md:gap-10">
            <nav
              aria-label="Footer"
              className="flex flex-col items-end gap-y-2 text-right md:flex-row md:flex-wrap md:items-center md:gap-x-8 md:gap-y-2 md:text-left"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/90 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3" aria-label="Social media">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-white/40 hover:text-white"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/80 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-white/90">&copy; {year} FormaSharp Product Design Inc.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            <a
              href="mailto:admin@formasharp.com"
              className="transition-colors hover:text-white"
            >
              admin@formasharp.com
            </a>
            <a
              href="tel:+14164719300"
              className="transition-colors hover:text-white"
            >
              +1 (416) 471-9300
            </a>
            <span className="text-white/80">Mississauga, ON</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
