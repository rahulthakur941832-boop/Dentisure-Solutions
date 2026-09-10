import React, { useState } from 'react';
import {
  Download,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Layers,
  FileCheck,
  ShieldCheck,
  Eye,
  Info,
} from 'lucide-react';

export interface LogoAssetItem {
  id: string;
  badge: string;
  title: string;
  description: string;
  pngPath: string;
  svgPath: string;
  dimensions: string;
  isTransparent?: boolean;
  isActiveFavicon?: boolean;
  isActiveNavbar?: boolean;
  previewType: 'logo-white' | 'logo-transparent' | 'fav-white' | 'fav-transparent' | 'fav-512';
}

export const BRAND_ASSETS: LogoAssetItem[] = [
  {
    id: 'logo-white',
    badge: 'LOGO (PNG - WHITE BACKGROUND)',
    title: 'Primary Horizontal Logo — White Background',
    description: 'Full horizontal lockup with tooth crest, rising bars, tagline, and soft ground shadow. Ideal for white documents, letterheads, and print.',
    pngPath: '/logo-white.png',
    svgPath: '/logo-white.svg',
    dimensions: '1240 × 300 px (Vector Scalable)',
    isTransparent: false,
    previewType: 'logo-white',
  },
  {
    id: 'logo-transparent',
    badge: 'LOGO (PNG - TRANSPARENT BACKGROUND)',
    title: 'Primary Horizontal Logo — Transparent',
    description: 'Clean alpha-channel cutout for digital navigation headers, white/light containers, and video overlays.',
    pngPath: '/logo-transparent.png',
    svgPath: '/logo-transparent.svg',
    dimensions: '1240 × 300 px (Alpha PNG)',
    isTransparent: true,
    isActiveNavbar: true,
    previewType: 'logo-transparent',
  },
  {
    id: 'logo-footer-white',
    badge: 'LOGO (WHITE MONOCHROME - FOOTER)',
    title: 'Official Footer Logo — White High Contrast',
    description: 'Crisp vector silhouette with pure white typography optimized for dark navy (#12304A) website footers.',
    pngPath: '/logo-white.png',
    svgPath: '/logo-dentisure-white.svg',
    dimensions: '1240 × 300 px (Vector Scalable)',
    isTransparent: true,
    previewType: 'logo-transparent',
  },
  {
    id: 'fav-white',
    badge: 'FAVICON (PNG - WHITE BACKGROUND)',
    title: 'Square Favicon — White Background',
    description: 'Client-specified primary web browser favicon. Crisp white square frame ensuring maximum contrast and legibility across light and dark browser tabs.',
    pngPath: '/DentiSure_Favicon_White_Background.png',
    svgPath: '/favicon-white.svg',
    dimensions: '512 × 512 px / 32 × 32 px',
    isTransparent: false,
    isActiveFavicon: true,
    previewType: 'fav-white',
  },
  {
    id: 'fav-transparent',
    badge: 'FAVICON (PNG - TRANSPARENT BACKGROUND)',
    title: 'Square Favicon — Transparent Background',
    description: 'Isolated tooth crest symbol with rising financial growth chart on transparent backdrop for custom app badges and rounded avatar holders.',
    pngPath: '/favicon-transparent.png',
    svgPath: '/favicon-transparent.svg',
    dimensions: '512 × 512 px (Alpha PNG)',
    isTransparent: true,
    previewType: 'fav-transparent',
  },
  {
    id: 'fav-512',
    badge: 'FAVICON (ICO STYLE - 512x512 PNG)',
    title: 'High-Resolution App & Touch Icon',
    description: '512×512 master format used for Apple Touch home screen icons, PWA manifests, and Windows desktop shortcuts.',
    pngPath: '/favicon-512.png',
    svgPath: '/favicon-white.svg',
    dimensions: '512 × 512 px Master',
    isTransparent: false,
    previewType: 'fav-512',
  },
];

interface BrandAssetKitProps {
  onClose?: () => void;
  isModal?: boolean;
}

