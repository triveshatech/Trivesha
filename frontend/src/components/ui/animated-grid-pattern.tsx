import React from 'react';

interface AnimatedGridPatternProps {
  className?: string;
  width?: number;
  height?: number;
}

const AnimatedGridPattern: React.FC<AnimatedGridPatternProps> = ({ 
  className = "", 
  width = 1402, 
  height = 620 
}) => {
  return (
    <svg
      className={className}
      fill="none"
      height={height}
      viewBox="0 0 1402 620"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        height="620"
        id="mask0_0_14895"
        maskUnits="userSpaceOnUse"
        style={{ maskType: 'alpha' }}
        width="1402"
        x="0"
        y="0"
      >
        <rect fill="#D9D9D9" height="620" width="1402" />
      </mask>

      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_0_14895"
          x1="695"
          x2="695"
          y1="486"
          y2="651"
        >
          <stop stopColor="#05192D" stopOpacity="0" />
          <stop offset="1" stopColor="#05192D" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint1_linear_0_14895"
          x1="749"
          x2="749"
          y1="3.38514e-08"
          y2="121"
        >
          <stop stopColor="#05192D" stopOpacity="0" />
          <stop offset="1" stopColor="#05192D" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="line-gradient"
          x1="120"
          x2="-120"
          y1="0"
          y2="0"
        >
          <stop offset="0%" stopColor="#2DD4BF" />
          <stop offset="70%" stopColor="#2DD4BF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="line-gradient-reverse"
          x1="-120"
          x2="120"
          y1="0"
          y2="0"
        >
          <stop offset="0%" stopColor="#2DD4BF" stopOpacity="1" />
          <stop offset="70%" stopColor="#2DD4BF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="line-gradient-orange"
          x1="120"
          x2="-120"
          y1="0"
          y2="0"
        >
          <stop offset="0%" stopColor="#FF7849" />
          <stop offset="70%" stopColor="#FF7849" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FF7849" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="line-gradient-orange-reverse"
          x1="-120"
          x2="120"
          y1="0"
          y2="0"
        >
          <stop offset="0%" stopColor="#FF7849" stopOpacity="1" />
          <stop offset="70%" stopColor="#FF7849" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FF7849" stopOpacity="0" />
        </linearGradient>

        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height="771.191"
          id="filter0_f_0_14895"
          width="891.191"
          x="255.405"
          y="-43.5953"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            in="SourceGraphic"
            in2="BackgroundImageFix"
            mode="normal"
            result="shape"
          />
          <feGaussianBlur
            result="effect1_foregroundBlur_0_14895"
            stdDeviation="89.2977"
          />
        </filter>
      </defs>

      <g mask="url(#mask0_0_14895)">
        <g opacity="0.3">
          {/* Static grid lines */}
          <path
            className="light-path-three"
            d="M-90.668 96.0928C192.76 162.757 763.068 258.156 1460.32 96.0928"
            id="light-path-three"
            stroke="#ffffff"
            strokeWidth="1"
          />
          <path
            className="light-path-four"
            d="M-90.668 657.778C192.76 591.114 763.068 495.716 1460.32 657.778"
            id="light-path-four"
            stroke="#ffffff"
            strokeWidth="1"
          />
          <path
            className="light-path-two"
            d="M-90.5117 215.275C200.558 264.31 780.395 336.15 1460.32 215.275"
            id="light-path-two"
            stroke="#ffffff"
            strokeWidth="1"
          />
          <path
            className="light-path-five"
            d="M-90.5117 533.297C200.558 484.263 780.395 412.422 1460.32 533.297"
            id="light-path-five"
            stroke="#ffffff"
            strokeWidth="1"
          />
          <path
            className="light-path-one"
            d="M-90.5117 374.286C-85.9234 374.286 945.291 374.286 1460.32 374.286"
            id="light-path-one"
            stroke="#ffffff"
            strokeWidth="1"
          />

          {/* Vertical grid lines */}
          <path
            d="M20.2617 0C20.2617 0 64.3662 223.745 64.3662 369.5C64.3662 515.255 20.2617 739 20.2617 739"
            stroke="white"
            strokeWidth="1"
          />
          <path
            d="M180.27 0C180.27 0 212.066 223.745 212.066 369.5C212.066 515.255 180.27 739 180.27 739"
            stroke="white"
            strokeWidth="1"
          />
          <path
            d="M327.969 0C327.969 0 344.38 223.745 344.38 369.5C344.38 515.255 327.969 739 327.969 739"
            stroke="white"
            strokeWidth="1"
          />
          <path
            d="M448.996 0C448.996 0 461.304 224.971 461.304 370.726C461.304 516.481 448.996 739 448.996 739"
            stroke="white"
            strokeWidth="1"
          />
          <path d="M565.93 0V739" stroke="white" strokeWidth="1" />
          <path
            d="M1382.37 739C1382.37 739 1338.27 515.255 1338.27 369.5C1338.27 223.745 1382.37 -7.62939e-06 1382.37 -7.62939e-06"
            stroke="white"
            strokeWidth="1"
          />
          <path
            d="M1222.37 739C1222.37 739 1190.57 515.255 1190.57 369.5C1190.57 223.745 1222.37 -7.62939e-06 1222.37 -7.62939e-06"
            stroke="white"
            strokeWidth="1"
          />
          <path
            d="M1074.67 739C1074.67 739 1058.26 515.255 1058.26 369.5C1058.26 223.745 1074.67 -7.62939e-06 1074.67 -7.62939e-06"
            stroke="white"
            strokeWidth="1"
          />
          <path
            d="M953.633 739C953.633 739 941.325 514.029 941.325 368.274C941.325 222.519 953.633 -7.62939e-06 953.633 -7.62939e-06"
            stroke="white"
            strokeWidth="1"
          />
          <path d="M836.707 739V-7.62939e-06" stroke="white" strokeWidth="1" />
          <path d="M702.344 0V739" stroke="white" strokeWidth="1" />
        </g>

        {/* Animated light paths - Teal theme */}
        {/* light-path-three animations */}
        <g>
          <g transform="translate(0, -1)">
            <path
              d="M-120 0 L120 0"
              stroke="url(#line-gradient)"
              strokeLinecap="round"
              strokeWidth="2"
            >
              <animate
                attributeName="opacity"
                dur="8.5s"
                keyTimes="0;0.94;1;1"
                repeatCount="indefinite"
                values="1;1;0;1"
              />
            </path>
          </g>

          <animateMotion
            begin="0s"
            calcMode="linear"
            dur="8.5s"
            keyPoints="0;0.4"
            keyTimes="0;1"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath href="#light-path-three" />
          </animateMotion>
        </g>

        <g>
          <path
            d="M-120 0 L120 0"
            stroke="url(#line-gradient-reverse)"
            strokeLinecap="round"
            strokeWidth="2"
          >
            <animate
              attributeName="opacity"
              dur="8.5s"
              keyTimes="0;0.94;1;1"
              repeatCount="indefinite"
              values="1;1;0;1"
            />
          </path>

          <animateMotion
            begin="0s"
            calcMode="linear"
            dur="8.5s"
            keyPoints="1;0.6"
            keyTimes="0;1"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath href="#light-path-three" />
          </animateMotion>
        </g>

        {/* Animations for light-path-four with 0.5s stagger - Orange theme */}
        <g transform="translate(0, -0.25)">
          <path
            d="M-120 0 L120 0"
            stroke="url(#line-gradient-orange)"
            strokeLinecap="round"
            strokeWidth="2"
          >
            <animate
              attributeName="opacity"
              begin="0.5s"
              dur="8.5s"
              keyTimes="0;0.94;1;1"
              repeatCount="indefinite"
              values="1;1;0;1"
            />
          </path>

          <animateMotion
            begin="0.5s"
            calcMode="linear"
            dur="8.5s"
            keyPoints="0;0.4"
            keyTimes="0;1"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath href="#light-path-four" />
          </animateMotion>
        </g>

        <g transform="translate(0, -0.25)">
          <path
            d="M-120 0 L120 0"
            stroke="url(#line-gradient-orange-reverse)"
            strokeLinecap="round"
            strokeWidth="2"
          >
            <animate
              attributeName="opacity"
              begin="0.5s"
              dur="8.5s"
              keyTimes="0;0.94;1;1"
              repeatCount="indefinite"
              values="1;1;0;1"
            />
          </path>

          <animateMotion
            begin="0.5s"
            calcMode="linear"
            dur="8.5s"
            keyPoints="1;0.6"
            keyTimes="0;1"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath href="#light-path-four" />
          </animateMotion>
        </g>

        {/* Animations for light-path-two with 1s stagger - Teal theme */}
        <g transform="translate(0, -0.5)">
          <path
            d="M-120 0 L120 0"
            stroke="url(#line-gradient)"
            strokeLinecap="round"
            strokeWidth="1.5"
          >
            <animate
              attributeName="opacity"
              begin="1s"
              dur="8.5s"
              keyTimes="0;0.94;1;1"
              repeatCount="indefinite"
              values="1;1;0;1"
            />
          </path>

          <animateMotion
            begin="1s"
            calcMode="linear"
            dur="8.5s"
            keyPoints="0;0.4"
            keyTimes="0;1"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath href="#light-path-two" />
          </animateMotion>
        </g>

        {/* Animations for light-path-five with 1.5s stagger - Orange theme */}
        <g transform="translate(0, 0.25)">
          <path
            d="M-120 0 L120 0"
            stroke="url(#line-gradient-orange)"
            strokeLinecap="round"
            strokeWidth="1.5"
          >
            <animate
              attributeName="opacity"
              begin="1.5s"
              dur="8.5s"
              keyTimes="0;0.94;1;1"
              repeatCount="indefinite"
              values="1;1;0;1"
            />
          </path>

          <animateMotion
            begin="1.5s"
            calcMode="linear"
            dur="8.5s"
            keyPoints="1;0.6"
            keyTimes="0;1"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath href="#light-path-five" />
          </animateMotion>
        </g>

        {/* Center line animation - Teal theme */}
        <g transform="translate(0, 0)">
          <path
            d="M-150 0 L150 0"
            stroke="url(#line-gradient)"
            strokeLinecap="round"
            strokeWidth="3"
          >
            <animate
              attributeName="opacity"
              begin="2s"
              dur="6s"
              keyTimes="0;0.3;0.7;1"
              repeatCount="indefinite"
              values="0;1;1;0"
            />
          </path>

          <animateMotion
            begin="2s"
            calcMode="linear"
            dur="6s"
            keyPoints="0;1"
            keyTimes="0;1"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath href="#light-path-one" />
          </animateMotion>
        </g>
      </g>
    </svg>
  );
};

export default AnimatedGridPattern;
