import type { Metadata } from 'next';
import ToolClient from './ToolClient';
import ToolSeoContent from '@/components/ToolSeoContent';

export const metadata: Metadata = {
  title: 'PDF to PowerPoint Online Free — Convert PDF to PPTX | mypdftools',
  description: 'Convert PDF files to editable PowerPoint presentations. Free, no upload, works in your browser. Transform PDF slides into PPTX format.',
  keywords: ['pdf to powerpoint', 'pdf to pptx', 'convert pdf to ppt', 'pdf to presentation', 'pdf to slides'],
  alternates: { canonical: 'https://mypdftools.in/pdf-to-powerpoint/' },
  openGraph: { title: 'PDF to PowerPoint Free | mypdftools', description: 'Convert PDF to PowerPoint presentations. Free, browser-based.', url: 'https://mypdftools.in/pdf-to-powerpoint/', siteName: 'mypdftools', type: 'website' },
};

export default function Page() {
  return (
    <>
      <ToolClient />
      <ToolSeoContent
        title="Convert PDF to PowerPoint — Free Online Tool"
        description="Transform your PDF documents into editable PowerPoint presentations (PPTX). Each PDF page becomes a slide that you can edit, add animations to, and present. The conversion runs entirely in your browser for complete privacy and security."
        howTo={[
          'Upload your PDF file by clicking the upload area or dragging it in.',
          'Wait for the automatic conversion to process.',
          'Download the PowerPoint file (.pptx) to your device.',
          'Open in PowerPoint or Google Slides and start editing.',
        ]}
        features={['Convert PDF pages to PowerPoint slides', 'Editable PPTX output format', 'No server uploads — 100% private', 'Works on all devices', 'Fast conversion', 'No signup required', 'Free and unlimited', 'Compatible with all presentation software']}
        faqs={[
          { q: 'Can I edit the slides after conversion?', a: 'Yes! The output PPTX file is fully editable in Microsoft PowerPoint, Google Slides, or LibreOffice Impress.' },
          { q: 'Will animations and transitions be preserved?', a: 'PDF files do not contain animation data, so the converted slides will be static. You can add animations after conversion in your presentation software.' },
          { q: 'Is this tool really free?', a: 'Yes, completely free with no hidden charges, watermarks, or usage limits.' },
        ]}
        relatedTools={[
          { name: 'PDF to Word', href: '/pdf-to-word/' },
          { name: 'PDF to Excel', href: '/pdf-to-excel/' },
          { name: 'PDF to JPG', href: '/pdf-to-jpg/' },
          { name: 'PDF to Text', href: '/pdf-to-text/' },
        ]}
      />
    </>
  );
}
