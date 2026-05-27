'use client';

import { useState } from 'react';
import { saveAs } from 'file-saver';
import { FileImage, Loader2 } from 'lucide-react';
import FileDropzone from '@/components/FileDropzone';
import ToolLayout from '@/components/ToolLayout';

export default function PdfToJpg() {
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
      const totalPages = pdf.numPages;
      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i);
        const scale = 2;
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const context = canvas.getContext('2d')!;
        await page.render({ canvasContext: context, viewport, canvas } as any).promise;
        const blob = await new Promise<Blob>((resolve) => {
          canvas.toBlob((b) => resolve(b!), 'image/jpeg', 0.92);
        });
        saveAs(blob, `page-${i}.jpg`);
      }
    } catch (err) {
      setError('Failed to convert PDF to images.');
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolLayout
      title="PDF to JPG"
      description="Convert PDF pages to JPG images"
      icon={<FileImage className="w-8 h-8" />}
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
        {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileImage className="w-4 h-4" />}
        {processing ? 'Converting...' : 'Convert to JPG'}
      </button>
    </ToolLayout>
  );
}
