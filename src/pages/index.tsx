import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, AnimatePresenceProps } from 'framer-motion';
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
import AnimatedPrinter from '@/components/AnimatedPrinter';

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
            className="relative sm:w-full w-90% max-w-4xl sm:h-[80vh] h-auto rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-white/10 backdrop-blur-xl"
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

            {/* Desktop: PDF Viewer with Download Button */}
            <div className="hidden md:block w-full h-full rounded-xl overflow-hidden">
              <object 
                data="/Yaswanth Kuramdasu.pdf#toolbar=0&navpanes=0" 
                type="application/pdf" 
                width="100%" 
                height="100%"
                className="bg-gray-100 dark:bg-gray-800"
              >
                <iframe 
                  src="/Yaswanth Kuramdasu.pdf#toolbar=0&navpanes=0" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 'none' }}
                  title="Resume PDF"
                >
                  This browser does not support PDFs. Please download the PDF to view it:
                  <a 
                    href="/Yaswanth Kuramdasu.pdf" 
                    className="text-blue-600 hover:underline"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Download PDF
                  </a>
                </iframe>
              </object>
              
              {/* Desktop Download Button */}
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
                      Download Resume
                    </a>
                  </Button>
                </motion.div>
              </motion.div>
            </div>

            {/* Mobile: Simple Buttons */}
            <div className="md:hidden flex flex-col items-center justify-center h-full p-6 space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Resume</h3>
              
              {/* View Button */}
              <motion.div className="w-full" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 text-base font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-lg transition duration-300"
                  onClick={() => window.open('/Yaswanth Kuramdasu.pdf', '_blank')}
                >
                  <FaExternalLinkAlt className="w-4 h-4" />
                  View in New Tab
                </Button>
              </motion.div>
              
              {/* Download Button */}
              <motion.div className="w-full" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-blue-600 dark:text-blue-400 border-blue-300 dark:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition duration-300"
                  asChild
                >
                  <a href="/Yaswanth Kuramdasu.pdf" download>
                    <FaDownload className="w-4 h-4" />
                    Download PDF
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


