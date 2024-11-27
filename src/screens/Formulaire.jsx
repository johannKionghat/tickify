import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavFormulaire from '../components/NavFormulaire';
import { CalendarLinear, DirectInboxLinear, AddSquareLinear, TrashLinear } from 'react-iconsax-icons';
import { useLocation } from 'react-router-dom';
import { themeColors } from '../theme';
import { addChecklist, updateChecklist } from '../data/apiFunctions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Formulaire() {
  const location = useLocation();
  const { checklist, Linktasks = [] } = location.state || {};
  const isEditMode = !!checklist;

  const [title, setTitle] = useState(isEditMode ? checklist.title : '');
  const [description, setDescription] = useState(isEditMode ? checklist.description : '');
  const [tasks, setTasks] = useState(isEditMode ? Linktasks : []);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const currentDate = new Date(isEditMode ? checklist.created_at : Date.now()).toISOString().split('T')[0];

  const handleSubmit = async (e) => {
    const notifySuccess = (message) => toast.success(message);
    const notifyError =  (message) => toast.error(message);
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateChecklist(checklist.id,  title, description, tasks );
        notifySuccess('Checklist updated with success !');
      } else {
        await addChecklist(title, description, tasks );
        notifySuccess('Checklist created with success !');
      }
      // Réinitialiser le formulaire ou rediriger l'utilisateur
    } catch (error) {
      console.error(`Error while ${isEditMode ? "updating" : "adding"} the checklist:`, error);
      notifyError(`Error while ${isEditMode ? "updating" : "adding"} the checklist:`, error);
    }
  };
  
  const handleAddTask = () => {
    if (newTaskTitle.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), title: newTaskTitle, statut: 0 }]);
      setNewTaskTitle('');
    }
  };

  const handleTaskChange = (index, value) => {
    const newTasks = [...tasks];
    newTasks[index].title = value;
    setTasks(newTasks);
  };

  const handleRemoveTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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

  const taskVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    },
    exit: { 
      opacity: 0, 
      x: 50, 
      y: 100, 
      rotate: 20,
      transition: { 
        duration: 0.5,
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <div className="min-h-screen" style={{backgroundColor:themeColors.bgApp}}>
      <div className="fixed w-full">
        <NavFormulaire />
      </div>
      <motion.div
        className="container mx-auto px-4 pb-5 pt-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 
          className="text-2xl font-bold mb-6"
          style={{color:themeColors.primary}}
          variants={itemVariants}
        >
          {isEditMode ? 'Edit Checklist' : 'Create New Checklist'}
        </motion.h2>
        <form onSubmit={handleSubmit}>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4" variants={containerVariants}>
            <motion.div className="mb-4" variants={itemVariants}>
              <label htmlFor="title" className="block text-sm font-bold mb-2" style={{color:themeColors.primary}}>
                Title
              </label>
              <input
                id="title"
                className={`w-full border-2 border-[${themeColors.primary}] p-2 rounded-md font-bold text-[${themeColors.primary}] bg-[${themeColors.bgbutton1}] focus:outline-none`}
                style={{ borderColor:themeColors.primary, color:themeColors.primary, backgroundColor:themeColors.bgbutton1 }}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter checklist title"
                required
              />
            </motion.div>
            {!isEditMode && (
              <motion.div className="mb-4" variants={itemVariants}>
                <label htmlFor="date" className="block text-sm font-bold mb-2" style={{color:themeColors.primary}}>
                  Date
                </label>
                <div className={`flex items-center border-2 border-[${themeColors.primary}] rounded-md`} style={{borderColor:themeColors.primary}}>
                  <input
                    id="date"
                    className="flex-grow p-2 font-bold rounded-l-md focus:outline-none"
                    style={{color:themeColors.primary, backgroundColor:themeColors.bgbutton1}}
                    type="datetime"
                    value={currentDate}
                    readOnly
                  />
                  <button type="button" className="p-2" style={{color:themeColors.primary}}>
                    <CalendarLinear size="25" color={themeColors.primary} className="mr-2"/>
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
          <motion.div className="mb-4" variants={itemVariants}>
            <label htmlFor="description" className="block text-sm font-bold mb-2" style={{color:themeColors.primary}}>
              Description
            </label>
            <textarea
              id="description"
              className={`w-full h-32 bg-[${themeColors.bgbutton1}] border-2 border-[${themeColors.primary}] rounded-md p-3 text-[${themeColors.primary}] font-bold resize-none focus:outline-none`}
              style={{ backgroundColor:themeColors.bgbutton1, borderColor:themeColors.primary, color:themeColors.primary }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter checklist description"
              required
            ></textarea>
          </motion.div>
          <motion.div className="mb-4" variants={itemVariants}>
            <label className="block text-sm font-bold mb-2" style={{color:themeColors.primary}}>
              Tasks
            </label>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              variants={containerVariants}
            >
              <motion.div 
                className={`flex items-center border-2 border-[${themeColors.primary}] rounded-md`}
                style={{ borderColor:themeColors.primary}}
                variants={itemVariants}
              >
                <input
                  type="text"
                  className="flex-grow p-2 rounded-l-md font-bold focus:outline-none focus:none"
                  style={{color:themeColors.primary, backgroundColor:themeColors.bgbutton1}}
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Add new task"
                />
                <motion.button
                  type="button"
                  onClick={handleAddTask}
                  className="p-2"
                  style={{color:themeColors.primary}}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <AddSquareLinear size="24" color={themeColors.primary}/>
                </motion.button>
              </motion.div>

              <AnimatePresence>
               {tasks.length > 0 && tasks.map((task, index) => (
                  <motion.div 
                    key={task.id} 
                    className={`flex items-center border-2 border-[${themeColors.primary}] rounded-md`}
                    style={{ borderColor:themeColors.primary}}
                    variants={taskVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                  >
                    <input
                      type="text"
                      className="flex-grow p-2 rounded-l-md font-bold focus:outline-none focus:none"
                      style={{color:themeColors.primary, backgroundColor:themeColors.bgbutton1}}
                      value={task.title}
                      onChange={(e) => handleTaskChange(index, e.target.value)}
                      placeholder="Enter task"
                    />
                    <motion.button
                      type="button"
                      onClick={() => handleRemoveTask(index)}
                      className="p-2"
                      style={{color:themeColors.primary}}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <TrashLinear size="24" color={themeColors.primary}/>
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>
          <motion.div 
            className="flex justify-start"
            variants={itemVariants}
          >
            <motion.button
              type="submit"
              className={`bg-[${themeColors.bgbutton1}] flex items-center gap-3 border-2 border-[${themeColors.primary}] text-[${themeColors.primary}] font-bold py-2 px-4 rounded-md hover:bg-[#000000] hover:text-white transition-colors`}
              style={{ backgroundColor:themeColors.bgbutton1, borderColor:themeColors.primary, color:themeColors.primary }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <p style={{color:themeColors.primary}}>{isEditMode ? 'Update' : 'Save'}</p> 
              <DirectInboxLinear size="25" color={themeColors.primary}/>
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
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
    </div>
  );
};