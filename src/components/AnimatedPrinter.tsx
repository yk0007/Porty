import React, { useState } from 'react';
import { useTheme } from 'next-themes';

interface AnimatedPrinterProps {
  onComplete?: () => void;
}

const AnimatedPrinter: React.FC<AnimatedPrinterProps> = ({ onComplete }) => {
  const { theme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);
  const [paperSliding, setPaperSliding] = useState(false);
  const [showPrinting, setShowPrinting] = useState(false);

  const handlePrinterClick = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Start paper sliding after printer compression
    setTimeout(() => {
      setPaperSliding(true);
    }, 800);
    
    // Start printing animation
    setTimeout(() => {
      setShowPrinting(true);
    }, 1500);
    
    // Call onComplete after printing completes
    setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
      // Reset animation state
      setIsAnimating(false);
      setPaperSliding(false);
      setShowPrinting(false);
    }, 4000);
  };

  return (
    <>
      {/* Main Container */}
      <div className="min-h-[50vh] flex items-center justify-center relative overflow-hidden">
        
        {/* 3D Printer */}
        <div 
          className={`relative cursor-pointer transition-all duration-300 ${
            isAnimating ? 'printer-compress' : 'printer-float hover:scale-[1.02]'
          }`}
          onClick={handlePrinterClick}
        >
          {/* Printer Base Shadow */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-96 h-8 bg-black/10 rounded-full blur-xl printer-shadow" />
          
          {/* Main Printer Body - More Rectangular */}
          <div className="relative printer-body shadow-md hover:shadow-lg transition-shadow duration-300">
            {/* Top Section - Flatter */}
            <div className={`w-80 h-20 ${
              theme === 'dark' 
                ? 'bg-gradient-to-b from-gray-100 to-gray-400' 
                : 'bg-gradient-to-b from-gray-600 to-gray-700'
            } rounded-t-lg relative printer-top`}>
              {/* Control Panel */}
              <div className="absolute top-3 right-4 flex space-x-2">
                <div className="w-2 h-2 bg-green-400 dark:bg-green-600 rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-blue-400 dark:bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>
              
              {/* Brand Label */}
              <div className="absolute top-3 left-4 text-gray-300 dark:text-gray-600 text-xs font-mono">PRINTER v2.0</div>
            </div>
            
            {/* Middle Section with Resume Label - Flatter */}
            <div className={`w-80 h-16 ${
              theme === 'dark' 
                ? 'bg-gradient-to-b from-gray-400 to-gray-500' 
                : 'bg-gradient-to-b from-gray-700 to-gray-800'
            } relative printer-middle`}>
              {/* Resume Label */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 dark:bg-gray-800 px-6 py-1.5 rounded-md shadow-lg border border-gray-200 dark:border-gray-600">
                  <span className="text-gray-800 dark:text-white font-semibold text-base tracking-wide">RESUME</span>
                </div>
              </div>
            </div>
            
            {/* Bottom Section - Flatter */}
            <div className={`w-80 h-12 ${
              theme === 'dark' 
                ? 'bg-gradient-to-b from-gray-500 to-gray-600' 
                : 'bg-gradient-to-b from-gray-800 to-gray-900'
            } rounded-b-lg relative printer-bottom`}>
              {/* Paper Slot */}
              <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-1.5 ${
                theme === 'dark' ? 'bg-gray-900' : 'bg-gray-950'
              } rounded-t-sm`} />
            </div>
            
            {/* Base Stand - Flatter */}
            <div className={`absolute -bottom-2 left-4 right-4 h-4 ${
              theme === 'dark' ? 'bg-gray-600' : 'bg-gray-900'
            } rounded-md printer-base`} />
          </div>

          {/* A4 Paper Animation - Now positioned relative to printer */}
          {paperSliding && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 paper-slide-out">
              <div className="w-64 bg-white rounded-sm shadow-2xl relative overflow-hidden paper-element border border-gray-200"
                    style={{ height: '90vh', maxHeight: '400px', aspectRatio: '210/297' }}>
                
                {/* Paper Content with Printing Animation */}
                <div className="p-4 text-xs">
                  <div className="font-bold text-center mb-2 text-sm printing-line" style={{ animationDelay: '0.5s' }}>
                    Yaswanth Kuramdasu
                  </div>
                  <div className="text-center text-gray-600 mb-3 text-xs printing-line" style={{ animationDelay: '0.8s' }}>
                    Printing Resume...
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-0.5 bg-gray-300 rounded printing-line" style={{ animationDelay: '1.1s' }} />
                    <div className="h-0.5 bg-gray-300 rounded printing-line" style={{ animationDelay: '1.3s' }} />
                    <div className="h-0.5 bg-gray-300 rounded printing-line" style={{ animationDelay: '1.5s' }} />
                    <div className="h-0.5 bg-gray-200 rounded printing-line" style={{ animationDelay: '1.7s' }} />
                    <div className="h-0.5 bg-gray-200 rounded printing-line" style={{ animationDelay: '1.9s' }} />
                    <div className="h-0.5 bg-gray-200 rounded printing-line" style={{ animationDelay: '2.1s' }} />
                    <div className="h-0.5 bg-gray-200 rounded printing-line" style={{ animationDelay: '2.3s' }} />
                    <div className="h-0.5 bg-gray-200 rounded printing-line" style={{ animationDelay: '2.5s' }} />
                  </div>
                </div>
                
                {/* Paper Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shine" />
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        /* Printer Animations */
        .printer-float {
          animation: float 4s ease-in-out infinite;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .printer-compress {
          animation: compress 0.8s ease-out;
        }
        
        .printer-shadow {
          animation: shadow-float 4s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px);
            filter: drop-shadow(0 10px 20px rgba(0,0,0,0.15));
          }
          50% { 
            transform: translateY(-10px);
            filter: drop-shadow(0 20px 30px rgba(0,0,0,0.2));
          }
        }
        
        @keyframes compress {
          0% { transform: translateY(0px) scale(1); }
          40% { transform: translateY(5px) scale(0.98); }
          100% { transform: translateY(0px) scale(1); }
        }
        
        @keyframes shadow-float {
          0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.1; }
          50% { transform: translateX(-50%) scale(1.1); opacity: 0.15; }
        }
        
        /* Paper Slide Out Animation - Relative to printer */
        .paper-slide-out {
          animation: paperSlideOut 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        @keyframes paperSlideOut {
          0% {
            transform: translateX(-50%) translateY(-50%) translateX(-200px) scale(0.8);
            opacity: 0;
          }
          30% {
            transform: translateX(-50%) translateY(-50%) translateX(-100px) scale(0.9);
            opacity: 1;
          }
          100% {
            transform: translateX(-50%) translateY(-50%) translateX(0px) scale(1);
            opacity: 1;
          }
        }
        
        .paper-element {
          box-shadow:
            0 25px 50px -12px rgba(0, 0, 0, 0.25),
            0 0 0 1px rgba(255, 255, 255, 0.1);
        }
        
        /* Printing Animation */
        .printing-line {
          opacity: 0;
          animation: printLine 0.8s ease-out forwards;
        }
        
        @keyframes printLine {
          0% {
            opacity: 0;
            transform: scaleX(0);
            transform-origin: left;
          }
          50% {
            opacity: 1;
            transform: scaleX(0.5);
          }
          100% {
            opacity: 1;
            transform: scaleX(1);
          }
        }
        
        @keyframes shine {
          0% { transform: translateX(-150%) skewX(-12deg); opacity: 0; }
          30% { opacity: 0.4; }
          70% { opacity: 0.4; }
          100% { transform: translateX(250%) skewX(-12deg); opacity: 0; }
        }
        
        .animate-shine {
          animation: shine 3s ease-out infinite;
          animation-delay: 2s;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .printer-body {
            transform: scale(0.8);
          }
          
          .paper-slide-out {
            animation-duration: 2s;
          }
        }
        
        @media (max-width: 480px) {
          .printer-body {
            transform: scale(0.7);
          }
          
          .paper-slide-out {
            animation-duration: 1.8s;
          }
        }
      `}</style>
    </>
  );
};

export default AnimatedPrinter;