import { BenefitReport, ClarifyingQuestion } from './types';

export const DEFAULT_KERALA_WIDOW_REPORT: BenefitReport = {
  reportId: 'JM-2026-KL-78291',
  createdAt: new Date().toISOString(),
  userStory: "I'm a widowed woman from Kerala with two school-going children and an annual income of ₹2 lakh.",
  extractedProfile: {
    state: 'Kerala',
    district: 'Thiruvananthapuram',
    gender: 'Female',
    maritalStatus: 'Widowed',
    annualIncomeRupees: 200000,
    dependentsCount: 2,
    childrenInSchool: 2,
    rationCardType: 'Priority Household (PHH / Pink Card)',
    occupation: 'Self-Employed / Home Tailor',
    age: 38,
    rawStory: "I'm a widowed woman from Kerala with two school-going children and an annual income of ₹2 lakh."
  },
  benefitPotentialScore: 91,
  scoreLabel: 'Very High Scheme Eligibility',
  estimatedAnnualBenefitsRupees: 218000,
  applicationsReadyCount: 3,
  missingDocsCount: 2,
  aiReasoningSummary: 'Based on official Govt of Kerala Social Security Guidelines and Union Ministry criteria, your single-mother household qualifies for 5 major social security, health, and education schemes. Income threshold of ₹2,00,000 matches Kerala BPL extended welfare criteria.',
  schemes: [
    {
      id: 'sch-ignwps-kl',
      title: 'Kerala Social Security Widow Pension / IGNWPS',
      malayalamTitle: 'വിധവാ പെൻഷൻ പദ്ധതി (ഇന്ദിരാഗാന്ധി ദേശീയ വിധവാ പെൻഷൻ)',
      department: 'Social Justice Department, Govt of Kerala',
      stateOrCentral: 'Kerala Joint (50:50)',
      category: 'pension',
      estimatedAnnualValue: 19200, // ₹1,600 / month
      confidenceScore: 96,
      status: 'ready_today',
      shortSummary: 'Monthly financial pension of ₹1,600 directly transferred to bank account for widowed women with family income under ₹2 Lakh.',
      whyEligible: [
        'Widowed female head of household residing in Kerala for >3 years.',
        'Annual family income of ₹2,00,000 falls within current Kerala Social Welfare BPL extension ceiling.',
        'Age 38 qualifies (eligible for ages 18 to 65 years).'
      ],
      whyNotOrPending: [
        'Requires submission of e-District Widow Certificate from Village Officer.'
      ],
      citation: {
        docName: 'Kerala Social Security Mission Policy Guidelines 2024-25',
        clauseNumber: 'Section 4.2(b) - Widow Welfare Criteria',
        excerpt: 'Eligible widowed female residents with household income up to ₹2,00,000 shall receive direct monthly disbursement of ₹1,600 via Sevana Pension portal.',
        officialUrl: 'https://socialsecuritymission.kerala.gov.in'
      },
      requiredDocuments: [
        'Aadhaar Card',
        'Spouse Death Certificate / e-District Widow Certificate',
        'Income Certificate (< ₹2 Lakh)',
        'Aadhaar-seeded Bank Passbook'
      ],
      howToApply: 'Apply through Sevana Pension Portal or visit nearest Gram Panchayat / Akshaya Kendra.',
      officialPortalUrl: 'https://welfarepension.lsgkerala.gov.in'
    },
    {
      id: 'sch-vidyadhanam-kl',
      title: 'Vidyadhanam Education Scholarship for Children of Widows',
      malayalamTitle: 'വിധവകളുടെ മക്കൾക്കുള്ള വിദ്യാധനം വിദ്യാഭ്യാസ ധനസഹായം',
      department: 'Directorate of Women & Child Development, Kerala',
      stateOrCentral: 'Kerala State',
      category: 'education',
      estimatedAnnualValue: 24000, // ₹12,000 x 2 children
      confidenceScore: 92,
      status: 'ready_today',
      shortSummary: 'Annual educational assistance of ₹12,000 per school-going child to cover tuition, books, and uniforms for widowed mothers.',
      whyEligible: [
        'Applicant is a widowed mother with 2 school-going children.',
        'Income < ₹2.5 Lakh per annum satisfies eligibility clause.',
        'Children enrolled in recognized government / aided schools in Kerala.'
      ],
      whyNotOrPending: [
        'Must obtain Bonafide Student Certificate signed by School Headmaster for academic year 2025-26.'
      ],
      citation: {
        docName: 'WCD Kerala G.O.(P) No. 18/2023/WCD',
        clauseNumber: 'Clause 3 - Student Educational Financial Support',
        excerpt: 'Financial assistance of ₹12,000/year shall be granted per child for up to 2 children of widowed mothers enrolled in standard 1 to 12 in Kerala state schools.',
        officialUrl: 'https://wcd.kerala.gov.in'
      },
      requiredDocuments: [
        'Widow Certificate',
        'School Bonafide Certificate from Headmaster',
        'Aadhaar Cards of Children',
        'Bank Account Passbook'
      ],
      howToApply: 'Submit application online via SNEHAPOORVAM / WCD portal or through school administration.',
      officialPortalUrl: 'https://schemes.wcd.kerala.gov.in'
    },
    {
      id: 'sch-kasp-karunya',
      title: 'Karunya Arogya Suraksha Padhathi (KASP) / Ayushman Bharat',
      malayalamTitle: 'കാരുണ്യ ആരോഗ്യ സുരക്ഷാ പദ്ധതി (KASP)',
      department: 'State Health Agency (SHA) Kerala & NHA',
      stateOrCentral: 'Kerala Joint (50:50)',
      category: 'health',
      estimatedAnnualValue: 50000, // Est. annual health cover utilization value (up to ₹5,00,000)
      confidenceScore: 95,
      status: 'ready_today',
      shortSummary: 'Free secondary and tertiary cashless hospital treatment up to ₹5,00,000 per year across 500+ empaneled government & private hospitals in Kerala.',
      whyEligible: [
        'Mapped automatically under Priority Ration Card category in Kerala.',
        'Zero co-pay for covered surgeries, medicines, and diagnostic tests.'
      ],
      whyNotOrPending: [
        'E-KYC verification required at nearest Akshaya Center to generate KASP Health Card.'
      ],
      citation: {
        docName: 'Kerala State Health Agency KASP Operational Manual 2024',
        clauseNumber: 'Section 2.1 - Priority Beneficiary Criteria',
        excerpt: 'All PHH cardholder families are entitled to cashless hospitalization benefits up to ₹5 Lakh per annum per family on family floater basis.',
        officialUrl: 'https://sha.kerala.gov.in'
      },
      requiredDocuments: [
        'Ration Card (PHH / Pink or AAY / Yellow)',
        'Aadhaar Card'
      ],
      howToApply: 'Visit nearest Government Hospital KASP kiosk or Akshaya Center for instant e-KYC verification.',
      officialPortalUrl: 'https://sha.kerala.gov.in'
    },
    {
      id: 'sch-pmay-life',
      title: 'LIFE Mission Housing Repair & Strengthening Grant',
      malayalamTitle: 'ലൈഫ് മിഷൻ വീട് പുനരുദ്ധാരണ സഹായം',
      department: 'Local Self Government Dept, Govt of Kerala',
      stateOrCentral: 'Kerala State',
      category: 'housing',
      estimatedAnnualValue: 100000, // One-time financial subsidy value
      confidenceScore: 84,
      status: 'missing_docs',
      shortSummary: 'Financial subsidy grant of up to ₹1,00,000 for roof, kitchen, and bathroom strengthening for female-headed BPL families.',
      whyEligible: [
        'Female-headed single widow household with minor dependents.',
        'Meets LSGD income criteria for rural/urban housing repair grants.'
      ],
      whyNotOrPending: [
        'Requires land title document (Pattayam / Possession Certificate) to confirm residential ownership.'
      ],
      citation: {
        docName: 'LIFE Mission Kerala Beneficiary Guidelines 2023-26',
        clauseNumber: 'Chapter 7 - Priority Category I (Special Focus Groups)',
        excerpt: 'Widowed women heading households without a permanent pucca house shall receive priority allotment and financial renovation assistance of ₹1,00,000.',
        officialUrl: 'https://lifemission.kerala.gov.in'
      },
      requiredDocuments: [
        'Possession Certificate / Land Tax Receipt',
        'Ration Card',
        'Income Certificate',
        'Panchayat Building Condition Report'
      ],
      howToApply: 'Apply at Gram Panchayat / Municipality office during LIFE Mission open application window.',
      officialPortalUrl: 'https://lifemission.kerala.gov.in'
    },
    {
      id: 'sch-kudumbashree-micro',
      title: 'Kudumbashree Self-Employment Micro-Enterprise Loan Subsidy',
      malayalamTitle: 'കുടുംബശ്രീ സ്വയംതൊഴിൽ വായ്പാ സബ്‌സിഡി',
      department: 'Kudumbashree State Poverty Eradication Mission',
      stateOrCentral: 'Kerala State',
      category: 'livelihood',
      estimatedAnnualValue: 24000, // Annual interest subvention + subsidy value
      confidenceScore: 88,
      status: 'missing_docs',
      shortSummary: 'Interest-free revolving seed credit and 35% capital subsidy for female entrepreneurs initiating tailoring, catering, or handicraft units.',
      whyEligible: [
        'Female resident eligible for Kudumbashree Neighbourhood Group (NHG) membership.',
        'Tailoring / home-based work background qualifies for micro-unit seed grant.'
      ],
      whyNotOrPending: [
        'Requires active membership certificate in local Kudumbashree Ayalkootam (NHG).'
      ],
      citation: {
        docName: 'Kudumbashree Micro-Enterprise Bylaw 2024',
        clauseNumber: 'Section 12.3 - Special Grant for Single Mothers',
        excerpt: 'Widowed mothers starting home enterprises are eligible for up to 35% capital subsidy on bank loans up to ₹1,50,000 with 0% effective interest rate.',
        officialUrl: 'https://kudumbashree.org'
      },
      requiredDocuments: [
        'Kudumbashree NHG Membership ID',
        'Project Proposal for Micro-Enterprise',
        'Aadhaar Card'
      ],
      howToApply: 'Contact local Kudumbashree Community Development Society (CDS) Chairperson or Panchayat office.',
      officialPortalUrl: 'https://kudumbashree.org'
    }
  ],
  documents: [
    {
      id: 'doc-aadhaar',
      name: 'Aadhaar Card (Self & Dependent Children)',
      malayalamName: 'ആധാർ കാർഡ്',
      status: 'ready',
      requiredForSchemes: ['Widow Pension', 'Vidyadhanam Scholarship', 'KASP Health Scheme'],
      howToObtain: 'Available with applicant.',
      issuingAuthority: 'UIDAI'
    },
    {
      id: 'doc-ration-card',
      name: 'Priority Ration Card (Pink / PHH Card)',
      malayalamName: 'റേഷൻ കാർഡ് (പിങ്ക് / മുൻഗണനാ കാർഡ്)',
      status: 'ready',
      requiredForSchemes: ['KASP Health Scheme', 'LIFE Mission', 'Widow Pension'],
      howToObtain: 'Available with applicant.',
      issuingAuthority: 'Civil Supplies Dept, Kerala'
    },
    {
      id: 'doc-bank-passbook',
      name: 'Aadhaar-Seeded Bank Passbook (NPCI Mapped)',
      malayalamName: 'ആധാറുമായി ബന്ധിപ്പിച്ച ബാങ്ക് പാസ്സ്ബുക്ക്',
      status: 'ready',
      requiredForSchemes: ['Widow Pension Direct Transfer', 'Vidyadhanam Scholarship'],
      howToObtain: 'Available with applicant. Ensure Aadhaar seed status at bank branch.',
      issuingAuthority: 'Public Sector / Co-operative Bank'
    },
    {
      id: 'doc-widow-cert',
      name: 'e-District Widow Certificate / Spouse Death Certificate',
      malayalamName: 'വിധവാ സർട്ടിഫിക്കറ്റ് / മരണ സർട്ടിഫിക്കറ്റ്',
      status: 'missing',
      requiredForSchemes: ['Kerala Widow Pension', 'Vidyadhanam Scholarship'],
      howToObtain: 'Apply online via edistrict.kerala.gov.in or visit Akshaya Kendra with Spouse Death Certificate and Ration Card.',
      issuingAuthority: 'Village Office / Revenue Dept'
    },
    {
      id: 'doc-school-bonafide',
      name: 'School Bonafide Attendance Certificate (for 2 children)',
      malayalamName: 'സ്‌കൂൾ പഠന സർട്ടിഫിക്കറ്റ്',
      status: 'easy_to_obtain',
      requiredForSchemes: ['Vidyadhanam Education Scholarship'],
      howToObtain: 'Request Headmaster / Principal of school for student bonafide certificate on school letterhead.',
      issuingAuthority: 'School Headmaster / Principal'
    }
  ],
  roadmap: [
    {
      stepNumber: 1,
      title: 'Obtain Official e-District Widow Certificate',
      department: 'Revenue Dept, Govt of Kerala',
      actionRequired: 'Submit Spouse Death Certificate & Ration Card copy at nearest Akshaya Kendra to receive digital Widow Certificate.',
      estimatedTime: '3-5 Working Days',
      dependencies: ['Spouse Death Certificate', 'Ration Card', 'Aadhaar'],
      associatedSchemes: ['Widow Pension', 'Vidyadhanam Scholarship'],
      priority: 'Immediate',
      channel: 'Akshaya Kendra'
    },
    {
      stepNumber: 2,
      title: 'Submit Kerala Social Security Widow Pension Application',
      department: 'Social Justice / Local Self Govt Dept',
      actionRequired: 'Upload Widow Certificate & Bank details on Sevana Pension Portal or submit hard copy to Gram Panchayat Office.',
      estimatedTime: '7-10 Working Days for Sanction',
      dependencies: ['e-District Widow Certificate', 'Bank Passbook'],
      associatedSchemes: ['Kerala Social Security Widow Pension'],
      priority: 'Immediate',
      channel: 'e-District Portal'
    },
    {
      stepNumber: 3,
      title: 'Request School Bonafide Certificates & Apply for Vidyadhanam Scholarship',
      department: 'Women & Child Development Dept',
      actionRequired: 'Collect signed bonafide certificates from school headmaster and file online scholarship claim on Snehapoorvam/WCD portal.',
      estimatedTime: '2 Working Days',
      dependencies: ['School Bonafide Certificate', 'Widow Certificate'],
      associatedSchemes: ['Vidyadhanam Education Scholarship'],
      priority: 'High',
      channel: 'School / College Office'
    },
    {
      stepNumber: 4,
      title: 'Perform e-KYC for KASP Karunya Health Card',
      department: 'State Health Agency Kerala',
      actionRequired: 'Visit nearest Akshaya Center with Pink Ration Card and Aadhaar to generate instant KASP e-card for cashless hospital care.',
      estimatedTime: 'Same Day (Instant)',
      dependencies: ['Pink Ration Card', 'Aadhaar'],
      associatedSchemes: ['Karunya Arogya Suraksha Padhathi (KASP)'],
      priority: 'High',
      channel: 'Akshaya Kendra'
    },
    {
      stepNumber: 5,
      title: 'Join Local Kudumbashree Ayalkootam (NHG) & Enroll for Housing/Livelihood Assistance',
      department: 'Kudumbashree & LSGD',
      actionRequired: 'Register with local Kudumbashree Area Society to unlock interest-subsidized micro-enterprise loan and LIFE Mission priority queue.',
      estimatedTime: '1-2 Weeks',
      dependencies: ['Aadhaar', 'Residence Proof'],
      associatedSchemes: ['LIFE Mission Housing', 'Kudumbashree Micro-Enterprise'],
      priority: 'Medium',
      channel: 'Gram Panchayat / Municipality'
    }
  ]
};

