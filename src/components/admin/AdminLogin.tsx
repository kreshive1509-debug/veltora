import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Lock, ArrowRight, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onBackToSite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onBackToSite }) => {
  const { siteSettings, loginAdmin } = useCms();
  const [email, setEmail] = useState('veltoraitsolution2026@gmail.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await loginAdmin(email, password);
      if (!res.success) {
        setError(res.error || 'Invalid administrator credentials.');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication error.');
    } finally {
      setLoading(false);
    }
  };

  const loginLogo = siteSettings.loginLogoUrl || siteSettings.primaryLogoUrl || siteSettings.darkLogoUrl;

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl border border-[#E6DECE] p-8 sm:p-10 shadow-xl">
        {/* Brand Logo / Icon Header */}
        <div className="flex flex-col items-center text-center mb-8">
          {loginLogo && !imgError ? (
            <img
              src={loginLogo}
              alt={siteSettings.companyName}
              onError={() => setImgError(true)}
              className="max-h-12 object-contain mb-4"
            />
          ) : (
            <div className="w-12 h-12 rounded-2xl bg-[#191C1E] text-[#FAF8F5] flex items-center justify-center mx-auto mb-4 shadow-sm">
              <span className="font-serif-luxury font-bold text-lg text-[#C59A4E]">
                {siteSettings.shortName ? siteSettings.shortName[0] : 'V'}
              </span>
            </div>
          )}

          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B58A3E] block mb-1">
            {siteSettings.companyName || 'Veltora IT Solutions'}
          </span>
          <h1 className="font-display text-2xl font-bold text-[#191C1E]">
            Admin Portal
          </h1>
          <p className="text-xs text-[#6B7280] mt-1">
            Please enter your administrator credentials to proceed.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
              Admin Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
              Admin Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 text-xs font-semibold text-white bg-[#191C1E] hover:bg-[#2B2F34] rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group disabled:opacity-70 cursor-pointer"
          >
            {loading ? (
              <span>Signing In...</span>
            ) : (
              <>
                <span>Access Console</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C59A4E] group-hover:translate-x-0.5 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#F0E8D9] flex items-center justify-between text-xs">
          <button
            onClick={onBackToSite}
            className="text-[#6B7280] hover:text-[#191C1E] transition-colors cursor-pointer"
          >
            ← Return to Website
          </button>
          <span className="text-[11px] text-[#9CA3AF]">
            Console v2.0
          </span>
        </div>
      </div>
    </div>
  );
};
