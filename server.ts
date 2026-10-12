import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json({ limit: '50mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Marketplace PDP Doctor API' });
});

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

async function generateWithFallback(contents: any, isJson = true) {
  const models = ['gemini-3.1-flash-lite', 'gemini-3.8-flash'];
  let lastError = null;

  for (let attempt = 0; attempt < 3; attempt++) {
    for (const model of models) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents,
          config: isJson ? { responseMimeType: 'application/json' } : undefined,
        });
        if (response && response.text) {
          return response.text;
        }
      } catch (err: any) {
        console.warn(`Attempt ${attempt + 1} with ${model} failed:`, err.message?.slice(0, 100));
        lastError = err;
        if (err.message && err.message.includes('429')) {
          await new Promise((resolve) => setTimeout(resolve, 1500 * (attempt + 1)));
        }
      }
    }
  }
  throw lastError || new Error('Semua model Gemini sedang sibuk.');
}

// Endpoint: Extract PDP from Screenshots using Gemini Multimodal Vision
app.post('/api/audit/extract-pdp', async (req, res) => {
  try {
    const { screenshots } = req.body;

    if (!screenshots || !Array.isArray(screenshots) || screenshots.length === 0) {
      return res.status(400).json({ error: 'Tidak ada screenshot yang dikirim.' });
    }

    const imageParts = screenshots.slice(0, 6).map((s: any) => {
      let data = s.dataUrl || '';
      let mimeType = s.fileType || 'image/jpeg';
      if (data.includes('base64,')) {
        const matches = data.match(/^data:([^;]+);base64,(.+)$/);
        if (matches) {
          mimeType = matches[1];
          data = matches[2];
        }
      }
      return {
        inlineData: {
          mimeType,
          data,
        },
      };
    });

    const promptText = `
You are an expert Marketplace PDP Auditor for Marketplace PDP Doctor (Boleh Belajar).
Your task is to READ AND TRANSCRIBE EXACT DETAILS directly from the provided Product Detail Page (PDP) screenshot(s).

CRITICAL EXTRACTION RULES (BASED STRICTLY ON SCREENSHOT VISUALS & TEXT):
1. READ FIRST BEFORE EXTRACTING: Carefully examine every screenshot. Determine the genuine product category (e.g. Shoes/Footwear, Fashion, Electronics/Gadgets, Food/Beverage, Skincare/Cosmetics, Household, etc.).
2. EXTRACT EXACT NUMBERS ONLY:
   - For Price: Transcribe the EXACT currency and active selling price visible (e.g. "Rp199.000", "Rp129.000"). DO NOT invent or assume standard numbers.
   - For Rating: Transcribe the EXACT star rating shown (e.g. "4.8", "4.9"). If rating stars/score are not visibly printed, write "Belum ditemukan pada screenshot".
   - For Review Count & Sold Count: Extract the exact text shown (e.g. "2.4RB Ulasan", "Terjual 5RB+"). If not visible, write "Belum ditemukan pada screenshot".
3. NEVER INVENT OR HALLUCINATE: If an element (like BPOM, expired date, rating, original crossed price) is not visibly present in the screenshots, return "Belum ditemukan pada screenshot" or "Tidak terbaca dengan jelas", and set confidence to "unknown" or "low".
4. ACCURATE TITLE & BRAND: Extract the real product title, brand name, variants, and product attributes visible in the screenshots. If it is shoes, extract shoe sizes, colors, and footwear specs.

Return strictly valid JSON with this exact structure:
{
  "marketplace": { "value": "Shopee / Tokopedia / Lazada / TikTok Shop / Belum ditemukan pada screenshot", "confidence": "high|medium|low|unknown", "source": "visible" },
  "brand": { "value": "Exact brand name visible or Belum ditemukan pada screenshot", "confidence": "high|medium|low|unknown", "source": "visible" },
  "product_name": { "value": "Exact product name visible or Belum ditemukan pada screenshot", "confidence": "high|medium|low|unknown", "source": "visible" },
  "product_type": { "value": "Exact product type e.g. Sepatu Sneakers / Kemeja / TWS Earphone / etc.", "confidence": "high|medium|low|unknown", "source": "inferred" },
  "category": { "value": "Category if visible or Belum ditemukan pada screenshot", "confidence": "high|medium|low|unknown", "source": "visible" },
  "price": { "value": "Exact active price visible or Belum ditemukan pada screenshot", "confidence": "high|medium|low|unknown", "source": "visible" },
  "original_price": { "value": "Crossed-out price if visible or empty", "confidence": "high|medium|low|unknown", "source": "visible" },
  "discount_percentage": { "value": "Discount percentage badge if visible or empty", "confidence": "high|medium|low|unknown", "source": "visible" },
  "title": { "value": "Exact product title as displayed in screenshot", "confidence": "high|medium|low|unknown", "source": "visible" },
  "description": { "value": "Visible description text or key points read from screenshots", "confidence": "high|medium|low|unknown", "source": "visible" },
  "product_attributes": ["attribute 1 from screenshot", "attribute 2"],
  "features": ["feature 1", "feature 2"],
  "benefits_communicated": ["benefit 1", "benefit 2"],
  "promotions": ["voucher or promo visible in screenshot"],
  "variants": ["variant 1", "variant 2"],
  "rating": { "value": "Exact rating number visible or Belum ditemukan pada screenshot", "confidence": "high|medium|low|unknown", "source": "visible" },
  "review_count": { "value": "Exact review count visible or Belum ditemukan pada screenshot", "confidence": "high|medium|low|unknown", "source": "visible" },
  "sales_information": { "value": "Exact sales count visible or Belum ditemukan pada screenshot", "confidence": "high|medium|low|unknown", "source": "visible" },
  "certifications_detected": ["BPOM / SNI / Halal if visible"],
  "visual_count": ${screenshots.length},
  "detected_visual_messages": ["Brief note of what is shown in visual frame 1", "Brief note of visual frame 2"],
  "possible_keyword_intent": ["keyword 1", "keyword 2"],
  "missing_information": ["Crucial information missing from these screenshots that seller should provide"]
}
`;

    const contents = {
      parts: [...imageParts, { text: promptText }],
    };

    const text = await generateWithFallback(contents, true);
    const parsed = JSON.parse(text);
    res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/audit/extract-pdp:', error);
    res.status(500).json({ error: error.message || 'Gagal mengekstrak informasi PDP dari screenshot.' });
  }
});

