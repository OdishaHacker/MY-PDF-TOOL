import Link from "next/link";
import { Info, ArrowLeft, Target, Shield, Cpu, Heart, Sparkles, Users, Mail } from "lucide-react";

export const metadata = {
  title: "About Us — mypdftools",
  description:
    "Learn about mypdftools — our mission, values, and commitment to providing free, private, browser-based PDF tools for everyone.",
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

export default function AboutPage() {
  return (
    <div className="bg-background">

      <main className="flex-1">
        {/* Hero Banner */}
        <div className="border-b bg-muted/30">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Info className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                  About mypdftools
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Free PDF tools. No uploads. No compromise.
                </p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              We started mypdftools with a simple belief: working with PDFs should be easy,
              free, and completely private. Too many PDF tools out there upload your files to
              remote servers, store them who-knows-where, and charge you for basic operations.
              We thought there had to be a better way — and that&apos;s exactly what we built.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
          <Section icon={Target} title="Our Story and Mission">
            <p>
              mypdftools was born out of frustration. As people who work with documents every
              day, we were tired of PDF tools that claimed to be free but hidden behind paywalls,
              or tools that asked us to upload sensitive documents to unknown servers. We
              wondered: why can&apos;t all of this just happen in the browser? Modern web browsers
              are incredibly powerful — they can handle file processing, encryption, and
              complex operations right on your device, without ever sending data over the
              internet.
            </p>
            <p>
              So we set out to build exactly that. A suite of PDF tools that runs 100% in your
              browser. No uploads, no accounts, no subscriptions, no hidden fees. Just open
              mypdftools.in, pick the tool you need, and get your work done. Our mission is to
              make PDF tools accessible to everyone — students, professionals, small business
              owners, and anyone else who needs to work with PDFs — without compromising on
              privacy or quality.
            </p>
          </Section>

          <Section icon={Sparkles} title="What mypdftools Does">
            <p>
              We offer over 20 free PDF tools, all running entirely in your browser. Whether
              you need to merge multiple PDFs into a single document, split a large PDF into
              individual pages, compress a file to reduce its size, convert between formats
              (PDF to Word, Excel, PowerPoint, JPG, and vice versa), add watermarks or page
              numbers, rotate or crop pages, redact sensitive information, sign documents
              electronically, or protect your PDFs with a password — we have you covered.
            </p>
            <p>
              Every tool on mypdftools is designed to be straightforward and intuitive. You
              do not need to be a tech expert to use them. Just upload your file from your
              device, make the changes you need, and download the result. The entire process
              happens locally on your computer, which means your files are never transmitted
              over the internet.
            </p>
          </Section>

          <Section icon={Shield} title="Our Privacy Commitment">
            <p>
              Privacy is not just a feature for us — it is the foundation of everything we
              build. Unlike most PDF tools that require you to upload your files to their
              servers, mypdftools processes everything locally in your browser. This means
              your documents never leave your device. We cannot see them, we cannot store
              them, and we cannot share them with anyone, even if we wanted to.
            </p>
            <p>
              We believe that your documents — whether they are contracts, invoices, medical
              records, personal letters, or academic papers — deserve the highest level of
              privacy. By keeping everything on your device, we eliminate the risk of data
              breaches, unauthorized access, or your files being used for purposes you never
              agreed to.
            </p>
          </Section>

          <Section icon={Cpu} title="Technology We Use">
            <p>
              mypdftools leverages the power of modern web technologies to deliver
              professional-grade PDF processing directly in your browser. We use
              industry-standard JavaScript libraries like pdf-lib for creating and modifying
              PDFs, pdf.js for rendering and reading PDF content, and other specialized
              libraries for format conversions. All processing is done using your browser&apos;s
              JavaScript engine and WebAssembly where needed.
            </p>
            <p>
              There are no plugins to install, no software to download, and no accounts to
              create. Everything runs in a modern web browser (Chrome, Firefox, Safari, or
              Edge). The browser-based approach also means that mypdftools works on any
              operating system — Windows, macOS, Linux, ChromeOS, and even mobile devices.
            </p>
          </Section>

          <Section icon={Heart} title="Our Team and Values">
            <p>
              We are a small, dedicated team of developers and designers who care deeply about
              building tools that genuinely help people. We believe that great software does
              not have to be expensive or complicated, and that privacy should be the default,
              not a premium feature.
            </p>
            <p>
              Our values are simple: build tools that are easy to use, respect our users&apos;
              privacy, and do not cost a thing. We are constantly working on new features and
              improvements based on user feedback. If there is a tool you would like to see
              on mypdftools, we would love to hear from you.
            </p>
          </Section>

          <Section icon={Users} title="Why Choose mypdftools">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-foreground">100% Free:</strong> Every tool is
                completely free to use, with no hidden charges or premium tiers.
              </li>
              <li>
                <strong className="text-foreground">100% Private:</strong> Your files never
                leave your device. No uploads, no server-side processing, no data collection.
              </li>
              <li>
                <strong className="text-foreground">No Account Required:</strong> Just visit
                mypdftools.in and start working. No sign-up, no login, no email verification.
              </li>
              <li>
                <strong className="text-foreground">Fast and Reliable:</strong> Browser-based
                processing means no upload/download wait times and no server congestion.
              </li>
              <li>
                <strong className="text-foreground">Works Everywhere:</strong> Use mypdftools
                on any device with a modern browser — desktop, laptop, tablet, or phone.
              </li>
              <li>
                <strong className="text-foreground">Regular Updates:</strong> We are always
                adding new tools and improving existing ones based on your feedback.
              </li>
            </ul>
          </Section>

          <Section icon={Mail} title="Get in Touch">
            <p>
              We would love to hear from you. Whether you have a question, suggestion, or
              just want to say hello, feel free to reach out.
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
