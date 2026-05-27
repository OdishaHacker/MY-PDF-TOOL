'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import {
  Menu,
  ChevronRight,
  Sun,
  Moon,
  Layers,
  Zap,
  FileUp,
  FileOutput,
  Pencil,
  Shield,
  FileText,
  LayoutGrid,
  X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

// ─── Types ───────────────────────────────────────────────────────────────────

interface SubTool {
  name: string;
  href: string;
}

interface Category {
  name: string;
  slug: string;
  icon: LucideIcon;
  tools: SubTool[];
}

// ─── Data ────────────────────────────────────────────────────────────────────

const categories: Category[] = [
  {
    name: 'Organize',
    slug: 'organize',
    icon: Layers,
    tools: [
      { name: 'Merge PDF', href: '/merge-pdf' },
      { name: 'Split PDF', href: '/split-pdf' },
      { name: 'Organize PDF', href: '/organize-pdf' },
      { name: 'Rotate PDF', href: '/rotate-pdf' },
    ],
  },
  {
    name: 'Optimize',
    slug: 'optimize',
    icon: Zap,
    tools: [
      { name: 'Compress PDF', href: '/compress-pdf' },
      { name: 'Repair PDF', href: '/repair-pdf' },
    ],
  },
  {
    name: 'Convert to PDF',
    slug: 'convert-to-pdf',
    icon: FileUp,
    tools: [
      { name: 'JPG to PDF', href: '/jpg-to-pdf' },
      { name: 'Word to PDF', href: '/word-to-pdf' },
      { name: 'HTML to PDF', href: '/html-to-pdf' },
      { name: 'Text to PDF', href: '/text-to-pdf' },
    ],
  },
  {
    name: 'Convert from PDF',
    slug: 'convert-from-pdf',
    icon: FileOutput,
    tools: [
      { name: 'PDF to JPG', href: '/pdf-to-jpg' },
      { name: 'PDF to Word', href: '/pdf-to-word' },
      { name: 'PDF to Excel', href: '/pdf-to-excel' },
      { name: 'PDF to PPT', href: '/pdf-to-powerpoint' },
      { name: 'PDF to Text', href: '/pdf-to-text' },
    ],
  },
  {
    name: 'Edit',
    slug: 'edit',
    icon: Pencil,
    tools: [
      { name: 'Edit PDF', href: '/edit-pdf' },
      { name: 'Watermark', href: '/add-watermark' },
      { name: 'Page Numbers', href: '/page-numbers' },
      { name: 'Crop PDF', href: '/crop-pdf' },
      { name: 'Redact PDF', href: '/redact-pdf' },
    ],
  },
  {
    name: 'Security',
    slug: 'security',
    icon: Shield,
    tools: [
      { name: 'Protect PDF', href: '/protect-pdf' },
      { name: 'Unlock PDF', href: '/unlock-pdf' },
      { name: 'Sign PDF', href: '/sign-pdf' },
    ],
  },
];

// ─── Theme Toggle ────────────────────────────────────────────────────────────

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="size-8" aria-label="Toggle theme">
        <Sun className="size-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-8"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
    </Button>
  );
}

// ─── Main Header ─────────────────────────────────────────────────────────────

