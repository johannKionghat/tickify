import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useTheme } from '../theme/ThemeContext';

export const PasswordReset = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { resetPassword } = useAuth();
    const { themeColors } = useTheme();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setMessage('');
            setError('');
            setLoading(true);
            await resetPassword(email);
            setMessage('Check your inbox for further instructions');
        } catch (err) {
            setError('Failed to reset password: ' + err.message);
        }
        setLoading(false);
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8" 
             style={{ backgroundColor: themeColors.bgApp }}>
            <div className="max-w-md w-full space-y-6 p-6 sm:p-8 rounded-2xl shadow-lg" 
                 style={{ 
                     backgroundColor: themeColors.bgbutton1,
                     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                 }}>
                <div>
                    <h2 className="mt-4 text-center text-2xl sm:text-3xl font-bold" 
                        style={{ color: themeColors.primary }}>
                        Reset Password
                    </h2>
                    <p className="mt-2 text-center text-sm" 
                       style={{ color: themeColors.primary }}>
                        Enter your email to reset your password
                    </p>
                </div>

                {error && (
                    <div className="text-sm sm:text-base bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded relative">
                        {error}
                    </div>
                )}
                
                {message && (
                    <div className="text-sm sm:text-base bg-green-100 border border-green-400 text-green-700 px-3 py-2 rounded relative">
                        {message}
                    </div>
                )}

                <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1" 
                               style={{ color: themeColors.primary }}>
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="block w-full px-3 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 transition-colors text-sm sm:text-base"
                            style={{
                                backgroundColor: themeColors.bgApp,
                                color: themeColors.primary,
                                borderColor: themeColors.separator
                            }}
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-2.5 px-4 rounded-xl text-sm font-medium transition-opacity hover:opacity-80"
                            style={{ 
                                backgroundColor: themeColors.primary,
                                color: themeColors.bgApp
                            }}
                        >
                            Reset Password
                        </button>
                    </div>
                </form>

                <div className="mt-4 text-center space-y-2">
                    <p className="text-sm" style={{ color: themeColors.primary }}>
                        <Link to="/login" 
                              className="hover:opacity-80 transition-opacity" 
                              style={{ color: themeColors.primary }}>
                            Back to Login
                        </Link>
                    </p>
                    <p className="text-sm" style={{ color: themeColors.primary }}>
                        Need an account?{' '}
                        <Link to="/signup" 
                              className="hover:opacity-80 transition-opacity" 
                              style={{ color: themeColors.primary }}>
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
