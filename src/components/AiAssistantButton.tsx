import React, { useState } from 'react';
import { Sparkles, Loader2, Check, X, RefreshCw } from 'lucide-react';

interface AiAssistantButtonProps {
  type: 'title' | 'description' | 'blog_title' | 'blog_outline' | 'blog_content' | 'seo' | 'rephrase';
  currentText?: string;
  onApply: (generatedText: string) => void;
  label?: string;
  className?: string;
  compact?: boolean;
}

export const AiAssistantButton: React.FC<AiAssistantButtonProps> = ({
  type,
  currentText = '',
  onApply,
  label = 'AI Assistant (Demo)',
  className = '',
  compact = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          prompt,
          currentText,
        }),
      });

      if (!response.ok) {
        // Try /api/ai fallback
        const altResponse = await fetch('/api/ai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type,
            prompt,
            currentText,
          }),
        });
        if (!altResponse.ok) throw new Error('Generation failed');
        const data = await altResponse.json();
        setGeneratedText(data.result || '');
        return;
      }

      const data = await response.json();
      setGeneratedText(data.result || '');
    } catch (err: any) {
      console.warn('AI generate error, using local fallback:', err);
      // Fallback if network issue
      if (type.includes('title')) {
        setGeneratedText('Dental Billing & Revenue Cycle Management | Maximize Practice Collections');
      } else {
        setGeneratedText('Specialized US dental revenue cycle management (RCM) and claims billing. We connect directly to your PMS to eliminate aging AR and accelerate practice cash flow.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = () => {
    if (generatedText) {
      onApply(generatedText);
      setIsOpen(false);
      setGeneratedText('');
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIsOpen(true);
          if (!generatedText) {
            handleGenerate();
          }
        }}
        className={`inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition-colors cursor-pointer ${
          compact ? 'px-2 py-1 text-[11px]' : 'px-2.5 py-1.5'
        } ${className}`}
        title="Generate or refine with AI Assistant (Demo)"
      >
        <Sparkles className="w-3.5 h-3.5 text-teal-600 animate-pulse" />
        <span>{label}</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="bg-[#12304A] text-white px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-teal-500/20 text-teal-300 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                    AI Content Assistant
                  </h4>
                  <span className="text-[10px] text-teal-300 font-medium">Demo Feature — Client Preview</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Topic / Guidance (Optional)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g. Dental claim denial prevention, aging AR recovery..."
                    className="flex-1 p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleGenerate();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="px-3 py-2 bg-[#16A6A3] hover:bg-teal-600 text-white rounded-lg font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                    <span>Generate</span>
                  </button>
                </div>
              </div>

              {/* Suggestions */}
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[10px] text-slate-400 font-semibold self-center mr-1">Quick Suggestions:</span>
                {['Claims Denial Reduction', 'Aging AR Recovery', 'Pre-Visit Verification', 'Fee Schedule Review'].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setPrompt(s);
                    }}
                    className="px-2 py-0.5 bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-600 rounded text-[10px] font-medium border border-slate-200 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Generated Result */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-slate-700">Generated Output Preview</label>
                  {generatedText && (
                    <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                      <Check className="w-3 h-3" /> Ready to Apply
                    </span>
                  )}
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl min-h-[90px] max-h-[160px] overflow-y-auto text-slate-800 leading-relaxed font-sans text-xs">
                  {isLoading ? (
                    <div className="h-full flex items-center justify-center py-6 text-slate-400 gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-[#16A6A3]" />
                      <span>Writing with AI...</span>
                    </div>
                  ) : generatedText ? (
                    generatedText
                  ) : (
                    <span className="text-slate-400 italic">Click Generate to preview AI generated content.</span>
                  )}
                </div>
              </div>

              {/* Mandatory Demo Watermark */}
              <div className="px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-[11px] flex items-center justify-between">
                <span className="font-medium">
                  ✨ <strong>Demo Watermark:</strong> AI Assistant (Demo Feature - Client Preview Version)
                </span>
                <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                  DEMO
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded-lg font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApply}
                disabled={!generatedText || isLoading}
                className="px-4 py-1.5 bg-[#16A6A3] hover:bg-teal-600 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Apply to Field</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
