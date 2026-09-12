import React, { useState, useRef } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link,
  Image,
  Table,
  Minus,
  Eye,
  Edit3,
  Columns,
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

interface RichBlogEditorProps {
  value: string;
  onChange: (value: string) => void;
  title?: string;
  onTitleChange?: (title: string) => void;
  topic?: string;
}

export const RichBlogEditor: React.FC<RichBlogEditorProps> = ({
  value,
  onChange,
  title = '',
  onTitleChange,
  topic = '',
}) => {
  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'split'>('editor');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiMessage, setAiMessage] = useState<string | null>(null);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Helper to insert formatting around selection or at cursor
  const insertFormatting = (prefix: string, suffix: string = '', placeholder: string = 'text') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.substring(start, end) || placeholder;

    const before = value.substring(0, start);
    const after = value.substring(end);

    const replacement = `${prefix}${selected}${suffix}`;
    const newValue = before + replacement + after;
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selected.length
      );
    }, 10);
  };

  const insertBlock = (blockText: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const before = value.substring(0, start);
    const after = value.substring(start);

    // Ensure leading newline if not at start
    const leadingNewline = before.length > 0 && !before.endsWith('\n\n') ? '\n\n' : '';
    const newValue = before + leadingNewline + blockText + '\n\n' + after;
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
    }, 10);
  };

  // AI Generation Handlers (Demo Mode)
  const handleAiGenerateOutline = async () => {
    setIsAiLoading(true);
    setAiMessage(null);
    try {
      const prompt = topic || title || 'Dental insurance billing and denial prevention';
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'blog_outline',
          prompt,
          currentText: value,
        }),
      });

      const data = await response.json();
      if (data.result) {
        onChange((value ? value + '\n\n' : '') + data.result);
        setAiMessage('✨ AI Guide Outline Added (Demo)');
        setTimeout(() => setAiMessage(null), 3000);
      }
    } catch (e) {
      console.warn('AI call error, adding fallback outline:', e);
      insertBlock(
        `### Executive Overview\nCapturing verified insurance benefits before patient seating protects dental practice cash flow.\n\n### 1. The Pre-Visit Scrub\nAlways verify eligibility 48 hours in advance.\n\n### 2. Upfront Co-Pay Collection\nCollect estimated patient portions at check-in.\n\n### 3. Aging AR Follow-Up Protocol\nRun weekly 30+ day aging insurance bucket audits.`
      );
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleAiPolish = async () => {
    if (!value.trim()) return;
    setIsAiLoading(true);
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'rephrase',
          prompt: 'Refine and polish for executive dental practice leadership',
          currentText: value,
        }),
      });
      const data = await response.json();
      if (data.result) {
        onChange(data.result);
        setAiMessage('✨ Content Polished with AI (Demo)');
        setTimeout(() => setAiMessage(null), 3000);
      }
    } catch (e) {
      console.warn('AI polish error:', e);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Statistics
  const words = value.trim() ? value.trim().split(/\s+/).length : 0;
  const chars = value.length;
  const readMinutes = Math.max(1, Math.ceil(words / 200));

  // Render basic markdown preview HTML
  const renderPreviewHtml = (markdown: string) => {
    if (!markdown) {
      return '<p class="text-slate-400 italic">No content yet. Type in the editor or click "AI Write (Demo)" to generate an article.</p>';
    }

    let html = markdown
      // Headings
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold text-slate-900 mt-5 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-slate-900 mt-6 mb-3 pb-1 border-b border-slate-200">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-black text-slate-900 mt-6 mb-4 pb-2 border-b border-slate-200">$1</h1>')
      // Bold, Italic, Strikethrough
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold text-slate-900">$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em class="italic text-slate-800">$1</em>')
      .replace(/~~(.*?)~~/gim, '<del class="line-through text-slate-400">$1</del>')
      // Blockquote
      .replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-[#16A6A3] bg-teal-50/50 pl-4 py-2 my-3 text-slate-700 italic">$1</blockquote>')
      // Bullet lists
      .replace(/^\- (.*$)/gim, '<li class="ml-5 list-disc text-slate-700 leading-relaxed">$1</li>')
      .replace(/^\* (.*$)/gim, '<li class="ml-5 list-disc text-slate-700 leading-relaxed">$1</li>')
      // Numbered lists
      .replace(/^[0-9]+\. (.*$)/gim, '<li class="ml-5 list-decimal text-slate-700 leading-relaxed">$1</li>')
      // Horizontal rule
      .replace(/^---$/gim, '<hr class="my-6 border-slate-200" />')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" class="text-[#16A6A3] font-medium underline" target="_blank">$1</a>')
      // Paragraphs
      .replace(/\n\n+/g, '</p><p class="mb-3 text-slate-700 leading-relaxed">');

    return `<p class="mb-3 text-slate-700 leading-relaxed">${html}</p>`;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* 1. Top Bar: WordPress-style Title Input + Mode Switcher */}
      <div className="bg-slate-50 border-b border-slate-200 p-3 sm:px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 bg-slate-200 px-2 py-0.5 rounded">
            WordPress-Style Editor
          </span>
          {aiMessage && (
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 px-2.5 py-0.5 rounded-full flex items-center gap-1 animate-in fade-in">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {aiMessage}
            </span>
          )}
        </div>

        {/* View Mode Tabs */}
        <div className="flex items-center gap-1 bg-slate-200 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab('editor')}
            className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'editor'
                ? 'bg-white text-[#12304A] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Visual / Edit</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('split')}
            className={`hidden md:flex px-3 py-1 rounded-lg text-xs font-bold items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'split'
                ? 'bg-white text-[#12304A] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Split View</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'preview'
                ? 'bg-white text-[#12304A] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Preview</span>
          </button>
        </div>
      </div>

      {/* 2. WordPress Formatting Toolbar */}
      {activeTab !== 'preview' && (
        <div className="bg-white border-b border-slate-200 p-2 sm:px-4 flex flex-wrap items-center gap-1 text-slate-700 text-xs">
          {/* Headings */}
          <div className="flex items-center gap-0.5 border-r border-slate-200 pr-1.5 mr-1">
            <button
              type="button"
              onClick={() => insertFormatting('## ', '', 'Section Heading')}
              title="Heading 2 (H2)"
              className="p-1.5 hover:bg-slate-100 rounded text-slate-700 hover:text-teal-700"
            >
              <Heading2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('### ', '', 'Subsection Heading')}
              title="Heading 3 (H3)"
              className="p-1.5 hover:bg-slate-100 rounded text-slate-700 hover:text-teal-700"
            >
              <Heading3 className="w-4 h-4" />
            </button>
          </div>

          {/* Text Styling */}
          <div className="flex items-center gap-0.5 border-r border-slate-200 pr-1.5 mr-1">
            <button
              type="button"
              onClick={() => insertFormatting('**', '**', 'bold text')}
              title="Bold (Ctrl+B)"
              className="p-1.5 hover:bg-slate-100 rounded text-slate-700 hover:text-teal-700"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('*', '*', 'italic text')}
              title="Italic (Ctrl+I)"
              className="p-1.5 hover:bg-slate-100 rounded text-slate-700 hover:text-teal-700"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('<u>', '</u>', 'underlined text')}
              title="Underline"
              className="p-1.5 hover:bg-slate-100 rounded text-slate-700 hover:text-teal-700"
            >
              <Underline className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('~~', '~~', 'strikethrough')}
              title="Strikethrough"
              className="p-1.5 hover:bg-slate-100 rounded text-slate-700 hover:text-teal-700"
            >
              <Strikethrough className="w-4 h-4" />
            </button>
          </div>

          {/* Lists & Quotes */}
          <div className="flex items-center gap-0.5 border-r border-slate-200 pr-1.5 mr-1">
            <button
              type="button"
              onClick={() => insertFormatting('- ', '', 'List item')}
              title="Bullet List"
              className="p-1.5 hover:bg-slate-100 rounded text-slate-700 hover:text-teal-700"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('1. ', '', 'Numbered item')}
              title="Numbered List"
              className="p-1.5 hover:bg-slate-100 rounded text-slate-700 hover:text-teal-700"
            >
              <ListOrdered className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('> ', '', 'Executive quote or key highlight')}
              title="Blockquote"
              className="p-1.5 hover:bg-slate-100 rounded text-slate-700 hover:text-teal-700"
            >
              <Quote className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('`', '`', 'code')}
              title="Inline Code"
              className="p-1.5 hover:bg-slate-100 rounded text-slate-700 hover:text-teal-700"
            >
              <Code className="w-4 h-4" />
            </button>
          </div>

          {/* WordPress Elements: Link, Image, Table, Divider */}
          <div className="flex items-center gap-0.5 border-r border-slate-200 pr-1.5 mr-1">
            <button
              type="button"
              onClick={() => setShowLinkModal(true)}
              title="Insert Link"
              className="p-1.5 hover:bg-slate-100 rounded text-slate-700 hover:text-teal-700"
            >
              <Link className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setShowImageModal(true)}
              title="Insert Image"
              className="p-1.5 hover:bg-slate-100 rounded text-slate-700 hover:text-teal-700"
            >
              <Image className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() =>
                insertBlock(
                  `| CDT Code | Description | Standard Fee | Reimbursed |\n|---|---|---|---|\n| D0150 | Comprehensive Oral Exam | $120.00 | $95.00 |\n| D0210 | Intraoral Complete Series | $165.00 | $140.00 |\n| D1110 | Prophylaxis - Adult | $110.00 | $88.00 |`
                )
              }
              title="Insert Fee Schedule Comparison Table"
              className="p-1.5 hover:bg-slate-100 rounded text-slate-700 hover:text-teal-700"
            >
              <Table className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertBlock('---')}
              title="Horizontal Divider"
              className="p-1.5 hover:bg-slate-100 rounded text-slate-700 hover:text-teal-700"
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>

          {/* AI Assistant Controls (Demo Feature) */}
          <div className="flex items-center gap-1.5 ml-auto">
            <button
              type="button"
              onClick={handleAiGenerateOutline}
              disabled={isAiLoading}
              className="px-2.5 py-1 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
            >
              {isAiLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin text-teal-600" /> : <Sparkles className="w-3.5 h-3.5 text-teal-600" />}
              <span>✨ AI Write Guide (Demo)</span>
            </button>

            <button
              type="button"
              onClick={handleAiPolish}
              disabled={isAiLoading || !value.trim()}
              className="hidden sm:flex px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold items-center gap-1 transition-colors cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-3 h-3 text-slate-500" />
              <span>Polish Copy</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. Editor Content Area */}
      <div className="relative">
        {activeTab === 'editor' && (
          <textarea
            ref={textareaRef}
            rows={14}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Write your article in WordPress Markdown format or click '✨ AI Write Guide (Demo)' to generate a complete draft..."
            className="w-full p-4 font-mono text-xs text-slate-800 leading-relaxed focus:outline-none bg-white min-h-[320px] resize-y"
          />
        )}

        {activeTab === 'preview' && (
          <div
            className="p-6 bg-white min-h-[320px] max-h-[500px] overflow-y-auto prose prose-slate max-w-none text-xs leading-relaxed"
            dangerouslySetInnerHTML={{ __html: renderPreviewHtml(value) }}
          />
        )}

        {activeTab === 'split' && (
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 min-h-[340px]">
            <textarea
              ref={textareaRef}
              rows={14}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Write content here..."
              className="p-4 font-mono text-xs text-slate-800 leading-relaxed focus:outline-none bg-white h-full resize-none"
            />
            <div
              className="p-4 bg-slate-50/50 overflow-y-auto max-h-[400px] text-xs leading-relaxed"
              dangerouslySetInnerHTML={{ __html: renderPreviewHtml(value) }}
            />
          </div>
        )}
      </div>

      {/* 4. Footer: Stats & Mandatory Client Demo Watermark */}
      <div className="bg-slate-50 border-t border-slate-200 px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
        <div className="flex items-center gap-4 text-[11px] font-mono">
          <span>{words} words</span>
          <span>{chars} characters</span>
          <span>~{readMinutes} min read</span>
        </div>

        {/* Subtle Watermark for Client Review */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50/80 border border-amber-200/80 rounded-md text-amber-800 text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          <span className="font-semibold">
            ✨ AI Assistant &amp; WordPress Content Editor (Demo — Client Review Version)
          </span>
        </div>
      </div>

      {/* Link Insertion Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-5 max-w-sm w-full shadow-xl border border-slate-200 space-y-3">
            <h4 className="text-sm font-bold text-slate-900">Insert Link</h4>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Anchor Text</label>
              <input
                type="text"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                placeholder="e.g. Schedule Practice Audit"
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Target URL</label>
              <input
                type="text"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com/page"
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (linkUrl) {
                    insertFormatting(`[${linkText || 'link'}](${linkUrl})`);
                  }
                  setShowLinkModal(false);
                  setLinkUrl('');
                  setLinkText('');
                }}
                className="px-4 py-1.5 bg-[#16A6A3] hover:bg-teal-600 text-white rounded-lg text-xs font-bold"
              >
                Insert Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Insertion Modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-5 max-w-sm w-full shadow-xl border border-slate-200 space-y-3">
            <h4 className="text-sm font-bold text-slate-900">Insert Image</h4>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Image URL</label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg or /uploads/..."
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Alt Text</label>
              <input
                type="text"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                placeholder="Dental billing workflow chart"
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (imageUrl) {
                    insertBlock(`![${imageAlt || 'image'}](${imageUrl})`);
                  }
                  setShowImageModal(false);
                  setImageUrl('');
                  setImageAlt('');
                }}
                className="px-4 py-1.5 bg-[#16A6A3] hover:bg-teal-600 text-white rounded-lg text-xs font-bold"
              >
                Insert Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
