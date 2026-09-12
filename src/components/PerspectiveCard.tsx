import React, { useState, useRef, useCallback } from 'react';

interface PerspectiveCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: number;
  disabled?: boolean;
}

export const PerspectiveCard: React.FC<PerspectiveCardProps> = ({
  children,
  className = '',
  glowColor = 'rgba(22, 166, 163, 0.15)',
  intensity = 8,
  disabled = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      const xPct = (clientX / rect.width) * 100;
      const yPct = (clientY / rect.height) * 100;

      // Restrained subtle tilt (max degrees determined by intensity, default 8deg)
      const rotY = ((clientX / rect.width) - 0.5) * intensity;
      const rotX = -(((clientY / rect.height) - 0.5) * intensity);

      setRotateX(rotX);
      setRotateY(rotY);
      setGlarePos({ x: xPct, y: yPct });
    },
    [disabled, intensity]
  );

  const handleMouseEnter = () => {
    if (!disabled) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-transform duration-200 ease-out transform-gpu perspective-[1000px] motion-reduce:transform-none ${className}`}
      style={{
        transform:
          isHovered && !disabled
            ? `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Glare Sheen Reflection (restrained and subtle) */}
      {isHovered && !disabled && (
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none z-10 transition-opacity duration-300 opacity-60 mix-blend-soft-light"
          style={{
            background: `radial-gradient(circle 280px at ${glarePos.x}% ${glarePos.y}%, ${glowColor}, transparent 70%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Actual Content */}
      <div className="relative z-0 h-full w-full">
        {children}
      </div>
    </div>
  );
};
