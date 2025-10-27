import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { builderTiers, type BuilderTierKey } from "@shared/schema";
import { Loader2, Check, Info } from "lucide-react";
import { ImpactStoryCard } from "@/components/impact-story-card";
import collectiveImg from "@assets/jenge-collective.png";
import youthWorkspace1 from "@assets/stock_images/african_youth_workin_b645948b.jpg";
import youthCollaboration from "@assets/stock_images/kenyan_young_entrepr_e258f0ae.jpg";
import bronzeBadge from "@assets/Bronze_1761595836750.png";
import silverBadge from "@assets/Silver_1761595836747.png";
import goldBadge from "@assets/Gold_1761595836750.png";
import diamondBadge from "@assets/Diamond_1761595836749.png";
import platinumBadge from "@assets/Platinum_1761595836748.png";
import palladiumBadge from "@assets/Palladium_1761595836748.png";

const donationSchema = z.object({
  donorName: z.string().min(2, "Name must be at least 2 characters"),
  donorEmail: z.string().email("Invalid email address"),
  amount: z.number().min(100, "Minimum donation is KES 100"),
  donationType: z.string(),
  builderTier: z.string().optional(),
  isRecurring: z.boolean().default(false),
});

type DonationFormData = z.infer<typeof donationSchema>;

