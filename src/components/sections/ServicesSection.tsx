import { Plane, CreditCard, Shield, HeadphonesIcon, MapPin, Users } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { ServiceCard } from '@/components/ServiceCard';

const services = [
  {
    icon: Plane,
    title: 'Flight Booking',
    description: 'Get the best deals on domestic and international flights with our exclusive airline partnerships.',
  },
  {
    icon: MapPin,
    title: 'Visa Assistance',
    description: 'Hassle-free visa processing for all countries with expert guidance at every step.',
  },
  {
    icon: CreditCard,
    title: 'Flexible Payments',
    description: 'Easy EMI options and multiple payment gateways for your convenience.',
  },
  {
    icon: Shield,
    title: 'Travel Insurance',
    description: 'Comprehensive travel insurance coverage for a worry-free journey.',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    description: 'Round-the-clock customer support to assist you before, during, and after your trip.',
  },
  {
    icon: Users,
    title: 'Group Tours',
    description: 'Special packages for family trips, corporate outings, and group adventures.',
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-6">
        <SectionHeading
          subtitle="What We Offer"
          title="Why Choose Us"
          description="We provide comprehensive travel services to make your journey seamless and memorable."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} {...service} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};
