import { DimensionId, CriterionEvaluation, DimensionResult } from '../types/pdp';

export interface RubricCriterionDef {
  id: string;
  name: string;
  dimensionId: DimensionId;
  maxScore: number;
  description: string;
  evalGuidance: string;
}

export interface RubricDimensionDef {
  id: DimensionId;
  name: string;
  maxScore: number;
  description: string;
  criteria: RubricCriterionDef[];
}

export const RUBRIC_DIMENSIONS: RubricDimensionDef[] = [
  {
    id: 'search_relevance',
    name: 'Search Relevance',
    maxScore: 20,
    description: 'Kesesuaian judul dan atribut listing dengan intensi pencarian calon pembeli di marketplace.',
    criteria: [
      {
        id: 'SR1',
        name: 'Product Type & Category Clarity',
        dimensionId: 'search_relevance',
        maxScore: 4,
        description: 'Jenis produk dan kategori tercermin secara jelas dan tepat pada judul utama.',
        evalGuidance: 'Apakah pembeli langsung tahu apa jenis produknya dalam 2 detik pertama membaca judul?'
      },
      {
        id: 'SR2',
        name: 'Main Search Intent Relevance',
        dimensionId: 'search_relevance',
        maxScore: 5,
        description: 'Relevansi kata kunci utama dengan cara pembeli biasa mencari produk sejenis.',
        evalGuidance: 'Apakah judul memasukkan search query primer yang natural dan relevan?'
      },
      {
        id: 'SR3',
        name: 'Relevant Product Attributes in Title',
        dimensionId: 'search_relevance',
        maxScore: 4,
        description: 'Atribut kunci penting (ukuran, varian, isi, bahan, tipe) tercantum di judul.',
        evalGuidance: 'Apakah ukuran (misal 50ml, 100gr) dan spesifikasi inti ada di judul?'
      },
      {
        id: 'SR4',
        name: 'Title Readability',
        dimensionId: 'search_relevance',
        maxScore: 4,
        description: 'Keterbacaan judul oleh mata manusia, struktur rapi, tidak terputus janggal di mobile screen.',
        evalGuidance: 'Apakah judul nyaman dibaca manusia dan memprioritaskan kata penting di awal?'
      },
      {
        id: 'SR5',
        name: 'Keyword Redundancy / Stuffing',
        dimensionId: 'search_relevance',
        maxScore: 3,
        description: 'Bebas dari pengulangan kata kunci yang berlebihan atau keyword spam yang menurunkan konversi.',
        evalGuidance: 'Beri skor tinggi jika bersih dari pengulangan kata yang tidak perlu.'
      }
    ]
  },
  {
    id: 'product_clarity',
    name: 'Product Clarity',
    maxScore: 20,
    description: 'Kejelasan informasi produk secara komprehensif, mulai dari fungsi, spesifikasi teknis, hingga cara pemakaian.',
    criteria: [
      {
        id: 'PC1',
        name: 'What the Product Is',
        dimensionId: 'product_clarity',
        maxScore: 4,
        description: 'Kejelasan identitas fisik dan esensi produk tanpa menimbulkan salah paham pembeli.',
        evalGuidance: 'Apakah pembeli tidak bingung apa yang sebenarnya mereka beli?'
      },
      {
        id: 'PC2',
        name: 'Product Specification',
        dimensionId: 'product_clarity',
        maxScore: 4,
        description: 'Kelengkapan data spesifikasi teknis (berat bersih, dimensi, bahan, nomor seri/BPOM).',
        evalGuidance: 'Apakah rincian teknis dijabarkan dengan rapi di teks deskripsi atau gambar?'
      },
      {
        id: 'PC3',
        name: 'Usage / Context',
        dimensionId: 'product_clarity',
        maxScore: 4,
        description: 'Petunjuk cara pakai, waktu penggunaan, atau konteks pengaplikasian produk.',
        evalGuidance: 'Apakah ada instruksi pemakaian yang mudah dipahami calon konsumen?'
      },
      {
        id: 'PC4',
        name: 'Information Findability',
        dimensionId: 'product_clarity',
        maxScore: 4,
        description: 'Kemudahan menemukan informasi penting tanpa harus scroll berulang-ulang.',
        evalGuidance: 'Apakah informasi di-chunking dengan bullet points, heading tebal, dan mudah di-skimming?'
      },
      {
        id: 'PC5',
        name: 'Information Consistency',
        dimensionId: 'product_clarity',
        maxScore: 4,
        description: 'Konsistensi informasi antara judul, gambar carousel, dan teks deskripsi.',
        evalGuidance: 'Apakah klaim atau spesifikasi di gambar cocok dengan teks deskripsi dan varian?'
      }
    ]
  },
  {
    id: 'benefit_persuasion',
    name: 'Benefit & Persuasion',
    maxScore: 15,
    description: 'Kemampuan PDP menerjemahkan fitur teknis menjadi manfaat nyata yang menjawab masalah konsumen.',
    criteria: [
      {
        id: 'BP1',
        name: 'Feature-to-Benefit Translation',
        dimensionId: 'benefit_persuasion',
        maxScore: 4,
        description: 'Penerjemahan fitur/kandungan menjadi solusi manfaat emosional atau fungsional.',
        evalGuidance: 'Tidak hanya menyebut kandungan (misal: Ceramide), tapi menjelaskan manfaatnya (memperbaiki skin barrier).'
      },
      {
        id: 'BP2',
        name: 'USP Clarity',
        dimensionId: 'benefit_persuasion',
        maxScore: 4,
        description: 'Kejelasan faktor pembeda unik (Unique Selling Proposition) dibanding produk pesaing di pasar.',
        evalGuidance: 'Kenapa pembeli harus memilih produk ini dibanding brand lain di marketplace?'
      },
      {
        id: 'BP3',
        name: 'Customer Problem / Use Case',
        dimensionId: 'benefit_persuasion',
        maxScore: 3,
        description: 'Penggambaran masalah konsumen (pain point) yang diselesaikan oleh produk.',
        evalGuidance: 'Apakah PDP menyentuh keluhan nyata konsumen (kulit kering, kusam, iritasi, dll)?'
      },
      {
        id: 'BP4',
        name: 'Value Proposition',
        dimensionId: 'benefit_persuasion',
        maxScore: 2,
        description: 'Kekuatan janji nilai utama yang ditawarkan produk secara lugas dan meyakinkan.',
        evalGuidance: 'Apakah proposisi nilai terasa kuat dan sebanding dengan harga?'
      },
      {
        id: 'BP5',
        name: 'Information Hierarchy',
        dimensionId: 'benefit_persuasion',
        maxScore: 2,
        description: 'Urutan penyampaian pesan dari hook utama, bukti, hingga ajakan aksi.',
        evalGuidance: 'Apakah alur pesan mengalir logis dari yang paling penting ke detail pendukung?'
      }
    ]
  },
  {
    id: 'trust_credibility',
    name: 'Trust & Credibility',
    maxScore: 15,
    description: 'Elemen bukti sosial, sertifikasi resmi, dan transparansi yang menepis keraguan pembeli.',
    criteria: [
      {
        id: 'TC1',
        name: 'Claim Credibility',
        dimensionId: 'trust_credibility',
        maxScore: 4,
        description: 'Kredibilitas klaim produk yang dapat dipertanggungjawabkan dan tidak terkesan berlebihan.',
        evalGuidance: 'Apakah klaim masuk akal dan didukung penjelasan logis?'
      },
      {
        id: 'TC2',
        name: 'Social Proof',
        dimensionId: 'trust_credibility',
        maxScore: 3,
        description: 'Adanya rating toko/produk, jumlah ulasan, atau testimoni terverifikasi yang terlihat.',
        evalGuidance: 'Hanya beri skor jika ada rating/review riil yang terlihat di screenshot.'
      },
      {
        id: 'TC3',
        name: 'Certification / Guarantee / Warranty',
        dimensionId: 'trust_credibility',
        maxScore: 3,
        description: 'Sertifikasi resmi (BPOM, Halal, ISO) atau garansi keaslian 100% original.',
        evalGuidance: 'Hanya berikan poin jika nomor atau logo sertifikasi terlihat di screenshot.'
      },
      {
        id: 'TC4',
        name: 'Product Information Transparency',
        dimensionId: 'trust_credibility',
        maxScore: 3,
        description: 'Transparansi produsen, expired date, masa simpan, atau kebijakan komplain/retur.',
        evalGuidance: 'Apakah ada info jelas mengenai kebijakan toko atau masa kedaluwarsa?'
      },
      {
        id: 'TC5',
        name: 'Absence of Misleading Claims',
        dimensionId: 'trust_credibility',
        maxScore: 2,
        description: 'Tidak adanya janji palsu yang dilarang regulasi atau klaim berlebihan tanpa bukti.',
        evalGuidance: 'Beri skor penuh jika tidak ada klaim menyesatkan seperti sembuh instan 1 hari.'
      }
    ]
  },
  {
    id: 'visual_quality',
    name: 'Visual Quality',
    maxScore: 20,
    description: 'Kualitas visual foto produk, carousel infografis, keterbacaan teks di smartphone, dan storytelling visual.',
    criteria: [
      {
        id: 'VQ1',
        name: 'Product Visibility',
        dimensionId: 'visual_quality',
        maxScore: 4,
        description: 'Bentuk fisik produk dan kemasan terlihat jelas, tajam, dengan pencahayaan memadai.',
        evalGuidance: 'Apakah produk menjadi bintang utama di foto tanpa terhalang elemen lain?'
      },
      {
        id: 'VQ2',
        name: 'Thumbnail Clarity',
        dimensionId: 'visual_quality',
        maxScore: 3,
        description: 'Foto pertama (hero image) sangat jelas saat mengecil di halaman pencarian marketplace.',
        evalGuidance: 'Apakah hero image mencolok dan bersih di grid pencarian mobile?'
      },
      {
        id: 'VQ3',
        name: 'Visual Sequence / Story',
        dimensionId: 'visual_quality',
        maxScore: 4,
        description: 'Urutan slide gambar membangun cerita yang runtut (Hero -> Manfaat -> Bukti -> Cara Pakai).',
        evalGuidance: 'Apakah susunan gambar di carousel terasa seperti presentasi penjualan yang matang?'
      },
      {
        id: 'VQ4',
        name: 'Information Coverage',
        dimensionId: 'visual_quality',
        maxScore: 4,
        description: 'Gambar mampu menjawab pertanyaan utama pembeli bahkan tanpa membaca deskripsi teks.',
        evalGuidance: 'Apakah infografis pada gambar sudah merangkum poin-poin paling penting?'
      },
      {
        id: 'VQ5',
        name: 'Visual Consistency & Readability',
        dimensionId: 'visual_quality',
        maxScore: 3,
        description: 'Konsistensi warna, font, dan keterbacaan tipografi teks di layar HP.',
        evalGuidance: 'Apakah teks pada gambar tidak terlalu kecil atau buram saat dilihat di handphone?'
      },
      {
        id: 'VQ6',
        name: 'Product Fidelity',
        dimensionId: 'visual_quality',
        maxScore: 2,
        description: 'Visual menampilkan representasi asli produk tanpa filter distorsi berlebihan.',
        evalGuidance: 'Apakah warna dan tekstur produk tampak otentik dan realistis?'
      }
    ]
  },
  {
    id: 'offer_clarity',
    name: 'Offer Clarity',
    maxScore: 10,
    description: 'Kejelasan penawaran harga, opsi varian, promo, dan alasan rasional untuk checkout sekarang.',
    criteria: [
      {
        id: 'OC1',
        name: 'Price / Value Clarity',
        dimensionId: 'offer_clarity',
        maxScore: 3,
        description: 'Harga produk jelas, tidak ambigu, dan nilai yang didapat terasa sepadan.',
        evalGuidance: 'Apakah pembeli tahu pasti berapa harga bersih yang harus dibayar?'
      },
      {
        id: 'OC2',
        name: 'Promo / Bundle Communication',
        dimensionId: 'offer_clarity',
        maxScore: 2,
        description: 'Penawaran voucher, diskon, gratis ongkir, atau bundling dikomunikasikan dengan jelas.',
        evalGuidance: 'Apakah ada promosi atau insentif belanja yang mudah diklaim?'
      },
      {
        id: 'OC3',
        name: 'Reason to Choose Offer',
        dimensionId: 'offer_clarity',
        maxScore: 2,
        description: 'Alasan rasional mengapa opsi/paket yang ditawarkan adalah pilihan terbaik bagi konsumen.',
        evalGuidance: 'Apakah ada pemandu pilihan paket hemat atau rekomendasi varian terlaris?'
      },
      {
        id: 'OC4',
        name: 'Variant / Quantity Clarity',
        dimensionId: 'offer_clarity',
        maxScore: 2,
        description: 'Pilihan varian (ukuran, warna, rasa, isi) jelas dengan foto varian yang cocok.',
        evalGuidance: 'Apakah nama varian dan fotonya sinkron agar pembeli tidak salah pesan?'
      },
      {
        id: 'OC5',
        name: 'Non-Misleading Offer',
        dimensionId: 'offer_clarity',
        maxScore: 1,
        description: 'Tidak ada trik harga pancingan atau varian palsu yang membingungkan checkout.',
        evalGuidance: 'Beri skor jika harga sesuai dengan barang utama yang ditampilkan.'
      }
    ]
  }
];

