import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { CampaignProgress } from "@/components/campaign-progress";
import { DonationPathwayCard } from "@/components/donation-pathway-card";
import { BuilderTierCard } from "@/components/builder-tier-card";
import { StatsSection } from "@/components/stats-section";
import { ImpactStoryCard } from "@/components/impact-story-card";
import { FAQSection } from "@/components/faq-section";
import { ContactForm } from "@/components/contact-form";
import { ArrowRight, Target, Users, Sparkles, TrendingUp } from "lucide-react";
import { useCampaignStats } from "@/hooks/use-campaign-stats";
import { useToast } from "@/hooks/use-toast";
import creativePractitionersImg from "@assets/jenge-creative-practitioners.png";
import freelancersImg from "@assets/jenge-freelancers.png";
import collectiveImg from "@assets/jenge-collective.png";
import youthWorkspace1 from "@assets/stock_images/african_youth_workin_b645948b.jpg";
import youthWorkspace2 from "@assets/stock_images/african_youth_workin_52b03b68.jpg";
import youthCollaboration from "@assets/stock_images/kenyan_young_entrepr_e258f0ae.jpg";
import youthEntrepreneurs from "@assets/stock_images/kenyan_young_entrepr_923deee8.jpg";
import youthWorkspace3 from "@assets/stock_images/african_youth_workin_cb563ccb.jpg";

