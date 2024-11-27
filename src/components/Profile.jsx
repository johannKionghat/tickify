import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../theme/ThemeContext';
import { 
  UserOctagonLinear, 
  CameraLinear, 
  ActivityLinear, 
  Chart1Linear,
  ChartSquareLinear,
  TaskSquareLinear,
  Timer1Linear
} from 'react-iconsax-icons';
import { createUserProfile, updateUserProfile, getUserProfile, getChecklists } from '../firebase/firestore';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { motion, AnimatePresence } from 'framer-motion';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

export default function Profile() {
    const [displayName, setDisplayName] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [statistics, setStatistics] = useState({
        totalChecklists: 0,
        completedChecklists: 0,
        totalTasks: 0,
        completedTasks: 0,
        checklistsByStatus: { Empty: 0, 'In Progress': 0, Done: 0 },
        recentActivity: []
    });
    
    const { user, logout } = useAuth();
    const { themeColors } = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const profile = await getUserProfile();
                if (profile) {
                    setDisplayName(profile.displayName || '');
                    setPhotoURL(profile.photoURL || '');
                } else {
                    await createUserProfile({
                        displayName: user.displayName || '',
                        photoURL: user.photoURL || ''
                    });
                }

                // Fetch checklists for statistics
                const checklists = await getChecklists();
                const stats = {
                    totalChecklists: checklists.length,
                    completedChecklists: 0,
                    totalTasks: 0,
                    completedTasks: 0,
                    checklistsByStatus: { Empty: 0, 'In Progress': 0, Done: 0 },
                    recentActivity: []
                };

                checklists.forEach(checklist => {
                    const tasks = checklist.todo || [];
                    const completedTasksCount = tasks.filter(task => task.statut === 1).length;
                    stats.totalTasks += tasks.length;
                    stats.completedTasks += completedTasksCount;

                    if (tasks.length === 0) {
                        stats.checklistsByStatus.Empty++;
                    } else if (completedTasksCount === tasks.length) {
                        stats.checklistsByStatus.Done++;
                        stats.completedChecklists++;
                    } else {
                        stats.checklistsByStatus['In Progress']++;
                    }

                    stats.recentActivity.push({
                        title: checklist.title,
                        date: checklist.created_at,
                        status: tasks.length === 0 ? 'Empty' : 
                               completedTasksCount === tasks.length ? 'Done' : 'In Progress'
                    });
                });

                setStatistics(stats);
            } catch (err) {
                console.error('Error loading data:', err);
            }
            setLoading(false);
        }

        if (user) {
            fetchData();
        }
    }, [user]);

    const pieChartData = {
        labels: Object.keys(statistics.checklistsByStatus),
        datasets: [{
            data: Object.values(statistics.checklistsByStatus),
            backgroundColor: [
                themeColors.statusEmpty,
                themeColors.statusInProgress,
                themeColors.statusDone
            ],
            borderColor: themeColors.bgbutton1,
            borderWidth: 1
        }]
    };

    const completionRateData = {
        labels: ['Checklists', 'Tasks'],
        datasets: [{
            label: 'Completion Rate (%)',
            data: [
                (statistics.completedChecklists / statistics.totalChecklists) * 100 || 0,
                (statistics.completedTasks / statistics.totalTasks) * 100 || 0
            ],
            backgroundColor: themeColors.primary,
            borderColor: themeColors.bgbutton1,
            borderWidth: 1
        }]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: themeColors.primary
                }
            }
        },
        scales: {
            y: {
                ticks: { color: themeColors.primary },
                grid: { color: themeColors.bgbutton1 }
            },
            x: {
                ticks: { color: themeColors.primary },
                grid: { color: themeColors.bgbutton1 }
            }
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setLoading(true);

            await updateUserProfile({
                displayName,
                photoURL
            });

            setIsEditing(false);
        } catch (err) {
            console.error('Error updating profile:', err);
        } finally {
            setLoading(false);
        }
    }

    async function handleLogout() {
        try {
            await logout();
            navigate('/login');
        } catch (err) {
            console.error('Error logging out:', err);
        }
    }

    if (loading) {
        return (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center items-center h-screen"
                style={{ backgroundColor: themeColors.bgApp }}
            >
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
                    style={{ borderColor: themeColors.primary }}
                />
            </motion.div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen p-4 sm:p-6"
            style={{ backgroundColor: themeColors.bgApp }}
        >
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="max-w-4xl mx-auto bg-opacity-80 rounded-lg shadow-lg overflow-hidden"
                style={{ backgroundColor: themeColors.bgbutton1 }}
            >
                {/* Profile Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="p-6 flex flex-col sm:flex-row items-center justify-between"
                    style={{ backgroundColor: themeColors.bgbutton1 }}
                >
                    <div className="relative">
                        {photoURL ? (
                            <img src={photoURL} alt="Profile" className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover" />
                        ) : (
                            <UserOctagonLinear size="96" color={themeColors.primary} />
                        )}
                        {isEditing && (
                            <button className="absolute bottom-0 right-0 p-2 rounded-full" style={{ backgroundColor: themeColors.primary }}>
                                <CameraLinear size="20" color={themeColors.bgbutton1} />
                            </button>
                        )}
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                        {isEditing ? (
                            <div className="space-y-3 mb-3">
                                <input
                                    type="text"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    className="w-full mb-2 p-2 rounded"
                                    style={{ backgroundColor: themeColors.primary, color: themeColors.bgbutton1 }}
                                    placeholder="Enter your name"
                                />
                                <input
                                    type="url"
                                    value={photoURL}
                                    onChange={(e) => setPhotoURL(e.target.value)}
                                    className="w-full mb-2 p-2 rounded"
                                    style={{ backgroundColor: themeColors.primary, color: themeColors.bgbutton1 }}
                                    placeholder="Enter photo URL"
                                />
                            </div>
                        ) : (
                            <h1 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: themeColors.primary }}>
                                {displayName || 'Anonymous User'}
                            </h1>
                        )}
                        <p className="text-sm" style={{ color: themeColors.primary }}>{user.email}</p>
                        <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-3">
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="px-4 py-2 rounded-lg font-medium transition-colors"
                                style={{ backgroundColor: themeColors.primary, color: themeColors.bgbutton1 }}
                            >
                                {isEditing ? 'Cancel' : 'Edit Profile'}
                            </button>
                            {isEditing && (
                                <button
                                    onClick={handleSubmit}
                                    className="px-4 py-2 rounded-lg font-medium transition-colors"
                                    style={{ backgroundColor: themeColors.statusDone, color: themeColors.primary }}
                                >
                                    Save Changes
                                </button>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Statistics Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                    className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                    <AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.5 }}
                            className="stat-card p-4 rounded-lg"
                            style={{ backgroundColor: themeColors.bgbutton1 }}
                        >
                            <div className="flex items-center gap-4 mb-2">
                                <TaskSquareLinear size="24" color={themeColors.primary} />
                                <h3 className="font-bold" style={{ color: themeColors.primary }}>Total Checklists</h3>
                            </div>
                            <p className="text-3xl font-bold" style={{ color: themeColors.primary }}>{statistics.totalChecklists}</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.6 }}
                            className="stat-card p-4 rounded-lg"
                            style={{ backgroundColor: themeColors.bgbutton1 }}
                        >
                            <div className="flex items-center gap-4 mb-2">
                                <Chart1Linear size="24" color={themeColors.primary} />
                                <h3 className="font-bold" style={{ color: themeColors.primary }}>Completed</h3>
                            </div>
                            <p className="text-3xl font-bold" style={{ color: themeColors.primary }}>{statistics.completedChecklists}</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.7 }}
                            className="stat-card p-4 rounded-lg"
                            style={{ backgroundColor: themeColors.bgbutton1 }}
                        >
                            <div className="flex items-center gap-4 mb-2">
                                <Timer1Linear size="24" color={themeColors.primary} />
                                <h3 className="font-bold" style={{ color: themeColors.primary }}>In Progress</h3>
                            </div>
                            <p className="text-3xl font-bold" style={{ color: themeColors.primary }}>
                                {statistics.checklistsByStatus['In Progress']}
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.8 }}
                            className="stat-card p-4 rounded-lg"
                            style={{ backgroundColor: themeColors.bgbutton1 }}
                        >
                            <div className="flex items-center gap-4 mb-2">
                                <ChartSquareLinear size="24" color={themeColors.primary} />
                                <h3 className="font-bold" style={{ color: themeColors.primary }}>Empty</h3>
                            </div>
                            <p className="text-3xl font-bold" style={{ color: themeColors.primary }}>{statistics.checklistsByStatus.Empty}</p>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>

                {/* Charts Grid */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.9 }}
                    className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 1 }}
                        className="bg-opacity-80 rounded-lg p-4 sm:p-6"
                        style={{ backgroundColor: themeColors.bgbutton1 }}
                    >
                        <h3 className="font-bold mb-4 text-center sm:text-left" style={{ color: themeColors.primary }}>Checklist Status Distribution</h3>
                        <div className="aspect-square max-w-[400px] mx-auto">
                            <Pie data={pieChartData} options={chartOptions} />
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 1.1 }}
                        className="bg-opacity-80 rounded-lg p-4 sm:p-6"
                        style={{ backgroundColor: themeColors.bgbutton1 }}
                    >
                        <h3 className="font-bold mb-4 text-center sm:text-left" style={{ color: themeColors.primary }}>Completion Rates</h3>
                        <div className="aspect-square max-w-[400px] mx-auto">
                            <Bar data={completionRateData} options={chartOptions} />
                        </div>
                    </motion.div>
                </motion.div>

                {/* Recent Activity */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 1.2 }}
                    className="p-6 overflow-hidden"
                    style={{ height: 420 }}
                >
                    <h3 className="font-bold mb-4 text-center sm:text-left" style={{ color: themeColors.primary }}>Recent Activity</h3>
                    <div className="space-y-4 overflow-y-scroll" style={{ height: 350 }}>
                        {statistics.recentActivity.map((activity, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 * index }}
                                className="p-4 rounded-lg"
                                style={{ backgroundColor: themeColors.bgbutton1 }}
                            >
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 rounded-lg gap-2 sm:gap-0" 
                                     style={{ backgroundColor: themeColors.background }}>
                                    <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                                        <ActivityLinear size="20" color={
                                            activity.status === 'Done' ? themeColors.primary :
                                            activity.status === 'In Progress' ? themeColors.primary :
                                            themeColors.primary
                                        } />
                                        <div>
                                            <p className="font-medium" style={{ color: themeColors.primary }}>{activity.title}</p>
                                            <p className="text-sm" style={{ color: themeColors.primary }}>{activity.date}</p>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 rounded-full text-sm w-full sm:w-auto text-center" 
                                          style={{ 
                                              backgroundColor: 
                                                  activity.status === 'Done' ? themeColors.statusDone :
                                                  activity.status === 'In Progress' ? themeColors.statusInProgress :
                                                  themeColors.statusEmpty,
                                              color: themeColors.primary
                                          }}>
                                        {activity.status}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Edit Profile Form */}
                <AnimatePresence>
                    {isEditing && (
                        <motion.form
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            onSubmit={handleSubmit}
                            className="p-6 space-y-4"
                        >
                            <input
                                type="text"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                className="w-full mb-2 p-2 rounded"
                                style={{ backgroundColor: themeColors.primary, color: themeColors.bgbutton1 }}
                                placeholder="Enter your name"
                            />
                            <input
                                type="url"
                                value={photoURL}
                                onChange={(e) => setPhotoURL(e.target.value)}
                                className="w-full mb-2 p-2 rounded"
                                style={{ backgroundColor: themeColors.primary, color: themeColors.bgbutton1 }}
                                placeholder="Enter photo URL"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 rounded-lg font-medium transition-colors"
                                style={{ backgroundColor: themeColors.statusDone, color: themeColors.primary }}
                            >
                                Save Changes
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>

                {/* Logout Button */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 1.3 }}
                    className="mt-8 flex justify-center sm:justify-end"
                >
                    <button
                        onClick={handleLogout}
                        className="px-6 py-2 rounded-lg font-medium transition-colors w-full sm:w-auto"
                        style={{ backgroundColor: themeColors.primary, color: themeColors.bgbutton1 }}
                    >
                        Logout
                    </button>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
