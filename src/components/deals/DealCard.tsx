import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, TrendingUp, AlertTriangle, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

export interface Deal {
  id: string;
  title: string;
  category: string;
  description: string;
  targetAmount: number;
  raisedAmount: number;
  minInvestment: number;
  expectedReturn: string;
  riskLevel: "Low" | "Medium" | "High";
  deadline: string;
  imageUrl?: string;
}

interface DealCardProps {
  deal: Deal;
}

const riskColors = {
  Low: "bg-green-100 text-green-800 border-green-200",
  Medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  High: "bg-red-100 text-red-800 border-red-200",
};

export function DealCard({ deal }: DealCardProps) {
  const progress = (deal.raisedAmount / deal.targetAmount) * 100;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="group overflow-hidden shadow-card hover:shadow-gold transition-all duration-300 animate-fade-in">
      <div className="h-40 bg-gradient-to-br from-muted to-secondary relative overflow-hidden">
        {deal.imageUrl ? (
          <img src={deal.imageUrl} alt={deal.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl font-light text-muted-foreground/30">{deal.title.charAt(0)}</span>
          </div>
        )}
        <Badge className="absolute top-3 left-3 bg-background/90 text-foreground border-0">
          {deal.category}
        </Badge>
      </div>
      
      <CardHeader className="pb-2">
        <h3 className="text-lg font-medium line-clamp-1">{deal.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{deal.description}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground text-xs">Min. Investment</p>
              <p className="font-medium">{formatCurrency(deal.minInvestment)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <div>
              <p className="text-muted-foreground text-xs">Expected Return</p>
              <p className="font-medium text-primary">{deal.expectedReturn}</p>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          asChild 
          className="w-full bg-cta text-cta-foreground hover:bg-cta/90 hover:shadow-gold transition-all group-hover:shadow-gold"
        >
          <Link to={`/deals/${deal.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
