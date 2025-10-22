import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How is the JENGE Impact Fund different from other youth programs?",
    answer: "The JENGE Impact Fund focuses on solidarity-driven enterprises and cooperatives, emphasizing collective strength over individual support. We build sustainable systems that benefit entire communities of young creators and professionals in the creative economy.",
  },
  {
    question: "How do I become a Builder?",
    answer: "Choose a Builder tier that matches your capacity (from KES 1,000 to KES 25,000 annually), make a 15-year commitment, and complete the donation process. You'll receive quarterly updates on the impact of your contribution and recognition as a Builder supporting youth economic transformation.",
  },
  {
    question: "Can I make a one-time donation instead of a long-term pledge?",
    answer: "Yes! You can make a one-time donation to fund specific programs or support our operational expenses. While Builder pledges create sustained impact through our endowment, one-time donations help us meet immediate program needs.",
  },
  {
    question: "How will my donation be used?",
    answer: "Builder pledges contribute to our KES 1.2 billion endowment fund, which provides sustainable support for collectives, cooperatives, and solidarity enterprises. The endowment generates ongoing income to fund shared benefits, services, and resources that help young people achieve sustainable livelihoods.",
  },
  {
    question: "What is the SESS Impact Model?",
    answer: "SESS stands for Solidarity, Enterprise, Sustainability, and Systems. It's our strategic framework for catalyzing resilient and inclusive local economies. Each component builds on the previous one, creating a reinforcing loop that drives lasting socio-economic impact for Africa's youth.",
  },
  {
    question: "Can I partner with JENGE as an organization?",
    answer: "Absolutely! We welcome corporate and institutional partners who want to support youth economic empowerment. Contact us to discuss partnership opportunities, which can include program sponsorship, technical support, or collaborative initiatives.",
  },
  {
    question: "Will I receive tax benefits for my donation?",
    answer: "Tax implications depend on your local tax laws. We recommend consulting with a tax advisor in your jurisdiction. JENGE Kulture is registered as [registration details], and we can provide donation receipts for tax purposes.",
  },
  {
    question: "How can I track the impact of my contribution?",
    answer: "All donors receive quarterly impact reports showing how contributions are being used and the outcomes achieved. Builders receive detailed updates on endowment growth, enterprises supported, and youth beneficiaries reached.",
  },
];

export function FAQSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about supporting the JENGE Impact Fund
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card rounded-lg px-6 border"
              data-testid={`faq-item-${index}`}
            >
              <AccordionTrigger className="text-left font-medium hover:no-underline py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
