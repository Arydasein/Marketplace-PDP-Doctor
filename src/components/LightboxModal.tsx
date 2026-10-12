import React from 'react';
import { X, ExternalLink } from 'lucide-react';
import { ScreenshotItem } from '../types/pdp';

interface LightboxModalProps {
  isOpen: boolean;
  screenshot: ScreenshotItem | null;
  screenshotIndex?: number;
  totalScreenshots?: number;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  screenshot,
  screenshotIndex,
  totalScreenshots,
  onClose
}) => {
  if (!isOpen || !screenshot) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative max-w-4xl max-h-[90vh] w-full flex flex-col bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90 text-white">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-slate-200">
              {screenshot.name}
            </span>
            {screenshotIndex !== undefined && (
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
                Screenshot {screenshotIndex + 1} {totalScreenshots ? `dari ${totalScreenshots}` : ''}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Tutup preview screenshot"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-slate-950">
          <img
            src={screenshot.dataUrl}
            alt={screenshot.name}
            referrerPolicy="no-referrer"
            className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg shadow-md"
          />
        </div>

        <div className="px-6 py-3 border-t border-slate-800 bg-slate-900/90 text-xs text-slate-400 flex items-center justify-between">
          <span>Gunakan screenshot ini sebagai bukti audit untuk verifikasi listing marketplace.</span>
          <button
            onClick={() => window.open(screenshot.dataUrl, '_blank')}
            className="inline-flex items-center gap-1.5 text-rose-400 hover:text-rose-300 font-medium transition-colors"
          >
            Buka Ukuran Penuh
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
