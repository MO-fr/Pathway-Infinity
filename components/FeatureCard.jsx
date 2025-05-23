'use client';

import { motion } from 'framer-motion';

export default function FeatureCard({ 
  title, 
  description, 
  icon, 
  delay = 0,
  index
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.5,
          delay: delay * 0.2
        }
      }}
      viewport={{ once: true, margin: "-50px" }}
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className={`
        mb-4 w-12 h-12 rounded-full flex items-center justify-center text-white
        ${index % 3 === 0 ? 'bg-blue-500' : index % 3 === 1 ? 'bg-green-500' : 'bg-purple-400'}
      `}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}