// Endpoint: Evaluate PDP Rubric Criteria
app.post('/api/audit/evaluate-rubric', async (req, res) => {
  try {
    const { pdpData } = req.body;

    const promptText = `
You are the Chief Auditor for Boleh Belajar PDP Doctor.
Evaluate the following PDP using the official 28 criteria across 6 dimensions of the Boleh Belajar PDP Framework:
Dimensions:
1. Search Relevance (Max 20): SR1 (4), SR2 (5), SR3 (4), SR4 (4), SR5 (3)
2. Product Clarity (Max 20): PC1 (4), PC2 (4), PC3 (4), PC4 (4), PC5 (4)
3. Benefit & Persuasion (Max 15): BP1 (4), BP2 (4), BP3 (3), BP4 (2), BP5 (2)
4. Trust & Credibility (Max 15): TC1 (4), TC2 (3), TC3 (3), TC4 (3), TC5 (2)
5. Visual Quality (Max 20): VQ1 (4), VQ2 (3), VQ3 (4), VQ4 (4), VQ5 (3), VQ6 (2)
6. Offer Clarity (Max 10): OC1 (3), OC2 (2), OC3 (2), OC4 (2), OC5 (1)

Confirmed PDP Data:
${JSON.stringify(pdpData, null, 2)}

CRITICAL EVALUATION & CATEGORY MATCHING RULES:
1. STRICT PRODUCT CATEGORY ALIGNMENT:
   Look at the exact product name: "${pdpData?.product_name?.value || ''}", brand: "${pdpData?.brand?.value || ''}", category: "${pdpData?.category?.value || ''}".
   - If the product is SHOES/FOOTWEAR (sepatu, sneakers, sandal, running shoes, loafers, etc.):
     * Title recommended MUST be tailored for footwear: e.g. "[Brand] [Product Name] - Sepatu [Sneakers/Pria/Wanita] [Sol Anti Slip/Bahan] [Warna/Ukuran]" (80-120 chars, front-loaded keywords for mobile).
     * Description recommended MUST be structured specifically for footwear:
       - Header with Brand & Product Name
       - Keunggulan Utama (Upper breathable, Insole empuk nyaman, Outsole karet anti-licin, Jahitan kuat)
       - Spesifikasi Produk (Material Upper, Sol/Insole, Pilihan Ukuran 39-44, Kelengkapan Box Sepatu)
       - Panduan Ukuran / Size Chart (Cara ukur panjang telapak kaki insole dalam cm)
       - Petunjuk Perawatan Sepatu (Sikat halus, jangan rendam lama)
       - Garansi & Pengiriman (Jaminan original, garansi tukar ukuran dengan video unboxing)
     * Treatment plan MUST address shoe-specific visual needs (Size chart slide, macro foto jahitan & grip sol, foto on-feet saat dipakai).
     * NEVER EVER use skincare copy, skin barrier, face cream, or moisturizer text for shoes!
   - If the product is FASHION/APPAREL:
     * Focus on fabric material (cotton combed/linen/etc.), size chart (chest width/length), stitching, wash care.
   - If the product is ELECTRONICS:
     * Focus on tech specs, battery capacity, wattage, compatibility, official warranty.
   - If the product is FOOD/BEVERAGE:
     * Focus on taste profile, ingredients, Halal & P-IRT/BPOM, expiration date, serving guide.
   - If the product is SKINCARE:
     * Focus on active ingredients, skin benefits, skin types, BPOM, application steps.
   - For any other product:
     * Tailor 100% strictly to that specific product's real characteristics!

2. BASE OBSERVATIONS AND SCORES ON REAL DATA EXTRACTED:
   - If price, rating, or specs are "Belum ditemukan pada screenshot", award 0 or low points for those specific criteria and explicitly note that they are missing in the screenshots.
   - Do NOT invent claims, metrics, or certifications that are not present.

Return strictly valid JSON:
{
  "criteriaEvaluations": [
    { "id": "SR1", "score": 4, "maxScore": 4, "observation": "...", "evidence": "...", "screenshotRef": "Screenshot 1", "whyItMatters": "...", "recommendation": "...", "confidence": "High" }
  ],
  "diagnosis": { "strengths": [...], "biggestGaps": [...], "topPriorities": [...] },
  "treatmentPlan": { "priority1": [...], "priority2": [...], "alreadyStrong": [...] },
  "listingOptimization": {
    "title": { "current": "...", "recommended": "...", "why": "...", "characterCount": 85 },
    "description": { "current": "...", "recommended": "...", "why": "..." },
    "missingSellerInfo": [...]
  }
}
`;

    const text = await generateWithFallback(promptText, true);
    const parsed = JSON.parse(text);
    res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/audit/evaluate-rubric:', error);
    res.status(500).json({ error: error.message || 'Gagal mengevaluasi rubric PDP.' });
  }
});

async function start() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${port}`);
  });
}

start();
