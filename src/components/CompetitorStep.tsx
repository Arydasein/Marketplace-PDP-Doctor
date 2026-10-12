import React, { useRef, useState } from 'react';
import {
  Users,
  Plus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  UploadCloud,
  Eye,
  ShieldCheck
} from 'lucide-react';
import { CompetitorData, ScreenshotItem } from '../types/pdp';

interface CompetitorStepProps {
  competitors: CompetitorData[];
  onAddCompetitor: (name: string, files: File[]) => void;
  onRemoveCompetitor: (id: string) => void;
  onSkipCompetitors: () => void;
  onProceedToAudit: () => void;
  onBack: () => void;
  onPreviewScreenshot: (screenshot: ScreenshotItem, index: number) => void;
}

export const CompetitorStep: React.FC<CompetitorStepProps> = ({
  competitors,
  onAddCompetitor,
  onRemoveCompetitor,
  onSkipCompetitors,
  onProceedToAudit,
  onBack,
  onPreviewScreenshot
}) => {
  const [competitorName, setCompetitorName] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilesSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPendingFiles(Array.from(e.target.files));
    }
  };

  const handleSaveCompetitor = () => {
    if (pendingFiles.length === 0) return;
    const finalName = competitorName.trim() || `Competitor ${competitors.length + 1}`;
    onAddCompetitor(finalName, pendingFiles);
    setCompetitorName('');
    setPendingFiles([]);
    setIsAdding(false);
  };

  const canAddMore = competitors.length < 3;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>

        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-600">
          Langkah 3 dari 4: Benchmark Competitor (Opsional)
        </span>
      </div>

      {/* Screen Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          Mau Bandingkan dengan Competitor?
        </h1>
        <p className="text-base text-slate-600">
          Upload screenshot PDP competitor untuk melihat area di mana PDP kamu lebih kuat atau masih tertinggal.
        </p>
      </div>

      {/* Existing Competitors List */}
      {competitors.length > 0 && (
        <div className="mb-8 space-y-4">
          <h2 className="text-sm font-bold text-slate-900">
            Competitor Terdaftar ({competitors.length}/3)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {competitors.map((comp) => (
              <div
                key={comp.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-slate-900 text-sm">
                      {comp.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => onRemoveCompetitor(comp.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded-md transition-colors"
                      title="Hapus Competitor"
                      aria-label={`Hapus ${comp.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Screenshots preview */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {comp.screenshots.map((s, idx) => (
                      <div
                        key={s.id}
                        onClick={() => onPreviewScreenshot(s, idx)}
                        className="aspect-3/4 rounded-lg bg-slate-100 overflow-hidden relative cursor-pointer group"
                      >
                        <img
                          src={s.dataUrl}
                          alt={s.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Eye className="w-3.5 h-3.5 text-white" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-slate-500">
                    {comp.screenshots.length} screenshot terlampir. Siap dibandingkan saat audit.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Competitor Modal / Form Area */}
      {isAdding ? (
        <div className="mb-8 p-6 rounded-2xl bg-slate-50 border border-slate-300 shadow-xs animate-in fade-in">
          <h3 className="text-sm font-bold text-slate-900 mb-4">
            Tambah Screenshot Competitor
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nama / Brand Competitor (Opsional)
              </label>
              <input
                type="text"
                value={competitorName}
                onChange={(e) => setCompetitorName(e.target.value)}
                placeholder="Contoh: Skintific / Glad2Glow"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Pilih Screenshot PDP Competitor
              </label>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFilesSelect}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-4 border-2 border-dashed border-slate-300 rounded-xl bg-white hover:border-slate-400 text-xs font-semibold text-slate-600 flex flex-col items-center justify-center gap-1.5 transition-colors"
              >
                <UploadCloud className="w-5 h-5 text-slate-400" />
                <span>Pilih file screenshot competitor</span>
              </button>

              {pendingFiles.length > 0 && (
                <p className="text-xs text-rose-700 font-semibold mt-2">
                  ✓ {pendingFiles.length} file dipilih: {pendingFiles.map((f) => f.name).join(', ')}
                </p>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsAdding(false);
                  setPendingFiles([]);
                }}
                className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSaveCompetitor}
                disabled={pendingFiles.length === 0}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-rose-700 text-white hover:bg-rose-800 disabled:opacity-50"
              >
                Analisis Competitor
              </button>
            </div>
          </div>
        </div>
      ) : (
        canAddMore && (
          <div className="mb-8">
            <button
              type="button"
              onClick={() => setIsAdding(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-slate-300 bg-white hover:border-slate-400 text-xs font-bold text-slate-800 transition-colors shadow-2xs"
            >
              <Plus className="w-4 h-4 text-rose-700" />
              <span>Tambah Competitor ({competitors.length}/3)</span>
            </button>
          </div>
        )
      )}

      {/* Action Footer */}
      <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Kembali
        </button>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={onSkipCompetitors}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Lewati Competitor
          </button>

          <button
            type="button"
            onClick={onProceedToAudit}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-rose-700 text-white font-bold text-sm hover:bg-rose-800 active:scale-98 transition-all shadow-md shadow-rose-700/20"
          >
            <span>Audit PDP Saya</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
