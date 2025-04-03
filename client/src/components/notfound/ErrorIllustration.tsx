import { motion } from 'framer-motion';

export default function ErrorIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative flex justify-center mb-8"
      role="img"
      aria-label="Illustration 404"
    >
      <div className="text-[180px] font-bold text-indigo-100" aria-hidden="true">
        404
      </div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
      >
        <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center mb-4">
          <span className="text-6xl" role="img" aria-label="Livre">
            📚
          </span>
        </div>
        <div className="text-center">
          <div className="bg-white px-4 py-2 rounded-lg shadow-md">
            <span className="font-medium text-indigo-600">Élément introuvable</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
