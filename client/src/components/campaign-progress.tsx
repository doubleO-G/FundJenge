import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";

interface CampaignProgressProps {
  pledged: number;
  goal: number;
  builders: number;
  deadline: Date;
}

export function CampaignProgress({ pledged, goal, builders, deadline }: CampaignProgressProps) {
  const [timeLeft, setTimeLeft] = useState({ years: 0, months: 0, days: 0 });
  const percentage = (pledged / goal) * 100;

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const diff = deadline.getTime() - now.getTime();
      
      if (diff > 0) {
        const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
        const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
        const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
        
        setTimeLeft({ years, months, days });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000 * 60 * 60); // Update every hour
    
    return () => clearInterval(interval);
  }, [deadline]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="p-6 md:p-8 bg-card">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Progress to Milestone 1</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl md:text-4xl font-bold font-serif text-foreground" data-testid="text-pledged-amount">
                {formatCurrency(pledged)}
              </span>
              <span className="text-lg text-muted-foreground">
                of {formatCurrency(goal)}
              </span>
            </div>
          </div>
          
          <div className="flex gap-6">
            <div>
              <p className="text-2xl md:text-3xl font-bold font-serif text-primary" data-testid="text-builder-count">
                {builders}
              </p>
              <p className="text-sm text-muted-foreground">Builders</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold font-serif text-primary" data-testid="text-time-left">
                {timeLeft.years}Y {timeLeft.months}M {timeLeft.days}D
              </p>
              <p className="text-sm text-muted-foreground">Time Left</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Progress value={percentage} className="h-3" data-testid="progress-campaign" />
          <p className="text-sm text-muted-foreground text-right">
            {percentage.toFixed(1)}% of Milestone 1 goal
          </p>
        </div>

        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Ultimate Goal:</span> KES 1.2 Billion endowment by 2040 to support 500,000 youth
          </p>
        </div>
      </div>
    </Card>
  );
}
