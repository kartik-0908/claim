"use client";

import React, { useState } from "react";
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

// Example denied claims data
const deniedClaims = [
  {
    id: "D-001",
    claimant: "John Doe",
    amount: "$1,200",
    date: "2025-05-10",
    status: "Denied",
    denialReason: "Insufficient documentation provided.",
    description: "Outpatient consultation for fever.",
    provider: "Dr. Smith",
    providerNPI: "1234567890",
    serviceType: "Outpatient",
    serviceDate: "2025-05-09",
    documentationList: [
      {
        name: "Discharge Summary.pdf",
        type: "PDF Document",
        url: "#",
      },
      {
        name: "LabReport_2025-05-01.pdf",
        type: "PDF Document",
        url: "#",
      },
    ],
  },
  // ...more denied claims
];

export default function DeniedClaimsPage() {
  const [selectedClaim, setSelectedClaim] = useState<any>(null);

  return (
    <div className="p-8 max-w-4xl mx-auto ">
      <h1 className="text-4xl font-extrabold mb-8 tracking-tight">
        Denied Claims
      </h1>
      <motion.div
        key="denied"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <ClaimsTable data={deniedClaims} onReAppeal={setSelectedClaim} />
      </motion.div>
      <ReAppealDialog
        claim={selectedClaim}
        onOpenChange={(open) => !open && setSelectedClaim(null)}
      />
    </div>
  );
}

function ClaimsTable({
  data,
  onReAppeal,
}: {
  data: typeof deniedClaims;
  onReAppeal: (claim: any) => void;
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
                <span className="px-2 py-1 rounded text-xs font-semibold bg-red-100 text-red-800">
                  {claim.status}
                </span>
              </TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onReAppeal(claim)}
                >
                  Re-Appeal
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// ...existing code...
function ReAppealDialog({
  claim,
  onOpenChange,
}: {
  claim: any;
  onOpenChange: (open: boolean) => void;
}) {
  const handleGenerateAppeal = () => {
    alert("Appeal letter generated!");
  };

  return (
    <Dialog open={!!claim} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl w-full">
        <DialogHeader>
          <DialogTitle className="text-2xl">Denied Claim Details</DialogTitle>
        </DialogHeader>
        {claim && (
          <div className="space-y-6 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="font-bold text-sm mb-3 text-gray-700">
                  Provider Info
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="font-semibold text-xs text-gray-500 mb-1">
                      Provider
                    </div>
                    <div className="text-sm">{claim.provider}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-gray-500 mb-1">
                      Provider NPI
                    </div>
                    <div className="text-sm">{claim.providerNPI}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-gray-500 mb-1">
                      Service Type
                    </div>
                    <div className="text-sm">{claim.serviceType}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-gray-500 mb-1">
                      Service Date
                    </div>
                    <div className="text-sm">{claim.serviceDate}</div>
                  </div>
                </div>
              </div>
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="font-bold text-sm mb-2 text-gray-700">
                  Claim Details
                </div>
                <div className="grid grid-cols-2 gap-4">
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
                  <div className="col-span-2">
                    <div className="font-semibold text-xs text-gray-500 mb-1">
                      Description
                    </div>
                    <div className="text-sm">{claim.description}</div>
                  </div>
                  <div className="col-span-2 mt-2">
                    <div className="font-semibold text-xs text-red-700 mb-1">
                      Denial Reason
                    </div>
                    <div className="text-sm text-red-800">{claim.denialReason}</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Documentation */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <div className="font-bold text-base mb-2 text-gray-700">
                Documents
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
                        <div className="font-semibold text-sm">{doc.name}</div>
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
                  <div className="text-gray-500 text-sm">No documents found.</div>
                )}
              </div>
            </div>
            {/* Appeal Action */}
            <div className="flex gap-4">
              <Button variant="default" onClick={handleGenerateAppeal}>
                Generate Appeal Letter
              </Button>
            </div>
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
// ...existing code...