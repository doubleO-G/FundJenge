import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import logoImage from "@assets/JK-Logo-Dark-1536x614_1761228357506.png";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/donate", label: "Donate" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-[hsl(145,40%,75%)]/95 dark:bg-[hsl(145,40%,25%)]/95 backdrop-blur-md border-b shadow-sm"
          : "bg-[hsl(145,40%,75%)] dark:bg-[hsl(145,40%,25%)]"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img 
              src={logoImage} 
              alt="JENGE Kulture" 
              className={cn(
                "h-8 w-auto transition-opacity",
                isScrolled ? "opacity-100" : "opacity-90"
              )}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location === link.href
                    ? "text-primary"
                    : "text-foreground"
                )} 
                data-testid={`link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
            
            <ThemeToggle />
            
            <Link href="/donate">
              <Button variant="default" size="default" data-testid="button-donate-nav">
                Donate Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground"
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t bg-[hsl(145,40%,70%)] dark:bg-[hsl(145,40%,20%)]">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block px-3 py-2 text-base font-medium rounded-md transition-colors",
                    location === link.href
                      ? "bg-accent text-accent-foreground"
                      : "text-foreground hover:bg-accent"
                  )}
                  data-testid={`link-mobile-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/donate">
                <Button
                  variant="default"
                  className="w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid="button-donate-mobile"
                >
                  Donate Now
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
