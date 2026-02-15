export interface Investment {
  id: string;
  dealId: string;
  dealTitle: string;
  category: string;
  investedAmount: number;
  currentValue: number;
  investedDate: string;
  status: "Pending" | "Active" | "Completed";
  returnPercentage: number;
  /** Extra details for token investments */
  tokenDetails?: {
    tokensHeld: string;
    entryPrice: string;
    currentPrice?: string;
    discountAtPurchase?: string;
    currentSpot?: string;
    redemptionStart?: string;
    interestAccrued?: string;
    /** Yield-specific fields */
    estAnnualYield?: string;
    nextDistribution?: string;
    totalDistributions?: string;
  };
}

export const mockInvestments: Investment[] = [
  {
    id: "inv-1",
    dealId: "1",
    dealTitle: "COPTT — Tokenized Copper Reserve",
    category: "Commodities",
    investedAmount: 75000,
    currentValue: 86250,
    investedDate: "2025-11-15",
    status: "Active",
    returnPercentage: 15,
    tokenDetails: {
      tokensHeld: "16,741",
      entryPrice: "$4.48/token",
      currentPrice: "$5.15/token",
      discountAtPurchase: "20%",
      currentSpot: "$5.60/lb (LME)",
      redemptionStart: "2030",
      interestAccrued: "2% p.a.",
    },
  },
  {
    id: "inv-2",
    dealId: "5",
    dealTitle: "TINTT — Tokenized Tin Reserve",
    category: "Commodities",
    investedAmount: 50000,
    currentValue: 57500,
    investedDate: "2025-12-01",
    status: "Active",
    returnPercentage: 15,
    tokenDetails: {
      tokensHeld: "2.5 TINTT",
      entryPrice: "~$40,000/token",
      currentPrice: "$46,000/token",
      discountAtPurchase: "25%",
      currentSpot: "$48,000/tonne (LME)",
      redemptionStart: "36-month delivery window",
      interestAccrued: "Pilot Deal — Producing (Commissioning)",
    },
  },
  {
    id: "inv-3",
    dealId: "6",
    dealTitle: "PANTT — Tokenized Solar Energy Infrastructure",
    category: "Green Energy",
    investedAmount: 60000,
    currentValue: 67500,
    investedDate: "2026-01-15",
    status: "Pending",
    returnPercentage: 12.5,
    tokenDetails: {
      tokensHeld: "60,000 PANTT",
      entryPrice: "$1.00/token",
      estAnnualYield: "10-12%",
      nextDistribution: "Q2 2026",
      totalDistributions: "$0 (pending first distribution)",
    },
  },
];

export interface Document {
  id: string;
  investmentId: string;
  name: string;
  type: "confirmation" | "certificate" | "receipt" | "report";
  date: string;
}

export const mockDocuments: Document[] = [
  {
    id: "doc-1",
    investmentId: "inv-1",
    name: "COPTT Investment Agreement",
    type: "confirmation",
    date: "2025-11-15",
  },
  {
    id: "doc-2",
    investmentId: "inv-1",
    name: "COPTT Token Receipt",
    type: "receipt",
    date: "2025-11-15",
  },
  {
    id: "doc-3",
    investmentId: "inv-1",
    name: "COPTT Prospectus",
    type: "report",
    date: "2025-11-15",
  },
  {
    id: "doc-4",
    investmentId: "inv-1",
    name: "KYC Verification",
    type: "certificate",
    date: "2025-11-10",
  },
  {
    id: "doc-5",
    investmentId: "inv-2",
    name: "TINTT Investment Agreement",
    type: "confirmation",
    date: "2025-12-01",
  },
  {
    id: "doc-6",
    investmentId: "inv-2",
    name: "TINTT Token Receipt",
    type: "receipt",
    date: "2025-12-01",
  },
  {
    id: "doc-8",
    investmentId: "inv-2",
    name: "TINTT Prospectus",
    type: "report",
    date: "2025-12-01",
  },
  {
    id: "doc-9",
    investmentId: "inv-2",
    name: "KYC Verification",
    type: "certificate",
    date: "2025-11-10",
  },
  {
    id: "doc-7",
    investmentId: "inv-3",
    name: "PANTT Investment Agreement",
    type: "confirmation",
    date: "2026-01-15",
  },
  {
    id: "doc-10",
    investmentId: "inv-3",
    name: "PANTT Token Receipt",
    type: "receipt",
    date: "2026-01-15",
  },
  {
    id: "doc-11",
    investmentId: "inv-3",
    name: "PANTT Prospectus",
    type: "report",
    date: "2026-01-15",
  },
  {
    id: "doc-12",
    investmentId: "inv-3",
    name: "KYC Verification",
    type: "certificate",
    date: "2025-11-10",
  },
];
