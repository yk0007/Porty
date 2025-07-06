import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  FaGithub, 
  FaLinkedin, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt,
  FaExternalLinkAlt,
  FaMoon,
  FaSun,
  FaGraduationCap,
  FaBriefcase,
  FaTrophy,
  FaCertificate,
  FaCode,
  FaBrain,
  FaDatabase,
  FaTools,
  FaUsers,
  FaBars,
  FaTimes,
  FaFileDownload,
  FaDownload,
  FaWhatsapp
} from 'react-icons/fa';
import { useTheme } from 'next-themes';

// Improved cipher typing animation hook
const useCipherTyping = (targetText: string, shouldStart: boolean) => {
  const [displayText, setDisplayText] = useState('');
  const [decryptedFlags, setDecryptedFlags] = useState<boolean[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const animationRef = useRef<number>();
  const frameCountRef = useRef(0);

  useEffect(() => {
    if (!shouldStart || isComplete) return;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    const animate = () => {
      frameCountRef.current++;

      if (frameCountRef.current % 2 === 0) {
        if (currentIndex < targetText.length) {
          let newDisplayText = '';
          const newFlags: boolean[] = [];

          for (let i = 0; i < currentIndex; i++) {
            newDisplayText += targetText[i];
            newFlags.push(true);
          }
          const shouldLock = Math.random() < 0.08;
          if (shouldLock || frameCountRef.current > (currentIndex + 1) * 40) {
            newDisplayText += targetText[currentIndex];
            newFlags.push(true);
            setCurrentIndex(prev => prev + 1);
          } else {
            const randChar = chars[Math.floor(Math.random() * chars.length)];
            newDisplayText += randChar;
            newFlags.push(false);
          }
          for (let i = currentIndex + 1; i < targetText.length; i++) {
            const randChar = chars[Math.floor(Math.random() * chars.length)];
            newDisplayText += randChar;
            newFlags.push(false);
          }
          setDisplayText(newDisplayText);
          setDecryptedFlags(newFlags);
        } else {
          setDisplayText(targetText);
          setDecryptedFlags(Array(targetText.length).fill(true));
          setIsComplete(true);
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [targetText, shouldStart, currentIndex, isComplete]);
  return { displayText, decryptedFlags, isComplete };
};

// Resume Modal Component
const ResumeModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/30 dark:bg-black/30 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          onClick={onClose}
          style={{ willChange: "opacity" }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="relative sm:w-full w-auto max-w-4xl sm:h-[80vh] h-60 rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-white/10 backdrop-blur-xl"
            initial={{ opacity: 0, scale: 0.85, transform: "translateZ(0)" }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: "transform, opacity" }}
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ rotate: 90, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onClick={onClose}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-md"
            >
              <FaTimes className="w-5 h-5" />
            </motion.button>

            {/* PDF or fallback */}
            {isMobile ? (
              <div className="flex flex-col items-center justify-center h-full px-4 text-center space-y-4">
                <p className="text-black text-lg">PDF cannot be displayed on this device.</p>
                <a
                  href="/Yaswanth Kuramdasu.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-900 underline hover:text-blue-400 transition"
                >
                  Tap here to open in new tab
                </a>
              </div>
            ) : (
              <iframe
                src="/Yaswanth Kuramdasu.pdf"
                className="w-full h-full rounded-xl"
                title="Resume PDF"
              />
            )}

            {/* Download Button */}
            <motion.div
              className="absolute bottom-4 w-full flex justify-center z-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 250, damping: 18 }}
              >
                <Button
                  size="lg"
                  className="flex items-center gap-2 px-6 py-2 text-sm font-medium bg-blue-500/80 hover:bg-blue-600/90 text-white backdrop-blur-md border border-blue-300/30 rounded-full shadow-lg transition duration-300"
                  asChild
                >
                  <a href="/Yaswanth Kuramdasu.pdf" download>
                    <FaDownload className="w-4 h-4" />
                    Download PDF
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


const Portfolio = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showGreeting, setShowGreeting] = useState('');
  const [startCipher, setStartCipher] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const hasAnimatedRef = useRef(false);

  const { displayText: cipherText, decryptedFlags, isComplete } = useCipherTyping('Yaswanth Kuramdasu', startCipher);
  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mounted && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true;
      
      setTimeout(() => {
        let greeting = '';
        const text = 'Hi, I am ';
        let i = 0;
        
        const typeGreeting = () => {
          if (i < text.length) {
            greeting += text[i];
            setShowGreeting(greeting);
            i++;
            setTimeout(typeGreeting, 100);
          } else {
            setTimeout(() => setStartCipher(true), 300);
          }
        };
        
        typeGreeting();
      }, 1000);
    }
  }, [mounted]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navItems = [
    { id: 'home', label: 'Resume' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  const projects = [
    {
      title: 'RecipeGen',
      description: 'AI Recipe Management App with offline-first architecture using React Native and WatermelonDB',
      tech: ['React Native', 'Go', 'PostgreSQL', 'WatermelonDB', 'Gemini API'],
      github: 'https://www.github.com/yk0007/recipegen',
      live: null
    },
    {
      title: 'AgriConnect',
      description: 'Agricultural Management Platform providing farmers with AI-driven crop diagnostics and insights',
      tech: ['React', 'Vite', 'Node.js', 'Supabase', 'Tailwind CSS'],
      github: 'https://www.github.com/yk0007/agriconnect',
      live: 'http://agriconnectai.netlify.app'
    },
    {
      title: 'Myra',
      description: 'AI Mental Health Therapist with mood-adaptive UI and conversational memory',
      tech: ['React', 'Node.js', 'Supabase', 'Tailwind CSS'],
      github: 'https://www.github.com/yk0007/Myra',
      live: 'https://themyra.netlify.app'
    },
    {
      title: 'SmartCartAI',
      description: 'AI Shopping Assistant with real-time price tracking and sentiment analysis',
      tech: ['React', 'Node.js', 'Supabase', 'Tailwind CSS'],
      github: 'https://www.github.com/yk0007/smartcartai',
      live: 'https://thesmartcartai.netlify.app'
    }
  ];

  const skillCategories = [
    {
      title: 'Languages',
      icon: <FaCode className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      skills: ['Python', 'Go', 'C++', 'Java', 'JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3', 'SQL']
    },
    {
      title: 'AI/ML',
      icon: <FaBrain className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      skills: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'Hugging Face', 'Transformers', 'PEFT', 'LLMs']
    },
    {
      title: 'Web & Mobile',
      icon: <FaCode className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      skills: ['React', 'Node.js', 'Express', 'Vite', 'Next.js', 'Tailwind CSS', 'React Native', 'Framer']
    },
    {
      title: 'Databases & Platforms',
      icon: <FaDatabase className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      skills: ['MongoDB', 'PostgreSQL','MySQL', 'Firebase', 'Supabase', 'WatermelonDB', 'Clerk']
    },
    {
      title: 'Developer Tools',
      icon: <FaTools className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      skills: ['Git', 'GitHub', 'Docker', 'VS Code', 'Google Colab']
    },
    {
      title: 'Professional Skills',
      icon: <FaUsers className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      skills: ['Problem Solving', 'Adaptability', 'Quick Learner', 'Team Collaboration']
    }
  ];

  const aboutPoints = [
    "Building AI solutions that actually solve real problems",
    "Passionate about creating seamless user experiences",
    "Always learning and adapting to new technologies",
    "Believer in clean code and efficient algorithms",
    "Enjoys collaborating with diverse teams to ship innovative products"
  ];

  if (!mounted) return null;

  return (
    <div 
      className="min-h-screen text-gray-900 dark:text-gray-100"
      style={{
        background: theme === 'dark' 
          ? 'radial-gradient(circle at center, #1e3a8a 0%, #000000 100%)'
          : '#ffffff'
      }}
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 z-50"
        style={{ scaleX: scrollProgress / 100 }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        transformOrigin="0%"
      />

      {/* Floating Navigation */}
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-4 left-0 right-0 z-40 flex justify-center"
      >
        <nav className="backdrop-blur-md border border-gray-200 dark:border-slate-700 rounded-full px-6 py-3 shadow-lg mx-auto">
          <div className="flex items-center justify-between space-x-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="font-bold text-black dark:text-white text-sm whitespace-nowrap"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Yaswanth Kuramdasu
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm font-medium text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {item.label}
                </motion.button>
              ))}
              
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                onClick={toggleTheme}
                className="p-2 rounded-full bg-white dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {theme === 'dark' ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FaSun className="w-4 h-4 text-yellow-400" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FaMoon className="w-4 h-4 text-blue-600" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                onClick={toggleTheme}
                className="p-2 rounded-full bg-white dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {theme === 'dark' ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FaSun className="w-4 h-4 text-yellow-400" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FaMoon className="w-4 h-4 text-blue-600" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full bg-white dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
              >
                {mobileMenuOpen ? <FaTimes className="w-4 h-4 text-black dark:text-white" /> : <FaBars className="w-4 h-4 text-black dark:text-white" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ ease: [0.25, 0.46, 0.45, 0.94] }}
            className="md:hidden absolute top-[100%] left-0 right-0 w-full z-30 px-4"
          >
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-xl px-4 py-4 mt-2 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-sm font-medium text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>  
        </nav>
      </motion.div>

      {/* Hero Section */}
      <section id="home" className="pt-32 lg:pt-24 min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Blue Logo with Decorative Dots */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, type: "spring", stiffness: 200, damping: 20 }}
              whileHover="hovered"
              className="mb-8"
            >
              <motion.div
                onClick={() => setResumeOpen(true)} // 
                variants={{
                  hovered: {
                    scale: 1.05,
                    boxShadow: '0 0 25px rgba(59, 130, 246, 0.5)' // subtle blue glow
                  },
                }}
                className="cursor-pointer relative mx-auto w-32 h-32 bg-blue-500 dark:bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-300"
              >
                {/* Overlay for text */}
                <motion.div
                  variants={{
                    hovered: {
                      backgroundColor: "rgba(0,0,0,0.15)",
                    },
                  }}
                  className="absolute inset-2 bg-black/20 dark:bg-black/30 rounded-xl flex items-center justify-center transition-colors duration-300"
                >
                  <motion.div
                    variants={{
                      hovered: {
                        scale: 1.1,
                      },
                    }}
                    className="text-white dark:text-white text-2xl font-mono transition-transform duration-300"
                  >
                    {'</>'}
                  </motion.div>
                </motion.div>

                {/* Top-right bouncing dot */}
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 dark:bg-blue-500 rounded-full animate-pulse"
                  variants={{
                    hovered: { scale: 1.3 },
                  }}
                />

                {/* Bottom-left bouncing dot */}
                <motion.div
                  className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-300 dark:bg-blue-400 rounded-full animate-bounce"
                  variants={{
                    hovered: { scale: 1.2 },
                  }}
                />
              </motion.div>
            </motion.div>
            
            <div className="text-4xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white min-h-[4rem] flex flex-col items-center justify-center space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className={`mb-2 ${theme === 'light' ? 'drop-shadow-xl' : ''}`}
              >
                {showGreeting}
              </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: startCipher ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="font-mono tracking-wider text-center leading-tight"
                style={{ 
                  fontSize: 'clamp(2rem, 8vw, 4rem)'
                }}
              >
                <span className="block sm:inline-block sm:text-7xl text-5xl sm:mr-5">
                  {cipherText.slice(0, 8).split('').map((char, idx) => (
                    <span
                      key={idx}
                      style={{
                        color: !mounted 
                          ? 'transparent' 
                          : decryptedFlags[idx]
                            ? theme === 'light' ? '#000000' : '#ffffff'
                            : theme === 'light' ? '#999999' : '#666666',
                        opacity: decryptedFlags[idx] ? 1 : 0.5,
                        transition: 'all 0.3s ease-in-out',
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
                <span className="block sm:inline-block sm:ml-2 sm:text-7xl text-5xl">
                  {cipherText.slice(8).split('').map((char, idx) => (
                    <span
                      key={idx + 8}
                      style={{
                        color: !mounted 
                          ? 'transparent' 
                          : decryptedFlags[idx + 8]
                            ? theme === 'light' ? '#000000' : '#ffffff'
                            : theme === 'light' ? '#999999' : '#666666',
                        opacity: decryptedFlags[idx + 8] ? 1 : 0.5,
                        transition: 'all 0.3s ease-in-out',
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              </motion.div>
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5 }}
              className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8"
            >
              AI/ML Engineer & Full-Stack Developer
            </motion.p>
            
           <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3 }}
              className="flex flex-row gap-4 justify-center"
            >
              {/* GitHub Button */}
              <a
                href="https://github.com/yk0007"
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
              >
                <Button
                  size="lg"
                  className="flex items-center gap-2 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-300"
                >
                  <FaGithub className="w-5 h-5" />
                  GitHub
                </Button>
              </a>

              {/* LinkedIn Button */}
              <a
                href="https://www.linkedin.com/in/yaswanthkuramdasu"
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="flex items-center gap-2 bg-blue-500 dark:bg-blue-700 text-white hover:text-white border border-blue-500 dark:border-blue-700 hover:bg-blue-600 dark:hover:bg-blue-600"
                >
                  <FaLinkedin className="w-5 h-5" />
                  LinkedIn
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">About Me</h2>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <Card className="rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    {aboutPoints.map((point, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ 
                          delay: index * 0.2, 
                          duration: 0.6,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                        className="text-lg text-gray-700 dark:text-gray-300 flex items-center"
                      >
                        <span className="mr-3 text-blue-600 dark:text-blue-400">•</span>
                        {point}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Education</h2>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <Card className="rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <FaGraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    <div>
                      <CardTitle className="text-gray-900 dark:text-white">Bachelor of Technology, CSE (Artificial Intelligence)</CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-400">Vignan's Institute Of Information Technology</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">CGPA: 8.94 / 10.0</span>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Current</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-white dark:bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Experience</h2>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <Card className="rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <FaBriefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    <div>
                      <CardTitle className="text-gray-900 dark:text-white">AI&ML Research Internship</CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-400">Indian Institute of Information Technology, Allahabad (IIITA)</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Badge variant="outline" className="border-blue-300 text-blue-700 dark:border-blue-600 dark:text-blue-400">May 2024 - July 2024</Badge>
                    <span className="ml-2 text-gray-600 dark:text-gray-400">Visakhapatnam, India</span>
                  </div>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• Developed a novel framework to summarize complex medical information from Hinglish text and images, improving clinical data extraction</li>
                    <li>• Implemented this using advanced Transformer models and PEFT techniques like LoRA for efficient, high-performance model training</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white dark:bg-transparent">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-black dark:text-white">Projects</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="rounded-3xl shadow-md transition-all duration-300 border flex flex-col h-full 
                                    bg-white dark:bg-gray-800/50 border-gray-200 dark:border-gray-700
                                    hover:bg-blue-50 dark:hover:bg-blue-900/30 
                                    hover:border-blue-400 dark:hover:border-blue-500" >                  
                    <CardHeader>
                   <CardTitle className="text-black dark:text-white">{project.title}</CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-400">
                         {project.description}
                      </CardDescription>
                   </CardHeader>

                 <CardContent>
                   <div className="flex flex-wrap gap-2">
                     {project.tech.map((tech) => (
                     <Badge key={tech} variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                     {tech}
                     </Badge>
                       ))}
                  </div>
                </CardContent>

              <CardContent className="mt-auto">
                 <div className="flex justify-end gap-2 pt-4">
                   <Button size="sm" variant="ghost" asChild  className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">
                   <a href={project.github} target="_blank" rel="noopener noreferrer">
                 <FaGithub className="w-5 h-5" />
                  </a>
                  </Button>
             {project.live && (
        <Button size="sm" variant="ghost" asChild className="text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900">
          <a href={project.live} target="_blank" rel="noopener noreferrer"> <FaExternalLinkAlt className="w-4 h-4" /> </a>
        </Button>
            )}
         </div>
       </CardContent>
            </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Skills Section */}
      <section id="skills" className="py-20 bg-white dark:bg-transparent">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Technical Skills</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {skillCategories.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  whileHover={{ scale: 1.02 }}
                  className="h-full"
                >
                  <Card className="rounded-3xl shadow-md transition-all duration-300 border flex flex-col h-full 
                                    bg-white dark:bg-gray-800/50 border-gray-200 dark:border-gray-700
                                    hover:bg-blue-50 dark:hover:bg-blue-900/30 
                                    hover:border-blue-400 dark:hover:border-blue-500" >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                        {category.icon}
                        {category.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300">{skill}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Achievements & Awards</h2>
            <div className="space-y-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <Card className="rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <FaTrophy className="w-6 h-6 text-yellow-500 dark:text-yellow-400 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Eureka! 2024, IIT Bombay</h3>
                        <p className="text-gray-600 dark:text-gray-400">Qualified the Zonal Round and advanced to the Final Round Pitching of Asia's largest B-Model competition</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <Card className="rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <FaTrophy className="w-6 h-6 text-yellow-500 dark:text-yellow-400 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Smart India Hackathon 2024</h3>
                        <p className="text-gray-600 dark:text-gray-400">Advanced to the national semi-final round after qualifying in the internal hackathon</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 bg-white dark:bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Certifications</h2>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <Card className="rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                   {/*Google svg */}
<span className="w-6 h-6 mt-1">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-7 h-7">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
      c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,
      4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z">
    </path>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,
      7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z">
    </path>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,
      24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z">
    </path>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
      c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z">
    </path>
  </svg>
</span>                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Google Data Analytics Specialization</h3>
                      <p className="text-gray-600 dark:text-gray-400">Google</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
 <section id="contact" className="py-20">
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
        Here, When You Need Me.
      </h2>

<div className="rounded-3xl shadow-none sm:shadow-md 
                p-4 sm:p-8 transition-all duration-300">        <div className="grid md:grid-cols-2 gap-8 items-center">
          
          {/* Left: Contact Info Centered Vertically */}
          <div className="flex flex-col justify-center h-full space-y-6 pl-6">
            <div className="flex items-center gap-3">
              <FaEnvelope className="w-5 h-5 text-yellow-500" />
              <span className="text-gray-700 dark:text-gray-300">
                yaswanthkuramdasu@gmail.com
              </span>
            </div>

            <div className="flex items-center gap-3">
              <FaPhone className="w-5 h-5 text-red-500" />
              <span className="text-gray-700 dark:text-gray-300">
                +91 82970 31456
              </span>
            </div>

            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="w-5 h-5 text-green-500" />
              <span className="text-gray-700 dark:text-gray-300">
                Visakhapatnam, Andhra Pradesh
              </span>
            </div>

            <div className="flex items-center gap-3">
              <FaWhatsapp className="w-5 h-5 text-green-600" />
              <a
                href="https://wa.me/918297031456"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-300 hover:underline"
              >
                Chat on WhatsApp
              </a>
            </div>

            <div className="flex items-center gap-3">
              <FaLinkedin className="w-5 h-5 text-blue-600" />
              <a
                href="https://www.linkedin.com/in/yaswanthkuramdasu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-300 hover:underline"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>

          {/* Right: Contact Form */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <Card className="rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Send a Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email"
                    className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-gray-700 dark:text-gray-300">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Your message"
                    rows={4}
                    className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                  />
                </div>

                <Button className="w-auto sm:w-full bg-black text-white hover:bg-blue-700 dark:bg-white dark:text-black dark:hover:bg-blue-400">
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  </div>
</section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400">
              &copy; 2024 Yaswanth Kuramdasu. All rights reserved.
            </p>
            
            <div className="flex space-x-4 mt-4 md:mt-0">
            <Button size="sm" variant="ghost" asChild className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:text-gray-200 dark:hover:bg-gray-800">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaGithub className="w-5 h-5" /> 
              </a>
            </Button>
              <Button size="sm" variant="ghost" asChild className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="w-5 h-5 text-blue-600" />
                </a>
              </Button>
              <Button size="sm" variant="ghost" asChild className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800">
                <a href="mailto:yaswanthkuramdasu@gmail.com">
                  <FaEnvelope className="w-5 h-5 text-yellow-500" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </footer>

      {/* Resume Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
};

export default Portfolio;