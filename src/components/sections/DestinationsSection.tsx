import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/SectionHeading';
import { DestinationCard } from '@/components/DestinationCard';
import { Button } from '@/components/ui/button';

// Import destination images
import destSajek from '@/assets/dest-sajek.jpg';
import destSundarbans from '@/assets/dest-sundarbans.jpg';
import destDubai from '@/assets/dest-dubai.jpg';
import destBali from '@/assets/dest-bali.jpg';
import destBangkok from '@/assets/dest-bangkok.jpg';
import heroBeach from '@/assets/hero-beach.jpg';

const destinations = {
  domestic: [
    {
      image: heroBeach,
      title: "Cox's Bazar",
      location: 'Chittagong, BD',
      rating: 4.9,
      duration: '3 Days, 2 Nights',
      price: '৳12,999',
      category: 'domestic' as const,
    },
    {
      image: destSajek,
      title: 'Sajek Valley',
      location: 'Rangamati, BD',
      rating: 4.8,
      duration: '2 Days, 1 Night',
      price: '৳8,500',
      category: 'domestic' as const,
    },
    {
      image: destSundarbans,
      title: 'Sundarbans',
      location: 'Khulna, BD',
      rating: 4.7,
      duration: '3 Days, 2 Nights',
      price: '৳15,000',
      category: 'domestic' as const,
    },
  ],
  international: [
    {
      image: destDubai,
      title: 'Dubai Adventure',
      location: 'UAE',
      rating: 4.9,
      duration: '5 Days, 4 Nights',
      price: '৳85,000',
      category: 'international' as const,
    },
    {
      image: destBali,
      title: 'Bali Paradise',
      location: 'Indonesia',
      rating: 4.8,
      duration: '6 Days, 5 Nights',
      price: '৳75,000',
      category: 'international' as const,
    },
    {
      image: destBangkok,
      title: 'Bangkok Explorer',
      location: 'Thailand',
      rating: 4.7,
      duration: '4 Days, 3 Nights',
      price: '৳45,000',
      category: 'international' as const,
    },
  ],
};

export const DestinationsSection = () => {
  const [activeTab, setActiveTab] = useState<'domestic' | 'international'>('domestic');

  return (
    <section id="destinations" className="py-24 bg-gradient-hero">
      <div className="container mx-auto px-6">
        <SectionHeading
          subtitle="Where To Go"
          title="Popular Destinations"
          description="Explore our handpicked destinations that offer unforgettable experiences. From serene beaches to adventurous mountains."
        />

        {/* Tab Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          {(['domestic', 'international'] as const).map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? 'default' : 'outline'}
              className={`capitalize px-8 ${
                activeTab === tab
                  ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                  : 'border-border/30 text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab} Tours
            </Button>
          ))}
        </div>

        {/* Destination Cards */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {destinations[activeTab].map((dest, index) => (
            <DestinationCard key={dest.title} {...dest} delay={index * 0.1} />
          ))}
        </motion.div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
          >
            View All Destinations
          </Button>
        </div>
      </div>
    </section>
  );
};
