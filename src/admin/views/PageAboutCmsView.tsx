import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import {
  Users,
  Save,
  CheckCircle2,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Building,
  Award,
} from 'lucide-react';
import { AboutLeadershipItem } from '../../types';

export const PageAboutCmsView: React.FC = () => {
  const { cmsData, updateSection, saveToServer } = useCms();
  const [savedAlert, setSavedAlert] = useState(false);

  const [aboutData, setAboutData] = useState(cmsData.aboutPage);

  const triggerSaveToast = () => {
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2500);
  };

  const handleSave = async () => {
    updateSection('aboutPage', aboutData);
    await saveToServer({ ...cmsData, aboutPage: aboutData });
    triggerSaveToast();
  };

  const moveLeadership = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= aboutData.leadership.length) return;
    const copy = [...aboutData.leadership];
    const temp = copy[index];
    copy[index] = copy[target];
    copy[target] = temp;
    setAboutData({ ...aboutData, leadership: copy });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#16A6A3] bg-teal-50 px-2 py-0.5 rounded-md">
              Page Editor
            </span>
            <h1 className="text-xl font-bold text-slate-900">About &amp; Leadership Team</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage company mission, founding clinical background, executive leadership profiles, and track record.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {savedAlert && (
            <div className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Saved!</span>
            </div>
          )}
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#16A6A3] hover:bg-teal-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>Save About Page</span>
          </button>
        </div>
      </div>

      {/* Hero & Mission */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5 text-xs">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Building className="w-4 h-4 text-[#16A6A3]" />
          Hero &amp; Corporate Mission
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block font-bold text-slate-700 mb-1">About Hero Title</label>
            <input
              type="text"
              value={aboutData.heroTitle}
              onChange={(e) => setAboutData({ ...aboutData, heroTitle: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block font-bold text-slate-700 mb-1">About Hero Subtitle</label>
            <textarea
              rows={2}
              value={aboutData.heroSubtitle}
              onChange={(e) => setAboutData({ ...aboutData, heroSubtitle: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Mission Headline</label>
            <input
              type="text"
              value={aboutData.missionTitle}
              onChange={(e) => setAboutData({ ...aboutData, missionTitle: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Story Headline</label>
            <input
              type="text"
              value={aboutData.storyTitle}
              onChange={(e) => setAboutData({ ...aboutData, storyTitle: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Mission Statement</label>
            <textarea
              rows={3}
              value={aboutData.missionText}
              onChange={(e) => setAboutData({ ...aboutData, missionText: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Origin Story Narrative</label>
            <textarea
              rows={3}
              value={aboutData.storyText}
              onChange={(e) => setAboutData({ ...aboutData, storyText: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* Leadership Team */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5 text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-[#16A6A3]" />
              Executive Leadership Profiles ({aboutData.leadership.length})
            </h2>
            <p className="text-xs text-slate-500">Certified billing directors, CPB coders, and founders.</p>
          </div>
          <button
            type="button"
            onClick={() => {
              const newMember: AboutLeadershipItem = {
                name: 'New Executive Name',
                role: 'Director of Practice Accounts',
                credentials: 'CPC, CPB',
                experience: '12+ Years Clinical RCM',
                bio: '10+ years optimizing multi-specialty dental practice revenue cycles and claim audits.',
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
              };
              setAboutData({
                ...aboutData,
                leadership: [...aboutData.leadership, newMember],
              });
            }}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Leader</span>
          </button>
        </div>

        <div className="space-y-4">
          {aboutData.leadership.map((leader, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={leader.image} alt={leader.name} className="w-10 h-10 rounded-full object-cover border border-slate-300" />
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{leader.name}</div>
                    <div className="text-[11px] text-slate-500">{leader.role} &bull; {leader.credentials}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => moveLeadership(idx, 'up')}
                    className="p-1 hover:bg-slate-200 rounded disabled:opacity-30 cursor-pointer"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === aboutData.leadership.length - 1}
                    onClick={() => moveLeadership(idx, 'down')}
                    className="p-1 hover:bg-slate-200 rounded disabled:opacity-30 cursor-pointer"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAboutData({
                        ...aboutData,
                        leadership: aboutData.leadership.filter((_, i) => i !== idx),
                      });
                    }}
                    className="p-1 text-rose-500 hover:bg-rose-50 rounded cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-500 font-semibold">Name</label>
                  <input
                    type="text"
                    value={leader.name}
                    onChange={(e) => {
                      const copy = [...aboutData.leadership];
                      copy[idx].name = e.target.value;
                      setAboutData({ ...aboutData, leadership: copy });
                    }}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 font-semibold">Role</label>
                  <input
                    type="text"
                    value={leader.role}
                    onChange={(e) => {
                      const copy = [...aboutData.leadership];
                      copy[idx].role = e.target.value;
                      setAboutData({ ...aboutData, leadership: copy });
                    }}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 font-semibold">Credentials</label>
                  <input
                    type="text"
                    value={leader.credentials}
                    onChange={(e) => {
                      const copy = [...aboutData.leadership];
                      copy[idx].credentials = e.target.value;
                      setAboutData({ ...aboutData, leadership: copy });
                    }}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs text-teal-700 font-bold"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] text-slate-500 font-semibold">Bio</label>
                  <input
                    type="text"
                    value={leader.bio}
                    onChange={(e) => {
                      const copy = [...aboutData.leadership];
                      copy[idx].bio = e.target.value;
                      setAboutData({ ...aboutData, leadership: copy });
                    }}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 font-semibold">Image URL</label>
                  <input
                    type="text"
                    value={leader.image}
                    onChange={(e) => {
                      const copy = [...aboutData.leadership];
                      copy[idx].image = e.target.value;
                      setAboutData({ ...aboutData, leadership: copy });
                    }}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-mono text-[11px]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
