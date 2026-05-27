import Link from "next/link";
import { Shield, ArrowLeft, Lock, Eye, Cookie, Server, Clock, Users, Mail } from "lucide-react";

export const metadata = {
  title: "Privacy Policy — mypdftools",
  description:
    "Read the mypdftools Privacy Policy. Learn how we handle your data — all PDF processing happens in your browser, no files are uploaded to our servers.",
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

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background">

      <main className="flex-1">
        {/* Hero Banner */}
        <div className="border-b bg-muted/30">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                  Privacy Policy
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Last updated: March 4, 2025
                </p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              At mypdftools, your privacy matters to us. This policy explains what information we
              collect, how we use it, and the steps we take to keep your data safe. Since all PDF
              processing happens directly in your browser, your files never leave your device — and
              that&apos;s a promise we take seriously.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
          <Section icon={Eye} title="Information We Collect">
            <p>
              mypdftools is built with a privacy-first approach. We do not collect, store, or
              transmit any of the files you process using our tools. When you merge, split,
              compress, convert, or perform any other PDF operation on our website, everything
              happens locally in your web browser using JavaScript. Your documents never pass
              through our servers at any point.
            </p>
            <p>
              The only information we may collect is standard web analytics data that helps us
              understand how visitors use our site. This includes anonymized data such as page
              views, referral sources, device type, browser version, and general geographic
              location (country level). This information cannot be used to identify you personally
              and is collected solely to improve our website&apos;s performance and user experience.
            </p>
            <p>
              We do not ask you to create an account, and we do not require any personal
              information such as your name, email address, or phone number to use our tools.
            </p>
          </Section>

          <Section icon={Server} title="No File Uploads, No Server-Side Processing">
            <p>
              This is the most important part of our privacy commitment: mypdftools does not
              upload your files to any server. Every PDF tool on our website processes your
              documents entirely within your browser. The files you select are read by your
              browser&apos;s built-in JavaScript engine, processed locally on your device, and the
              results are generated right there — nothing is sent over the internet.
            </p>
            <p>
              This means that even we cannot see, access, or recover your files. Once you close
              the browser tab or navigate away from the page, the data is gone. There is no
              backup, no server-side cache, and no temporary storage on our end. Your files
              remain yours and yours alone.
            </p>
          </Section>

          <Section icon={Cookie} title="Cookie Usage">
            <p>
              We use a small number of cookies to ensure the website functions properly and to
              understand how visitors interact with our tools. Here is a breakdown of the cookies
              we use:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-foreground">Essential Cookies:</strong> These are
                necessary for the website to function correctly. They include session cookies,
                theme preference cookies (such as your dark/light mode selection), and any
                technical cookies required for security and basic site operations. You cannot
                disable these cookies without affecting the functionality of the site.
              </li>
              <li>
                <strong className="text-foreground">Analytics Cookies:</strong> We use Google
                Analytics to collect anonymized data about how visitors use our website. This
                includes metrics like page views, time spent on site, bounce rate, and traffic
                sources. This data is aggregated and does not contain personally identifiable
                information. You can opt out of analytics cookies through your browser settings
                or by using browser extensions that block tracking scripts.
              </li>
            </ul>
            <p>
              We do not use cookies for advertising targeting, retargeting, or cross-site
              tracking. Our cookie usage is minimal and focused on essential functionality and
              improving your experience.
            </p>
          </Section>

          <Section icon={Users} title="Third-Party Services">
            <p>
              We rely on a limited number of third-party services to operate and improve our
              website:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-foreground">Google AdSense:</strong> We display
                advertisements through Google AdSense to keep our tools free for everyone. AdSense
                may use cookies to serve relevant ads based on your browsing history. You can
                learn more about how Google uses your data by visiting{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
                >
                  Google&apos;s Privacy Policy
                </a>
                . You can also manage your ad preferences through{" "}
                <a
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
                >
                  Google Ad Settings
                </a>
                .
              </li>
              <li>
                <strong className="text-foreground">Google Analytics:</strong> As mentioned
                above, we use Google Analytics for anonymized website traffic analysis. Google
                Analytics collects data through cookies and similar technologies. For more
                information, visit{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
                >
                  Google&apos;s Privacy Policy
                </a>
                .
              </li>
            </ul>
            <p>
              We do not share any user data with third parties beyond what is described above.
              We have no access to, nor control over, the cookies and tracking technologies used
              by these third-party services.
            </p>
          </Section>

          <Section icon={Clock} title="Data Retention">
            <p>
              Since we do not collect or store your files, there is no data retention period for
              document-related information. Your files exist only in your browser&apos;s memory
              during the active session and are automatically cleared when you close the tab or
              navigate away.
            </p>
            <p>
              Analytics data collected through Google Analytics is retained according to
              Google&apos;s data retention policies, which you can review on their website. We
              have configured our analytics to use the shortest available retention period and to
              anonymize IP addresses.
            </p>
          </Section>

          <Section icon={Lock} title="Your Rights">
            <p>
              Depending on your jurisdiction, you may have certain rights regarding your personal
              data. These may include:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>The right to access any personal data we hold about you</li>
              <li>The right to request correction of inaccurate data</li>
              <li>The right to request deletion of your data</li>
              <li>The right to object to processing of your data</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent at any time</li>
            </ul>
            <p>
              Since we collect minimal personal data, most of these rights are already satisfied
              by our privacy-first architecture. If you have any questions or wish to exercise
              any of these rights, please contact us at the email address below.
            </p>
          </Section>

          <Section icon={Mail} title="Contact Us">
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or
              how we handle data, please do not hesitate to reach out. We are committed to
              transparency and will respond to all legitimate inquiries.
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
