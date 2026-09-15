'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { authClient } from '@/app/lib/auth-client';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
    const router = useRouter();
    const [loading, setLoading]=useState(false)
  const [authMethod, setAuthMethod] = useState('social'); // 'social' | 'email'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e?.target || {};
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
const onSwitchToRegister = () => {
    router.push('/register');
  };


const handleSubmit = async (e) => {
  e?.preventDefault();

  const email = formData?.email;
  const password = formData?.password;

  if (!email || !password) {
    toast.error('Email and Password are required!');
    return;
  }

  const toastId = toast.loading('Signing in...');
  setLoading(true);

  try {
    const { data, error } = await authClient?.signIn?.email({
      email,
      password,
      callbackURL: '/',
      rememberMe: true,
    });

    if (error) {
      toast.error(error?.message || 'Login failed. Please check your credentials.', { id: toastId });
      console.error('Login error:', error);
      return;
    }

    toast.success('Signed in successfully!', { id: toastId });
    console.log('Login successful data:', data);
  } catch (err) {
    toast.error('Something went wrong. Please try again.', { id: toastId });
    console.error('Unexpected error:', err);
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
      {/* Background Neon Ambient Glows */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-500/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-fuchsia-500/30 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative min-h-[560px] bg-slate-950/70 backdrop-blur-2xl border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_-12px_rgba(99,102,241,0.25)] flex flex-col justify-between overflow-hidden"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-2">
                <Sparkles className="w-3 h-3" /> Secure Access
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Welcome Back
              </h1>
            </div>
          </div>

          {/* Unique Segmented Tab Switcher */}
          <div className="grid grid-cols-2 p-1 bg-slate-900/90 border border-slate-800/80 rounded-2xl mb-6 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setAuthMethod('social')}
              className={`py-2.5 rounded-xl transition-all duration-300 ${
                authMethod === 'social'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20'
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
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Direct Login
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
                className="space-y-3 py-4"
              >
                <button
                  type="button"
                  onClick={handleSocialSignIn("google")}
                  className="w-full py-3.5 px-4 bg-slate-900/90 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 text-white font-medium text-sm rounded-2xl flex items-center justify-center gap-3 transition-all group"
                >
                  <FaGoogle className="w-5 h-5 text-red-400 group-hover:scale-110 transition-transform" />
                  <span>Sign in with Google</span>
                </button>

                {/* <button
                  type="button"
                  className="w-full py-3.5 px-4 bg-slate-900/90 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 text-white font-medium text-sm rounded-2xl flex items-center justify-center gap-3 transition-all group"
                >
                  <FaGithub className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                  <span>Continue with GitHub</span>
                </button> */}
              </motion.div>
            ) : (
              <motion.form
                key="email"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-4 py-3 bg-slate-900/60 border border-slate-800 rounded-2xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="password"
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 bg-slate-900/60 border border-slate-800 rounded-2xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="w-full mt-2 py-3.5 px-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold text-sm rounded-2xl shadow-lg shadow-indigo-500/25 flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <span>Authorize & Login</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 text-center text-xs text-slate-400">
          <span>New around here?</span>
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="ml-1.5 font-bold text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
          >
            Create Account
          </button>
        </div>
      </motion.div>
    </div>
  );
}