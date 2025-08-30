import React from 'react';

const ContactAnimatedBackground: React.FC = () => {
  return (
    <>
      {/* Global styles for the animated background */}
      <style>{`
        .contact-animated-bg {
          margin: auto;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          overflow: auto;
          background: linear-gradient(
            315deg, 
            rgba(10, 25, 30, 1) 3%,        /* deep dark teal base */
            rgba(0, 128, 128, 1) 38%,      /* rich teal */
            rgba(30, 58, 138, 1) 68%,      /* deep blue instead of orange */
            rgba(20, 20, 20, 1) 98%        /* near-black for contrast */
          );
          animation: gradient 15s ease infinite;
          background-size: 400% 400%;
          background-attachment: fixed;
          color: #f5f5f5; /* light text for dark theme */
        }

        @keyframes gradient {
          0% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 100% 100%;
          }
          100% {
            background-position: 0% 0%;
          }
        }

        .wave {
          background: rgba(255, 255, 255, 0.1); /* subtle lighter overlay */
          border-radius: 1000% 1000% 0 0;
          position: fixed;
          width: 200%;
          height: 12em;
          animation: wave 10s -3s linear infinite;
          transform: translate3d(0, 0, 0);
          opacity: 0.8;
          bottom: 0;
          left: 0;
          z-index: -1;
        }

        .wave:nth-of-type(2) {
          bottom: -1.25em;
          animation: wave 18s linear reverse infinite;
          opacity: 0.7;
        }

        .wave:nth-of-type(3) {
          bottom: -2.5em;
          animation: wave 20s -1s reverse infinite;
          opacity: 0.6;
        }

        @keyframes wave {
          2% {
            transform: translateX(1);
          }
          25% {
            transform: translateX(-25%);
          }
          50% {
            transform: translateX(-50%);
          }
          75% {
            transform: translateX(-25%);
          }
          100% {
            transform: translateX(1);
          }
        }
      `}</style>

      {/* Wave elements */}
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
    </>
  );
};

export default ContactAnimatedBackground;
