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
}

export const mockInvestments: Investment[] = [
  {
    id: "inv-1",
    dealId: "3",
    dealTitle: "Real Estate Development",
    category: "Real Estate",
    investedAmount: 25000,
    currentValue: 27500,
    investedDate: "2024-08-15",
    status: "Active",
    returnPercentage: 10,
  },
  {
    id: "inv-2",
    dealId: "1",
    dealTitle: "Sustainable Energy Fund",
    category: "Green Energy",
    investedAmount: 5000,
    currentValue: 5650,
    investedDate: "2024-09-01",
    status: "Active",
    returnPercentage: 13,
  },
  {
    id: "inv-3",
    dealId: "6",
    dealTitle: "Agricultural Tech",
    category: "Agriculture",
    investedAmount: 3000,
    currentValue: 3000,
    investedDate: "2024-12-01",
    status: "Pending",
    returnPercentage: 0,
  },
  {
    id: "inv-4",
    dealId: "5",
    dealTitle: "Luxury Hotel Chain",
    category: "Hospitality",
    investedAmount: 15000,
    currentValue: 18750,
    investedDate: "2024-03-10",
    status: "Completed",
    returnPercentage: 25,
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
    name: "Investment Confirmation",
    type: "confirmation",
    date: "2024-08-15",
  },
  {
    id: "doc-2",
    investmentId: "inv-1",
    name: "Ownership Certificate",
    type: "certificate",
    date: "2024-08-20",
  },
  {
    id: "doc-3",
    investmentId: "inv-2",
    name: "Investment Confirmation",
    type: "confirmation",
    date: "2024-09-01",
  },
  {
    id: "doc-4",
    investmentId: "inv-4",
    name: "Final Settlement Receipt",
    type: "receipt",
    date: "2024-12-15",
  },
  {
    id: "doc-5",
    investmentId: "inv-4",
    name: "Q4 Performance Report",
    type: "report",
    date: "2024-12-20",
  },
];
