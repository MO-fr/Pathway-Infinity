'use client';

import { motion } from 'framer-motion';

export default function Button({ 
  children, 
  href, 
  variant = 'primary', 
  className = '',
  onClick,
  ...props 
}) {  const baseClasses = "group relative inline-flex items-center justify-center px-6 py-3 rounded-full font-medium text-base transition-all duration-300 transform overflow-hidden";
    const variantClasses = {
    primary: "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5 before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-500 before:to-indigo-500 before:opacity-0 before:transition-opacity hover:before:opacity-100 before:-z-10",
    secondary: "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg hover:shadow-pink-500/25 hover:-translate-y-0.5 before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-500 before:to-pink-500 before:opacity-0 before:transition-opacity hover:before:opacity-100 before:-z-10",
    outline: "bg-white/80 backdrop-blur-sm text-indigo-600 border border-indigo-200 hover:border-indigo-300 hover:bg-white hover:-translate-y-0.5 shadow-sm hover:shadow-lg hover:shadow-indigo-500/10",
    text: "bg-transparent text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-4"
  };
  
  const allClasses = `${baseClasses} ${variantClasses[variant] || ''} ${className}`;
  
  const buttonContent = (
    <motion.span
      className="relative z-10 flex items-center gap-2"
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.span>
  );
  
  if (href) {
    return (
      <motion.a
        href={href}
        className={allClasses}
        whileHover={{ scale: 1.02 }}
        {...props}
      >
        {buttonContent}
      </motion.a>
    );
  }
  
  return (
    <motion.button
      className={allClasses}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      {...props}
    >
      {buttonContent}
    </motion.button>
  );
}
