"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { 
  BrainCircuit, 
  Database, 
  Users, 
  Layout, 
  Smartphone, 
  Settings, 
  Cloud, 
  PenTool,
  ArrowUpRight
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Services() {
  const { t } = useLanguage();
  const container = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useGSAP(
    () => {
      // Reveal header
      gsap.fromTo(
        ".srv-header-reveal",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 75%",
          },
        }
      );

      // Reveal service rows
      gsap.fromTo(
        ".service-row",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".services-list",
            start: "top 75%",
          },
        }
      );
    },
    { scope: container }
  );

  const icons = [BrainCircuit, Database, Users, Layout, Smartphone, Settings, Cloud, PenTool];
  
  const serviceImages = [
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop", // AI
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop", // ERP
    "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop", // CRM
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop", // Web
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop", // Mobile
    "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?q=80&w=800&auto=format&fit=crop", // Automation
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop", // Cloud
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop"  // UI/UX
  ];

  return (
    <section id="services" ref={container} className="relative w-full bg-[#000810] py-32 px-4 text-white overflow-hidden">
      
      {/* Abstract Background */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[20%] -right-[10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] -left-[10%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col gap-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-8 border-b border-white/10 pb-8">
          <div className="max-w-2xl">
            <h2 className="srv-header-reveal text-sm font-medium tracking-widest text-primary uppercase mb-6 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-primary"></span>
              {t("srv.tag")}
            </h2>
            <h3 className="srv-header-reveal text-5xl md:text-7xl font-heading font-medium leading-none tracking-tight">
              {t("srv.title")}
            </h3>
          </div>
          <div className="srv-header-reveal text-white/50 pb-2">
            {t("srv.scroll")} <ArrowUpRight className="inline ml-1" />
          </div>
        </div>

        {/* Interactive Accordion List */}
        <div className="services-list flex flex-col border-t border-white/5">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((srvNum, index) => {
            const Icon = icons[index];
            const isHovered = hoveredIdx === index;
            
            return (
              <div 
                key={index}
                onMouseEnter={() => setHoveredIdx(index)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`service-row group border-b border-white/5 transition-all duration-500 cursor-default relative overflow-hidden ${
                  isHovered ? 'bg-white/[0.03]' : 'hover:bg-white/[0.01]'
                }`}
              >
                {/* Background Gradient when hovered */}
                <div className={`absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent transition-opacity duration-500 pointer-events-none ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}></div>
                
                <div className="py-8 md:py-10 px-4 md:px-8 flex flex-col">
                  {/* Title Row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 md:gap-12">
                      <span className={`font-mono text-sm md:text-lg transition-colors duration-300 ${
                        isHovered ? 'text-primary' : 'text-white/20'
                      }`}>
                        0{index + 1}
                      </span>
                      <h4 className={`text-3xl md:text-5xl lg:text-6xl font-heading font-medium transition-all duration-500 ${
                        isHovered ? 'translate-x-4 md:translate-x-8 text-white' : 'text-white/50'
                      }`}>
                        {t(`srv.${srvNum}.t`)}
                      </h4>
                    </div>
                    
                    {/* Icon */}
                    <div className={`transform transition-all duration-500 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full border ${
                      isHovered ? 'rotate-12 bg-primary/20 border-primary text-primary scale-110' : 'bg-white/5 border-white/10 text-white/30'
                    }`}>
                      <Icon size={28} className="md:w-8 md:h-8" />
                    </div>
                  </div>
                  
                  {/* Expanding Content (Accordion) */}
                  <div className={`grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    isHovered ? 'grid-rows-[1fr] opacity-100 mt-6 md:mt-10' : 'grid-rows-[0fr] opacity-0 mt-0'
                  }`}>
                    <div className="overflow-hidden">
                      <div className="flex flex-col md:flex-row justify-between gap-8 pl-12 md:pl-[6.5rem]">
                        <div className="flex flex-col gap-6">
                          <p className="text-white/70 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
                            {t(`srv.${srvNum}.d`)}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {[1, 2, 3].map((fNum) => (
                              <span key={fNum} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs md:text-sm text-white/70 backdrop-blur-sm">
                                {t(`srv.${srvNum}.f${fNum}`)}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        {/* Image element when expanded */}
                        <div className={`hidden md:block w-48 h-32 md:w-64 md:h-40 rounded-2xl overflow-hidden border border-white/10 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                          isHovered ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-95 translate-x-8'
                        }`}>
                           <img 
                             src={serviceImages[index]} 
                             alt={t(`srv.${srvNum}.t`)} 
                             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                           />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
