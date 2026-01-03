import { motion } from 'framer-motion';
import { MapPin, Star, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DestinationCardProps {
  image: string;
  title: string;
  location: string;
  rating: number;
  duration: string;
  price: string;
  category: 'domestic' | 'international';
  delay?: number;
}

export const DestinationCard = ({
  image,
  title,
  location,
  rating,
  duration,
  price,
  delay = 0,
}: DestinationCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10 }}
      className="group relative bg-gradient-card rounded-2xl overflow-hidden card-shadow border border-border/20"
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
        
        {/* Price Badge */}
        <div className="absolute top-4 right-4 glass px-3 py-1.5 rounded-full">
          <span className="text-accent font-semibold text-sm">{price}</span>
        </div>

        {/* Rating */}
        <div className="absolute top-4 left-4 flex items-center gap-1 glass px-2 py-1 rounded-full">
          <Star className="w-3.5 h-3.5 fill-accent text-accent" />
          <span className="text-xs font-medium text-foreground">{rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
          {title}
        </h3>
        
        <div className="flex items-center gap-4 text-muted-foreground text-sm mb-4">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-primary" />
            <span>{duration}</span>
          </div>
        </div>

        <Button
          variant="ghost"
          className="w-full justify-between text-accent hover:text-accent-foreground hover:bg-accent group/btn"
        >
          <span>Explore Package</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
      </div>
    </motion.div>
  );
};
