'use client';

import { motion } from 'framer-motion';

export default function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Take the Assessment',
      description: 'Answer simple questions about your interests, strengths, and preferences.'
    },
    {
      number: '02',
      title: 'Get Personalized Results',
      description: 'Our AI analyzes your responses and matches them to careers and educational programs.'
    },
    {
      number: '03',
      title: 'Explore Your Options',
      description: 'Browse detailed information about recommended career paths and educational opportunities.'
    },
    {
      number: '04',
      title: 'Save and Compare',
      description: 'Save your favorite options to your profile and compare different career paths.'
    }
  ];
  
  return (
    <section className="py-16 md:py-24 bg-mint-50/50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>          <p className="text-sky-700 max-w-2xl mx-auto text-lg">
            Discover your ideal career path in just a few simple steps
          </p>
        </motion.div>
        
        <div className="relative">          {/* Progress Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-mint-200 transform -translate-x-1/2"></div>
          
          <div className="space-y-12 md:space-y-0 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.5,
                    delay: index * 0.2
                  }
                }}
                viewport={{ once: true, margin: "-50px" }}
                className={`md:flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Step Content */}
                <div className={`md:w-5/12 ${
                  index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'
                }`}>                  <h3 className="text-xl md:text-2xl font-bold mb-2">                    <span className={`
                      inline-block px-3 py-1 rounded-lg text-white mr-2                      ${index % 4 === 0 ? 'bg-mint-500' : 
                        index % 4 === 1 ? 'bg-sky-500' : 
                        index % 4 === 2 ? 'bg-azure-500' : 'bg-slate-500'}
                    `}>
                      {step.number}
                    </span>
                    {step.title}
                  </h3>
                  <p className="text-sky-700">{step.description}</p>
                </div>
                
                {/* Center Point */}
                <div className="hidden md:flex w-2/12 items-center justify-center">
                  <div className={`
                    w-8 h-8 rounded-full border-4 bg-white z-10                    ${index % 4 === 0 ? 'border-mint-500' : 
                      index % 4 === 1 ? 'border-sky-500' : 
                      index % 4 === 2 ? 'border-azure-500' : 'border-slate-500'}
                  `}></div>
                </div>
                
                {/* Empty space for alternating layout */}
                <div className="hidden md:block md:w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
