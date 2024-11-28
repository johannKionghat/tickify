import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { EmojiSadLinear, MagicpenLinear, ReceiptAddLinear, StatusLinear, TickCircleLinear, TrashLinear } from 'react-iconsax-icons';
import { useTheme } from '../theme/ThemeContext';
import { getChecklists, deleteChecklist } from '../firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DashChecklist({ sortOrder, statusFilter, searchTerm }) {
  const [isChecklist, setIsChecklist] = useState(false);
  const [filteredChecklists, setFilteredChecklists] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [checklistToDelete, setChecklistToDelete] = useState(null);
  const [DataChecklist, setDataChecklist] = useState([]);
  const [selectedChecklists, setSelectedChecklists] = useState([]);
  const [selectionMode, setSelectionMode] = useState(false);
  const { themeColors } = useTheme();

  const longPressTime = 500; // 500ms for long press
  const [pressTimer, setPressTimer] = useState(null);

  const notifySuccess = () => toast.success('Checklist(s) deleted successfully');
  const notifyError = () => toast.error('Error deleting checklist(s)');

  const fetchChecklists = useCallback(async () => {
    try {
      const checklists = await getChecklists();
      setDataChecklist(checklists);
      setIsChecklist(checklists.length > 0);
    } catch (error) {
      console.error('Error fetching checklists:', error);
      setIsChecklist(false);
    }
  }, []);

  useEffect(() => {
    fetchChecklists();
  }, [fetchChecklists]);

  const applyFilters = useCallback(() => {
    let result = [...DataChecklist];
    if (searchTerm) {
      result = result.filter(checklist => checklist.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (statusFilter !== 'all') {
      result = result.filter(checklist => {
        const tasks = checklist.todo;
        const completedTasks = tasks.filter(task => task.statut === 1);
        if (statusFilter === 'done') return tasks.length > 0 && completedTasks.length === tasks.length;
        if (statusFilter === 'inProgress') return tasks.length > 0 && completedTasks.length < tasks.length;
        if (statusFilter === 'Empty') return tasks.length === 0;
        return false; // Default return for filter callback
      });
    }
    result.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    setFilteredChecklists(result);
    setIsChecklist(result.length > 0);
  }, [DataChecklist, searchTerm, statusFilter, sortOrder]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters, DataChecklist, sortOrder, statusFilter, searchTerm]);

  const handleDelete = async (checklistIds) => {
    try {
      if (Array.isArray(checklistIds)) {
        for (const id of checklistIds) {
          await deleteChecklist(id);
        }
      } else {
        await deleteChecklist(checklistIds);
      }
      notifySuccess();
      fetchChecklists(); // Refresh the list
      setShowConfirmation(false);
      setSelectedChecklists([]);
    } catch (error) {
      console.error('Error deleting checklist:', error);
      notifyError();
    }
  };

  const confirmDelete = async () => {
    const toDelete = selectedChecklists.length > 0 ? selectedChecklists : checklistToDelete;
    await handleDelete(toDelete);
  };

  const handleTouchStart = (e, checklistId) => {
    const timer = setTimeout(() => {
      setSelectionMode(true);
      toggleChecklistSelection(checklistId);
    }, longPressTime);
    setPressTimer(timer);
  };

  const handleTouchEnd = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  };

  const handleMouseDown = (e, checklistId) => {
    const timer = setTimeout(() => {
      setSelectionMode(true);
      toggleChecklistSelection(checklistId);
    }, longPressTime);
    setPressTimer(timer);
  };

  const handleMouseUp = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  };

  const toggleChecklistSelection = (checklistId) => {
    setSelectedChecklists(prev => {
      const newSelection = prev.includes(checklistId)
        ? prev.filter(id => id !== checklistId)
        : [...prev, checklistId];
      
      if (newSelection.length === 0) {
        setSelectionMode(false);
      }
      return newSelection;
    });
  };

  const exitSelectionMode = () => {
    setSelectionMode(false);
    setSelectedChecklists([]);
  };

  const handleContainerClick = (e) => {
    // Only handle clicks directly on the container
    if (e.target === e.currentTarget) {
      exitSelectionMode();
    }
  };

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    }
  };

  if (isChecklist) {
    return (
      <div className="mx-auto px-3 py-3 " onClick={handleContainerClick}>
        <div className="flex-1 flex flex-col justify-center items-center mt-3" onClick={handleContainerClick}>
          <AnimatePresence>
            <motion.div
                className='flex flex-wrap justify-center gap-2 w-full'
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                onClick={handleContainerClick}>
              {filteredChecklists.map((item, index) => {
                const tasksForThisChecklist = item.todo;
                const completedTasksCount = tasksForThisChecklist.filter(task => task.statut === 1).length;
                const totalTasksCount = tasksForThisChecklist.length;
                let bgColor;
                let status;
                let Empty;

                if (totalTasksCount === 0) {
                  bgColor = themeColors.statusEmpty;
                  status = 'Empty';
                  Empty = true;
                } else if (completedTasksCount === totalTasksCount) {
                  bgColor = themeColors.statusDone;
                  status = 'Done';
                } else {
                  bgColor = themeColors.statusInProgress;
                  status = 'In Progress';
                }

                return (
                  <motion.div
                    key={item.id}
                    className="rounded shadow-sm p-2 overflow-hidden relative"
                    style={{ width: 155, backgroundColor: bgColor, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)' }}
                    variants={itemVariants}
                    onTouchStart={(e) => {
                      e.stopPropagation();
                      handleTouchStart(e, item.id);
                    }}
                    onTouchEnd={(e) => {
                      e.stopPropagation();
                      handleTouchEnd();
                    }}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      handleMouseDown(e, item.id);
                    }}
                    onMouseUp={(e) => {
                      e.stopPropagation();
                      handleMouseUp();
                    }}
                    onMouseLeave={handleMouseUp}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <AnimatePresence>
                      {selectionMode && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-2 right-2 z-10"
                        >
                          <input
                            type="checkbox"
                            checked={selectedChecklists.includes(item.id)}
                            onChange={() => toggleChecklistSelection(item.id)}
                            className="h-4 w-4"
                            style={{ 
                              accentColor: themeColors.primary
                            }}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div className="flex justify-between items-start select-none" >
                      <div className="font-bold text-nowrap overflow-hidden" style={{ fontSize: 15, width: 100, color:themeColors.textLight }}>
                        {item.title}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <p className=" font-bold" style={{ fontSize: 8, width:50, color: themeColors.textLight }}>
                        {item.created_at}
                      </p>
                      <div className="flex gap-1 items-center">
                        <p className="font-bold rounded-3xl p-1" style={{ fontSize: 7, color: themeColors.primary, backgroundColor: themeColors.bgbutton1 }}>
                          {completedTasksCount} / {totalTasksCount}
                        </p>
                        <p className="font-bold rounded-3xl p-1" style={{ fontSize: 7, color: themeColors.primary, backgroundColor: themeColors.bgbutton1 }}>
                          {status}
                        </p>
                      </div>
                    </div>
                    <div className="mb-1" style={{ height: 1, backgroundColor: themeColors.primary }}></div>
                    <Link to="/Checklist" state={{ checklist: item, tasks : item.todo }}>
                      {Empty ? (
                        <div className={`rounded-md p-2 flex items-center justify-center`}  style={{ height: 70,"&hover::backgroundColor": themeColors.bgbutton1}}>
                          <ReceiptAddLinear size="50" color={themeColors.bgbutton1} />
                        </div>
                      ) : (
                        <div className={`rounded-md overflow-y-auto hover:bg-[${themeColors.overlay}] p-2 scrollbar-hide z-0`} style={{ height: 70,"&hover::backgroundColor": themeColors.bgbutton1}}>
                          {tasksForThisChecklist.map(task => (
                            <div key={task.id} className="py-1">
                              {task.statut === 0 ? (
                                <div className="flex gap-2 overflow-hidden">
                                  <StatusLinear size="14" color={themeColors.secondary} />
                                  <div className="overflow-hidden text-wrap font-bold" style={{ fontSize: 9.7, width: 100, color: themeColors.secondary }}>
                                    {task.title}
                                  </div>
                                </div>
                              ) : (
                                <div className="flex gap-2 ">
                                  <TickCircleLinear size="14" color={themeColors.secondary} />
                                  <div className="overflow-hidden text-wrap line-through font-bold" style={{ fontSize: 9.7, width: 100, color: themeColors.secondary }}>
                                    {task.title}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </Link>
                    <div className="mt-2 flex justify-end gap-1">
                      <Link to="/Formulaire" state={{ checklist: item, Linktasks : item.todo }}>
                        <p className={`font-bold rounded-3xl p-1`} style={{ fontSize: 7, color: themeColors.primary, backgroundColor: themeColors.bgbutton1 }}>
                          <MagicpenLinear size="15" color={themeColors.primary} />
                        </p>
                      </Link>
                      <motion.p
                        className="font-bold rounded-3xl p-1"
                        style={{ fontSize: 7, color: themeColors.primary, backgroundColor: themeColors.bgbutton1 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          if (selectedChecklists.length === 0) {
                            setChecklistToDelete(item.id);
                          }
                          setShowConfirmation(true);
                        }}
                      >
                        <TrashLinear size="15" color={themeColors.primary} />
                      </motion.p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />
          {/* Popup de confirmation */}
          {showConfirmation && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className={`bg-[${themeColors.popupBackground}] p-4 rounded-lg shadow-lg`} style={{backgroundColor:themeColors.statusEmpty, color:themeColors.primary, opacity:0.9, width:300}}>
                <p>{selectedChecklists.length > 0 
                    ? `Do you want to delete ${selectedChecklists.length} selected checklists?`
                    : 'Do you want to delete this checklist?'}</p>
                <div className="flex justify-end mt-4">
                  <button
                    className="mr-2 px-4 py-2 bg-gray-200 rounded-md"
                    onClick={() => {
                      setShowConfirmation(false);
                      exitSelectionMode();
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                    onClick={confirmDelete}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className='flex flex-col items-center mt-10 justify-center text-center'>
        <EmojiSadLinear size="100" color={themeColors.primary} />
        <p className='text-gray-600 mt-2'>No checklists found.</p>
      </div>
    );
  }
}