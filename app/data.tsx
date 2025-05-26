

export const pendingClaims: Claim[] = [
  {
    id: 1001,
    claimant: "Michael Rodriguez",
    amount: "$8,947.50",
    date: "2024-05-20",
    status: "Generated",
    description: "Complete Cardiac Workup - Chest Pain with Multiple Risk Factors",
    provider: "Metropolitan Cardiac Center",
    providerNPI: "1234567890",
    serviceType: "Comprehensive Cardiac Evaluation",
    serviceDate: "2024-05-18",
    serviceInfo: "Complete cardiac workup from initial presentation through advanced intervention for chest pain patient with diabetes, hypertension, hyperlipidemia, and smoking history",
    diagnosisCode: "R07.9", // Primary: Chest pain, unspecified
    secondaryDiagnosisCode: "I10,E78.5,E11.9,Z87.891", // All secondary diagnoses
    procedureCodes: ["99223", "93000", "84484", "82553", "85025", "80048", "80061", "83036", "71046", "93306", "78452", "75574", "93458", "99214"],
    procedureServiceTypes: [
      "Initial hospital/observation care, high complexity E/M",
      "12-lead ECG with interpretation & report", 
      "Troponin I, quantitative", 
      "Creatine kinase (CK), MB fraction",
      "Complete blood count (CBC), automated with differential",
      "Basic metabolic panel (BMP)",
      "Lipid panel",
      "Hemoglobin A1c",
      "Chest X-ray, 2 views (PA & lateral)",
      "Transthoracic echocardiography, complete w/ Doppler & color flow",
      "Myocardial perfusion imaging, tomographic (SPECT), multiple studies",
      "Coronary CT angiography (CCTA) with contrast, incl. 3-D post-processing",
      "Left-heart catheterization with coronary angiography",
      "Office visit, moderate complexity E/M"
    ],
    procedureAmounts: ["$450.00", "$125.00", "$95.00", "$78.00", "$65.00", "$85.00", "$120.00", "$75.00", "$180.00", "$875.00", "$1,250.00", "$1,800.00", "$3,500.00", "$285.00"],
    documentationList: []
  }
];

export interface Claim {
  id: number;
  claimant: string;
  amount: string;
  date: string;
  status: string;
  description: string;
  provider: string;
  providerNPI: string;
  serviceType: string;
  serviceDate: string;
  serviceInfo: string;
  diagnosisCode: string;
  secondaryDiagnosisCode: string;
  procedureCodes: string[];
  procedureServiceTypes: string[];
  procedureAmounts: string[];
  documentationList: Documentation[];
}

export interface Documentation {
  name: string;
  type: string;
  url: string;
}

export interface ThinkingStep {
  id: number;
  title: string;
  duration: number;
  status: 'pending' | 'processing' | 'completed';
}

export interface ProcessingStep {
  id: number;
  title: string;
  description: string;
  provider: string;
  logoUrl: string;
  duration: number;
  status: 'pending' | 'processing' | 'completed';
  details?: string;
  thinkingSteps: ThinkingStep[];
}


