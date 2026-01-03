import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  children?: ReactNode;
}

export const SectionHeading = ({
  subtitle,
  title,
  description,
  align = 'center',
  children,
}: SectionHeadingProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${align === 'center' ? 'text-center max-w-2xl mx-auto' : ''}`}
    >
      {subtitle && (
        <span className="inline-block text-accent font-semibold text-sm tracking-wider uppercase mb-3">
          {subtitle}
        </span>
      )}
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
      {children}
      
      {/* Decorative Divider */}
      <div className={`flex items-center gap-2 mt-6 ${align === 'center' ? 'justify-center' : ''}`}>
        <div className="w-12 h-0.5 bg-accent" />
        <div className="w-2 h-2 rounded-full bg-primary" />
        <div className="w-12 h-0.5 bg-accent" />
      </div>
    </motion.div>
  );
};
