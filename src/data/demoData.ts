import { PDPData, ScreenshotItem } from '../types/pdp';

export const DEMO_SCREENSHOTS: ScreenshotItem[] = [
  {
    id: 'demo-shot-1',
    name: 'Nuvora_PDP_Hero_Price.jpg',
    dataUrl: '/src/assets/images/nuvora_hero_pdp_1791343453485.jpg',
    size: 245000,
    fileType: 'image/jpeg'
  },
  {
    id: 'demo-shot-2',
    name: 'Nuvora_PDP_Benefits_Infographic.jpg',
    dataUrl: '/src/assets/images/nuvora_benefits_pdp_1791343470311.jpg',
    size: 312000,
    fileType: 'image/jpeg'
  }
];

export const DEMO_PDP_DATA: PDPData = {
  marketplace: { value: 'Shopee Mall', confidence: 'high', source: 'visible' },
  brand: { value: 'Nuvora', confidence: 'high', source: 'visible' },
  product_name: { value: 'Daily Barrier Moisturizer 50ml', confidence: 'high', source: 'visible' },
  product_type: { value: 'Moisturizer Gel', confidence: 'high', source: 'inferred' },
  category: { value: 'Kecantikan > Perawatan Wajah > Pelembap', confidence: 'high', source: 'visible' },
  price: { value: 'Rp129.000', confidence: 'high', source: 'visible' },
  original_price: { value: 'Rp165.000', confidence: 'high', source: 'visible' },
  discount_percentage: { value: '22%', confidence: 'high', source: 'visible' },
  title: {
    value: 'Nuvora Daily Barrier Moisturizer Gel 50ml - 5X Ceramide & Hyaluronic Acid Skin Barrier Repair Pelembab Wajah Hydrating',
    confidence: 'high',
    source: 'visible'
  },
  description: {
    value: 'Nuvora Daily Barrier Moisturizer adalah gel pelembap bertekstur ringan dengan formula 5X Ceramide, Hyaluronic Acid, dan Centella Asiatica untuk mengunci kelembapan hingga 24 jam serta memperkuat skin barrier yang rusak akibat polusi dan eksfoliasi berlebih.\n\nKeunggulan Utama:\n- Memperbaiki skin barrier dalam 7 hari pemakaian rutin\n- Menghidrasi intensif tanpa rasa lengket atau greasy\n- Menenangkan kemerahan dan kulit teriritasi\n- Cocok untuk semua jenis kulit, termasuk kulit sensitif & acne-prone\n\nCara Pemakaian:\nOleskan secukupnya pada wajah dan leher yang telah dibersihkan setelah pemakaian serum. Gunakan pagi dan malam hari.',
    confidence: 'medium',
    source: 'visible'
  },
  product_attributes: [
    'Netto: 50ml / 1.76 fl.oz',
    'Tekstur: Water-gel ringan cepat meresap',
    'Tipe Kulit: All skin types (kering & sensitif)',
    'BPOM: NA18230109988',
    'Formula: Bebas alkohol, paraben, & artificial fragrance'
  ],
  features: [
    '5X Ceramide Complex (NP, AP, EOP, NS, AS)',
    'Hyaluronic Acid 4D',
    'Centella Asiatica Leaf Extract',
    'Marine Collagen'
  ],
  benefits_communicated: [
    'Memperbaiki dan memperkuat skin barrier',
    'Menghidrasi kulit hingga 24 jam',
    'Menenangkan kemerahan dan kulit teriritasi',
    'Mengunci kelembapan tanpa menyumbat pori-pori'
  ],
  promotions: [
    'Diskon 22% Flash Deal',
    'Gratis Ongkir Xtra Rp0',
    'Voucher Toko Cashback 5%'
  ],
  variants: [
    '50ml (Full Size)',
    '30ml (Travel Size)'
  ],
  rating: { value: '4.8', confidence: 'high', source: 'visible' },
  review_count: { value: '12.4RB Ulasan', confidence: 'high', source: 'visible' },
  sales_information: { value: 'Terjual 28.5RB+', confidence: 'high', source: 'visible' },
  certifications_detected: [
    'BPOM NA18230109988',
    'Halal Indonesia',
    'Dermatologically Tested'
  ],
  visual_count: 5,
  detected_visual_messages: [
    'Hero shot jar produk dengan background air segar',
    'Infografis 5X Ceramide dan anatomi skin barrier',
    'Uji klinis hidrasi 24 jam',
    'Cara pengaplikasian di wajah'
  ],
  possible_keyword_intent: [
    'moisturizer skin barrier',
    'ceramide pelembab wajah',
    'moisturizer gel kulit kering',
    'pelembab muka ringan bpom',
    'nuvora moisturizer'
  ],
  missing_information: [
    'Rincian masa kadaluwarsa (Expired date spesifik)',
    'Dimensi fisik packaging box kemasan luar',
    'Kebijakan garansi retur toko (syarat video unboxing)'
  ]
};
