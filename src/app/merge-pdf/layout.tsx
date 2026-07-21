import type { Metadata } from 'next';
import { buildToolMetadata } from '@/lib/toolMeta';

export const metadata: Metadata = buildToolMetadata('merge-pdf')!;

export default function ToolLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
