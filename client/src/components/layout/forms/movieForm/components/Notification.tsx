import { AnimatePresence, motion } from 'framer-motion';

type NotificationProps = {
  show: boolean;
  message: string;
  onClose: () => void;
};

export default function Notification({ show, message, onClose }: NotificationProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <p className="text-gray-800">{message}</p>
            <button
              onClick={onClose}
              className="ml-4 text-gray-500 hover:text-gray-700"
              aria-label="Fermer la notification"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
