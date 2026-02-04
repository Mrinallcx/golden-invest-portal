import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DealCard } from "@/components/deals/DealCard";
import { mockDeals } from "@/data/mockDeals";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-light tracking-tight">Discover Deals</h1>
            <p className="text-muted-foreground mt-1">
              Explore investment opportunities across various sectors
            </p>
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search deals..." 
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {mockDeals.map((deal, index) => (
            <div 
              key={deal.id} 
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <DealCard deal={deal} />
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
