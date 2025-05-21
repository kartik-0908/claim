// Synthetic claims data refined for greater realism in payer‑system demos.
// ────────────────────────────────────────────────────────────────────
// • Claim IDs now follow a common payer Control Number pattern: YYYYMMDD#####
//   (date of claim entry + 3‑digit sequence). All IDs remain < 2^53 for JS safety.
// • Dollar amounts are closer to typical billed charges.
// • Service, diagnosis, and procedure codes better match each scenario.
// • Minor data‑quality tweaks (consistent statuses, believable descriptions, etc.).

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
    diagnosisCode: "K35.80", // Unspecified acute appendicitis
    secondaryDiagnosisCode: "Z98.890", // Post‑procedural status
    procedureCodes: ["44970"], // Lap appendectomy CPT®
    procedureServiceTypes: ["Surgical"],
    procedureAmounts: ["$15,432.67"],
    documentationList: [
      { name: "Operative Report.pdf", type: "PDF Document", url: "#" },
      { name: "Discharge Summary.pdf", type: "PDF Document", url: "#" },
    ],
  },
  {
    id: 202505120002,
    claimant: "Rahul Mehta",
    amount: "$450.00",
    date: "2025-05-12",
    status: "Pending",
    description: "Outpatient neurology consultation for chronic migraine evaluation.",
    provider: "Dr. Sarah Lee",
    providerNPI: "1234567891",
    serviceType: "Outpatient Professional",
    serviceDate: "2025-05-11",
    serviceInfo: "Level‑4 new‑patient neurology consult",
    diagnosisCode: "G43.909", // Migraine, unspecified, not intractable
    secondaryDiagnosisCode: "R51", // Headache
    procedureCodes: ["99244"], // CPT® consult, moderate complexity
    procedureServiceTypes: ["Consultation"],
    procedureAmounts: ["$450.00"],
    documentationList: [
      { name: "Consultation Notes.pdf", type: "PDF Document", url: "#" },
    ],
  },
  {
    id: 202505130003,
    claimant: "Linda Zhang",
    amount: "$68.49",
    date: "2025-05-13",
    status: "Pending",
    description: "Reimbursement request for Amoxicillin prescription (10‑day course).",
    provider: "Dr. Kevin Patel",
    providerNPI: "1122334455",
    serviceType: "Pharmacy",
    serviceDate: "2025-05-12",
    serviceInfo: "Amoxicillin 875 mg tablets ×20",
    diagnosisCode: "J02.9", // Acute pharyngitis, unspecified
    secondaryDiagnosisCode: "", // None
    procedureCodes: ["NDC00093641505"], // Example NDC® for Amoxicillin
    procedureServiceTypes: ["Prescription Drug"],
    procedureAmounts: ["$68.49"],
    documentationList: [
      { name: "Pharmacy Receipt.pdf", type: "PDF Document", url: "#" },
      { name: "Prescription.jpg", type: "Image", url: "#" },
    ],
  },
  {
    id: 202505140004,
    claimant: "Carlos Rivera",
    amount: "$720.00",
    date: "2025-05-14",
    status: "Pending",
    description: "Physical therapy plan of care for right knee meniscal injury (6 sessions).",
    provider: "Dr. Amanda Brooks",
    providerNPI: "9988776655",
    serviceType: "Outpatient Rehabilitation",
    serviceDate: "2025-05-13",
    serviceInfo: "Therapeutic exercise & manual therapy, six visits",
    diagnosisCode: "S83.241A", // Medial meniscus tear, initial encounter
    secondaryDiagnosisCode: "", // None
    procedureCodes: ["97110", "97140"],
    procedureServiceTypes: ["Therapeutic Exercise", "Manual Therapy"],
    procedureAmounts: ["$300.00", "$420.00"],
    documentationList: [
      { name: "Therapy Progress Notes.pdf", type: "PDF Document", url: "#" },
    ],
  },
];

export const submittedClaims = [
  {
    id: 202504280005,
    claimant: "Samantha Lee",
    amount: "$220.00",
    date: "2025-04-28",
    status: "Submitted",
    description: "Annual comprehensive eye exam and prescription glasses benefit claim.",
    provider: "Dr. Robert Kim",
    providerNPI: "2233445566",
    serviceType: "Vision",
    serviceDate: "2025-04-26",
    serviceInfo: "Comprehensive eye exam + frame/lens purchase",
    diagnosisCode: "H52.13", // Myopia, bilateral
    secondaryDiagnosisCode: "", // None
    procedureCodes: ["92014"], // CPT® comprehensive ophthalmological service
    procedureServiceTypes: ["Eye Exam"],
    procedureAmounts: ["$220.00"],
    documentationList: [
      { name: "Exam Report.pdf", type: "PDF Document", url: "#" },
      { name: "Glasses Invoice.pdf", type: "PDF Document", url: "#" },
    ],
  },
  {
    id: 202504300006,
    claimant: "Mohammed Al‑Farsi",
    amount: "$18,650.00",
    date: "2025-04-30",
    status: "Submitted",
    description: "Arthroscopic knee surgery with meniscal repair reimbursement.",
    provider: "Dr. Emily Watson",
    providerNPI: "3344556677",
    serviceType: "Surgical",
    serviceDate: "2025-04-28",
    serviceInfo: "Knee arthroscopy with partial medial meniscectomy",
    diagnosisCode: "M23.221", // Derangement of medial meniscus due to old tear or injury
    secondaryDiagnosisCode: "", // None
    procedureCodes: ["29881"], // CPT® knee arthroscopy/meniscectomy
    procedureServiceTypes: ["Surgical"],
    procedureAmounts: ["$18,650.00"],
    documentationList: [
      { name: "Surgical Report.pdf", type: "PDF Document", url: "#" },
      { name: "Hospital Bill.pdf", type: "PDF Document", url: "#" },
    ],
  },
  {
    id: 202504270007,
    claimant: "Julia Park",
    amount: "$640.00",
    date: "2025-04-27",
    status: "Submitted",
    description: "Chiropractic manipulation therapy for lumbar back pain (4 sessions).",
    provider: "Dr. Steven Grant",
    providerNPI: "5566778899",
    serviceType: "Outpatient",
    serviceDate: "2025-04-25",
    serviceInfo: "Spinal adjustment, four visits",
    diagnosisCode: "M54.5", // Low back pain
    secondaryDiagnosisCode: "", // None
    procedureCodes: ["98941"], // CPT® chiropractic manipulative treatment, 3-4 regions
    procedureServiceTypes: ["Chiropractic"],
    procedureAmounts: ["$640.00"],
    documentationList: [
      { name: "Treatment Notes.pdf", type: "PDF Document", url: "#" },
    ],
  },
  {
    id: 202504250008,
    claimant: "David Wu",
    amount: "$3,415.00",
    date: "2025-04-25",
    status: "Submitted",
    description: "Emergency department evaluation and observation for acute chest pain.",
    provider: "Dr. Lisa Chen",
    providerNPI: "6677889900",
    serviceType: "Emergency",
    serviceDate: "2025-04-24",
    serviceInfo: "High‑severity ED visit (includes labs & EKG)",
    diagnosisCode: "R07.9", // Chest pain, unspecified
    secondaryDiagnosisCode: "", // None
    procedureCodes: ["99285"], // CPT® ED visit, high severity
    procedureServiceTypes: ["Emergency"],
    procedureAmounts: ["$3,415.00"],
    documentationList: [
      { name: "ER Report.pdf", type: "PDF Document", url: "#" },
      { name: "Lab Results.pdf", type: "PDF Document", url: "#" },
    ],
  },
];

export default { pendingClaims, submittedClaims };
