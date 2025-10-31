'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <motion.div
        className="flex space-x-2"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0,
          }}
          className="w-4 h-4 bg-blue-500 dark:bg-blue-400 rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.2,
          }}
          className="w-4 h-4 bg-green-500 dark:bg-mint-400 rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.4,
          }}
          className="w-4 h-4 bg-purple-500 dark:bg-purple-400 rounded-full"
        />
      </motion.div>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Loading your pathway...</p>
    </div>
  );
}
