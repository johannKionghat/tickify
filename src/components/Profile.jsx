import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function Profile() {
    const [displayName, setDisplayName] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState('');
    const { user, updateUserProfile } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUserProfile() {
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                // Try to get existing user profile
                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const data = userDoc.data();
                    setDisplayName(data.displayName || user.displayName || '');
                    setPhotoURL(data.photoURL || user.photoURL || '');
                } else {
                    // If no profile exists, create one with default values
                    const defaultData = {
                        displayName: user.displayName || '',
                        photoURL: user.photoURL || '',
                        email: user.email,
                        createdAt: new Date().toISOString()
                    };
                    await setDoc(userDocRef, defaultData);
                    setDisplayName(defaultData.displayName);
                    setPhotoURL(defaultData.photoURL);
                }
            } catch (err) {
                console.error('Error fetching profile:', err);
                setError('Failed to load user profile. Please try again later.');
            }
            setLoading(false);
        }

        fetchUserProfile();
    }, [user]);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!user) {
            setError('No user found. Please log in again.');
            return;
        }

        try {
            setError('');
            setSuccess('');
            setLoading(true);

            // Update Firebase Auth profile
            await updateUserProfile({
                displayName,
                photoURL
            });

            // Update Firestore profile
            const userDocRef = doc(db, 'users', user.uid);
            await setDoc(userDocRef, {
                displayName,
                photoURL,
                email: user.email,
                updatedAt: new Date().toISOString()
            }, { merge: true });

            setSuccess('Profile updated successfully!');
        } catch (err) {
            console.error('Error updating profile:', err);
            setError('Failed to update profile: ' + err.message);
        }
        setLoading(false);
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="text-white text-xl">Please log in to view your profile.</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-lg shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                        Profile Settings
                    </h2>
                    {photoURL && (
                        <div className="mt-4 flex justify-center">
                            <img
                                src={photoURL}
                                alt="Profile"
                                className="h-24 w-24 rounded-full object-cover border-2 border-indigo-500"
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/150';
                                    setPhotoURL('');
                                }}
                            />
                        </div>
                    )}
                    <p className="mt-2 text-center text-sm text-gray-400">
                        {user.email}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-500 text-white p-3 rounded-md text-center">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="bg-green-500 text-white p-3 rounded-md text-center">
                        {success}
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="display-name" className="sr-only">
                                Display Name
                            </label>
                            <input
                                id="display-name"
                                name="display-name"
                                type="text"
                                required
                                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Display Name"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="photo-url" className="sr-only">
                                Photo URL
                            </label>
                            <input
                                id="photo-url"
                                name="photo-url"
                                type="url"
                                className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Photo URL (optional)"
                                value={photoURL}
                                onChange={(e) => setPhotoURL(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between space-x-4">
                        <button
                            type="button"
                            onClick={() => navigate('/dashboard')}
                            className="group relative flex-1 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            Back to Dashboard
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative flex-1 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
