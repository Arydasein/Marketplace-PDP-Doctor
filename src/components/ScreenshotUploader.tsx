import React, { useRef, useState } from 'react';
import {
  UploadCloud,
  Plus,
  Trash2,
  Image as ImageIcon,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Loader2,
  ArrowLeft,
  AlertCircle,
  RefreshCw,
  Eye
} from 'lucide-react';
import { ScreenshotItem } from '../types/pdp';

interface ScreenshotUploaderProps {
  screenshots: ScreenshotItem[];
  isLoading: boolean;
  loadingMessage: string;
  errorMessage: string | null;
  onAddScreenshots: (files: File[]) => void;
  onRemoveScreenshot: (id: string) => void;
  onAnalyze: () => void;
  onBack: () => void;
  onRetry: () => void;
  onPreviewScreenshot: (screenshot: ScreenshotItem, index: number) => void;
}

export const ScreenshotUploader: React.FC<ScreenshotUploaderProps> = ({
  screenshots,
  isLoading,
  loadingMessage,
  errorMessage,
  onAddScreenshots,
  onRemoveScreenshot,
  onAnalyze,
  onBack,
  onRetry,
  onPreviewScreenshot
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showTips, setShowTips] = useState(true);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onAddScreenshots(Array.from(e.target.files));
      e.target.value = '';
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onAddScreenshots(Array.from(e.dataTransfer.files));
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>

        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-600">
          Langkah 1 dari 4: Upload Screenshot
        </span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          Upload Screenshot PDP Kamu
        </h1>
        <p className="text-base text-slate-600">
          Tidak perlu isi form panjang. Upload screenshot yang kamu punya, lalu PDP Doctor akan membaca informasinya.
        </p>
      </div>

      {/* Screenshot Guidance Callout */}
      <div className="mb-6 rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden shadow-2xs">
        <button
          type="button"
          onClick={() => setShowTips(!showTips)}
          className="w-full px-5 py-3.5 flex items-center justify-between text-left font-semibold text-sm text-slate-800 hover:bg-slate-100/60 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <HelpCircle className="w-4 h-4 text-rose-700" />
            <span>Panduan Screenshot untuk Hasil Audit Terbaik</span>
          </div>
          {showTips ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
        </button>

        {showTips && (
          <div className="px-5 pb-5 text-xs text-slate-600 space-y-3 border-t border-slate-200/80 pt-3">
            <p className="font-medium text-slate-700">
              Untuk hasil terbaik, screenshot bagian berikut jika tersedia:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700">
                ✓ Product title & price
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700">
                ✓ Product images / carousel
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700">
                ✓ Product description
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700">
                ✓ Product specification
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700">
                ✓ Promo / offer / diskon
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700">
                ✓ Rating & jumlah review
              </span>
            </div>
            <p className="italic text-slate-500 pt-1">
              Kamu tidak harus upload semuanya. Audit akan menggunakan informasi yang tersedia. Beberapa screenshot yang jelas biasanya lebih mudah dianalisis dibanding satu screenshot halaman yang sangat panjang.
            </p>
          </div>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        className={`rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
          isDragOver
            ? 'border-rose-500 bg-rose-50/50'
            : 'border-slate-300 bg-white hover:border-slate-400'
        }`}
      >
        <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center mx-auto mb-4 shadow-2xs">
          <UploadCloud className="w-7 h-7" />
        </div>
        <h3 className="text-base font-bold text-slate-900 mb-1">
          Drag & drop screenshot di sini
        </h3>
        <p className="text-xs text-slate-500 mb-5">
          Mendukung file PNG, JPG, JPEG, WebP. Maksimal disarankan 10 screenshot.
        </p>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 active:scale-98 transition-all shadow-xs disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Screenshot</span>
        </button>
      </div>

      {/* Uploaded Screenshots Grid */}
      {screenshots.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900">
              Screenshot Terupload ({screenshots.length})
            </h3>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              className="text-xs font-semibold text-rose-700 hover:text-rose-800 transition-colors inline-flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Lagi</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {screenshots.map((s, idx) => (
              <div
                key={s.id}
                className="group relative rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs hover:border-slate-300 transition-all flex flex-col"
              >
                <div
                  onClick={() => onPreviewScreenshot(s, idx)}
                  className="aspect-3/4 w-full bg-slate-100 overflow-hidden relative cursor-pointer"
                >
                  <img
                    src={s.dataUrl}
                    alt={s.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="p-2 rounded-lg bg-white/90 text-slate-800 text-xs font-semibold flex items-center gap-1 shadow-xs">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Lihat</span>
                    </span>
                  </div>
                  <span className="absolute top-2 left-2 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-900/80 text-white backdrop-blur-xs">
                    #{idx + 1}
                  </span>
                </div>

                <div className="p-2.5 flex items-center justify-between gap-2 border-t border-slate-100 bg-white">
                  <span className="text-[11px] font-medium text-slate-700 truncate" title={s.name}>
                    {s.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemoveScreenshot(s.id)}
                    disabled={isLoading}
                    className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors shrink-0"
                    title="Hapus Screenshot"
                    aria-label={`Hapus ${s.name}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error State */}
      {errorMessage && (
        <div className="mt-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start justify-between gap-3 animate-in fade-in">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold">Analisis Belum Berhasil</p>
              <p className="text-xs text-rose-700 mt-0.5">{errorMessage}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 transition-colors shrink-0 shadow-2xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Coba Lagi</span>
          </button>
        </div>
      )}

      {/* Loading Overlay / Progress Indicator */}
      {isLoading && (
        <div className="mt-6 p-5 rounded-2xl bg-rose-50/70 border border-rose-200 text-center animate-in fade-in">
          <Loader2 className="w-7 h-7 text-rose-700 animate-spin mx-auto mb-2" />
          <p className="text-sm font-bold text-rose-950">
            {loadingMessage || 'Sedang memproses...'}
          </p>
          <p className="text-xs text-rose-700 mt-1">
            Gemini Multimodal AI sedang membaca screenshot PDP Anda...
          </p>
        </div>
      )}

      {/* Action Footer */}
      <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
        >
          Kembali
        </button>

        <button
          type="button"
          onClick={onAnalyze}
          disabled={screenshots.length === 0 || isLoading}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-rose-700 text-white font-bold text-sm hover:bg-rose-800 active:scale-98 transition-all shadow-md shadow-rose-700/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Menganalisis...</span>
            </>
          ) : (
            <>
              <ImageIcon className="w-4 h-4" />
              <span>Analisis Screenshot ({screenshots.length})</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
