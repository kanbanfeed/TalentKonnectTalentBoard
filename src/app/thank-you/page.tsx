'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Star, Zap, Crown } from 'lucide-react';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-10 w-72 h-72 bg-gradient-to-r from-emerald-200 to-teal-200 rounded-3xl opacity-40 blur-3xl"
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
          className="absolute bottom-1/4 right-10 w-80 h-80 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-3xl opacity-30 blur-3xl"
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
        <motion.div
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-purple-200 to-pink-200 rounded-3xl opacity-20 blur-3xl"
          animate={{
            x: [-20, 20, -20],
            y: [-15, 15, -15],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Navigation */}
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
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="pt-20 min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 p-8 md:p-12 max-w-2xl w-full relative overflow-hidden"
        >
          {/* Success Animation Background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-emerald-50 via-blue-50 to-purple-50 opacity-50"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{ backgroundSize: '200% 200%' }}
          />

          <div className="relative z-10">
            {/* Celebration Header */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
              className="text-center mb-8"
            >
              <motion.div
                className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              >
                <Star className="w-12 h-12 text-white" />
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-5xl font-black text-gray-900 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Welcome to{' '}
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  TalentKonnect!
                </span>
              </motion.h1>

              <motion.p
                className="text-xl text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Your journey to monetizing your skills starts now!
              </motion.p>
            </motion.div>

            {/* Success Message */}
            <motion.div
              className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-200 rounded-2xl p-6 mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-start space-x-4">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                  }}
                >
                  <CheckCircle className="w-8 h-8 text-emerald-500 flex-shrink-0 mt-1" />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                    Payment Successful! 🎉
                  </h3>
                  <p className="text-gray-700">
                    You have unlocked your <strong>MyTalentBoard Profile</strong> — your professional showcase to share skills and connect with clients worldwide.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Next Steps */}
            <motion.div
              className="space-y-6 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <h3 className="font-bold text-gray-900 text-xl text-center mb-4">
                Here is What Happens Next:
              </h3>

              {/* Step 1 */}
              <motion.div
                className="flex items-center space-x-4 p-4 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
                whileHover={{ x: 5, scale: 1.02 }}
              >
                <motion.div
                  className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0"
                  animate={{ 
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                  }}
                >
                  <span className="text-white font-bold text-lg">1</span>
                </motion.div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">Create Your Profile</h4>
                  <p className="text-gray-600 text-sm">
                    Build your professional showcase with skills, bio, and intro video
                  </p>
                </div>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </motion.div>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                className="flex items-center space-x-4 p-4 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
                whileHover={{ x: 5, scale: 1.02 }}
              >
                <motion.div
                  className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0"
                  animate={{ 
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    delay: 0.5
                  }}
                >
                  <span className="text-white font-bold text-lg">2</span>
                </motion.div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">Get Discovered</h4>
                  <p className="text-gray-600 text-sm">
                    Appear on the Talent Board and start receiving booking requests
                  </p>
                </div>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <Zap className="w-5 h-5 text-yellow-500" />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Credits Bonus */}
            <motion.div
              className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-6 mb-8 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, type: "spring" }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                }}
              >
                <Star className="w-8 h-8 text-white" />
              </motion.div>
              <h4 className="font-bold text-amber-900 text-lg mb-2">
                🎁 Special Welcome Bonus!
              </h4>
              <p className="text-amber-800">
                You have earned <strong className="text-2xl">7 credits</strong> in your wallet
              </p>
              <p className="text-amber-700 text-sm mt-1">
                ($210 value - ready to use for your first bookings!)
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              <motion.a
                href="/create-profile"
                className="group relative bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 block w-full text-center overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <span className="relative z-10 flex items-center justify-center space-x-3">
                  <span>Create MyTalentBoard Profile</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.a>

              <motion.a
                href="/talent-board"
                className="group bg-white border border-gray-300 text-gray-700 font-semibold py-4 px-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 block w-full text-center hover:border-emerald-300 hover:text-emerald-700"
                whileHover={{ scale: 1.01, y: -2 }}
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>Explore Talent Board</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.a>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              className="mt-8 pt-6 border-t border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
            >
              <div className="flex justify-center space-x-8 text-sm text-gray-500">
                <div className="text-center">
                  <div className="font-semibold text-gray-900">10,000+</div>
                  <div>Active Talents</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900">4.9/5</div>
                  <div>Rating</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900">24h</div>
                  <div>Setup Time</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}