const Portfolio = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showGreeting, setShowGreeting] = useState('');
  const [startCipher, setStartCipher] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const hasAnimatedRef = useRef(false);
  const [isClient, setIsClient] = useState(false);
  const [logoColorIndex, setLogoColorIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  
  const roles = [
    'AI ENGINEER',
    'GENAI DEVELOPER',
    'FULL STACK DEVELOPER',
    'AI AGENTS DEVELOPER',
    'SOFTWARE DEVELOPMENT'
  ];

  // Add scroll effect for the radial blur
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Calculate scroll progress (0 to 1)
      if (mainContentRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = mainContentRef.current;
        const progress = scrollTop / (scrollHeight - clientHeight);
        setScrollProgress(progress);
      }
    };

    const mainContent = mainContentRef.current;
    if (mainContent) {
      mainContent.addEventListener('scroll', handleScroll);
      // Initial calculation
      handleScroll();
    }

    return () => {
      if (mainContent) {
        mainContent.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);
  
  // Handle theme change with smooth transition
  const toggleTheme = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    // Add a small delay to allow the theme transition to complete
    setTimeout(() => setIsTransitioning(false), 300);
  };

  // Dark colors for light theme, light colors for dark theme
  const logoColors = [
    'bg-blue-500 dark:bg-blue-600',
    'dark:bg-purple-300 bg-purple-600', // Purple
    'dark:bg-teal-300 bg-teal-600',    // Teal
    'dark:bg-orange-300 bg-orange-600', // Orange
    'dark:bg-gray-400 bg-gray-600',
    'dark:bg-rose-300 bg-rose-600',    // Pink
    'dark:bg-emerald-300 bg-emerald-600', // Green
    'dark:bg-slate-100 bg-slate-500',  // Gray
    'dark:bg-amber-300 bg-amber-600' // Yellow
  ];
  
  // Lighter versions for dots
  const dotColors = [
    'bg-blue-700 dark:bg-blue-300',
    'dark:bg-purple-100 bg-purple-700',
    'dark:bg-teal-100 bg-teal-700',
    'dark:bg-orange-100 bg-orange-700',
    'dark:bg-gray-100 bg-gray-700',
    'dark:bg-rose-100 bg-rose-700',
    'dark:bg-emerald-100 bg-emerald-700',
    'dark:bg-slate-50 bg-slate-500',
    'dark:bg-amber-100 bg-amber-700'
  ];
  
  // Text color that contrasts well with both themes
  const textColor = 'text-white dark:text-gray-900';

  const handleLogoClick = () => {
    setIsSpinning(true);
    setLogoColorIndex((prevIndex) => (prevIndex + 1) % logoColors.length);
    
    setTimeout(() => {
      setIsSpinning(false);
    }, 1000);
  };

  const { displayText: cipherText, decryptedFlags, isComplete } = useCipherTyping('YASWANTH KURAMDASU', startCipher);
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
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (mounted && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true;
      
      setTimeout(() => {
        let greeting = '';
        const text = "Hello! I'm ";
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

  // Role carousel effect
  useEffect(() => {
    if (!startCipher) return;
    
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000); // Change role every 3 seconds
    
    return () => clearInterval(interval);
  }, [startCipher, roles.length]);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  // Close mobile menu when clicking outside or when resume modal opens
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Close mobile menu when resume modal opens
  useEffect(() => {
    if (resumeOpen) {
      setMobileMenuOpen(false);
    }
  }, [resumeOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };



  const navItems = [
    { id: 'resume', label: 'Resume', action: (id: string) => scrollToSection(id) },
    { id: 'projects', label: 'Projects', action: (id: string) => scrollToSection(id) },
    { id: 'contact', label: 'Contact', action: (id: string) => scrollToSection(id) }
  ];

  const projects = [
    {
      title: 'Roameo',
      description: 'Multi-Agent AI Travel Planning System that converts travel requests into personalized, budget-aware itineraries via specialized agents for planning, research, POI selection, and scheduling',
      tech: ['Python', 'LangChain', 'LangGraph', 'Tavily', 'Gemini', 'Mistral', 'Llama'],
      github: 'https://github.com/yk0007/Roameo',
      live: 'https://roameo-app.vercel.app/'
    },
    {
      title: 'PolicyMind AI',
      description: 'Intelligent QA system for insurance/policy documents using RAG with semantic chunking, indexing, query parsing, and LLM inference',
      tech: ['Python', 'RAG', 'LangChain', 'ChromaDB', 'MegaParse', 'Streamlit', 'LLMs'],
      github: 'https://github.com/yk0007/PolicyMindAI',
      live: 'https://policymind.streamlit.app/'
    },
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
      icon: <FaCode className="w-5 h-5 text-red-500 dark:text-red-400 drop-shadow-sm" />,
      skills: ['Python', 'C++', 'JavaScript', 'HTML5', 'CSS3', 'SQL']
    },
    {
      title: 'AI/ML',
      icon: <FaBrain className="w-5 h-5 text-purple-500 dark:text-purple-400 drop-shadow-sm" />,
      skills: ['PyTorch', 'Hugging Face', 'Transformers', 'Multi-Modal', 'RAG', 'PEFT', 'LangChain', 'LangGraph', 'CrewAI']
    },
    {
      title: 'Web & Mobile',
      icon: <FaCode className="w-5 h-5 text-emerald-500 dark:text-emerald-400 drop-shadow-sm" />,
      skills: ['React', 'Node.js', 'FastAPI', 'Tailwind CSS']
    },
    {
      title: 'Databases & Platforms',
      icon: <FaDatabase className="w-5 h-5 text-orange-500 dark:text-orange-400 drop-shadow-sm" />,
      skills: ['MongoDB', 'PostgreSQL', 'Firebase', 'Supabase', 'WatermelonDB']
    },
    {
      title: 'Tools & Others',
      icon: <FaTools className="w-5 h-5 text-gray-500 dark:text-gray-400 drop-shadow-sm" />,
      skills: ['Git', 'GitHub', 'VS Code', 'Google Colab', 'DSA']
    }
  ];

  const aboutPoints = [
    "AI/ML engineer crafting LLMs, AI agents, and GenAI applications",
    "Skilled in Python, LangChain, LangGraph, and Problem solving",
    "Love turning complex ideas into simple, elegant solutions",
    "Always experimenting with emerging AI tools and models",
    "A traveler through human moments, searching for meaning in their shadows"
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{success: boolean; message: string} | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://submit-form.com/74o79CPLK', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          '_feedback.success.title': 'Message Sent!',
          '_feedback.success.message': 'Thank you for reaching out! I\'ll get back to you soon.'
        })
      });
      
      if (!response.ok) throw new Error('Failed to submit form');
      
      setSubmitStatus({
        success: true,
        message: 'Message sent successfully! I\'ll get back to you soon.'
      });
      setFormData({ name: '', email: '', message: '' });
      
      // Reset form after success
      const form = e.target as HTMLFormElement;
      form.reset();
      
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'Failed to send message. Please try again or contact me directly at yaswanthkuramdasu@gmail.com'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!mounted) return null;

  // Calculate the opacity based on scroll position
  const bottomBlurOpacity = Math.min(scrollProgress * 2, 0.8);
  const contentBlurAmount = Math.min(scrollProgress * 20, 8);

  return (
    <div className="relative min-h-screen bg-background text-foreground transition-colors duration-300 overflow-hidden">
      {/* Bottom Radial Blur Effect - Mobile Only */}
      <div 
        className="md:hidden fixed bottom-0 left-0 right-0 h-64 pointer-events-none z-40 transition-opacity duration-300"
        style={{
          background: `radial-gradient(ellipse at center, transparent 0%, ${
            resolvedTheme === 'dark' ? 'rgba(17, 24, 39, 0.9)' : 'rgba(255, 255, 255, 0.9)'
          } 50%, ${
            resolvedTheme === 'dark' ? 'rgba(17, 24, 39, 1)' : 'rgba(255, 255, 255, 1)'
          } 100%)`,
          opacity: bottomBlurOpacity,
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          transform: 'translateY(50%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 50%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 50%)'
        }}
      />
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 z-50"
        style={{ 
          scaleX: scrollProgress / 100,
          transformOrigin: '0%'
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
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
              className="text-black dark:text-white text-sm whitespace-nowrap"
              style={{ 
                fontFamily: "JetBrains Mono",
                fontWeight: 1600,
                fontStyle: 'normal'
              }}
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
                  onClick={() => item.action(item.id)}
                  className="text-sm font-medium text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {item.label}
                </motion.button>
              ))}
              
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  transition: { 
                    delay: 0.7,
                    type: 'spring',
                    stiffness: 500,
                    damping: 20
                  }
                }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                disabled={isTransitioning}
                className={`p-2 rounded-full bg-white dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition-all duration-300 ${
                  isTransitioning ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  {resolvedTheme === 'dark' ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ 
                        rotate: 0, 
                        opacity: 1,
                        transition: { 
                          type: 'spring',
                          stiffness: 500,
                          damping: 20
                        }
                      }}
                      exit={{ 
                        rotate: 90, 
                        opacity: 0,
                        transition: { 
                          duration: 0.3,
                          ease: 'easeInOut'
                        }
                      }}
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
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  transition: { 
                    delay: 0.7,
                    type: 'spring',
                    stiffness: 500,
                    damping: 20
                  }
                }}
                onClick={toggleTheme}
                disabled={isTransitioning}
                className={`p-2 rounded-full bg-white dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition-all duration-300 ${
                  isTransitioning ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  {resolvedTheme === 'dark' ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ 
                        rotate: 0, 
                        opacity: 1,
                        transition: { 
                          type: 'spring',
                          stiffness: 500,
                          damping: 20
                        }
                      }}
                      exit={{ 
                        rotate: 90, 
                        opacity: 0,
                        transition: { 
                          duration: 0.3,
                          ease: 'easeInOut'
                        }
                      }}
                    >
                      <FaSun className="w-4 h-4 text-yellow-400" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ 
                        rotate: 0, 
                        opacity: 1,
                        transition: { 
                          type: 'spring',
                          stiffness: 500,
                          damping: 20
                        }
                      }}
                      exit={{ 
                        rotate: -90, 
                        opacity: 0,
                        transition: { 
                          duration: 0.3,
                          ease: 'easeInOut'
                        }
                      }}
                    >
                      <FaMoon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
              
              <button
                onClick={toggleMobileMenu}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
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
            ref={mobileMenuRef}
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
                    item.action(item.id),
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
      <section id="home" className="min-h-screen flex items-center justify-center">
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
              whileHover={{ scale: 1.1 }}
              className="mb-8 cursor-pointer"
            >
              <motion.div
                className="relative mx-auto w-32 h-32"
                onClick={handleLogoClick}
                animate={isSpinning ? { rotate: 360 } : {}}
                transition={isSpinning ? { 
                  duration: 1, 
                  ease: "easeInOut",
                  repeat: 1,
                  repeatType: "loop"
                } : {}}
              >
                <motion.div
                  className={`absolute inset-0 ${logoColors[logoColorIndex]} rounded-2xl flex items-center justify-center transition-all duration-300`}
                  whileHover={{ 
                    scale: 1.05,
                    filter: 'brightness(0.9)'
                  }}
                >
                  {/* Overlay for text */}
                  <motion.div
                    className="absolute inset-2 bg-black/20 dark:bg-black/30 rounded-xl flex items-center justify-center transition-colors duration-300"
                    whileHover={{
                      backgroundColor: "rgba(0,0,0,0.3)",
                    }}
                  >
                    <motion.div
                      className={`text-2xl font-mono transition-transform duration-300 ${textColor}`}
                      whileHover={{
                        scale: 1.1,
                      }}
                    >
                      {'</>'}
                    </motion.div>
                  </motion.div>

                  {/* Top-right bouncing dot */}
                  <motion.div
                    className={`absolute -top-2 -right-2 w-6 h-6 ${dotColors[logoColorIndex]} rounded-full animate-pulse`}
                    whileHover={{ scale: 1.3 }}
                  />

                  {/* Bottom-left bouncing dot */}
                  <motion.div
                    className={`absolute -bottom-2 -left-2 w-4 h-4 ${dotColors[logoColorIndex]} rounded-full animate-bounce`}
                    whileHover={{ scale: 1.2 }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
            
            <div className="text-4xl md:text-6xl font-bold mb-10 text-gray-900 dark:text-white min-h-[4rem] flex flex-col items-center justify-center space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className={`mb-2 ${theme === 'light' ? 'drop-shadow-xl' : ''}`}
                style={{
                  fontFamily: '"Poppins", sans-serif',
                  fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
                  fontWeight: 100,
                  fontStyle: 'italic'
                }}
              >
                {showGreeting}
              </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: startCipher ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="tracking-wider text-center leading-tight"
                style={{ 
                  fontSize: 'clamp(2rem, 8vw, 4rem)',
                  fontFamily: '"JetBrains Mono", monospace',
                  fontWeight: 800,
                  fontStyle: 'italic'
                }}
              >
                <span className="block sm:inline-block sm:text-7xl text-5xl sm:mr-5">
                  {cipherText.slice(0, 8).split('').map((char, idx) => {
                    const isDecrypted = decryptedFlags[idx];
                    
                    return (
                      <span
                        key={idx}
                        className={`transition-all duration-300 ${
                          isDecrypted 
                            ? 'text-black dark:text-white' 
                            : 'text-gray-400 dark:text-gray-600'
                        }`}
                        style={{
                          opacity: isDecrypted ? 1 : 0.5,
                        }}
                      >
                        {char}
                      </span>
                    );
                  })}
                </span>
                <span className="block sm:inline-block sm:ml-2 sm:text-7xl text-5xl">
                  {cipherText.slice(8).split('').map((char, idx) => {
                    const isDecrypted = decryptedFlags[idx + 8];
                    
                    return (
                      <span
                        key={idx + 8}
                        className={`transition-all duration-300 ${
                          isDecrypted 
                            ? 'text-black dark:text-white' 
                            : 'text-gray-400 dark:text-gray-600'
                        }`}
                        style={{
                          opacity: isDecrypted ? 1 : 0.5,
                        }}
                      >
                        {char}
                      </span>
                    );
                  })}
                </span>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5 }}
              className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-12 flex items-center justify-center leading-relaxed"
              style={{ gap: '0.5rem' }}
            >
              <span
                style={{
                  fontFamily: '"Poppins", sans-serif',
                  fontWeight: 200,
                  fontStyle: 'italic'
                }}
              >
                Looking for
              </span>
              
              <div className="relative inline-block h-8 overflow-hidden" style={{ minWidth: 'fit-content' }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentRoleIndex}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{ 
                      duration: 0.5,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    className="inline-block whitespace-nowrap"
                    style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      fontWeight: 400,
                      fontStyle: 'normal'
                    }}
                  >
                    {roles[currentRoleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
              
              <span
                style={{
                  fontFamily: '"Poppins", sans-serif',
                  fontWeight: 200,
                  fontStyle: 'italic'
                }}
              >
                roles
              </span>
            </motion.div>
            
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
                  className="flex items-center gap-2 bg-gray-800 text-white hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white shadow-lg transition-all duration-300"
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
                  className="flex items-center gap-2 bg-blue-500 dark:bg-blue-700 text-white hover:text-white border border-blue-500 dark:border-blue-700 hover:bg-blue-600 dark:hover:bg-blue-600 shadow-lg"
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
                    <FaGraduationCap className="w-6 h-6 text-blue-500 dark:text-blue-400 drop-shadow-sm" />
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
                    <FaBriefcase className="w-6 h-6 text-purple-800 dark:text-purple-400 drop-shadow-sm" />
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
                  <Card className="rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 border flex flex-col h-full 
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
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">My Tech Stack</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <Card className="rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 border flex flex-col h-full 
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

      {/* Resume Section */}
      <section id="resume" className="py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Want to Hire?</h2>
            <AnimatedPrinter onComplete={() => setResumeOpen(true)} />
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
                <form 
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                  data-aos="fade-up"
                  data-aos-duration="800"
                  data-aos-delay="200"
                >
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <Label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <Label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can I help you?"
                      rows={5}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                      required
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    {submitStatus && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-lg ${
                          submitStatus.success 
                            ? 'bg-green-50 border border-green-200 text-green-800 dark:bg-green-900/30 dark:border-green-800 dark:text-green-200' 
                            : 'bg-red-50 border border-red-200 text-red-800 dark:bg-red-900/30 dark:border-red-800 dark:text-red-200'
                        }`}
                      >
                        <div className="flex items-center">
                          {submitStatus.success ? (
                            <svg className="w-5 h-5 mr-2 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5 mr-2 text-red-500 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 18h2m-2-2v-2a2 2 0 002-2V6a2 2 0 002-2H6a2 2 0 00-2-2v2a2 2 0 002 2v2h2m2-4h2v2H6V6h2v2z" />
                            </svg>
                          )}
                          <span className="text-sm font-medium">{submitStatus.message}</span>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                    className="pt-2"
                  >
                    <Button 
                      type="submit"
                      className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                        isSubmitting 
                          ? 'bg-blue-400 dark:bg-blue-500' 
                          : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700'
                      }`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          Send Message
                        </span>
                      )}
                    </Button>
                  </motion.div>
                </form>
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
              &copy; yk0007
            </p>
            
            <div className="flex space-x-4 mt-4 md:mt-0">
            <Button size="sm" variant="ghost" asChild className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:text-gray-200 dark:hover:bg-gray-800">
              <a href="https://github.com/yk0007" target="_blank" rel="noopener noreferrer">
                <FaGithub className="w-5 h-5" /> 
              </a>
            </Button>
              <Button size="sm" variant="ghost" asChild className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800">
                <a href="https://www.linkedin.com/in/yaswanthkuramdasu" target="_blank" rel="noopener noreferrer">
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
