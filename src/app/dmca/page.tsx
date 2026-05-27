import Link from "next/link";
import { Scale, ArrowLeft, FileWarning, ClipboardList, ArrowRightLeft, Ban, Mail, AlertCircle, CheckSquare } from "lucide-react";

export const metadata = {
  title: "DMCA / Copyright — mypdftools",
  description:
    "Learn about the DMCA and copyright policy for mypdftools.in. Report copyright infringement or file a counter-notification.",
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

export default function DmcaPage() {
  return (
    <div className="bg-background">

      <main className="flex-1">
        {/* Hero Banner */}
        <div className="border-b bg-muted/30">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Scale className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                  DMCA / Copyright Policy
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Last updated: March 4, 2025
                </p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              mypdftools respects the intellectual property rights of others and expects its
              users to do the same. This page outlines our policies and procedures for
              responding to notices of alleged copyright infringement in accordance with the
              Digital Millennium Copyright Act (DMCA) and applicable copyright laws.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
          <Section icon={FileWarning} title="Copyright Infringement Reporting">
            <p>
              If you believe that your copyrighted work has been copied, reproduced, or is
              accessible on mypdftools.in in a way that constitutes copyright infringement,
              please notify us by sending a DMCA takedown notice to the contact information
              provided below. We take all legitimate infringement claims seriously and will
              respond promptly to properly submitted notices.
            </p>
            <p>
              It is important to note that mypdftools is a tool-based website — we provide
              PDF processing utilities and do not host, store, or distribute copyrighted
              content. However, we understand that concerns may arise, and we are committed
              to addressing them fairly and promptly.
            </p>
          </Section>

          <Section icon={ClipboardList} title="DMCA Takedown Procedure">
            <p>
              If you are a copyright owner (or authorized to act on behalf of a copyright
              owner) and believe that content on mypdftools.in infringes your copyright,
              you may submit a written DMCA takedown notice to our designated copyright
              agent. To be valid, your notice must include the following elements as required
              by the DMCA:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                A physical or electronic signature of the copyright owner or a person
                authorized to act on their behalf
              </li>
              <li>
                Identification of the copyrighted work that you claim has been infringed.
                If multiple works are covered by a single notification, you may provide a
                representative list of such works
              </li>
              <li>
                Identification of the material that you claim is infringing and that is to
                be removed or access to which is to be disabled, including information
                reasonably sufficient to permit us to locate the material (such as the URL
                or specific page on our website where the material appears)
              </li>
              <li>
                Information reasonably sufficient to permit us to contact you, such as your
                name, address, telephone number, and email address
              </li>
              <li>
                A statement that you have a good faith belief that the use of the material
                in the manner complained of is not authorized by the copyright owner, its
                agent, or the law
              </li>
              <li>
                A statement, made under penalty of perjury, that the information in your
                notice is accurate and that you are the copyright owner or authorized to
                act on behalf of the copyright owner
              </li>
            </ul>
            <p>
              Please send your DMCA takedown notice to:
            </p>
            <div className="mt-2 p-4 rounded-xl border bg-card">
              <p className="text-foreground font-medium">mypdftools — DMCA Contact</p>
              <p className="mt-1">
                <strong className="text-foreground">Email:</strong>{" "}
                <a
                  href="mailto:support@mypdftools.in"
                  className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
                >
                  support@mypdftools.in
                </a>
              </p>
              <p className="mt-0.5 text-sm">
                Please include &quot;DMCA Takedown Notice&quot; in your email subject line.
              </p>
            </div>
          </Section>

          <Section icon={ArrowRightLeft} title="Counter-Notification Process">
            <p>
              If you believe that your content was removed or disabled as a result of a
              mistake or misidentification, you may submit a counter-notification. To be
              valid under the DMCA, your counter-notification must include:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Your physical or electronic signature
              </li>
              <li>
                Identification of the material that was removed or to which access was
                disabled, and the location at which the material appeared before it was
                removed or access was disabled
              </li>
              <li>
                A statement, made under penalty of perjury, that you have a good faith
                belief that the material was removed or disabled as a result of mistake or
                misidentification of the material
              </li>
              <li>
                Your name, address, telephone number, and a statement that you consent to
                the jurisdiction of the federal court in your district (or the district
                where you are located, if outside the United States), and that you will
                accept service of process from the person who provided the original DMCA
                notification or an agent of such person
              </li>
            </ul>
            <p>
              Upon receipt of a valid counter-notification, we will forward it to the
              original complainant and restore the removed content within 10 to 14 business
              days, unless the complainant files a court action against you.
            </p>
            <p>
              Please send counter-notifications to the same email address above, with
              &quot;DMCA Counter-Notification&quot; in the subject line.
            </p>
          </Section>

          <Section icon={Ban} title="Repeat Infringer Policy">
            <p>
              In accordance with the DMCA and other applicable laws, mypdftools has adopted
              a policy of terminating, in appropriate circumstances, users or account holders
              who are deemed to be repeat infringers. mypdftools may also, at its sole
              discretion, limit access to the website and/or terminate the accounts of any
              users who infringe any intellectual property rights of others, whether or not
              there is any repeat infringement.
            </p>
            <p>
              While mypdftools does not require user accounts to access most tools, we
              reserve the right to restrict access to the website via IP blocking, browser
              fingerprinting, or other technical means in cases of repeated or egregious
              copyright violations.
            </p>
          </Section>

          <Section icon={AlertCircle} title="Important Notes">
            <p>
              Please be aware that under Section 512(f) of the DMCA, any person who
              knowingly materially misrepresents that material or activity is infringing may
              be subject to liability for damages. This means that if you falsely claim that
              content infringes your copyright, you could be held legally responsible for
              costs including attorney fees.
            </p>
            <p>
              Similarly, if you file a counter-notification that contains false statements,
              you may be liable for damages. We encourage all parties to carefully review
              their claims before submitting DMCA notices or counter-notifications.
            </p>
          </Section>

          <Section icon={Mail} title="Contact Us">
            <p>
              For any questions about this DMCA policy, or if you need guidance on filing a
              notice, please do not hesitate to contact us. We are committed to handling all
              copyright matters fairly and in accordance with the law.
            </p>
            <p>
              <strong className="text-foreground">DMCA Email:</strong>{" "}
              <a
                href="mailto:support@mypdftools.in"
                className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
              >
                support@mypdftools.in
              </a>
            </p>
            <p>
              <strong className="text-foreground">General Inquiries:</strong>{" "}
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
