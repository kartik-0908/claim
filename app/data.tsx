export const pendingClaims = [
  {
    id: 202505100001,
    claimant: "Emily Carter",
    amount: "$15,432.67",
    date: "2025-05-10",
    status: "Pending",
    description: "Inpatient hospitalization for laparoscopic appendectomy.",
    provider: "Dr. Michael Nguyen",
    providerNPI: "1987654321",
    serviceType: "Inpatient Hospital",
    serviceDate: "2025-05-08",
    serviceInfo: "Laparoscopic appendectomy and two‑day recovery stay",
    diagnosisCode: "K35.80",
    secondaryDiagnosisCode: "Z98.890",
    procedureCodes: ["44970"],
    procedureServiceTypes: ["Surgical"],
    procedureAmounts: ["$15,432.67"],
    documentationList: [
      { name: "Operative Report.pdf", type: "PDF Document", url: "#" },
      { name: "Discharge Summary.pdf", type: "PDF Document", url: "#" },
    ],
  },
  // ... other pending claims
];