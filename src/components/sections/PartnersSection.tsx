import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/SectionHeading';

// Partner logos (using placeholder for demo)
const partners = [
  'Biman Bangladesh',
  'Emirates',
  'Qatar Airways',
  'Singapore Airlines',
  'Thai Airways',
  'Malaysian Airlines',
  'IndiGo',
  'US-Bangla',
];

export const PartnersSection = () => {
  return (
    <section className="py-20 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <SectionHeading
          subtitle="Our Partners"
          title="Trusted By Leading Brands"
          description="We collaborate with top airlines and hospitality partners to bring you the best travel experience."
        />
      </div>

      {/* Marquee Container */}
      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-secondary/30 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-secondary/30 to-transparent z-10" />

        {/* Marquee */}
        <motion.div
          className="flex gap-12"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={`${partner}-${index}`}
              className="flex-shrink-0 px-8 py-4 glass rounded-xl min-w-[200px] flex items-center justify-center"
            >
              <span className="font-display text-lg font-semibold text-foreground/70 whitespace-nowrap">
                {partner}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Certifications */}
      <div className="container mx-auto px-6 mt-16">
        <div className="flex flex-wrap justify-center gap-6 text-center">
          <div className="glass px-6 py-4 rounded-xl">
            <p className="text-xs text-muted-foreground mb-1">Registered With</p>
            <p className="font-semibold text-foreground">Govt. of Bangladesh</p>
          </div>
          <div className="glass px-6 py-4 rounded-xl">
            <p className="text-xs text-muted-foreground mb-1">Member Of</p>
            <p className="font-semibold text-foreground">TOAB</p>
          </div>
          <div className="glass px-6 py-4 rounded-xl">
            <p className="text-xs text-muted-foreground mb-1">Certified By</p>
            <p className="font-semibold text-foreground">TripAdvisor</p>
          </div>
          <div className="glass px-6 py-4 rounded-xl">
            <p className="text-xs text-muted-foreground mb-1">Secure Payment</p>
            <p className="font-semibold text-foreground">SSLCommerz</p>
          </div>
        </div>
      </div>
    </section>
  );
};
