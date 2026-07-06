import Link from "next/link";

const LOGO_URL =
  "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/07/logo-light2.png";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#121926]">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-14">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <Link href="/" aria-label="FormaSharp — home">
            <img
              src={LOGO_URL}
              alt="FormaSharp"
              className="h-12 w-auto"
            />
          </Link>

          <nav
            aria-label="Footer"
            className="flex flex-wrap gap-x-8 gap-y-2"
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
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-white/80 sm:flex-row sm:items-center sm:justify-between">
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
