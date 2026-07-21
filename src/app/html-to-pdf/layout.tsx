import type { Metadata } from 'next';
import { buildToolMetadata } from '@/lib/toolMeta';

export const metadata: Metadata = buildToolMetadata('html-to-pdf')!;

export default function ToolLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
