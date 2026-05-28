'use client'

import React from 'react'
import { ArrowLeft, BookOpen, Info, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { motion } from 'framer-motion'

interface FaqItem {
  question: string
  answer: string
}

interface ToolLayoutProps {
  title: string
  description: string
  icon: React.ReactNode
  onBack: () => void
  children: React.ReactNode
  howToUseSteps?: string[]
  aboutContent?: string
  faqItems?: FaqItem[]
}

function getDefaultHowToUseSteps(title: string): string[] {
  const lower = title.toLowerCase()

  if (lower.includes('merge') || lower.includes('combine')) {
    return [
      'Click the upload area or drag and drop the PDF files you want to merge. You can add as many files as you need.',
      'Arrange the files in the order you want them to appear in the final document by dragging them into position.',
      'Once your files are in the right order, click the "Merge PDF" button to combine them.',
      'After processing is complete, click "Download" to save your merged PDF to your device.',
    ]
  }

  if (lower.includes('split')) {
    return [
      'Upload the PDF file you want to split by clicking the upload area or dragging it onto the page.',
      'Choose how you want to split the document — by specific page ranges, every N pages, or extract individual pages.',
      'Click the "Split PDF" button to process your file according to your selections.',
      'Download the resulting split PDF files individually or as a ZIP archive.',
    ]
  }

  if (lower.includes('compress')) {
    return [
      'Upload the PDF file you want to reduce in size by clicking the upload area or dragging it onto the page.',
      'Select your preferred compression level — lighter compression for better quality, or stronger compression for smaller files.',
      'Click the "Compress PDF" button and wait a moment while the tool optimizes your file.',
      'Review the before and after file sizes, then click "Download" to save your compressed PDF.',
    ]
  }

  if (lower.includes('rotate')) {
    return [
      'Upload the PDF file containing the pages you want to rotate.',
      'Select the rotation angle (90°, 180°, or 270°) and choose which pages to rotate.',
      'Click the "Rotate PDF" button to apply the rotation to your selected pages.',
      'Download the rotated PDF file to your device.',
    ]
  }

  if (lower.includes('convert') || lower.includes('to pdf')) {
    return [
      'Upload the file you want to convert — this tool supports common formats like images, documents, and more.',
      'Adjust any conversion settings such as page size, orientation, or quality if available.',
      'Click the "Convert to PDF" button to process your file into a PDF document.',
      'Download your newly created PDF file directly to your device.',
    ]
  }

  if (
    lower.includes('pdf to') ||
    lower.includes('extract') ||
    lower.includes('to jpg') ||
    lower.includes('to word') ||
    lower.includes('to excel') ||
    lower.includes('to text') ||
    lower.includes('to powerpoint') ||
    lower.includes('to image')
  ) {
    return [
      'Upload the PDF file you want to convert by clicking the upload area or dragging it onto the page.',
      'Choose any available conversion options such as output format settings or page selection.',
      'Click the "Convert" button to extract and transform the content from your PDF.',
      'Download the converted file in your chosen format directly to your device.',
    ]
  }

  if (
    lower.includes('watermark') ||
    lower.includes('protect') ||
    lower.includes('unlock') ||
    lower.includes('password')
  ) {
    return [
      'Upload the PDF file you want to modify by clicking the upload area or dragging it onto the page.',
      'Configure the settings — enter your watermark text, set a password, or provide the existing password to unlock.',
      'Click the action button to apply the changes to your PDF document.',
      'Download the updated PDF file to your device.',
    ]
  }

  if (
    lower.includes('sign') ||
    lower.includes('edit') ||
    lower.includes('annotate') ||
    lower.includes('redact')
  ) {
    return [
      'Upload the PDF file you want to edit by clicking the upload area or dragging it onto the page.',
      'Use the built-in editor to add your signature, text annotations, or redact sensitive information.',
      'Review your changes on the document preview to make sure everything looks right.',
      'Click "Download" to save the modified PDF to your device.',
    ]
  }

  if (
    lower.includes('page number') ||
    lower.includes('crop') ||
    lower.includes('organize') ||
    lower.includes('reorder')
  ) {
    return [
      'Upload the PDF file you want to modify by clicking the upload area or dragging it onto the page.',
      'Choose your settings — add page numbers, set crop margins, or drag pages to reorder them.',
      'Click the action button to process your PDF with the selected modifications.',
      'Download the updated PDF file to your device.',
    ]
  }

  if (lower.includes('repair') || lower.includes('fix')) {
    return [
      'Upload the corrupted or damaged PDF file by clicking the upload area or dragging it onto the page.',
      'The tool will automatically analyze the file structure and attempt to repair any issues.',
      'Review the repair results and check if the file has been successfully recovered.',
      'Click "Download" to save the repaired PDF to your device.',
    ]
  }

  // Generic default
  return [
    'Upload your PDF file by clicking the upload area or dragging and dropping it onto the page.',
    'Configure the available settings and options for the operation you want to perform.',
    'Click the action button to process your file — all work happens right in your browser.',
    'Download the result to your device once processing is complete.',
  ]
}

function getDefaultAboutContent(title: string): string {
  const lower = title.toLowerCase()

  if (lower.includes('merge') || lower.includes('combine')) {
    return `The ${title} is a free online tool that lets you combine multiple PDF files into a single, well-organized document. Whether you're putting together a report from separate sections, merging contracts and supporting documents, or consolidating scanned pages, this tool makes the process quick and painless. You don't need to install any software or create an account — simply upload your files, arrange them in the order you want, and download your merged PDF in seconds. Everything runs directly in your browser, which means your files never leave your device. There are no file size limits or hidden restrictions, and the entire process is completely free. It works on any modern browser and any device, whether you're on a desktop computer, tablet, or phone.`
  }

  if (lower.includes('split')) {
    return `The ${title} gives you a simple way to break a large PDF into smaller, more manageable pieces. Maybe you only need a few pages from a lengthy report, or you want to extract a specific chapter from an e-book — this tool handles all of that without requiring any software installation. You can split by page ranges, extract individual pages, or divide the document evenly. Every operation happens right in your browser, so your files stay on your computer and are never uploaded to a remote server. The tool is completely free, works on all devices and browsers, and produces high-quality results that preserve the original formatting and layout of your pages.`
  }

  if (lower.includes('compress')) {
    return `The ${title} helps you reduce the file size of your PDF documents without sacrificing too much on quality. Large PDF files can be a real headache — they're slow to email, take up unnecessary storage space, and can even fail to upload to certain platforms that have strict size limits. This tool optimizes your PDF by removing redundant data, compressing images, and streamlining the file structure. You can choose between different compression levels depending on whether you prioritize file size or visual fidelity. Everything runs locally in your browser, so your sensitive documents never get sent over the internet. It's fast, free, and works on any device.`
  }

  if (lower.includes('convert') || lower.includes('to pdf')) {
    return `The ${title} makes it incredibly easy to transform your files into professional-quality PDF documents. PDF is the universal format for sharing documents because it preserves formatting across all devices and platforms. With this tool, you can convert your source files into clean, well-formatted PDFs without needing expensive software or complicated setup. Just upload your file, adjust any available settings, and download the resulting PDF. The entire conversion process runs in your browser, so your data stays private and secure. No registration is required, there are no watermarks added to your documents, and the tool is completely free to use as often as you need.`
  }

  if (
    lower.includes('pdf to') ||
    lower.includes('extract') ||
    lower.includes('to jpg') ||
    lower.includes('to word') ||
    lower.includes('to excel') ||
    lower.includes('to text') ||
    lower.includes('to powerpoint') ||
    lower.includes('to image')
  ) {
    return `The ${title} allows you to convert your PDF files into editable and reusable formats. Sometimes you need to work with the content inside a PDF — whether that's editing text in a word processor, analyzing data in a spreadsheet, or using images from the document. This tool extracts and converts your PDF content quickly and accurately, right in your browser. There's no need to download desktop software or pay for expensive subscriptions. Your files are processed entirely on your device, keeping your information private and secure. The tool is free to use, works on any device with a modern browser, and delivers results in seconds.`
  }

  if (lower.includes('watermark')) {
    return `The ${title} lets you add professional watermark text to your PDF documents to protect your intellectual property or brand your files. Watermarks are an effective way to deter unauthorized copying and ensure your documents are clearly identified as yours. You can customize the watermark text, adjust its positioning, and control the transparency so it's visible without obscuring the underlying content. The entire process takes place in your browser — your files are never uploaded to any external server. This tool is completely free, requires no sign-up, and works on any device. Whether you're protecting a draft document, branding company materials, or marking files as confidential, this tool gets the job done quickly.`
  }

  if (lower.includes('protect') || lower.includes('password')) {
    return `The ${title} enables you to add password protection to your PDF files, ensuring that only authorized people can open and view the contents. In a world where sensitive documents are routinely shared over email and cloud storage, password protection is a critical safeguard for your privacy. This tool lets you set a secure password on your PDF without needing specialized software. Everything is processed locally in your browser, so your documents never leave your device during the encryption process. The tool is free, fast, and works on any device with a modern browser. Protect contracts, financial statements, medical records, or any other confidential documents with just a few clicks.`
  }

  if (lower.includes('unlock')) {
    return `The ${title} helps you remove password protection from PDF files when you have the correct password but want to make the file more accessible for everyday use. It's frustrating to repeatedly enter a password every time you need to open a document you legitimately have access to. This tool lets you remove that barrier quickly and easily, as long as you know the current password. The process runs entirely in your browser, so your files and passwords are never sent to any external server. It's free, private, and works on any device. Simply upload your protected PDF, enter the password, and download an unlocked version of the file.`
  }

  if (lower.includes('sign')) {
    return `The ${title} provides a simple and convenient way to add your signature directly to PDF documents without printing them out. In today's digital world, signing documents electronically saves time, paper, and hassle. This tool lets you draw your signature using your mouse or touchscreen, then place it precisely where it needs to go on the document. You can resize and reposition the signature to fit the designated signing area. The entire process happens in your browser, so your signed documents remain private and never get uploaded to a remote server. Whether you're signing a contract, an agreement, or a form, this free tool makes the process fast and straightforward on any device.`
  }

  if (lower.includes('edit') || lower.includes('annotate') || lower.includes('redact')) {
    return `The ${title} gives you the ability to modify your PDF documents directly in your browser without needing to buy or install expensive PDF editing software. Whether you need to add text annotations, redact sensitive information, or make other modifications to your PDF, this tool handles it all with an intuitive interface. It's perfect for filling out forms, adding comments, or removing confidential data before sharing a document. All processing happens locally on your device, which means your files stay completely private — nothing is ever uploaded to a server. The tool is free to use, requires no account, and works on any modern browser on any device.`
  }

  if (lower.includes('page number')) {
    return `The ${title} lets you add page numbers to your PDF documents, making them easier to navigate and reference. Whether you're preparing a report, a manual, or a multi-page document for printing, page numbers are essential for organization. This tool gives you control over the numbering style, position, and starting number so you can get exactly the result you need. The processing all happens in your browser — your files never leave your device. It's completely free, requires no registration, and works on any device with a modern browser. Add professional page numbering to your documents in just a few clicks.`
  }

  if (lower.includes('crop')) {
    return `The ${title} allows you to trim unwanted margins, borders, or whitespace from your PDF pages, giving you a cleaner and more focused document. Cropping is especially useful for scanned documents that have excessive blank space around the edges, or for trimming a PDF to fit a specific paper size before printing. This tool lets you define the crop area for each page or apply the same crop across all pages at once. Everything runs locally in your browser, so your files remain private and are never sent to an external server. The tool is free, fast, and works on any device.`
  }

  if (lower.includes('rotate')) {
    return `The ${title} is a quick and easy way to fix the orientation of pages in your PDF document. Whether a page was scanned upside down, a landscape page needs to be rotated, or you simply need to adjust the orientation for better readability, this tool handles it effortlessly. You can rotate individual pages or the entire document by 90, 180, or 270 degrees. The entire process takes place in your browser, so your files stay private and are never uploaded to any server. It's completely free, requires no software installation, and works on any device with a modern browser. Fix your PDF orientations in seconds.`
  }

  if (lower.includes('organize') || lower.includes('reorder')) {
    return `The ${title} lets you rearrange the pages in your PDF document by simply dragging and dropping them into the order you want. Whether you need to move a section to a different position, bring important pages to the front, or reorganize a document after merging several files, this tool makes it straightforward. The intuitive interface lets you see all your pages at a glance and reorder them with ease. All processing happens right in your browser, keeping your files completely private. No software to install, no account to create, and no cost — just a free tool that works on any device to help you organize your PDFs the way you need them.`
  }

  if (lower.includes('repair') || lower.includes('fix')) {
    return `The ${title} attempts to recover and repair PDF files that have become corrupted or damaged. PDF files can break for many reasons — a failed download, a storage device error, or incomplete writing during creation. When a PDF won't open or displays errors, this tool analyzes the file structure and tries to reconstruct the readable content. While not every damaged file can be fully recovered, the tool can often salvage most or all of the original document. Everything runs locally in your browser, so even damaged files containing sensitive information remain private. The tool is completely free and works on any device with a modern browser.`
  }

  // Fallback generic
  return `The ${title} is a free, browser-based tool designed to help you work with PDF files quickly and easily. There's no need to download or install any software — simply open this page in any modern browser on your computer, tablet, or phone, and you're ready to go. All file processing happens directly on your device, which means your documents never leave your browser and are never uploaded to any server. This makes the tool especially suitable for working with sensitive or confidential files. The interface is straightforward and intuitive, so even if you're not particularly tech-savvy, you'll be able to get your task done in just a few clicks. There are no hidden fees, no watermarks on your output, and no limits on how many files you can process. Whether you're a student, a professional, or just someone who occasionally needs to work with PDFs, this tool is built to save you time and hassle.`
}

function getDefaultFaqItems(title: string): FaqItem[] {
  return [
    {
      question: `Is the ${title} completely free to use?`,
      answer: `Yes, the ${title} is 100% free with no hidden charges, subscriptions, or premium tiers. You can process as many files as you need without ever paying a cent. We believe essential PDF tools should be accessible to everyone, which is why there are no usage limits or watermarks added to your output files.`,
    },
    {
      question: 'Are my files safe? Is my data private?',
      answer: 'Absolutely. All file processing happens directly in your browser using JavaScript — your files are never uploaded to any server or cloud service. Once you close the tab, the data is gone. This means your sensitive documents, contracts, and personal information remain completely private and under your control at all times.',
    },
    {
      question: 'What file size limits apply?',
      answer: "Since all processing happens locally in your browser, the main limitation is your device's available memory. Most modern devices can comfortably handle PDF files up to 100 MB or more. For very large files, we recommend closing other browser tabs and applications to free up memory for the best experience.",
    },
    {
      question: 'Does this tool work on mobile devices?',
      answer: 'Yes, this tool is fully responsive and works on smartphones and tablets running modern browsers like Chrome, Safari, Firefox, or Edge. The interface adapts to your screen size, so you can upload, process, and download files from your phone just as easily as from a desktop computer.',
    },
    {
      question: `What happens to the quality of my PDF when using the ${title}?`,
      answer: "The tool is designed to preserve the original quality of your PDF as much as possible. Text, images, and formatting are maintained throughout the process. In cases where quality adjustments are involved (such as compression), you'll typically have options to balance between file size and quality so you can choose what works best for your needs.",
    },
  ]
}

const sectionVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
}

