import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/SectionHeading';
import { CheckCircle2, Wallet, Smile, Compass, Plane, ShieldCheck, FileCheck, BadgeDollarSign } from 'lucide-react';

const features = [
  {
    icon: CheckCircle2,
    title: 'More Choices',
    description: 'Wide range of destinations and packages to choose from',
    color: 'from-purple-500 to-violet-600',
  },
  {
    icon: Wallet,
    title: 'Low Cost',
    description: 'Competitive prices with best value for your money',
    color: 'from-green-500 to-emerald-600',
  },
  {
    icon: Smile,
    title: 'More Enjoyment',
    description: 'Curated experiences for maximum enjoyment',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Compass,
    title: 'More Freedom',
    description: 'Flexible itineraries and customizable packages',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Plane,
    title: 'Flight Discounts',
    description: 'Amazing discounts on domestic & international flights',
    color: 'from-rose-500 to-pink-600',
  },
  {
    icon: ShieldCheck,
    title: 'Assured Booking',
    description: '100% confirmed bookings with no hidden charges',
    color: 'from-teal-500 to-green-500',
  },
  {
    icon: FileCheck,
    title: 'Visa Assistance',
    description: 'Complete visa processing support for all countries',
    color: 'from-indigo-500 to-purple-600',
  },
  {
    icon: BadgeDollarSign,
    title: 'Value for Money',
    description: 'Premium services at affordable prices',
    color: 'from-amber-500 to-yellow-500',
  },
];

export const WhyChooseSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading
          subtitle="Why Choose Us"
          title="Your Trusted Travel Partner"
          description="Experience the difference with our premium services and exclusive benefits"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              <div className="relative p-6 rounded-2xl bg-gradient-card border border-border/30 text-center h-full card-shadow hover:border-accent/30 transition-all duration-500">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/0 to-primary/0 group-hover:from-accent/5 group-hover:to-primary/5 transition-all duration-500" />
                
                {/* Icon */}
                <div className="relative mx-auto w-16 h-16 mb-4">
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${feature.color} blur-lg opacity-30 group-hover:opacity-50 transition-opacity`} />
                  <div className={`relative flex items-center justify-center w-full h-full rounded-xl bg-gradient-to-br ${feature.color}`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
