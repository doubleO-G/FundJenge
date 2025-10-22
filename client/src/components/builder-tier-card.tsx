import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { builderTiers, type BuilderTierKey } from "@shared/schema";
import { cn } from "@/lib/utils";

interface BuilderTierCardProps {
  tierKey: BuilderTierKey;
}

export function BuilderTierCard({ tierKey }: BuilderTierCardProps) {
  const tier = builderTiers[tierKey];
  const totalContribution = tier.annualAmount * 15;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className={cn("hover-elevate transition-all duration-300 h-full flex flex-col")}>
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-3xl">{tier.icon}</span>
          <Badge variant="secondary" className="text-xs">
            15 Years
          </Badge>
        </div>
        <div>
          <CardTitle className="text-xl font-serif mb-2">{tier.name}</CardTitle>
          <CardDescription className="text-sm">
            Annual commitment for building lasting impact
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-serif text-primary" data-testid={`text-annual-${tierKey}`}>
              {formatCurrency(tier.annualAmount)}
            </span>
            <span className="text-sm text-muted-foreground">/ year</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Total pledge: <span className="font-semibold text-foreground">{formatCurrency(totalContribution)}</span>
          </p>
        </div>

        <div className="space-y-2 pt-4">
          <div className="flex items-start gap-2">
            <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">Support solidarity-driven enterprises</p>
          </div>
          <div className="flex items-start gap-2">
            <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">Quarterly impact updates</p>
          </div>
          <div className="flex items-start gap-2">
            <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">Recognition as a Builder</p>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Link href={`/donate?tier=${tierKey}`} className="w-full">
          <Button variant="default" className="w-full" data-testid={`button-commit-${tierKey}`}>
            Commit Now
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
