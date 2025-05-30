import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import CTASection from '@/components/CTASection';

import AnimatedBackground from '@/components/AnimatedBackground';
import './globals.css';

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
    </>
  );
}
