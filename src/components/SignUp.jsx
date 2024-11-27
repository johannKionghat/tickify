import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../theme/ThemeContext';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup, signInWithGoogle } = useAuth();
    const { themeColors } = useTheme();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        try {
            setError('');
            setLoading(true);
            await signup(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to create an account: ' + err.message);
        }
        setLoading(false);
    }

    async function handleGoogleSignIn() {
        try {
            setError('');
            setLoading(true);
            await signInWithGoogle();
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to sign in with Google: ' + err.message);
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
                        Create Account
                    </h2>
                    <p className="mt-2 text-center text-sm" 
                       style={{ color: themeColors.primary }}>
                        Join TickiTask and start organizing
                    </p>
                </div>

                {error && (
                    <div className="text-sm sm:text-base bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded relative">
                        {error}
                    </div>
                )}

                <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                    <div className="space-y-4">
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
                            <label htmlFor="password" className="block text-sm font-medium mb-1" 
                                   style={{ color: themeColors.primary }}>
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="block w-full px-3 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 transition-colors text-sm sm:text-base"
                                style={{
                                    backgroundColor: themeColors.bgApp,
                                    color: themeColors.primary,
                                    borderColor: themeColors.separator
                                }}
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirm-password" className="block text-sm font-medium mb-1" 
                                   style={{ color: themeColors.primary }}>
                                Confirm Password
                            </label>
                            <input
                                id="confirm-password"
                                name="confirm-password"
                                type="password"
                                required
                                className="block w-full px-3 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 transition-colors text-sm sm:text-base"
                                style={{
                                    backgroundColor: themeColors.bgApp,
                                    color: themeColors.primary,
                                    borderColor: themeColors.separator
                                }}
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
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
                            Create Account
                        </button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full" 
                                 style={{ borderTop: `1px solid ${themeColors.separator}` }}></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2" 
                                  style={{ 
                                      backgroundColor: themeColors.bgbutton1,
                                      color: themeColors.primary 
                                  }}>
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={handleGoogleSignIn}
                            disabled={loading}
                            className="w-full flex justify-center items-center py-2.5 px-4 rounded-xl text-sm font-medium transition-opacity hover:opacity-80"
                            style={{ 
                                backgroundColor: themeColors.bgApp,
                                color: themeColors.primary,
                                border: `1px solid ${themeColors.separator}`
                            }}
                        >
                            <img
                                className="h-5 w-5 mr-2"
                                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                                alt="Google logo"
                            />
                            Sign up with Google
                        </button>
                    </div>
                </div>

                <div className="text-center mt-6">
                    <p className="text-sm" style={{ color: themeColors.primary }}>
                        Already have an account?{' '}
                        <Link to="/login" 
                              className="font-medium hover:opacity-80 transition-opacity" 
                              style={{ color: themeColors.primary }}>
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