export default function Home() {
  const [location] = useLocation();
  const { toast } = useToast();
  const { data: campaignStats } = useCampaignStats();

  // Handle payment success/failure notifications
  useEffect(() => {
    const hash = window.location.hash;
    const searchIndex = hash.indexOf('?');
    const search = searchIndex >= 0 ? hash.substring(searchIndex) : '';
    const params = new URLSearchParams(search);
    const paymentStatus = params.get('payment');
    
    if (paymentStatus === 'success') {
      toast({
        title: "Donation Successful!",
        description: "Thank you for your generous contribution to the JENGE Impact Fund. You'll receive a confirmation email shortly.",
      });
      window.location.hash = '/';
    } else if (paymentStatus === 'failed') {
      toast({
        title: "Payment Failed",
        description: "There was an issue processing your payment. Please try again or contact support.",
        variant: "destructive",
      });
      window.location.hash = '/';
    }
  }, [location, toast]);

  // Use API data or fallback to default
  const campaignData = {
    pledged: campaignStats?.pledged || 1520000,
    goal: campaignStats?.goal || 20000000,
    builders: campaignStats?.builders || 25,
    deadline: campaignStats?.deadline ? new Date(campaignStats.deadline) : new Date('2027-12-31'),
  };

  const donationPathways = [
    {
      title: "Become a Builder",
      description: "Join our long-term campaign by making an annual pledge for 15 years to help build the KES 1.2 billion endowment.",
      imageUrl: creativePractitionersImg,
      commitment: {
        minimumContribution: "KES 1,000/year",
        timeCommitment: "15 Years",
      },
      benefits: [
        "Contribute to building a sustainable endowment",
        "Receive quarterly impact updates",
        "Recognition as a Builder in our community",
      ],
      ctaText: "Join the Builders",
      ctaLink: "/donate?type=builder",
      featured: true,
    },
    {
      title: "Fund a Program",
      description: "Make a one-time contribution towards a specific program implemented by JENGE Kulture.",
      imageUrl: youthCollaboration,
      commitment: {
        minimumContribution: "No minimum",
        timeCommitment: "One-time",
      },
      benefits: [
        "Direct impact on specific initiatives",
        "Choose your program focus area",
        "Receive program updates",
      ],
      ctaText: "Fund a Program",
      ctaLink: "/donate?type=program",
    },
    {
      title: "Partner With Us",
      description: "Collaborate with us as a corporate or institutional partner in support of the JENGE Impact Fund.",
      imageUrl: collectiveImg,
      commitment: {
        minimumContribution: "Custom",
        timeCommitment: "Flexible",
      },
      benefits: [
        "Strategic partnership opportunities",
        "Co-create impact initiatives",
        "Brand alignment with youth empowerment",
      ],
      ctaText: "Explore Partnership",
      ctaLink: "/donate?type=partner",
    },
  ];

  const impactStories = [
    {
      title: "Nairobi Creative Collective: 50 Artists Find Sustainable Income",
      excerpt: "Through solidarity-driven support, this collective of young artists in Nairobi secured workshop space, equipment, and market access, leading to sustainable livelihoods for all members.",
      imageUrl: freelancersImg,
    },
    {
      title: "Youth Cooperative Transforms Kisumu's Fashion Scene",
      excerpt: "Twenty young fashion designers pooled resources to create a shared production facility, reducing costs and increasing market reach. They now export to three countries.",
      imageUrl: youthWorkspace1,
    },
    {
      title: "Digital Creators Hub Supports 100+ Young Professionals",
      excerpt: "A solidarity enterprise in Mombasa provides shared resources, training, and collaborative opportunities for young digital creators, videographers, and content producers.",
      imageUrl: youthWorkspace2,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={youthEntrepreneurs}
            alt="Kenyan youth entrepreneurs working together"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
              With your support, we can help{" "}
              <span className="text-chart-3">500,000 youth</span> achieve sustainable income by 2040
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
              Join the WE BUILD campaign to create a KES 1.2 billion endowment fund supporting solidarity-driven enterprises in Kenya's creative economy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/about">
                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20" data-testid="button-hero-learn-more">
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/donate">
                <Button size="lg" variant="default" data-testid="button-hero-get-started">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Campaign Progress */}
      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CampaignProgress {...campaignData} />
        </div>
      </section>

      {/* Donation Pathways */}
      <section className="py-16 md:py-24 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Choose Your Giving Journey
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your contribution helps unlock economic opportunities for young people across Kenya
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {donationPathways.map((pathway, index) => (
              <DonationPathwayCard key={index} {...pathway} />
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <StatsSection />

      {/* Builder Tiers */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              The "WE BUILD" Campaign
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Choose a builder tier and commit to annual donations for 15 years. Together, we'll build a KES 1.2 billion endowment supporting 500,000 youth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <BuilderTierCard tierKey="palladium" />
            <BuilderTierCard tierKey="platinum" />
            <BuilderTierCard tierKey="gold" />
            <BuilderTierCard tierKey="diamond" />
            <BuilderTierCard tierKey="silver" />
            <BuilderTierCard tierKey="bronze" />
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              We're mobilizing 55,000 builders to create lasting socio-economic impact
            </p>
            <Link href="/donate">
              <Button size="lg" data-testid="button-view-all-tiers">
                View All Tiers & Donate
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SESS Model */}
      <section className="py-16 md:py-24 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Solidarity & Cooperation - An Alternative Model
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              JENGE Impact Fund leverages the SESS Impact Model to achieve sustainable and scalable socio-economic impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card p-6 rounded-lg hover-elevate transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Solidarity</h3>
              <p className="text-sm text-muted-foreground">
                Building collective strength through shared purpose and mutual support among youth enterprises
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg hover-elevate transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
              <p className="text-sm text-muted-foreground">
                Supporting cooperatives and solidarity-driven businesses that create sustainable livelihoods
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg hover-elevate transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
              <p className="text-sm text-muted-foreground">
                Ensuring long-term impact through endowment-based funding and scalable solutions
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg hover-elevate transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Systems</h3>
              <p className="text-sm text-muted-foreground">
                Creating interconnected support systems that amplify impact across communities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stories */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Stories of Solidarity & Cooperation
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how collective action is transforming lives across Kenya's creative economy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {impactStories.map((story, index) => (
              <ImpactStoryCard key={index} {...story} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Contact Form */}
      <section className="py-16 md:py-24 bg-accent/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-muted-foreground">
              Complete the form below and our team will contact you within 48 hours
            </p>
          </div>

          <div className="bg-card p-6 md:p-8 rounded-lg border">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