export const processingSteps: ProcessingStep[] = [
  // {
  //   id: 1,
  //   title: "Connecting to Epic MyChart EHR",
  //   description: "Retrieving patient medical history and cardiac records",
  //   provider: "Epic Systems",
  //   logoUrl: "/logo/epic.png",
  //   duration: 2500,
  //   status: 'pending',
  //   details: "Accessing cardiac patient database",
  //   thinkingSteps: [
  //     { id: 1, title: "Establishing secure connection to Epic servers", duration: 500, status: 'pending' },
  //     { id: 2, title: "Authenticating with healthcare credentials", duration: 400, status: 'pending' },
  //     { id: 3, title: "Locating patient cardiac history records", duration: 600, status: 'pending' },
  //     { id: 4, title: "Retrieving ECG and lab results", duration: 700, status: 'pending' },
  //     { id: 5, title: "Downloading recent cardiac assessments", duration: 300, status: 'pending' }
  //   ]
  // },
  {
    id: 2,
    title: "Fetching UnitedHealthcare Coverage",
    description: "Verifying cardiac procedure benefits and authorization",
    provider: "UnitedHealthcare",
    logoUrl: "/logo/united.png",
    duration: 2000,
    status: 'pending',
    details: "Validating cardiology coverage limits",
    thinkingSteps: [
      { id: 1, title: "Connecting to UnitedHealthcare portal", duration: 400, status: 'pending' },
      { id: 2, title: "Verifying cardiac procedure coverage", duration: 500, status: 'pending' },
      { id: 3, title: "Checking imaging study authorizations", duration: 450, status: 'pending' },
      { id: 4, title: "Retrieving specialist referral requirements", duration: 400, status: 'pending' },
      { id: 5, title: "Validating emergency care provisions", duration: 250, status: 'pending' }
    ]
  },
  {
    id: 3,
    title: "Checking Aetna Authorization Requirements",
    description: "Reviewing cardiac imaging pre-authorization policies",
    provider: "Aetna",
    logoUrl: "/logo/aetna.png",
    duration: 2800,
    status: 'pending',
    details: "Validating advanced cardiac procedures",
    thinkingSteps: [
      { id: 1, title: "Accessing Aetna cardiology guidelines", duration: 600, status: 'pending' },
      { id: 2, title: "Cross-referencing imaging requirements", duration: 700, status: 'pending' },
      { id: 3, title: "Checking troponin/cardiac enzyme coverage", duration: 500, status: 'pending' },
      { id: 4, title: "Validating ECG and echo approvals", duration: 600, status: 'pending' },
      { id: 5, title: "Confirming cardiology network status", duration: 400, status: 'pending' }
    ]
  },
  {
    id: 4,
    title: "Assigning CPT/ICD-10 Codes",
    description: "Applying accurate cardiac billing codes from database",
    provider: "Makai",
    logoUrl: "/logo/makailogo.png",
    duration: 7500,
    status: 'pending',
    details: "Cross-referencing cardiac procedure database",
    thinkingSteps: [
      { id: 1, title: "Analyzing cardiac procedures performed", duration: 1500, status: 'pending' },
      { id: 2, title: "Mapping chest pain diagnosis codes", duration: 1500, status: 'pending' },
      { id: 3, title: "Assigning appropriate CPT codes (93000, 84484, etc.)", duration: 1500, status: 'pending' },
      { id: 4, title: "Validating ICD-10 codes (R07.9, I10, E78.5)", duration: 150, status: 'pending' },
      { id: 5, title: "Ensuring cardiac coding compliance", duration: 1500, status: 'pending' }
    ]
  },
  {
    id: 5,
    title: "Finalizing with Waystar Revenue Cycle",
    description: "Completing cardiac claim validation and submission prep",
    provider: "Waystar",
    logoUrl: "/logo/way.png",
    duration: 1500,
    status: 'pending',
    details: "Ready for cardiology claim submission",
    thinkingSteps: [
      { id: 1, title: "Connecting to Waystar cardiac billing", duration: 300, status: 'pending' },
      { id: 2, title: "Validating cardiac claim format", duration: 400, status: 'pending' },
      { id: 3, title: "Checking cardiology submission rules", duration: 350, status: 'pending' },
      { id: 4, title: "Preparing final cardiac claim documents", duration: 300, status: 'pending' },
      { id: 5, title: "Cardiac claim ready for insurance submission", duration: 150, status: 'pending' }
    ]
  }
];

// Medical code reference data
export const cptCodes = {
  "99223": "Initial hospital/observation care, high complexity E/M",
  "93000": "12-lead ECG with interpretation & report",
  "84484": "Troponin I, quantitative",
  "82553": "Creatine kinase (CK), MB fraction",
  "85025": "Complete blood count (CBC), automated with differential",
  "80048": "Basic metabolic panel (BMP)",
  "80061": "Lipid panel",
  "83036": "Hemoglobin A1c",
  "71046": "Chest X-ray, 2 views (PA & lateral)",
  "93306": "Transthoracic echocardiography, complete w/ Doppler & color flow",
  "78452": "Myocardial perfusion imaging, tomographic (SPECT), multiple studies",
  "75574": "Coronary CT angiography (CCTA) with contrast, incl. 3-D post-processing",
  "93458": "Left-heart catheterization with coronary angiography",
  "99214": "Office visit, moderate complexity E/M"
};

export const icd10Codes = {
  "R07.9": "Chest pain, unspecified",
  "I10": "Essential (primary) hypertension",
  "E78.5": "Hyperlipidemia, unspecified",
  "E11.9": "Type 2 diabetes mellitus without complications",
  "Z87.891": "Personal history of nicotine dependence (former smoker)"
};
