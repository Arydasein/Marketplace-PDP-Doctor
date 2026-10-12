import React from 'react';
import {
  UploadCloud,
  FileSearch,
  Wrench,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Eye,
  Layers,
  Award
} from 'lucide-react';

interface LandingHeroProps {
  onStartUpload: () => void;
  onTryDemo: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onStartUpload,
  onTryDemo
}) => {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-5xl mx-auto px-4 pt-12 pb-16 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold mb-6 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-rose-600" />
          <span>Boleh Belajar PDP Framework 100-Point Audit</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
          Marketplace <span className="text-rose-700">PDP Doctor</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
          Upload screenshot Product Detail Page kamu. AI akan membaca, mendiagnosis, dan menunjukkan apa yang perlu diperbaiki.
        </p>

        {/* Workflow Diagram */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-xl mx-auto mb-10 text-xs sm:text-sm font-semibold text-slate-700">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <UploadCloud className="w-4 h-4 text-rose-700" />
            <span>1. Upload</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <FileSearch className="w-4 h-4 text-sky-600" />
            <span>2. Diagnose</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <Wrench className="w-4 h-4 text-amber-600" />
            <span>3. Improve</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto mb-12">
          <button
            type="button"
            onClick={onStartUpload}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-rose-700 text-white font-bold text-sm hover:bg-rose-800 active:scale-98 transition-all shadow-md shadow-rose-700/20"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Periksa PDP Saya</span>
          </button>

          <button
            type="button"
            onClick={onTryDemo}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-800 font-bold text-sm hover:bg-slate-50 hover:border-slate-400 active:scale-98 transition-all shadow-2xs"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Coba dengan Data Contoh</span>
          </button>
        </div>

        {/* Disclaimer */}
        <div className="max-w-xl mx-auto p-3.5 rounded-xl bg-slate-100/80 border border-slate-200 text-xs text-slate-500 leading-relaxed">
          <p>
            <strong>Disclaimer:</strong> PDP Quality Score menilai kualitas listing berdasarkan <strong>Boleh Belajar PDP Framework</strong>, bukan memprediksi sales atau conversion rate.
          </p>
        </div>
      </section>

      {/* 6 Dimensions Overview Grid */}
      <section className="w-full max-w-6xl mx-auto px-4 pb-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
            6 Dimensi Evaluasi Boleh Belajar
          </h2>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            Audit komprehensif 100 poin untuk memastikan listing kamu optimal di mata algoritma dan calon pembeli.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-slate-300 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
                <FileSearch className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-mono">
                20 Poin
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Search Relevance</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Kesesuaian jenis produk, intensi pencarian pembeli, atribut judul, dan keterbacaan di mobile screen.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-slate-300 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-mono">
                20 Poin
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Product Clarity</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Kejelasan identitas fisik produk, spesifikasi teknis lengkap, petunjuk pemakaian, dan konsistensi data.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-slate-300 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-mono">
                15 Poin
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Benefit & Persuasion</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Penerjemahan fitur menjadi manfaat nyata, ketajaman USP pembeda, dan jawaban atas masalah pembeli.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-slate-300 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-mono">
                15 Poin
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Trust & Credibility</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Kredibilitas klaim, bukti sosial (rating & review), sertifikasi resmi BPOM/Halal, dan transparansi toko.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-slate-300 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Eye className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-mono">
                20 Poin
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Visual Quality</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Visibilitas foto produk, kejelasan thumbnail search, alur visual carousel, dan infografis teks tajam di smartphone.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-slate-300 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-mono">
                10 Poin
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Offer Clarity</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Transparansi harga promo, kejelasan bundling kombo, panduan pilihan varian, dan kejujuran penawaran.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
