import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Twitter, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import logo from '@/assets/logo.jpeg';

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Destinations', href: '#destinations' },
  { name: 'Tour Packages', href: '#packages' },
  { name: 'About Us', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

const services = [
  'Domestic Tours',
  'International Tours',
  'Visa Assistance',
  'Flight Booking',
  'Hotel Reservation',
  'Group Tours',
];

const socials = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'Youtube' },
  { icon: Twitter, href: '#', label: 'Twitter' },
];

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-secondary/30 border-t border-border/30">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <img src={logo} alt="The Holiday" className="h-16 w-auto rounded-lg mb-6" />
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Experience the world with The Holiday International Tours & Travels Ltd. 
              Your trusted partner for unforgettable journeys across Bangladesh and beyond.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-display text-lg font-semibold text-foreground mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-display text-lg font-semibold text-foreground mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-muted-foreground text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="font-display text-lg font-semibold text-foreground mb-6">Contact Us</h3>
            <div className="space-y-4 mb-6">
              <a href="tel:+8801810100288" className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors text-sm">
                <Phone className="w-4 h-4" />
                <span>+880 1810-100288</span>
              </a>
              <a href="mailto:info@theholiday.com" className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors text-sm">
                <Mail className="w-4 h-4" />
                <span>info@theholiday.com</span>
              </a>
              <div className="flex items-start gap-3 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Dhanmondi, Dhaka-1205, Bangladesh</span>
              </div>
            </div>

            <h4 className="font-semibold text-foreground text-sm mb-3">Newsletter</h4>
            <div className="flex gap-2">
              <Input
                placeholder="Your email"
                className="bg-muted border-border/30 text-sm"
              />
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground shrink-0">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm text-center md:text-left">
            © 2025 The Holiday International Tours & Travels Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-accent transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow z-40"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
};
