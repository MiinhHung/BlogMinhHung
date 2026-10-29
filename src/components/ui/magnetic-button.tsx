"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";

interface MagneticButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export function MagneticButton({
  children,
  className = "",
  intensity = 0.3,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const xTo = gsap.quickTo(button, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(button, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return;
      const rect = button.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) * intensity;
      const y = (e.clientY - (rect.top + rect.height / 2)) * intensity;
      xTo(x);
      yTo(y);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      xTo(0);
      yTo(0);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);
    button.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
      button.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isHovered, intensity]);

  return (
    <div
      ref={buttonRef}
      className={`relative ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
