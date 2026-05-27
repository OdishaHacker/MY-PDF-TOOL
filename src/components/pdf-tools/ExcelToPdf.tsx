'use client';

import { useState } from 'react';
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { Table, Loader2 } from 'lucide-react';
import FileDropzone from '@/components/FileDropzone';
import ToolLayout from '@/components/ToolLayout';

export default function ExcelToPdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleConvert = async () => {
    if (files.length === 0) return;
    setProcessing(true);
    setError('');
    try {
      const file = files[0];
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: 'array' });
      const pdf = new jsPDF({ orientation: 'landscape' });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      let firstSheet = true;
      for (const sheetName of workbook.SheetNames) {
        const sheet = workbook.Sheets[sheetName];
        const data: string[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        if (!firstSheet) pdf.addPage();
        firstSheet = false;
        pdf.setFontSize(14);
        pdf.text(sheetName, margin, margin + 5);
        pdf.setFontSize(8);
        let y = margin + 15;
        const colWidth = Math.min(40, (pageWidth - margin * 2) / Math.max(data[0]?.length || 1, 1));
        for (const row of data) {
          if (y > pageHeight - margin) {
            pdf.addPage();
            y = margin;
          }
          let x = margin;
          for (let c = 0; c < (row as string[]).length; c++) {
            const cellValue = String((row as string[])[c] ?? '');
            pdf.text(cellValue.slice(0, 20), x, y);
            x += colWidth;
          }
          y += 6;
        }
      }
      const blob = pdf.output('blob');
      saveAs(blob, 'converted.pdf');
    } catch (err) {
      setError('Failed to convert Excel file. Please ensure it is a valid .xlsx file.');
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolLayout
      title="Excel to PDF"
      description="Convert Excel (.xlsx) spreadsheets to PDF"
      icon={<Table className="w-8 h-8" />}
      color="#a855f7"
    >
      <FileDropzone
        accept=".xlsx,.xls"
        onFiles={setFiles}
        files={files}
        onRemove={() => setFiles([])}
      />
      {error && <p className="text-sm text-red-500 mt-3">{error}</p>}
      <button
        onClick={handleConvert}
        disabled={processing || files.length === 0}
        className="mt-4 w-full py-3 px-4 rounded-xl bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-medium transition-colors flex items-center justify-center gap-2"
      >
        {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Table className="w-4 h-4" />}
        {processing ? 'Converting...' : 'Convert to PDF'}
      </button>
    </ToolLayout>
  );
}
