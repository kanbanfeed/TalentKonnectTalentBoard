// app/talent-board/page.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Search, Filter, Play, Star, Crown, Zap, MapPin, Clock, X, ChevronDown, User } from 'lucide-react';

interface Profile {
  id: string;
  full_name: string;
  email: string;
  spark_line: string;
  skills: string[];
  city: string;
  price_usd: number;
  price_local: string;
  availability: string;
  status: string;
  youtube_link?: string;
  resume?: any;
  photo_url?: string;
}

interface DropdownProps {
  label: string;
  icon: React.ReactNode;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

// Static image URLs for demonstration
const staticImages = [
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFsZSUyMGltYWdlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600',
  'https://media.istockphoto.com/id/1077150288/photo/portrait-of-woman-at-home.jpg?s=612x612&w=0&k=20&c=bNy0vuwrlrNDSkzo1bAa8QUisLTqUFZTi4yFEXuRx-0=',
  'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  'https://media.istockphoto.com/id/2170942573/photo/portrait-of-beautiful-woman-with-hand-on-chin-against-house.jpg?s=612x612&w=0&k=20&c=ARayTAVPjjPBh1UVmbS0juU01JWKXcsM7d1WPsBHuM0=',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  'https://media.istockphoto.com/id/1142130251/photo/portrait-of-a-beautiful-indian-girl.jpg?s=612x612&w=0&k=20&c=RpUrbX0osL2hlyREkbkJ7WaZ30MMtieV6vs-SJ46htk=',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
];

// Custom Dropdown Component
const CustomDropdown = ({ label, icon, value, options, onChange }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
        {icon}
        {label}
      </label>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 flex items-center justify-between group hover:border-gray-400 shadow-sm"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="text-gray-700 truncate">{value}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute z-[100] w-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl backdrop-blur-xl max-h-60 overflow-y-auto"
            style={{ zIndex: 1000 }}
          >
            <div className="p-2 space-y-1">
              {options.map((option, index) => (
                <motion.button
                  key={option}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                    value === option
                      ? 'bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  whileHover={{ scale: 1.02, x: 4 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Profile Card Component
const ProfileCard = ({ profile, onVideoPlay }: { profile: Profile; onVideoPlay: (videoId: string) => void }) => {
  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const patterns = [
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/,
      /youtube\.com\/watch\?v=([^"&?\/\s]{11})/,
      /youtu\.be\/([^"&?\/\s]{11})/,
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) return match[1];
    }
    return null;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Tonight': return 'bg-red-500/10 text-red-700 border-red-200';
      case '24h': return 'bg-green-500/10 text-green-700 border-green-200';
      case 'This Week': return 'bg-blue-500/10 text-blue-700 border-blue-200';
      default: return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  // Get static image based on profile ID to ensure consistency
  const getStaticImage = (profileId: string) => {
    // Use profile ID to generate consistent image index
    const idNumber = profileId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return staticImages[idNumber % staticImages.length];
  };

  // Use static image for all profiles
  const profileImage = getStaticImage(profile.id);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-white rounded-3xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
    >
      {/* Profile Header with Image */}
      <div className="relative">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5" />
        
        <div className="relative p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              {/* Profile Image - Always use static image with fallback to initials */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="relative"
              >
                {!imageError ? (
                  <img 
                    src={profileImage} 
                    alt={profile.full_name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-lg"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {getInitials(profile.full_name)}
                  </div>
                )}
                {/* Online Status Indicator */}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
              </motion.div>
              
              <div className="min-w-0">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300 truncate">
                  {profile.full_name}
                </h3>
                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span className="truncate">{profile.city}</span>
                </div>
              </div>
            </div>
            
            <motion.div
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${getAvailabilityColor(profile.availability)}`}
              whileHover={{ scale: 1.05 }}
            >
              {profile.availability}
            </motion.div>
          </div>
          
          {/* Bio */}
          <p className="text-gray-600 leading-relaxed line-clamp-2 text-sm">
            {profile.spark_line}
          </p>
        </div>
      </div>

      {/* Skills */}
      <div className="px-6 pb-4">
        <div className="flex flex-wrap gap-2">
          {profile.skills?.slice(0, 4).map((skill, index) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-sm"
            >
              {skill}
            </motion.span>
          ))}
          {profile.skills && profile.skills.length > 4 && (
            <span className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full text-xs">
              +{profile.skills.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Price & Actions */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-gray-900">${profile.price_usd || 0}</span>
            <span className="text-gray-500 text-sm">/ session</span>
          </div>
          <div className="flex items-center text-amber-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-semibold ml-1">4.8</span>
          </div>
        </div>

        <div className="flex gap-3">
          {profile.youtube_link && (
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                const videoId = getYouTubeId(profile.youtube_link!);
                if (videoId) onVideoPlay(videoId);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 bg-gradient-to-r from-red-500 to-red-700 text-white py-3 px-4 rounded-2xl font-semibold border border-gray-200 hover:border-gray-300 transition-all duration-300 flex items-center justify-center gap-2 group/play"
            >
              <Play className="w-4 h-4 group-hover/play:scale-110 transition-transform" />
              Play Intro
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 px-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:from-emerald-600 hover:to-teal-600"
          >
            Book ${profile.price_usd || 0}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default function TalentBoardPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('All Skills');
  const [selectedBudget, setSelectedBudget] = useState('Any Budget');
  const [selectedAvailability, setSelectedAvailability] = useState('Any Time');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [dropdownData, setDropdownData] = useState({
    skills: ['All Skills'] as string[],
    cities: ['All Cities'] as string[],
    availability: ['Any Time'] as string[],
  });

  // Load profiles from Airtable and assign static images
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching profiles from Airtable...');
        const response = await fetch('/api/profiles');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Airtable response:', data);
        
        if (data.success && data.profiles && Array.isArray(data.profiles)) {
          const profilesData = data.profiles;
          console.log('Profiles loaded from Airtable:', profilesData.length);
          
          // Assign static images to ALL profiles from Airtable
          const profilesWithStaticImages = profilesData.map((profile: Profile, index: number) => {
            // Generate consistent image based on profile ID
            const idNumber = profile.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
            const staticImage = staticImages[idNumber % staticImages.length];
            
            return {
              ...profile,
              photo_url: staticImage // Always assign a valid static image URL
            };
          });
          
          setProfiles(profilesWithStaticImages);
          setFilteredProfiles(profilesWithStaticImages);

          // Extract dropdown data from Airtable profiles
          const allSkills = profilesData.flatMap((p: Profile) => p.skills || []);
          const allCities = profilesData.map((p: Profile) => p.city || '').filter(Boolean);
          const allAvailability = profilesData.map((p: Profile) => p.availability || '').filter(Boolean);

          console.log('Extracted from Airtable:', {
            skills: allSkills,
            cities: allCities,
            availability: allAvailability
          });

          // Remove duplicates and sort
          const uniqueSkills = Array.from(new Set(allSkills)).sort();
          const uniqueCities = Array.from(new Set(allCities)).sort();
          const uniqueAvailability = Array.from(new Set(allAvailability)).sort();

          setDropdownData({
            skills: ['All Skills', ...uniqueSkills],
            cities: ['All Cities', ...uniqueCities],
            availability: ['Any Time', ...uniqueAvailability],
          });

          console.log('Final dropdown data from Airtable:', {
            skills: ['All Skills', ...uniqueSkills],
            cities: ['All Cities', ...uniqueCities],
            availability: ['Any Time', ...uniqueAvailability],
          });

        } else {
          throw new Error(data.error || 'Invalid data format from API');
        }
      } catch (error) {
        console.error('Error loading data from Airtable:', error);
        setError(`Unable to load profiles: ${error instanceof Error ? error.message : 'Unknown error'}`);
        
        // Fallback to empty data
        setProfiles([]);
        setFilteredProfiles([]);
        setDropdownData({
          skills: ['All Skills'],
          cities: ['All Cities'],
          availability: ['Any Time'],
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Filter profiles based on search and filters
  useEffect(() => {
    let filtered = profiles;

    if (searchTerm) {
      filtered = filtered.filter(profile =>
        profile.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.skills?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
        profile.spark_line?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSkill !== 'All Skills') {
      filtered = filtered.filter(profile => 
        profile.skills?.includes(selectedSkill)
      );
    }

    if (selectedBudget !== 'Any Budget') {
      filtered = filtered.filter(profile => {
        const price = profile.price_usd || 0;
        switch (selectedBudget) {
          case 'Under $20': return price < 20;
          case '$20 - $50': return price >= 20 && price <= 50;
          case '$50 - $100': return price > 50 && price <= 100;
          case 'Over $100': return price > 100;
          default: return true;
        }
      });
    }

    if (selectedAvailability !== 'Any Time') {
      filtered = filtered.filter(profile => 
        profile.availability === selectedAvailability
      );
    }

    if (selectedCity !== 'All Cities') {
      filtered = filtered.filter(profile => 
        profile.city === selectedCity
      );
    }

    setFilteredProfiles(filtered);
  }, [searchTerm, selectedSkill, selectedBudget, selectedAvailability, selectedCity, profiles]);

  const budgetOptions = ['Any Budget', 'Under $20', '$20 - $50', '$50 - $100', 'Over $100'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 overflow-hidden relative">
      {/* YouTube Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 transition-all duration-300 shadow-lg"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
              <div className="aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-2xl"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
        className="fixed top-0 left-0 right-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-xl"
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
              href="/create-profile"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 group text-sm"
            >
              <Zap className="w-4 h-4" />
              <span>Add Your Profile</span>
            </motion.a>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="pt-20 pb-16 relative z-10">
        <div className="max-w-7xl mt-10 mx-auto px-4 sm:px-6 lg:px-8">
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
              🔍 Find a skill.
              <motion.span 
                className="block bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Book it tonight.
              </motion.span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              From <span className="font-semibold text-emerald-600">vodka cocktails</span> to{' '}
              <span className="font-semibold text-blue-600"> party planning</span> to{' '} <span className="font-semibold text-emerald-600"> resume makeovers</span> — 
              discover real people ready to help{' '}
              <span className="font-bold text-transparent bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text">
                now.
              </span>.
            </motion.p>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 text-center"
            >
              <div className="text-amber-700 text-sm">
                ⚠️ {error}
              </div>
            </motion.div>
          )}

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 p-6 mb-8 relative"
            style={{ zIndex: 50 }}
          >
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search skills, names, or services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 text-lg shadow-sm"
              />
            </div>

            {/* Filters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative" style={{ zIndex: 60 }}>
              <CustomDropdown
                label="Skill"
                icon={<Filter className="w-4 h-4" />}
                value={selectedSkill}
                options={dropdownData.skills}
                onChange={setSelectedSkill}
              />

              <CustomDropdown
                label="Budget"
                icon={<span>💰</span>}
                value={selectedBudget}
                options={budgetOptions}
                onChange={setSelectedBudget}
              />

              <CustomDropdown
                label="When"
                icon={<Clock className="w-4 h-4" />}
                value={selectedAvailability}
                options={dropdownData.availability}
                onChange={setSelectedAvailability}
              />

              <CustomDropdown
                label="City"
                icon={<MapPin className="w-4 h-4" />}
                value={selectedCity}
                options={dropdownData.cities}
                onChange={setSelectedCity}
              />
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mb-6 flex items-center justify-between"
          >
            <p className="text-gray-600">
              Showing <span className="font-semibold text-emerald-600">{filteredProfiles.length}</span> professionals
              {searchTerm && ` for "${searchTerm}"`}
            </p>
            {!loading && (
              <div className="text-sm text-gray-500 bg-white/50 px-3 py-1 rounded-full border">
                {dropdownData.skills.length - 1} skills • {dropdownData.cities.length - 1} cities
              </div>
            )}
          </motion.div>

          {/* Profiles Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ zIndex: 10 }}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6 animate-pulse"
                >
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-2xl"></div>
                      <div className="space-y-2 flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                    <div className="h-12 bg-gray-200 rounded"></div>
                    <div className="flex gap-2">
                      <div className="h-6 bg-gray-200 rounded w-16"></div>
                      <div className="h-6 bg-gray-200 rounded w-20"></div>
                    </div>
                    <div className="h-12 bg-gray-200 rounded"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <AnimatePresence>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ zIndex: 10 }}>
                {filteredProfiles.map((profile, index) => (
                  <ProfileCard
                    key={profile.id}
                    profile={profile}
                    onVideoPlay={setSelectedVideo}
                  />
                ))}
              </div>
            </AnimatePresence>
          )}

          {/* Empty State */}
          {!loading && filteredProfiles.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <motion.div
                className="text-6xl mb-6"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              >
                🔍
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                No profiles found
              </h3>
              <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                {searchTerm 
                  ? `No results found for "${searchTerm}". Try adjusting your search or filters.`
                  : "Be the first to showcase your skills and start earning!"
                }
              </p>
              <motion.a
                href="/create-profile"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold py-3 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Zap className="w-5 h-5 mr-2" />
                Create Your Profile
              </motion.a>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}