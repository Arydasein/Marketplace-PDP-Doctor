export type ConfidenceLevel = 'high' | 'medium' | 'low' | 'unknown';

export interface ExtractedField<T = string> {
  value: T;
  confidence: ConfidenceLevel;
  source?: 'visible' | 'inferred';
  rawText?: string;
}

export interface PDPData {
  marketplace: ExtractedField<string>;
  brand: ExtractedField<string>;
  product_name: ExtractedField<string>;
  product_type: ExtractedField<string>;
  category: ExtractedField<string>;
  price: ExtractedField<string>;
  original_price?: ExtractedField<string>;
  discount_percentage?: ExtractedField<string>;
  title: ExtractedField<string>;
  description: ExtractedField<string>;
  product_attributes: string[];
  features: string[];
  benefits_communicated: string[];
  promotions: string[];
  variants: string[];
  rating: ExtractedField<string>;
  review_count: ExtractedField<string>;
  sales_information: ExtractedField<string>;
  certifications_detected: string[];
  visual_count: number;
  detected_visual_messages: string[];
  possible_keyword_intent: string[];
  missing_information: string[];
}

export interface ScreenshotItem {
  id: string;
  name: string;
  dataUrl: string;
  size: number;
  fileType: string;
}

export type ScoreStatus = 'Strong' | 'Good Foundation' | 'Needs Improvement' | 'Major Gaps';

export type DimensionId =
  | 'search_relevance'
  | 'product_clarity'
  | 'benefit_persuasion'
  | 'trust_credibility'
  | 'visual_quality'
  | 'offer_clarity';

export interface CriterionEvaluation {
  id: string;
  name: string;
  dimensionId: DimensionId;
  score: number;
  maxScore: number;
  observation: string;
  evidence: string;
  screenshotRef?: string;
  screenshotIndex?: number;
  whyItMatters: string;
  recommendation: string;
  confidence: 'High' | 'Medium' | 'Low';
}

export interface DimensionResult {
  id: DimensionId;
  name: string;
  score: number;
  maxScore: number;
  status: ScoreStatus;
  summary: string;
  criteria: CriterionEvaluation[];
}

export interface DiagnosisSummary {
  strengths: string[];
  biggestGaps: string[];
  topPriorities: string[];
}

export interface TreatmentAction {
  problem: string;
  evidence: string;
  recommendation: string;
  expectedQualitativeImprovement: string;
  dimension: string;
}

export interface TreatmentPlan {
  priority1: TreatmentAction[];
  priority2: TreatmentAction[];
  alreadyStrong: string[];
}

export interface ListingOptimization {
  title: {
    current: string;
    recommended: string;
    why: string;
    characterCount: number;
  };
  description: {
    current: string;
    recommended: string;
    why: string;
  };
  missingSellerInfo: string[];
}

export interface ScreenshotVisualReview {
  screenshotIndex: number;
  screenshotName: string;
  label: string;
  strength: string;
  problem: string;
  recommendation: string;
}

export interface RecommendedVisualSlide {
  slideNumber: number;
  title: string;
  objective: string;
  message: string;
  suggestedHeadline: string;
  content: string;
  visualDirection: string;
}

export interface VisualDoctorResult {
  screenshotReviews: ScreenshotVisualReview[];
  recommendedSequence: RecommendedVisualSlide[];
}

export interface CompetitorData {
  id: string;
  name: string;
  brand: string;
  screenshots: ScreenshotItem[];
  extractedData?: PDPData;
  dimensionScores?: Record<DimensionId, number>;
  totalScore?: number;
  scoreStatus?: ScoreStatus;
}

export interface CompetitiveBenchmark {
  competitors: CompetitorData[];
  comparisonTable: Array<{
    dimensionName: string;
    myScore: number;
    maxScore: number;
    competitorScores: Record<string, number>;
  }>;
  strengths: string[];
  gaps: string[];
  opportunities: string[];
}

export interface AuditResult {
  id: string;
  timestamp: number;
  totalScore: number;
  maxScore: number;
  scoreStatus: ScoreStatus;
  dataConfidence: 'High' | 'Medium' | 'Low';
  dataConfidenceExplanation: string;
  dimensions: Record<DimensionId, DimensionResult>;
  diagnosis: DiagnosisSummary;
  treatmentPlan: TreatmentPlan;
  listingOptimization: ListingOptimization;
  visualDoctor?: VisualDoctorResult;
  benchmark?: CompetitiveBenchmark;
}

export interface GeneratedVisual {
  id: string;
  type: 'concept' | 'product_visual';
  aspectRatio: '1:1' | '4:5' | '9:16';
  visualType: string;
  imageUrl: string;
  objective: string;
  copyUsed: string;
  disclaimer: string;
  createdAt: number;
}

export interface BeforeAfterComparison {
  dimensionDeltas: Array<{
    dimensionId: DimensionId;
    dimensionName: string;
    beforeScore: number;
    afterScore: number;
    change: number;
    maxScore: number;
  }>;
  beforeTotal: number;
  afterTotal: number;
  totalChange: number;
  improvedCriteria: string[];
  stillNeedsImprovement: string[];
  nextPriorities: string[];
}
