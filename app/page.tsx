"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  BarChart2,
  FileX2,
  CheckCircle2,
  Plus,
  Loader2,
  Check,
  Clock,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  type Claim,
  cptCodes,
  icd10Codes,
  pendingClaims,
  type ProcessingStep,
  processingSteps,
  type ThinkingStep,
} from "./data";

// Comprehensive single patient claim using ALL provided medical codes

export default function Home() {
  const analytics = {
    pending: 18,
    denied: 12,
    approvedAmount: 127450,
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [historyFiles, setHistoryFiles] = useState<FileList | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedClaim, setGeneratedClaim] = useState<Claim | null>(null);
  const [currentProcessingSteps, setCurrentProcessingSteps] =
    useState<ProcessingStep[]>(processingSteps);
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
    setCurrentProcessingSteps(
      processingSteps.map((step) => ({
        ...step,
        status: "pending",
        thinkingSteps: step.thinkingSteps.map((ts) => ({
          ...ts,
          status: "pending",
        })),
      }))
    );

    // Start processing steps sequentially
    processNextStep(0);
  };

  const processNextStep = (stepIndex: number) => {
    if (stepIndex >= processingSteps.length) {
      // Use the comprehensive single patient claim
      setGeneratedClaim(pendingClaims[0]);
      setIsProcessing(false);
      setStep(2);
      return;
    }

    // Mark current step as processing
    setCurrentProcessingSteps((prev) =>
      prev.map((step, index) => ({
        ...step,
        status:
          index === stepIndex
            ? "processing"
            : index < stepIndex
            ? "completed"
            : "pending",
      }))
    );

    setCurrentStepIndex(stepIndex);
    setCurrentThinkingStepIndex(0);

    // Process thinking steps for current main step
    processThinkingSteps(stepIndex, 0);
  };

  const processThinkingSteps = (
    stepIndex: number,
    thinkingStepIndex: number
  ) => {
    const currentStep = processingSteps[stepIndex];

    if (thinkingStepIndex >= currentStep.thinkingSteps.length) {
      // All thinking steps completed for this main step
      setCurrentProcessingSteps((prev) =>
        prev.map((step, index) => ({
          ...step,
          status: index <= stepIndex ? "completed" : "pending",
          thinkingSteps:
            index === stepIndex
              ? step.thinkingSteps.map((ts) => ({ ...ts, status: "completed" }))
              : step.thinkingSteps,
        }))
      );

      // Move to next main step
      setTimeout(() => {
        processNextStep(stepIndex + 1);
      }, 200);
      return;
    }

    // Mark current thinking step as processing
    setCurrentProcessingSteps((prev) =>
      prev.map((step, index) => ({
        ...step,
        thinkingSteps:
          index === stepIndex
            ? step.thinkingSteps.map((ts, tsIndex) => ({
                ...ts,
                status:
                  tsIndex === thinkingStepIndex
                    ? "processing"
                    : tsIndex < thinkingStepIndex
                    ? "completed"
                    : "pending",
              }))
            : step.thinkingSteps,
      }))
    );

    setCurrentThinkingStepIndex(thinkingStepIndex);

    // Simulate processing time for current thinking step
    setTimeout(() => {
      // Mark current thinking step as completed and move to next
      setCurrentProcessingSteps((prev) =>
        prev.map((step, index) => ({
          ...step,
          thinkingSteps:
            index === stepIndex
              ? step.thinkingSteps.map((ts, tsIndex) => ({
                  ...ts,
                  status:
                    tsIndex <= thinkingStepIndex ? "completed" : "pending",
                }))
              : step.thinkingSteps,
        }))
      );

      processThinkingSteps(stepIndex, thinkingStepIndex + 1);
    }, currentStep.thinkingSteps[thinkingStepIndex].duration);
  };

  const handleShowRecommendations = () => {
  // Option 1: Direct URL to PDF file
  const pdfUrl = '/recommendation.png'; // Update with your actual PDF path
  window.open(pdfUrl, '_blank');
};

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setStep(1);
    setHistoryFiles(null);
    setIsProcessing(false);
    setGeneratedClaim(null);
    setCurrentProcessingSteps(
      processingSteps.map((step) => ({
        ...step,
        status: "pending",
        thinkingSteps: step.thinkingSteps.map((ts) => ({
          ...ts,
          status: "pending",
        })),
      }))
    );
    setCurrentStepIndex(0);
    setCurrentThinkingStepIndex(0);
  };

  const handleCreateNewClaim = () => {
    setIsDialogOpen(true);
  };

  const handleCreateNewPriorAuth = () => {
    // Do nothing for now - placeholder for future functionality
    console.log(
      "Create New Prior Auth clicked - functionality to be implemented"
    );
  };

  const getStepIcon = (status: ProcessingStep["status"]) => {
    switch (status) {
      case "completed":
        return <Check className="h-5 w-5 text-green-600" />;
      case "processing":
        return <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getThinkingStepIcon = (status: ThinkingStep["status"]) => {
    switch (status) {
      case "completed":
        return <Check className="h-3 w-3 text-green-600" />;
      case "processing":
        return <Loader2 className="h-3 w-3 text-blue-600 animate-spin" />;
      default:
        return <Clock className="h-3 w-3 text-gray-400" />;
    }
  };

  const getStepStyles = (status: ProcessingStep["status"]) => {
    switch (status) {
      case "completed":
        return "border-green-200 bg-green-50 transform transition-all duration-500";
      case "processing":
        return "border-blue-200 bg-blue-50 shadow-lg scale-102 transform transition-all duration-500 ring-2 ring-blue-100";
      default:
        return "border-gray-200 bg-gray-50 transform transition-all duration-300";
    }
  };

  const getThinkingStepStyles = (status: ThinkingStep["status"]) => {
    switch (status) {
      case "completed":
        return "text-green-700 bg-green-50 border-green-200";
      case "processing":
        return "text-blue-700 bg-blue-50 border-blue-200 font-medium";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <main className="flex flex-1 w-full bg-muted items-center justify-center">
      <div className="w-full max-w-6xl flex flex-col gap-8 p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">
            Comprehensive Claims System
          </h1>

          {/* Dropdown Menu for Create New Request */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default" className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Create New Request
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem
                onClick={handleCreateNewClaim}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                Create New Claim
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleCreateNewPriorAuth}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                Create New Prior Auth
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Dialog for Create New Claim */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-5xl h-[95vh]">
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
                    Please upload the patient history and medical records (PDF
                    files) to begin automated claim creation.
                  </DialogDescription>
                )}
                {step === 1 && isProcessing && (
                  <DialogDescription>
                    Connecting to healthcare systems and processing your files
                    with medical coding validation...
                  </DialogDescription>
                )}
                {step === 2 && (
                  <DialogDescription>
                    Comprehensive claim generated using ALL provided CPT and
                    ICD-10 codes for complete patient workup - from initial
                    presentation through advanced intervention.
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
                    <p className="text-sm text-gray-500 mt-2">
                      Upload patient records and diagnostic reports (PDF only)
                    </p>
                  </div>
                  {historyFiles && historyFiles.length > 0 && (
                    <div className="bg-blue-50 p-3 rounded-md">
                      <p className="text-sm text-blue-700 font-medium">
                        🏥 {historyFiles.length} file(s) selected and ready for
                        processing
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
                      className={`p-6 rounded-xl border-2 ${getStepStyles(
                        processStep.status
                      )}`}
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
                      {processStep.status === "processing" && (
                        <div className="space-y-2 ml-16">
                          <p className="text-sm font-medium text-gray-700 mb-3">
                            Processing Steps:
                          </p>
                          {processStep.thinkingSteps.map(
                            (thinkingStep, tsIndex) => (
                              <div
                                key={thinkingStep.id}
                                className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 ${getThinkingStepStyles(
                                  thinkingStep.status
                                )}`}
                              >
                                {getThinkingStepIcon(thinkingStep.status)}
                                <span className="text-sm flex-1">
                                  {thinkingStep.title}
                                </span>
                                {thinkingStep.status === "processing" && (
                                  <span className="text-xs text-blue-600 font-medium">
                                    {Math.ceil(thinkingStep.duration / 100) /
                                      10}
                                    s
                                  </span>
                                )}
                              </div>
                            )
                          )}
                        </div>
                      )}

                      {processStep.status === "completed" && (
                        <div className="ml-16">
                          <div className="flex items-center gap-2 text-green-700">
                            <Check className="h-4 w-4" />
                            <span className="text-sm font-medium">
                              All sub-processes completed successfully
                            </span>
                          </div>
                        </div>
                      )}

                      {processStep.status === "processing" && (
                        <div className="mt-4">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-1000 animate-pulse"
                              style={{ width: "100%" }}
                            />
                          </div>
                          <p className="text-xs text-blue-600 mt-2 font-medium">
                            Step {index + 1} of {currentProcessingSteps.length}{" "}
                            - Processing...
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
                      <span className="font-semibold text-green-800">
                        Comprehensive Claim Successfully Generated
                      </span>
                    </div>
                    <p className="text-sm text-green-700">
                      Complete patient workup using ALL provided CPT and ICD-10
                      codes - from initial evaluation through advanced
                      procedures
                    </p>
                  </div>

                  {/* Quick Summary */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-800 mb-2">
                      📋 Complete Workup Summary
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-blue-700">
                          Total CPT Codes:{" "}
                          {generatedClaim.procedureCodes.length}
                        </p>
                        <p className="text-blue-600">
                          From basic labs to cardiac catheterization
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-blue-700">
                          Total ICD-10 Codes:{" "}
                          {1 +
                            generatedClaim.secondaryDiagnosisCode.split(",")
                              .length}
                        </p>
                        <p className="text-blue-600">
                          Primary complaint + risk factors
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 max-h-40 overflow-y-auto">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Claim ID
                      </p>
                      <p className="font-bold text-lg">{generatedClaim.id}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Total Amount
                      </p>
                      <p className="font-bold text-lg text-green-600">
                        {generatedClaim.amount}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Patient
                      </p>
                      <p className="font-semibold">{generatedClaim.claimant}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Service Date
                      </p>
                      <p className="font-semibold">{generatedClaim.date}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg col-span-2">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Description
                      </p>
                      <p className="font-semibold">
                        {generatedClaim.description}
                      </p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Primary Diagnosis
                      </p>
                      <p className="font-mono font-semibold text-blue-600">
                        {generatedClaim.diagnosisCode}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {
                          icd10Codes[
                            generatedClaim.diagnosisCode as keyof typeof icd10Codes
                          ]
                        }
                      </p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg col-span-2">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Secondary Diagnoses (ICD-10)
                      </p>
                      <div className="space-y-1 mt-2">
                        {generatedClaim.secondaryDiagnosisCode
                          .split(",")
                          .map((code, index) => (
                            <div
                              key={code.trim()}
                              className="flex justify-between items-center"
                            >
                              <span className="font-mono font-semibold text-purple-600">
                                {code.trim()}
                              </span>
                              <span className="text-xs text-gray-600 flex-1 ml-3">
                                {
                                  icd10Codes[
                                    code.trim() as keyof typeof icd10Codes
                                  ]
                                }
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-lg col-span-2">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        CPT Procedure Codes
                      </p>
                      <div className="space-y-1 mt-2">
                        {generatedClaim.procedureCodes.map((code, index) => (
                          <div
                            key={code}
                            className="flex justify-between items-center"
                          >
                            <span className="font-mono font-semibold text-orange-600">
                              {code}
                            </span>
                            <span className="text-xs text-gray-600">
                              {cptCodes[code as keyof typeof cptCodes]}
                            </span>
                            <span className="text-sm font-semibold text-green-600">
                              {generatedClaim.procedureAmounts[index]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg col-span-2">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Healthcare Provider
                      </p>
                      <p className="font-semibold">{generatedClaim.provider}</p>
                      <p className="text-sm text-gray-600">
                        NPI: {generatedClaim.providerNPI}
                      </p>
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
                    <Button
                      variant="outline"
                      onClick={handleShowRecommendations}
                      className="bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-200"
                    >
                      📋 Show Recommendations
                    </Button>
                    <Button variant="outline" onClick={handleDialogClose}>
                      Save for Later
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700">
                      Submit to Payer
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
                  <CardTitle className="text-lg font-semibold">
                    Pending Reviews
                  </CardTitle>
                  <div className="text-xs text-muted-foreground">
                    Awaiting approval
                  </div>
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
                  <CardTitle className="text-lg font-semibold">
                    Denied Claims
                  </CardTitle>
                  <div className="text-xs text-muted-foreground">
                    Rejected this month
                  </div>
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
                  <CardTitle className="text-lg font-semibold">
                    Amount Approved
                  </CardTitle>
                  <div className="text-xs text-muted-foreground">
                    Total payout
                  </div>
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
