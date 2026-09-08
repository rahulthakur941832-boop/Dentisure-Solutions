import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import {
  FileText,
  Plus,
  Trash2,
  Edit,
  Search,
  CheckCircle2,
  Calendar,
  Clock,
  Download,
  BookOpen,
  X,
  Save,
} from 'lucide-react';
import { ResourceArticle } from '../../types';

export const PageBlogCmsView: React.FC = () => {
  const { cmsData, addBlogPost, updateBlogPost, deleteBlogPost } = useCms();
  const [searchQuery, setSearchQuery] = useState('');
  const [editingArticle, setEditingArticle] = useState<ResourceArticle | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [savedAlert, setSavedAlert] = useState(false);

  const filteredBlog = cmsData.blog.filter(
    (b) =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.snippet && b.snippet.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleOpenEdit = (article: ResourceArticle) => {
    setIsNew(false);
    setEditingArticle({ ...article });
  };

  const handleCreateNew = () => {
    setIsNew(true);
    setEditingArticle({
      id: `article-${Date.now()}`,
      title: 'New Dental Practice Guide Title',
      category: 'Claims Operations',
      readTime: '6 min read',
      date: new Date().toISOString().split('T')[0],
      author: 'Sarah Mitchell, RDH, CRCR',
      snippet: 'Actionable executive insights on minimizing insurance aging buckets.',
      content: [
        '### Executive Overview\n\nDental insurance reimbursement requires rigorous upfront verification...',
        '### 1. Verification Protocols\n\nAlways capture both breakdown of benefits and fee schedule limitations before patient seating.',
      ],
      downloadableChecklist: 'Standard Operating Protocol PDF',
      status: 'Published',
    });
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;

    if (isNew) {
      addBlogPost(editingArticle);
    } else {
      updateBlogPost(editingArticle);
    }

    setEditingArticle(null);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#16A6A3] bg-teal-50 px-2 py-0.5 rounded-md">
              Resource Center
            </span>
            <h1 className="text-xl font-bold text-slate-900">Blog &amp; Clinical Guides ({cmsData.blog.length})</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Publish educational articles, downloadable checklists, and dental revenue cycle industry guides.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {savedAlert && (
            <div className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Article Saved!</span>
            </div>
          )}
          <button
            onClick={handleCreateNew}
            className="px-4 py-2 bg-[#16A6A3] hover:bg-teal-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>New Guide Article</span>
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search guides by title, category, or summary..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredBlog.map((art) => (
          <div
            key={art.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
                  {art.category}
                </span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {art.readTime}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-sm leading-snug">{art.title}</h3>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{art.snippet}</p>

              {art.downloadableChecklist && (
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/80 text-[11px] text-teal-800 font-semibold flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5 text-teal-600" />
                  <span>Checklist: {art.downloadableChecklist}</span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="text-[11px] text-slate-400">
                By <strong className="text-slate-700">{art.author}</strong> on {art.date}
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleOpenEdit(art)}
                  className="px-2.5 py-1 text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg text-xs font-bold cursor-pointer"
                >
                  Edit Guide
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete guide "${art.title}"?`)) {
                      deleteBlogPost(art.id);
                    }
                  }}
                  className="p-1 text-slate-400 hover:text-rose-600 rounded cursor-pointer"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Article Modal */}
      {editingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="bg-[#12304A] text-white px-6 py-4 flex items-center justify-between">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-teal-300" />
                {isNew ? 'Create New Practice Guide' : `Edit: ${editingArticle.title}`}
              </h3>
              <button
                onClick={() => setEditingArticle(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={editingArticle.title}
                  onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={editingArticle.category}
                    onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Author Name</label>
                  <input
                    type="text"
                    value={editingArticle.author}
                    onChange={(e) => setEditingArticle({ ...editingArticle, author: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Read Time</label>
                  <input
                    type="text"
                    value={editingArticle.readTime}
                    onChange={(e) => setEditingArticle({ ...editingArticle, readTime: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Snippet / Meta Summary</label>
                <textarea
                  rows={2}
                  value={editingArticle.snippet}
                  onChange={(e) => setEditingArticle({ ...editingArticle, snippet: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Downloadable Checklist Name (Optional)
                </label>
                <input
                  type="text"
                  value={editingArticle.downloadableChecklist || ''}
                  onChange={(e) =>
                    setEditingArticle({ ...editingArticle, downloadableChecklist: e.target.value })
                  }
                  placeholder="e.g. 2026 Dental Breakdown of Benefits Checklist (PDF)"
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Markdown Article Content</label>
                <textarea
                  rows={8}
                  value={Array.isArray(editingArticle.content) ? editingArticle.content.join('\n\n') : (editingArticle.content || '')}
                  onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value.split('\n\n') })}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-mono text-[11px] leading-relaxed"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingArticle(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#16A6A3] hover:bg-teal-600 text-white rounded-xl font-bold cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>{isNew ? 'Publish Guide' : 'Update Guide'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
