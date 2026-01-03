import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { DestinationsSection } from '@/components/sections/DestinationsSection';
import { WhyChooseSection } from '@/components/sections/WhyChooseSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { PartnersSection } from '@/components/sections/PartnersSection';
import { CTASection } from '@/components/sections/CTASection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>The Holiday - International Tours & Travels Ltd | Premium Travel Agency Bangladesh</title>
        <meta 
          name="description" 
          content="The Holiday International Tours & Travels Ltd - Your trusted travel partner for domestic and international tours. Explore Cox's Bazar, Dubai, Thailand, Bali & more." 
        />
        <meta name="keywords" content="travel agency bangladesh, tours travels dhaka, cox's bazar tour, dubai tour package, thailand tour, visa assistance" />
        <link rel="canonical" href="https://theholiday.com" />
        
        {/* Open Graph */}
        <meta property="og:title" content="The Holiday - Premium Travel Agency Bangladesh" />
        <meta property="og:description" content="Experience the world with The Holiday. Curated domestic and international tour packages." />
        <meta property="og:type" content="website" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            "name": "The Holiday International Tours & Travels Ltd",
            "description": "Premium travel agency offering domestic and international tour packages",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Dhaka",
              "addressRegion": "Dhaka Division",
              "addressCountry": "BD"
            },
            "telephone": "+8801810100288",
            "email": "info@theholiday.com"
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <DestinationsSection />
          <WhyChooseSection />
          <ServicesSection />
          <TestimonialsSection />
          <PartnersSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
