import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavChecklist from '../components/NavChecklist';
import { Link, useLocation } from 'react-router-dom';
import { CalendarLinear, MagicpenBold, StatusLinear, Note2Broken, ReceiptTextLinear, TickCircleBold, TickCircleLinear } from 'react-iconsax-icons';
import { themeColors } from '../theme';
import { updateTaskStatus } from '../firebase/firestore';

export default function Checklist() {
  const location = useLocation();
  const { checklist } = location.state || {};
  const [tasks, setTasks] = useState(location.state?.tasks || []);
  const [allTasks, setAllTasks] = useState(0);
  const [doneTasks, setDoneTasks] = useState(0);
  const [stateChecklist, setStateChecklist] = useState('');
  const [emptyTask, setEmptyTask] = useState(false);
  const [completionPercentage, setCompletionPercentage] = useState(0);

  useEffect(() => {
    const taskCount = tasks.length;
    const completedTasks = tasks.filter(task => task.statut === 1).length;
    setAllTasks(taskCount);
    setDoneTasks(completedTasks);
    setCompletionPercentage(taskCount > 0 ? (completedTasks / taskCount) * 100 : 0);

    if (taskCount === 0) {
      setStateChecklist('Empty');
      setEmptyTask(true);
    } else if (completedTasks === taskCount) {
      setStateChecklist('Done');
    } else {
      setStateChecklist('In progress');
    }
  }, [tasks]);

  const handleTaskStatusChange = async (taskId) => {
    try {
      const updatedTasks = tasks.map(task => 
        task.id === taskId ? { ...task, statut: task.statut === 0 ? 1 : 0 } : task
      );
      
      await updateTaskStatus(checklist.id, taskId, updatedTasks.find(t => t.id === taskId).statut);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating task status:', error);
    }
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

  if (!checklist) {
    return (
      <>
        <div className='fixed w-full'>
          <NavChecklist/>
        </div>
        <motion.div 
          className='flex flex-col items-center justify-center min-h-screen text-center'
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Note2Broken size="100" color={themeColors.primary}/>
          <p className='font-bold text-gray-600 py-5'>No checklist has been selected</p>
          <Link to="/" className={`p-3 rounded-lg bg-[${themeColors.secondary}] opacity-40 text-white hover:opacity-100 transition-opacity`}
          style={{ backgroundColor:themeColors.secondary}}>
            Home
          </Link>
        </motion.div>
      </>
    );
  }

  return (
    <>
      <div className='fixed w-full'>
        <NavChecklist />
      </div>
      <motion.div
        className='mx-5 p-3'
        style={{ paddingTop: 70 }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 
          className='text-2xl font-extrabold mb-5'
          style={{color:themeColors.primary}}
          variants={itemVariants}
        >
          {checklist.title}
        </motion.h2>
        <motion.div 
          className='flex justify-between items-center'
          variants={itemVariants}
        >
          <div className={`flex gap-1 items-center border-2 border-[${themeColors.primary}] p-1 rounded-md font-bold bg-[${themeColors.bgbutton1}]`} style={{fontSize:9, color:themeColors.primary, borderColor:themeColors.primary, backgroundColor:themeColors.bgbutton1}}>
            {checklist.created_at} 
            <CalendarLinear size="20" color={themeColors.primary}/>
          </div>
          <div className='flex gap-1 justify-end items-center'>
            <div className={`border-2 border-[${themeColors.primary}] p-2 rounded-md font-bold  bg-[${themeColors.bgbutton1}]`}style={{fontSize:9,color:themeColors.primary, backgroundColor:themeColors.bgbutton1, borderColor: themeColors.primary }}>{doneTasks} / {allTasks}</div>
            <div className={`border-2 border-[${themeColors.primary}] p-2 rounded-md font-bold  bg-[${themeColors.primary}]`} style={{fontSize:9, color:themeColors.primary, backgroundColor:themeColors.bgbutton1, borderColor:themeColors.primary}}>{stateChecklist}</div>
            <Link to="/Formulaire" state={{ checklist: checklist, Linktasks: tasks }}>
              <motion.div className='p-1 rounded-lg' style={{backgroundColor:themeColors.primary}} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <MagicpenBold size="25" color={themeColors.bgbutton1}/>
              </motion.div>
            </Link>
          </div>
        </motion.div>
        <motion.div 
          className= ' rounded-md my-5 p-3 font-bold overflow-scroll scrollbar-hide'
          style={{height:100, color:themeColors.bgbutton1, backgroundColor:themeColors.primary,}}
          variants={itemVariants}
        >
          {checklist.description}...
        </motion.div>
        <motion.p
            className='text-xs font-bold text-center -mt-1'
            style={{color:themeColors.primary}}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {completionPercentage.toFixed(0)}% terminé
          </motion.p>
        <motion.div 
          className='bg-gray-400 rounded-full h-2 my-2'
          variants={itemVariants}
        >
          
          <motion.div
            className='h-full rounded-full'
            style={{backgroundColor:themeColors.primary}}
            initial={{ width: 0 }}
            animate={{ width: `${completionPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-2"
          variants={containerVariants}
        >
          {/* progress tasks */}
          <motion.div 
            className="border border-gray-200 rounded-lg shadow-sm"
            variants={itemVariants}
          >
            <div className="flex items-center gap-2 p-3 border-b rounded-lg border-gray-200" style={{backgroundColor:themeColors.bgbutton1}}>
              <StatusLinear size="24" color={themeColors.primary} />
              <h3 className="font-bold " style={{color:themeColors.primary}}>In progress tasks</h3>
            </div>
            <AnimatePresence>
              {emptyTask ? 
                <motion.div 
                  className='flex flex-col items-center justify-center my-5'
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <ReceiptTextLinear size="70" color={themeColors.primary}/>
                  <p className='text font-bold text-neutral-300'>No task have been created</p>
                </motion.div>
                : 
                <ul className="divide-y divide-gray-200">
                  {tasks.filter(task => task.statut === 0).map(task => (
                    <motion.li 
                      key={task.id} 
                      className="p-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center gap-3">
                        <motion.div 
                          onClick={() => handleTaskStatusChange(task.id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          style={{ cursor: 'pointer' }}
                        >
                          <StatusLinear size="20" color={themeColors.primary} className="flex-shrink-0 mt-1" />
                        </motion.div>
                        <p className="text-sm  font-medium" style={{color:themeColors.primary}}>{task.title}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              }
            </AnimatePresence>
          </motion.div>
          {/* completed tasks */}
          <motion.div 
            className="border border-gray-200 rounded-lg shadow-sm"
            variants={itemVariants}
          >
            <div className="flex items-center gap-2 p-3 border-b rounded-lg border-gray-200" style={{backgroundColor:themeColors.bgbutton1}}>
              <TickCircleBold size="24" color={themeColors.primary} />
              <h3 className="font-bold" style={{color:themeColors.primary}}>Completed tasks</h3>
            </div>
            <AnimatePresence>
              {emptyTask ? 
                <motion.div 
                  className='flex flex-col items-center justify-center my-5'
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <ReceiptTextLinear size="70" color={themeColors.primary}/>
                  <p className='text font-bold text-neutral-300'>No task have been created</p>
                </motion.div>
                : 
                <ul className="divide-y divide-gray-200">
                  {tasks.filter(task => task.statut === 1).map(task => (
                    <motion.li 
                      key={task.id} 
                      className="p-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center gap-3">
                        <motion.div 
                          onClick={() => handleTaskStatusChange(task.id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          style={{ cursor: 'pointer' }}
                        >
                          <TickCircleLinear size="20" color={themeColors.primary} className="flex-shrink-0 mt-1" />
                        </motion.div>
                        <p className="text-sm font-medium line-through" style={{color:themeColors.primary}}>{task.title}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              }
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};