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

interface ProcessingStep {
  id: number;
  title: string;
  description: string;
  provider: string;
  logoUrl: string;
  duration: number;
  status: 'pending' | 'processing' | 'completed';
  details?: string;
}

// Example pending claims data
const pendingClaims: Claim[] = [
  {
    id: 1001,
    claimant: "John Smith",
    amount: "$2,450.00",
    date: "2024-05-20",
    status: "Generated",
    description: "Routine Physical Examination with Lab Work",
    provider: "Metro Health Center",
    providerNPI: "1234567890",
    serviceType: "Preventive Care",
    serviceDate: "2024-05-18",
    serviceInfo: "Annual physical with comprehensive metabolic panel",
    diagnosisCode: "Z00.00",
    secondaryDiagnosisCode: "Z01.411",
    procedureCodes: ["99213", "80053", "85025"],
    procedureServiceTypes: ["Office Visit", "Basic Metabolic Panel", "Complete Blood Count"],
    procedureAmounts: ["$150.00", "$45.00", "$25.00"],
    documentationList: []
  }
];

const processingSteps: ProcessingStep[] = [
  {
    id: 1,
    title: "Connecting to Epic MyChart EHR",
    description: "Retrieving patient medical history and records",
    provider: "Epic Systems",
    logoUrl: "/logo/epic.png",
    duration: 2500,
    status: 'pending',
    details: "Accessing patient ID: JS-001247"
  },
  {
    id: 2,
    title: "Fetching UnitedHealthcare Coverage",
    description: "Verifying active insurance policy and benefits",
    provider: "UnitedHealthcare",
    logoUrl: "/logo/united.png",
    duration: 2000,
    status: 'pending',
    details: "Policy: UHC-789456123"
  },
  {
    id: 3,
    title: "Checking Aetna Authorization Requirements",
    description: "Reviewing pre-authorization and coverage policies",
    provider: "Aetna",
    logoUrl: "/logo/aetna.png",
    duration: 2800,
    status: 'pending',
    details: "Validating procedure coverage"
  },
  {
    id: 4,
    title: "Assigning CPT/ICD-10 Codes",
    description: "Generating appropriate medical billing codes",
    provider: "Makai",
    logoUrl: "/logo/makailogo.png",
    duration: 3200,
    status: 'pending',
    details: "Cross-referencing procedure database"
  },
  {
    id: 5,
    title: "Finalizing with Waystar Revenue Cycle",
    description: "Completing claim validation and submission prep",
    provider: "Waystar",
    logoUrl: "/logo/way.png",
    duration: 1500,
    status: 'pending',
    details: "Ready for submission"
  }
];

export default function Home() {
  const analytics = {
    pending: 12,
    denied: 5,
    approvedAmount: 24500,
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [historyFiles, setHistoryFiles] = useState<FileList | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedClaim, setGeneratedClaim] = useState<Claim | null>(null);
  const [currentProcessingSteps, setCurrentProcessingSteps] = useState<ProcessingStep[]>(processingSteps);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHistoryFiles(e.target.files);
  };

  const handleStep1Submit = () => {
    if (!historyFiles || historyFiles.length === 0) return;
    setIsProcessing(true);
    setCurrentStepIndex(0);
    
    // Reset all steps to pending
    setCurrentProcessingSteps(processingSteps.map(step => ({ ...step, status: 'pending' })));
    
    // Start processing steps sequentially
    processNextStep(0);
  };

  const processNextStep = (stepIndex: number) => {
    if (stepIndex >= processingSteps.length) {
      // All steps completed
      setGeneratedClaim(pendingClaims[0]);
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

    // Simulate processing time for current step
    setTimeout(() => {
      // Mark current step as completed and move to next
      setCurrentProcessingSteps(prev => 
        prev.map((step, index) => ({
          ...step,
          status: index <= stepIndex ? 'completed' : 'pending'
        }))
      );
      
      processNextStep(stepIndex + 1);
    }, processingSteps[stepIndex].duration);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setStep(1);
    setHistoryFiles(null);
    setIsProcessing(false);
    setGeneratedClaim(null);
    setCurrentProcessingSteps(processingSteps.map(step => ({ ...step, status: 'pending' })));
    setCurrentStepIndex(0);
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

  return (
    <main className="flex flex-1 w-full bg-muted items-center justify-center">
      <div className="w-full max-w-6xl flex flex-col gap-8 p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Claims Analytics</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="default" className="flex items-center gap-2">
                <Plus className="h-5 w-5" /> Create New Claim
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh]">
              <DialogHeader>
                <DialogTitle>
                  {step === 1
                    ? "Upload Patient History"
                    : step === 2
                    ? "✅ Claim Successfully Generated"
                    : ""}
                </DialogTitle>
                {step === 1 && !isProcessing && (
                  <DialogDescription>
                    Please upload the patient history PDF files to begin automated claim creation.
                  </DialogDescription>
                )}
                {step === 1 && isProcessing && (
                  <DialogDescription>
                    Connecting to healthcare systems and processing your files...
                  </DialogDescription>
                )}
                {step === 2 && (
                  <DialogDescription>
                    Your claim has been generated and validated across multiple healthcare systems.
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
                    <p className="text-sm text-gray-500 mt-2">Upload patient medical records (PDF only)</p>
                  </div>
                  {historyFiles && historyFiles.length > 0 && (
                    <div className="bg-blue-50 p-3 rounded-md">
                      <p className="text-sm text-blue-700 font-medium">
                        📁 {historyFiles.length} file(s) selected and ready for processing
                      </p>
                    </div>
                  )}
                </div>
              )}

              {step === 1 && isProcessing && (
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {currentProcessingSteps.map((processStep, index) => (
                    <div
                      key={processStep.id}
                      className={`p-4 rounded-xl border-2 ${getStepStyles(processStep.status)}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 flex flex-col items-center gap-2">
                          <img 
                            src={processStep.logoUrl} 
                            alt={`${processStep.provider} logo`}
                            className="w-10 h-10 rounded-lg shadow-sm"
                          />
                          {getStepIcon(processStep.status)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-800 truncate">
                              {processStep.title}
                            </h4>
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full whitespace-nowrap">
                              {processStep.provider}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            {processStep.description}
                          </p>
                          {processStep.details && (
                            <p className="text-xs text-gray-500 italic">
                              {processStep.details}
                            </p>
                          )}
                        </div>
                      </div>
                      {processStep.status === 'processing' && (
                        <div className="mt-3">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-1000 animate-pulse"
                              style={{ width: '100%' }}
                            />
                          </div>
                          <p className="text-xs text-blue-600 mt-1 font-medium">
                            Processing... ({Math.ceil(processStep.duration / 1000)}s)
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
                      <span className="font-semibold text-green-800">Claim Successfully Generated</span>
                    </div>
                    <p className="text-sm text-green-700">
                      All systems validated and medical codes assigned automatically
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 max-h-64 overflow-y-auto">
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
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">CPT Codes</p>
                      <p className="font-mono font-semibold text-blue-600">{generatedClaim.procedureCodes.join(", ")}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">ICD-10 Code</p>
                      <p className="font-mono font-semibold text-purple-600">{generatedClaim.diagnosisCode}</p>
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
                    🚀 Start Processing
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