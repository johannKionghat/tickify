import React, { useRef, useEffect } from 'react';
import { ArrangeCircle2Linear, CloseSquareLinear, StatusLinear} from "react-iconsax-icons";
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../theme/ThemeContext';

export const FilterPopup = ({ sortOrder, setSortOrder, statusFilter, setStatusFilter, onClose }) => {
  const { themeColors } = useTheme();
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: 20 }
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 flex justify-center items-center z-50"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      >
        <motion.div 
          ref={popupRef}
          className="relative rounded-2xl overflow-hidden"
          style={{
            width: 300,
            backgroundColor: themeColors.bgApp,
            opacity: 0.95,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)'
          }}
          variants={popupVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Header */}
          <div className="px-4 py-3 flex items-center justify-between" 
               style={{ borderBottom: `1px solid ${themeColors.separator}` }}>
            <h3 className="text-lg font-semibold" style={{ color: themeColors.primary }}>
              Filters
            </h3>
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:opacity-80 transition-opacity"
                style={{ backgroundColor: themeColors.closeButtonBackground }}
              >
                <CloseSquareLinear size="24" color={themeColors.closeButtonColor} />
              </button>
            </motion.div>
          </div>

          {/* Content */}
          <motion.div 
            className="p-4 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Sort Order Section */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ArrangeCircle2Linear size="20" color={themeColors.primary} />
                <label className="font-medium" style={{ color: themeColors.primary }}>Sort by name</label>
              </div>
              <select 
                value={sortOrder} 
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full p-2 rounded-xl transition-all hover:opacity-80"
                style={{
                  backgroundColor: themeColors.bgbutton1,
                  color: themeColors.primary,
                  border: `1px solid ${themeColors.separator}`
                }}
              >
                <option value="asc">A to Z</option>
                <option value="desc">Z to A</option>
              </select>
            </div>

            {/* Status Filter Section */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <StatusLinear size="20" color={themeColors.primary} />
                <label className="font-medium" style={{ color: themeColors.primary }}>Status</label>
              </div>
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full p-2 rounded-xl transition-all hover:opacity-80"
                style={{
                  backgroundColor: themeColors.bgbutton1,
                  color: themeColors.primary,
                  border: `1px solid ${themeColors.separator}`
                }}
              >
                <option value="all">All</option>
                <option value="done" style={{ color: themeColors.statusDone }}>Done</option>
                <option value="inProgress" style={{ color: themeColors.statusInProgress }}>In progress</option>
                <option value="Empty" style={{ color: themeColors.statusEmpty }}>Empty</option>
              </select>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};