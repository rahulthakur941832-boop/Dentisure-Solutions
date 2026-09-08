import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import {
  X,
  Lock,
  Mail,
  KeyRound,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  UserCheck,
} from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const { isLoginModalOpen, closeLoginModal, login } = useCms();
  const [email, setEmail] = useState<string>('admin@dentisure.com');
  const [password, setPassword] = useState<string>('admin123');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const res = login(email, password);
      setIsLoading(false);
      if (!res.success) {
        setError(res.error || 'Authentication failed. Please verify credentials.');
      }
    }, 300);
  };

  const handleQuickDemoFill = () => {
    setEmail('admin@dentisure.com');
    setPassword('admin123');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#12304A]/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-[#12304A] text-white p-6 relative">
          <button
            onClick={closeLoginModal}
            className="absolute right-5 top-5 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-300 mb-3">
            <Lock className="w-5 h-5" />
          </div>

          <h3 className="text-xl font-bold tracking-tight text-white mb-1">
            DentiSure CMS Admin Portal
          </h3>
          <p className="text-xs text-slate-300">
            Authorized management access for website content, leads &amp; SEO.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-xs text-rose-700">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Admin Email / Username
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@dentisure.com"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#16A6A3] focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#16A6A3] focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Quick Demo Credentials pill */}
          <div className="bg-teal-50/80 border border-teal-200/80 rounded-xl p-3 text-xs text-slate-700">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-[#12304A] flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-[#16A6A3]" />
                Demo Credentials:
              </span>
              <button
                type="button"
                onClick={handleQuickDemoFill}
                className="text-[11px] font-bold text-[#16A6A3] hover:underline cursor-pointer"
              >
                1-Click Autofill
              </button>
            </div>
            <div className="font-mono text-[11px] text-slate-600 space-y-0.5">
              <div>User: <strong className="text-slate-800">admin@dentisure.com</strong></div>
              <div>Pass: <strong className="text-slate-800">admin123</strong></div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-[#12304A] hover:bg-[#16A6A3] text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In to Admin CMS</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              HIPAA &amp; Encrypted Session
            </span>
            <span className="font-mono">v3.2 Secure</span>
          </div>
        </form>
      </div>
    </div>
  );
};
