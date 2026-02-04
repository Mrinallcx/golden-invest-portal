import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { mockDeals } from "@/data/mockDeals";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Clock, 
  TrendingUp, 
  Users, 
  Target, 
  FileText,
  AlertTriangle,
  DollarSign,
  CheckCircle
} from "lucide-react";
import { KYCModal } from "@/components/kyc/KYCModal";
import { PaymentModal } from "@/components/payment/PaymentModal";

const riskColors = {
  Low: "bg-green-100 text-green-800 border-green-200",
  Medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  High: "bg-red-100 text-red-800 border-red-200",
};

const DealDetail = () => {
  const { id } = useParams<{ id: string }>();
  const deal = mockDeals.find((d) => d.id === id);
  
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

  const progress = (deal.raisedAmount / deal.targetAmount) * 100;
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
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-8xl font-light text-muted-foreground/20">
                  {deal.title.charAt(0)}
                </span>
              </div>
              <Badge className="absolute top-4 left-4 bg-background/90 text-foreground border-0">
                {deal.category}
              </Badge>
              <Badge 
                variant="outline" 
                className={`absolute top-4 right-4 ${riskColors[deal.riskLevel]}`}
              >
                {deal.riskLevel} Risk
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

          {/* Sidebar - Investment CTA */}
          <div className="space-y-6">
            <Card className="shadow-card sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Investment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{progress.toFixed(0)}%</span>
                  </div>
                  <Progress value={progress} className="h-3 bg-muted" />
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(deal.raisedAmount)} of {formatCurrency(deal.targetAmount)} raised
                  </p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Min. Investment</span>
                    <span className="font-medium">{formatCurrency(deal.minInvestment)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Max. Investment</span>
                    <span className="font-medium">{formatCurrency(deal.targetAmount * 0.1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expected Return</span>
                    <span className="font-medium text-primary">{deal.expectedReturn}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Key Highlights
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Vetted by our investment team</li>
                    <li>• Quarterly dividend payouts</li>
                    <li>• Fully transparent reporting</li>
                    <li>• Exit options available</li>
                  </ul>
                </div>

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
