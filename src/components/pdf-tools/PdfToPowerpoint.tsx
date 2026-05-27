'use client';

import { useState } from 'react';
import { saveAs } from 'file-saver';
import PptxGenJS from 'pptxgenjs';
import { Presentation, Loader2 } from 'lucide-react';
import FileDropzone from '@/components/FileDropzone';
import ToolLayout from '@/components/ToolLayout';

export default function PdfToPowerpoint() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleConvert = async () => {
    if (files.length === 0) return;
    setProcessing(true);
    setError('');
    try {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
      const buffer = await files[0].arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
      const pptx = new PptxGenJS();
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d')!;
        await page.render({ canvasContext: ctx, viewport, canvas } as any).promise;
        const imgData = canvas.toDataURL('image/jpeg', 0.92);
        const slide = pptx.addSlide();
        slide.addImage({
          data: imgData,
          x: 0,
          y: 0,
          w: '100%',
          h: '100%',
        });
      }
      const pptxBlob = await pptx.write({ outputType: 'blob' }) as Blob;
      saveAs(pptxBlob, 'converted.pptx');
    } catch (err) {
      setError('Failed to convert PDF to PowerPoint.');
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolLayout
      title="PDF to PowerPoint"
      description="Convert PDF pages to PowerPoint slides"
      icon={<Presentation className="w-8 h-8" />}
      color="#f97316"
    >
      <FileDropzone
        accept=".pdf"
        onFiles={setFiles}
        files={files}
        onRemove={() => setFiles([])}
      />
      {error && <p className="text-sm text-red-500 mt-3">{error}</p>}
      <button
        onClick={handleConvert}
        disabled={processing || files.length === 0}
        className="mt-4 w-full py-3 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-medium transition-colors flex items-center justify-center gap-2"
      >
        {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Presentation className="w-4 h-4" />}
        {processing ? 'Converting...' : 'Convert to PowerPoint'}
      </button>
    </ToolLayout>
  );
}
