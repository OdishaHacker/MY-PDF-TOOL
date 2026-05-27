'use client';

import { useState } from 'react';
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';
import { Image as ImageIcon, Loader2 } from 'lucide-react';
import FileDropzone from '@/components/FileDropzone';
import ToolLayout from '@/components/ToolLayout';

export default function JpgToPdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleConvert = async () => {
    if (files.length === 0) return;
    setProcessing(true);
    setError('');
    try {
      const pdf = new jsPDF();
      for (let i = 0; i < files.length; i++) {
        if (i > 0) pdf.addPage();
        const file = files[i];
        const dataUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
        const img = new Image();
        img.src = dataUrl;
        await new Promise<void>((resolve) => {
          img.onload = () => resolve();
        });
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const ratio = Math.min(pageWidth / img.width, pageHeight / img.height);
        const w = img.width * ratio;
        const h = img.height * ratio;
        const x = (pageWidth - w) / 2;
        const y = (pageHeight - h) / 2;
        pdf.addImage(dataUrl, 'JPEG', x, y, w, h);
      }
      const blob = pdf.output('blob');
      saveAs(blob, 'images-to-pdf.pdf');
    } catch (err) {
      setError('Failed to convert images to PDF.');
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolLayout
      title="JPG to PDF"
      description="Convert JPG, PNG, or WebP images to PDF"
      icon={<ImageIcon className="w-8 h-8" />}
      color="#a855f7"
    >
      <FileDropzone
        accept=".jpg,.jpeg,.png,.webp"
        multiple
        onFiles={setFiles}
        files={files}
        onRemove={(i) => setFiles((prev) => prev.filter((_, idx) => idx !== i))}
        maxFiles={50}
      />
      {error && <p className="text-sm text-red-500 mt-3">{error}</p>}
      <button
        onClick={handleConvert}
        disabled={processing || files.length === 0}
        className="mt-4 w-full py-3 px-4 rounded-xl bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-medium transition-colors flex items-center justify-center gap-2"
      >
        {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
        {processing ? 'Converting...' : 'Convert to PDF'}
      </button>
    </ToolLayout>
  );
}
