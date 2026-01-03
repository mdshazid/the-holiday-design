import { SectionHeading } from '@/components/SectionHeading';
import { TestimonialCard } from '@/components/TestimonialCard';

import testimonial1 from '@/assets/testimonial-1.jpg';
import testimonial2 from '@/assets/testimonial-2.jpg';
import testimonial3 from '@/assets/testimonial-3.jpg';

const testimonials = [
  {
    image: testimonial1,
    name: 'Fatema Akter',
    role: 'Corporate Professional',
    rating: 5,
    testimonial: 'The Holiday made our Cox\'s Bazar trip absolutely magical! From hotel bookings to local tours, everything was perfectly arranged. Highly recommend their services.',
  },
  {
    image: testimonial2,
    name: 'Anupam Saha',
    role: 'Business Owner',
    rating: 5,
    testimonial: 'Our Dubai trip was flawless. The visa processing was quick, and the tour package was value for money. The team is very professional and responsive.',
  },
  {
    image: testimonial3,
    name: 'Rafiq & Karim',
    role: 'Adventure Enthusiasts',
    rating: 5,
    testimonial: 'We\'ve been to Thailand and Bali with The Holiday. Both trips were amazing experiences. They truly understand what travelers need.',
  },
];

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-24 bg-gradient-hero">
      <div className="container mx-auto px-6">
        <SectionHeading
          subtitle="Testimonials"
          title="What Our Travelers Say"
          description="Hear from our happy customers who have experienced unforgettable journeys with us."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.name} {...testimonial} delay={index * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
};
