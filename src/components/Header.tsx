import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.jpeg';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Destinations', href: '#destinations' },
  { name: 'Packages', href: '#packages' },
  { name: 'Services', href: '#services' },
  { name: 'About Us', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:block bg-secondary/50 border-b border-border/30">
        <div className="container mx-auto px-6 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <a href="tel:+8801810100288" className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
                <Phone className="w-4 h-4" />
                <span>+880 1810-100288</span>
              </a>
              <a href="mailto:info@theholiday.com" className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
                <Mail className="w-4 h-4" />
                <span>info@theholiday.com</span>
              </a>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Dhaka, Bangladesh</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <motion.header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass py-3' : 'bg-transparent py-4'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#home"
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <img src={logo} alt="The Holiday" className="h-12 w-auto rounded-lg" />
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-body text-sm font-medium text-foreground/80 hover:text-accent animated-underline transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6 glow-accent">
                Book Now
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-foreground p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden glass border-t border-border/30"
            >
              <nav className="container mx-auto px-6 py-4 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="font-body text-foreground/80 hover:text-accent transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold w-full mt-2">
                  Book Now
                </Button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};
