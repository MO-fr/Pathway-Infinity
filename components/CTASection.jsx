'use client';

import { motion } from 'framer-motion';
import Button from './Button';

export default function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden">      {/* Background gradient elements */}      <div className="absolute top-0 left-1/4 w-64 h-64 bg-mint-100 rounded-full opacity-50 blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-sky-100 rounded-full opacity-60 blur-3xl"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7 }}
        className="container mx-auto px-4 md:px-6 relative z-10"
      >
        <div className="bg-slate-50 rounded-3xl shadow-xl p-8 md:p-12 text-center max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Ready to Find Your <span className="text-mint-600">Perfect Trade or Career</span>?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sky-700 mb-8 text-lg max-w-2xl mx-auto"
          >
            Take the first step toward a rewarding future. Our quick assessment will match you with trade schools, vocational programs, and career paths that fit your skills and interests.
          </motion.p>
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <Button href="/signup" variant="primary">
              Create Account
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
