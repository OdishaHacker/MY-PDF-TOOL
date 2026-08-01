import type { Metadata } from 'next';
import ToolSeoPage from '@/components/ToolSeoPage';
import DynamicToolLoader from '@/components/DynamicToolLoader';

export const metadata: Metadata = {
  title: 'Edit PDF Online Free — Add Text, Images & Annotations | mypdftools',
  description:
    'Full-featured PDF editor online. Add text, drawings, shapes, whiteout areas, and images directly onto PDF pages for free.',
  keywords: ['edit pdf', 'pdf editor online free', 'annotate pdf', 'add text to pdf'],
  alternates: { canonical: 'https://mypdftools.in/edit-pdf/' },
};

export default function Page() {
  return (
    <ToolSeoPage
      title="Edit PDF Online Free"
      description="Annotate, draw, insert images, add text boxes, or whiteout sensitive content on PDF documents."
      slug="edit-pdf"
      category="Edit PDF"
      howToUseSteps={[
        'Upload your PDF document to load the interactive canvas editor.',
        'Use tools from the sidebar to add text, draw freehand, insert shapes, or whiteout text.',
        'Adjust font size, color, or opacity of elements.',
        'Click "Export PDF" to download your edited document.',
      ]}
      aboutContent="Our web PDF Editor gives you visual editing tools to annotate documents, fill forms, add signatures, or mask out content locally in your browser."
      faqItems={[
        {
          question: 'Can I fill out non-interactive PDF forms?',
          answer: 'Yes! Use the "Add Text" tool to type answers directly onto form fields.',
        },
      ]}
    >
      <DynamicToolLoader toolSlug="edit-pdf" />
    </ToolSeoPage>
  );
}
