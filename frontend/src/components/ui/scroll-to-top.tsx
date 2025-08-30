import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-6 z-40 group lg:bottom-6 scroll-to-top-mobile"
          aria-label="Scroll to top"
        >
          <div className="relative">
            {/* 3D Shadow Effect - Multiple Layers */}
            <div className="absolute inset-0 bg-gray-900 rounded-full transform translate-x-2 translate-y-2 blur-lg opacity-30"></div>
            <div className="absolute inset-0 bg-gray-800 rounded-full transform translate-x-1 translate-y-1 blur-sm opacity-60"></div>
            
            {/* Main Button with Enhanced 3D Effect */}
            <div className="relative w-14 h-14 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-full border-2 border-gray-600/50 shadow-2xl transform transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:shadow-teal-500/30 group-hover:border-teal-500/70 group-hover:shadow-2xl">
              {/* Top Highlight for 3D Effect */}
              <div className="absolute top-1 left-1 right-1 h-4 bg-gradient-to-b from-gray-700/60 to-transparent rounded-full"></div>
              
              {/* Inner Glow Layers */}
              <div className="absolute inset-1 bg-gradient-to-br from-gray-700/40 via-gray-800/20 to-transparent rounded-full"></div>
              <div className="absolute inset-2 bg-gradient-to-br from-gray-600/30 to-transparent rounded-full"></div>
              
              {/* Icon Container with Enhanced Positioning */}
              <div className="absolute inset-0 flex items-center justify-center">
                <ChevronUp 
                  size={22} 
                  className="text-gray-200 group-hover:text-teal-300 transition-all duration-300 group-hover:animate-bounce drop-shadow-lg" 
                  strokeWidth={3}
                />
              </div>
              
              {/* Animated Ring Effects */}
              <div className="absolute -inset-1 rounded-full border-2 border-transparent bg-gradient-conic from-teal-400/0 via-teal-400/70 to-teal-400/0 opacity-0 group-hover:opacity-100 group-hover:animate-spin transition-opacity duration-500" style={{animationDuration: '4s'}}></div>
              <div className="absolute -inset-2 rounded-full border border-transparent bg-gradient-conic from-teal-300/0 via-teal-300/30 to-teal-300/0 opacity-0 group-hover:opacity-100 group-hover:animate-spin transition-opacity duration-700" style={{animationDuration: '6s', animationDirection: 'reverse'}}></div>
            </div>
            
            {/* Enhanced Hover Glow Effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-radial from-teal-400/40 via-teal-400/10 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 scale-150"></div>
            <div className="absolute inset-0 rounded-full bg-teal-400/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </div>
          
          {/* Enhanced Tooltip */}
          <div className="absolute right-full mr-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:translate-x-1">
            <div className="relative">
              <div className="bg-gray-900/95 backdrop-blur-sm text-teal-300 text-sm px-3 py-2 rounded-lg border border-gray-700/50 whitespace-nowrap shadow-xl">
                Back to top
                {/* Arrow pointing to button */}
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900/95 border-y-4 border-y-transparent"></div>
              </div>
            </div>
          </div>
        </button>
      )}
    </>
  );
}
