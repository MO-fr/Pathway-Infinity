'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from './Button';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.6,
      ease: "easeOut"
    }
  })
};

export default function HeroSection() {
  return (<section className="relative min-h-[90vh] flex items-center py-24 overflow-hidden">
    <div className="container mx-auto px-6 md:px-8 z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Text Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="max-w-3xl space-y-8"
        >
          <motion.span
            variants={fadeIn}
            custom={0.1}
            className="inline-block px-4 py-1.5 text-sm font-medium bg-gradient-to-r from-mint-300/20 to-mint-500/20 text-mint-700 rounded-full shadow-sm backdrop-blur-sm"
          >
            ✨ Discover Your Trade or Career Path
          </motion.span>

          <motion.h1
            variants={fadeIn}
            custom={0.3}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-blue-600"
          >
            Find Your <span className="bg-gradient-to-r from-mint-500 to-sky-500 bg-clip-text text-transparent">Perfect Trade</span> With Pathway Infinity
          </motion.h1>

          <motion.p
            variants={fadeIn}
            custom={0.5}
            className="text-lg md:text-xl text-gray-700 max-w-2xl leading-relaxed"
          >
            Discover trade schools, vocational training, and career paths matched to your skills and interests. Get personalized recommendations for both traditional careers and skilled trades.
          </motion.p>
          <motion.div
            variants={fadeIn}
            custom={0.7}
            className="flex flex-wrap gap-6 pt-4"
          >
            <Button href="/signup" variant="primary">
              Create Account
            </Button>
          </motion.div>
        </motion.div>
        {/* Image/Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="relative h-[500px] lg:h-[600px] flex items-center justify-center"
        >
          <div className="relative w-full h-full">
            {/* Decorative background elements */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]">              <div className="absolute inset-0 bg-gradient-to-r from-mint-300/20 to-mint-500/20 dark:from-mint-800/20 dark:to-mint-600/20 rounded-full blur-3xl"></div>
              <div className="absolute inset-10 bg-gradient-to-r from-sky-300/20 to-sky-500/20 dark:from-sky-800/20 dark:to-sky-600/20 rounded-full blur-2xl"></div>
              <div className="absolute inset-20 bg-gradient-to-r from-azure-300/20 to-mint-400/20 dark:from-azure-800/20 dark:to-mint-700/20 rounded-full blur-xl"></div>
            </div>
            {/* Main illustration */}
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.8,
                type: "spring",
                stiffness: 100
              }} style={{
                filter: 'drop-shadow(0 10px 15px rgba(112, 229, 140, 0.15))'
              }}
            >
              <Image
                src="/infinity-paths.svg"
                alt="Infinity pathways illustration"
                width={600}
                height={500}
                style={{
                  objectFit: 'contain',
                  transform: 'scale(1.1)'
                }}
                className="animate-float"
                priority
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
  );
}
