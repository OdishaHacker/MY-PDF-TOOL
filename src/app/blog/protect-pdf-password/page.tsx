import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowLeft, Lock, CheckCircle, AlertTriangle, Lightbulb, ListOrdered,
  BookOpen, ShieldCheck, Zap, ArrowRight, Table as TableIcon, HelpCircle,
  Clock, User, KeyRound, ShieldAlert
} from "lucide-react";

export const metadata: Metadata = {
  title: "How to Password Protect PDF Files with AES-256 Encryption — mypdftools",
  description: "A complete guide to PDF security. Learn the difference between User and Owner passwords, understand AES-256 military-grade encryption, and encrypt your files securely in browser memory.",
  keywords: ["password protect PDF", "encrypt PDF AES-256", "PDF security guide", "lock PDF file", "prevent PDF copying and printing", "free PDF encryption online"],
  alternates: { canonical: "https://mypdftools.in/blog/protect-pdf-password/" },
};

export default function ProtectPdfPassword() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "How to Password Protect PDF Files with AES-256 Encryption",
    description: "A complete guide to PDF security. Learn the difference between User and Owner passwords and encrypt files securely in browser memory.",
    url: "https://mypdftools.in/blog/protect-pdf-password/",
    datePublished: "2026-08-04T08:00:00Z",
    dateModified: "2026-11-02T09:00:00Z",
    author: {
      "@type": "Person",
      name: "mypdftools Team",
      jobTitle: "mypdftools Editorial Team"
    },
    publisher: {
      "@type": "Organization",
      name: "mypdftools",
      url: "https://mypdftools.in"
    }
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the difference between a User Password and an Owner Password?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A User Password (Open Password) prevents unauthorized people from opening and viewing the document. An Owner Password allows viewing but restricts actions like printing, copying text, or extracting pages."
        }
      },
      {
        "@type": "Question",
        name: "Can an AES-256 encrypted PDF be cracked by brute-force?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AES-256 encryption is mathematically unbreakable with modern computing power, provided your password has sufficient entropy (12+ mixed characters)."
        }
      },
      {
        "@type": "Question",
        name: "Does mypdftools store or record the password I set?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Encryption happens 100% inside your local web browser via WebCrypto APIs. Neither your document nor your password is ever transmitted to an external server."
        }
      }
    ]
  };

  return (
    <div className="bg-background min-h-screen pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Knowledge Hub
          </Link>

          <header className="mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-[#F39C12]/10 text-[#F39C12] mb-4">
              <KeyRound className="h-3.5 w-3.5" /> Document Cryptography
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground leading-tight mb-4">
              How to Password Protect PDF Files with AES-256 Encryption
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-muted-foreground border-y py-3">
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-primary" /> mypdftools Team
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> 8 min read
              </span>
              <span>•</span>
              <span>Updated November 2026</span>
            </div>
          </header>
          <figure className="my-10">
            <img src="/blog-images/protect-pdf-password-hero.svg" alt="Password Protect PDF Files — Keep Documents Safe" width={1200} height={630} className="w-full h-auto rounded-2xl border" />
            <figcaption className="text-xs text-muted-foreground mt-2 text-center">Password Protect PDF Files — Keep Documents Safe — mypdftools Knowledge Hub</figcaption>
          </figure>

          <div className="prose-custom space-y-6 text-base leading-relaxed text-muted-foreground">
            <p className="text-lg font-medium text-foreground leading-relaxed">
              In an era of frequent data breaches and compliance audits (GDPR, HIPAA, SOC 2), sending unencrypted tax returns, bank statements, or confidential business proposals via email is a massive security liability.
            </p>

            <p>
              Applying a password to your PDF is the fastest and most reliable way to prevent unauthorized access. In this guide, we demystify the cryptographic algorithms behind PDF security, explain the difference between document opening and permission restrictions, and show you how to encrypt files locally with zero cloud exposure.
            </p>

            {/* Table of Contents */}
            <div className="bg-muted/40 border rounded-2xl p-6 my-8">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2 mb-3">
                <ListOrdered className="h-5 w-5 text-primary" /> Table of Contents
              </h3>
              <ul className="space-y-2 text-sm list-none p-0 m-0">
                <li><a href="#encryption-standards" className="text-primary hover:underline">1. PDF Encryption Standards: AES-256 vs. Legacy RC4</a></li>
                <li><a href="#user-vs-owner" className="text-primary hover:underline">2. User Password vs. Owner (Permission) Password</a></li>
                <li><a href="#step-by-step" className="text-primary hover:underline">3. Step-by-Step Guide to Locking a PDF</a></li>
                <li><a href="#security-comparison" className="text-primary hover:underline">4. Encryption Protocol Comparison Table</a></li>
                <li><a href="#password-hygiene" className="text-primary hover:underline">5. Creating Uncrackable Passwords</a></li>
                <li><a href="#faq" className="text-primary hover:underline">6. Frequently Asked Questions</a></li>
              </ul>
            </div>

          <figure className="my-10">
            <img src="/blog-images/diagram-local-processing.svg" alt="Cloud tools vs. local browser processing — where your files actually go" width={1200} height={630} className="w-full h-auto rounded-2xl border" />
            <figcaption className="text-xs text-muted-foreground mt-2 text-center">Cloud tools vs. local browser processing — where your files actually go</figcaption>
          </figure>


            <h2 id="encryption-standards" className="text-2xl font-bold tracking-tight text-foreground pt-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" /> 1. PDF Encryption Standards: AES-256 vs. Legacy RC4
            </h2>
            <p>
              Not all PDF password protections are created equal. Over the decades, the Adobe PDF specification (ISO 32000) has evolved through multiple encryption revisions:
            </p>
            <ul className="space-y-2 list-disc pl-6">
              <li><strong>40-bit &amp; 128-bit RC4 (Revision 2 &amp; 3):</strong> Outdated and deprecated stream ciphers. Vulnerable to fast automated cracking tools in minutes.</li>
              <li><strong>AES-128 (Revision 5):</strong> Advanced Encryption Standard introduced in PDF 1.6. Secure for general business documents.</li>
              <li><strong>AES-256 (Revision 6 / ISO 32000-2):</strong> Modern military-grade block cipher using SHA-256 key derivation with salted hashing. It is virtually immune to brute-force attacks and is the industry gold standard.</li>
            </ul>

            <h2 id="user-vs-owner" className="text-2xl font-bold tracking-tight text-foreground pt-4 flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-primary" /> 2. User Password vs. Owner (Permission) Password
            </h2>
            <p>
              When locking a document, you can configure two distinct security levels:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
              <div className="p-4 rounded-xl border bg-card">
                <h4 className="font-semibold text-sm text-foreground mb-1">User Password (Open Password)</h4>
                <p className="text-xs text-muted-foreground">Blocks anyone from opening or previewing the document without entering the correct key. Essential for confidential financial or medical records.</p>
              </div>
              <div className="p-4 rounded-xl border bg-card">
                <h4 className="font-semibold text-sm text-foreground mb-1">Owner Password (Permissions)</h4>
                <p className="text-xs text-muted-foreground">Allows viewing, but blocks printing, text copying, page extraction, and form field editing. Useful for distributing read-only eBooks or digital price lists.</p>
              </div>
            </div>

            <h2 id="step-by-step" className="text-2xl font-bold tracking-tight text-foreground pt-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" /> 3. Step-by-Step Guide to Locking a PDF
            </h2>

            <div className="space-y-4 my-6">
              <div className="p-4 rounded-xl border bg-card space-y-1">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-primary text-primary-foreground">Step 1</span>
                <h4 className="font-semibold text-foreground">Open Protect Tool</h4>
                <p className="text-sm">Navigate to the <Link href="/protect-pdf" className="text-primary underline">Protect PDF Tool</Link> and select your file from your computer or phone.</p>
              </div>

              <div className="p-4 rounded-xl border bg-card space-y-1">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-primary text-primary-foreground">Step 2</span>
                <h4 className="font-semibold text-foreground">Enter a Strong Password</h4>
                <p className="text-sm">Type a secure password (minimum 8-12 characters with letters, numbers, and symbols). Confirm the password in the verification box.</p>
              </div>

              <div className="p-4 rounded-xl border bg-card space-y-1">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-primary text-primary-foreground">Step 3</span>
                <h4 className="font-semibold text-foreground">In-Browser AES-256 Encryption</h4>
                <p className="text-sm">Our local WebCrypto engine generates a unique 256-bit key in memory and encrypts the object tree instantly.</p>
              </div>

              <div className="p-4 rounded-xl border bg-card space-y-1">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-primary text-primary-foreground">Step 4</span>
                <h4 className="font-semibold text-foreground">Download Encrypted Document</h4>
                <p className="text-sm">Save your locked PDF. Anyone opening it will now be prompted for the password.</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 my-8 text-center space-y-3">
              <h3 className="font-bold text-foreground text-lg">Lock your confidential PDF file now</h3>
              <p className="text-sm text-muted-foreground">100% private client-side encryption. Your passwords never leave your browser.</p>
              <Link
                href="/protect-pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors shadow-sm"
              >
                Open Free Protect PDF Tool <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <h2 id="security-comparison" className="text-2xl font-bold tracking-tight text-foreground pt-4 flex items-center gap-2">
              <TableIcon className="h-5 w-5 text-primary" /> 4. Encryption Protocol Comparison Table
            </h2>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-left text-sm border-collapse border rounded-xl">
                <thead>
                  <tr className="bg-muted/60 border-b">
                    <th className="p-3 font-semibold text-foreground">Algorithm</th>
                    <th className="p-3 font-semibold text-foreground">PDF Spec Version</th>
                    <th className="p-3 font-semibold text-foreground">Security Rating</th>
                    <th className="p-3 font-semibold text-foreground">Recommended Usage</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-muted-foreground">
                  <tr>
                    <td className="p-3 font-medium text-foreground">AES-256 (Revision 6)</td>
                    <td className="p-3">PDF 1.7 / 2.0</td>
                    <td className="p-3 text-emerald-600 font-semibold">Military Grade (Unbreakable)</td>
                    <td className="p-3">Contracts, tax returns, medical files, banking documents</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-foreground">AES-128 (Revision 5)</td>
                    <td className="p-3">PDF 1.6</td>
                    <td className="p-3 text-amber-500 font-semibold">High Security</td>
                    <td className="p-3">General office forms and internal documents</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-foreground">RC4 128-bit (Revision 3)</td>
                    <td className="p-3">PDF 1.4</td>
                    <td className="p-3 text-rose-500 font-semibold">Deprecated / Insecure</td>
                    <td className="p-3">Legacy backward compatibility only</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 id="password-hygiene" className="text-2xl font-bold tracking-tight text-foreground pt-4 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-500" /> 5. Best Practices for Password Hygiene
            </h2>
            <ul className="space-y-2 list-disc pl-6">
              <li><strong>Avoid Common Words:</strong> Do not use birthdays, names, or simple dictionary terms (e.g. &quot;password123&quot;).</li>
              <li><strong>Use Passphrases:</strong> Combine 4 random words with symbols (e.g. <code>Falcon#Bridge$Winter99</code>).</li>
              <li><strong>Share Keys Securely:</strong> Send the password through an encrypted side channel (like Signal or SMS) rather than in the same email as the attached PDF.</li>
            </ul>

            <h2 id="faq" className="text-2xl font-bold tracking-tight text-foreground pt-4 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" /> 6. Frequently Asked Questions
            </h2>
            <div className="space-y-4 my-6">
              <div className="p-4 rounded-xl border bg-card space-y-1">
                <h4 className="font-semibold text-sm text-foreground">What is the difference between a User Password and an Owner Password?</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">A User Password (Open Password) prevents unauthorized people from opening and viewing the document. An Owner Password allows viewing but restricts actions like printing, copying text, or extracting pages.</p>
              </div>
              <div className="p-4 rounded-xl border bg-card space-y-1">
                <h4 className="font-semibold text-sm text-foreground">Can an AES-256 encrypted PDF be cracked by brute-force?</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">AES-256 encryption is mathematically unbreakable with modern computing power, provided your password has sufficient entropy (12+ mixed characters).</p>
              </div>
              <div className="p-4 rounded-xl border bg-card space-y-1">
                <h4 className="font-semibold text-sm text-foreground">Does mypdftools store or record the password I set?</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">No. Encryption happens 100% inside your local web browser via WebCrypto APIs. Neither your document nor your password is ever transmitted to an external server.</p>
              </div>
            </div>

            {/* Author Bio Box */}
            <div className="border-t pt-8 mt-12">
              <div className="p-6 rounded-2xl bg-muted/40 border flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-amber-500/20 text-amber-600 flex items-center justify-center font-bold text-lg shrink-0">
                  MT
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-foreground text-sm">mypdftools Team</h4>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">Editorial Team</span>
                  </div>
                  <p className="text-xs text-muted-foreground">The mypdftools team researches, writes, and reviews every guide on this site. We test each workflow in real browsers before publishing, and we update articles regularly as PDF tools and standards evolve. Questions or corrections are always welcome at support@mypdftools.in.</p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