export default function Donate() {
  const [location] = useLocation();
  const { toast } = useToast();
  const [selectedType, setSelectedType] = useState<string>("builder");
  const [selectedTier, setSelectedTier] = useState<BuilderTierKey | null>(null);
  const [customAmount, setCustomAmount] = useState<number | null>(null);

  const form = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      donorName: "",
      donorEmail: "",
      amount: selectedTier ? builderTiers[selectedTier].annualAmount : 1000,
      donationType: selectedType,
      builderTier: selectedTier || undefined,
      isRecurring: selectedType === 'builder',
    },
  });

  useEffect(() => {
    const hash = window.location.hash;
    const searchIndex = hash.indexOf('?');
    const search = searchIndex >= 0 ? hash.substring(searchIndex) : '';
    const params = new URLSearchParams(search);
    const type = params.get('type');
    const tier = params.get('tier') as BuilderTierKey;
    
    if (type) {
      setSelectedType(type);
      form.setValue('donationType', type);
      form.setValue('isRecurring', type === 'builder');
      
      if (type !== 'builder') {
        setSelectedTier(null);
        form.setValue('builderTier', undefined);
      }
    }
    
    if (tier && builderTiers[tier]) {
      setSelectedTier(tier);
      form.setValue('builderTier', tier);
      form.setValue('amount', builderTiers[tier].annualAmount);
      setCustomAmount(null);
    }
  }, [location, form]);

  const mutation = useMutation({
    mutationFn: async (data: DonationFormData) => {
      return new Promise((resolve, reject) => {
        const initializePaystack = () => {
          const PaystackPop = (window as any).PaystackPop;
          if (!PaystackPop) {
            reject(new Error("Paystack failed to load. Please refresh and try again."));
            return;
          }

          const handler = new PaystackPop();
          handler.newTransaction({
            key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_xxxxx',
            email: data.donorEmail,
            amount: data.amount * 100,
            currency: 'KES',
            ref: `JENGE_${Date.now()}`,
            metadata: {
              custom_fields: [
                {
                  display_name: "Donor Name",
                  variable_name: "donor_name",
                  value: data.donorName
                },
                {
                  display_name: "Donation Type",
                  variable_name: "donation_type",
                  value: data.donationType
                },
                {
                  display_name: "Builder Tier",
                  variable_name: "builder_tier",
                  value: data.builderTier || "N/A"
                }
              ]
            },
            onClose: function() {
              reject(new Error("Payment cancelled"));
            },
            onSuccess: function(response: any) {
              resolve(response);
              toast({
                title: "Payment Successful!",
                description: `Thank you ${data.donorName} for your ${data.donationType === 'builder' ? 'builder commitment' : 'donation'}! Reference: ${response.reference}`,
              });
            },
          });
        };

        const loadPaystackScript = () => {
          if ((window as any).PaystackPop) {
            initializePaystack();
            return;
          }

          const script = document.createElement('script');
          script.src = 'https://js.paystack.co/v2/inline.js';
          script.async = true;
          
          const timeout = setTimeout(() => {
            script.remove();
            reject(new Error("Paystack script timed out. Please check your connection and try again."));
          }, 10000);

          script.onload = () => {
            clearTimeout(timeout);
            let attempts = 0;
            const checkLoaded = () => {
              if ((window as any).PaystackPop) {
                initializePaystack();
              } else if (attempts < 30) {
                attempts++;
                setTimeout(checkLoaded, 100);
              } else {
                reject(new Error("Paystack failed to initialize. Please refresh and try again."));
              }
            };
            checkLoaded();
          };

          script.onerror = () => {
            clearTimeout(timeout);
            script.remove();
            reject(new Error("Failed to load Paystack. Please check your internet connection."));
          };

          document.body.appendChild(script);
        };

        loadPaystackScript();
      });
    },
    onSuccess: () => {
      form.reset();
      setSelectedTier(null);
      setCustomAmount(null);
    },
    onError: (error: any) => {
      if (error.message !== "Payment cancelled") {
        toast({
          title: "Payment Failed",
          description: "There was an error processing your payment. Please try again.",
          variant: "destructive",
        });
      }
    },
  });

  const onSubmit = (data: DonationFormData) => {
    mutation.mutate(data);
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    form.setValue('donationType', type);
    form.setValue('isRecurring', type === 'builder');
    
    if (type !== 'builder') {
      setSelectedTier(null);
      form.setValue('builderTier', undefined);
    }
  };

  const handleTierChange = (tier: BuilderTierKey) => {
    setSelectedTier(tier);
    form.setValue('builderTier', tier);
    form.setValue('amount', builderTiers[tier].annualAmount);
    setCustomAmount(null);
  };

  const tierBadges: Record<BuilderTierKey, string> = {
    bronze: bronzeBadge,
    silver: silverBadge,
    gold: goldBadge,
    diamond: diamondBadge,
    platinum: platinumBadge,
    palladium: palladiumBadge,
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const impactStories = [
    {
      title: "Your Support Transforms Lives",
      excerpt: "Every contribution helps young creators access resources, training, and market opportunities that lead to sustainable income.",
      imageUrl: youthCollaboration,
    },
    {
      title: "Building Stronger Communities",
      excerpt: "Solidarity-driven enterprises create ripple effects, strengthening entire communities through shared success.",
      imageUrl: collectiveImg,
    },
    {
      title: "Sustainable Impact for Generations",
      excerpt: "Your endowment contribution creates lasting change that will benefit Kenya's youth for decades to come.",
      imageUrl: youthWorkspace1,
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Get Started with Your Contribution
            </h1>
            <p className="text-lg text-muted-foreground">
              Choose how you'd like to support the JENGE Impact Fund and help transform the lives of 500,000 Kenyan youth
            </p>
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <Card className="p-6 md:p-8">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-2xl font-serif">Make Your Contribution</CardTitle>
                  <CardDescription>
                    Select your donation type and complete the secure payment process
                  </CardDescription>
                </CardHeader>

                <CardContent className="px-0 pb-0">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      {/* Donation Type Selection */}
                      <div className="space-y-3">
                        <label className="text-sm font-medium">Choose Your Giving Path</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <Button
                            type="button"
                            variant={selectedType === 'builder' ? 'default' : 'outline'}
                            className="h-auto py-4 px-4 flex flex-col items-start"
                            onClick={() => handleTypeChange('builder')}
                            data-testid="button-type-builder"
                          >
                            <span className="font-semibold mb-1">Become a Builder</span>
                            <span className="text-xs opacity-90">15-year commitment</span>
                          </Button>

                          <Button
                            type="button"
                            variant={selectedType === 'program' ? 'default' : 'outline'}
                            className="h-auto py-4 px-4 flex flex-col items-start"
                            onClick={() => handleTypeChange('program')}
                            data-testid="button-type-program"
                          >
                            <span className="font-semibold mb-1">Fund a Program</span>
                            <span className="text-xs opacity-90">One-time donation</span>
                          </Button>

                          <Button
                            type="button"
                            variant={selectedType === 'partner' ? 'default' : 'outline'}
                            className="h-auto py-4 px-4 flex flex-col items-start"
                            onClick={() => handleTypeChange('partner')}
                            data-testid="button-type-partner"
                          >
                            <span className="font-semibold mb-1">Partner With Us</span>
                            <span className="text-xs opacity-90">Collaboration</span>
                          </Button>
                        </div>
                      </div>

                      {/* Builder Tier Selection */}
                      {selectedType === 'builder' && (
                        <div className="space-y-3">
                          <label className="text-sm font-medium">Select Your Builder Tier</label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {Object.entries(builderTiers).map(([key, tier]) => (
                              <Button
                                key={key}
                                type="button"
                                variant={selectedTier === key ? 'default' : 'outline'}
                                className="h-auto py-3 px-3 flex flex-col items-center"
                                onClick={() => handleTierChange(key as BuilderTierKey)}
                                data-testid={`button-select-${key}`}
                              >
                                <img 
                                  src={tierBadges[key as BuilderTierKey]} 
                                  alt={tier.name}
                                  className="w-12 h-12 mb-2"
                                />
                                <span className="text-xs font-semibold mb-1">{tier.name.split(' ')[0]}</span>
                                <span className="text-xs opacity-90">{formatCurrency(tier.annualAmount)}/yr</span>
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Personal Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="donorName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} data-testid="input-donor-name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="donorEmail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="john@example.com" {...field} data-testid="input-donor-email" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Amount */}
                      <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Donation Amount (KES)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="1000"
                                {...field}
                                onChange={(e) => {
                                  const value = parseFloat(e.target.value);
                                  field.onChange(value);
                                  setCustomAmount(value);
                                }}
                                data-testid="input-amount"
                              />
                            </FormControl>
                            <FormDescription>
                              {selectedType === 'builder' && selectedTier
                                ? `Suggested: ${formatCurrency(builderTiers[selectedTier].annualAmount)} annually for your selected tier`
                                : 'Enter any amount (minimum KES 100)'}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Submit Button */}
                      <div className="pt-4">
                        <Button
                          type="submit"
                          size="lg"
                          className="w-full"
                          disabled={mutation.isPending}
                          data-testid="button-proceed-payment"
                        >
                          {mutation.isPending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                          {mutation.isPending ? "Processing..." : "Proceed to Secure Payment"}
                        </Button>
                        <p className="text-xs text-center text-muted-foreground mt-3">
                          Secure payment powered by Paystack
                        </p>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Summary Card */}
              <Card className="p-6 bg-accent/30">
                <h3 className="font-semibold text-lg mb-4">Your Impact</h3>
                <div className="space-y-3">
                  {selectedType === 'builder' && selectedTier && (
                    <>
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-sm text-muted-foreground">Builder Tier</span>
                        <Badge variant="secondary">{builderTiers[selectedTier].name.split(' ')[0]}</Badge>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-sm text-muted-foreground">Annual Contribution</span>
                        <span className="font-semibold">{formatCurrency(builderTiers[selectedTier].annualAmount)}</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-sm text-muted-foreground">15-Year Total</span>
                        <span className="font-bold text-primary">{formatCurrency(builderTiers[selectedTier].annualAmount * 15)}</span>
                      </div>
                    </>
                  )}
                  
                  <div className="pt-3 space-y-2">
                    <div className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">Quarterly impact reports</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">Support solidarity enterprises</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">Tax-deductible receipt</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Security Info */}
              <Card className="p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Info className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Secure Payment</h4>
                    <p className="text-sm text-muted-foreground">
                      All transactions are processed securely through Paystack. Your payment information is encrypted and never stored on our servers.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* See Your Contribution in Action */}
      <section className="py-16 md:py-24 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              See Your Contribution in Action
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your generosity creates real, measurable impact in the lives of young Kenyans
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {impactStories.map((story, index) => (
              <ImpactStoryCard key={index} {...story} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
