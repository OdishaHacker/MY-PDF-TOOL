import Link from "next/link";
import { AlertTriangle, ArrowLeft, Shield, FileWarning, Cpu, ExternalLink, Target, Briefcase, Mail } from "lucide-react";

export const metadata = {
  title: "Disclaimer — mypdftools",
  description:
    "Read the disclaimer for mypdftools.in. Understand the limitations and terms of use for our free online PDF tools.",
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

export default function DisclaimerPage() {
  return (
    <div className="bg-background">

      <main className="flex-1">
        {/* Hero Banner */}
        <div className="border-b bg-muted/30">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                  Disclaimer
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Last updated: March 4, 2025
                </p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Please read this disclaimer carefully before using mypdftools. By using our
              website and tools, you acknowledge and agree to the terms outlined below. This
              disclaimer is intended to provide clarity about the nature and limitations of our
              services.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
          <Section icon={FileWarning} title="General Disclaimer">
            <p>
              The tools and services provided on mypdftools.in are offered on an &quot;as is&quot;
              basis. While we make every effort to ensure that our tools function correctly and
              produce accurate results, we cannot guarantee that every PDF operation will be
              completed without errors or that the output will meet your specific requirements.
            </p>
            <p>
              mypdftools provides free, browser-based PDF tools for general use. These tools
              are designed to handle common PDF operations and work well for the vast majority
              of documents. However, certain edge cases — such as heavily encrypted files,
              unusually formatted documents, or files created with proprietary software — may
              not process as expected.
            </p>
            <p>
              We strongly recommend that you review the output of any tool before using it for
              important or time-sensitive work. Always keep a backup of your original files.
            </p>
          </Section>

          <Section icon={Target} title="No Guarantee of Results">
            <p>
              While we test our tools thoroughly and continuously work to improve them, we do
              not guarantee specific results from any tool on our website. The outcome of a PDF
              operation can be affected by many factors, including the complexity of the source
              document, the browser and device you are using, the available memory on your
              system, and other technical variables beyond our control.
            </p>
            <p>
              For example, compression results may vary significantly depending on the content
              of the PDF. A document that is already well-compressed may see only a small
              reduction in file size, while a document with large images may see a more
              dramatic reduction. Similarly, format conversions (such as PDF to Word or PDF to
              Excel) are approximations of the original layout and may not preserve every
              formatting detail perfectly.
            </p>
          </Section>

          <Section icon={Cpu} title="Client-Side Processing Notice">
            <p>
              All PDF processing on mypdftools happens entirely within your web browser. This
              is a core part of our privacy commitment — your files are never uploaded to our
              servers. However, this architecture also means that the performance and
              capabilities of our tools depend on the specifications of your device and browser.
            </p>
            <p>
              Processing very large files (hundreds of megabytes) or performing complex
              operations on a device with limited RAM may result in slower performance or, in
              some cases, the browser tab may become unresponsive or crash. This is a
              limitation of browser-based processing and is not specific to mypdftools. We
              recommend working with files under 100 MB for the best experience and using a
              modern, up-to-date browser.
            </p>
            <p>
              Since all processing is local, we have no way to recover files if your browser
              session ends unexpectedly. Please save your work and keep backups of important
              documents.
            </p>
          </Section>

          <Section icon={ExternalLink} title="Third-Party Content Disclaimer">
            <p>
              Our website may contain links to third-party websites, services, or resources
              that are not owned or controlled by mypdftools. These links are provided for
              your convenience and information only. We do not endorse, guarantee, or assume
              responsibility for the content, privacy policies, or practices of any
              third-party websites.
            </p>
            <p>
              Additionally, mypdftools displays advertisements through Google AdSense. The
              content of these advertisements is determined by Google and is not controlled by
              mypdftools. We do not endorse the products or services advertised on our website,
              and any interactions with advertisers are solely between you and the advertiser.
            </p>
          </Section>

          <Section icon={Target} title="Accuracy Disclaimer">
            <p>
              While we strive for accuracy in all our tools, the results produced by
              mypdftools may not be perfect in every case. PDF is a complex file format, and
              certain operations — particularly format conversions — involve interpretation
              and approximation. For instance:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                PDF to Word conversions may not perfectly replicate complex layouts, embedded
                fonts, or intricate formatting.
              </li>
              <li>
                PDF to Excel conversions rely on text extraction and table detection, which
                may not work correctly with scanned documents or irregularly formatted tables.
              </li>
              <li>
                Compression results vary based on the content of the file and may sometimes
                result in a minimal size reduction or, in rare cases, a slightly larger file.
              </li>
              <li>
                OCR (optical character recognition) is not currently supported, so scanned
                PDFs may not convert to editable text formats correctly.
              </li>
            </ul>
            <p>
              We are continuously improving our tools and appreciate your understanding of
              these limitations. If you encounter an issue, please let us know so we can work
              on fixing it.
            </p>
          </Section>

          <Section icon={Briefcase} title="Professional Advice Disclaimer">
            <p>
              The tools and information provided on mypdftools are for general informational
              and utility purposes only. Nothing on this website should be construed as
              professional advice of any kind, including but not limited to legal, financial,
              accounting, or technical advice.
            </p>
            <p>
              If you are working with legally sensitive documents, financial records, or any
              other materials that require professional handling, we recommend consulting with
              a qualified professional. mypdftools is not responsible for any decisions you
              make based on the output of our tools, nor are we liable for any consequences
              arising from the use of our tools for professional or legal purposes.
            </p>
            <p>
              For example, while our PDF signing tool allows you to add a signature to a
              document, the legal validity of an electronically signed document depends on the
              laws and regulations of your jurisdiction. We make no claims about the legal
              enforceability of documents processed using our tools.
            </p>
          </Section>

          <Section icon={Mail} title="Contact Us">
            <p>
              If you have questions about this disclaimer or need further clarification about
              the limitations of our tools, please reach out to us. We are transparent about
              what our tools can and cannot do, and we are always happy to help you find the
              right solution for your needs.
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
