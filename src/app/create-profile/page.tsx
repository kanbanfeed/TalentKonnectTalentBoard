// app/create-profile/page.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Star, Zap, Crown, CheckCircle, MapPin, Clock, Video, DollarSign, User, Mail, Award, FileText, ChevronDown, X } from 'lucide-react';

// Custom Dropdown Component for Skills
const SkillsDropdown = ({ 
  skills, 
  selectedSkills, 
  onSkillToggle, 
  maxSkills = 10 
}: {
  skills: string[];
  selectedSkills: string[];
  onSkillToggle: (skill: string) => void;
  maxSkills?: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredSkills = skills.filter(skill =>
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const availableSkills = filteredSkills.filter(skill => !selectedSkills.includes(skill));

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Selected Skills Display */}
      <div className="mb-3">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Select Your Skills ({selectedSkills.length}/{maxSkills}) *
        </label>
        
        {/* Selected Skills Tags */}
        {selectedSkills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {selectedSkills.map((skill) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center space-x-2 group"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => onSkillToggle(skill)}
                  className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.span>
            ))}
          </div>
        )}

        {/* Dropdown Trigger */}
        <motion.button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          disabled={selectedSkills.length >= maxSkills}
          className="w-full bg-white border-2 border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 flex items-center justify-between group hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: selectedSkills.length >= maxSkills ? 1 : 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-gray-500">
            {selectedSkills.length === 0 
              ? `Choose up to ${maxSkills} skills...` 
              : `${selectedSkills.length} skill${selectedSkills.length === 1 ? '' : 's'} selected`
            }
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
          </motion.div>
        </motion.button>
      </div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl backdrop-blur-xl max-h-80 overflow-hidden"
          >
            {/* Search Input */}
            <div className="p-3 border-b border-gray-100">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Skills List */}
            <div className="max-h-56 overflow-y-auto">
              {availableSkills.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  {searchTerm ? 'No skills found' : 'All skills selected'}
                </div>
              ) : (
                <div className="p-2 space-y-1">
                  {availableSkills.map((skill, index) => (
                    <motion.button
                      key={skill}
                      type="button"
                      onClick={() => {
                        onSkillToggle(skill);
                        setSearchTerm('');
                      }}
                      className="w-full text-left px-4 py-3 rounded-xl transition-all duration-200 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 border border-transparent"
                      whileHover={{ scale: 1.02, x: 4 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center" />
                        <span className="font-medium">{skill}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-gray-100 bg-gray-50">
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>
                  {selectedSkills.length}/{maxSkills} skills selected
                </span>
                {selectedSkills.length >= maxSkills && (
                  <span className="text-amber-600 font-semibold">
                    Maximum reached
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function CreateProfilePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    spark_line: '',
    skills: [] as string[],
    city: '',
    price_usd: '',
    price_local: '',
    availability: 'Tonight',
    youtube_link: '',
    resume: null as File | null,
  });

  // ⚠️ IMPORTANT: Replace this array with EXACT options from your Airtable skills field
  const skillsOptions = [
    'Resume Writer',
    'Financial Analyst',
    'CTO',
    'Software Developer',
    'Web Designer',
    'Data Scientist',
    'Indian Cooking',
    'Music Vocals',
    'Vodka Cocktails',
    'Party Planning',
    'Marketing Manager',
    'Content Writer',
    'AI Prompt Engineering',
    'Data Analysis',
    'Personal Training',
    'Yoga Instruction',
    'Life Coaching',
    'Career Counseling',
    'Graphic Design',
    'Video Editing',
    'Public Speaking',
    'Language Tutoring',
    'Math Tutoring',
    'Science Tutoring',
    'Music Production',
    'Photography',
    'Social Media Management',
    'SEO Optimization',
    'Web Development',
    'Mobile App Development',
    'UI/UX Design',
    'Project Management',
    'Business Consulting',
    'Financial Planning',
    'Tax Consulting',
    'Legal Advice',
    'Real Estate Consulting',
    'Home Renovation',
    'Gardening',
    'Pet Training',
    'Fitness Training',
    'Nutrition Consulting',
    'Meditation Guidance',
    'Art Lessons',
    'Dance Lessons',
    'Cooking Classes',
    'Baking',
    'Mixology',
    'Event Planning',
    'Travel Planning',
    'Personal Shopping',
    'Fashion Styling',
    'Makeup Artistry',
    'Hair Styling',
    'Car Repair',
    'Tech Support',
    'Video Production',
    'Podcast Production',
    'Writing & Editing',
    'Translation Services',
    'Research Assistance',
    'Data Entry',
    'Virtual Assistance'
    // ⚠️ ADD ALL YOUR ACTUAL AIRTABLE SKILLS OPTIONS HERE
  ];

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const formDataToSend = new FormData();
    formDataToSend.append('full_name', formData.full_name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('spark_line', formData.spark_line);
    formDataToSend.append('skills', JSON.stringify(formData.skills));
    formDataToSend.append('city', formData.city);
    formDataToSend.append('price_usd', formData.price_usd);
    formDataToSend.append('price_local', formData.price_local);
    formDataToSend.append('availability', formData.availability);
    formDataToSend.append('youtube_link', formData.youtube_link);

    console.log('🔄 Sending form data:', {
      full_name: formData.full_name,
      email: formData.email,
      skills: formData.skills,
      city: formData.city,
      price_usd: formData.price_usd,
      price_local: formData.price_local,
      availability: formData.availability,
      youtube_link: formData.youtube_link
    });

    const response = await fetch('/api/profiles', {
      method: 'POST',
      body: formDataToSend,
    });

    const result = await response.json();
    console.log('📦 API Response:', result);

    if (response.ok) {
      router.push('/talent-board?success=true');
    } else {
      alert(`Error: ${result.error} - ${result.details || ''}`);
    }
  } catch (error) {
    console.error('💥 Fetch error:', error);
    alert('Network error. Please check console.');
  } finally {
    setIsSubmitting(false);
  }
};

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => {
      if (prev.skills.includes(skill)) {
        return { ...prev, skills: prev.skills.filter(s => s !== skill) };
      } else if (prev.skills.length < 10) {
        return { ...prev, skills: [...prev.skills, skill] };
      }
      return prev;
    });
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, resume: file }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-emerald-200 to-teal-200 rounded-3xl opacity-40 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-3xl opacity-30 blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Sticky Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-xl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-3"
            >
              <motion.div 
                className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Crown className="w-5 h-5 text-white" />
              </motion.div>
              <motion.h1 
                className="text-2xl font-black bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent"
              >
                TalentKonnect
              </motion.h1>
            </motion.div>
            
            <motion.a
              href="/talent-board"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white border border-gray-300 text-gray-700 px-5 py-2.5 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all duration-300 flex items-center space-x-2 group text-sm"
            >
              <span>Browse Talents</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-black text-gray-900 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Create Your{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Talent Profile
              </span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Showcase your skills in one compelling line and start getting booked by clients worldwide.
            </motion.p>
          </motion.div>

          {/* Success Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl p-6 mb-8 text-white shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                  }}
                >
                  <Award className="w-8 h-8" />
                </motion.div>
                <div>
                  <h2 className="font-bold text-lg">Welcome to TalentKonnect! 🎉</h2>
                  <p className="text-emerald-100">Your $7 payment is processed • 7 credits available</p>
                </div>
              </div>
              <motion.div
                className="bg-white text-emerald-600 px-4 py-2 rounded-full font-semibold text-sm"
                whileHover={{ scale: 1.05 }}
              >
                Verified ✓
              </motion.div>
            </div>
          </motion.div>

          {/* Form Container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {/* Personal Information Section */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <User className="w-6 h-6 mr-3 text-emerald-500" />
                  Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.full_name}
                      onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </motion.div>

                  {/* Email */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </motion.div>
                </div>
              </div>

              {/* Spark Line */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-amber-500" />
                  Your Spark Line (256 characters) *
                </label>
                <textarea
                  required
                  maxLength={256}
                  value={formData.spark_line}
                  onChange={(e) => setFormData({...formData, spark_line: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 h-24 resize-none"
                  placeholder="Describe what you do in one compelling line that grabs attention..."
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-500">
                    This is your chance to make a great first impression
                  </span>
                  <span className={`text-sm font-medium ${
                    formData.spark_line.length > 200 ? 'text-amber-600' : 'text-gray-500'
                  }`}>
                    {formData.spark_line.length}/256
                  </span>
                </div>
              </motion.div>

              {/* Skills Selection - UPDATED TO DROPDOWN */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                <SkillsDropdown
                  skills={skillsOptions}
                  selectedSkills={formData.skills}
                  onSkillToggle={handleSkillToggle}
                  maxSkills={10}
                />
              </motion.div>

              {/* Location & Pricing */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Location */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.8 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                    Location & Availability
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                        placeholder="Enter your city"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        <Clock className="w-4 h-4 inline mr-2 text-purple-500" />
                        Availability *
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {['Tonight', '24h', 'This Week', 'Weekend'].map(option => (
                          <motion.label
                            key={option}
                            whileHover={{ scale: 1.05 }}
                            className={`relative flex items-center justify-center p-3 border-2 rounded-2xl cursor-pointer transition-all duration-300 text-center ${
                              formData.availability === option
                                ? 'border-purple-500 bg-purple-50 text-purple-700 font-semibold shadow-md'
                                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="availability"
                              checked={formData.availability === option}
                              onChange={() => setFormData({...formData, availability: option})}
                              className="hidden"
                            />
                            <span className="text-sm">{option}</span>
                          </motion.label>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Pricing */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.8 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-green-500" />
                    Pricing Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        45-Minute Session Price (USD) *
                      </label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={formData.price_usd}
                        onChange={(e) => setFormData({...formData, price_usd: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                        placeholder="25"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Local Currency Equivalent *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.price_local}
                        onChange={(e) => setFormData({...formData, price_local: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                        placeholder="₹2,000 or €22"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* YouTube Link */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <Video className="w-5 h-5 mr-2 text-red-500" />
                  YouTube Intro Video (Optional)
                </label>
                <input
                  type="url"
                  value={formData.youtube_link}
                  onChange={(e) => setFormData({...formData, youtube_link: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                  placeholder="https://youtube.com/your-intro-video"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Add a short intro video to increase your booking chances by 3x
                </p>
              </motion.div>

              {/* Resume Upload Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.1 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-indigo-500" />
                  Resume Upload (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-emerald-400 transition-all duration-300 bg-gray-50/50">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleResumeChange}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 font-medium mb-2">
                      {formData.resume ? formData.resume.name : 'Upload your resume'}
                    </p>
                    <p className="text-gray-500 text-sm mb-3">
                      PDF, DOC, DOCX, TXT (Max 5MB)
                    </p>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center bg-emerald-500 text-white px-4 py-2 rounded-xl font-medium text-sm"
                    >
                      Choose File
                    </motion.div>
                  </label>
                  {formData.resume && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-3 flex items-center justify-center space-x-2 text-emerald-600"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">File selected</span>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, resume: null }))}
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </motion.div>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Upload your resume to showcase your professional background and experience
                </p>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2 }}
                className="pt-6 border-t border-gray-200"
              >
                <motion.button
                  type="submit"
                  disabled={isSubmitting || formData.skills.length === 0}
                  onHoverStart={() => setIsHovered(true)}
                  onHoverEnd={() => setIsHovered(false)}
                  className="group relative bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <AnimatePresence>
                    {isHovered && !isSubmitting && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12"
                      />
                    )}
                  </AnimatePresence>
                  <span className="relative z-10 flex items-center justify-center space-x-3">
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        <span>Creating Your Profile...</span>
                      </>
                    ) : (
                      <>
                        <Star className="w-5 h-5" />
                        <span>Launch My Talent Profile</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                </motion.button>

                <p className="text-center text-gray-600 text-sm mt-4">
                  ⚡ You will appear on the Talent Board instantly after submission
                </p>
              </motion.div>
            </form>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4 }}
            className="text-center mt-8"
          >
            <a 
              href="/talent-board"
              className="inline-flex items-center text-gray-600 hover:text-emerald-600 font-semibold transition-colors duration-300 group"
            >
              <ArrowRight className="w-4 h-4 mr-2 transform rotate-180 group-hover:-translate-x-1 transition-transform" />
              Browse other talent profiles for inspiration
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}