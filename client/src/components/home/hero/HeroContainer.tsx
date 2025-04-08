import { ReactNode } from 'react';
import { motion } from 'framer-motion';

type HeroContainerProps = {
  children: ReactNode;
};

export default function HeroContainer({ children }: HeroContainerProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-indigo-700 text-white"
    >
      <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-center">
        {children}
      </div>
    </motion.section>
  );
}
