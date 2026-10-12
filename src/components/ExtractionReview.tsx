import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Edit2,
  Save,
  X,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  Tag,
  DollarSign,
  FileText,
  Star,
  Search,
  AlertCircle
} from 'lucide-react';
import { PDPData } from '../types/pdp';

interface ExtractionReviewProps {
  pdpData: PDPData;
  onUpdatePDPData: (updated: PDPData) => void;
  onConfirmContinue: () => void;
  onBack: () => void;
}

export const ExtractionReview: React.FC<ExtractionReviewProps> = ({
  pdpData,
  onUpdatePDPData,
  onConfirmContinue,
  onBack
}) => {
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const startEdit = (key: string, currentVal: string) => {
    setEditingKey(key);
    setEditValue(currentVal === 'Belum ditemukan pada screenshot' ? '' : currentVal || '');
  };

  const cancelEdit = () => {
    setEditingKey(null);
    setEditValue('');
  };

  const saveEdit = (key: string) => {
    const updated = { ...pdpData };
    const val = editValue.trim() || 'Belum ditemukan pada screenshot';
    const conf = editValue.trim() ? 'high' : 'unknown';

    if (key === 'product_name') {
      updated.product_name = { ...updated.product_name, value: val, confidence: conf };
    } else if (key === 'brand') {
      updated.brand = { ...updated.brand, value: val, confidence: conf };
    } else if (key === 'marketplace') {
      updated.marketplace = { ...updated.marketplace, value: val, confidence: conf };
    } else if (key === 'price') {
      updated.price = { ...updated.price, value: val, confidence: conf };
    } else if (key === 'product_type') {
      updated.product_type = { ...updated.product_type, value: val, confidence: conf };
    } else if (key === 'category') {
      updated.category = { ...updated.category, value: val, confidence: conf };
    } else if (key === 'title') {
      updated.title = { ...updated.title, value: val, confidence: conf };
    } else if (key === 'description') {
      updated.description = { ...updated.description, value: val, confidence: conf };
    } else if (key === 'rating') {
      updated.rating = { ...updated.rating, value: val, confidence: conf };
    } else if (key === 'sales_information') {
      updated.sales_information = { ...updated.sales_information, value: val, confidence: conf };
    } else if (key === 'review_count') {
      updated.review_count = { ...updated.review_count, value: val, confidence: conf };
    }

    onUpdatePDPData(updated);
    setEditingKey(null);
  };

  const isDetected = (val: string | undefined) =>
    val && val !== 'Belum ditemukan pada screenshot' && val !== 'Tidak terbaca dengan jelas';

  const hasMinimumInfo =
    !!pdpData.product_name.value &&
    pdpData.product_name.value !== 'Belum ditemukan pada screenshot';

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
          Langkah 2 dari 4: Verifikasi Ekstraksi
        </span>
      </div>

      {/* Screen Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          Ini yang Kami Baca dari PDP Kamu
        </h1>
        <p className="text-base text-slate-600">
          Semua data di bawah ini dibaca langsung dari screenshot kamu oleh AI Vision. Periksa sebentar sebelum audit dimulai.
        </p>
      </div>

      {/* 1. TERBACA DENGAN JELAS (High Confidence & Nyata Terlihat) */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="w-4 h-4 text-rose-700" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
            Terbaca dengan Jelas dari Screenshot
          </h2>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-800 font-semibold border border-rose-200">
            Confidence: High
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Product Name Card */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-slate-300 transition-colors">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5 text-slate-400" />
                Nama Produk
              </span>
              {editingKey !== 'product_name' && (
                <button
                  type="button"
                  onClick={() => startEdit('product_name', pdpData.product_name.value)}
                  className="text-slate-400 hover:text-rose-700 text-xs font-medium flex items-center gap-1 transition-colors"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit</span>
                </button>
              )}
            </div>

            {editingKey === 'product_name' ? (
              <div className="space-y-2 mt-2">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  placeholder="Masukkan nama produk"
                  className="w-full px-3 py-1.5 text-sm rounded-lg border border-rose-500 focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 bg-white"
                />
                <div className="flex items-center gap-2 justify-end">
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="px-2.5 py-1 text-xs font-semibold rounded-md border border-slate-300 text-slate-600 hover:bg-slate-50"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={() => saveEdit('product_name')}
                    className="px-2.5 py-1 text-xs font-semibold rounded-md bg-rose-700 text-white hover:bg-rose-800"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm font-bold text-slate-900">
                {pdpData.product_name.value}
              </p>
            )}
            <span className="inline-block mt-2 text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">
              Terlihat di PDP
            </span>
          </div>

          {/* Brand & Marketplace Card */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-slate-300 transition-colors">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-slate-400" />
                Brand & Marketplace
              </span>
              {editingKey !== 'brand' && (
                <button
                  type="button"
                  onClick={() => startEdit('brand', pdpData.brand.value)}
                  className="text-slate-400 hover:text-rose-700 text-xs font-medium flex items-center gap-1 transition-colors"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit</span>
                </button>
              )}
            </div>

            {editingKey === 'brand' ? (
              <div className="space-y-2 mt-2">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  placeholder="Nama brand"
                  className="w-full px-3 py-1.5 text-sm rounded-lg border border-rose-500 focus:outline-hidden bg-white"
                />
                <div className="flex items-center gap-2 justify-end">
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="px-2.5 py-1 text-xs font-semibold rounded-md border border-slate-300 text-slate-600 hover:bg-slate-50"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={() => saveEdit('brand')}
                    className="px-2.5 py-1 text-xs font-semibold rounded-md bg-rose-700 text-white hover:bg-rose-800"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900">
                  {pdpData.brand.value}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold">
                  {pdpData.marketplace.value}
                </span>
              </div>
            )}
            <span className="inline-block mt-2 text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">
              Terlihat di PDP
            </span>
          </div>

          {/* Price Card */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-slate-300 transition-colors">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                Harga Jual
              </span>
              {editingKey !== 'price' && (
                <button
                  type="button"
                  onClick={() => startEdit('price', pdpData.price.value)}
                  className="text-slate-400 hover:text-rose-700 text-xs font-medium flex items-center gap-1 transition-colors"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit</span>
                </button>
              )}
            </div>

            {editingKey === 'price' ? (
              <div className="space-y-2 mt-2">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  placeholder="Contoh: Rp129.000"
                  className="w-full px-3 py-1.5 text-sm rounded-lg border border-rose-500 focus:outline-hidden bg-white"
                />
                <div className="flex items-center gap-2 justify-end">
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="px-2.5 py-1 text-xs font-semibold rounded-md border border-slate-300 text-slate-600 hover:bg-slate-50"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={() => saveEdit('price')}
                    className="px-2.5 py-1 text-xs font-semibold rounded-md bg-rose-700 text-white hover:bg-rose-800"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-baseline gap-2">
                <span
                  className={`text-base font-extrabold ${
                    isDetected(pdpData.price.value) ? 'text-slate-900' : 'text-amber-700 text-xs font-semibold'
                  }`}
                >
                  {pdpData.price.value}
                </span>
                {pdpData.original_price?.value && (
                  <span className="text-xs text-slate-400 line-through">
                    {pdpData.original_price.value}
                  </span>
                )}
                {pdpData.discount_percentage?.value && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-rose-50 text-rose-600 border border-rose-200">
                    -{pdpData.discount_percentage.value}
                  </span>
                )}
              </div>
            )}
            <span
              className={`inline-block mt-2 text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                isDetected(pdpData.price.value)
                  ? 'text-rose-700 bg-rose-50'
                  : 'text-amber-800 bg-amber-50'
              }`}
            >
              {isDetected(pdpData.price.value) ? 'Terlihat di PDP' : 'Belum Terdeteksi di Screenshot'}
            </span>
          </div>

          {/* Social Proof Card */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-slate-300 transition-colors">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-slate-400" />
                Bukti Sosial (Rating & Ulasan)
              </span>
              {editingKey !== 'rating' && (
                <button
                  type="button"
                  onClick={() => startEdit('rating', pdpData.rating.value)}
                  className="text-slate-400 hover:text-rose-700 text-xs font-medium flex items-center gap-1 transition-colors"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit</span>
                </button>
              )}
            </div>

            {editingKey === 'rating' ? (
              <div className="space-y-2 mt-2">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  placeholder="Contoh: 4.8"
                  className="w-full px-3 py-1.5 text-sm rounded-lg border border-rose-500 focus:outline-hidden bg-white"
                />
                <div className="flex items-center gap-2 justify-end">
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="px-2.5 py-1 text-xs font-semibold rounded-md border border-slate-300 text-slate-600 hover:bg-slate-50"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={() => saveEdit('rating')}
                    className="px-2.5 py-1 text-xs font-semibold rounded-md bg-rose-700 text-white hover:bg-rose-800"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                {isDetected(pdpData.rating.value) ? (
                  <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{pdpData.rating.value}</span>
                  </div>
                ) : (
                  <span className="text-xs text-slate-500 italic">
                    Rating belum terlihat
                  </span>
                )}
                {isDetected(pdpData.review_count.value) && (
                  <span className="text-xs text-slate-600">{pdpData.review_count.value}</span>
                )}
                {isDetected(pdpData.sales_information.value) && (
                  <span className="text-xs text-slate-600">({pdpData.sales_information.value})</span>
                )}
              </div>
            )}
            <span
              className={`inline-block mt-2 text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                isDetected(pdpData.rating.value)
                  ? 'text-rose-700 bg-rose-50'
                  : 'text-slate-500 bg-slate-100'
              }`}
            >
              {isDetected(pdpData.rating.value) ? 'Terlihat di PDP' : 'Belum Ditemukan pada Screenshot'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. PERLU DICEK / INTERPRETASI AI (Medium / Low Confidence) */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
            Perlu Dicek (Interpretasi AI & Atribut)
          </h2>
          <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-semibold border border-amber-200">
            Koreksi jika Diperlukan
          </span>
        </div>

        <div className="space-y-4">
          {/* Product Type Card */}
          <div className="p-4 rounded-xl bg-amber-50/40 border border-amber-200 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-700">
                  Tipe Produk (Potensial)
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                  Interpretasi AI
                </span>
              </div>
              {editingKey !== 'product_type' && (
                <button
                  type="button"
                  onClick={() => startEdit('product_type', pdpData.product_type.value)}
                  className="text-amber-800 hover:text-amber-950 text-xs font-medium flex items-center gap-1 transition-colors"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Koreksi</span>
                </button>
              )}
            </div>

            {editingKey === 'product_type' ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full px-3 py-1.5 text-sm rounded-lg border border-amber-400 focus:outline-hidden bg-white"
                />
                <div className="flex items-center gap-2 justify-end">
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="px-2.5 py-1 text-xs font-semibold rounded-md border border-slate-300 text-slate-600 hover:bg-slate-50"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={() => saveEdit('product_type')}
                    className="px-2.5 py-1 text-xs font-semibold rounded-md bg-amber-600 text-white hover:bg-amber-700"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm font-semibold text-slate-900">
                {pdpData.product_type.value}
              </p>
            )}
          </div>

          {/* Full Title Card */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-500">
                Judul Lengkap Listing Terbaca
              </span>
              {editingKey !== 'title' && (
                <button
                  type="button"
                  onClick={() => startEdit('title', pdpData.title.value)}
                  className="text-slate-400 hover:text-rose-700 text-xs font-medium flex items-center gap-1 transition-colors"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit Judul</span>
                </button>
              )}
            </div>

            {editingKey === 'title' ? (
              <div className="space-y-2">
                <textarea
                  rows={3}
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-rose-500 focus:outline-hidden bg-white"
                />
                <div className="flex items-center gap-2 justify-end">
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="px-2.5 py-1 text-xs font-semibold rounded-md border border-slate-300 text-slate-600 hover:bg-slate-50"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={() => saveEdit('title')}
                    className="px-2.5 py-1 text-xs font-semibold rounded-md bg-rose-700 text-white hover:bg-rose-800"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-800 leading-relaxed font-medium">
                {pdpData.title.value}
              </p>
            )}
          </div>

          {/* Benefits Communicated Card */}
          {pdpData.benefits_communicated && pdpData.benefits_communicated.length > 0 && (
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-xs font-medium text-slate-500 mb-2 block">
                Benefit yang Terbaca dari Infografis / Teks PDP
              </span>
              <div className="flex flex-wrap gap-2">
                {pdpData.benefits_communicated.map((b, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1 rounded-lg bg-rose-50 text-rose-800 border border-rose-200 font-medium"
                  >
                    ✓ {b}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Inferred Keyword Candidates */}
          {pdpData.possible_keyword_intent && pdpData.possible_keyword_intent.length > 0 && (
            <div className="p-4 rounded-xl bg-sky-50/50 border border-sky-200 shadow-2xs">
              <div className="flex items-center gap-2 mb-2">
                <Search className="w-4 h-4 text-sky-600" />
                <span className="text-xs font-bold text-sky-900">
                  Possible Search Intent
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">
                  Keyword Candidate
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {pdpData.possible_keyword_intent.map((kw, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-md bg-white border border-sky-200 text-sky-800 font-medium"
                  >
                    {kw}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 mt-2 italic">
                *Diderivasi dari teks PDP yang diunggah, bukan klaim volume pencarian eksternal.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 3. BELUM TERDETEKSI (Missing information) */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <HelpCircle className="w-4 h-4 text-slate-400" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
            Belum Terdeteksi dari Screenshot
          </h2>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <p className="text-xs text-slate-600 mb-3 leading-relaxed">
            AI membaca screenshot Anda secara ketat tanpa menebak angka. Elemen berikut belum ditemukan pada tangkapan layar yang diunggah:
          </p>
          <ul className="space-y-1.5">
            {pdpData.missing_information && pdpData.missing_information.length > 0 ? (
              pdpData.missing_information.map((item, idx) => (
                <li key={idx} className="text-xs text-slate-600 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))
            ) : (
              <li className="text-xs text-slate-500 italic">
                Tidak ada informasi krusial yang terlewat.
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Periksa Lagi
        </button>

        <button
          type="button"
          onClick={onConfirmContinue}
          disabled={!hasMinimumInfo}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-rose-700 text-white font-bold text-sm hover:bg-rose-800 active:scale-98 transition-all shadow-md shadow-rose-700/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Ya, Lanjutkan</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
