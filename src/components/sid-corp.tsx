"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Building2, Globe, Users, Trophy } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import { MagneticButton } from "./ui/magnetic-button";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function SidCorp() {
  const { t } = useLanguage();
  const container = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Rotate the orbit rings around the SVG centre
      gsap.to(".orb-ring-1", { rotation: 360, duration: 34, repeat: -1, ease: "none", svgOrigin: "200 200" });
      gsap.to(".orb-ring-2", { rotation: -360, duration: 26, repeat: -1, ease: "none", svgOrigin: "200 200" });
      gsap.to(".orb-ring-3", { rotation: 360, duration: 18, repeat: -1, ease: "none", svgOrigin: "200 200" });

      // Slow conic aura sweep behind the logo plate
      gsap.to(".orb-aura", { rotation: 360, duration: 14, repeat: -1, ease: "none" });

      // Breathing halo
      gsap.to(".orb-pulse", {
        scale: 1.16,
        opacity: 0.1,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Floating animation for stats
      const cards = gsap.utils.toArray(".stat-card-wrapper");
      cards.forEach((card: any, i) => {
        gsap.to(card, {
          y: i % 2 === 0 ? "-=20" : "+=20",
          duration: 2 + i * 0.5,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      });

      // Reveal title and orb
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 60%",
        },
      });

      tl.fromTo(titleRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })
        .fromTo(orbRef.current, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5, ease: "elastic.out(1, 0.5)" }, "-=0.5")
        .fromTo(".stat-card-wrapper", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.5)" }, "-=1");

      // 3D Tilt Effect on mousemove over the container
      const xTo = gsap.quickTo(orbRef.current, "x", { duration: 0.8, ease: "power3" });
      const yTo = gsap.quickTo(orbRef.current, "y", { duration: 0.8, ease: "power3" });

      const handleMouseMove = (e: MouseEvent) => {
        if (!container.current) return;
        const rect = container.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.05;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.05;
        xTo(x);
        yTo(y);
      };

      container.current?.addEventListener("mousemove", handleMouseMove);

      return () => {
        container.current?.removeEventListener("mousemove", handleMouseMove);
      };
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative w-full min-h-[120vh] flex flex-col items-center justify-center bg-[#000810] overflow-hidden py-20 perspective-[1000px]">
      
      {/* Background Starfield / Particles (Abstract) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]"></div>

      {/* Central Content */}
      <div ref={titleRef} className="relative z-20 flex flex-col items-center text-center max-w-4xl px-4 mb-20 pointer-events-none">
        <h2 className="text-sm font-medium tracking-widest text-primary uppercase mb-6 inline-block border border-primary/20 bg-primary/5 px-6 py-2 rounded-full">
          {t("sid.tag")}
        </h2>
        <h3 className="text-5xl md:text-7xl font-heading font-bold leading-tight text-white mb-6">
          {t("sid.title1")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">SID CORP</span>
        </h3>
        <p 
          className="text-lg md:text-xl text-white/60 mb-10 leading-relaxed max-w-2xl"
          dangerouslySetInnerHTML={{ __html: t("sid.desc").replace(/SID CORP/g, "<span class='text-secondary font-bold'>SID CORP</span>") }}
        />
        <div className="pointer-events-auto">
          <MagneticButton intensity={0.2}>
            <a 
              href="https://www.sidcorp.co/vi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-white/5 text-white border border-white/20 px-8 py-4 font-medium transition-all hover:bg-white hover:text-black shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            >
              {t("sid.btn")}
              <Globe size={18} />
            </a>
          </MagneticButton>
        </div>
      </div>

      {/* Central Orb & Floating Stats */}
      <div className="relative w-full max-w-6xl h-[600px] flex items-center justify-center pointer-events-none">
        
        {/* Hologram Orb */}
        <div
          ref={orbRef}
          className="absolute z-10 flex h-[320px] w-[320px] items-center justify-center md:h-[440px] md:w-[440px]"
        >
          {/* Ambient brand glow */}
          <div className="absolute inset-[-22%] rounded-full bg-[radial-gradient(circle,rgba(0,119,255,0.22)_0%,transparent_60%)] blur-2xl" />
          <div className="absolute inset-[23%] rounded-full bg-[radial-gradient(circle,rgba(255,123,0,0.20)_0%,transparent_58%)] blur-2xl" />
          <div className="orb-pulse absolute inset-[27%] rounded-full border border-secondary/25" />

          {/* Concentric orbit system */}
          <svg viewBox="0 0 400 400" fill="none" className="absolute inset-0 h-full w-full">
            <defs>
              <linearGradient id="sidOrbitOuter" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0077ff" stopOpacity="0.75" />
                <stop offset="45%" stopColor="#0077ff" stopOpacity="0.04" />
                <stop offset="100%" stopColor="#ff7b00" stopOpacity="0.65" />
              </linearGradient>
              <linearGradient id="sidOrbitMid" x1="1" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff7b00" stopOpacity="0.8" />
                <stop offset="65%" stopColor="#ff7b00" stopOpacity="0.04" />
              </linearGradient>
            </defs>

            {/* Static rails keep the system readable while the rings turn */}
            <circle cx="200" cy="200" r="194" stroke="#ffffff" strokeOpacity="0.06" />
            <circle cx="200" cy="200" r="126" stroke="#ffffff" strokeOpacity="0.05" />

            <g className="orb-ring-1">
              <circle cx="200" cy="200" r="194" stroke="url(#sidOrbitOuter)" strokeWidth="1.25" />
              <circle cx="200" cy="6" r="11" fill="#ff7b00" fillOpacity="0.16" />
              <circle cx="200" cy="6" r="4.5" fill="#ff7b00" />
            </g>

            <g className="orb-ring-2">
              <circle
                cx="200"
                cy="200"
                r="160"
                stroke="url(#sidOrbitMid)"
                strokeDasharray="2 11"
                strokeLinecap="round"
              />
              <path
                d="M 200 40 A 160 160 0 0 1 313.14 86.86"
                stroke="#ff7b00"
                strokeOpacity="0.85"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
              <circle cx="40" cy="200" r="3.5" fill="#0077ff" />
            </g>

            <g className="orb-ring-3">
              <circle
                cx="200"
                cy="200"
                r="126"
                stroke="#0077ff"
                strokeOpacity="0.45"
                strokeDasharray="58 28"
                strokeLinecap="round"
              />
              <circle cx="326" cy="200" r="3" fill="#ffffff" fillOpacity="0.8" />
            </g>
          </svg>

          {/* Logo lockup: the navy in the mark needs a light ground, so the plate is
              a designed surface rather than the raw white JPG it used to be. */}
          <div className="relative flex items-center justify-center">
            <div className="orb-aura absolute -inset-8 rounded-full bg-[conic-gradient(from_0deg,rgba(0,119,255,0.38),rgba(255,123,0,0.34),rgba(0,119,255,0.03),rgba(0,119,255,0.38))] blur-2xl" />
            <div className="relative rounded-[30px] bg-gradient-to-br from-white/90 via-secondary/50 to-primary/70 p-[1.5px] shadow-[0_20px_60px_-14px_rgba(0,119,255,0.8)]">
              <div className="relative h-28 w-28 overflow-hidden rounded-[28.5px] bg-gradient-to-br from-white via-white to-[#dde5f3] md:h-32 md:w-32">
                <Image
                  src="/sid-logo.png"
                  alt="SID CORP"
                  fill
                  sizes="128px"
                  className="object-contain p-[11%]"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(150deg,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0)_38%)]" />
              </div>
            </div>
          </div>
        </div>

        {/* Floating Cards */}
        {/* Top Left */}
        <div className="stat-card-wrapper absolute top-10 left-[5%] md:left-[15%] z-20 pointer-events-auto group">
          <div className="bg-black/40 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-xl transition-all duration-300 group-hover:border-primary/50 group-hover:scale-105 group-hover:-rotate-3">
            <Building2 className="text-primary mb-3" size={28} />
            <div className="text-3xl font-heading font-bold text-white mb-1">10+</div>
            <div className="text-xs text-white/50 tracking-wider uppercase">{t("sid.stat1")}</div>
          </div>
        </div>

        {/* Bottom Left */}
        <div className="stat-card-wrapper absolute bottom-10 left-[10%] md:left-[20%] z-20 pointer-events-auto group">
          <div className="bg-black/40 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-xl transition-all duration-300 group-hover:border-secondary/50 group-hover:scale-105 group-hover:rotate-3">
            <Users className="text-secondary mb-3" size={28} />
            <div className="text-3xl font-heading font-bold text-white mb-1">50+</div>
            <div className="text-xs text-white/50 tracking-wider uppercase">{t("sid.stat2")}</div>
          </div>
        </div>

        {/* Top Right */}
        <div className="stat-card-wrapper absolute top-20 right-[5%] md:right-[15%] z-20 pointer-events-auto group">
          <div className="bg-black/40 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-xl transition-all duration-300 group-hover:border-secondary/50 group-hover:scale-105 group-hover:rotate-6">
            <Globe className="text-secondary mb-3" size={28} />
            <div className="text-3xl font-heading font-bold text-white mb-1">20+</div>
            <div className="text-xs text-white/50 tracking-wider uppercase">{t("sid.stat3")}</div>
          </div>
        </div>

        {/* Bottom Right */}
        <div className="stat-card-wrapper absolute bottom-20 right-[10%] md:right-[20%] z-20 pointer-events-auto group">
          <div className="bg-black/40 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-xl transition-all duration-300 group-hover:border-primary/50 group-hover:scale-105 group-hover:-rotate-6">
            <Trophy className="text-primary mb-3" size={28} />
            <div className="text-3xl font-heading font-bold text-white mb-1">100%</div>
            <div className="text-xs text-white/50 tracking-wider uppercase">{t("sid.stat4")}</div>
          </div>
        </div>

      </div>
    </section>
  );
}
