import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { mockDeals } from "@/data/mockDeals";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { 
  ArrowLeft, 
  Clock, 
  TrendingUp, 
  Users, 
  Target, 
  FileText,
  AlertTriangle,
  DollarSign
} from "lucide-react";
import { KYCModal } from "@/components/kyc/KYCModal";
import { PaymentModal } from "@/components/payment/PaymentModal";

const investmentSummaryRows: { label: string; value: string }[] = [
  { label: "Issuer", value: "NYSE-Listed Mining Company (Confidential)" },
  { label: "Asset Type", value: "In-Ground Copper Reserves" },
  { label: "Token Name", value: "COPTT" },
  { label: "Token Standard", value: "ERC-20 (Ethereum)" },
  { label: "Total Supply", value: "300,000,000" },
  { label: "Unit Representation", value: "1 lb LME Grade A Copper" },
  { label: "Offering Price", value: "30% Discount to Futures" },
  { label: "Example Price", value: "$5.80/lb futures → $4.06/COPTT" },
  { label: "Redemption Term", value: "48 Months (Amortized)" },
  { label: "Physical Settlement", value: "Optional (Warehouse Warrants)" },
  { label: "Investor Eligibility", value: "Accredited / Institutional Only" },
  { label: "Compliance", value: "KYC/AML Required" },
  { label: "Jurisdiction", value: "Details Confidential" },
];

const DealDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const deal = mockDeals.find((d) => d.slug === slug || d.id === slug);
  
  const [showKYC, setShowKYC] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [kycCompleted, setKycCompleted] = useState(false);

  if (!deal) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
          <h1 className="text-2xl font-light">Deal not found</h1>
          <Button asChild variant="outline">
            <Link to="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

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
      <div className="space-y-6 animate-fade-in">
        <Button asChild variant="ghost" className="gap-2">
          <Link to="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            Back to Deals
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Image */}
            <div className="h-64 md:h-80 bg-gradient-to-br from-muted to-secondary rounded-lg overflow-hidden relative">
              {deal.imageUrl ? (
                <img
                  src={deal.imageUrl}
                  alt={deal.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-8xl font-light text-muted-foreground/20">
                    {deal.title.charAt(0)}
                  </span>
                </div>
              )}
              <Badge className="absolute top-4 left-4 bg-background/90 text-foreground border-0">
                {deal.category}
              </Badge>
            </div>

            {/* Deal Info */}
            <div className="space-y-4">
              <h1 className="text-3xl font-light tracking-tight">{deal.title}</h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {deal.description}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This investment opportunity offers exposure to {deal.category.toLowerCase()} sector 
                with carefully vetted projects and experienced management teams. Our due diligence 
                process ensures that only the highest quality opportunities are presented to our investors.
              </p>
            </div>

            <Separator />

            {/* Investment Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="shadow-card">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Target</p>
                    <p className="font-medium">{formatCurrency(deal.targetAmount)}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="p-2 rounded-full bg-green-100">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Raised</p>
                    <p className="font-medium">{formatCurrency(deal.raisedAmount)}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="p-2 rounded-full bg-blue-100">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Investors</p>
                    <p className="font-medium">{Math.floor(Math.random() * 100) + 50}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="p-2 rounded-full bg-orange-100">
                    <Clock className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Time Left</p>
                    <p className="font-medium">{deal.deadline}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Documents */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {["Investment Prospectus", "Financial Reports", "Legal Terms", "Risk Disclosure"].map((doc) => (
                  <div key={doc} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                    <span className="text-sm">{doc}</span>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-gold-light">
                      Download
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Investment Summary */}
          <div className="space-y-6">
            <Card className="shadow-card sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Investment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Table>
                  <TableBody className="text-xs">
                    {investmentSummaryRows.map((row) => (
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

                <Separator />

                <Button 
                  onClick={handleInvestClick}
                  className="w-full bg-primary text-primary-foreground hover:bg-gold-light hover:shadow-gold transition-all text-lg py-6"
                >
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Invest Now
                </Button>

                {!kycCompleted && (
                  <p className="text-xs text-center text-muted-foreground">
                    <AlertTriangle className="inline h-3 w-3 mr-1" />
                    KYC verification required before investing
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

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
    </DashboardLayout>
  );
};

export default DealDetail;
