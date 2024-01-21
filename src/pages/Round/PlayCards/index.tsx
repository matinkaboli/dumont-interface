import { motion } from 'framer-motion';

import Cards from './Cards';

const PlayCards = () => {
  return (
    <div className="md:bg-neutral-750 bg-transparent min-h-[382px] md:mx-0 -mx-5 md:px-7 px-0 pt-4 pb-5 rounded-lg">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <Cards />
      </motion.div>
    </div>
  );
};

export default PlayCards;
