import React, { useState } from 'react';
import {
  Wrench,
  Copy,
  Check,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Sparkles,
  RotateCcw,
  FileText
} from 'lucide-react';
import { TreatmentPlan, ListingOptimization } from '../types/pdp';

interface TreatmentAndOptimizerProps {
  treatmentPlan: TreatmentPlan;
  listingOptimization: ListingOptimization;
  onOpenReAudit?: () => void;
  onBackToAudit: () => void;
  onShowToast: (message: string, type?: 'success' | 'info') => void;
}

export const TreatmentAndOptimizer: React.FC<TreatmentAndOptimizerProps> = ({
  treatmentPlan,
  listingOptimization,
  onOpenReAudit,
  onBackToAudit,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'treatment' | 'optimizer'>('treatment');
  const [copiedTitle, setCopiedTitle] = useState(false);
  const [copiedDesc, setCopiedDesc] = useState(false);

  const handleCopyTitle = async () => {
    try {
      await navigator.clipboard.writeText(listingOptimization.title.recommended);
      setCopiedTitle(true);
      onShowToast('Title berhasil disalin.', 'success');
      setTimeout(() => setCopiedTitle(false), 2500);
    } catch {
      onShowToast('Gagal menyalin title.', 'info');
    }
  };

  const handleCopyDesc = async () => {
    try {
      await navigator.clipboard.writeText(listingOptimization.description.recommended);
      setCopiedDesc(true);
      onShowToast('Deskripsi berhasil disalin.', 'success');
      setTimeout(() => setCopiedDesc(false), 2500);
    } catch {
      onShowToast('Gagal menyalin deskripsi.', 'info');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={onBackToAudit}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Hasil Audit</span>
        </button>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('treatment')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'treatment'
                ? 'bg-white text-slate-900 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            PDP Treatment Plan
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('optimizer')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'optimizer'
                ? 'bg-white text-slate-900 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Listing Optimizer
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          {activeTab === 'treatment' ? 'PDP Treatment Plan' : 'Listing Optimizer'}
        </h1>
        <p className="text-base text-slate-600">
          {activeTab === 'treatment'
            ? 'Rencana perbaikan terstruktur berdasarkan prioritas untuk menambal gap terbesar pada listing Anda.'
            : 'Rekomendasi optimasi judul dan teks deskripsi berdasarkan Boleh Belajar PDP Framework.'}
        </p>
      </div>

      {/* Tab 1: PDP Treatment Plan */}
      {activeTab === 'treatment' && (
        <div className="space-y-8 animate-in fade-in">
          {/* Priority 1: Perbaiki Sekarang */}
          <div className="p-6 rounded-2xl bg-white border border-rose-200 shadow-2xs">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <h2 className="text-base font-bold text-slate-900">
                Priority 1 — Perbaiki Sekarang
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 font-semibold border border-rose-200">
                Urgensi Tinggi
              </span>
            </div>

            <div className="space-y-4">
              {treatmentPlan.priority1.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">
                      {idx + 1}. {item.problem}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                      Dimensi: {item.dimension}
                    </span>
                  </div>

                  <p className="text-slate-600">
                    <strong className="text-slate-700">Bukti: </strong>
                    {item.evidence}
                  </p>

                  <div className="p-2.5 rounded-lg bg-rose-50/60 border border-rose-200 text-rose-950">
                    <strong className="text-rose-900">Rekomendasi Tindakan: </strong>
                    {item.recommendation}
                  </div>

                  <p className="text-slate-500 italic">
                    *Potensi peningkatan: {item.expectedQualitativeImprovement}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Priority 2: Optimasi Selanjutnya */}
          <div className="p-6 rounded-2xl bg-white border border-amber-200 shadow-2xs">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <h2 className="text-base font-bold text-slate-900">
                Priority 2 — Optimasi Selanjutnya
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-semibold border border-amber-200">
                Penyempurnaan Bertahap
              </span>
            </div>

            <div className="space-y-4">
              {treatmentPlan.priority2.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">
                      {idx + 1}. {item.problem}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                      Dimensi: {item.dimension}
                    </span>
                  </div>

                  <p className="text-slate-600">
                    <strong className="text-slate-700">Bukti: </strong>
                    {item.evidence}
                  </p>

                  <div className="p-2.5 rounded-lg bg-rose-50/60 border border-rose-200 text-rose-950">
                    <strong className="text-rose-900">Rekomendasi Tindakan: </strong>
                    {item.recommendation}
                  </div>

                  <p className="text-slate-500 italic">
                    *Potensi peningkatan: {item.expectedQualitativeImprovement}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Sudah Kuat */}
          <div className="p-6 rounded-2xl bg-white border border-emerald-200 shadow-2xs">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <h2 className="text-base font-bold text-slate-900">Sudah Kuat</h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                Pertahankan
              </span>
            </div>

            <ul className="space-y-2.5">
              {treatmentPlan.alreadyStrong.map((item, idx) => (
                <li key={idx} className="text-xs text-slate-700 flex items-start gap-2 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Tab 2: Listing Optimizer */}
      {activeTab === 'optimizer' && (
        <div className="space-y-8 animate-in fade-in">
          {/* Title Optimizer */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-rose-700" />
                <h2 className="text-base font-bold text-slate-900">
                  Optimized Title
                </h2>
              </div>
              <button
                type="button"
                onClick={handleCopyTitle}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-2xs active:scale-98"
              >
                {copiedTitle ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedTitle ? 'Tersalin' : 'Copy Title'}</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-semibold text-slate-500 block mb-1">
                  Judul Saat Ini:
                </span>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600">
                  {listingOptimization.title.current}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-rose-900">
                    Rekomendasi Judul Baru:
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {listingOptimization.title.characterCount} karakter
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-300 text-slate-900 font-medium leading-relaxed">
                  {listingOptimization.title.recommended}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600">
                <strong className="text-slate-800">Alasan Optimasi: </strong>
                {listingOptimization.title.why}
              </div>
            </div>
          </div>

          {/* Description Optimizer */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-rose-700" />
                <h2 className="text-base font-bold text-slate-900">
                  Optimized Description
                </h2>
              </div>
              <button
                type="button"
                onClick={handleCopyDesc}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-2xs active:scale-98"
              >
                {copiedDesc ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedDesc ? 'Tersalin' : 'Copy Description'}</span>
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="font-semibold text-rose-900 block mb-1">
                  Rekomendasi Deskripsi Terstruktur (Mobile-Optimized):
                </span>
                <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-300 text-slate-900 font-mono whitespace-pre-wrap leading-relaxed text-[11px] max-h-96 overflow-y-auto">
                  {listingOptimization.description.recommended}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600">
                <strong className="text-slate-800">Alasan Optimasi: </strong>
                {listingOptimization.description.why}
              </div>
            </div>
          </div>

          {/* Missing Information Required from Seller */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle className="w-4 h-4 text-slate-500" />
              <h3 className="font-bold text-sm text-slate-900">
                Perlu Informasi Tambahan dari Seller
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                Anti-Halusinasi AI
              </span>
            </div>

            <p className="text-xs text-slate-600 mb-3">
              Sesuai prinsip kehati-hatian, PDP Doctor tidak mengarang detail spesifikasi teknis berikut. Silakan lengkapi manual di listing toko Anda:
            </p>

            <ul className="space-y-2">
              {listingOptimization.missingSellerInfo.map((info, idx) => (
                <li key={idx} className="text-xs text-slate-700 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  <span>{info}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBackToAudit}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Kembali ke Hasil Audit
        </button>

        {onOpenReAudit && (
          <button
            type="button"
            onClick={onOpenReAudit}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-rose-700 text-white font-bold text-sm hover:bg-rose-800 active:scale-98 transition-all shadow-md shadow-rose-700/20"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Lanjut ke Re-Audit PDP</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
