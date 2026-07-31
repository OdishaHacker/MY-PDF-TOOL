import type { Metadata } from 'next';
import ToolClient from './ToolClient';
import ToolSeoContent from '@/components/ToolSeoContent';

export const metadata: Metadata = {
  title: 'Merge PDF Online Free — Combine PDF Files in Browser | mypdftools',
  description: 'Combine multiple PDF files into one document right in your browser. Free, no upload, no signup, no watermark. Drag to reorder and merge in seconds.',
  keywords: ['merge pdf', 'combine pdf', 'join pdf', 'merge pdf online', 'free pdf merger', 'no upload pdf merge'],
  alternates: { canonical: 'https://mypdftools.in/merge-pdf/' },
  openGraph: {
    title: 'Merge PDF Online Free — Combine PDF Files in Browser | mypdftools',
    description: 'Combine multiple PDF files into one document right in your browser. Free, no upload, no signup, no watermark. Drag to reorder and merge in seconds.',
    url: 'https://mypdftools.in/merge-pdf/',
    siteName: 'mypdftools',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Merge PDF Online Free — Combine PDF Files in Browser | mypdftools',
    description: 'Combine multiple PDF files into one document right in your browser. Free, no upload, no signup, no watermark.',
  },
};

export default function Page() {
  return (
    <>
      <ToolClient />
      <ToolSeoContent
        title="Merge PDF Files Online — Free & Private"
        description="Need to combine multiple PDF documents into one file? Our free online PDF merger makes it easy. Simply drag and drop your PDF files, reorder them as needed, and merge them into a single document — all without uploading anything to a server. Your files stay on your device, processed entirely in your browser for maximum privacy and speed."
        howTo={[
          'Click the upload area or drag and drop your PDF files into the tool.',
          'Rearrange the files by dragging them into the order you want.',
          'Click the "Merge" button to combine all PDFs into one document.',
          'Download your merged PDF file instantly — no email or signup required.',
        ]}
        features={[
          '100% browser-based — no server uploads',
          'Drag-and-drop file reordering',
          'Merge unlimited PDF files at once',
          'No watermarks added to output',
          'Works on desktop and mobile devices',
          'No registration or email required',
          'Fast processing with instant download',
          'Completely free to use',
        ]}
        faqs={[
          { q: 'Is it safe to merge PDFs online?', a: 'Yes! Our tool processes everything locally in your browser. Your PDF files are never uploaded to any server, making it one of the safest ways to merge documents online.' },
          { q: 'How many PDF files can I merge at once?', a: 'You can merge as many PDF files as you want. There is no limit on the number of files. However, very large files may take slightly longer to process depending on your device.' },
          { q: 'Do I need to create an account to merge PDFs?', a: 'No, you do not need to sign up, create an account, or provide any personal information. The tool is completely free and anonymous.' },
          { q: 'Can I change the order of pages before merging?', a: 'Yes! You can drag and drop the PDF files to reorder them before merging. The final merged document will follow the order you set.' },
          { q: 'What happens to my files after merging?', a: 'Your files stay on your device. Since processing happens in your browser, no files are ever sent to our servers. Once you close the tab, all data is gone.' },
        ]}
        relatedTools={[
          { name: 'Split PDF', href: '/split-pdf/' },
          { name: 'Compress PDF', href: '/compress-pdf/' },
          { name: 'Organize PDF', href: '/organize-pdf/' },
          { name: 'Rotate PDF', href: '/rotate-pdf/' },
          { name: 'PDF to Word', href: '/pdf-to-word/' },
        ]}
      />
    </>
  );
}
