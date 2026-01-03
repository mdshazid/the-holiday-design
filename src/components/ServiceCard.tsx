import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export const ServiceCard = ({ icon: Icon, title, description, delay = 0 }: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className="group relative p-8 rounded-2xl bg-gradient-card border border-border/20 card-shadow text-center"
    >
      {/* Icon Container */}
      <div className="relative mx-auto w-16 h-16 mb-6">
        <div className="absolute inset-0 bg-primary/20 rounded-xl blur-xl group-hover:bg-accent/30 transition-colors duration-500" />
        <div className="relative flex items-center justify-center w-full h-full rounded-xl bg-gradient-to-br from-primary to-primary/60 group-hover:from-accent group-hover:to-accent/60 transition-all duration-500">
          <Icon className="w-8 h-8 text-primary-foreground" />
        </div>
      </div>

      {/* Content */}
      <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>

      {/* Decorative Line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent group-hover:w-1/2 transition-all duration-500" />
    </motion.div>
  );
};
