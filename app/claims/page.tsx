"use client";

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { pendingClaims, submittedClaims } from "./data";

export default function ClaimsPage() {
  const [selectedClaim, setSelectedClaim] = useState<any>(null);
  const [tab, setTab] = useState("pending");

  return (
    <div className="p-8 max-w-4xl mx-auto ">
      <h1 className="text-4xl font-extrabold mb-8 tracking-tight">
        Claims Center
      </h1>
      <Tabs
        defaultValue="pending"
        value={tab}
        onValueChange={setTab}
        className="w-full"
      >
        <TabsList className="mb-6 flex justify-center gap-4">
          <TabsTrigger value="pending" className="text-base px-6 py-2">
            Pending for Review
          </TabsTrigger>
          <TabsTrigger value="submitted" className="text-base px-6 py-2">
            Submitted
          </TabsTrigger>
        </TabsList>
        <AnimatePresence mode="wait">
          {tab === "pending" && (
            <TabsContent value="pending" forceMount>
              <motion.div
                key="pending"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ClaimsTable data={pendingClaims} onReview={setSelectedClaim} />
              </motion.div>
            </TabsContent>
          )}
          {tab === "submitted" && (
            <TabsContent value="submitted" forceMount>
              <motion.div
                key="submitted"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ClaimsTable
                  data={submittedClaims}
                  onReview={setSelectedClaim}
                />
              </motion.div>
            </TabsContent>
          )}
        </AnimatePresence>
      </Tabs>
      <ReviewDialog
        claim={selectedClaim}
        onOpenChange={(open) => !open && setSelectedClaim(null)}
      />
    </div>
  );
}

