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
  PieChart as PieChartIcon,
  AreaChart as AreaChartIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

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

/** Generate mock monthly performance data from investedDate to now */
function generatePerformanceData(
  investedAmount: number,
  currentValue: number,
  investedDate: string,
) {
  const start = new Date(investedDate);
  const now = new Date("2026-02-04"); // today
  const months: { month: string; value: number }[] = [];
  const totalMonths =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());
  const count = Math.max(totalMonths, 1);
  const diff = currentValue - investedAmount;

  for (let i = 0; i <= count; i++) {
    const d = new Date(start.getFullYear(), start.getMonth() + i, 1);
    const label = d.toLocaleString("default", { month: "short", year: "2-digit" });
    // smooth growth with slight random fluctuation
    const progress = i / count;
    const noise = i === count ? 0 : (Math.sin(i * 2.5) * 0.03 * investedAmount);
    const value = Math.round(investedAmount + diff * progress + noise);
    months.push({ month: label, value });
  }
  return months;
}

const PIE_COLORS = ["#D4AF37", "#e5e7eb"]; // gold for returns, gray for principal

const Investments = () => {
  const [activeTab, setActiveTab] = useState("portfolio");
  const [chartViews, setChartViews] = useState<Record<string, "chart" | "graph">>({ "inv-1": "graph" });

  const getChartView = (id: string) => chartViews[id] ?? "chart";
  const toggleChartView = (id: string) =>
    setChartViews((prev) => ({
      ...prev,
      [id]: prev[id] === "graph" ? "chart" : "graph",
    }));

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

  const formatCurrencyShort = (value: number) => {
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`;
    return `$${value}`;
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

                      {/* Chart / Graph Toggle — at top of card */}
                      {(() => {
                        const view = getChartView(investment.id);
                        const returns = investment.currentValue - investment.investedAmount;
                        const pieData = [
                          { name: "Returns", value: Math.max(returns, 0) },
                          { name: "Invested", value: investment.investedAmount },
                        ];
                        const performanceData = generatePerformanceData(
                          investment.investedAmount,
                          investment.currentValue,
                          investment.investedDate,
                        );
                        return (
                          <div className="mb-4 rounded-md bg-muted/30 p-3">
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-xs font-medium text-muted-foreground">
                                {view === "chart" ? "Allocation" : "Performance Over Time"}
                              </p>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 gap-1.5 text-xs px-2"
                                onClick={() => toggleChartView(investment.id)}
                              >
                                {view === "chart" ? (
                                  <>
                                    <AreaChartIcon className="h-3.5 w-3.5" />
                                    Graph
                                  </>
                                ) : (
                                  <>
                                    <PieChartIcon className="h-3.5 w-3.5" />
                                    Chart
                                  </>
                                )}
                              </Button>
                            </div>

                            {view === "chart" ? (
                              <div className="flex items-center gap-4">
                                <ResponsiveContainer width={120} height={120}>
                                  <PieChart>
                                    <Pie
                                      data={pieData}
                                      cx="50%"
                                      cy="50%"
                                      innerRadius={32}
                                      outerRadius={52}
                                      paddingAngle={3}
                                      dataKey="value"
                                      stroke="none"
                                    >
                                      {pieData.map((_, i) => (
                                        <Cell key={i} fill={PIE_COLORS[i]} />
                                      ))}
                                    </Pie>
                                    <Tooltip
                                      formatter={(val: number) => formatCurrency(val)}
                                    />
                                  </PieChart>
                                </ResponsiveContainer>
                                <div className="space-y-1.5 text-xs">
                                  <div className="flex items-center gap-2">
                                    <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: PIE_COLORS[0] }} />
                                    <span className="text-muted-foreground">Returns</span>
                                    <span className="font-medium text-green-600">
                                      {formatCurrency(Math.max(returns, 0))}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: PIE_COLORS[1] }} />
                                    <span className="text-muted-foreground">Invested</span>
                                    <span className="font-medium">
                                      {formatCurrency(investment.investedAmount)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <ResponsiveContainer width="100%" height={140}>
                                <AreaChart data={performanceData}>
                                  <defs>
                                    <linearGradient id={`grad-${investment.id}`} x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.3} />
                                      <stop offset="100%" stopColor="#D4AF37" stopOpacity={0.02} />
                                    </linearGradient>
                                  </defs>
                                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                  <XAxis
                                    dataKey="month"
                                    tick={{ fontSize: 10 }}
                                    axisLine={false}
                                    tickLine={false}
                                  />
                                  <YAxis
                                    tick={{ fontSize: 10 }}
                                    axisLine={false}
                                    tickLine={false}
                                    tickFormatter={formatCurrencyShort}
                                    width={40}
                                  />
                                  <Tooltip
                                    formatter={(val: number) => [formatCurrency(val), "Value"]}
                                    contentStyle={{ fontSize: 12, borderRadius: 8 }}
                                  />
                                  <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#D4AF37"
                                    strokeWidth={2}
                                    fill={`url(#grad-${investment.id})`}
                                    dot={{ r: 3, fill: "#D4AF37", strokeWidth: 0 }}
                                    activeDot={{ r: 5, fill: "#D4AF37", strokeWidth: 2, stroke: "#fff" }}
                                  />
                                </AreaChart>
                              </ResponsiveContainer>
                            )}
                          </div>
                        );
                      })()}

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

                      {/* Token Details */}
                      {investment.tokenDetails && (
                        <div className="mb-4 rounded-md bg-muted/50 p-3 space-y-2 text-xs">
                          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                            <div>
                              <p className="text-muted-foreground">Tokens Held</p>
                              <p className="font-medium">{investment.tokenDetails.tokensHeld}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Entry Price</p>
                              <p className="font-medium">{investment.tokenDetails.entryPrice}</p>
                            </div>
                            {investment.tokenDetails.currentPrice && (
                              <div>
                                <p className="text-muted-foreground">Current Price</p>
                                <p className="font-medium">{investment.tokenDetails.currentPrice}</p>
                              </div>
                            )}
                            {investment.tokenDetails.currentSpot && (
                              <div>
                                <p className="text-muted-foreground">Current Spot</p>
                                <p className="font-medium">{investment.tokenDetails.currentSpot}</p>
                              </div>
                            )}
                            {investment.tokenDetails.discountAtPurchase && (
                              <div>
                                <p className="text-muted-foreground">Discount at Purchase</p>
                                <p className="font-medium">{investment.tokenDetails.discountAtPurchase}</p>
                              </div>
                            )}
                            {investment.tokenDetails.interestAccrued && (
                              <div>
                                <p className="text-muted-foreground">Interest Accrued</p>
                                <p className="font-medium">{investment.tokenDetails.interestAccrued}</p>
                              </div>
                            )}
                            {investment.tokenDetails.estAnnualYield && (
                              <div>
                                <p className="text-muted-foreground">Est. Annual Yield</p>
                                <p className="font-medium">{investment.tokenDetails.estAnnualYield}</p>
                              </div>
                            )}
                            {investment.tokenDetails.nextDistribution && (
                              <div>
                                <p className="text-muted-foreground">Next Distribution</p>
                                <p className="font-medium">{investment.tokenDetails.nextDistribution}</p>
                              </div>
                            )}
                          </div>
                          {investment.tokenDetails.redemptionStart && (
                            <div>
                              <p className="text-muted-foreground">Redemption Start</p>
                              <p className="font-medium">{investment.tokenDetails.redemptionStart}</p>
                            </div>
                          )}
                          {investment.tokenDetails.totalDistributions && (
                            <div>
                              <p className="text-muted-foreground">Total Distributions Received</p>
                              <p className="font-medium">{investment.tokenDetails.totalDistributions}</p>
                            </div>
                          )}
                        </div>
                      )}

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
