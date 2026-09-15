'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, User, Image as ImageIcon, BookOpen, Clock, 
  Calendar, MapPin, GraduationCap, Award, DollarSign, 
  Users, Globe, Code, Plus, Trash2, Loader2 
} from 'lucide-react';
import toast from 'react-hot-toast';
import { createTutor } from '@/app/lib/actions';

export default function AddTutorForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Form Field State
  const [formData, setFormData] = useState({
    tutorName: '',
    subject: '',
    image: '',
    bio: '',
    institution: '',
    qualification: '',
    experience: '1 Year',
    location: '',
    hourlyFee: '',
    totalSlot: '',
    teachingMode: 'Online',
    sessionStartDate: '',
    availableDays: '',
    availableTimeSlot: '',
  });

  // Array States for Skills & Languages
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  
  const [languages, setLanguages] = useState([]);
  const [languageInput, setLanguageInput] = useState('');

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e?.target || {};
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Skill Handlers
  const handleAddSkill = () => {
    if (skillInput?.trim()) {
      setSkills((prev) => [...prev, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (index) => {
    setSkills((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Language Handlers
  const handleAddLanguage = () => {
    if (languageInput?.trim()) {
      setLanguages((prev) => [...prev, languageInput.trim()]);
      setLanguageInput('');
    }
  };

  const handleRemoveLanguage = (index) => {
    setLanguages((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e?.preventDefault();
    setLoading(true);

    // Dynamic Payload Creation
    const payload = {
      ...formData,
      skills,
      languages,
      createdByEmail: 'user@example.com',
    };

    const result = await createTutor(payload);

    setLoading(false);

    if (result?.success) {
      toast.success(result?.message ?? 'Tutor profile created successfully!');
      setTimeout(() => {
        router?.push('/tutors');
      }, 500);
    } else {
      toast.error(result?.message ?? 'Something went wrong!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Navigation / Header */}
        <div className="flex items-center justify-between">
          <Link 
            href="/tutors" 
            className="inline-flex items-center space-x-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Tutors</span>
          </Link>
        </div>

        {/* Page Title */}
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Add New Tutor Profile</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Fill in the detailed information below to list a new qualified tutor on the platform.
          </p>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
          
          {/* Section 1: Basic Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">
              1. Basic Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Tutor Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-blue-600" /> Tutor Name *
                </label>
                <input
                  type="text"
                  name="tutorName"
                  required
                  value={formData?.tutorName}
                  onChange={handleChange}
                  placeholder="e.g. Anisur Rahman"
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-blue-600" /> Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData?.subject}
                  onChange={handleChange}
                  placeholder="e.g. Mathematics & Physics"
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Profile Image URL */}
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-blue-600" /> Image URL *
                </label>
                <input
                  type="url"
                  name="image"
                  required
                  value={formData?.image}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* About / Bio */}
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  About / Bio *
                </label>
                <textarea
                  name="bio"
                  rows="3"
                  required
                  value={formData?.bio}
                  onChange={handleChange}
                  placeholder="Brief overview of teaching experience, passion, and methods..."
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Education & Experience */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">
              2. Qualification & Background
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Institution */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-blue-600" /> Institution *
                </label>
                <input
                  type="text"
                  name="institution"
                  required
                  value={formData?.institution}
                  onChange={handleChange}
                  placeholder="e.g. BUET / Dhaka University"
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Degree / Qualification */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Degree / Qualification *
                </label>
                <input
                  type="text"
                  name="qualification"
                  required
                  value={formData?.qualification}
                  onChange={handleChange}
                  placeholder="e.g. B.Sc in Electrical Engineering"
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Experience */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-blue-600" /> Teaching Experience *
                </label>
                <select
                  name="experience"
                  value={formData?.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="1 Year">1 Year</option>
                  <option value="2 Years">2 Years</option>
                  <option value="3 Years">3 Years</option>
                  <option value="4 Years">4 Years</option>
                  <option value="5+ Years">5+ Years</option>
                </select>
              </div>

              {/* Location */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" /> Location *
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  value={formData?.location}
                  onChange={handleChange}
                  placeholder="e.g. Dhanmondi, Dhaka"
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Pricing, Slots & Schedule */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">
              3. Pricing & Schedule Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Hourly Fee */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-blue-600" /> Hourly Fee (BDT) *
                </label>
                <input
                  type="number"
                  name="hourlyFee"
                  required
                  min="100"
                  value={formData?.hourlyFee}
                  onChange={handleChange}
                  placeholder="500"
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Total Slots */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-blue-600" /> Available Total Slots *
                </label>
                <input
                  type="number"
                  name="totalSlot"
                  required
                  min="1"
                  value={formData?.totalSlot}
                  onChange={handleChange}
                  placeholder="5"
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Teaching Mode */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Teaching Mode *</label>
                <select
                  name="teachingMode"
                  value={formData?.teachingMode}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Online">Online</option>
                  <option value="Offline / Home">Offline / Home</option>
                  <option value="Both">Both (Online & Home)</option>
                </select>
              </div>

              {/* Session Start Date */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" /> Session Starts On *
                </label>
                <input
                  type="date"
                  name="sessionStartDate"
                  required
                  value={formData?.sessionStartDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Available Days */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Available Days *</label>
                <input
                  type="text"
                  name="availableDays"
                  required
                  value={formData?.availableDays}
                  onChange={handleChange}
                  placeholder="e.g. Sun - Thu / Sat, Mon, Wed"
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Available Time Slot */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-600" /> Time Slot *
                </label>
                <input
                  type="text"
                  name="availableTimeSlot"
                  required
                  value={formData?.availableTimeSlot}
                  onChange={handleChange}
                  placeholder="e.g. 05:00 PM - 08:00 PM"
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Array Fields (Skills & Languages) */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">
              4. Skills & Spoken Languages
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Skills Tag Input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-blue-600" /> Core Skills / Topics
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e?.target?.value)}
                    placeholder="e.g. Calculus"
                    className="flex-1 px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-3 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Render Skill Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {skills?.map((skill, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 dark:bg-gray-800 text-blue-700 dark:text-blue-400 rounded-full text-xs font-semibold">
                      {skill}
                      <button type="button" onClick={() => handleRemoveSkill(idx)} className="hover:text-red-500">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages Tag Input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-blue-600" /> Languages
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={languageInput}
                    onChange={(e) => setLanguageInput(e?.target?.value)}
                    placeholder="e.g. English"
                    className="flex-1 px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddLanguage}
                    className="px-3 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Render Language Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {languages?.map((lang, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-semibold">
                      {lang}
                      <button type="button" onClick={() => handleRemoveLanguage(idx)} className="hover:text-red-500">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-2xl font-bold text-sm transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Saving Tutor Profile...</span>
                </>
              ) : (
                <span>Publish Tutor Profile</span>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}