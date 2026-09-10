import React, { useState, useRef } from 'react';
import {
  Upload,
  Image as ImageIcon,
  RotateCcw,
  Check,
  AlertCircle,
  Copy,
  ExternalLink,
  Sliders,
  Sparkles,
  Loader2,
  Trash2,
} from 'lucide-react';
import { getGoogleDriveDirectImageUrl } from '../utils/googleDrive';

interface ImageUploadFieldProps {
  label: string;
  description?: string;
  value?: string;
  onChange: (url: string) => void;
  onReset?: () => void;
  defaultLogoSrc?: string;
  defaultLogoAlt?: string;
  tag?: string; // 'footer-logo' | 'header-logo' | 'favicon'
  heightValue?: number;
  onHeightChange?: (height: number) => void;
  defaultHeight?: number;
  minHeight?: number;
  maxHeight?: number;
  backgroundVariant?: 'dark' | 'light' | 'both';
  recommendedFormatText?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  description,
  value,
  onChange,
  onReset,
  defaultLogoSrc = '/logo-dentisure-white.svg',
  defaultLogoAlt = 'DentiSure Official Logo',
  tag = 'logo',
  heightValue = 40,
  onHeightChange,
  defaultHeight = 40,
  minHeight = 24,
  maxHeight = 72,
  backgroundVariant = 'dark',
  recommendedFormatText = 'PNG, SVG, or WebP with transparent background recommended',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [previewBg, setPreviewBg] = useState<'dark' | 'light'>(backgroundVariant === 'light' ? 'light' : 'dark');
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [manualUrl, setManualUrl] = useState(value || '');

  // Determine current active display image
  const resolvedUrl = value ? getGoogleDriveDirectImageUrl(value) : null;
  const displaySrc = resolvedUrl || defaultLogoSrc;
  const isCustom = Boolean(value && value.trim() !== '');

  const handleFileProcess = async (file: File) => {
    // Validate file type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setUploadError('Unsupported file type. Please upload a PNG, SVG, JPG, or WebP image.');
      return;
    }

    // Limit to 8MB
    if (file.size > 8 * 1024 * 1024) {
      setUploadError('File is too large. Maximum allowed size is 8MB.');
      return;
    }

    setUploadError(null);
    setIsUploading(true);

