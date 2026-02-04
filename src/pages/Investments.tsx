import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { mockInvestments, mockDocuments } from "@/data/mockInvestments";
import { mockDeals } from "@/data/mockDeals";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  TrendingUp,
  Clock,
  CheckCircle,
  FileText,
  Download,
} from "lucide-react";
import { Link } from "react-router-dom";

const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Active: "bg-green-100 text-green-800 border-green-200",
  Completed: "bg-blue-100 text-blue-800 border-blue-200",
};

const statusIcons = {
  Pending: Clock,
  Active: TrendingUp,
  Completed: CheckCircle,
};

const Investments = () => {
  const [activeTab, setActiveTab] = useState("portfolio");

  const totalInvested = mockInvestments.reduce((acc, inv) => acc + inv.investedAmount, 0);
  const totalValue = mockInvestments.reduce((acc, inv) => acc + inv.currentValue, 0);
  const totalReturns = totalValue - totalInvested;
  const overallReturnPercentage = ((totalReturns / totalInvested) * 100).toFixed(1);

  const activeCount = mockInvestments.filter((inv) => inv.status === "Active").length;
  const pendingCount = mockInvestments.filter((inv) => inv.status === "Pending").length;
  const completedCount = mockInvestments.filter((inv) => inv.status === "Completed").length;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-light tracking-tight">My Investments</h1>
          <p className="text-muted-foreground mt-1">Track your portfolio and returns</p>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div>
                <p className="text-sm text-muted-foreground">Total Invested</p>
                <p className="text-2xl font-light mt-1">{formatCurrency(totalInvested)}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div>
                <p className="text-sm text-muted-foreground">Current Value</p>
                <p className="text-2xl font-light mt-1">{formatCurrency(totalValue)}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div>
                <p className="text-sm text-muted-foreground">Total Returns</p>
                <p className="text-2xl font-light mt-1 text-green-600">
                  +{formatCurrency(totalReturns)}
                </p>
              </div>
              <p className="text-sm text-green-600 mt-2">+{overallReturnPercentage}% overall</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div>
                <p className="text-sm text-muted-foreground">Investments</p>
                <p className="text-2xl font-light mt-1">{mockInvestments.length}</p>
              </div>
              <div className="flex gap-3 mt-2 text-xs">
                <span className="text-green-600">{activeCount} Active</span>
                <span className="text-yellow-600">{pendingCount} Pending</span>
                <span className="text-blue-600">{completedCount} Done</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-muted">
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockInvestments.map((investment, index) => {
                const StatusIcon = statusIcons[investment.status];
                const isPositive = investment.returnPercentage >= 0;

                return (
                  <Card
                    key={investment.id}
                    className="shadow-card hover:shadow-gold transition-all animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-medium">{investment.dealTitle}</h3>
                          <p className="text-sm text-muted-foreground">{investment.category}</p>
                        </div>
                        <Badge variant="outline" className={statusStyles[investment.status]}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {investment.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Invested</p>
                          <p className="font-medium">{formatCurrency(investment.investedAmount)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Current Value</p>
                          <p className="font-medium">{formatCurrency(investment.currentValue)}</p>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Performance</span>
                          <span className={isPositive ? "text-green-600" : "text-red-600"}>
                            {isPositive ? "+" : ""}
                            {investment.returnPercentage}%
                          </span>
                        </div>
                        <Progress
                          value={Math.min(Math.abs(investment.returnPercentage) * 2, 100)}
                          className={`h-2 ${isPositive ? "[&>div]:bg-green-500" : "[&>div]:bg-red-500"}`}
                        />
                      </div>

                      <Separator className="my-4" />

                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          Invested on {new Date(investment.investedDate).toLocaleDateString()}
                        </p>
                        <Button asChild variant="ghost" size="sm" className="text-primary">
                          <Link to={`/deals/${mockDeals.find((d) => d.id === investment.dealId)?.slug ?? investment.dealId}`}>View Deal</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="documents" className="mt-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Investment Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockDocuments.map((doc) => {
                    const investment = mockInvestments.find((inv) => inv.id === doc.investmentId);
                    return (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-lg bg-background">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {investment?.dealTitle} • {new Date(doc.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="gap-2">
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Investments;
