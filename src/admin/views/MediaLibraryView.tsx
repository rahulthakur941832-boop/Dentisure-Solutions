import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { BrandAssetKit } from '../../components/BrandAssetKit';
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  Copy,
  Check,
  Search,
  Filter,
  ExternalLink,
  Edit2,
  X,
  CheckCircle2,
  Layers,
  Sparkles,
} from 'lucide-react';
import { MediaItem } from '../../types';

export const MediaLibraryView: React.FC = () => {
  const { cmsData, addMediaItem, updateMediaItem, deleteMediaItem } = useCms();
  const [mainViewTab, setMainViewTab] = useState<'brand-kit' | 'general'>('brand-kit');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New item form
  const [newName, setNewName] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newCategory, setNewCategory] = useState<MediaItem['category']>('showcase');
  const [newAltText, setNewAltText] = useState('');

  const mediaList = cmsData.mediaLibrary || [];

  const filteredMedia = mediaList.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.altText && item.altText.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreateMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newUrl) return;

    addMediaItem({
      id: `media-${Date.now()}`,
      name: newName,
      url: newUrl,
      category: newCategory,
      altText: newAltText || newName,
      dimensions: 'Custom CDN',
      updatedAt: new Date().toISOString().split('T')[0],
    });

    setNewName('');
    setNewUrl('');
    setNewAltText('');
    setShowAddModal(false);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    updateMediaItem(editingItem.id, editingItem);
    setEditingItem(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#16A6A3] bg-teal-50 px-2 py-0.5 rounded-md">
              Asset Management
            </span>
            <h1 className="text-xl font-bold text-slate-900">Media Library &amp; Brand Assets</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Access authorized corporate logos, favicons, hero photography, and marketing collateral.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200">
            <button
              onClick={() => setMainViewTab('brand-kit')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                mainViewTab === 'brand-kit'
                  ? 'bg-[#12304A] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>Official Logos (5 Designs)</span>
            </button>
            <button
              onClick={() => setMainViewTab('general')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                mainViewTab === 'general'
                  ? 'bg-[#12304A] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5 text-teal-400" />
              <span>General Photography</span>
            </button>
          </div>

          {mainViewTab === 'general' && (
            <button
              onClick={() => setShowAddModal(true)}
              className="px-3.5 py-2 bg-[#16A6A3] hover:bg-teal-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Asset</span>
            </button>
          )}
        </div>
      </div>

      {mainViewTab === 'brand-kit' ? (
        <BrandAssetKit />
      ) : (
        <>
          {/* Filter and Search Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search media by title, description or alt text..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              <Filter className="w-4 h-4 text-slate-400 shrink-0" />
              {['all', 'heroes', 'showcase', 'team', 'testimonials', 'blog'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap cursor-pointer transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#12304A] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all group"
          >
            <div>
              {/* Preview Image */}
              <div className="relative h-44 bg-slate-100 overflow-hidden">
                <img
                  src={item.url}
                  alt={item.altText || item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-950/70 text-white backdrop-blur-xs capitalize">
                  {item.category}
                </span>
                {item.dimensions && (
                  <span className="absolute bottom-2.5 right-2.5 px-1.5 py-0.5 rounded text-[9px] font-mono font-medium bg-slate-950/60 text-slate-200 backdrop-blur-xs">
                    {item.dimensions}
                  </span>
                )}
              </div>

              {/* Details */}
              <div className="p-3.5 space-y-1.5">
                <h3 className="font-bold text-slate-900 text-xs truncate" title={item.name}>
                  {item.name}
                </h3>
                <p className="text-[11px] text-slate-500 line-clamp-2" title={item.altText}>
                  Alt: {item.altText || 'None set'}
                </p>
                <div className="text-[10px] text-slate-400 font-mono truncate">{item.url}</div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
              <button
                onClick={() => handleCopyUrl(item.url, item.id)}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 hover:text-teal-700 cursor-pointer"
                title="Copy URL"
              >
                {copiedId === item.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy URL</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setEditingItem({ ...item })}
                  className="p-1.5 text-slate-500 hover:text-[#16A6A3] hover:bg-white rounded-lg transition-colors cursor-pointer"
                  title="Edit"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Remove asset "${item.name}" from Media Library?`)) {
                      deleteMediaItem(item.id);
                    }
                  }}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      </>
      )}

      {/* Add Media Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="bg-[#12304A] text-white px-6 py-4 flex items-center justify-between">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <Plus className="w-4 h-4 text-teal-300" />
                Add Image to Media Library
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMedia} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Asset Name *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Dr. John Davis - Dallas Clinic"
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Image URL (Unsplash or CDN) *</label>
                <input
                  type="url"
                  required
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-2.5 border border-slate-300 rounded-xl font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl cursor-pointer"
                >
                  <option value="heroes">Heroes &amp; Headers</option>
                  <option value="showcase">Practice Showcase</option>
                  <option value="team">Leadership &amp; Team</option>
                  <option value="testimonials">Testimonials &amp; Doctors</option>
                  <option value="blog">Blog &amp; Article Covers</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Alt Text (Accessibility &amp; SEO)</label>
                <input
                  type="text"
                  value={newAltText}
                  onChange={(e) => setNewAltText(e.target.value)}
                  placeholder="Describe the image for screen readers"
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#16A6A3] hover:bg-teal-600 text-white rounded-xl font-bold cursor-pointer"
                >
                  Add Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Media Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="bg-[#12304A] text-white px-6 py-4 flex items-center justify-between">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-teal-300" />
                Edit Asset Details
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Asset Name</label>
                <input
                  type="text"
                  required
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Image URL</label>
                <input
                  type="text"
                  required
                  value={editingItem.url}
                  onChange={(e) => setEditingItem({ ...editingItem, url: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Category</label>
                <select
                  value={editingItem.category}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as any })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl cursor-pointer"
                >
                  <option value="heroes">Heroes &amp; Headers</option>
                  <option value="showcase">Practice Showcase</option>
                  <option value="team">Leadership &amp; Team</option>
                  <option value="testimonials">Testimonials &amp; Doctors</option>
                  <option value="blog">Blog &amp; Article Covers</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Alt Text</label>
                <input
                  type="text"
                  value={editingItem.altText || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, altText: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#16A6A3] hover:bg-teal-600 text-white rounded-xl font-bold cursor-pointer"
                >
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
