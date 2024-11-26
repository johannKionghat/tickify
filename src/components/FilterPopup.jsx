import { CloseSquareLinear } from "react-iconsax-icons"
import { motion, AnimatePresence } from 'framer-motion'
import { themeColors } from "../theme"

export const FilterPopup = ({ sortOrder, setSortOrder, statusFilter, setStatusFilter, onClose }) => {
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: 20 }
  }

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <motion.div 
          className="bg-[#e0e0e0bb] p-4 rounded-lg shadow-lg"
          style={{width:300}}
          variants={popupVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex items-center justify-between">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <CloseSquareLinear onClick={onClose} className={`p-2 rounded-full`} style={{backgroundColor:themeColors.bgbutton1}} size="40" color={themeColors.primary}/>
            </motion.div>
          </div>
          <div className='my-2' style={{ height: 1, backgroundColor:themeColors.bgbutton1 }}></div>
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div>
              <label className="block mb-2 font-semibold text-white">By name:</label>
              <select 
                value={sortOrder} 
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full p-2 border rounded font-normal"
                style={{backgroundColor:themeColors.bgbutton1, color:themeColors.primary}}
              >
                <option className="w-full p-2 border rounded font-normal " style={{color:themeColors.primary}} value="asc">A-Z</option>
                <option className="w-full p-2 border rounded font-normal " style={{color:themeColors.primary}} value="desc">Z-A</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-semibold text-white">State:</label>
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full p-2 border rounded font-normal "
                style={{backgroundColor:themeColors.bgbutton1, color:themeColors.primary}}
              >
                <option className="w-full p-2 border rounded-full font-thin " style={{color:themeColors.primary, backgroundColor:themeColors.bgbutton1}} value="all">All</option>
                <option className="w-full p-2 border rounded font-normal" style={{color:themeColors.statusDone}} value="done">Done</option>
                <option className="w-full p-2 border rounded font-normal" style={{color:themeColors.statusInProgress}} value="inProgress">In progress</option>
                <option className="w-full p-2 border rounded font-normal" style={{color:themeColors.statusEmpty}} value="Empty">Empty</option>
              </select>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}