export const DEFAULT_REPORT_DATA = DEFAULT_KERALA_WIDOW_REPORT;

export const SAMPLE_PRESET_STORIES = [
  {
    id: 'story-widow-kerala',
    title: 'Widowed Mother in Kerala',
    label: 'Widowed Mother with 2 Children',
    badge: 'Kerala State Benchmark',
    tag: 'Kerala State Benchmark',
    income: '₹2 Lakh/yr',
    text: "I'm a widowed woman from Kerala with two school-going children and an annual income of ₹2 lakh.",
    prompt: "I'm a widowed woman from Kerala with two school-going children and an annual income of ₹2 lakh."
  },
  {
    id: 'story-graduate-palakkad',
    title: 'Unemployed Graduate Entrepreneur',
    label: 'Unemployed Graduate Entrepreneur',
    badge: 'Skill & Startup Youth',
    tag: 'Skill & Startup Youth',
    income: '₹80,000/yr',
    text: "I am a 23-year-old engineering graduate from Palakkad, Kerala with household income of ₹1.2 lakh. I am looking for youth stipends, competitive exam training support, and startup seed grants.",
    prompt: "I am a 23-year-old engineering graduate from Palakkad, Kerala with household income of ₹1.2 lakh. I am looking for youth stipends, competitive exam training support, and startup seed grants."
  },
  {
    id: 'story-senior-wayanad',
    title: 'Elderly Farmer Couple in Wayanad',
    label: 'Elderly Farmer Couple in Wayanad',
    badge: 'Senior Citizen & Health',
    tag: 'Senior Citizen & Health',
    income: '₹75,000/yr',
    text: "I am a 68-year-old retired agricultural worker living in Wayanad with my wife. Our annual income is around ₹75,000 and we need medical assistance, senior pension, and crop subsidy.",
    prompt: "I am a 68-year-old retired agricultural worker living in Wayanad with my wife. Our annual income is around ₹75,000 and we need medical assistance, senior pension, and crop subsidy."
  },
  {
    id: 'story-artisan-alappuzha',
    title: 'Traditional Artisan / Handloom Worker',
    label: 'Traditional Artisan / Handloom Worker',
    badge: 'Livelihood & Artisan',
    tag: 'Livelihood & Artisan',
    income: '₹1.5 Lakh/yr',
    text: "I am a traditional coir weaver in Alappuzha, Kerala with 3 dependents and ₹1.5 lakh income. Looking for equipment subsidy, artisan welfare pension, and housing repair.",
    prompt: "I am a traditional coir weaver in Alappuzha, Kerala with 3 dependents and ₹1.5 lakh income. Looking for equipment subsidy, artisan welfare pension, and housing repair."
  }
];

