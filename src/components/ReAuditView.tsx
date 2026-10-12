import React, { useRef, useState } from 'react';
import {
  RotateCcw,
  UploadCloud,
  Plus,
  Trash2,
  ArrowLeft,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Layers,
  Award
} from 'lucide-react';
import {
  ScreenshotItem,
  AuditResult,
  BeforeAfterComparison
} from '../types/pdp';

interface ReAuditViewProps {
  originalAudit: AuditResult;
  reAuditResult: AuditResult | null;
  comparison: BeforeAfterComparison | null;
  isLoading: boolean;
  onRunReAudit: (newScreenshots: ScreenshotItem[]) => void;
  onBackToAudit: () => void;
  onStartNewProduct: () => void;
}

export const ReAuditView: React.FC<ReAuditViewProps> = ({
  originalAudit,
  reAuditResult,
  comparison,
  isLoading,
  onRunReAudit,
  onBackToAudit,
  onStartNewProduct
}) => {
  const [newScreenshots, setNewScreenshots] = useState<ScreenshotItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          setNewScreenshots((prev) => [
            ...prev,
            {
              id: `re-shot-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
              name: file.name,
              dataUrl: reader.result as string,
              size: file.size,
              fileType: file.type
            }
          ]);
        };
        reader.readAsDataURL(file);
      });
      e.target.value = '';
    }
  };

  const handleRemove = (id: string) => {
    setNewScreenshots((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={onBackToAudit}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Audit Awal</span>
        </button>

        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
          Re-Audit & Before-After
        </span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          Re-Audit PDP Kamu
        </h1>
        <p className="text-base text-slate-600">
          Upload screenshot PDP yang sudah kamu perbaiki. Hasil audit awal tetap tersimpan untuk perbandingan langsung Before vs After.
        </p>
      </div>

      {/* Upload New Screenshots Area (If re-audit not yet run or want to rerun) */}
      {!comparison && (
        <div className="space-y-6">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            className="p-8 border-2 border-dashed border-slate-300 rounded-2xl bg-white hover:border-slate-400 cursor-pointer text-center transition-all shadow-2xs"
          >
            <UploadCloud className="w-10 h-10 text-rose-700 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Upload Screenshot PDP Hasil Perbaikan
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Unggah screenshot baru dari listing marketplace yang sudah dioptimasi.
            </p>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold"
            >
              <Plus className="w-4 h-4" />
              <span>Pilih Screenshot Baru</span>
            </button>
          </div>

          {/* New Screenshots Preview */}
          {newScreenshots.length > 0 && (
            <div className="p-4 rounded-2xl bg-white border border-slate-200">
              <h4 className="text-xs font-bold text-slate-900 mb-3">
                Screenshot Baru Terpilih ({newScreenshots.length}):
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {newScreenshots.map((s, idx) => (
                  <div
                    key={s.id}
                    className="aspect-3/4 rounded-xl bg-slate-100 overflow-hidden relative group border border-slate-200"
                  >
                    <img
                      src={s.dataUrl}
                      alt={s.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemove(s.id)}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-900/80 text-white hover:bg-rose-600 transition-colors"
                      title="Hapus"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <span className="absolute bottom-2 left-2 text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-900/80 text-white font-bold">
                      Baru #{idx + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Re-Audit */}
          <div className="pt-4 flex items-center justify-end">
            <button
              type="button"
              onClick={() => onRunReAudit(newScreenshots)}
              disabled={newScreenshots.length === 0 || isLoading}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-700 text-white font-bold text-sm hover:bg-rose-800 shadow-md shadow-rose-700/20 disabled:opacity-50 transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Mengevaluasi PDP Baru...</span>
                </>
              ) : (
                <>
                  <RotateCcw className="w-4 h-4" />
                  <span>Audit PDP Baru & Bandingkan</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Before vs After Comparison Display */}
      {comparison && (
        <div className="space-y-8 animate-in fade-in">
          {/* Header Card Comparison */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-md">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-700 block mb-1">
                  Hasil Perbandingan Re-Audit
                </span>
                <h2 className="text-2xl font-black text-slate-900">
                  Before vs After Score
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Evaluasi kriteria yang sama membuktikan perubahan skor listing Anda.
                </p>
              </div>

              {/* Total Delta */}
              <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="text-center">
                  <span className="text-xs text-slate-500 font-semibold block">Before</span>
                  <span className="text-2xl font-black font-mono text-slate-600">
                    {comparison.beforeTotal}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
                <div className="text-center">
                  <span className="text-xs text-rose-700 font-semibold block">After</span>
                  <span className="text-3xl font-black font-mono text-slate-900">
                    {comparison.afterTotal}
                  </span>
                </div>
                <div className="pl-2 border-l border-slate-200">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full text-xs font-black font-mono ${
                      comparison.totalChange >= 0
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {comparison.totalChange >= 0 ? `+${comparison.totalChange}` : comparison.totalChange}
                  </span>
                </div>
              </div>
            </div>

            {/* Dimension Breakdown Table */}
            <div className="mt-8 overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                    <th className="py-2.5 pr-4">Dimensi</th>
                    <th className="py-2.5 px-4 text-center">Before</th>
                    <th className="py-2.5 px-4 text-center font-bold text-slate-900">After</th>
                    <th className="py-2.5 px-4 text-center">Perubahan</th>
                    <th className="py-2.5 pl-4 text-right">Maks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {comparison.dimensionDeltas.map((dim) => (
                    <tr key={dim.dimensionId} className="hover:bg-slate-50">
                      <td className="py-3 pr-4 font-bold text-slate-800">
                        {dim.dimensionName}
                      </td>
                      <td className="py-3 px-4 text-center font-mono text-slate-600">
                        {dim.beforeScore}
                      </td>
                      <td className="py-3 px-4 text-center font-mono font-bold text-slate-900 bg-rose-50/40">
                        {dim.afterScore}
                      </td>
                      <td className="py-3 px-4 text-center font-mono">
                        <span
                          className={`font-bold px-2 py-0.5 rounded-md ${
                            dim.change > 0
                              ? 'bg-emerald-100 text-emerald-800'
                              : dim.change < 0
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {dim.change > 0 ? `+${dim.change}` : dim.change}
                        </span>
                      </td>
                      <td className="py-3 pl-4 text-right font-mono text-slate-400">
                        {dim.maxScore}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Qualitative Findings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Yang Meningkat */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-2 mb-3 text-emerald-700">
                <CheckCircle2 className="w-5 h-5" />
                <h3 className="font-bold text-sm text-slate-900">Yang Meningkat</h3>
              </div>
              <ul className="space-y-2">
                {comparison.improvedCriteria.map((item, idx) => (
                  <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Yang Masih Perlu Diperbaiki */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-2 mb-3 text-amber-600">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="font-bold text-sm text-slate-900">Masih Perlu Diperbaiki</h3>
              </div>
              <ul className="space-y-2">
                {comparison.stillNeedsImprovement.map((item, idx) => (
                  <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Prioritas Berikutnya */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-2 mb-3 text-blue-600">
                <TrendingUp className="w-5 h-5" />
                <h3 className="font-bold text-sm text-slate-900">Prioritas Berikutnya</h3>
              </div>
              <ul className="space-y-2">
                {comparison.nextPriorities.map((item, idx) => (
                  <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={onBackToAudit}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Kembali ke Detail Audit
            </button>

            <button
              type="button"
              onClick={onStartNewProduct}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors shadow-2xs"
            >
              Mulai Produk Baru
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
