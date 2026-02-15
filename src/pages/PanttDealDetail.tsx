import { useState } from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { mockDeals } from "@/data/mockDeals";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableRow, TableCell, TableHead, TableHeader } from "@/components/ui/table";
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
  Sun,
  CheckCircle,
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
    heading: "Token Details",
    rows: [
      { label: "Issuer", value: "India's Top 5 Infrastructure Builder (Confidential)" },
      { label: "Asset Type", value: "Solar + Battery Infrastructure" },
      { label: "Token Name", value: "PANTT" },
      { label: "Token Standard", value: "ERC-20 (Ethereum)" },
      { label: "Total Supply", value: "250,000,000" },
      { label: "Unit Representation", value: "Revenue Share in Solar SPV" },
    ],
  },
  {
    heading: "Pricing & Returns",
    rows: [
      { label: "Total Project Value", value: "$2.5B USD" },
      { label: "Target IRR", value: "10-12% p.a.", highlight: true },
      { label: "Revenue Source", value: "Long-term PPA (25 years)" },
      { label: "Distribution Frequency", value: "Quarterly USDT" },
      { label: "Carbon Credits", value: "Additional upside included" },
    ],
  },
  {
    heading: "Project Capacity",
    rows: [
      { label: "Solar Capacity", value: "4 GW" },
      { label: "Battery Storage", value: "1.5 GW" },
      { label: "Annual Output", value: "~7 TWh/year" },
      { label: "Locations", value: "Rajasthan, Gujarat" },
    ],
  },
  {
    heading: "Compliance",
    rows: [
      { label: "Investor Eligibility", value: "Accredited / Institutional Only" },
      { label: "Requirements", value: "KYC/AML Required" },
      { label: "Jurisdiction", value: "Liechtenstein (Token) / India (Assets)" },
      { label: "Blockchain", value: "Ethereum" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Risk items                                                        */
/* ------------------------------------------------------------------ */
const riskItems = [
  {
    title: "Market & Currency Risk",
    description:
      "Energy prices and PPA terms are subject to Indian regulatory changes. While 25-year PPAs provide stability, tariff renegotiations or policy shifts could impact returns. INR revenue converted to USDT distributions introduces currency volatility.",
  },
  {
    title: "Construction Risk",
    description:
      "Large-scale solar and battery projects face land acquisition delays, permitting challenges, supply chain disruptions, and contractor performance issues. Timelines and budgets may exceed estimates despite the partner's 40-year track record.",
  },
  {
    title: "Operational Risk",
    description:
      "Post-commissioning risks include equipment degradation, grid curtailment, transmission constraints, and weather variability. Battery storage carries performance degradation and replacement costs over the 25-year horizon.",
  },
  {
    title: "Counterparty Risk",
    description:
      "Revenue depends on offtaker creditworthiness. Indian state utility DISCOMs have historically faced financial stress. Private offtakers may face business challenges affecting payment reliability.",
  },
  {
    title: "Regulatory & Political Risk",
    description:
      "Indian energy policy, land use regulations, and foreign investment rules may change. State-level political shifts could affect approvals, grid access, or tariff enforcement.",
  },
  {
    title: "Liquidity Risk",
    description:
      "PANTT tokens may have limited secondary market liquidity during the investment period. Distributions depend on project cash flows, which may vary from projections.",
  },
];

/* ------------------------------------------------------------------ */
/*  Project Portfolio                                                  */
/* ------------------------------------------------------------------ */
const projects = [
  {
    name: "Sunrise Solar Park",
    rows: [
      { label: "Capacity", value: "2,500 MW PV + 1,000 MW Battery" },
      { label: "Location", value: "Rajasthan, Thar Desert" },
      { label: "Investment", value: "~$1.5B" },
      { label: "Annual Output", value: "~4 TWh/year" },
      { label: "PPA Rate", value: "₹2.8–3.0/kWh solar, ~₹4/kWh blended with storage" },
      { label: "Timeline", value: "Q4 2025 groundbreaking, full completion 2027" },
    ],
  },
  {
    name: "Glare Solar & Wind Farm",
    rows: [
      { label: "Capacity", value: "1,500 MW PV + 500 MW Wind + 500 MW Battery" },
      { label: "Location", value: "Gujarat or Andhra Pradesh" },
      { label: "Investment", value: "~$1.0B" },
      { label: "Annual Output", value: "~3 TWh/year" },
      { label: "PPA Rate", value: "~₹3.5–4/kWh round-the-clock blended tariff" },
      { label: "Timeline", value: "18 months to commission (2025-2026)" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Documents                                                         */
/* ------------------------------------------------------------------ */
const documents = [
  { name: "Investment Prospectus", type: "PDF", size: "4.2 MB" },
  { name: "Project Technical Overview", type: "PDF", size: "3.8 MB" },
  { name: "PPA Summary (Redacted)", type: "PDF", size: "1.4 MB" },
  { name: "Financial Model", type: "PDF", size: "2.1 MB" },
  { name: "Legal Terms", type: "PDF", size: "1.3 MB" },
  { name: "Risk Disclosure", type: "PDF", size: "892 KB" },
  { name: "ESG Impact Report", type: "PDF", size: "1.7 MB" },
];

/* ------------------------------------------------------------------ */
/*  Why India Solar? facts                                            */
/* ------------------------------------------------------------------ */
const whySolarFacts = [
  "250 GW peak demand in 2024 → 400 GW+ by 2030",
  "Government target: 500 GW non-fossil capacity by 2030",
  "Rajasthan solar insolation: ~2000 kWh/m²/yr (world-class)",
  "Solar cost: ~$0.40/W, globally competitive",
  "Battery storage critical for grid stability and premium pricing",
];

/* ------------------------------------------------------------------ */
/*  Comparison Table                                                   */
/* ------------------------------------------------------------------ */
const comparisonHeaders = ["Feature", "Traditional Solar Fund", "PANTT Token", "Direct Project Equity"];
const comparisonRows = [
  ["Min. Investment", "$1M+", "1 token (TBD)", "$10M+"],
  ["Liquidity", "Lock-up periods", "24/7 tradable", "Illiquid"],
  ["Settlement", "T+30+", "T+0 Instant", "Months"],
  ["Distributions", "Quarterly (wire)", "Quarterly USDT", "Annual"],
  ["Transparency", "Periodic reports", "Real-time on-chain", "Limited"],
  ["Carbon Credits", "Often excluded", "Included", "Varies"],
];

/* ------------------------------------------------------------------ */
/*  Funding stats                                                     */
/* ------------------------------------------------------------------ */
const FUNDING_TARGET = 2_500_000;
const FUNDING_RAISED = 875_000;
const INVESTORS_COUNT = 52;
const DAYS_REMAINING = 28;
const ALLOCATION_AVAILABLE = 65;

const PanttDealDetail = () => {
  const deal = mockDeals.find((d) => d.slug === "$PANTT-tokenized-solar-energy");

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
            <div className="h-64 md:h-80 bg-gradient-to-br from-amber-100 to-yellow-50 rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <Sun className="h-24 w-24 text-amber-300/40" />
              </div>
              <Badge className="absolute top-4 left-4 bg-background/90 text-foreground border-0">
                Green Energy
              </Badge>
            </div>

            {/* Deal Info */}
            <div className="space-y-4">
              <h1 className="text-3xl font-light tracking-tight">
                PANTT — Tokenized Solar Energy Infrastructure
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Tokenized exposure to 4 GW of solar + 1.5 GW battery storage capacity across
                Rajasthan and Gujarat, India. Backed by 25-year Power Purchase Agreements with state
                utilities and private offtakers. PANTT tokens offer institutional investors
                yield-bearing exposure to PPA-backed renewable energy revenue, with stable quarterly
                USDT distributions and carbon credit upside.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                India faces surging power demand — record 250 GW peak in 2024, expected to exceed
                400 GW by 2030. Toto Finance and one of India's Top 5 Infrastructure Builders are
                tokenizing one of India's largest solar + battery portfolios. Contributing to India's
                500 GW non-fossil target by 2030.
              </p>
            </div>

            {/* Key Highlight */}
            <Card className="shadow-card border-primary/30 bg-primary/5">
              <CardContent className="p-4 space-y-2">
                <p className="text-sm font-semibold text-primary">
                  10-12% Target IRR with Quarterly USDT Distributions
                </p>
                <p className="text-sm text-muted-foreground">
                  PPA-backed revenue from 25-year contracts with state utilities and private
                  consortium. Quarterly distributions paid directly to wallets in USDT via smart
                  contract. Additional upside from carbon credit monetization.
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
                  <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    {DAYS_REMAINING} days remaining
                  </Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                    {ALLOCATION_AVAILABLE}% allocation available
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                    <Users className="h-3 w-3 mr-1" />
                    {INVESTORS_COUNT} investors committed
                  </Badge>
                  <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    10-12% target IRR with quarterly USDT distributions
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* ---- Project Portfolio ---- */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Project Portfolio</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {projects.map((project) => (
                  <div key={project.name} className="space-y-3">
                    <h4 className="text-sm font-semibold flex items-center gap-2">
                      <Sun className="h-4 w-4 text-amber-500" />
                      {project.name}
                    </h4>
                    <Table>
                      <TableBody className="text-xs">
                        {project.rows.map((row) => (
                          <TableRow key={row.label} className="border-b border-muted">
                            <TableCell className="py-2 pr-3 font-medium text-muted-foreground whitespace-nowrap align-top w-[1%]">
                              {row.label}
                            </TableCell>
                            <TableCell className="py-2 pl-0 text-foreground align-top">
                              {row.value}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* ---- Why India Solar? ---- */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Sun className="h-5 w-5 text-amber-500" />
                  Why India Solar? Powering the World's Fastest-Growing Energy Market
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {whySolarFacts.map((fact) => (
                    <li key={fact} className="flex gap-3 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{fact}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* ---- Comparison Table ---- */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  How PANTT Compares
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      {comparisonHeaders.map((h) => (
                        <TableHead key={h} className="text-xs font-semibold">
                          {h}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-xs">
                    {comparisonRows.map((row) => (
                      <TableRow key={row[0]} className="border-b border-muted">
                        <TableCell className="py-2 font-medium text-muted-foreground">
                          {row[0]}
                        </TableCell>
                        <TableCell className="py-2">{row[1]}</TableCell>
                        <TableCell className="py-2 text-primary font-medium">{row[2]}</TableCell>
                        <TableCell className="py-2">{row[3]}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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
                          $50,000
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-b border-muted">
                        <TableCell className="py-2 pr-3 font-medium text-muted-foreground whitespace-nowrap align-top w-[1%]">
                          Maximum Investment
                        </TableCell>
                        <TableCell className="py-2 pl-0 text-foreground align-top">
                          $2,000,000 per investor
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-b border-muted">
                        <TableCell className="py-2 pr-3 font-medium text-muted-foreground whitespace-nowrap align-top w-[1%]">
                          Available Allocation
                        </TableCell>
                        <TableCell className="py-2 pl-0 text-foreground align-top">
                          $1,625,000 remaining (65%)
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
          Invest Now — Min $50,000
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

export default PanttDealDetail;
