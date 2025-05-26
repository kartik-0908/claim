// Synthetic claims data refined for greater realism in payer‑system demos.
// ────────────────────────────────────────────────────────────────────
// • Claim IDs now follow a common payer Control Number pattern: YYYYMMDD#####
//   (date of claim entry + 3‑digit sequence). All IDs remain < 2^53 for JS safety.
// • Dollar amounts are closer to typical billed charges.
// • Service, diagnosis, and procedure codes better match each scenario.
// • Minor data‑quality tweaks (consistent statuses, believable descriptions, etc.).

export const pendingClaims = [
  {
    id: 202505100101,
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
    id: 202505130002,
    claimant: "Rahul Mehta",
    amount: "$450.00",
    date: "2025-05-12",
    status: "Pending",
    description:
      "Outpatient neurology consultation for chronic migraine evaluation.",
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
    id: 202505130043,
    claimant: "Linda Zhang",
    amount: "$68.49",
    date: "2025-05-13",
    status: "Pending",
    description:
      "Reimbursement request for Amoxicillin prescription (10‑day course).",
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
    id: 202505140704,
    claimant: "Carlos Rivera",
    amount: "$720.00",
    date: "2025-05-14",
    status: "Pending",
    description:
      "Physical therapy plan of care for right knee meniscal injury (6 sessions).",
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
    description:
      "Outpatient neurology consultation for chronic migraine evaluation.",
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
    description:
      "Reimbursement request for Amoxicillin prescription (10‑day course).",
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
    description:
      "Physical therapy plan of care for right knee meniscal injury (6 sessions).",
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

  // ── Added rows ──
  {
    id: 202505150005,
    claimant: "Priya Singh",
    amount: "$275.00",
    date: "2025-05-15",
    status: "Pending",
    description: "Diagnostic ultrasound of abdomen.",
    provider: "Dr. Thomas Carter",
    providerNPI: "4455667788",
    serviceType: "Outpatient Diagnostic",
    serviceDate: "2025-05-14",
    serviceInfo: "Complete abdominal ultrasound",
    diagnosisCode: "R10.9", // Abdominal pain, unspecified
    secondaryDiagnosisCode: "", // None
    procedureCodes: ["76700"],
    procedureServiceTypes: ["Imaging"],
    procedureAmounts: ["$275.00"],
    documentationList: [
      { name: "Ultrasound Report.pdf", type: "PDF Document", url: "#" },
    ],
  },
  {
    id: 202505160006,
    claimant: "Aisha Khan",
    amount: "$1,120.50",
    date: "2025-05-16",
    status: "Pending",
    description: "Series of allergy immunotherapy injections (5 doses).",
    provider: "Dr. Daniel Morgan",
    providerNPI: "7766554433",
    serviceType: "Outpatient Allergy",
    serviceDate: "2025-05-15",
    serviceInfo: "Subcutaneous immunotherapy, 5 weekly doses",
    diagnosisCode: "J30.1", // Allergic rhinitis due to pollen
    secondaryDiagnosisCode: "", // None
    procedureCodes: ["95165"],
    procedureServiceTypes: ["Immunotherapy"],
    procedureAmounts: ["$1,120.50"],
    documentationList: [
      { name: "Treatment Log.pdf", type: "PDF Document", url: "#" },
    ],
  },
  {
    id: 202505170007,
    claimant: "Mateo Garcia",
    amount: "$2,360.00",
    date: "2025-05-17",
    status: "Pending",
    description: "CT scan with and without contrast of the chest.",
    provider: "Dr. Olivia Bennett",
    providerNPI: "5544332211",
    serviceType: "Outpatient Imaging",
    serviceDate: "2025-05-16",
    serviceInfo: "CT chest w/wo contrast",
    diagnosisCode: "R91.8", // Other nonspecific abnormal finding of lung field
    secondaryDiagnosisCode: "", // None
    procedureCodes: ["71260"],
    procedureServiceTypes: ["Imaging"],
    procedureAmounts: ["$2,360.00"],
    documentationList: [
      { name: "CT Report.pdf", type: "PDF Document", url: "#" },
      { name: "Radiology Images.zip", type: "DICOM", url: "#" },
    ],
  },
  {
    id: 202505180008,
    claimant: "Olivia Turner",
    amount: "$198.00",
    date: "2025-05-18",
    status: "Pending",
    description: "Laboratory panel – comprehensive metabolic panel (CMP).",
    provider: "Dr. Joshua Reed",
    providerNPI: "3322110099",
    serviceType: "Laboratory",
    serviceDate: "2025-05-17",
    serviceInfo: "CMP blood test",
    diagnosisCode: "E11.9", // Type 2 diabetes mellitus without complications
    secondaryDiagnosisCode: "", // None
    procedureCodes: ["80053"],
    procedureServiceTypes: ["Laboratory"],
    procedureAmounts: ["$198.00"],
    documentationList: [
      { name: "Lab Results.pdf", type: "PDF Document", url: "#" },
    ],
  },
  {
    id: 202505190009,
    claimant: "Anika Desai",
    amount: "$4,875.00",
    date: "2025-05-19",
    status: "Pending",
    description:
      "Outpatient arthrocentesis and ultrasound‑guided joint injection.",
    provider: "Dr. Victor Huang",
    providerNPI: "8899001122",
    serviceType: "Outpatient Orthopedics",
    serviceDate: "2025-05-18",
    serviceInfo: "Knee arthrocentesis with steroid injection",
    diagnosisCode: "M17.11", // Unilateral primary osteoarthritis, right knee
    secondaryDiagnosisCode: "", // None
    procedureCodes: ["20611"],
    procedureServiceTypes: ["Injection"],
    procedureAmounts: ["$4,875.00"],
    documentationList: [
      { name: "Procedure Note.pdf", type: "PDF Document", url: "#" },
    ],
  },
  {
    id: 202505200010,
    claimant: "Benjamin Johnson",
    amount: "$92.30",
    date: "2025-05-20",
    status: "Pending",
    description: "Reimbursement for albuterol inhaler (rescue).",
    provider: "Dr. Natalie Ortiz",
    providerNPI: "2211334455",
    serviceType: "Pharmacy",
    serviceDate: "2025-05-19",
    serviceInfo: "Albuterol sulfate inhaler 90‑mcg/actuation",
    diagnosisCode: "J45.909", // Asthma, unspecified, uncomplicated
    secondaryDiagnosisCode: "", // None
    procedureCodes: ["NDC00186072888"],
    procedureServiceTypes: ["Prescription Drug"],
    procedureAmounts: ["$92.30"],
    documentationList: [
      { name: "Pharmacy Receipt.pdf", type: "PDF Document", url: "#" },
    ],
  },
  {
    id: 202505210011,
    claimant: "Hiroshi Tanaka",
    amount: "$6,750.00",
    date: "2025-05-21",
    status: "Pending",
    description: "Cardiac stress echocardiography with interpretation.",
    provider: "Dr. Ellen Fisher",
    providerNPI: "3344667788",
    serviceType: "Cardiology",
    serviceDate: "2025-05-20",
    serviceInfo: "Stress echo with Doppler",
    diagnosisCode: "I20.9", // Angina pectoris, unspecified
    secondaryDiagnosisCode: "", // None
    procedureCodes: ["93350"],
    procedureServiceTypes: ["Imaging"],
    procedureAmounts: ["$6,750.00"],
    documentationList: [
      { name: "Echo Report.pdf", type: "PDF Document", url: "#" },
    ],
  },
  {
    id: 202505220012,
    claimant: "Sophia Rossi",
    amount: "$560.00",
    date: "2025-05-22",
    status: "Pending",
    description: "Psychiatric evaluation – new patient, 60 minutes.",
    provider: "Dr. Marco DeLuca",
    providerNPI: "7788990011",
    serviceType: "Mental Health",
    serviceDate: "2025-05-21",
    serviceInfo: "Initial psychiatric diagnostic interview",
    diagnosisCode: "F32.0", // Major depressive disorder, single episode, mild
    secondaryDiagnosisCode: "", // None
    procedureCodes: ["90792"],
    procedureServiceTypes: ["Evaluation"],
    procedureAmounts: ["$560.00"],
    documentationList: [
      { name: "Psych Eval.pdf", type: "PDF Document", url: "#" },
    ],
  },
  {
    id: 202505230013,
    claimant: "Noah Williams",
    amount: "$1,340.00",
    date: "2025-05-23",
    status: "Pending",
    description: "Sleep study (polysomnography) overnight.",
    provider: "Dr. Fiona McCarthy",
    providerNPI: "5566007788",
    serviceType: "Sleep Medicine",
    serviceDate: "2025-05-22",
    serviceInfo: "Attended polysomnography, 6+ parameters",
    diagnosisCode: "G47.33", // Obstructive sleep apnea (adult)
    secondaryDiagnosisCode: "", // None
    procedureCodes: ["95810"],
    procedureServiceTypes: ["Diagnostic"],
    procedureAmounts: ["$1,340.00"],
    documentationList: [
      { name: "Sleep Study Report.pdf", type: "PDF Document", url: "#" },
    ],
  },
  {
    id: 202505240014,
    claimant: "Grace Chen",
    amount: "$240.00",
    date: "2025-05-24",
    status: "Pending",
    description: "Follow‑up telehealth visit for hypertension management.",
    provider: "Dr. Anthony Silva",
    providerNPI: "9988112233",
    serviceType: "Telehealth",
    serviceDate: "2025-05-23",
    serviceInfo: "Established patient video visit, 25 minutes",
    diagnosisCode: "I10", // Essential (primary) hypertension
    secondaryDiagnosisCode: "", // None
    procedureCodes: ["99214"],
    procedureServiceTypes: ["Office Visit"],
    procedureAmounts: ["$240.00"],
    documentationList: [
      { name: "Visit Notes.pdf", type: "PDF Document", url: "#" },
    ],
  },
  {
    id: 202505250015,
    claimant: "Lucas Martin",
    amount: "$3,980.00",
    date: "2025-05-25",
    status: "Pending",
    description:
      "Ambulatory surgical center cataract extraction with IOL placement.",
    provider: "Dr. Laura Perez",
    providerNPI: "6677008899",
    serviceType: "Ambulatory Surgery",
    serviceDate: "2025-05-24",
    serviceInfo: "Phacoemulsification with intraocular lens implant, left eye",
    diagnosisCode: "H25.12", // Age‑related nuclear cataract, left eye
    secondaryDiagnosisCode: "", // None
    procedureCodes: ["66984"],
    procedureServiceTypes: ["Surgical"],
    procedureAmounts: ["$3,980.00"],
    documentationList: [
      { name: "Operative Note.pdf", type: "PDF Document", url: "#" },
      { name: "ASC Invoice.pdf", type: "PDF Document", url: "#" },
    ],
  },
];

export const submittedClaims = [
  {
    id: 202504283005,
    claimant: "Samantha Lee",
    amount: "$220.00",
    date: "2025-04-28",
    status: "Submitted",
    description:
      "Annual comprehensive eye exam and prescription glasses benefit claim.",
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
    id: 202504306006,
    claimant: "Mohammed Al‑Farsi",
    amount: "$18,650.00",
    date: "2025-04-30",
    status: "Submitted",
    description:
      "Arthroscopic knee surgery with meniscal repair reimbursement.",
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
    id: 202504271007,
    claimant: "Julia Park",
    amount: "$640.00",
    date: "2025-04-27",
    status: "Submitted",
    description:
      "Chiropractic manipulation therapy for lumbar back pain (4 sessions).",
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
    id: 202504250908,
    claimant: "David Wu",
    amount: "$3,415.00",
    date: "2025-04-25",
    status: "Submitted",
    description:
      "Emergency department evaluation and observation for acute chest pain.",
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
  {
    id: 202504280005,
    claimant: "Samantha Lee",
    amount: "$220.00",
    date: "2025-04-28",
    status: "Submitted",
    description:
      "Annual comprehensive eye exam and prescription glasses benefit claim.",
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
    description:
      "Arthroscopic knee surgery with meniscal repair reimbursement.",
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
    description:
      "Chiropractic manipulation therapy for lumbar back pain (4 sessions).",
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
    description:
      "Emergency department evaluation and observation for acute chest pain.",
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

  // ── Added rows ──
  {
    id: 202504240009,
    claimant: "Eva Müller",
    amount: "$180.00",
    date: "2025-04-24",
    status: "Submitted",
    description: "Dermatology follow‑up visit for acne management.",
    provider: "Dr. Paul Schneider",
    providerNPI: "4455778899",
    serviceType: "Outpatient Dermatology",
    serviceDate: "2025-04-23",
    serviceInfo: "Established patient visit, 15 minutes",
    diagnosisCode: "L70.0", // Acne vulgaris
    secondaryDiagnosisCode: "", // None
    procedureCodes: ["99213"],
    procedureServiceTypes: ["Office Visit"],
    procedureAmounts: ["$180.00"],
    documentationList: [
      { name: "Visit Note.pdf", type: "PDF Document", url: "#" },
    ],
  },
  {
    id: 202504230010,
    claimant: "Miguel Santos",
    amount: "$950.00",
    date: "2025-04-23",
    status: "Submitted",
    description: "Upper GI endoscopy with biopsy for chronic GERD.",
    provider: "Dr. Karen O'Neil",
    providerNPI: "2233005599",
    serviceType: "Endoscopy",
    serviceDate: "2025-04-22",
    serviceInfo: "Diagnostic esophagogastroduodenoscopy with biopsy",
    diagnosisCode: "K21.9", // Gastro-esophageal reflux disease without esophagitis
    secondaryDiagnosisCode: "", // None
    procedureCodes: ["43239"],
    procedureServiceTypes: ["Diagnostic"],
    procedureAmounts: ["$950.00"],
    documentationList: [
      { name: "Endoscopy Report.pdf", type: "PDF Document", url: "#" },
      { name: "Pathology Report.pdf", type: "PDF Document", url: "#" },
    ],
  },
  {
    id: 202504220011,
    claimant: "Chen Li",
    amount: "$14,750.00",
    date: "2025-04-22",
    status: "Submitted",
    description: "Percutaneous coronary intervention (single stent).",
    provider: "Dr. Jacob Atherton",
    providerNPI: "9988551133",
    serviceType: "Cardiac Cath Lab",
    serviceDate: "2025-04-21",
    serviceInfo: "PCI with drug‑eluting stent, LAD",
    diagnosisCode: "I25.10", // Atherosclerotic heart disease of native coronary artery
    secondaryDiagnosisCode: "", // None
    procedureCodes: ["92928"],
    procedureServiceTypes: ["Interventional"],
    procedureAmounts: ["$14,750.00"],
    documentationList: [
      { name: "Cath Report.pdf", type: "PDF Document", url: "#" },
      { name: "Op Note.pdf", type: "PDF Document", url: "#" },
    ],
  },
  {
    id: 202504210012,
    claimant: "Laura Novak",
    amount: "$310.25",
    date: "2025-04-21",
    status: "Submitted",
    description: "HbA1c and lipid panel labs.",
    provider: "Dr. Samuel Wong",
    providerNPI: "7766558899",
    serviceType: "Laboratory",
    serviceDate: "2025-04-20",
    serviceInfo: "HbA1c + lipid panel",
    diagnosisCode: "E11.9", // Type 2 DM without complications
    secondaryDiagnosisCode: "", // None
    procedureCodes: ["83036", "80061"],
    procedureServiceTypes: ["Laboratory", "Laboratory"],
    procedureAmounts: ["$95.00", "$215.25"],
    documentationList: [
      { name: "Lab Results.pdf", type: "PDF Document", url: "#" },
    ],
  },
  {
    id: 202504200013,
    claimant: "Omar Haddad",
    amount: "$1,540.00",
    date: "2025-04-20",
    status: "Submitted",
    description: "MRI of lumbar spine without contrast.",
    provider: "Dr. Angela Brooks",
    providerNPI: "3344559988",
    serviceType: "Imaging",
    serviceDate: "2025-04-19",
    serviceInfo: "Lumbar spine MRI, no contrast",
    diagnosisCode: "M54.16", // Radiculopathy, lumbar region
    secondaryDiagnosisCode: "", // None
    procedureCodes: ["72148"],
    procedureServiceTypes: ["Imaging"],
    procedureAmounts: ["$1,540.00"],
    documentationList: [
      { name: "MRI Report.pdf", type: "PDF Document", url: "#" },
      { name: "Imaging CD.zip", type: "DICOM", url: "#" },
    ],
  },
  {
    id: 202504190014,
    claimant: "Helena Rossi",
    amount: "$12,890.00",
    date: "2025-04-19",
    status: "Submitted",
    description: "Cesarean delivery with 3‑day postpartum inpatient stay.",
    provider: "Dr. Maria Hernandez",
    providerNPI: "6655443322",
    serviceType: "Inpatient Maternity",
    serviceDate: "2025-04-17",
    serviceInfo: "C‑section delivery + postpartum care",
    diagnosisCode: "O82", // Encounter for cesarean delivery without indication
    secondaryDiagnosisCode: "", // None
    procedureCodes: ["59510"],
    procedureServiceTypes: ["Surgical"],
    procedureAmounts: ["$12,890.00"],
    documentationList: [
      { name: "Operative Report.pdf", type: "PDF Document", url: "#" },
      { name: "Discharge Summary.pdf", type: "PDF Document", url: "#" },
    ],
  },
  {
    id: 202504180015,
    claimant: "Gabriel Fernandez",
    amount: "$280.00",
    date: "2025-04-18",
    status: "Submitted",
    description: "Routine pediatric check‑up with vaccinations (age 6).",
    provider: "Dr. Jessica Park",
    providerNPI: "7788996655",
    serviceType: "Pediatrics",
    serviceDate: "2025-04-17",
    serviceInfo: "Well‑child visit + immunizations",
    diagnosisCode: "Z00.129", // Encounter for routine child health exam without abnormal findings
    secondaryDiagnosisCode: "", // None
    procedureCodes: ["99393", "90686", "90680"],
    procedureServiceTypes: ["Office Visit", "Vaccine", "Vaccine"],
    procedureAmounts: ["$150.00", "$80.00", "$50.00"],
    documentationList: [
      { name: "Immunization Record.pdf", type: "PDF Document", url: "#" },
    ],
  },
  {
    id: 202504170016,
    claimant: "Theo Laurent",
    amount: "$1,020.00",
    date: "2025-04-17",
    status: "Submitted",
    description:
      "Outpatient physical therapy following rotator cuff repair (6 visits).",
    provider: "Dr. Chloe Bernard",
    providerNPI: "1122446688",
    serviceType: "Rehabilitation",
    serviceDate: "2025-04-15",
    serviceInfo: "Shoulder therapeutic exercise & manual therapy",
    diagnosisCode: "S43.421A", // Partial rotator cuff tear, right shoulder, initial
    secondaryDiagnosisCode: "", // None
    procedureCodes: ["97110", "97140"],
    procedureServiceTypes: ["Therapeutic Exercise", "Manual Therapy"],
    procedureAmounts: ["$600.00", "$420.00"],
    documentationList: [
      { name: "Therapy Notes.pdf", type: "PDF Document", url: "#" },
    ],
  },
  {
    id: 202504160017,
    claimant: "Isabella Romano",
    amount: "$7,260.00",
    date: "2025-04-16",
    status: "Submitted",
    description: "Laparoscopic cholecystectomy reimbursement claim.",
    provider: "Dr. Richard Blake",
    providerNPI: "5566774411",
    serviceType: "Surgical",
    serviceDate: "2025-04-14",
    serviceInfo: "Lap cholecystectomy with intraop cholangiography",
    diagnosisCode: "K80.20", // Calculus of gallbladder without cholecystitis
    secondaryDiagnosisCode: "", // None
    procedureCodes: ["47562"],
    procedureServiceTypes: ["Surgical"],
    procedureAmounts: ["$7,260.00"],
    documentationList: [
      { name: "Op Report.pdf", type: "PDF Document", url: "#" },
      { name: "Hospital Bill.pdf", type: "PDF Document", url: "#" },
    ],
  },
  {
    id: 202504150018,
    claimant: "Yuna Kim",
    amount: "$4,200.00",
    date: "2025-04-15",
    status: "Submitted",
    description:
      "Partial hospitalization program (PHP) for generalized anxiety disorder.",
    provider: "Dr. Robert Harris",
    providerNPI: "6655223311",
    serviceType: "Mental Health",
    serviceDate: "2025-04-07",
    serviceInfo: "10‑day PHP stay with CBT",
    diagnosisCode: "F41.1", // Generalized anxiety disorder
    secondaryDiagnosisCode: "", // None
    procedureCodes: ["H0035"],
    procedureServiceTypes: ["Partial Hospital"],
    procedureAmounts: ["$4,200.00"],
    documentationList: [
      { name: "Treatment Summary.pdf", type: "PDF Document", url: "#" },
    ],
  },
  {
    id: 202504140019,
    claimant: "Ahmed Darwish",
    amount: "$520.00",
    date: "2025-04-14",
    status: "Submitted",
    description: "Speech therapy for post‑stroke aphasia (4 sessions).",
    provider: "Dr. Hannah Cole",
    providerNPI: "8844332211",
    serviceType: "Speech Therapy",
    serviceDate: "2025-04-12",
    serviceInfo: "Speech‑language pathology, 4 visits",
    diagnosisCode: "I69.321", // Aphasia following cerebral infarction
    secondaryDiagnosisCode: "", // None
    procedureCodes: ["92507"],
    procedureServiceTypes: ["Therapy"],
    procedureAmounts: ["$520.00"],
    documentationList: [
      { name: "Therapy Notes.pdf", type: "PDF Document", url: "#" },
    ],
  },
];

export default { pendingClaims, submittedClaims };
