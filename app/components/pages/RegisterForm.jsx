'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, Sparkles, Camera, CheckCircle2, AlertCircle } from 'lucide-react';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import { authClient } from '@/app/lib/auth-client';

export default function RegisterForm({ onSwitchToLogin }) {
  const [authMethod, setAuthMethod] = useState('social');
  const [imagePreview, setImagePreview] = useState(null);
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Declared formData state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    image: null,
  });

  const handleChange = (e) => {
    const name = e?.target?.name;
    const value = e?.target?.value;

    if (!name) return;
    
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      if (name === 'confirmPassword' || name === 'password') {
        if (updated?.confirmPassword && updated?.password !== updated?.confirmPassword) {
          setPasswordError('Passwords do not match!');
        } else {
          setPasswordError('');
        }
      }

      return updated;
    });
  };

  const handleImageChange = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
      toast.success('Image selected successfully!');
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (formData?.password !== formData?.confirmPassword) {
      setPasswordError('Passwords do not match!');
      toast.error('Passwords do not match!');
      return;
    }

    const toastId = toast.loading('Creating your account...');
    setLoading(true);

    try {
      const { data, error } = await authClient?.signUp?.email({
        email: formData?.email,
        password: formData?.password,
        name: formData?.name,
        image: formData?.image ? URL.createObjectURL(formData?.image) : undefined,
        callbackURL: '/signin',
      });

      if (error) {
        toast.error(error?.message || 'Registration failed!', { id: toastId });
        return;
      }

      toast.success('Account created successfully!', { id: toastId });
      console.log('User registered successfully:', data);
    } catch (err) {
      toast.error('Something went wrong. Please try again.', { id: toastId });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider) => {
    const toastId = toast.loading(`Connecting to ${provider}...`);
    try {
      await authClient?.signIn?.social({ provider });
      toast.dismiss(toastId);
    } catch (err) {
      toast.error(`Failed to connect with ${provider}`, { id: toastId });
      console.error(err);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Toast Notification Container */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Background Neon Ambient Glows */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-fuchsia-500/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/30 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative min-h-[580px] bg-slate-950/70 backdrop-blur-2xl border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_-12px_rgba(217,70,239,0.25)] flex flex-col justify-between overflow-hidden"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20 mb-2">
                <Sparkles className="w-3 h-3" /> Start Journey
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Create Account
              </h1>
            </div>
          </div>

          {/* Segmented Tab Switcher */}
          <div className="grid grid-cols-2 p-1 bg-slate-900/90 border border-slate-800/80 rounded-2xl mb-5 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setAuthMethod('social')}
              className={`py-2.5 rounded-xl transition-all duration-300 ${
                authMethod === 'social'
                  ? 'bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white shadow-lg shadow-fuchsia-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Quick Social
            </button>
            <button
              type="button"
              onClick={() => setAuthMethod('email')}
              className={`py-2.5 rounded-xl transition-all duration-300 ${
                authMethod === 'email'
                  ? 'bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white shadow-lg shadow-fuchsia-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Direct Register
            </button>
          </div>

          {/* Dynamic Content Body */}
          <AnimatePresence mode="wait">
            {authMethod === 'social' ? (
              <motion.div
                key="social"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="space-y-3 py-6"
              >
                <button
                  type="button"
                  onClick={() => handleSocialSignIn('google')}
                  className="w-full py-3.5 px-4 bg-slate-900/90 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 text-white font-medium text-sm rounded-2xl flex items-center justify-center gap-3 transition-all group cursor-pointer"
                >
                  <FaGoogle className="w-5 h-5 text-red-400 group-hover:scale-110 transition-transform" />
                  <span>Sign up with Google</span>
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="email"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleSubmit}
                className="space-y-3"
              >
                {/* Image Upload Input */}
                <div className="flex flex-col items-center justify-center pb-1">
                  <div className="relative group cursor-pointer">
                    <div className="w-20 h-20 rounded-full border-2 border-dashed border-fuchsia-500/40 group-hover:border-fuchsia-500 overflow-hidden bg-slate-900/80 flex items-center justify-center transition-all">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Profile Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Camera className="w-6 h-6 text-slate-500 group-hover:text-fuchsia-400 transition-colors" />
                      )}
                    </div>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <div className="absolute bottom-0 right-0 p-1.5 bg-fuchsia-600 rounded-full text-white shadow-md pointer-events-none">
                      <Camera className="w-3 h-3" />
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1.5">
                    Upload Profile Picture
                  </span>
                </div>

                {/* Name Field */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData?.name || ''}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-2 bg-slate-900/60 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData?.email || ''}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-4 py-2 bg-slate-900/60 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="password"
                      name="password"
                      required
                      value={formData?.password || ''}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2 bg-slate-900/60 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all"
                    />
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-300">
                      Confirm Password
                    </label>
                    {passwordError ? (
                      <span className="text-[10px] text-red-400 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3" /> {passwordError}
                      </span>
                    ) : formData?.confirmPassword && (
                      <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                        <CheckCircle2 className="w-3 h-3" /> Matched
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="password"
                      name="confirmPassword"
                      required
                      value={formData?.confirmPassword || ''}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className={`w-full pl-10 pr-4 py-2 bg-slate-900/60 border rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none transition-all ${
                        passwordError
                          ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                          : 'border-slate-800 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500'
                      }`}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={loading}
                  type="submit"
                  className="w-full mt-3 py-3 px-4 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:opacity-90 text-white font-bold text-sm rounded-2xl shadow-lg shadow-fuchsia-500/25 flex items-center justify-center space-x-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-slate-800/80 text-center text-xs text-slate-400">
          <span>Already registered?</span>
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="ml-1.5 font-bold text-fuchsia-400 hover:text-fuchsia-300 transition-colors cursor-pointer"
          >
            Sign In
          </button>
        </div>
      </motion.div>
    </div>
  );
}