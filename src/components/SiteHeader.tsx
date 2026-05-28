'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import {
  Menu,
  ChevronDown,
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
  Search,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
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

// ─── All tools flat list for search ──────────────────────────────────────────

const allTools = categories.flatMap((cat) =>
  cat.tools.map((tool) => ({
    ...tool,
    category: cat.name,
  }))
);

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

// ─── Search with Dropdown ────────────────────────────────────────────────────

function SearchDropdown() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allTools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q)
    );
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            if (query.trim()) setOpen(true);
          }}
          placeholder="Search tools..."
          className="h-8 w-[180px] pl-8 pr-3 text-[13px] rounded-md"
        />
      </div>
      {open && filtered.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-popover text-popover-foreground border rounded-md shadow-md overflow-hidden">
          <div className="max-h-64 overflow-y-auto p-1">
            {filtered.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                onClick={() => {
                  setOpen(false);
                  setQuery('');
                }}
                className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-[13px] hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <FileText className="size-3.5 text-muted-foreground shrink-0" />
                <span className="truncate">{tool.name}</span>
                <span className="ml-auto text-[11px] text-muted-foreground shrink-0">
                  {tool.category}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Mobile Sidebar ──────────────────────────────────────────────────────────

function MobileSidebar({
  mobileOpen,
  setMobileOpen,
}: {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}) {
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  return (
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
                      setMobileExpanded(isExpanded ? null : cat.slug)
                    }
                    className="flex items-center justify-between w-full rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon className="size-4 text-muted-foreground" />
                      {cat.name}
                    </span>
                    <ChevronDown
                      className={cn(
                        'size-4 text-muted-foreground transition-transform duration-150',
                        isExpanded && 'rotate-180'
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
  );
}

// ─── Main Header ─────────────────────────────────────────────────────────────

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur-md bg-background/80 supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between gap-2">
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

          {/* ── Desktop Navigation: Category Dropdowns ── */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = cat.tools.some((tool) => pathname === tool.href);
              return (
                <DropdownMenu key={cat.slug}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={cn(
                        'flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[13px] font-medium transition-colors duration-150 whitespace-nowrap',
                        isActive
                          ? 'bg-accent text-accent-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                      )}
                    >
                      <Icon className="size-3.5" />
                      <span>{cat.name}</span>
                      <ChevronDown className="size-3 opacity-60" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-48">
                    {cat.tools.map((tool) => (
                      <DropdownMenuItem key={tool.href} asChild>
                        <Link
                          href={tool.href}
                          className={cn(
                            'flex items-center gap-2 cursor-pointer',
                            pathname === tool.href && 'bg-accent'
                          )}
                        >
                          <FileText className="size-3.5 text-muted-foreground" />
                          {tool.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
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
            <SearchDropdown />
            <ThemeToggle />
          </div>

          {/* ── Mobile Actions ── */}
          <div className="flex items-center gap-1 lg:hidden">
            <ThemeToggle />
            <MobileSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
          </div>
        </div>
      </div>
    </header>
  );
}
