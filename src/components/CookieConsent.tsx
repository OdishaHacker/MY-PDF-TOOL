'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, ShieldCheck, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('mypdftools_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setShowConsent(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('mypdftools_cookie_consent', 'accepted');
    setShowConsent(false);
  };

  const handleDecline = () => {
    localStorage.setItem('mypdftools_cookie_consent', 'declined');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <aside
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-card/95 backdrop-blur-md border border-border/80 rounded-2xl shadow-2xl p-5 text-foreground space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0">
              <Cookie className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Privacy &amp; Cookie Policy</h4>
              <p className="text-xs text-muted-foreground">Your files stay on your device.</p>
            </div>
          </div>
          <button
            onClick={handleDecline}
            className="text-muted-foreground hover:text-foreground p-1 rounded-md transition-colors"
            aria-label="Close cookie banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          We use essential cookies and local browser storage to personalize your experience, remember preferences, and serve relevant ads via Google AdSense. All PDF processing happens 100% locally in your browser.
        </p>

        <div className="flex items-center justify-between gap-2 pt-1">
          <Link
            href="/privacy-policy"
            className="text-xs text-primary hover:underline font-medium inline-flex items-center gap-1"
          >
            <ShieldCheck className="h-3.5 w-3.5" /> Privacy Policy
          </Link>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDecline}
              className="text-xs h-8 px-3 rounded-lg"
            >
              Essential Only
            </Button>
            <Button
              size="sm"
              onClick={handleAccept}
              className="text-xs h-8 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Accept All
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
