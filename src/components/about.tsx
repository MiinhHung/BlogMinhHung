"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Briefcase, Calendar, Code2, Sparkles, MonitorSmartphone, Server, Database, PenTool, LayoutTemplate, Smartphone, Users, Target, Building2 } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function About() {
  const { t } = useLanguage();
  const container = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"engineering" | "consulting">("engineering");

  useGSAP(
    () => {
      // Stagger animation for text
      gsap.fromTo(
        ".about-text-reveal",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 80%",
          },
        }
      );

      // Stagger animation for fact cards
      gsap.fromTo(
        ".about-stat-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-stats-container",
            start: "top 85%",
          },
        }
      );

      // Laser Beam Animation
      if (timelineRef.current) {
        const items = gsap.utils.toArray(".timeline-item");
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 60%",
            end: "bottom 60%",
            scrub: 1,
          }
        });

        // Beam growing downwards
        tl.to(".laser-beam", {
          height: "100%",
          ease: "none"
        });

        // Trigger dots and text as beam passes them
        items.forEach((item: any, i) => {
          gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: "top 60%",
              end: "bottom 60%",
              scrub: 1,
            }
          })
          .to(item.querySelector(".timeline-dot"), {
            backgroundColor: "#FF4D00",
            borderColor: "#0068FF",
            boxShadow: "0 0 20px rgba(255, 77, 0, 0.8)",
            duration: 0.2
          })
          .to(item.querySelector(".timeline-content"), {
            opacity: 1,
            x: 0,
            duration: 0.2
          }, "<");
        });
      }

      // Bento Box Reveal
      gsap.fromTo(
        ".bento-box",
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: bentoRef.current,
            start: "top 80%",
          },
        }
      );

    },
    { scope: container }
  );

  // Spotlight Effect for Bento Grid
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll(".bento-box");
      cards.forEach((card) => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
        (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
      });
    };

    const bentoContainer = bentoRef.current;
    if (bentoContainer) {
      bentoContainer.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (bentoContainer) {
        bentoContainer.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  const formatText = (text: string) => {
    return {
      __html: text.replace(
        /SID CORP/g,
        "<span class='text-secondary font-bold'>SID CORP</span>"
      ),
    };
  };

  const bentoEngineering = [
    {
      title: t("about.bento.frontend"),
      icon: LayoutTemplate,
      techs: ["Next.js", "React", "TailwindCSS"],
      colSpan: "md:col-span-2",
      color: "from-primary/20 to-transparent",
    },
    {
      title: t("about.bento.langs"),
      icon: Code2,
      techs: ["TypeScript", "JavaScript", "Go", "Java"],
      colSpan: "md:col-span-2 lg:col-span-1",
      color: "from-secondary/20 to-transparent",
    },
    {
      title: t("about.bento.backend"),
      icon: Database,
      techs: ["Node.js", "SQL Server", "MongoDB"],
      colSpan: "md:col-span-2 lg:col-span-1",
      color: "from-green-500/20 to-transparent",
    },
    {
      title: t("about.bento.mobile"),
      icon: Smartphone,
      techs: ["Dart", "Flutter"],
      colSpan: "md:col-span-1",
      color: "from-purple-500/20 to-transparent",
    }
  ];

  const bentoConsulting = [
    {
      title: t("about.bento.arch"),
      icon: Server,
      techs: ["System Design", "Microservices", "Cloud Native"],
      colSpan: "md:col-span-2",
      color: "from-secondary/20 to-transparent",
    },
    {
      title: t("about.bento.process"),
      icon: Users,
      techs: ["Scrum Master", "Workflow Optimization", "CI/CD"],
      colSpan: "md:col-span-2 lg:col-span-1",
      color: "from-primary/20 to-transparent",
    },
    {
      title: t("about.bento.strategy"),
      icon: Target,
      techs: ["Digital Transformation", "Requirement Analysis"],
      colSpan: "md:col-span-2 lg:col-span-1",
      color: "from-blue-500/20 to-transparent",
    },
    {
      title: t("about.bento.enterprise"),
      icon: Building2,
      techs: ["ERP Integration", "CRM Solutions"],
      colSpan: "md:col-span-1",
      color: "from-orange-500/20 to-transparent",
    }
  ];

  const activeBentoData = activeTab === "engineering" ? bentoEngineering : bentoConsulting;

  return (
    <section
      id="about"
      ref={container}
      className="relative w-full bg-[#000810] py-32 px-4 text-white overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
        <Image 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
          alt="Space Technology Background" 
          fill 
          className="object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#000810] via-transparent to-[#000810]"></div>
      </div>
      
      {/* Subtle Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col gap-24">
        
        {/* TOP SECTION: Intro & Stats */}
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left: Text Content */}
          <div className="lg:w-1/2 w-full flex flex-col gap-8">
            <div>
              <h2 className="about-text-reveal text-sm font-medium tracking-widest text-primary uppercase mb-4">
                {t("about.tag")}
              </h2>
              <h3 className="about-text-reveal text-4xl md:text-5xl font-heading font-medium leading-tight mb-8">
                {t("about.title")}
              </h3>
            </div>
            
            <div className="about-text-reveal flex flex-col gap-6 text-lg text-white/70 font-light leading-relaxed">
              <p dangerouslySetInnerHTML={formatText(t("about.p1"))} />
              <p dangerouslySetInnerHTML={formatText(t("about.p2"))} />
            </div>

            <div className="about-text-reveal mt-4 pl-6 border-l-2 border-secondary">
              <p className="text-xl font-serif text-white/90 italic">
                {t("about.quote")}
              </p>
            </div>
          </div>

          {/* Right: Image & Stats */}
          <div className="lg:w-1/2 w-full flex flex-col gap-8">
            {/* Image */}
            <div className="about-text-reveal relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
              <Image 
                src="/profile.jpg" 
                alt="Hung Nguyen" 
                fill 
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 pointer-events-none"></div>
            </div>
            
            {/* Quick Facts Grid */}
            <div className="about-stats-container grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: t("about.qf.exp"), val: t("about.qf.exp.val"), icon: Calendar },
                { label: t("about.qf.proj"), val: t("about.qf.proj.val"), icon: Briefcase },
                { label: t("about.qf.tech"), val: t("about.qf.tech.val"), icon: Code2 },
              ].map((fact, idx) => (
                <div key={idx} className="about-stat-card bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <fact.icon className="text-primary mb-3" size={28} />
                  <div className="text-3xl font-bold mb-1 text-white">{fact.val}</div>
                  <div className="text-xs text-white/60 uppercase tracking-wider">{fact.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Journey & Tech */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 pt-16 border-t border-white/10">
          
          {/* Left: Signature Journey (Laser Beam Timeline) */}
          <div className="lg:w-1/2 w-full">
            <h4 className="text-2xl font-medium mb-12 flex items-center gap-3">
              <Sparkles className="text-secondary" size={24} />
              {t("about.journey.title")}
            </h4>
            
            <div ref={timelineRef} className="relative pl-8 pb-4">
              {/* Background Track */}
              <div className="absolute left-[11px] top-2 bottom-0 w-[2px] bg-white/10 rounded-full"></div>
              
              {/* Laser Beam */}
              <div className="laser-beam absolute left-[11px] top-2 w-[2px] h-0 bg-gradient-to-b from-primary via-secondary to-transparent rounded-full shadow-[0_0_15px_rgba(255,77,0,1)] z-10"></div>
              
              <div className="flex flex-col gap-12">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="timeline-item relative flex flex-col group">
                    {/* Glowing Dot */}
                    <div className="timeline-dot absolute -left-8 top-1.5 w-6 h-6 rounded-full bg-[#000810] border-[3px] border-white/20 z-20 transition-colors duration-300"></div>
                    
                    {/* Content */}
                    <div className="timeline-content opacity-30 -translate-x-4 transition-all duration-300">
                      <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-secondary font-mono text-xs mb-3">
                        {t(`about.journey.${item}.time`)}
                      </span>
                      <h5 className="text-xl font-medium text-white mb-1 group-hover:text-primary transition-colors">
                        {t(`about.journey.${item}.role`)}
                      </h5>
                      <p className="text-white/50 text-sm">
                        {t(`about.journey.${item}.company`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Crafted With (Bento Box Spotlight) */}
          <div className="lg:w-1/2 w-full">
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-12">
               <h4 className="text-2xl font-medium flex items-center gap-3">
                 <MonitorSmartphone className="text-primary" size={24} />
                 {t("about.tech.title")}
               </h4>
               
               {/* Tab Switches */}
               <div className="flex items-center p-1 bg-white/5 border border-white/10 rounded-full w-max">
                  <button 
                     onClick={() => setActiveTab('engineering')}
                     className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'engineering' ? 'bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]' : 'text-white/40 hover:text-white/70 hover:bg-white/5'}`}
                  >
                     {t("about.tech.tab1")}
                  </button>
                  <button 
                     onClick={() => setActiveTab('consulting')}
                     className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'consulting' ? 'bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]' : 'text-white/40 hover:text-white/70 hover:bg-white/5'}`}
                  >
                     {t("about.tech.tab2")}
                  </button>
               </div>
            </div>
            
            <div ref={bentoRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeBentoData.map((box, idx) => (
                <div 
                  key={`${activeTab}-${idx}`} 
                  className={`bento-box relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md transition-all duration-300 hover:border-white/30 group ${box.colSpan}`}
                  style={{ animation: 'fadeIn 0.5s ease-out forwards' }}
                >
                  {/* Spotlight Gradient Overlay */}
                  <div 
                    className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.1), transparent 40%)`,
                    }}
                  ></div>
                  
                  {/* Inner Gradient */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${box.color} blur-[40px] opacity-50`}></div>

                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-black/30 rounded-lg border border-white/5 group-hover:bg-white/10 transition-colors">
                        <box.icon size={20} className="text-white/70 group-hover:text-white transition-colors" />
                      </div>
                      <h5 className="font-medium text-white/90">{box.title}</h5>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {box.techs.map((tech, i) => (
                        <span 
                          key={i} 
                          className="px-3 py-1 text-xs font-medium text-white/60 bg-black/40 rounded-md border border-white/5 transition-colors group-hover:border-white/20 group-hover:text-white/90"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
