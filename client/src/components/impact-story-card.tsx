import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ImpactStoryCardProps {
  title: string;
  excerpt: string;
  imageUrl: string;
}

export function ImpactStoryCard({ title, excerpt, imageUrl }: ImpactStoryCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate transition-all duration-300 group">
      <div className="relative h-56 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <CardHeader>
        <CardTitle className="text-xl font-serif line-clamp-2">{title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <CardDescription className="text-sm leading-relaxed line-clamp-3">
          {excerpt}
        </CardDescription>

        <Button variant="ghost" className="group/btn p-0 h-auto" data-testid={`button-read-story-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          <span className="text-sm font-medium text-primary">Read More</span>
          <ArrowRight className="ml-1 h-4 w-4 text-primary transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  );
}
