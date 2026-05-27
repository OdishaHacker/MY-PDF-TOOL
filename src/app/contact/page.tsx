import Link from "next/link";
import { Mail, ArrowLeft, Clock, MessageCircle, HelpCircle, Send, User, Tag, FileText } from "lucide-react";

export const metadata = {
  title: "Contact Us — mypdftools",
  description:
    "Get in touch with the mypdftools team. Reach out for support, feedback, or questions about our free PDF tools. We respond within 24-48 hours.",
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

export default function ContactPage() {
  return (
    <div className="bg-background">

      <main className="flex-1">
        {/* Hero Banner */}
        <div className="border-b bg-muted/30">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                  Contact Us
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  We are here to help. Reach out anytime.
                </p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Whether you have a question about one of our tools, need technical support,
              want to report a bug, or just want to share feedback — we would love to hear
              from you. Our team reads every message and we do our best to respond as quickly
              as we can.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
          <Section icon={Mail} title="Email Us Directly">
            <p>
              The fastest way to reach us is by email. Drop us a message and we will get back
              to you as soon as possible. Whether it is a question, a suggestion, or a
              technical issue, we are happy to help.
            </p>
            <div className="mt-4 p-4 rounded-xl border bg-card">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Email Address</p>
                  <a
                    href="mailto:support@mypdftools.in"
                    className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
                  >
                    support@mypdftools.in
                  </a>
                </div>
              </div>
            </div>
          </Section>

          <Section icon={Clock} title="Response Time">
            <p>
              We understand that when you reach out, you want a timely response. Our team
              monitors the inbox regularly, and we aim to respond to all inquiries within 24
              to 48 hours during business days. During weekends and holidays, response times
              may be slightly longer, but we will always get back to you.
            </p>
            <p>
              For urgent matters, please include &quot;Urgent&quot; in your email subject line, and
              we will do our best to prioritize your request.
            </p>
          </Section>

          {/* Contact Form (Static/Decorative) */}
          <div className="mb-8">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                <Send className="h-4 w-4" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Send Us a Message</h2>
            </div>
            <div className="pl-[42px]">
              <div className="rounded-xl border bg-card p-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-muted-foreground" />
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                    <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="What is this about?"
                    className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                    Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell us more about your question or feedback..."
                    className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
                  />
                </div>
                <a
                  href="mailto:support@mypdftools.in"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
                >
                  <Send className="h-4 w-4" />
                  Send Message
                </a>
                <p className="text-xs text-muted-foreground mt-2">
                  Clicking &quot;Send Message&quot; will open your email client. You can also email us
                  directly at{" "}
                  <a
                    href="mailto:support@mypdftools.in"
                    className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
                  >
                    support@mypdftools.in
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>

          {/* FAQ about Contacting */}
          <Section icon={HelpCircle} title="Frequently Asked Questions About Contacting Us">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-foreground mb-1">
                  What types of questions can I ask?
                </h3>
                <p>
                  Anything related to mypdftools! Whether you need help using a specific tool,
                  want to report a bug, have a feature request, or have questions about our
                  privacy practices — we are happy to assist. We also welcome general feedback,
                  partnership inquiries, and suggestions for improving the site.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-foreground mb-1">
                  Can I request a new PDF tool?
                </h3>
                <p>
                  Absolutely! We are always looking to expand our toolkit. If there is a PDF
                  operation you need that we do not currently offer, let us know. We prioritize
                  new tools based on user demand, and your request could be the one that pushes
                  a new feature to the top of our list.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-foreground mb-1">
                  What should I include in my support email?
                </h3>
                <p>
                  To help us resolve your issue quickly, please include the following: the tool
                  you were using, the browser and version you are running, a description of the
                  problem, and any error messages you received. Screenshots are also very helpful
                  if you can include them.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-foreground mb-1">
                  Do you offer phone support?
                </h3>
                <p>
                  At this time, we only offer support via email. This allows us to keep our
                  costs low and continue offering all our PDF tools for free. Email support also
                  gives us the time to thoroughly investigate issues and provide detailed
                  responses.
                </p>
              </div>
            </div>
          </Section>

          <Section icon={MessageCircle} title="Other Ways to Connect">
            <p>
              We are always looking for ways to improve mypdftools and your feedback is
              invaluable. Beyond email, you can also connect with us by visiting our website
              and exploring our tools. If you spot something that could be better, we want to
              know about it.
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
