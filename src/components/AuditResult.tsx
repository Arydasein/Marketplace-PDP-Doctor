import React, { useState } from 'react';
import {
  Award,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Zap,
  ArrowRight,
  Sparkles,
  RotateCcw,
  Layers,
  ShieldCheck,
  TrendingUp,
  FileSearch,
  Users
} from 'lucide-react';
import {
  AuditResult as AuditResultType,
  DimensionId,
  DimensionResult,
  CriterionEvaluation,
  ScreenshotItem
} from '../types/pdp';

interface AuditResultProps {
  auditResult: AuditResultType;
  screenshots: ScreenshotItem[];
  onOpenOptimizer: () => void;
  onOpenReAudit: () => void;
  onStartNewProduct: () => void;
  onInspectScreenshot: (ref: string, index?: number) => void;
  onBack: () => void;
}

export const AuditResult: React.FC<AuditResultProps> = ({
  auditResult,
  screenshots,
  onOpenOptimizer,
  onOpenReAudit,
  onStartNewProduct,
  onInspectScreenshot,
  onBack
}) => {
  const [expandedDimensionId, setExpandedDimensionId] = useState<DimensionId | null>(null);

  const toggleDimension = (id: DimensionId) => {
    setExpandedDimensionId(expandedDimensionId === id ? null : id);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Strong':
        return 'bg-emerald-50 text-emerald-800 border-emerald-300';
      case 'Good Foundation':
        return 'bg-blue-50 text-blue-800 border-blue-300';
      case 'Needs Improvement':
        return 'bg-amber-50 text-amber-800 border-amber-300';
      default:
        return 'bg-rose-50 text-rose-800 border-rose-300';
    }
  };

  const dimensionKeys: DimensionId[] = [
    'search_relevance',
    'product_clarity',
    'benefit_persuasion',
    'trust_credibility',
    'visual_quality',
    'offer_clarity'
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Top Header & Score Card */}
      <div className="mb-8 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
              Hasil Audit Resmi
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Boleh Belajar PDP Framework
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            PDP Quality Score
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Evaluasi menyeluruh performa listing berdasarkan 6 dimensi penilaian marketplace.
          </p>
        </div>

        {/* Score & Status Badge */}
        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 shrink-0">
          <div className="text-right">
            <div className="flex items-baseline justify-end gap-1">
              <span className="text-4xl sm:text-5xl font-black text-slate-900 font-mono tracking-tight">
                {auditResult.totalScore}
              </span>
              <span className="text-base text-slate-400 font-bold font-mono">
                / {auditResult.maxScore}
              </span>
            </div>
            <div className="mt-1">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadgeColor(
                  auditResult.scoreStatus
                )}`}
              >
                {auditResult.scoreStatus}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Data Confidence Banner */}
      <div className="mb-8 p-4 rounded-2xl bg-sky-50 border border-sky-200 flex items-start gap-3 text-sky-950">
        <div className="p-2 rounded-xl bg-sky-100 text-sky-700 shrink-0 mt-0.5">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-900">
              Data Confidence: {auditResult.dataConfidence}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-200 text-sky-800 font-semibold">
              Bukan Bagian dari Skor
            </span>
          </div>
          <p className="text-xs text-sky-800 mt-0.5 leading-relaxed">
            {auditResult.dataConfidenceExplanation}
          </p>
        </div>
      </div>

      {/* 6 Dimension Cards */}
      <div className="mb-10">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight mb-4">
          Rincian 6 Dimensi Scoring
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dimensionKeys.map((dimKey) => {
            const dim = auditResult.dimensions[dimKey];
            if (!dim) return null;
            const isExpanded = expandedDimensionId === dimKey;

            return (
              <div
                key={dimKey}
                className={`p-5 rounded-2xl border transition-all ${
                  isExpanded
                    ? 'md:col-span-2 bg-white border-rose-400 shadow-md ring-2 ring-rose-500/10'
                    : 'bg-white border-slate-200 shadow-2xs hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">
                      {dim.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {dim.summary}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-lg font-black font-mono text-slate-900">
                      {dim.score}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      /{dim.maxScore}
                    </span>
                    <div className="mt-1">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadgeColor(
                          dim.status
                        )}`}
                      >
                        {dim.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <span className="text-xs text-slate-400">
                    {dim.criteria.length} kriteria penilaian
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleDimension(dimKey)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 hover:text-rose-800 transition-colors py-1 px-2 rounded-lg hover:bg-rose-50"
                  >
                    <span>{isExpanded ? 'Tutup Detail' : 'Lihat Detail'}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Expanded Criteria Breakdown */}
                {isExpanded && (
                  <div className="mt-5 pt-5 border-t border-slate-200 space-y-4 animate-in fade-in">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Bukti & Observasi Per Kriteria
                    </h4>

                    <div className="space-y-3">
                      {dim.criteria.map((crit) => (
                        <div
                          key={crit.id}
                          className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 text-xs space-y-2.5"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold px-2 py-0.5 rounded-md bg-slate-200 text-slate-800 text-[10px]">
                                {crit.id}
                              </span>
                              <span className="font-bold text-slate-900 text-sm">
                                {crit.name}
                              </span>
                            </div>
                            <span className="font-mono font-black text-slate-900 text-sm">
                              {crit.score} / {crit.maxScore}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                            <div>
                              <span className="font-semibold text-slate-600 block mb-0.5">
                                Observasi AI:
                              </span>
                              <p className="text-slate-800">{crit.observation}</p>
                            </div>

                            <div>
                              <span className="font-semibold text-slate-600 block mb-0.5">
                                Bukti Lapangan:
                              </span>
                              <p className="text-slate-800">{crit.evidence}</p>
                              {crit.screenshotRef && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    onInspectScreenshot(crit.screenshotRef!, crit.screenshotIndex)
                                  }
                                  className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 hover:text-rose-800 underline"
                                >
                                  <Eye className="w-3 h-3" />
                                  <span>Lihat {crit.screenshotRef}</span>
                                </button>
                              )}
                            </div>
                          </div>

                          <div className="pt-2 border-t border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-slate-600">
                            <div>
                              <span className="font-semibold text-slate-700">Rekomendasi Tindakan: </span>
                              <span>{crit.recommendation}</span>
                            </div>
                            <span className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-500 shrink-0 font-medium">
                              Confidence: {crit.confidence}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 text-right">
                      <button
                        type="button"
                        onClick={() => toggleDimension(dimKey)}
                        className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100"
                      >
                        Tutup Detail {dim.name}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Diagnosis Summary (Yang Sudah Kuat, Gap Terbesar, Prioritas Utama) */}
      <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Yang Sudah Kuat */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-2 mb-3 text-emerald-700">
            <CheckCircle2 className="w-5 h-5" />
            <h3 className="font-bold text-sm text-slate-900">Yang Sudah Kuat</h3>
          </div>
          <ul className="space-y-2.5">
            {auditResult.diagnosis.strengths.map((item, idx) => (
              <li key={idx} className="text-xs text-slate-700 flex items-start gap-2 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Gap Terbesar */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-2 mb-3 text-rose-600">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="font-bold text-sm text-slate-900">Gap Terbesar</h3>
          </div>
          <ul className="space-y-2.5">
            {auditResult.diagnosis.biggestGaps.map((item, idx) => (
              <li key={idx} className="text-xs text-slate-700 flex items-start gap-2 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Prioritas Utama */}
        <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200 shadow-2xs">
          <div className="flex items-center gap-2 mb-3 text-rose-800">
            <Zap className="w-5 h-5 text-rose-600" />
            <h3 className="font-bold text-sm text-rose-950">Prioritas Utama</h3>
          </div>
          <ul className="space-y-2.5">
            {auditResult.diagnosis.topPriorities.map((item, idx) => (
              <li key={idx} className="text-xs text-rose-900 flex items-start gap-2 leading-relaxed font-medium">
                <span className="w-5 h-5 rounded-full bg-rose-700 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Competitive Benchmark (If Available) */}
      {(() => {
        const benchmark = auditResult.benchmark;
        if (!benchmark || benchmark.competitors.length === 0) return null;
        return (
          <div className="mb-10 p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-base text-slate-900">
                Competitive Benchmark
              </h3>
            </div>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                    <th className="py-2.5 pr-4">Dimensi</th>
                    <th className="py-2.5 px-4 bg-rose-50 text-rose-900 font-bold">PDP Kamu</th>
                    {benchmark.competitors.map((c) => (
                      <th key={c.id} className="py-2.5 px-4 font-bold text-slate-800">
                        {c.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {benchmark.comparisonTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-2.5 pr-4 text-slate-700">{row.dimensionName}</td>
                      <td className="py-2.5 px-4 bg-rose-50/50 font-bold text-rose-950 font-mono">
                        {row.myScore} / {row.maxScore}
                      </td>
                      {benchmark.competitors.map((c) => (
                        <td key={c.id} className="py-2.5 px-4 text-slate-700 font-mono">
                          {row.competitorScores[c.id] || '-'} / {row.maxScore}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">Keunggulan Kompetitif:</span>
                <p className="text-slate-600">
                  {benchmark.strengths[0] || 'PDP kamu unggul pada ketajaman hero image dan kejelasan harga promo.'}
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">Gap Kompetitif Terbesar:</span>
                <p className="text-slate-600">
                  {benchmark.gaps[0] || 'Competitor memiliki variasi slide tekstur dan visual manfaat yang lebih detail.'}
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">Peluang Listing:</span>
                <p className="text-slate-600">
                  {benchmark.opportunities[0] || 'Tingkatkan komunikasi bundling hemat untuk merebut pembeli yang ragu.'}
                </p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Main Action Bar */}
      <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            Kembali
          </button>
          <button
            type="button"
            onClick={onStartNewProduct}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Mulai Produk Baru</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onOpenReAudit}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs font-bold hover:bg-slate-50 shadow-2xs"
          >
            <RotateCcw className="w-4 h-4 text-blue-600" />
            <span>Re-Audit PDP</span>
          </button>

          <button
            type="button"
            onClick={onOpenOptimizer}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-rose-700 text-white text-xs font-bold hover:bg-rose-800 shadow-md shadow-rose-700/20 active:scale-98"
          >
            <span>Optimasi PDP Saya</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
