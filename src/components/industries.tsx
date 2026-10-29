"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import { ArrowRight, ShoppingCart, Users, Home, HeadphonesIcon, Ear, Layers, Code, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Industries() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Reveal industry blocks
      gsap.fromTo(
        ".industry-block",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      // Process line animation
      gsap.fromTo(
        ".process-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".process-section",
            start: "top 75%",
          },
        }
      );

      // Process cards reveal
      gsap.fromTo(
        ".process-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".process-section",
            start: "top 75%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  const industriesData = [
    {
      id: 1,
      icon: ShoppingCart,
      img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
      featuresCount: 4,
    },
    {
      id: 2,
      icon: Users,
      img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
      featuresCount: 3,
    },
    {
      id: 3,
      icon: Home,
      img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop",
      featuresCount: 4,
    },
    {
      id: 4,
      icon: HeadphonesIcon,
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
      featuresCount: 4,
    }
  ];

  const processIcons = [Ear, Layers, Code, Rocket];

  return (
    <section ref={containerRef} className="w-full bg-[#001020] text-white py-32 px-4 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto flex flex-col gap-32">
        {/* Header */}
        <div className="text-center md:text-left flex flex-col items-center md:items-start gap-4 mb-8">
          <h2 className="text-sm font-medium tracking-widest text-primary uppercase inline-flex items-center gap-3">
            <span className="w-8 h-[1px] bg-primary"></span>
            {t("ind.tag")}
          </h2>
          <h3 className="text-4xl md:text-6xl font-heading font-medium leading-tight">
            {t("ind.title")}
          </h3>
        </div>

        {/* Industries List */}
        <div className="flex flex-col gap-24">
          {industriesData.map((ind, index) => {
            const isEven = index % 2 === 1;
            
            return (
              <div key={ind.id} className="industry-block flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
                
                {/* Image Section */}
                <div className={`w-full lg:w-1/2 h-[400px] lg:h-[600px] rounded-3xl overflow-hidden relative group ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <Image 
                    src={ind.img} 
                    alt={t(`ind.${ind.id}.title`)} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-1000" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001020]/90 via-[#001020]/20 to-transparent"></div>
                  
                  {/* Floating Number */}
                  <div className="absolute top-8 left-8 text-6xl font-heading font-bold text-white/10 select-none">
                    0{ind.id}
                  </div>
                </div>

                {/* Content Section */}
                <div className={`w-full lg:w-1/2 flex flex-col gap-8 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4 text-primary">
                      <ind.icon size={32} />
                      <h4 className="text-3xl lg:text-4xl font-heading font-medium text-white">{t(`ind.${ind.id}.title`)}</h4>
                    </div>
                    <h5 className="text-xl font-medium text-white/90">{t(`ind.${ind.id}.sub`)}</h5>
                    <p className="text-lg text-white/60 font-light leading-relaxed">
                      {t(`ind.${ind.id}.desc`)}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="flex flex-col gap-3">
                    {Array.from({ length: ind.featuresCount }).map((_, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                        <span className="text-white/80">{t(`ind.${ind.id}.f${i + 1}`)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Projects */}
                  <div className="mt-4 pt-8 border-t border-white/10">
                    <p className="text-sm text-white/40 uppercase tracking-widest mb-3">Dự án tiêu biểu / Projects</p>
                    <p className="text-lg font-medium text-white/90">
                      {t(`ind.${ind.id}.projects`)}
                    </p>
                  </div>
                  
                </div>
              </div>
            );
          })}
        </div>

        {/* Split Layout: All Industries & Process */}
        <div className="process-section mt-16 pt-24 border-t border-white/10 grid grid-cols-1 xl:grid-cols-2 gap-16 xl:gap-8 items-center">
           
           {/* Left: All Industries CTA */}
           <div className="relative p-10 md:p-14 rounded-[40px] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 overflow-hidden group hover:border-white/20 transition-colors duration-500 w-full">
              {/* Background Glow */}
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px] group-hover:bg-primary/30 transition-all duration-700 pointer-events-none"></div>
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] group-hover:bg-secondary/20 transition-all duration-700 pointer-events-none"></div>
              
              {/* Noise Overlay */}
              <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('/noise.png')", backgroundSize: "128px 128px" }}></div>

              <div className="relative z-10 flex flex-col gap-10">
                 <div>
                    <p className="text-secondary font-medium tracking-widest uppercase mb-4 text-sm flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                       {t("ind.all.q")}
                    </p>
                    <h4 className="text-5xl md:text-6xl lg:text-7xl font-heading font-semibold text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/30">
                       {t("ind.all.title")}
                    </h4>
                 </div>

                 <div className="flex flex-col gap-6 text-lg md:text-xl text-white/60 font-light leading-relaxed">
                    <p className="text-white/80">{t("ind.all.desc1")}</p>
                    <div className="w-12 h-[1px] bg-white/20"></div>
                    <p>{t("ind.all.desc2")}</p>
                 </div>

                 <div className="mt-4">
                    <a href="https://www.sidcorp.co" target="_blank" rel="noopener noreferrer" className="relative inline-flex items-center gap-4 px-8 py-4 rounded-full bg-white text-black font-medium overflow-hidden group/btn hover:pr-6 transition-all duration-300">
                       <span className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover/btn:opacity-100 transition-opacity"></span>
                       <span className="relative z-10">{t("ind.all.desc3")}</span>
                       <span className="relative z-10 w-8 h-8 rounded-full bg-black/5 flex items-center justify-center group-hover/btn:bg-black group-hover/btn:text-white transition-colors duration-300">
                          <ArrowRight size={16} className="group-hover/btn:translate-x-0.5 transition-transform" />
                       </span>
                    </a>
                 </div>
              </div>
           </div>

           {/* Right: The Process Timeline */}
           <div className="w-full relative flex flex-col gap-12 xl:gap-8 xl:mt-0 mt-12 py-12">
              <div className="text-center xl:text-left z-20 mb-8">
                 <h4 className="text-3xl md:text-4xl font-heading font-medium text-white">{t("process.title")}</h4>
              </div>
              
              <div className="relative w-full flex flex-col gap-6 md:gap-10">
                 {/* Background Line */}
                 <div className="absolute left-[39px] md:left-[47px] top-10 bottom-10 w-[2px] bg-white/10"></div>
                 
                 {/* Animated Line overlay */}
                 <div className="process-line absolute left-[39px] md:left-[47px] top-10 bottom-10 w-[2px] bg-gradient-to-b from-secondary via-primary to-transparent origin-top"></div>

                 {[1, 2, 3, 4].map((num, i) => {
                   const Icon = processIcons[i];
                   const isLast = i === 3;
                   
                   return (
                     <div key={num} className="process-card group relative flex gap-6 md:gap-10 p-2 rounded-2xl transition-all duration-300">
                        {/* Number / Icon Bubble */}
                        <div className="relative z-10 flex flex-col items-center shrink-0">
                           <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#0A0A0A] border-2 border-white/10 group-hover:border-secondary flex items-center justify-center transition-colors duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_30px_rgba(255,123,0,0.2)]">
                              <Icon size={24} className="text-white/50 group-hover:text-secondary group-hover:scale-110 transition-all duration-500" />
                           </div>
                           
                           {/* Arrow pointing to next step */}
                           {!isLast && (
                             <div className="absolute top-[75px] md:top-[90px] text-white/20 group-hover:text-secondary group-hover:translate-y-2 transition-all duration-500">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M12 5v14M19 12l-7 7-7-7" />
                                </svg>
                             </div>
                           )}
                        </div>
                        
                        {/* Content */}
                        <div className="flex flex-col gap-2 pt-2 md:pt-4">
                           <h5 className="text-xl md:text-2xl font-heading font-bold text-white group-hover:text-secondary transition-colors duration-500">
                              {t(`process.${num}.t`)}
                           </h5>
                           <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-md">
                              {t(`process.${num}.d`)}
                           </p>
                        </div>
                     </div>
                   );
                 })}
              </div>
           </div>
        </div>

      </div>
      
      {/* SVG animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          to { opacity: 1; }
        }
      `}} />
    </section>
  );
}
