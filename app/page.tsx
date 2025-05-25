'use client'
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart2, FileX2, CheckCircle2, Plus, Loader2, Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

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

interface Documentation {
  name: string;
  type: string;
  url: string;
}

interface ThinkingStep {
  id: number;
  title: string;
  duration: number;
  status: 'pending' | 'processing' | 'completed';
}

interface ProcessingStep {
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

// Updated claims data using the provided medical codes
const pendingClaims: Claim[] = [
  {
    id: 1001,
    claimant: "Michael Rodriguez",
    amount: "$3,847.50",
    date: "2024-05-20",
    status: "Generated",
    description: "Chest Pain Evaluation with Cardiac Workup",
    provider: "Cardiology Associates of Metro Health",
    providerNPI: "1234567890",
    serviceType: "Emergency/Urgent Care",
    serviceDate: "2024-05-18",
    serviceInfo: "Comprehensive cardiac evaluation for acute chest pain with risk factors",
    diagnosisCode: "R07.9", // Chest pain, unspecified
    secondaryDiagnosisCode: "I10", // Essential hypertension
    procedureCodes: ["99223", "93000", "84484", "82553", "85025", "80048", "71046"],
    procedureServiceTypes: [
      "Initial hospital care, high complexity E/M", 
      "12-lead ECG with interpretation", 
      "Troponin I, quantitative", 
      "Creatine kinase MB fraction",
      "Complete blood count with differential",
      "Basic metabolic panel",
      "Chest X-ray, 2 views"
    ],
    procedureAmounts: ["$450.00", "$125.00", "$95.00", "$78.00", "$65.00", "$85.00", "$180.00"],
    documentationList: []
  },
  {
    id: 1002,
    claimant: "Sarah Johnson",
    amount: "$2,240.75",
    date: "2024-05-19",
    status: "Generated",
    description: "Diabetes Management with Cardiac Risk Assessment",
    provider: "Metro Internal Medicine Group",
    providerNPI: "9876543210",
    serviceType: "Preventive Care",
    serviceDate: "2024-05-17",
    serviceInfo: "Comprehensive diabetes follow-up with cardiovascular screening",
    diagnosisCode: "E11.9", // Type 2 diabetes mellitus without complications
    secondaryDiagnosisCode: "E78.5", // Hyperlipidemia, unspecified
    procedureCodes: ["99214", "83036", "80061", "93000", "85025"],
    procedureServiceTypes: [
      "Office visit, moderate complexity E/M",
      "Hemoglobin A1c",
      "Lipid panel", 
      "12-lead ECG with interpretation",
      "Complete blood count with differential"
    ],
    procedureAmounts: ["$285.00", "$75.00", "$120.00", "$125.00", "$65.00"],
    documentationList: []
  },
  {
    id: 1003,
    claimant: "Robert Chen",
    amount: "$4,950.25",
    date: "2024-05-21",
    status: "Generated", 
    description: "Advanced Cardiac Imaging and Assessment",
    provider: "Metropolitan Cardiology Center",
    providerNPI: "5555666677",
    serviceType: "Diagnostic Imaging",
    serviceDate: "2024-05-20",
    serviceInfo: "Comprehensive cardiac evaluation with advanced imaging for former smoker",
    diagnosisCode: "Z87.891", // Personal history of nicotine dependence (former smoker)
    secondaryDiagnosisCode: "R07.9", // Chest pain, unspecified
    procedureCodes: ["99223", "93306", "78452", "75574", "80048", "84484"],
    procedureServiceTypes: [
      "Initial hospital care, high complexity E/M",
      "Transthoracic echocardiography complete",
      "Myocardial perfusion imaging (SPECT)",
      "Coronary CT angiography with contrast",
      "Basic metabolic panel",
      "Troponin I, quantitative"
    ],
    procedureAmounts: ["$450.00", "$875.00", "$1,250.00", "$1,800.00", "$85.00", "$95.00"],
    documentationList: []
  }
];

const processingSteps: ProcessingStep[] = [
  {
    id: 1,
    title: "Connecting to Epic MyChart EHR",
    description: "Retrieving patient medical history and cardiac records",
    provider: "Epic Systems",
    logoUrl: "/logo/epic.png",
    duration: 2500,
    status: 'pending',
    details: "Accessing cardiac patient database",
    thinkingSteps: [
      { id: 1, title: "Establishing secure connection to Epic servers", duration: 500, status: 'pending' },
      { id: 2, title: "Authenticating with healthcare credentials", duration: 400, status: 'pending' },
      { id: 3, title: "Locating patient cardiac history records", duration: 600, status: 'pending' },
      { id: 4, title: "Retrieving ECG and lab results", duration: 700, status: 'pending' },
      { id: 5, title: "Downloading recent cardiac assessments", duration: 300, status: 'pending' }
    ]
  },
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
    duration: 3200,
    status: 'pending',
    details: "Cross-referencing cardiac procedure database",
    thinkingSteps: [
      { id: 1, title: "Analyzing cardiac procedures performed", duration: 800, status: 'pending' },
      { id: 2, title: "Mapping chest pain diagnosis codes", duration: 600, status: 'pending' },
      { id: 3, title: "Assigning appropriate CPT codes (93000, 84484, etc.)", duration: 700, status: 'pending' },
      { id: 4, title: "Validating ICD-10 codes (R07.9, I10, E78.5)", duration: 650, status: 'pending' },
      { id: 5, title: "Ensuring cardiac coding compliance", duration: 450, status: 'pending' }
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
const cptCodes = {
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

const icd10Codes = {
  "R07.9": "Chest pain, unspecified",
  "I10": "Essential (primary) hypertension",
  "E78.5": "Hyperlipidemia, unspecified",
  "E11.9": "Type 2 diabetes mellitus without complications",
  "Z87.891": "Personal history of nicotine dependence (former smoker)"
};

export default function Home() {
  const analytics = {
    pending: 15,
    denied: 3,
    approvedAmount: 87650,
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [historyFiles, setHistoryFiles] = useState<FileList | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedClaim, setGeneratedClaim] = useState<Claim | null>(null);
  const [currentProcessingSteps, setCurrentProcessingSteps] = useState<ProcessingStep[]>(processingSteps);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentThinkingStepIndex, setCurrentThinkingStepIndex] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHistoryFiles(e.target.files);
  };

  const handleStep1Submit = () => {
    if (!historyFiles || historyFiles.length === 0) return;
    setIsProcessing(true);
    setCurrentStepIndex(0);
    setCurrentThinkingStepIndex(0);
    
    // Reset all steps to pending
    setCurrentProcessingSteps(processingSteps.map(step => ({ 
      ...step, 
      status: 'pending',
      thinkingSteps: step.thinkingSteps.map(ts => ({ ...ts, status: 'pending' }))
    })));
    
    // Start processing steps sequentially
    processNextStep(0);
  };

  const processNextStep = (stepIndex: number) => {
    if (stepIndex >= processingSteps.length) {
      // Randomly select one of the cardiac claims
      const randomClaim = pendingClaims[Math.floor(Math.random() * pendingClaims.length)];
      setGeneratedClaim(randomClaim);
      setIsProcessing(false);
      setStep(2);
      return;
    }

    // Mark current step as processing
    setCurrentProcessingSteps(prev => 
      prev.map((step, index) => ({
        ...step,
        status: index === stepIndex ? 'processing' : (index < stepIndex ? 'completed' : 'pending')
      }))
    );
    
    setCurrentStepIndex(stepIndex);
    setCurrentThinkingStepIndex(0);

    // Process thinking steps for current main step
    processThinkingSteps(stepIndex, 0);
  };

  const processThinkingSteps = (stepIndex: number, thinkingStepIndex: number) => {
    const currentStep = processingSteps[stepIndex];
    
    if (thinkingStepIndex >= currentStep.thinkingSteps.length) {
      // All thinking steps completed for this main step
      setCurrentProcessingSteps(prev => 
        prev.map((step, index) => ({
          ...step,
          status: index <= stepIndex ? 'completed' : 'pending',
          thinkingSteps: index === stepIndex 
            ? step.thinkingSteps.map(ts => ({ ...ts, status: 'completed' }))
            : step.thinkingSteps
        }))
      );
      
      // Move to next main step
      setTimeout(() => {
        processNextStep(stepIndex + 1);
      }, 200);
      return;
    }

    // Mark current thinking step as processing
    setCurrentProcessingSteps(prev => 
      prev.map((step, index) => ({
        ...step,
        thinkingSteps: index === stepIndex 
          ? step.thinkingSteps.map((ts, tsIndex) => ({
              ...ts,
              status: tsIndex === thinkingStepIndex ? 'processing' : (tsIndex < thinkingStepIndex ? 'completed' : 'pending')
            }))
          : step.thinkingSteps
      }))
    );
    
    setCurrentThinkingStepIndex(thinkingStepIndex);

    // Simulate processing time for current thinking step
    setTimeout(() => {
      // Mark current thinking step as completed and move to next
      setCurrentProcessingSteps(prev => 
        prev.map((step, index) => ({
          ...step,
          thinkingSteps: index === stepIndex 
            ? step.thinkingSteps.map((ts, tsIndex) => ({
                ...ts,
                status: tsIndex <= thinkingStepIndex ? 'completed' : 'pending'
              }))
            : step.thinkingSteps
        }))
      );
      
      processThinkingSteps(stepIndex, thinkingStepIndex + 1);
    }, currentStep.thinkingSteps[thinkingStepIndex].duration);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setStep(1);
    setHistoryFiles(null);
    setIsProcessing(false);
    setGeneratedClaim(null);
    setCurrentProcessingSteps(processingSteps.map(step => ({ 
      ...step, 
      status: 'pending',
      thinkingSteps: step.thinkingSteps.map(ts => ({ ...ts, status: 'pending' }))
    })));
    setCurrentStepIndex(0);
    setCurrentThinkingStepIndex(0);
  };

  const getStepIcon = (status: ProcessingStep['status']) => {
    switch (status) {
      case 'completed':
        return <Check className="h-5 w-5 text-green-600" />;
      case 'processing':
        return <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getThinkingStepIcon = (status: ThinkingStep['status']) => {
    switch (status) {
      case 'completed':
        return <Check className="h-3 w-3 text-green-600" />;
      case 'processing':
        return <Loader2 className="h-3 w-3 text-blue-600 animate-spin" />;
      default:
        return <Clock className="h-3 w-3 text-gray-400" />;
    }
  };

  const getStepStyles = (status: ProcessingStep['status']) => {
    switch (status) {
      case 'completed':
        return "border-green-200 bg-green-50 transform transition-all duration-500";
      case 'processing':
        return "border-blue-200 bg-blue-50 shadow-lg scale-102 transform transition-all duration-500 ring-2 ring-blue-100";
      default:
        return "border-gray-200 bg-gray-50 transform transition-all duration-300";
    }
  };

  const getThinkingStepStyles = (status: ThinkingStep['status']) => {
    switch (status) {
      case 'completed':
        return "text-green-700 bg-green-50 border-green-200";
      case 'processing':
        return "text-blue-700 bg-blue-50 border-blue-200 font-medium";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <main className="flex flex-1 w-full bg-muted items-center justify-center">
      <div className="w-full max-w-6xl flex flex-col gap-8 p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Cardiac Claims Analytics</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="default" className="flex items-center gap-2">
                <Plus className="h-5 w-5" /> Create New Claim
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-4xl max-h-[95vh]">
              <DialogHeader>
                <DialogTitle>
                  {step === 1
                    ? "Upload Patient History"
                    : step === 2
                    ? "✅ Cardiac Claim Successfully Generated"
                    : ""}
                </DialogTitle>
                {step === 1 && !isProcessing && (
                  <DialogDescription>
                    Please upload the patient cardiac history and medical records (PDF files) to begin automated claim creation.
                  </DialogDescription>
                )}
                {step === 1 && isProcessing && (
                  <DialogDescription>
                    Connecting to cardiac healthcare systems and processing your files with medical coding validation...
                  </DialogDescription>
                )}
                {step === 2 && (
                  <DialogDescription>
                    Your cardiac claim has been generated with appropriate CPT and ICD-10 codes validated across multiple healthcare systems.
                  </DialogDescription>
                )}
              </DialogHeader>

              {step === 1 && !isProcessing && (
                <div className="flex flex-col gap-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                    />
                    <p className="text-sm text-gray-500 mt-2">Upload patient cardiac records and diagnostic reports (PDF only)</p>
                  </div>
                  {historyFiles && historyFiles.length > 0 && (
                    <div className="bg-blue-50 p-3 rounded-md">
                      <p className="text-sm text-blue-700 font-medium">
                        🏥 {historyFiles.length} cardiac file(s) selected and ready for processing
                      </p>
                    </div>
                  )}
                </div>
              )}

              {step === 1 && isProcessing && (
                <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-4">
                  {currentProcessingSteps.map((processStep, index) => (
                    <div
                      key={processStep.id}
                      className={`p-6 rounded-xl border-2 ${getStepStyles(processStep.status)}`}
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex-shrink-0 flex flex-col items-center gap-2">
                          <img 
                            src={processStep.logoUrl} 
                            alt={`${processStep.provider} logo`}
                            className="w-12 h-12 rounded-lg shadow-sm"
                          />
                          {getStepIcon(processStep.status)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-gray-800 text-lg">
                              {processStep.title}
                            </h4>
                            <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full whitespace-nowrap font-medium">
                              {processStep.provider}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {processStep.description}
                          </p>
                          {processStep.details && (
                            <p className="text-xs text-gray-500 italic">
                              {processStep.details}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Thinking Steps */}
                      {processStep.status === 'processing' && (
                        <div className="space-y-2 ml-16">
                          <p className="text-sm font-medium text-gray-700 mb-3">Processing Steps:</p>
                          {processStep.thinkingSteps.map((thinkingStep, tsIndex) => (
                            <div
                              key={thinkingStep.id}
                              className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 ${getThinkingStepStyles(thinkingStep.status)}`}
                            >
                              {getThinkingStepIcon(thinkingStep.status)}
                              <span className="text-sm flex-1">{thinkingStep.title}</span>
                              {thinkingStep.status === 'processing' && (
                                <span className="text-xs text-blue-600 font-medium">
                                  {Math.ceil(thinkingStep.duration / 100) / 10}s
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {processStep.status === 'completed' && (
                        <div className="ml-16">
                          <div className="flex items-center gap-2 text-green-700">
                            <Check className="h-4 w-4" />
                            <span className="text-sm font-medium">All sub-processes completed successfully</span>
                          </div>
                        </div>
                      )}

                      {processStep.status === 'processing' && (
                        <div className="mt-4">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-1000 animate-pulse"
                              style={{ width: '100%' }}
                            />
                          </div>
                          <p className="text-xs text-blue-600 mt-2 font-medium">
                            Step {index + 1} of {currentProcessingSteps.length} - Processing...
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {step === 2 && generatedClaim && (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span className="font-semibold text-green-800">Cardiac Claim Successfully Generated</span>
                    </div>
                    <p className="text-sm text-green-700">
                      All cardiac systems validated and medical codes assigned automatically
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Claim ID</p>
                      <p className="font-bold text-lg">{generatedClaim.id}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Amount</p>
                      <p className="font-bold text-lg text-green-600">{generatedClaim.amount}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Patient</p>
                      <p className="font-semibold">{generatedClaim.claimant}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Service Date</p>
                      <p className="font-semibold">{generatedClaim.date}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg col-span-2">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Description</p>
                      <p className="font-semibold">{generatedClaim.description}</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Primary Diagnosis</p>
                      <p className="font-mono font-semibold text-blue-600">{generatedClaim.diagnosisCode}</p>
                      <p className="text-xs text-gray-600 mt-1">{icd10Codes[generatedClaim.diagnosisCode as keyof typeof icd10Codes]}</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Secondary Diagnosis</p>
                      <p className="font-mono font-semibold text-purple-600">{generatedClaim.secondaryDiagnosisCode}</p>
                      <p className="text-xs text-gray-600 mt-1">{icd10Codes[generatedClaim.secondaryDiagnosisCode as keyof typeof icd10Codes]}</p>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-lg col-span-2">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">CPT Procedure Codes</p>
                      <div className="space-y-1 mt-2">
                        {generatedClaim.procedureCodes.map((code, index) => (
                          <div key={code} className="flex justify-between items-center">
                            <span className="font-mono font-semibold text-orange-600">{code}</span>
                            <span className="text-xs text-gray-600">{cptCodes[code as keyof typeof cptCodes]}</span>
                            <span className="text-sm font-semibold text-green-600">{generatedClaim.procedureAmounts[index]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg col-span-2">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Healthcare Provider</p>
                      <p className="font-semibold">{generatedClaim.provider}</p>
                      <p className="text-sm text-gray-600">NPI: {generatedClaim.providerNPI}</p>
                    </div>
                  </div>
                </div>
              )}

              <DialogFooter className="gap-2">
                {step === 1 && !isProcessing && (
                  <Button
                    onClick={handleStep1Submit}
                    disabled={!historyFiles || historyFiles.length === 0}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    🚀 Start Cardiac Processing
                  </Button>
                )}
                {step === 2 && (
                  <>
                    <Button variant="outline" onClick={handleDialogClose}>
                      Create Another Claim
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700">
                      Submit to Insurance
                    </Button>
                  </>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border rounded-xl bg-white/80 backdrop-blur-md shadow-lg transition-transform hover:scale-105 hover:shadow-2xl ring-1 ring-blue-100 focus-visible:ring-2 focus-visible:ring-blue-400">
            <CardHeader>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-blue-100 p-3">
                  <BarChart2 className="h-7 w-7 text-blue-600" />
                </span>
                <div>
                  <CardTitle className="text-lg font-semibold">Pending Reviews</CardTitle>
                  <div className="text-xs text-muted-foreground">Awaiting approval</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <span className="text-5xl font-extrabold text-blue-700 font-mono">
                {analytics.pending}
              </span>
            </CardContent>
          </Card>

          <Card className="border rounded-xl bg-white/80 backdrop-blur-md shadow-lg transition-transform hover:scale-105 hover:shadow-2xl ring-1 ring-red-100 focus-visible:ring-2 focus-visible:ring-red-400">
            <CardHeader>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-red-100 p-3">
                  <FileX2 className="h-7 w-7 text-red-600" />
                </span>
                <div>
                  <CardTitle className="text-lg font-semibold">Denied Claims</CardTitle>
                  <div className="text-xs text-muted-foreground">Rejected this month</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <span className="text-5xl font-extrabold text-red-700 font-mono">
                {analytics.denied}
              </span>
            </CardContent>
          </Card>

          <Card className="border rounded-xl bg-white/80 backdrop-blur-md shadow-lg transition-transform hover:scale-105 hover:shadow-2xl ring-1 ring-green-100 focus-visible:ring-2 focus-visible:ring-green-400">
            <CardHeader>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-green-100 p-3">
                  <CheckCircle2 className="h-7 w-7 text-green-600" />
                </span>
                <div>
                  <CardTitle className="text-lg font-semibold">Amount Approved</CardTitle>
                  <div className="text-xs text-muted-foreground">Total payout</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <span className="text-4xl md:text-5xl font-extrabold text-green-700 font-mono">
                ${analytics.approvedAmount.toLocaleString()}
              </span>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}