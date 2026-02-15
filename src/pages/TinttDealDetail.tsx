import { useState } from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { mockDeals } from "@/data/mockDeals";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import {
  ArrowLeft,
  Clock,
  TrendingUp,
  Users,
  Target,
  FileText,
  AlertTriangle,
  DollarSign,
  ShieldAlert,
  Phone,
  Mail,
  Zap,
} from "lucide-react";
import { KYCModal } from "@/components/kyc/KYCModal";
import { PaymentModal } from "@/components/payment/PaymentModal";

/* ------------------------------------------------------------------ */
/*  Investment Summary – grouped with section headers                 */
/* ------------------------------------------------------------------ */
interface SummarySection {
  heading: string;
  rows: { label: string; value: string; highlight?: boolean }[];
}

const investmentSummarySections: SummarySection[] = [
  {
    heading: "Investment Parameters",
    rows: [
      { label: "Minimum Investment", value: "$100,000" },
      { label: "Maximum Investment", value: "$500,000 (ensure distribution)" },
      { label: "Available Allocation", value: "$5,000,000 (100%)" },
      { label: "Time Limit", value: "30 days" },
    ],
  },
  {
    heading: "Pricing & Terms",
    rows: [
      { label: "Offering Price", value: "25% Discount to LME Spot", highlight: true },
      { label: "Example Price", value: "$46,600/t spot → ~$34.95/TINTT" },
      { label: "Redemption Term", value: "36 Months (Amortized)" },
      { label: "Physical Settlement", value: "Optional (Warehouse Warrants, LME Grade A)" },
      { label: "Settlement Currency", value: "USDC, USDT, Wire Transfer (USD/EUR)" },
    ],
  },
  {
    heading: "Compliance",
    rows: [
      { label: "Investor Eligibility", value: "Accredited / Institutional Only" },
      { label: "Requirements", value: "KYC/AML Required" },
      { label: "Jurisdiction", value: "Mauritius (Company) / Uganda (Operations)" },
      { label: "Blockchain", value: "Ethereum, Polygon, Solana" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Risk items                                                        */
/* ------------------------------------------------------------------ */
const riskItems = [
  {
    title: "Market Risk",
    description:
      "Tin prices are highly volatile, driven by electronics demand and AI infrastructure cycles. Prices surged 40%+ in early 2026 to an all-time high of $56,800/t. A sustained price decline could reduce token value below purchase price, even with the 25% discount.",
  },
  {
    title: "Supply Chain & Geopolitical Risk",
    description:
      "71% of global tin supply comes from Myanmar and Indonesia — both facing major disruptions. Myanmar's Wa State mining ban removed 70% of national production. Indonesia's shipments dropped 33% in 2024. Continued disruptions may drive prices up or down depending on resolution.",
  },
  {
    title: "Operational Risk",
    description:
      "African mining operations face extraction risks including geological uncertainties, infrastructure challenges, and regulatory changes. Production delays or lower ore grades could impact redemption timelines and quantities.",
  },
  {
    title: "Liquidity Risk",
    description:
      "TINTT tokens may have limited secondary market liquidity during the 36-month term. Physical redemption requires minimum 5-tonne quantities with additional logistics costs.",
  },
  {
    title: "Regulatory Risk",
    description:
      "Tokenized commodities operate in an evolving regulatory environment. Changes to securities, mining, or blockchain regulations in relevant jurisdictions could affect token transferability or issuer operations.",
  },
  {
    title: "Counterparty Risk",
    description:
      "Investment depends on the issuer's solvency and ability to deliver tin from reserves. Financial difficulties or failure to maintain certifications could impair redemption.",
  },
];

/* ------------------------------------------------------------------ */
/*  Documents                                                         */
/* ------------------------------------------------------------------ */
const documents = [
  { name: "Investment Prospectus", type: "PDF", size: "3.1 MB" },
  { name: "Geological Survey Report", type: "PDF", size: "4.7 MB" },
  { name: "Financial Reports", type: "PDF", size: "1.9 MB" },
  { name: "Legal Terms", type: "PDF", size: "1.2 MB" },
  { name: "Risk Disclosure", type: "PDF", size: "985 KB" },
  { name: "Token Technical Specifications", type: "PDF", size: "756 KB" },
];

/* ------------------------------------------------------------------ */
/*  Why Tin? facts                                                    */
/* ------------------------------------------------------------------ */
const whyTinFacts = [
  "50% of global tin demand is solder — every circuit board, every AI chip",
  "MIT ranked tin as the metal most likely impacted by new technologies",
  "$580 billion in data center investment in 2025",
  "40,000-tonne annual deficit projected by 2030",
  "All-time high of $56,800/t in January 2026",
];

/* ------------------------------------------------------------------ */
/*  Funding stats                                                     */
/* ------------------------------------------------------------------ */
const FUNDING_TARGET = 5_000_000;
const FUNDING_RAISED = 2_100_000;
const INVESTORS_COUNT = 87;
const DAYS_REMAINING = 21;
const ALLOCATION_AVAILABLE = 58;

const TinttDealDetail = () => {
  const deal = mockDeals.find((d) => d.slug === "$TINTT-tokenized-tin-reserve");

  const [showKYC, setShowKYC] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [kycCompleted, setKycCompleted] = useState(false);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(n);

  const progress = (FUNDING_RAISED / FUNDING_TARGET) * 100;

  const handleInvestClick = () => {
    if (kycCompleted) {
      setShowPayment(true);
    } else {
      setShowKYC(true);
    }
  };

  const handleKYCComplete = () => {
    setKycCompleted(true);
    setShowKYC(false);
    setShowPayment(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in pb-24 md:pb-8">
        <Button asChild variant="ghost" className="gap-2">
          <Link to="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            Back to Deals
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ============================== Main Content ============================== */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Image */}
            <div className="h-64 md:h-80 bg-gradient-to-br from-muted to-secondary rounded-lg overflow-hidden relative">
              <img
                src="/tin%20b2b.webp"
                alt="TINTT — Tokenized Tin Reserve"
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-4 left-4 bg-background/90 text-foreground border-0">
                Commodities
              </Badge>
            </div>

            {/* Deal Info */}
            <div className="space-y-4">
              <h1 className="text-3xl font-light tracking-tight">
                TINTT — Tokenized In-Ground Tin Reserve
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                A tokenized forward sale of in-ground tin reserves from certified mines in Africa.
                Institutional investors gain discounted, transparent, on-chain exposure to future tin
                production — the essential solder metal powering every AI server and circuit board.
                Backed by geological certification, regulatory compliance, and optional physical
                redemption.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Tin hit an all-time high of $56,800 per tonne in January 2026 as supply collapses in
                Myanmar and Indonesia. The International Tin Association projects a 40,000-tonne annual
                deficit by 2030. This investment offers exposure to the world's most essential
                electronics metal with built-in discount to futures pricing.
              </p>
            </div>

            {/* Key Highlight */}
            <Card className="shadow-card border-primary/30 bg-primary/5">
              <CardContent className="p-4 flex items-start gap-3">
                <Badge className="bg-primary text-primary-foreground shrink-0 mt-0.5">NEW</Badge>
                <p className="text-sm font-medium">
                  Pilot Deal — First tokenized tin from Africa's next major producer. $56,800/t ATH.
                  30-day window. Board-approved trial transaction.
                </p>
              </CardContent>
            </Card>

            <Separator />

            {/* ---- Funding Progress ---- */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Funding Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{fmt(FUNDING_RAISED)} raised</span>
                    <span className="font-medium">{progress.toFixed(1)}%</span>
                  </div>
                  <Progress value={progress} className="h-3 bg-muted" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Target className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Target</p>
                      <p className="font-medium text-sm">{fmt(FUNDING_TARGET)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-green-100">
                      <DollarSign className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Raised</p>
                      <p className="font-medium text-sm">{fmt(FUNDING_RAISED)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-blue-100">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Investors</p>
                      <p className="font-medium text-sm">{INVESTORS_COUNT}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-orange-100">
                      <Clock className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Time Left</p>
                      <p className="font-medium text-sm">{DAYS_REMAINING} days</p>
                    </div>
                  </div>
                </div>

                {/* Urgency Indicators */}
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="bg-orange-50 text-orange-700 border-orange-200 text-xs"
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    {DAYS_REMAINING} days remaining
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200 text-xs"
                  >
                    {ALLOCATION_AVAILABLE}% allocation available
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-200 text-xs"
                  >
                    <Users className="h-3 w-3 mr-1" />
                    {INVESTORS_COUNT} investors committed
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-primary/5 text-primary border-primary/20 text-xs"
                  >
                    <TrendingUp className="h-3 w-3 mr-1" />
                    $46,600/t current LME spot — near all-time highs
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* ---- Why Tin? ---- */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Why Tin? The Silent Metal Powering AI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {whyTinFacts.map((fact) => (
                    <li key={fact} className="flex gap-3 text-sm">
                      <span className="text-primary mt-0.5 shrink-0">•</span>
                      <span className="text-muted-foreground">{fact}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* ---- Risk Disclosure ---- */}
            <Card className="shadow-card border-amber-200">
              <CardHeader>
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-amber-600" />
                  Risk Disclosure
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {riskItems.map((risk) => (
                  <div key={risk.title} className="flex gap-3">
                    <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium">{risk.title}</p>
                      <p className="text-sm text-muted-foreground">{risk.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* ---- Documents ---- */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {documents.map((doc) => (
                  <div
                    key={doc.name}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-md"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                      <div>
                        <span className="text-sm">{doc.name}</span>
                        <p className="text-xs text-muted-foreground">
                          {doc.type} · {doc.size}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-gold-light"
                    >
                      Download
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* ============================== Sidebar ============================== */}
          <div className="space-y-6">
            <Card className="shadow-card sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Investment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {investmentSummarySections.map((section) => (
                  <div key={section.heading} className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                      {section.heading}
                    </p>
                    <Table>
                      <TableBody className="text-xs">
                        {section.rows.map((row) => (
                          <TableRow
                            key={row.label}
                            className={`border-b border-muted ${
                              row.highlight ? "bg-primary/5" : ""
                            }`}
                          >
                            <TableCell className="py-2 pr-3 font-medium text-muted-foreground whitespace-nowrap align-top w-[1%]">
                              {row.label}
                            </TableCell>
                            <TableCell
                              className={`py-2 pl-0 align-top ${
                                row.highlight
                                  ? "text-primary font-semibold"
                                  : "text-foreground"
                              }`}
                            >
                              {row.value}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ))}

                <Separator />

                {/* CTA Investment Parameters */}
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                    Invest
                  </p>
                  <Table>
                    <TableBody className="text-xs">
                      <TableRow className="border-b border-muted">
                        <TableCell className="py-2 pr-3 font-medium text-muted-foreground whitespace-nowrap align-top w-[1%]">
                          Minimum Investment
                        </TableCell>
                        <TableCell className="py-2 pl-0 text-foreground align-top">
                          $25,000
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-b border-muted">
                        <TableCell className="py-2 pr-3 font-medium text-muted-foreground whitespace-nowrap align-top w-[1%]">
                          Maximum Investment
                        </TableCell>
                        <TableCell className="py-2 pl-0 text-foreground align-top">
                          $1,000,000 per investor
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-b border-muted">
                        <TableCell className="py-2 pr-3 font-medium text-muted-foreground whitespace-nowrap align-top w-[1%]">
                          Available Allocation
                        </TableCell>
                        <TableCell className="py-2 pl-0 text-foreground align-top">
                          $437,500 remaining (58%)
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-b border-muted">
                        <TableCell className="py-2 pr-3 font-medium text-muted-foreground whitespace-nowrap align-top w-[1%]">
                          Payment Methods
                        </TableCell>
                        <TableCell className="py-2 pl-0 text-foreground align-top">
                          Wire Transfer (USD/EUR), USDC, USDT
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <Separator />

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={handleInvestClick}
                    className="w-full bg-primary text-primary-foreground hover:bg-gold-light hover:shadow-gold transition-all text-lg py-6"
                  >
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Invest Now
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => console.log("Request More Info")}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Request More Info
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => console.log("Schedule a Call")}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Schedule a Call
                  </Button>
                </div>

                {/* Compliance Notice */}
                <div className="rounded-md bg-muted/50 p-3 space-y-1">
                  <p className="text-xs font-medium flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3 text-amber-500" />
                    Compliance Notice
                  </p>
                  <p className="text-xs text-muted-foreground">
                    KYC/AML verification required before investing. Accredited and institutional
                    investors only.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur border-t border-border md:hidden">
        <Button
          onClick={handleInvestClick}
          className="w-full bg-primary text-primary-foreground hover:bg-gold-light hover:shadow-gold transition-all py-5 text-base"
        >
          Invest Now — Min $25,000
        </Button>
      </div>

      {deal && (
        <>
          <KYCModal
            open={showKYC}
            onOpenChange={setShowKYC}
            onComplete={handleKYCComplete}
          />
          <PaymentModal
            open={showPayment}
            onOpenChange={setShowPayment}
            deal={deal}
          />
        </>
      )}
    </DashboardLayout>
  );
};

export default TinttDealDetail;
