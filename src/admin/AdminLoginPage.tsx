import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import {
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  FileCheck,
} from 'lucide-react';

interface AdminLoginPageProps {
  onBackToSite: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onBackToSite }) => {
  const { login } = useCms();
  const [email, setEmail] = useState<string>('admin@dentisure.com');
  const [password, setPassword] = useState<string>('admin123');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      const result = login(email, password);
      setIsLoading(false);
      if (!result.success) {
        setError(result.error || 'Invalid credentials. Please verify your email and password.');
      }
    }, 400);
  };

  const handleUseDemo = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans select-none">
      {/* Background ambient lighting */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar with Return to Public Site */}
      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={onBackToSite}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors bg-slate-900/80 hover:bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-800 cursor-pointer backdrop-blur-md"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Public Website</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-2.5 rounded-2xl bg-white shadow-xl shadow-teal-500/10 mb-4 border border-slate-200">
            <img
              src="/favicon-white.png"
              alt="DentiSure Brand Icon"
              className="w-12 h-12 object-contain rounded-xl"
            />
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            DentiSure Solutions
          </h2>
          <p className="mt-1 text-xs font-medium text-teal-400 uppercase tracking-widest">
            Executive CMS &amp; Practice RCM Portal
          </p>
          <p className="mt-2 text-xs text-slate-400 max-w-sm mx-auto">
            Protected administrative environment for dental revenue cycle governance, lead audits, and website content.
          </p>
        </div>

        {/* Login Card */}
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-slate-900/90 py-8 px-6 shadow-2xl rounded-2xl border border-slate-800/80 backdrop-blur-xl sm:px-10">
            {error && (
              <div className="mb-5 p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-start gap-2.5 text-xs text-rose-300">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Admin Email / Username
                </label>
                <div className="relative rounded-xl shadow-inner">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-slate-500" />
                  </div>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@dentisure.com"
                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Security Passkey
                </label>
                <div className="relative rounded-xl shadow-inner">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-slate-500" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full pl-10 pr-10 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-700 text-teal-600 focus:ring-teal-500 bg-slate-950"
                  />
                  <span>Keep session active</span>
                </label>
                <span className="text-slate-500 text-[11px] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                  Encrypted Session
                </span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-teal-500 to-[#16A6A3] hover:from-teal-400 hover:to-teal-500 shadow-lg shadow-teal-500/20 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Authenticating Session...
                  </span>
                ) : (
                  <>
                    <span>Enter Admin Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Access Credentials Card */}
            <div className="mt-6 pt-5 border-t border-slate-800">
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 text-[11px] text-slate-400">
                <div className="flex items-center justify-between mb-1.5 font-semibold text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-teal-400" />
                    Admin Evaluation Credentials
                  </span>
                  <button
                    type="button"
                    onClick={() => handleUseDemo('admin@dentisure.com', 'admin123')}
                    className="text-teal-400 hover:text-teal-300 underline cursor-pointer font-bold"
                  >
                    Auto-Fill
                  </button>
                </div>
                <div className="flex items-center justify-between font-mono text-[10px] text-slate-400">
                  <span>User: <strong className="text-slate-200">admin@dentisure.com</strong></span>
                  <span>Pass: <strong className="text-slate-200">admin123</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Security footnote */}
          <div className="mt-6 text-center text-[11px] text-slate-500 flex items-center justify-center gap-3">
            <span className="flex items-center gap-1">
              <FileCheck className="w-3.5 h-3.5 text-teal-400" />
              Direct PMS Ledgers Protected
            </span>
            <span>•</span>
            <span>256-Bit TLS Encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
};