    try {
      // 1. Read as Data URL
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result as string;

        // Instant optimistic preview update
        onChange(base64Data);

        // 2. Real server upload via POST /api/upload
        try {
          const res = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              image: base64Data,
              filename: file.name,
              tag,
            }),
          });

          if (res.ok) {
            const data = await res.json();
            if (data.url) {
              onChange(data.url);
              setManualUrl(data.url);
              setUploadSuccess(`Uploaded successfully: ${data.filename} (${Math.round(data.size / 1024)} KB)`);
              setTimeout(() => setUploadSuccess(null), 3500);
            }
          } else {
            console.warn('Server upload returned non-200, kept local data URL');
            setUploadSuccess('Image applied locally.');
            setTimeout(() => setUploadSuccess(null), 3000);
          }
        } catch (serverErr) {
          console.warn('Upload API fetch failed, preserved local data URL:', serverErr);
          setUploadSuccess('Image applied locally.');
          setTimeout(() => setUploadSuccess(null), 3000);
        } finally {
          setIsUploading(false);
        }
      };

      reader.onerror = () => {
        setUploadError('Failed to read image file from disk.');
        setIsUploading(false);
      };

      reader.readAsDataURL(file);
    } catch (err: any) {
      setUploadError(err.message || 'Error processing file');
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileProcess(e.target.files[0]);
    }
  };

  const handleManualUrlApply = () => {
    const trimmed = manualUrl.trim();
    if (trimmed) {
      onChange(trimmed);
      setUploadSuccess('Logo URL applied.');
      setTimeout(() => setUploadSuccess(null), 2500);
    }
  };

  const handleReset = () => {
    onChange('');
    setManualUrl('');
    setUploadError(null);
    setUploadSuccess(null);
    if (onReset) onReset();
  };

  const handleCopyUrl = () => {
    if (value) {
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-slate-50/80 rounded-2xl border border-slate-200/90 p-5 space-y-4 text-xs">
      {/* Header with Title and Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-[#006A68]" />
            <span>{label}</span>
          </label>
          {description && <p className="text-[11px] text-slate-500 mt-0.5">{description}</p>}
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors cursor-pointer ${
              mode === 'upload' ? 'bg-[#006A68] text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors cursor-pointer ${
              mode === 'url' ? 'bg-[#006A68] text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Enter URL
          </button>
        </div>
      </div>

      {/* Upload Zone or URL Input */}
      {mode === 'upload' ? (
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png,image/jpeg,image/svg+xml,image/webp,image/gif"
            className="hidden"
          />

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2.5 ${
              isDragging
                ? 'border-[#006A68] bg-teal-50/60 scale-[1.01]'
                : isUploading
                ? 'border-teal-400 bg-teal-50/30'
                : 'border-slate-300 hover:border-[#006A68] bg-white hover:bg-teal-50/20'
            }`}
          >
            {isUploading ? (
              <div className="flex flex-col items-center gap-2 py-2">
                <Loader2 className="w-8 h-8 text-[#006A68] animate-spin" />
                <span className="font-bold text-slate-800 text-xs">Uploading image to server...</span>
                <span className="text-[11px] text-slate-500">Writing file to /public/uploads/</span>
              </div>
            ) : (
              <>
                <div className="w-11 h-11 rounded-2xl bg-teal-50 text-[#006A68] flex items-center justify-center shadow-xs border border-teal-100">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-slate-800 hover:text-[#006A68]">
                    Click to browse file
                  </span>{' '}
                  <span className="text-slate-500">or drag and drop here</span>
                </div>
                <div className="text-[10px] text-slate-400 font-medium">
                  {recommendedFormatText} (Max 8MB)
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={manualUrl}
              onChange={(e) => setManualUrl(e.target.value)}
              placeholder="https://... or Google Drive sharing link or /uploads/..."
              className="flex-1 p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono"
            />
            <button
              type="button"
              onClick={handleManualUrlApply}
              className="px-4 py-2 bg-[#006A68] hover:bg-[#00504E] text-white rounded-xl font-bold text-xs cursor-pointer shadow-xs transition-colors shrink-0"
            >
              Apply URL
            </button>
          </div>
          <p className="text-[10px] text-slate-500">
            Paste an image URL, Google Drive sharing link, or local uploaded path like <code className="bg-slate-200 px-1 py-0.5 rounded">/uploads/logo.png</code>.
          </p>
        </div>
      )}

      {/* Status Messages */}
      {uploadError && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 flex items-center gap-2 font-medium animate-in fade-in text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{uploadError}</span>
        </div>
      )}

      {uploadSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 flex items-center gap-2 font-semibold animate-in fade-in text-xs">
          <Check className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{uploadSuccess}</span>
        </div>
      )}

      {/* Live Preview & Dimension Controls */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-700">Live Appearance Preview:</span>
            {isCustom ? (
              <span className="px-2 py-0.5 rounded-md bg-teal-50 text-[#006A68] font-bold text-[10px] border border-teal-200 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                Custom Active
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-semibold text-[10px] border border-slate-200">
                Official Default
              </span>
            )}
          </div>

          {/* Background Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-[10px] font-bold">
            <button
              type="button"
              onClick={() => setPreviewBg('dark')}
              className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                previewBg === 'dark' ? 'bg-[#12304A] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Navy (Footer)
            </button>
            <button
              type="button"
              onClick={() => setPreviewBg('light')}
              className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                previewBg === 'light' ? 'bg-white text-slate-900 shadow-2xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              White (Header)
            </button>
          </div>
        </div>

        {/* Display Canvas */}
        <div
          className={`p-6 rounded-xl flex items-center justify-center min-h-[90px] transition-colors border ${
            previewBg === 'dark'
              ? 'bg-[#12304A] border-[#001B31]'
              : 'bg-white border-slate-200 shadow-inner'
          }`}
        >
          <img
            src={displaySrc}
            alt={defaultLogoAlt}
            style={{ height: heightValue }}
            className="w-auto object-contain transition-all select-none"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = defaultLogoSrc;
            }}
          />
        </div>

        {/* Height Slider Control */}
        {onHeightChange && (
          <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-slate-700 font-bold text-[11px]">Display Height:</span>
              <span className="font-mono text-xs font-bold text-[#006A68] bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                {heightValue}px
              </span>
            </div>

            <div className="flex items-center gap-3 flex-1 max-w-xs">
              <input
                type="range"
                min={minHeight}
                max={maxHeight}
                value={heightValue}
                onChange={(e) => onHeightChange(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#006A68]"
              />
              <button
                type="button"
                onClick={() => onHeightChange(defaultHeight)}
                className="text-[10px] text-slate-500 hover:text-slate-800 underline cursor-pointer shrink-0"
              >
                Reset ({defaultHeight}px)
              </button>
            </div>
          </div>
        )}

        {/* Action Buttons: Reset to default / Copy link */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
          <div className="text-[11px] text-slate-500 truncate max-w-xs font-mono">
            {isCustom ? (
              <span title={value} className="truncate block">
                Source: {value?.startsWith('data:') ? 'Custom File Buffer' : value}
              </span>
            ) : (
              <span>Using default: {defaultLogoSrc}</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isCustom && (
              <>
                <button
                  type="button"
                  onClick={handleCopyUrl}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy URL'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset to Official Logo</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
