import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
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
  /** Equity amount (e.g. "CHF 5,600,000") */
  equity: string;
  /** Type of investment (e.g. "Equity") */
  typeOfInvestment: string;
  /** Min. investment amount (e.g. "N/A" or "CHF 1,000") */
  minInvestmentAmount: string;
  /** Max. investment amount (e.g. "N/A" or "CHF 100,000") */
  maxInvestmentAmount: string;
  /** Issue date (e.g. "15 October 2025") */
  issueDate: string;
  /** Term (e.g. "12 months") */
  term: string;
}

interface DealCardProps {
  deal: Deal;
  comingSoon?: boolean;
}

const riskColors = {
  Low: "bg-green-100 text-green-800 border-green-200",
  Medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  High: "bg-red-100 text-red-800 border-red-200",
};

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-2 items-baseline text-xs">
      <span className="text-muted-foreground shrink-0">{label}</span>
      <span className="font-medium text-right text-foreground truncate" title={value}>
        {value}
      </span>
    </div>
  );
}

export function DealCard({ deal, comingSoon = false }: DealCardProps) {
  return (
    <Card className="group overflow-hidden shadow-card hover:shadow-gold transition-all duration-300 animate-fade-in h-full flex flex-col">
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
      
      <CardHeader className="pb-5">
        <h3 className="text-lg font-medium line-clamp-1">{deal.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{deal.description}</p>
      </CardHeader>
      
      <CardContent className="space-y-3 pt-0 flex-1">
        <div className="grid grid-cols-1 gap-2 text-xs">
          <InfoRow label="Equity" value={deal.equity} />
          <InfoRow label="Type of Investment" value={deal.typeOfInvestment} />
          <InfoRow label="Min. Investment Amount" value={deal.minInvestmentAmount} />
          <InfoRow label="Max. Investment Amount" value={deal.maxInvestmentAmount} />
          <InfoRow label="Issue Date" value={deal.issueDate} />
          <InfoRow label="Term" value={deal.term} />
        </div>
      </CardContent>
      
      <CardFooter>
        {comingSoon ? (
          <Button
            disabled
            className="w-full bg-muted text-muted-foreground cursor-not-allowed"
          >
            Coming soon
          </Button>
        ) : (
          <Button 
            asChild 
            className="w-full bg-cta text-cta-foreground hover:bg-cta/90 hover:shadow-gold transition-all group-hover:shadow-gold"
          >
            <Link to={`/deals/${deal.id}`}>View Details</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
