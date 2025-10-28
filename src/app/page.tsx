'use client';

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { ArrowRight, Star, Zap, Sparkles, Users, Rocket, Crown, Play, Award, TrendingUp, CheckCircle, Mail, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Resume Writer",
      earnings: "$3,200",
      text: "Made $3,200 in my first month! The platform is incredibly intuitive.",
      avatar: "👩‍💼"
    },
    {
      name: "Marcus Rodriguez",
      role: "Mixology Expert", 
      earnings: "$2,800",
      text: "From hobby to income stream overnight. Booked 15 clients in 2 weeks!",
      avatar: "🍸"
    },
    {
      name: "Priya Patel",
      role: "Yoga Instructor",
      earnings: "$4,100", 
      text: "My virtual sessions are fully booked. This changed my career trajectory!",
      avatar: "🧘‍♀️"
    }
  ];

  const skills = [
    { name: "AI Prompt Engineering", emoji: "🤖", color: "from-emerald-500 to-teal-500" },
    { name: "Financial Consulting", emoji: "💼", color: "from-blue-500 to-cyan-500" },
    { name: "Culinary Masterclasses", emoji: "👨‍🍳", color: "from-orange-500 to-red-500" },
    { name: "Personal Fitness", emoji: "💪", color: "from-purple-500 to-pink-500" },
    { name: "Web Development", emoji: "💻", color: "from-indigo-500 to-blue-500" },
    { name: "Music Production", emoji: "🎵", color: "from-amber-500 to-orange-500" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  // Modern gradient background
  const GradientBackground = () => (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-emerald-200 to-teal-200 rounded-3xl opacity-60 blur-3xl"
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-3xl opacity-50 blur-3xl"
        animate={{
          x: [0, -50, 0],
          y: [0, 40, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-purple-200 to-pink-200 rounded-3xl opacity-40 blur-3xl"
        animate={{
          x: [-30, 30, -30],
          y: [-20, 20, -20],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
type Skill = {
  name: string;
  emoji: string;
  color: string;
};
  const FloatingSkillCard = ({ skill, index }: { skill: Skill; index: number }) => (
    <motion.div
      className="absolute"
      style={{
        left: `${15 + (index * 14)}%`,
        top: `${25 + (index % 3) * 25}%`,
      }}
      animate={{
        y: [0, -25, 0],
        x: [0, Math.sin(index) * 15, 0],
        rotate: [0, 3, -3, 0],
      }}
      transition={{
        duration: 4 + index,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.3,
      }}
      whileHover={{
        scale: 1.15,
        zIndex: 50,
        transition: { duration: 0.2 }
      }}
    >
      <motion.div
        className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl p-4 shadow-lg hover:shadow-2xl cursor-pointer"
        whileHover={{
          background: "rgba(255,255,255,0.95)",
          borderColor: "rgb(209, 213, 219)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
        }}
      >
        <div className={`w-12 h-12 bg-gradient-to-r ${skill.color} rounded-xl flex items-center justify-center mb-3 mx-auto shadow-md`}>
          <span className="text-xl">{skill.emoji}</span>
        </div>
        <div className="text-gray-800 font-semibold text-sm text-center whitespace-nowrap">{skill.name}</div>
        <motion.div
          className="text-xs mt-2 text-gray-600 text-center"
          whileHover={{ scale: 1.1 }}
        >
          High Demand
        </motion.div>
      </motion.div>
    </motion.div>
  );

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 overflow-hidden relative"
      onMouseMove={handleMouseMove}
    >
      <GradientBackground />

      {/* Sticky Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-xl supports-backdrop-blur:bg-white/80"
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
            
            <motion.div 
              className="flex items-center space-x-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <a 
                href="/talent-board" 
                className="group relative text-gray-600 hover:text-gray-900 font-medium transition-all duration-300 text-sm"
              >
                <span className="relative z-10">Browse Talents</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:w-full transition-all duration-300" />
              </a>
              
              <motion.a
                href="https://buy.stripe.com/test_dRm4gBdqEdsq4gueKa3cc03"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 group text-sm"
              >
                <Rocket className="w-4 h-4" />
                <span>Launch Profile</span>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Add padding to account for fixed header */}
      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
          <div className="max-w-7xl mx-auto text-center relative z-20">
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl px-6 py-3 mb-8 shadow-lg"
            >
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-gray-700 font-semibold">Rated 4.9/5 by 10,000+ Professionals</span>
              </div>
            </motion.div>

            {/* Main Headline */}
           

{/* Hero Section */}
<section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
  <div className="max-w-7xl mx-auto text-center relative z-20">
    {/* Trust Badge */}
   

    {/* Main Headline */}
    <motion.h1 
      className="text-6xl md:text-8xl font-black text-gray-900 mb-8 leading-tight"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <span className="block">Turn Your</span>
      <motion.span 
        className="block bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent"
        animate={{ 
          backgroundPosition: ['0%', '100%'],
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{ backgroundSize: '200% auto' }}
      >
        Expertise into Income
      </motion.span>
    </motion.h1>

    <motion.p
      className="text-2xl md:text-3xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      Join the platform where professionals monetize their skills.
      <br/>
      <motion.span
        className="font-bold text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Get discovered and get paid.
      </motion.span>
    </motion.p>

    {/* Main Payment CTA - Centered and Prominent */}
    <motion.div
      className="flex flex-col items-center justify-center space-y-6 mb-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
    >
      {/* Primary Payment Button */}
      <motion.a
        href="https://buy.stripe.com/test_dRm4gBdqEdsq4gueKa3cc03"
        className="group relative bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-2xl py-6 px-4 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 block w-full max-w-md overflow-hidden"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12"
            />
          )}
        </AnimatePresence>
        <span className="relative z-10 flex items-center justify-center space-x-4">
          <Rocket className="w-12 h-12" />
          <span>START EARNING - $7</span>
          <ArrowRight className="w-12 h-12 group-hover:translate-x-2 transition-transform duration-300" />
        </span>
      </motion.a>

      {/* Pricing & Benefits */}
      <motion.div
        className="text-center space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <div className="flex items-center justify-center space-x-6 text-lg text-gray-600">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            <span>One-time payment</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            <span>Lifetime access</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            <span>7 free credits</span>
          </div>
        </div>
        
        <motion.p
          className="text-gray-500 text-sm"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🎉 Join 500+ professionals already earning on our platform
        </motion.p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
      >
        {[
          { number: "$2.8K", label: "Avg. monthly earnings" },
          { number: "24h", label: "Get your first client" },
          { number: "500+", label: "Active professionals" }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
            <div className="text-gray-600 text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>

    {/* Floating Skills Grid */}
    <div className="relative h-96 mb-32">
      {skills.map((skill, index) => (
        <FloatingSkillCard key={skill.name} skill={skill} index={index} />
      ))}
    </div>
  </div>
</section>

          

            {/* Value Proposition Cards */}
            <motion.div
              className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              {[
                {
                  icon: Users,
                  title: "Build Professional Profile",
                  description: "Create a stunning portfolio that showcases your unique skills and expertise",
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  icon: Zap,
                  title: "Instant Visibility",
                  description: "Get discovered immediately when clients search for your specific skills",
                  color: "from-emerald-500 to-teal-500"
                },
                {
                  icon: Rocket,
                  title: "Start Earning",
                  description: "Receive booking requests and get paid for your consultation sessions",
                  color: "from-purple-500 to-pink-500"
                }
              ].map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${card.color} rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg`}>
                    <card.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{card.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{card.description}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Mega CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="bg-white rounded-3xl p-12 shadow-2xl border border-gray-200 max-w-6xl mx-auto relative overflow-hidden"
            >
              {/* Subtle Animated Background */}
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
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Left Content */}
                  <div className="text-left">
                    <motion.h2 
                      className="text-4xl font-black text-gray-900 mb-6"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 }}
                    >
                      Ready to <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Launch</span> Your Career?
                    </motion.h2>
                    
                    <motion.div
                      className="space-y-4 mb-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.4 }}
                    >
                      {[
                        "Lifetime access to your professional profile",
                        "7 complimentary booking credits ($210 value)",
                        "Premium placement in search results", 
                        "Secure Stripe payment processing",
                        "Dedicated customer support team",
                        "Zero commission on your earnings"
                      ].map((benefit, index) => (
                        <motion.div
                          key={benefit}
                          className="flex items-center space-x-4 text-gray-700 text-lg"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.6 + index * 0.1 }}
                          whileHover={{ x: 5 }}
                        >
                          <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                          <span>{benefit}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>

                  {/* Payment Card */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.8 }}
                    className="text-center"
                  >
                    <motion.div
                      className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-300 shadow-2xl"
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 25px 50px -12px rgba(16, 185, 129, 0.25)"
                      }}
                    >
                      <div className="mb-6">
                        <motion.div
                          className="text-5xl font-black text-gray-900 mb-2"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          $7
                        </motion.div>
                        <div className="text-gray-600 text-lg">One-time investment</div>
                        <div className="text-emerald-600 font-bold text-sm mt-2">Lifetime access • No hidden fees</div>
                      </div>
                      
                      <motion.a
                        href="https://buy.stripe.com/test_dRm4gBdqEdsq4gueKa3cc03"
                        className="group relative bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xl py-5 px-12 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 block w-full overflow-hidden"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onHoverStart={() => setIsHovered(true)}
                        onHoverEnd={() => setIsHovered(false)}
                      >
                        <AnimatePresence>
                          {isHovered && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12"
                            />
                          )}
                        </AnimatePresence>
                        <span className="relative z-10 flex items-center justify-center space-x-3">
                          <Rocket className="w-5 h-5" />
                          <span>START MY PROFILE</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </motion.a>
                      
                      <motion.div
                        className="mt-6 space-y-2 text-sm text-gray-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2 }}
                      >
                        <div className="flex items-center justify-center space-x-6">
                          <div className="flex items-center space-x-1">
                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                            <span>30-second setup</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                            <span>Instant access</span>
                          </div>
                        </div>
                      </motion.div>

                      {/* Trust Indicators */}
                      <motion.div
                        className="mt-6 pt-6 border-t border-gray-200"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.2 }}
                      >
                        <div className="flex items-center justify-center space-x-6 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            <span>Secure Payment</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                            <span>4.9/5 Rating</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>24/7 Support</span>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Testimonials Carousel */}
            <motion.div
              className="mt-20 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.4 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white/80 mb-24 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 shadow-lg text-center"
                >
                  <div className="text-3xl mb-4">{testimonials[activeTestimonial].avatar}</div>
                  <div className="text-2xl text-emerald-600 font-bold mb-2">{testimonials[activeTestimonial].earnings}</div>
                  <p className="text-gray-700 text-lg mb-4 italic">"{testimonials[activeTestimonial].text}"</p>
                  <div className="text-gray-600">
                    <div className="font-semibold">{testimonials[activeTestimonial].name}</div>
                    <div className="text-sm">{testimonials[activeTestimonial].role}</div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-50 to-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="md:col-span-2"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Crown className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl font-black bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
                  TalentKonnect
                </div>
              </div>
              <p className="text-gray-600 mb-6 max-w-md">
                The modern platform connecting skilled professionals with clients worldwide. 
                Monetize your expertise and build your personal brand.
              </p>
              <div className="flex space-x-4">
                {[Twitter, Instagram, Linkedin, Mail].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <Icon className="w-5 h-5 text-gray-600" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-gray-900 mb-4">Platform</h3>
              <ul className="space-y-3">
                {['Browse Talents', 'How It Works', 'Success Stories', 'Pricing'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors duration-300">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-3">
                {['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors duration-300">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          >
            <p className="text-gray-500 text-sm">
              © 2024 TalentKonnect. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-gray-500 text-sm">10,000+ professionals joined</span>
              <motion.div
                className="flex items-center space-x-1 bg-emerald-50 px-3 py-1 rounded-full"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-emerald-700 text-sm font-medium">Live</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}


