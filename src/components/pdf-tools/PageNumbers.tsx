'use client';

import { useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { Hash, Loader2 } from 'lucide-react';
import FileDropzone from '@/components/FileDropzone';
import ToolLayout from '@/components/ToolLayout';

export default function PageNumbers() {
  const [files, setFiles] = useState<File[]>([]);
  const [position, setPosition] = useState<'bottom-center' | 'bottom-right' | 'bottom-left'>('bottom-center');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleAddNumbers = async () => {
    if (files.length === 0) return;
    setProcessing(true);
    setError('');
    try {
      const buffer = await files[0].arrayBuffer();
      const pdf = await PDFDocument.load(buffer);
      const font = await pdf.embedFont(StandardFonts.Helvetica);
      const pages = pdf.getPages();
      pages.forEach((page, idx) => {
        const { width, height } = page.getSize();
        const text = `${idx + 1} / ${pages.length}`;
        const textWidth = font.widthOfTextAtSize(text, 10);
        let x: number;
        if (position === 'bottom-center') x = (width - textWidth) / 2;
        else if (position === 'bottom-right') x = width - textWidth - 40;
        else x = 40;
        page.drawText(text, {
          x,
          y: 30,
          size: 10,
          font,
          color: rgb(0.3, 0.3, 0.3),
        });
      });
      const bytes = await pdf.save();
      const blob = new Blob([bytes as BlobPart], { type: 'application/pdf' });
      saveAs(blob, 'numbered.pdf');
    } catch (err) {
      setError('Failed to add page numbers.');
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolLayout
      title="Page Numbers"
      description="Add page numbers to your PDF document"
      icon={<Hash className="w-8 h-8" />}
      color="#ec4899"
    >
      <FileDropzone
        accept=".pdf"
        onFiles={setFiles}
        files={files}
        onRemove={() => setFiles([])}
      />
      <div className="mt-4">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
          Position
        </label>
        <div className="flex gap-2">
          {(['bottom-left', 'bottom-center', 'bottom-right'] as const).map((pos) => (
            <button
              key={pos}
              onClick={() => setPosition(pos)}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-medium transition-all ${
                position === pos
                  ? 'bg-pink-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {pos.replace('bottom-', '').charAt(0).toUpperCase() + pos.replace('bottom-', '').slice(1)}
            </button>
          ))}
        </div>
      </div>
      {error && <p className="text-sm text-red-500 mt-3">{error}</p>}
      <button
        onClick={handleAddNumbers}
        disabled={processing || files.length === 0}
        className="mt-4 w-full py-3 px-4 rounded-xl bg-pink-500 hover:bg-pink-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-medium transition-colors flex items-center justify-center gap-2"
      >
        {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Hash className="w-4 h-4" />}
        {processing ? 'Adding...' : 'Add Page Numbers'}
      </button>
    </ToolLayout>
  );
}