export const BrandAssetKit: React.FC<BrandAssetKitProps> = ({
  onClose,
  isModal = false,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'grid' | 'sheet'>('grid');

  const handleCopyLink = (path: string, id: string) => {
    const fullUrl = `${window.location.origin}${path}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownload = (filePath: string, fileName: string) => {
    const a = document.createElement('a');
    a.href = filePath;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#12304A] text-white p-6 sm:p-8 rounded-2xl relative overflow-hidden shadow-lg border border-slate-700">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Client Brand Assets Package</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              DentiSure Solutions Logo &amp; Favicon Suite
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Complete set of authorized corporate logos and favicons matching the client&apos;s brand sheet. Includes transparent PNGs, white-background variations, SVG vector masters, and web browser favicons.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('grid')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'grid'
                  ? 'bg-[#16A6A3] text-white shadow-sm'
                  : 'bg-white/10 hover:bg-white/15 text-slate-200'
              }`}
            >
              5 Distinct Variations
            </button>
            <button
              onClick={() => setActiveTab('sheet')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'sheet'
                  ? 'bg-[#16A6A3] text-white shadow-sm'
                  : 'bg-white/10 hover:bg-white/15 text-slate-200'
              }`}
            >
              All-In-One Brand Sheet
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'sheet' ? (
        /* All-in-One Brand Asset Sheet */
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#16A6A3]" />
                All-In-One Combined Brand Master Sheet
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Displays all 5 designs within a single consolidated graphic matching the client&apos;s original layout.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDownload('/brand-asset-sheet.png', 'DentiSure-Brand-Sheet.png')}
                className="px-3.5 py-2 bg-[#12304A] hover:bg-[#16A6A3] text-white text-xs font-bold rounded-xl flex items-center gap-2 cursor-pointer shadow-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Sheet (PNG)</span>
              </button>
              <button
                onClick={() => handleDownload('/brand-asset-sheet.svg', 'DentiSure-Brand-Sheet.svg')}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download (SVG)</span>
              </button>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex items-center justify-center">
            <img
              src="/brand-asset-sheet.png"
              alt="DentiSure Complete Brand Asset Sheet"
              className="max-w-full h-auto rounded-xl shadow-md"
            />
          </div>
        </div>
      ) : (
        /* Grid of All 5 Individual Variations */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BRAND_ASSETS.map((asset) => (
            <div
              key={asset.id}
              className={`bg-white rounded-2xl border transition-all flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md ${
                asset.isActiveFavicon
                  ? 'border-[#16A6A3] ring-2 ring-[#16A6A3]/20'
                  : 'border-slate-200'
              }`}
            >
              <div>
                {/* Visual Preview Box */}
                <div
                  className={`h-48 p-6 flex flex-col items-center justify-center relative ${
                    asset.isTransparent
                      ? 'bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:12px_12px] bg-slate-50'
                      : 'bg-white border-b border-slate-100'
                  }`}
                >
                  {/* Status Badges */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    {asset.isActiveFavicon && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px] flex items-center gap-1 shadow-xs">
                        <Check className="w-3 h-3 text-emerald-600" />
                        Active Favicon
                      </span>
                    )}
                    {asset.isActiveNavbar && (
                      <span className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 font-extrabold text-[10px] flex items-center gap-1 shadow-xs">
                        <Check className="w-3 h-3 text-teal-600" />
                        Active Header Logo
                      </span>
                    )}
                  </div>

                  {/* Render the Asset Preview */}
                  {asset.previewType === 'logo-white' && (
                    <div className="p-3 bg-white rounded-xl shadow-xs border border-slate-200">
                      <img
                        src={asset.pngPath}
                        alt={asset.title}
                        className="max-h-16 w-auto object-contain"
                      />
                    </div>
                  )}

                  {asset.previewType === 'logo-transparent' && (
                    <img
                      src={asset.pngPath}
                      alt={asset.title}
                      className="max-h-16 w-auto object-contain drop-shadow-xs"
                    />
                  )}

                  {asset.previewType === 'fav-white' && (
                    <div className="p-2 bg-white rounded-2xl shadow-md border border-slate-200">
                      <img
                        src={asset.pngPath}
                        alt={asset.title}
                        className="w-24 h-24 object-contain"
                      />
                    </div>
                  )}

                  {asset.previewType === 'fav-transparent' && (
                    <div className="p-2 rounded-2xl flex items-center justify-center">
                      <img
                        src={asset.pngPath}
                        alt={asset.title}
                        className="w-24 h-24 object-contain drop-shadow-sm"
                      />
                    </div>
                  )}

                  {asset.previewType === 'fav-512' && (
                    <div className="p-2 bg-white rounded-2xl shadow-md border border-slate-200">
                      <img
                        src={asset.pngPath}
                        alt={asset.title}
                        className="w-24 h-24 object-contain"
                      />
                    </div>
                  )}
                </div>

                {/* Badge matching client graphic */}
                <div className="px-5 pt-4">
                  <div className="inline-block bg-[#0056B3] text-white text-[10.5px] font-extrabold uppercase tracking-wider py-1 px-3 rounded-md shadow-xs mb-2.5">
                    {asset.badge}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    {asset.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-3">
                    {asset.description}
                  </p>
                  <div className="mt-3 text-[11px] font-mono text-slate-400">
                    {asset.dimensions}
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-5 pt-4 border-t border-slate-100 flex items-center gap-2 mt-4">
                <button
                  onClick={() => handleDownload(asset.pngPath, `${asset.id}.png`)}
                  className="flex-1 py-2 px-3 bg-[#12304A] hover:bg-[#16A6A3] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PNG</span>
                </button>
                <button
                  onClick={() => handleDownload(asset.svgPath, `${asset.id}.svg`)}
                  className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>SVG</span>
                </button>
                <button
                  onClick={() => handleCopyLink(asset.pngPath, asset.id)}
                  title="Copy URL"
                  className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl cursor-pointer transition-colors"
                >
                  {copiedId === asset.id ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
