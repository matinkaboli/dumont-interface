import { motion } from 'framer-motion';

import Cards from './Cards';

const PlayCards = () => {
  return (
    <div className="sm:bg-neutral-750 bg-transparent sm:mx-0 -mx-5 lg:px-7 md:px-2 px-0 pt-4 pb-5 rounded-lg">
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
