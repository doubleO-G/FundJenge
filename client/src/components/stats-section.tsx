import { useEffect, useRef, useState } from "react";
import { Users, TrendingDown, Briefcase, PieChart } from "lucide-react";

interface Stat {
  icon: React.ElementType;
  value: string;
  label: string;
  color: string;
}

const stats: Stat[] = [
  {
    icon: Users,
    value: "75%",
    label: "Kenyan youth below age 35",
    color: "text-chart-1",
  },
  {
    icon: TrendingDown,
    value: "67%",
    label: "Youth unemployment rate",
    color: "text-destructive",
  },
  {
    icon: Briefcase,
    value: "703K",
    label: "Jobs in informal sector",
    color: "text-chart-3",
  },
  {
    icon: PieChart,
    value: "5%",
    label: "Creative economy GDP contribution",
    color: "text-chart-4",
  },
];

function AnimatedNumber({ value, className }: { value: string; className?: string }) {
  const [displayValue, setDisplayValue] = useState("0");
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Check if it's a percentage or number with K
    if (value.endsWith('%')) {
      const targetNum = parseInt(value);
      let current = 0;
      const increment = targetNum / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= targetNum) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current) + '%');
        }
      }, 20);
      return () => clearInterval(timer);
    } else if (value.endsWith('K')) {
      const targetNum = parseInt(value);
      let current = 0;
      const increment = targetNum / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= targetNum) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current) + 'K');
        }
      }, 20);
      return () => clearInterval(timer);
    } else {
      setDisplayValue(value);
    }
  }, [isVisible, value]);

  return <div ref={ref} className={className}>{displayValue}</div>;
}

export function StatsSection() {
  return (
    <section className="py-16 md:py-24 bg-accent/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Too many young people are Talented, Skilled, and Well-Educated, but Unemployed
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            The youth unemployment crisis in Kenya demands urgent, innovative solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center p-6 rounded-lg bg-card hover-elevate transition-all duration-300"
                data-testid={`stat-card-${index}`}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent mb-4 ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <AnimatedNumber
                  value={stat.value}
                  className="text-4xl md:text-5xl font-bold font-serif mb-2"
                />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