export default function SiteHeader() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();

  // Auto-select category based on current route
  useEffect(() => {
    const matchingCategory = categories.find((cat) =>
      cat.tools.some((tool) => pathname === tool.href)
    );
    if (matchingCategory) {
      setActiveCategory(matchingCategory.slug);
    }
  }, [pathname]);

  const toggleCategory = (slug: string) => {
    setActiveCategory((prev) => (prev === slug ? null : slug));
  };

  const activeCategoryData = categories.find((c) => c.slug === activeCategory);

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur-md bg-background/80 supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Main Row ── */}
        <div className="flex h-14 items-center justify-between gap-4">
          {/* ── Logo / Brand ── */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <span className="inline-flex items-center justify-center size-8 rounded-md bg-gradient-to-br from-rose-500 to-orange-500 text-white text-[11px] font-bold tracking-tight leading-none select-none">
              PDF
            </span>
            <span className="text-[15px] font-semibold tracking-tight text-foreground">
              mypdf<span className="text-muted-foreground font-normal">tools</span>
              <span className="text-muted-foreground/60 text-xs font-normal">.in</span>
            </span>
          </Link>

          {/* ── Desktop Navigation: Category Tabs ── */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => toggleCategory(cat.slug)}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-2 rounded-md text-[13px] font-medium transition-colors duration-150 whitespace-nowrap',
                    isActive
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  )}
                >
                  <Icon className="size-3.5" />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </nav>

          {/* ── Desktop Right Actions ── */}
          <div className="hidden lg:flex items-center gap-1 shrink-0">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="text-[13px] font-medium gap-1.5"
              >
                <LayoutGrid className="size-3.5" />
                All Tools
              </Button>
            </Link>
            <Link href="/blog">
              <Button
                variant="ghost"
                size="sm"
                className="text-[13px] font-medium"
              >
                Blog
              </Button>
            </Link>
            <Separator orientation="vertical" className="mx-1 h-5" />
            <ThemeToggle />
          </div>

          {/* ── Mobile Actions ── */}
          <div className="flex items-center gap-1 lg:hidden">
            <ThemeToggle />
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="size-9" aria-label="Open menu">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] p-0">
                <SheetHeader className="border-b px-4 py-4">
                  <SheetTitle className="flex items-center gap-2.5">
                    <span className="inline-flex items-center justify-center size-7 rounded-md bg-gradient-to-br from-rose-500 to-orange-500 text-white text-[10px] font-bold tracking-tight leading-none select-none">
                      PDF
                    </span>
                    <span className="text-base font-semibold tracking-tight">
                      mypdf<span className="text-muted-foreground font-normal">tools</span>
                      <span className="text-muted-foreground/60 text-xs font-normal">.in</span>
                    </span>
                  </SheetTitle>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-80px)]">
                  <div className="py-2">
                    {/* Quick Links */}
                    <div className="px-3 py-1">
                      <Link
                        href="/"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition-colors"
                      >
                        <LayoutGrid className="size-4 text-muted-foreground" />
                        All Tools
                      </Link>
                      <Link
                        href="/blog"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition-colors"
                      >
                        <FileText className="size-4 text-muted-foreground" />
                        Blog
                      </Link>
                    </div>

                    <Separator className="my-2" />

                    {/* Categories */}
                    {categories.map((cat) => {
                      const Icon = cat.icon;
                      const isExpanded = mobileExpanded === cat.slug;

                      return (
                        <div key={cat.slug} className="px-3">
                          <button
                            onClick={() =>
                              setMobileExpanded(
                                isExpanded ? null : cat.slug
                              )
                            }
                            className="flex items-center justify-between w-full rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition-colors"
                          >
                            <span className="flex items-center gap-2.5">
                              <Icon className="size-4 text-muted-foreground" />
                              {cat.name}
                            </span>
                            <ChevronRight
                              className={cn(
                                'size-4 text-muted-foreground transition-transform duration-150',
                                isExpanded && 'rotate-90'
                              )}
                            />
                          </button>

                          {isExpanded && (
                            <div className="ml-6 pl-3 border-l border-border py-0.5 mb-1">
                              {cat.tools.map((tool) => (
                                <Link
                                  key={tool.href}
                                  href={tool.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                                >
                                  <FileText className="size-3.5" />
                                  {tool.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* ── Desktop Sub-Row: Tools for Active Category ── */}
        {activeCategoryData && (
          <div className="hidden lg:flex items-center gap-1 pb-2 -mt-1 overflow-x-auto scrollbar-none">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mr-2 shrink-0 pl-1">
              {activeCategoryData.name}
            </span>
            <Separator orientation="vertical" className="h-4 mr-1 shrink-0" />
            {activeCategoryData.tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                onClick={() => setActiveCategory(null)}
                className={cn(
                  'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12.5px] font-medium whitespace-nowrap transition-colors duration-150 shrink-0',
                  pathname === tool.href
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/60'
                )}
              >
                <FileText className="size-3" />
                {tool.name}
              </Link>
            ))}
            <button
              onClick={() => setActiveCategory(null)}
              className="inline-flex items-center justify-center size-6 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors shrink-0 ml-1"
              aria-label="Close category tools"
            >
              <X className="size-3.5" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
