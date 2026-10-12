import React from 'react';
import { Stethoscope, RotateCcw, Sparkles } from 'lucide-react';

export type AppStep =
  | 'landing'
  | 'upload'
  | 'extraction'
  | 'competitor'
  | 'audit'
  | 'optimizer'
  | 'reaudit';

interface NavbarProps {
  currentStep: AppStep;
  isDemoMode: boolean;
  hasProductData: boolean;
  onStartNewProduct: () => void;
  onNavigate: (step: AppStep) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentStep,
  isDemoMode,
  hasProductData,
  onStartNewProduct,
  onNavigate
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div
          onClick={() => onNavigate(hasProductData ? 'audit' : 'landing')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-rose-700 text-white flex items-center justify-center shadow-md shadow-rose-700/20 group-hover:bg-rose-800 transition-colors">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 tracking-tight text-base sm:text-lg">
                Marketplace PDP Doctor
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-100 text-rose-800">
                by Boleh Belajar
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              AI-Powered Product Detail Page Audit
            </p>
          </div>
        </div>

        {/* Status & Actions */}
        <div className="flex items-center gap-3">
          {isDemoMode && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>Demo Mode: Nuvora</span>
            </div>
          )}

          {hasProductData && currentStep !== 'landing' && (
            <button
              type="button"
              onClick={onStartNewProduct}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Mulai Produk Baru</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
