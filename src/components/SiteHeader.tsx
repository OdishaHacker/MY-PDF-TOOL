'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import {
  Menu,
  ChevronDown,
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

// ─── Desktop Nav Dropdown ────────────────────────────────────────────────────

function NavDropdown({
  category,
  isOpen,
  onToggle,
  onClose,
}: {
  category: Category;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = category.icon;

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, handleClickOutside]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={onToggle}
        onMouseEnter={onToggle}
        className={cn(
          'flex items-center gap-1.5 px-3 py-2 rounded-md text-[13px] font-medium transition-colors duration-150',
          isOpen
            ? 'bg-accent text-accent-foreground'
            : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
        )}
      >
        <Icon className="size-3.5" />
        <span>{category.name}</span>
        <ChevronDown
          className={cn(
            'size-3 transition-transform duration-150',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-0 mt-1 w-56 rounded-lg border bg-popover p-1 shadow-lg z-50"
          onMouseLeave={onClose}
        >
          <div className="px-2.5 py-1.5 mb-0.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {category.name}
            </span>
          </div>
          <Separator className="mb-1" />
          {category.tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              onClick={onClose}
              className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-100"
            >
              <FileText className="size-3.5 text-muted-foreground" />
              {tool.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const handleCloseDropdown = useCallback(
    () => setOpenDropdown(null),
    []
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur-md bg-background/80 supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
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

          {/* ── Desktop Navigation ── */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {categories.map((cat) => (
              <NavDropdown
                key={cat.slug}
                category={cat}
                isOpen={openDropdown === cat.slug}
                onToggle={() =>
                  setOpenDropdown(
                    openDropdown === cat.slug ? null : cat.slug
                  )
                }
                onClose={handleCloseDropdown}
              />
            ))}
          </nav>

          {/* ── Desktop Right Actions ── */}
          <div className="hidden lg:flex items-center gap-1">
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
      </div>
    </header>
  );
}
