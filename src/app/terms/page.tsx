import Link from "next/link";
import { FileText, ArrowLeft, CheckCircle, AlertTriangle, Scale, Shield, Globe, RefreshCw, Gavel, Mail, Users } from "lucide-react";

export const metadata = {
  title: "Terms of Service — mypdftools",
  description:
    "Read the Terms of Service for mypdftools.in. Understand your rights and responsibilities when using our free online PDF tools.",
};

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <div className="flex items-center gap-2.5 mb-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
          <Icon className="h-4 w-4" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      </div>
      <div className="text-muted-foreground leading-relaxed space-y-3 pl-[42px]">
        {children}
      </div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <div className="bg-background">

      <main className="flex-1">
        {/* Hero Banner */}
        <div className="border-b bg-muted/30">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                  Terms of Service
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Last updated: March 4, 2025
                </p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to mypdftools. These Terms of Service govern your use of our website and
              tools. By accessing or using mypdftools.in, you agree to be bound by these terms.
              Please read them carefully before using our services.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
          <Section icon={CheckCircle} title="Acceptance of Terms">
            <p>
              By accessing, browsing, or using the mypdftools website (mypdftools.in), you
              acknowledge that you have read, understood, and agree to be bound by these Terms
              of Service. If you do not agree with any part of these terms, you should not use
              our website or its tools.
            </p>
            <p>
              These terms apply to all visitors, users, and others who access or use
              mypdftools. We reserve the right to update or modify these terms at any time
              without prior notice. Your continued use of the website after any changes
              constitutes acceptance of the new terms.
            </p>
          </Section>

          <Section icon={Globe} title="Description of Service">
            <p>
              mypdftools provides free, browser-based PDF tools that allow you to perform a
              wide range of operations on PDF documents. Our services include, but are not
              limited to, merging PDFs, splitting PDFs, compressing PDF files, converting
              between PDF and other formats (Word, Excel, JPG, HTML, PowerPoint, plain text),
              rotating pages, adding watermarks and page numbers, cropping, redacting
              sensitive content, signing documents, and applying or removing password
              protection.
            </p>
            <p>
              All of our tools are provided free of charge. We sustain the website through
              advertising revenue, which allows us to continue offering these tools at no cost
              to you.
            </p>
          </Section>

          <Section icon={Shield} title="Client-Side Processing Disclaimer">
            <p>
              A core feature of mypdftools is that all PDF processing occurs entirely within
              your web browser. Your files are never uploaded to our servers, and we have no
              ability to access, view, or store the documents you process. This client-side
              architecture is central to our privacy commitment, but it also means that
              processing performance depends on your device&apos;s capabilities.
            </p>
            <p>
              Large or complex files may take longer to process on devices with limited
              resources. We recommend using a modern browser (Chrome, Firefox, Safari, or Edge)
              with the latest updates for the best experience. Older browsers or devices may
              not support all features or may process files more slowly.
            </p>
          </Section>

          <Section icon={AlertTriangle} title="No Warranty">
            <p>
              mypdftools is provided on an &quot;as is&quot; and &quot;as available&quot; basis without
              warranties of any kind, either express or implied. We do not guarantee that the
              website will be uninterrupted, error-free, or free of viruses or other harmful
              components.
            </p>
            <p>
              We make no warranty that the results obtained from the use of our tools will be
              accurate, reliable, or complete. While we strive to provide high-quality PDF
              processing, the nature of client-side processing means that results may vary
              depending on the complexity of the document, the browser being used, and the
              specifications of your device.
            </p>
            <p>
              To the fullest extent permitted by law, we disclaim all warranties, including
              implied warranties of merchantability, fitness for a particular purpose, and
              non-infringement.
            </p>
          </Section>

          <Section icon={Scale} title="Limitation of Liability">
            <p>
              Under no circumstances shall mypdftools, its owners, operators, or affiliates be
              liable for any direct, indirect, incidental, special, consequential, or
              exemplary damages resulting from your use of or inability to use the website or
              its tools.
            </p>
            <p>
              This includes, but is not limited to, damages for loss of data, loss of profits,
              business interruption, or any other pecuniary loss arising from the use of
              mypdftools. Since all processing happens on your device, we strongly recommend
              that you keep backups of important files before using any PDF tool — ours or
              anyone else&apos;s.
            </p>
            <p>
              In jurisdictions that do not allow the exclusion or limitation of liability for
              consequential or incidental damages, our liability shall be limited to the
              maximum extent permitted by law.
            </p>
          </Section>

          <Section icon={Gavel} title="Intellectual Property">
            <p>
              The content, design, layout, and code of the mypdftools website are the
              intellectual property of mypdftools and are protected by applicable copyright
              and trademark laws. You may not reproduce, distribute, modify, create derivative
              works from, or commercially exploit any content from our website without our
              express written permission.
            </p>
            <p>
              The mypdftools name, logo, and all related names, logos, product and service
              names, designs, and slogans are trademarks of mypdftools. You may not use these
              marks without our prior written permission. All other names, logos, product and
              service names, designs, and slogans on the website are the trademarks of their
              respective owners.
            </p>
          </Section>

          <Section icon={Users} title="User Responsibilities">
            <p>
              When using mypdftools, you agree that you will:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Use the tools only for lawful purposes and in accordance with these Terms of
                Service
              </li>
              <li>
                Not attempt to gain unauthorized access to any part of the website, its
                servers, or networks
              </li>
              <li>
                Not use the tools to process documents that you do not have the legal right
                to modify or access
              </li>
              <li>
                Not attempt to interfere with or disrupt the website&apos;s functionality or
                servers
              </li>
              <li>
                Keep backups of important files before processing, as we cannot recover files
                that are processed on your device
              </li>
              <li>
                Not use automated scripts or bots to access the website in a manner that
                places excessive load on our infrastructure
              </li>
            </ul>
            <p>
              We reserve the right to restrict or terminate access to our website for anyone
              who violates these responsibilities.
            </p>
          </Section>

          <Section icon={RefreshCw} title="Modifications to Terms">
            <p>
              We may update or modify these Terms of Service at any time at our sole
              discretion. When we make changes, we will update the &quot;Last updated&quot; date at the
              top of this page. We encourage you to review these terms periodically to stay
              informed of any changes.
            </p>
            <p>
              Your continued use of mypdftools after any modifications to these terms
              constitutes your acknowledgment of the modifications and your consent to abide
              by the updated terms. If you do not agree with the revised terms, you should
              discontinue use of the website.
            </p>
          </Section>

          <Section icon={Scale} title="Governing Law">
            <p>
              These Terms of Service shall be governed by and construed in accordance with
              the laws of India, without regard to its conflict of law provisions. Any
              disputes arising out of or related to these terms or your use of mypdftools
              shall be resolved through good-faith negotiation, and if necessary, through
              the courts of competent jurisdiction in India.
            </p>
          </Section>

          <Section icon={Mail} title="Contact Us">
            <p>
              If you have any questions about these Terms of Service, please get in touch
              with us. We are happy to clarify any part of these terms and are open to
              feedback.
            </p>
            <p>
              <strong className="text-foreground">Email:</strong>{" "}
              <a
                href="mailto:support@mypdftools.in"
                className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
              >
                support@mypdftools.in
              </a>
            </p>
            <p>
              <strong className="text-foreground">Website:</strong>{" "}
              <Link
                href="/"
                className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
              >
                mypdftools.in
              </Link>
            </p>
          </Section>

          {/* Back to home */}
          <div className="mt-10 pt-8 border-t">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </main>

    </div>
  );
}
