export type SchemeCategory = 
  | 'all'
  | 'pension'
  | 'health'
  | 'education'
  | 'housing'
  | 'livelihood'
  | 'agriculture'
  | 'women_child';

export type ApplicationStatus = 'ready_today' | 'missing_docs' | 'needs_verification' | 'future_eligible';

export interface SchemeClauseCitation {
  docName: string;
  clauseNumber: string;
  excerpt: string;
  officialUrl?: string;
}

export interface Scheme {
  id: string;
  title: string;
  malayalamTitle?: string;
  department: string;
  stateOrCentral: 'Kerala State' | 'Central Scheme' | 'Kerala Joint (50:50)';
  category: SchemeCategory;
  estimatedAnnualValue: number; // in Rupees
  confidenceScore: number; // 0 to 100
  status: ApplicationStatus;
  shortSummary: string;
  whyEligible: string[];
  whyNotOrPending: string[];
  citation: SchemeClauseCitation;
  requiredDocuments: string[];
  howToApply: string;
  officialPortalUrl?: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  malayalamName?: string;
  status: 'ready' | 'missing' | 'easy_to_obtain';
  requiredForSchemes: string[]; // scheme titles or IDs
  howToObtain: string;
  issuingAuthority: string; // e.g., 'Village Office / Akshaya Kendra'
}

export interface RoadmapStep {
  stepNumber: number;
  title: string;
  department: string;
  actionRequired: string;
  estimatedTime: string; // e.g. '3-5 Working Days'
  dependencies: string[]; // e.g. ['Widow Certificate', 'Income Certificate']
  associatedSchemes: string[];
  priority: 'Immediate' | 'High' | 'Medium' | 'Low';
  channel: 'Akshaya Kendra' | 'e-District Portal' | 'Gram Panchayat / Municipality' | 'School / College Office' | 'Bank Branch';
}

export interface UserProfileSummary {
  state: string;
  district?: string;
  gender?: string;
  maritalStatus?: string;
  annualIncomeRupees?: number;
  dependentsCount?: number;
  childrenInSchool?: number;
  rationCardType?: string;
  occupation?: string;
  age?: number;
  rawStory: string;
}

export interface BenefitReport {
  reportId: string;
  createdAt: string;
  userStory: string;
  extractedProfile: UserProfileSummary;
  benefitPotentialScore: number; // 0-100
  scoreLabel: string; // e.g., "High Eligibility Potential"
  estimatedAnnualBenefitsRupees: number;
  applicationsReadyCount: number;
  missingDocsCount: number;
  schemes: Scheme[];
  roadmap: RoadmapStep[];
  documents: DocumentItem[];
  clarifyingQuestionsAsked?: string[];
  aiReasoningSummary: string;
}

export interface ClarifyingQuestionOption {
  label: string;
  value: string;
  impactOnScore: string;
}

export interface ClarifyingQuestion {
  id: string;
  question: string;
  malayalamQuestion?: string;
  options: ClarifyingQuestionOption[];
}
