import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter subscription logic would go here
  };

  return (
    <footer className="bg-card border-t mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary text-primary-foreground font-bold text-xl">
                J
              </div>
              <span className="font-serif font-bold text-lg">JENGE Impact Fund</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Building a KES 1.2 billion endowment fund to support 500,000 Kenyan youth achieve sustainable income through solidarity-driven enterprises.
            </p>
            <div className="flex space-x-3 mt-4">
              <Button variant="ghost" size="icon" className="h-9 w-9" data-testid="button-social-facebook">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9" data-testid="button-social-twitter">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9" data-testid="button-social-instagram">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9" data-testid="button-social-linkedin">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-base mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-home">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-about">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/donate">
                  <a className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-donate">Donate</a>
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-impact">Our Impact</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-base mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span className="text-sm text-muted-foreground">Nairobi, Kenya</span>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span className="text-sm text-muted-foreground">info@jengekulture.org</span>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span className="text-sm text-muted-foreground">+254 XXX XXX XXX</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-base mb-4">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Subscribe to receive updates on our progress and impact.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="Your email"
                className="h-9"
                data-testid="input-newsletter-email"
              />
              <Button type="submit" className="w-full" size="sm" data-testid="button-newsletter-subscribe">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2025 JENGE Kulture. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
