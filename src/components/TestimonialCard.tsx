import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

interface TestimonialCardProps {
  image: string;
  name: string;
  role: string;
  rating: number;
  testimonial: string;
  delay?: number;
}

export const TestimonialCard = ({
  image,
  name,
  role,
  rating,
  testimonial,
  delay = 0,
}: TestimonialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="relative p-8 rounded-2xl bg-gradient-card border border-border/20 card-shadow"
    >
      {/* Quote Icon */}
      <div className="absolute -top-4 left-8">
        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
          <Quote className="w-5 h-5 text-accent-foreground" />
        </div>
      </div>

      {/* Stars */}
      <div className="flex items-center gap-1 mb-4 mt-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? 'fill-accent text-accent' : 'text-muted-foreground/30'
            }`}
          />
        ))}
      </div>

      {/* Testimonial Text */}
      <p className="text-foreground/80 leading-relaxed mb-6 italic">
        "{testimonial}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-4">
        <img
          src={image}
          alt={name}
          className="w-12 h-12 rounded-full object-cover border-2 border-accent/30"
        />
        <div>
          <h4 className="font-display font-semibold text-foreground">{name}</h4>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
    </motion.div>
  );
};
