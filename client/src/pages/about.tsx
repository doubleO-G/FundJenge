import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BuilderTierCard } from "@/components/builder-tier-card";
import { ArrowRight, Target, Users, Heart, Zap } from "lucide-react";
import youthEntrepreneurs from "@assets/stock_images/kenyan_young_entrepr_923deee8.jpg";

export default function About() {
  const builderTierStats = [
    { name: "Palladium Rock Builders", count: 500, annual: 25000 },
    { name: "Platinum Rock Builders", count: 500, annual: 20000 },
    { name: "Gold Rock Builders", count: 1250, annual: 10000 },
    { name: "Diamond Rock Builders", count: 5000, annual: 5000 },
    { name: "Silver Rock Builders", count: 12500, annual: 2000 },
    { name: "Bronze Rock Builders", count: 35000, annual: 1000 },
  ];

  const totalBuilders = builderTierStats.reduce((sum, tier) => sum + tier.count, 0);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
            Because 67% of Kenya's Youth are Unemployed
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            We are building a fund that will leverage the power of solidarity and cooperation to help reduce the rate of youth unemployment in Kenya.
          </p>
        </div>
      </section>

      {/* About JENGE Impact Fund */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                About JENGE Impact Fund
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  The JENGE Impact Fund is a long-term endowment established by JENGE Kulture to strengthen solidarity-driven systems supporting youth and youth-led enterprises in Kenya and across Africa.
                </p>
                <p>
                  It expands access to shared benefits, services and resources necessary for personal and business success, unlocking youth-driven social and economic transformation - especially in the creative economy.
                </p>
                <p>
                  The fund exists to bridge the gap particularly for youth-led collectives, cooperatives and solidarity-driven enterprises, who often lack flexible financing amid declining global aid.
                </p>
              </div>
            </div>

            <div className="relative">
              <img
                src={youthEntrepreneurs}
                alt="Kenyan youth entrepreneurs working together"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-foreground/10 rounded-full mb-6">
              <Target className="h-8 w-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              A Catalytic Fund on a Mission
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed opacity-95">
              Our 15-year target is to support <span className="font-bold">5,000 creative collectives, cooperatives or solidarity enterprises</span> - effectively helping <span className="font-bold">500,000 independent creators and professionals</span> achieve sustainable income.
            </p>
          </div>
        </div>
      </section>

      {/* SESS Impact Model */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              The SESS Impact Model
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              JENGE Kulture's strategic framework for catalyzing resilient and inclusive local economies across Africa through a solidarity-driven approach
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 lg:order-1">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">S</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Solidarity</h3>
                    <p className="text-muted-foreground">
                      Building collective strength through shared purpose, mutual support, and interconnected communities of young creators and professionals.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">E</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
                    <p className="text-muted-foreground">
                      Supporting cooperatives and solidarity-driven businesses that create sustainable livelihoods and economic opportunities for youth.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">S</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
                    <p className="text-muted-foreground">
                      Ensuring long-term impact through endowment-based funding, scalable solutions, and systems that can be replicated across Africa.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">S</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Systems</h3>
                    <p className="text-muted-foreground">
                      Creating interconnected support systems that amplify impact, fostering cultural influence and economic transformation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <Card className="p-8 bg-accent/30">
                <div className="aspect-square flex items-center justify-center">
                  <div className="relative w-64 h-64">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-48 h-48 rounded-full border-4 border-primary/20 flex items-center justify-center">
                        <div className="text-center">
                          <Zap className="h-12 w-12 text-primary mx-auto mb-2" />
                          <p className="text-sm font-semibold">SESS Model</p>
                          <p className="text-xs text-muted-foreground">Reinforcing Loop</p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">S</div>
                    </div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
                      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">E</div>
                    </div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">S</div>
                    </div>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2">
                      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">S</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* The WE BUILD Campaign */}
      <section className="py-16 md:py-24 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              The "WE BUILD" Fundraising Campaign
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Mobilizing {totalBuilders.toLocaleString()} builders to create a KES 1.2 billion endowment fund over 15 years
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12">
            <div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                The "WE BUILD" Fundraising Strategy seeks to mobilize 55,000 "builders" to build a KES 1.2 billion endowment fund over 15 years, supporting solidarity-driven enterprises in Kenya and Africa.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                By committing to annual donations, builders fuel shared support systems for young independent creators and professionals.
              </p>

              <div className="space-y-3">
                {builderTierStats.map((tier, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-card rounded-lg">
                    <div>
                      <p className="font-semibold">{tier.name}</p>
                      <p className="text-sm text-muted-foreground">{tier.count.toLocaleString()} people/organizations</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">KES {tier.annual.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">annually</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card className="p-6 bg-primary text-primary-foreground">
                <div className="flex items-start gap-4">
                  <Users className="h-8 w-8 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Join Us and Help Us Build</h3>
                    <p className="opacity-95">
                      Together, we can create lasting socio-economic impact for Kenya's youth. Every builder contribution counts toward our collective goal.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <Heart className="h-8 w-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Sustained Impact</h3>
                    <p className="text-muted-foreground">
                      Your 15-year commitment creates a sustainable foundation that will continue generating impact for generations to come.
                    </p>
                  </div>
                </div>
              </Card>

              <Link href="/donate">
                <Button size="lg" className="w-full" data-testid="button-become-builder">
                  Become a Builder
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About JENGE Kulture */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                About JENGE Kulture
              </h2>
            </div>

            <Card className="p-8 bg-accent/30">
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                JENGE Impact Fund is an initiative of <span className="font-semibold text-foreground">JENGE Kulture</span>, an organization dedicated to supporting solidarity-driven systems for youth empowerment in Africa.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Through innovative approaches and community-centered strategies, JENGE Kulture works to unlock economic opportunities for young people, particularly in the creative economy where traditional support systems often fall short.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 opacity-95">
            Join thousands of builders committed to transforming the lives of Kenya's youth through solidarity and cooperation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donate">
              <Button size="lg" variant="secondary" data-testid="button-cta-donate">
                Start Building Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg" variant="outline" className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
