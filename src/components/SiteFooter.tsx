import Link from "next/link";
import { FileText, Mail, Shield, ExternalLink } from "lucide-react";

const popularTools = [
  { label: "Merge PDF", href: "/merge-pdf" },
  { label: "Split PDF", href: "/split-pdf" },
  { label: "Compress PDF", href: "/compress-pdf" },
  { label: "PDF to Word", href: "/pdf-to-word" },
  { label: "JPG to PDF", href: "/jpg-to-pdf" },
  { label: "Sign PDF", href: "/sign-pdf" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "DMCA", href: "/dmca" },
];

const resourceLinks = [
  { label: "All Tools", href: "/#all-tools" },
  { label: "PDF to Excel", href: "/pdf-to-excel" },
  { label: "PDF to JPG", href: "/pdf-to-jpg" },
  { label: "Word to PDF", href: "/word-to-pdf" },
  { label: "Protect PDF", href: "/protect-pdf" },
  { label: "Unlock PDF", href: "/unlock-pdf" },
];

function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 inline-flex items-center gap-1 group"
            >
              {link.label}
              <ExternalLink className="h-2.5 w-2.5 opacity-0 group-hover:opacity-60 transition-opacity duration-200" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SiteFooter() {
  return (
    <footer className="bg-muted/40 border-t border-border">
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Brand Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                <FileText className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
                mypdftools
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground max-w-xs">
              Free, private, and secure PDF tools that run entirely in your
              browser. No file uploads to servers — your documents never leave
              your device.
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>100% private &amp; secure</span>
            </div>
            <a
              href="mailto:support@mypdftools.in"
              className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Mail className="h-4 w-4 shrink-0" />
              support@mypdftools.in
            </a>
          </div>

          {/* Column 2: Popular Tools */}
          <FooterLinkGroup title="Popular Tools" links={popularTools} />

          {/* Column 3: Company */}
          <FooterLinkGroup title="Company" links={companyLinks} />

          {/* Column 4: Resources / Quick Links */}
          <FooterLinkGroup title="Resources" links={resourceLinks} />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} mypdftools. All rights reserved.
            </p>
            <nav aria-label="Legal links" className="flex items-center gap-4">
              <Link
                href="/privacy-policy"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <span className="text-muted-foreground/40" aria-hidden="true">
                &middot;
              </span>
              <Link
                href="/terms"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Terms
              </Link>
              <span className="text-muted-foreground/40" aria-hidden="true">
                &middot;
              </span>
              <Link
                href="/disclaimer"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Disclaimer
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
