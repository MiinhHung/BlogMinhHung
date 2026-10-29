"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = "none";

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    // Set initial position
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 0.2;

    const xSet = gsap.quickSetter(cursor, "x", "px");
    const ySet = gsap.quickSetter(cursor, "y", "px");
    const fXSet = gsap.quickSetter(follower, "x", "px");
    const fYSet = gsap.quickSetter(follower, "y", "px");

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.x;
      mouse.y = e.y;
      
      // Instantly move the small dot
      xSet(mouse.x);
      ySet(mouse.y);
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Smooth follow for the larger circle
    const tickerFunc = () => {
      const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      fXSet(pos.x);
      fYSet(pos.y);
    };
    gsap.ticker.add(tickerFunc);

    // Hover effect on links and buttons using event delegation
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest && target.closest("a, button, input, textarea, select, [role='button']")) {
        gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.2 });
        gsap.to(follower, { 
          scale: 3, 
          backgroundColor: "rgba(255, 77, 0, 0.1)",
          borderColor: "rgba(255, 77, 0, 0.5)",
          backdropFilter: "blur(4px)",
          duration: 0.3 
        });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest && target.closest("a, button, input, textarea, select, [role='button']")) {
        gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.2 });
        gsap.to(follower, { 
          scale: 1, 
          backgroundColor: "transparent",
          borderColor: "rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(0px)",
          duration: 0.3 
        });
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      gsap.ticker.remove(tickerFunc);
    };
  }, []);

  return (
    <div className="hidden md:block">
      {/* Small dot */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-[#FF4D00] rounded-full pointer-events-none z-[9999] mix-blend-difference"
      ></div>
      {/* Trailing circle */}
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-10 h-10 border border-white/30 rounded-full pointer-events-none z-[9998] transition-colors duration-300"
      ></div>
    </div>
  );
}
