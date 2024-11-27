import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useTheme } from '../theme/ThemeContext';
import  { UserOctagonLinear, CameraLinear, ActivityLinear, SmsLinear, CalendarLinear } from 'react-iconsax-icons';
import NavChecklist from './NavChecklist';

export default function Profile() {
    const [displayName, setDisplayName] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const { user, updateUserProfile, logout } = useAuth();
    const { themeColors } = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUserProfile() {
            try {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    setDisplayName(data.displayName || '');
                    setPhotoURL(data.photoURL || '');
                }
            } catch (err) {
                setError('Failed to load user profile');
            }
            setLoading(false);
        }

        fetchUserProfile();
    }, [user]);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError('');
            setSuccess('');
            setLoading(true);

            await updateUserProfile({
                displayName,
                photoURL
            });

            await setDoc(doc(db, 'users', user.uid), {
                displayName,
                photoURL,
                email: user.email,
                updatedAt: new Date().toISOString()
            }, { merge: true });

            setSuccess('Profile updated successfully!');
            setIsEditing(false);
        } catch (err) {
            setError('Failed to update profile: ' + err.message);
        }
        setLoading(false);
    }

    async function handleLogout() {
        try {
            await logout();
            navigate('/login');
        } catch (err) {
            setError('Failed to log out: ' + err.message);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: themeColors.bgApp }}>
                <div className="animate-pulse text-xl" style={{ color: themeColors.primary }}>Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen" style={{ backgroundColor: themeColors.bgApp}}>
            <div className='fixed w-full'>
                <NavChecklist />
            </div>
            {/* Main Content */}
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" style={{paddingTop:70}}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Profile Card */}
                    <div className="md:col-span-2">
                        <div className="rounded-2xl shadow-lg overflow-hidden" style={{ backgroundColor: themeColors.bgbutton1}}>
                            {/* Profile Header */}
                            <div className="p-6">
                                <div className="flex flex-col items-center">
                                    {/* Profile Picture */}
                                    <div className="relative mb-4">
                                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 shadow-inner"
                                             style={{ borderColor: themeColors.primary }}>
                                            {photoURL ? (
                                                <img src={photoURL} alt="Profile" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center"
                                                     style={{ backgroundColor: themeColors.bgApp }}>
                                                    <UserOctagonLinear size={40} color={themeColors.primary}/>
                                                </div>
                                            )}
                                        </div>
                                        {isEditing && (
                                            <button className="absolute bottom-0 right-0 p-2 rounded-full shadow-lg"
                                                    style={{ backgroundColor: themeColors.primary }}>
                                                <CameraLinear size={16} color= {themeColors.bgApp} />
                                            </button>
                                        )}
                                    </div>

                                    {/* User Info */}
                                    {!isEditing ? (
                                        <div className="text-center">
                                            <h2 className="text-xl font-semibold mb-1" style={{ color: themeColors.primary }}>
                                                {displayName || 'Add your name'}
                                            </h2>
                                            <p className="text-sm opacity-80" style={{ color: themeColors.primary }}>{user.email}</p>
                                        </div>
                                    ) : null}
                                </div>
                            </div>

                            {/* Edit Form */}
                            {isEditing ? (
                                <div className="px-6 pb-6">
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1" style={{ color: themeColors.primary }}>
                                                Display Name
                                            </label>
                                            <input
                                                type="text"
                                                value={displayName}
                                                onChange={(e) => setDisplayName(e.target.value)}
                                                className="w-full px-4 py-2 rounded-lg transition-colors"
                                                style={{
                                                    backgroundColor: themeColors.bgApp,
                                                    color: themeColors.primary,
                                                    borderColor: themeColors.separator
                                                }}
                                                placeholder="Enter your name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1" style={{ color: themeColors.primary }}>
                                                Photo URL
                                            </label>
                                            <input
                                                type="url"
                                                value={photoURL}
                                                onChange={(e) => setPhotoURL(e.target.value)}
                                                className="w-full px-4 py-2 rounded-lg transition-colors"
                                                style={{
                                                    backgroundColor: themeColors.bgApp,
                                                    color: themeColors.primary,
                                                    borderColor: themeColors.separator
                                                }}
                                                placeholder="Enter photo URL"
                                            />
                                        </div>
                                        <div className="flex space-x-3">
                                            <button
                                                type="button"
                                                onClick={() => setIsEditing(false)}
                                                className="flex-1 py-2 rounded-lg border transition-colors"
                                                style={{
                                                    borderColor: themeColors.primary,
                                                    color: themeColors.primary
                                                }}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="flex-1 py-2 rounded-lg transition-colors"
                                                style={{
                                                    backgroundColor: themeColors.primary,
                                                    color: themeColors.bgApp
                                                }}
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            ) : (
                                <div className="px-6 pb-6">
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="w-full py-2 rounded-lg transition-colors"
                                        style={{
                                            backgroundColor: themeColors.primary,
                                            color: themeColors.bgApp
                                        }}
                                    >
                                        Edit Profile
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Status Messages */}
                    {(error || success) && (
                        <div className="md:col-span-2">
                            {error && (
                                <div className="mb-4 p-4 rounded-lg bg-red-100 border border-red-400 text-red-700">
                                    {error}
                                </div>
                            )}
                            {success && (
                                <div className="mb-4 p-4 rounded-lg bg-green-100 border border-green-400 text-green-700">
                                    {success}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Account Info Card */}
                    <div className="p-6 rounded-2xl shadow-lg" style={{ backgroundColor: themeColors.bgbutton1 }}>
                        <div className="flex items-center space-x-4 mb-6">
                            <SmsLinear size="30" color={themeColors.primary} />
                            <div>
                                <h3 className="text-sm font-medium" style={{ color: themeColors.primary }}>Email Status</h3>
                                <p className="text-sm opacity-80" style={{ color: themeColors.primary }}>
                                    {user.emailVerified ? 'Verified' : 'Not Verified'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <CalendarLinear size="30" color={themeColors.primary} />
                            <div>
                                <h3 className="text-sm font-medium" style={{ color: themeColors.primary }}>Member Since</h3>
                                <p className="text-sm opacity-80" style={{ color: themeColors.primary }}>
                                    {new Date(user.metadata.creationTime).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Activity Card */}
                    <div className="p-6 rounded-2xl shadow-lg" style={{ backgroundColor: themeColors.bgbutton1 }}>
                        <div className="flex items-center space-x-4">
                            <ActivityLinear size="30" color={themeColors.primary} />
                            <div>
                                <h3 className="text-sm font-medium" style={{ color: themeColors.primary }}>Last Sign In</h3>
                                <p className="text-sm opacity-80" style={{ color: themeColors.primary }}>
                                    {new Date(user.metadata.lastSignInTime).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Logout Button */}
                    <div className="md:col-span-2">
                        <button
                            onClick={handleLogout}
                            className="w-full py-3 rounded-lg transition-colors"
                            style={{
                                backgroundColor: themeColors.primary,
                                color: themeColors.bgbutton1
                            }}
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
