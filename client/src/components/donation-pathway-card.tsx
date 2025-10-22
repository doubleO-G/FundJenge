import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

interface DonationPathwayCardProps {
  title: string;
  description: string;
  imageUrl: string;
  commitment: {
    minimumContribution: string;
    timeCommitment: string;
  };
  benefits: string[];
  ctaText: string;
  ctaLink: string;
  featured?: boolean;
}

export function DonationPathwayCard({
  title,
  description,
  imageUrl,
  commitment,
  benefits,
  ctaText,
  ctaLink,
  featured = false,
}: DonationPathwayCardProps) {
  return (
    <Card className={`overflow-hidden hover-elevate transition-all duration-300 h-full flex flex-col ${featured ? 'ring-2 ring-primary' : ''}`}>
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {featured && (
          <Badge className="absolute top-4 right-4" variant="default">
            Most Popular
          </Badge>
        )}
      </div>

      <CardHeader>
        <CardTitle className="text-2xl font-serif">{title}</CardTitle>
        <CardDescription className="text-base leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Minimum</p>
              <p className="font-semibold text-foreground">{commitment.minimumContribution}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Commitment</p>
              <p className="font-semibold text-foreground">{commitment.timeCommitment}</p>
            </div>
          </div>

          <div className="space-y-2">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        <Link href={ctaLink} className="w-full">
          <Button variant={featured ? "default" : "outline"} className="w-full group" data-testid={`button-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            {ctaText}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
