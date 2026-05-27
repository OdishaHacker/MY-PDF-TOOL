'use client';

import { useState } from 'react';
import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { Droplets, Loader2 } from 'lucide-react';
import FileDropzone from '@/components/FileDropzone';
import ToolLayout from '@/components/ToolLayout';

export default function AddWatermark() {
  const [files, setFiles] = useState<File[]>([]);
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleAddWatermark = async () => {
    if (files.length === 0) return;
    if (!watermarkText.trim()) {
      setError('Please enter watermark text.');
      return;
    }
    setProcessing(true);
    setError('');
    try {
      const buffer = await files[0].arrayBuffer();
      const pdf = await PDFDocument.load(buffer);
      const font = await pdf.embedFont(StandardFonts.HelveticaBold);
      const pages = pdf.getPages();
      for (const page of pages) {
        const { width, height } = page.getSize();
        const textWidth = font.widthOfTextAtSize(watermarkText, 60);
        page.drawText(watermarkText, {
          x: (width - textWidth) / 2,
          y: height / 2,
          size: 60,
          font,
          color: rgb(0.75, 0.75, 0.75),
          opacity: 0.3,
          rotate: degrees(-45),
        });
      }
      const bytes = await pdf.save();
      const blob = new Blob([bytes as BlobPart], { type: 'application/pdf' });
      saveAs(blob, 'watermarked.pdf');
    } catch (err) {
      setError('Failed to add watermark.');
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolLayout
      title="Add Watermark"
      description="Add diagonal watermark text to all PDF pages"
      icon={<Droplets className="w-8 h-8" />}
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
          Watermark Text
        </label>
        <input
          type="text"
          value={watermarkText}
          onChange={(e) => setWatermarkText(e.target.value)}
          placeholder="e.g., CONFIDENTIAL, DRAFT"
          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>
      {error && <p className="text-sm text-red-500 mt-3">{error}</p>}
      <button
        onClick={handleAddWatermark}
        disabled={processing || files.length === 0 || !watermarkText.trim()}
        className="mt-4 w-full py-3 px-4 rounded-xl bg-pink-500 hover:bg-pink-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-medium transition-colors flex items-center justify-center gap-2"
      >
        {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Droplets className="w-4 h-4" />}
        {processing ? 'Adding...' : 'Add Watermark'}
      </button>
    </ToolLayout>
  );
}