export default function ToolLayout({
  title,
  description,
  icon,
  onBack,
  children,
  howToUseSteps,
  aboutContent,
  faqItems,
}: ToolLayoutProps) {
  const steps = howToUseSteps || getDefaultHowToUseSteps(title)
  const about = aboutContent || getDefaultAboutContent(title)
  const faqs = faqItems || getDefaultFaqItems(title)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-3xl"
    >
      {/* Back Button - Alone on its own row */}
      <div className="pt-4 mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="shrink-0 rounded-xl hover:bg-primary/10"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
      </div>

      {/* Tool Name + Logo - Below back button */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#EE6C4D]/15 to-[#D04526]/10 text-[#EE6C4D] shadow-sm">
            {icon}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h1>
            <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
          </div>
        </div>
      </div>

      {/* Tool Content */}
      <div className="space-y-6">{children}</div>

      {/* Privacy notice */}
      <div className="mt-8 rounded-xl border bg-muted/30 p-4 flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-500/10 text-green-600 dark:text-green-400">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium">Your files stay private</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            All processing happens in your browser. No files are uploaded to any server.
          </p>
        </div>
      </div>

      {/* How to Use Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-12"
      >
        <div className="flex items-center gap-2.5 mb-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <BookOpen className="h-4 w-4" />
          </div>
          <h2 className="text-xl font-semibold tracking-tight">How to Use {title}</h2>
        </div>
        <div className="space-y-3 ml-1">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-3.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#EE6C4D] to-[#D04526] text-white text-xs font-bold shadow-sm">
                {index + 1}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground pt-1">{step}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="mt-12"
      >
        <div className="flex items-center gap-2.5 mb-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Info className="h-4 w-4" />
          </div>
          <h2 className="text-xl font-semibold tracking-tight">About {title}</h2>
        </div>
        <div className="rounded-xl border bg-muted/20 p-5">
          <p className="text-sm leading-7 text-muted-foreground">{about}</p>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mt-12 mb-12"
      >
        <div className="flex items-center gap-2.5 mb-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <HelpCircle className="h-4 w-4" />
          </div>
          <h2 className="text-xl font-semibold tracking-tight">Frequently Asked Questions</h2>
        </div>
        <div className="rounded-xl border bg-muted/10 overflow-hidden">
          <Accordion type="single" collapsible className="px-5">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-sm font-medium text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </motion.section>
    </motion.div>
  )
}
