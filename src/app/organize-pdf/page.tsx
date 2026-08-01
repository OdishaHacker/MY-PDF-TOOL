import type { Metadata } from 'next';
import ToolSeoPage from '@/components/ToolSeoPage';
import DynamicToolLoader from '@/components/DynamicToolLoader';

export const metadata: Metadata = {
  title: 'Organize PDF Pages Online — Reorder & Delete Pages | mypdftools',
  description:
    'Rearrange, reorder, rotate, or delete PDF pages online with visual drag and drop previews. 100% free and private.',
  keywords: ['organize pdf', 'reorder pdf pages', 'delete pdf pages', 'rearrange pdf'],
  alternates: { canonical: 'https://mypdftools.in/organize-pdf/' },
};

export default function Page() {
  return (
    <ToolSeoPage
      title="Organize & Reorder PDF Pages"
      description="Visually rearrange, rotate, or delete pages from your PDF documents with intuitive drag-and-drop controls."
      slug="organize-pdf"
      category="Organize PDF"
      howToUseSteps={[
        'Upload your PDF file to view page thumbnail previews.',
        'Drag page thumbnails to reorder them into your preferred sequence.',
        'Click page trash icons to delete unwanted pages or rotate individual thumbnails.',
        'Click "Save & Download" to generate your newly organized PDF.',
      ]}
      aboutContent="Organize PDF gives you visual page management for your PDF files. Rearrange pages, delete blank sheets, or reorder chapters easily right inside your browser without installing software."
      faqItems={[
        {
          question: 'Can I reorder pages from multiple PDFs at once?',
          answer: 'Merge your PDFs first using our Merge PDF tool, then use Organize PDF to arrange pages.',
        },
      ]}
    >
      <DynamicToolLoader toolSlug="organize-pdf" />
    </ToolSeoPage>
  );
}