export const EXAMPLE_PROMPTS = SAMPLE_PRESET_STORIES;

export const CLARIFYING_QUESTIONS: ClarifyingQuestion[] = [
  {
    id: 'q-ration-card',
    question: 'What category of Ration Card do you currently hold in Kerala?',
    malayalamQuestion: 'താങ്കൾക്ക് ഏത് തരം റേഷൻ കാർഡാണ് ഉള്ളത്?',
    options: [
      { label: 'Pink / PHH (Priority Household)', value: 'PHH', impactOnScore: '+5% Health & Food Security Score' },
      { label: 'Yellow / AAY (Antyodaya Anna Yojana)', value: 'AAY', impactOnScore: '+8% Maximum Welfare Score' },
      { label: 'Blue / Non-Priority Subsidy', value: 'NPS', impactOnScore: 'Standard Eligibility' },
      { label: 'White / Non-Priority Non-Subsidy', value: 'NPNS', impactOnScore: 'Income limits apply' }
    ]
  },
  {
    id: 'q-school-type',
    question: 'Which type of educational institution are your children enrolled in?',
    malayalamQuestion: 'മക്കൾ ഏത് തരം സ്കൂളിലാണ് പഠിക്കുന്നത്?',
    options: [
      { label: 'Kerala Govt or Aided School (Std 1 - 10)', value: 'govt_school', impactOnScore: '+100% Vidyadhanam Scholarship' },
      { label: 'Higher Secondary / Vocational (Std 11 - 12)', value: 'higher_sec', impactOnScore: '+Higher Stipend Band' },
      { label: 'Private Unaided School', value: 'private_school', impactOnScore: 'Special Criteria Applies' }
    ]
  }
];
