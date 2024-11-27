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
import NavChecklist from './NavChecklist';
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
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2" style={{ borderColor: themeColors.primary }}></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen" style={{ backgroundColor: themeColors.background }}>
            <div className='fixed w-full z-10'>
                <NavChecklist />
            </div>
            <div className="container mx-auto px-4 py-8" style={{paddingTop:70}}>
                {/* Profile Header */}
                <div className="bg-opacity-80 rounded-lg p-4 sm:p-6 mb-8" style={{ backgroundColor: themeColors.bgbutton1 }}>
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
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
                    </div>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                    <div className="bg-opacity-80 rounded-lg p-4 sm:p-6" style={{ backgroundColor: themeColors.bgbutton1 }}>
                        <div className="flex items-center gap-4 mb-2">
                            <TaskSquareLinear size="24" color={themeColors.primary} />
                            <h3 className="font-bold" style={{ color: themeColors.primary }}>Total Checklists</h3>
                        </div>
                        <p className="text-3xl font-bold" style={{ color: themeColors.primary }}>{statistics.totalChecklists}</p>
                    </div>
                    <div className="bg-opacity-80 rounded-lg p-4 sm:p-6" style={{ backgroundColor: themeColors.bgbutton1 }}>
                        <div className="flex items-center gap-4 mb-2">
                            <Chart1Linear size="24" color={themeColors.primary} />
                            <h3 className="font-bold" style={{ color: themeColors.primary }}>Completed</h3>
                        </div>
                        <p className="text-3xl font-bold" style={{ color: themeColors.primary }}>{statistics.completedChecklists}</p>
                    </div>
                    <div className="bg-opacity-80 rounded-lg p-4 sm:p-6" style={{ backgroundColor: themeColors.bgbutton1 }}>
                        <div className="flex items-center gap-4 mb-2">
                            <Timer1Linear size="24" color={themeColors.primary} />
                            <h3 className="font-bold" style={{ color: themeColors.primary }}>In Progress</h3>
                        </div>
                        <p className="text-3xl font-bold" style={{ color: themeColors.primary }}>
                            {statistics.checklistsByStatus['In Progress']}
                        </p>
                    </div>
                    <div className="bg-opacity-80 rounded-lg p-4 sm:p-6" style={{ backgroundColor: themeColors.bgbutton1 }}>
                        <div className="flex items-center gap-4 mb-2">
                            <ChartSquareLinear size="24" color={themeColors.primary} />
                            <h3 className="font-bold" style={{ color: themeColors.primary }}>Empty</h3>
                        </div>
                        <p className="text-3xl font-bold" style={{ color: themeColors.primary }}>{statistics.checklistsByStatus.Empty}</p>
                    </div>
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
                    <div className="bg-opacity-80 rounded-lg p-4 sm:p-6" style={{ backgroundColor: themeColors.bgbutton1 }}>
                        <h3 className="font-bold mb-4 text-center sm:text-left" style={{ color: themeColors.primary }}>Checklist Status Distribution</h3>
                        <div className="aspect-square max-w-[400px] mx-auto">
                            <Pie data={pieChartData} options={chartOptions} />
                        </div>
                    </div>
                    <div className="bg-opacity-80 rounded-lg p-4 sm:p-6" style={{ backgroundColor: themeColors.bgbutton1 }}>
                        <h3 className="font-bold mb-4 text-center sm:text-left" style={{ color: themeColors.primary }}>Completion Rates</h3>
                        <div className="aspect-square max-w-[400px] mx-auto">
                            <Bar data={completionRateData} options={chartOptions} />
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-opacity-80 rounded-lg p-4 sm:p-6 overflow-hidden" style={{ backgroundColor: themeColors.bgbutton1, height:420 }}>
                    <h3 className="font-bold mb-4 text-center sm:text-left" style={{ color: themeColors.primary }}>Recent Activity</h3>
                    <div className="space-y-3 sm:space-y-4 overflow-y-scroll" style={{height:350}}>
                        {statistics.recentActivity.slice(0, 5).map((activity, index) => (
                            <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 rounded-lg gap-2 sm:gap-0" 
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
                        ))}
                    </div>
                </div>

                {/* Logout Button */}
                <div className="mt-8 flex justify-center sm:justify-end">
                    <button
                        onClick={handleLogout}
                        className="px-6 py-2 rounded-lg font-medium transition-colors w-full sm:w-auto"
                        style={{ backgroundColor: themeColors.primary, color: themeColors.bgbutton1 }}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
