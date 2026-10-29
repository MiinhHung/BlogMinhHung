"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface IntroProps {
  onComplete: () => void;
}

import { useLanguage } from "@/lib/i18n";

export function Intro({ onComplete }: IntroProps) {
  const { t } = useLanguage();
  const container = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>(null);

  useGSAP(
    () => {
      tl.current = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      tl.current
        .to(container.current, { autoAlpha: 1, duration: 0.5 })
        .fromTo(
          ".intro-title",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.2 }
        )
        .fromTo(
          ".loading-line",
          { scaleX: 0 },
          { scaleX: 1, duration: 1.5, ease: "power2.inOut", transformOrigin: "left center" },
          "+=0.5"
        )
        .fromTo(
          ".intro-subtitle",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
        )
        .to(".loading-line", { opacity: 0, duration: 0.3 }, "+=1")
        .to(".intro-content", { y: -50, opacity: 0, duration: 0.8, ease: "power3.inOut" }, "-=0.3")
        .to(container.current, { opacity: 0, duration: 1, ease: "power2.inOut" }, "-=0.4");
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black invisible"
    >
      <div className="intro-content flex flex-col items-center text-center px-4 w-full max-w-3xl">
        <h1 className="intro-title text-4xl md:text-6xl font-heading font-light tracking-tight text-white mb-2">
          Hung Nguyen
        </h1>
        <p className="intro-title text-xl md:text-2xl text-white/60 mb-12">
          {t("intro.role")}
        </p>

        <div className="w-full max-w-md h-[1px] bg-white/20 mb-12 relative overflow-hidden">
          <div className="loading-line absolute inset-0 bg-white origin-left" />
        </div>

        <h2 className="intro-subtitle text-2xl md:text-4xl font-heading font-medium text-white mb-16 max-w-2xl">
          {t("intro.subtitle")}
        </h2>
      </div>
    </div>
  );
}