function ClaimsTable({
  data,
  onReview,
}: {
  data: typeof pendingClaims;
  onReview: (claim: any) => void;
}) {
  return (
    <div className="rounded-xl border shadow-lg overflow-hidden bg-white w-full">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="bg-muted">
            <TableHead>ID</TableHead>
            <TableHead>Claimant</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((claim) => (
            <TableRow
              key={claim.id}
              className="hover:bg-accent transition-colors"
            >
              <TableCell>{claim.id}</TableCell>
              <TableCell className="font-medium">{claim.claimant}</TableCell>
              <TableCell>{claim.amount}</TableCell>
              <TableCell>{claim.date}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold 
                  ${
                    claim.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {claim.status}
                </span>
              </TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onReview(claim)}
                >
                  Review
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function ReviewDialog({
  claim,
  onOpenChange,
}: {
  claim: any;
  onOpenChange: (open: boolean) => void;
}) {
  const [diagnosisCode, setDiagnosisCode] = useState("");
  const [procedureCodes, setProcedureCodes] = useState<string[]>([]);

  React.useEffect(() => {
    if (claim) {
      setDiagnosisCode(claim.diagnosisCode || "");
      setProcedureCodes(claim.procedureCodes || [""]);
    }
  }, [claim]);

  const handleProcedureCodeChange = (idx: number, value: string) => {
    setProcedureCodes((prev) => {
      const updated = [...prev];
      updated[idx] = value;
      return updated;
    });
  };

  const addProcedureCode = () => setProcedureCodes((prev) => [...prev, ""]);
  const removeProcedureCode = (idx: number) =>
    setProcedureCodes((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = () => {
    // Here you would handle the submit logic
    onOpenChange(false);
  };

  return (
    <Dialog open={!!claim} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl w-full ">
        <DialogHeader>
          <DialogTitle className="text-2xl">Claim Details</DialogTitle>
        </DialogHeader>
        {claim && (
          <div className="space-y-6 text-xs">
            {/* First row: Provider Info & Claim Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Provider Info Card */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="font-bold text-sm mb-3 text-gray-700">
                  Provider Info
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <div className="font-semibold text-xs text-gray-500 mb-1">
                      Provider
                    </div>
                    <div className="text-sm">
                      {claim.provider || "Dr. Smith"}
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-gray-500 mb-1">
                      Provider NPI
                    </div>
                    <div className="text-sm">
                      {claim.providerNPI || "1234567890"}
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-gray-500 mb-1">
                      Service Type
                    </div>
                    <div className="text-sm">
                      {claim.serviceType || "Outpatient"}
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-gray-500 mb-1">
                      Service Date
                    </div>
                    <div className="text-sm">
                      {claim.serviceDate || claim.date}
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-gray-500 mb-1">
                      Service Information
                    </div>
                    <div className="text-sm">
                      {claim.serviceInfo || "General Health Service"}
                    </div>
                  </div>
                </div>
              </div>
              {/* Claim Details Card */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="font-bold text-sm mb-2 text-gray-700">
                  Claim Details
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <div className="font-semibold text-xs text-gray-500 mb-1">
                      Claimant
                    </div>
                    <div className="text-sm">{claim.claimant}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-gray-500 mb-1">
                      Amount
                    </div>
                    <div className="text-sm">{claim.amount}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-gray-500 mb-1">
                      Status
                    </div>
                    <div className="text-sm">{claim.status}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="font-semibold text-xs text-gray-500 mb-1">
                      Description
                    </div>
                    <div className="text-sm">{claim.description}</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Second row: Diagnosis & Procedure Codes and Documentation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left column: Diagnosis + Procedure (stacked) */}
              <div className="flex flex-col gap-3">
                {/* Diagnosis Codes Card */}
                <div className="border rounded-lg p-3 bg-gray-50">
                  <div className="font-bold text-base mb-2 text-gray-700">
                    Diagnosis Codes
                  </div>
                  <div className="flex gap-4">
                    <div>
                      <div className="font-semibold text-sm">Primary</div>
                      <input
                        className="mt-1 border rounded px-2 py-1 w-36 text-sm"
                        value={diagnosisCode || "A01.1"}
                        onChange={(e) => setDiagnosisCode(e.target.value)}
                        placeholder="Primary Code"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Secondary</div>
                      <input
                        className="mt-1 border rounded px-2 py-1 w-36 text-sm"
                        value={claim.secondaryDiagnosisCode || "B02.2"}
                        onChange={(e) => {
                          /* handle secondary code change if needed */
                        }}
                        placeholder="Secondary Code"
                        disabled
                      />
                    </div>
                  </div>
                </div>
                {/* Procedure Codes Card */}
                <div className="border rounded-lg p-3 bg-gray-50">
                  <div className="font-bold text-base mb-2 text-gray-700">
                    Procedure Codes
                  </div>
                  <div className="flex flex-col gap-2">
                    {procedureCodes.map((code, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          className="border rounded px-2 py-1 w-24 text-sm"
                          value={code || `P${idx + 1}23`}
                          onChange={(e) =>
                            handleProcedureCodeChange(idx, e.target.value)
                          }
                          placeholder="Code"
                        />
                        <input
                          className="border rounded px-2 py-1 w-28 text-sm"
                          value={
                            claim.procedureServiceTypes?.[idx] || "Consultation"
                          }
                          placeholder="Service Type"
                          disabled
                        />
                        <input
                          className="border rounded px-2 py-1 w-20 text-sm"
                          value={claim.procedureAmounts?.[idx] || "$100"}
                          placeholder="Amount"
                          disabled
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column: Documentation */}
              <div className="border rounded-lg p-3 bg-gray-50 h-fit">
                <div className="font-bold text-base mb-2 text-gray-700">
                  Documentation
                </div>
                <div className="flex flex-col gap-3">
                  {Array.isArray(claim.documentationList) &&
                  claim.documentationList.length > 0 ? (
                    claim.documentationList.map((doc: any) => (
                      <div
                        key={doc.name}
                        className="border rounded p-3 flex items-center justify-between bg-white shadow-sm"
                      >
                        <div>
                          <div className="font-semibold text-sm">
                            {doc.name}
                          </div>
                          <div className="text-xs text-gray-600">
                            {doc.type || "Document"}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => window.open(doc.url || "#", "_blank")}
                        >
                          View
                        </Button>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="border rounded p-3 flex items-center justify-between bg-white shadow-sm">
                        <div>
                          <div className="font-semibold text-sm">
                            Discharge Summary.pdf
                          </div>
                          <div className="text-xs text-gray-600">
                            PDF Document
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => alert("Viewing Discharge Summary.pdf")}
                        >
                          View
                        </Button>
                      </div>
                      <div className="border rounded p-3 flex items-center justify-between bg-white shadow-sm">
                        <div>
                          <div className="font-semibold text-sm">
                            LabReport_2025-05-01.pdf
                          </div>
                          <div className="text-xs text-gray-600">
                            PDF Document
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() =>
                            alert("Viewing LabReport_2025-05-01.pdf")
                          }
                        >
                          View
                        </Button>
                      </div>
                      <div className="border rounded p-3 flex items-center justify-between bg-white shadow-sm">
                        <div>
                          <div className="font-semibold text-sm">
                            Prescription.jpg
                          </div>
                          <div className="text-xs text-gray-600">Image</div>
                        </div>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => alert("Viewing Prescription.jpg")}
                        >
                          View
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="default" onClick={handleSubmit}>
            Submit Claim
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
