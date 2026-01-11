import React from "react";

const AnimatedBackground = ({ className }) => (
  <div className={`absolute inset-0 flex justify-center items-center overflow-hidden pointer-events-none ${className || ""}`}>
    <svg
      className="BgAnimation__svg"
      viewBox="0 0 602 602"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: "130%",
        height: "130%",
        opacity: 0.65,
      }}
    >
      <g opacity="0.4">
        <path
          id="orbit_1"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M201.337 87.437C193.474 79.5738 180.725 79.5738 172.862 87.437L87.437 172.862C79.5739 180.725 79.5739 193.474 87.437 201.337L400.663 514.563C408.526 522.426 421.275 522.426 429.138 514.563L514.563 429.138C522.426 421.275 522.426 408.526 514.563 400.663L201.337 87.437Z"
          stroke="url(#paint0_radial)"
          strokeWidth="1.6"
        />
        <path
          id="orbit_2"
          d="M514.563 201.337C522.426 193.474 522.426 180.725 514.563 172.862L429.138 87.437C421.275 79.5738 408.526 79.5739 400.663 87.437L358.098 130.002L301.148 73.0516L343.713 30.4869C383.028 -8.82896 446.772 -8.82896 486.088 30.4869L571.513 115.912C610.829 155.228 610.829 218.972 571.513 258.287L357.802 471.999L300.852 415.049L514.563 201.337Z"
          stroke="url(#paint1_radial)"
          strokeWidth="1.4"
        />
        <path
          id="orbit_3"
          d="M243.901 471.999L201.337 514.563C193.474 522.426 180.725 522.426 172.862 514.563L87.437 429.138C79.5739 421.275 79.5739 408.526 87.437 400.663L301.148 186.952L244.198 130.002L30.4869 343.713C-8.82897 383.028 -8.82897 446.772 30.4869 486.088L115.912 571.513C155.228 610.829 218.972 610.829 258.287 571.513L300.852 528.949L243.901 471.999Z"
          stroke="url(#paint2_radial)"
          strokeWidth="1.4"
        />
      </g>

      {[...Array(6)].map((_, i) => {
        const dur = 6 + i * 2;
        const colorList = [
          "#A855F7",
          "#EC4899",
          "#8B5CF6",
          "#F472B6",
          "#C084FC",
          "#9333EA",
        ];
        const color = colorList[i % colorList.length];
        const orbitId = `#orbit_${(i % 3) + 1}`;
        const size = 1.8 + (i % 3);
        return (
          <ellipse
            key={i}
            cx="0"
            cy="0"
            rx={size}
            ry={size}
            fill={color}
            opacity="0.9"
          >
            <animateMotion
              dur={`${dur}s`}
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath xlinkHref={orbitId} />
            </animateMotion>
            <animate
              attributeName="rx"
              values={`${size};${size * 1.6};${size}`}
              dur={`${dur / 3}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="ry"
              values={`${size};${size * 1.6};${size}`}
              dur={`${dur / 3}s`}
              repeatCount="indefinite"
            />
          </ellipse>
        );
      })}

      <defs>
        <radialGradient
          id="paint0_radial"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(301 301) rotate(90) scale(300)"
        >
          <stop offset="0.3" stopColor="#A855F7" stopOpacity="0.9" />
          <stop offset="1" stopColor="#8B5CF6" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint1_radial"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(301 301) rotate(90) scale(300)"
        >
          <stop offset="0.3" stopColor="#EC4899" stopOpacity="0.9" />
          <stop offset="1" stopColor="#A855F7" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint2_radial"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(301 301) rotate(90) scale(300)"
        >
          <stop offset="0.3" stopColor="#8B5CF6" stopOpacity="0.9" />
          <stop offset="1" stopColor="#9333EA" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  </div>
);

export default AnimatedBackground;
