'use client';

import { motion } from 'framer-motion';

export default function Button({ 
  children, 
  href, 
  variant = 'primary', 
  className = '',
  onClick,
  ...props 
}) {  const baseClasses = "group relative inline-flex items-center justify-center px-6 py-3 rounded-full font-medium text-base transition-all duration-300 transform overflow-hidden";  const variantClasses = {
    primary: "bg-gradient-to-r from-mint-400 to-mint-500 text-white shadow-lg hover:shadow-mint-400/25 hover:-translate-y-0.5 before:absolute before:inset-0 before:bg-gradient-to-r before:from-mint-500 before:to-mint-400 before:opacity-0 before:transition-opacity hover:before:opacity-100 before:-z-10",
    secondary: "bg-gradient-to-r from-sky-400 to-sky-500 text-white shadow-lg hover:shadow-sky-400/25 hover:-translate-y-0.5 before:absolute before:inset-0 before:bg-gradient-to-r before:from-sky-500 before:to-sky-400 before:opacity-0 before:transition-opacity hover:before:opacity-100 before:-z-10",
    outline: "bg-slate-50/80 backdrop-blur-sm text-sky-600 border border-sky-200 hover:border-sky-300 hover:bg-slate-50 hover:-translate-y-0.5 shadow-sm hover:shadow-lg hover:shadow-sky-400/10",
    text: "bg-transparent text-sky-600 hover:text-sky-700 hover:bg-sky-50 px-4"
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