export function calculateDeterministicScores(
  evaluatedCriteria: CriterionEvaluation[]
): {
  dimensions: Record<DimensionId, DimensionResult>;
  totalScore: number;
  maxScore: number;
  overallStatus: 'Strong' | 'Good Foundation' | 'Needs Improvement' | 'Major Gaps';
} {
  const criteriaMap = new Map<string, CriterionEvaluation>();
  evaluatedCriteria.forEach((c) => criteriaMap.set(c.id, c));

  const dimensionsResult: Record<DimensionId, any> = {} as any;
  let totalScore = 0;
  const maxScore = 100;

  RUBRIC_DIMENSIONS.forEach((dimDef) => {
    let dimScore = 0;
    const dimCriteria: CriterionEvaluation[] = [];

    dimDef.criteria.forEach((critDef) => {
      const evalItem = criteriaMap.get(critDef.id);
      const safeScore = evalItem ? Math.min(Math.max(0, evalItem.score), critDef.maxScore) : 0;
      dimScore += safeScore;

      dimCriteria.push({
        id: critDef.id,
        name: critDef.name,
        dimensionId: dimDef.id,
        score: safeScore,
        maxScore: critDef.maxScore,
        observation: evalItem?.observation || 'Belum terdeteksi bukti spesifik dari screenshot yang dianalisis.',
        evidence: evalItem?.evidence || 'Tidak ditemukan bukti langsung pada tangkapan layar.',
        screenshotRef: evalItem?.screenshotRef,
        screenshotIndex: evalItem?.screenshotIndex,
        whyItMatters: evalItem?.whyItMatters || critDef.evalGuidance,
        recommendation: evalItem?.recommendation || 'Lengkapi elemen ini pada listing produk Anda.',
        confidence: evalItem?.confidence || 'Medium'
      });
    });

    const percentage = (dimScore / dimDef.maxScore) * 100;
    let status: 'Strong' | 'Good Foundation' | 'Needs Improvement' | 'Major Gaps' = 'Major Gaps';
    if (percentage >= 85) status = 'Strong';
    else if (percentage >= 70) status = 'Good Foundation';
    else if (percentage >= 55) status = 'Needs Improvement';

    let summary = '';
    if (status === 'Strong') {
      summary = `Performa ${dimDef.name} sangat optimal dan solid.`;
    } else if (status === 'Good Foundation') {
      summary = `Fondasi ${dimDef.name} sudah baik, dengan beberapa potensi optimasi.`;
    } else if (status === 'Needs Improvement') {
      summary = `Perlu perbaikan terarah pada beberapa kriteria ${dimDef.name}.`;
    } else {
      summary = `Ditemukan gap signifikan pada dimensi ${dimDef.name}.`;
    }

    dimensionsResult[dimDef.id] = {
      id: dimDef.id,
      name: dimDef.name,
      score: dimScore,
      maxScore: dimDef.maxScore,
      status,
      summary,
      criteria: dimCriteria
    };

    totalScore += dimScore;
  });

  let overallStatus: 'Strong' | 'Good Foundation' | 'Needs Improvement' | 'Major Gaps' = 'Major Gaps';
  if (totalScore >= 85) overallStatus = 'Strong';
  else if (totalScore >= 70) overallStatus = 'Good Foundation';
  else if (totalScore >= 55) overallStatus = 'Needs Improvement';

  return {
    dimensions: dimensionsResult,
    totalScore,
    maxScore,
    overallStatus
  };
}
