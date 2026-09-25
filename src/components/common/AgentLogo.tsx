import React, { useState } from 'react';

export const AgentLogo: React.FC<{ className?: string }> = ({
  className = 'h-6 w-6',
}) => {
  const [hasError, setHasError] = useState(false);

  // Compute correct logo URL respecting Vite base URL for GitHub Pages
  const baseUrl = import.meta.env.BASE_URL || './';
  const logoPath = baseUrl.endsWith('/') ? `${baseUrl}logo.png` : `${baseUrl}/logo.png`;

  if (!hasError) {
    return (
      <img
        src={logoPath}
        alt="Agent Logo"
        className={`${className} object-contain`}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
      />
    );
  }

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient
          id="agentMainGradient"
          x1="12"
          y1="15"
          x2="88"
          y2="90"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#E9D5FF" />
          <stop offset="0.18" stopColor="#C084FC" />
          <stop offset="0.48" stopColor="#A855F7" />
          <stop offset="0.75" stopColor="#7C3AED" />
          <stop offset="1" stopColor="#4F46E5" />
        </linearGradient>

        <linearGradient
          id="agentBlueGradient"
          x1="20"
          y1="20"
          x2="88"
          y2="88"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#F0ABFC" />
          <stop offset="0.35" stopColor="#C026D3" />
          <stop offset="0.65" stopColor="#7C3AED" />
          <stop offset="1" stopColor="#38BDF8" />
        </linearGradient>

        <linearGradient
          id="agentHighlight"
          x1="30"
          y1="10"
          x2="70"
          y2="80"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="white" stopOpacity="0.95" />
          <stop offset="0.3" stopColor="#E9D5FF" stopOpacity="0.55" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>

        <filter
          id="agentGlow"
          x="-40%"
          y="-40%"
          width="180%"
          height="180%"
        >
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="
              1 0 0 0 0.48
              0 0.5 0 0 0.15
              0 0 1 0 0.9
              0 0 0 1 0
            "
          />
          <feBlend in="SourceGraphic" mode="screen" />
        </filter>
      </defs>

      <path
        d="
          M18 84
          L45 18
          C47 13 53 10 57 18
          L83 84
          L65 84
          L52 48
          C51 45 49 45 48 48
          L36 84
          Z
        "
        fill="url(#agentMainGradient)"
        filter="url(#agentGlow)"
      />
      <path
        d="
          M30 84
          L48 40
          L58 60
          L42 84
          Z
        "
        fill="url(#agentHighlight)"
        opacity="0.75"
      />
      <path
        d="
          M55 22
          L83 84
          L71 84
          L50 38
          Z
        "
        fill="url(#agentBlueGradient)"
        opacity="0.9"
      />
    </svg>
  );
};
