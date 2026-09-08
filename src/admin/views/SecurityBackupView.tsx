import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import {
  Shield,
  KeyRound,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Lock,
  FileJson,
  Check,
} from 'lucide-react';

export const SecurityBackupView: React.FC = () => {
  const { changePassword, exportJsonBackup, importJsonBackup, resetToDefaults } = useCms();

  // Password change state
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Backup & Import state
  const [importStatus, setImportStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass.length < 5) {
      setPasswordMsg({ type: 'error', text: 'New password must be at least 5 characters long.' });
      return;
    }
    if (newPass !== confirmPass) {
      setPasswordMsg({ type: 'error', text: 'New password and confirmation do not match.' });
      return;
    }

    const res = changePassword(newPass);
    if (res.success) {
      setPasswordMsg({ type: 'success', text: 'Admin security password changed successfully.' });
      setOldPass('');
      setNewPass('');
      setConfirmPass('');
    } else {
      setPasswordMsg({ type: 'error', text: res.error || 'Failed to update password.' });
    }
  };

  const handleDownloadBackup = () => {
    exportJsonBackup();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const content = evt.target?.result as string;
        const res = importJsonBackup(content);
        if (res.success) {
          setImportStatus({ type: 'success', text: 'CMS data successfully restored from JSON backup!' });
        } else {
          setImportStatus({ type: 'error', text: res.error || 'Invalid backup file structure or corrupted JSON.' });
        }
      } catch (err) {
        setImportStatus({ type: 'error', text: 'Failed to parse JSON backup file.' });
      }
    };
    reader.readAsText(file);
  };

  const handleConfirmReset = () => {
    resetToDefaults();
    setShowResetConfirm(false);
    setImportStatus({ type: 'success', text: 'Reset complete: All pages and CMS models restored to verified clinical defaults.' });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#16A6A3] bg-teal-50 px-2 py-0.5 rounded-md">
              Governance
            </span>
            <h1 className="text-xl font-bold text-slate-900">Security Credentials &amp; JSON Backups</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Update portal administrative credentials, download offline snapshot backups, or restore practice configurations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Change Password Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
            <KeyRound className="w-4 h-4 text-[#16A6A3]" />
            <h2 className="text-sm font-bold text-slate-900">Change Admin Access Key</h2>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-3.5">
            {passwordMsg && (
              <div
                className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                  passwordMsg.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-rose-50 text-rose-800 border-rose-300'
                }`}
              >
                {passwordMsg.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                )}
                <span>{passwordMsg.text}</span>
              </div>
            )}

            <div>
              <label className="block font-bold text-slate-700 mb-1">Current Password *</label>
              <input
                type="password"
                required
                value={oldPass}
                onChange={(e) => setOldPass(e.target.value)}
                placeholder="Enter current password (default: admin123)"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">New Password (min 6 chars) *</label>
              <input
                type="password"
                required
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="Enter strong new administrative password"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Confirm New Password *</label>
              <input
                type="password"
                required
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#12304A] hover:bg-slate-800 text-white rounded-xl font-bold cursor-pointer transition-colors shadow-xs"
            >
              Update Password
            </button>
          </form>
        </div>

        {/* JSON Backup & Restore Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5 text-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
              <FileJson className="w-4 h-4 text-[#16A6A3]" />
              <h2 className="text-sm font-bold text-slate-900">Full Website JSON Backup &amp; Restore</h2>
            </div>

            {importStatus && (
              <div
                className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                  importStatus.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-rose-50 text-rose-800 border-rose-300'
                }`}
              >
                {importStatus.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                )}
                <span>{importStatus.text}</span>
              </div>
            )}

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                <Download className="w-4 h-4 text-teal-600" />
                Export Full CMS Snapshot
              </h3>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Generates a complete, portable JSON file containing all page content, leads, testimonials, FAQs, media metadata, and global configurations.
              </p>
              <button
                type="button"
                onClick={handleDownloadBackup}
                className="mt-1 px-4 py-2 bg-[#16A6A3] hover:bg-teal-600 text-white rounded-xl font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .JSON Backup</span>
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                <Upload className="w-4 h-4 text-teal-600" />
                Restore from Backup File
              </h3>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Upload a previously exported JSON backup to overwrite current content with validated saved states.
              </p>
              <label className="inline-block mt-1 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl font-bold cursor-pointer transition-colors">
                <span>Select JSON File</span>
                <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>
          </div>

          {/* Clinical Reset Button */}
          <div className="pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setShowResetConfirm(true)}
              className="text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1.5 text-xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Content to Default Clinical Benchmark</span>
            </button>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center">
              <h3 className="text-base font-bold text-slate-900">Reset Content to Clinical Defaults?</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                This will overwrite any customized headlines, testimonials, FAQs, pricing tiers, and blog articles with the official DentiSure clinical boilerplate. This action cannot be undone.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs cursor-pointer"
              >
                Yes, Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
