"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Phone, Clock, Mail } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { MagneticButton } from "./ui/magnetic-button";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Contact() {
  const { t } = useLanguage();
  const container = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        timeZone: 'Asia/Ho_Chi_Minh',
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: false 
      };
      setTime(now.toLocaleTimeString('en-GB', options) + ' ICT');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(
    () => {
      // Reveal items
      gsap.fromTo(
        ".contact-reveal",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 70%",
          },
        }
      );

      // Marquee animation
      gsap.to(".marquee-inner", {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1,
      });
      
    },
    { scope: container }
  );

  return (
    <section id="contact" ref={container} className="relative w-full bg-[#000810] pt-40 pb-10 text-white overflow-hidden flex flex-col justify-between min-h-[90vh]">
      {/* Abstract Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(255,77,0,0.08)_0%,transparent_70%)] rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(255,149,0,0.05)_0%,transparent_70%)] rounded-full blur-[150px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,#000_10%,transparent_100%)]"></div>
      </div>
      
      {/* Background Marquee */}
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 overflow-hidden pointer-events-none opacity-5 mix-blend-screen select-none">
        <div className="marquee-inner flex whitespace-nowrap text-[15vw] font-heading font-bold italic tracking-tighter text-white">
          <span>LET&apos;S WORK TOGETHER — LET&apos;S WORK TOGETHER — </span>
          <span>LET&apos;S WORK TOGETHER — LET&apos;S WORK TOGETHER — </span>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full px-6 flex flex-col items-center text-center mt-10">
        <h2 className="contact-reveal text-sm font-medium tracking-widest text-primary uppercase mb-6 inline-block border border-primary/20 bg-primary/5 px-6 py-2 rounded-full">
          {t("contact.tag")}
        </h2>
        <h3 className="contact-reveal text-6xl md:text-[6rem] font-heading font-medium leading-none mb-8 tracking-tight">
          {t("contact.title1")} <br />
          <span className="italic text-white/40 block mt-2">{t("contact.title2")}</span>
        </h3>
        
        <p className="contact-reveal text-xl md:text-2xl text-white/60 mb-20 max-w-2xl mx-auto font-light">
          {t("contact.desc")}
        </p>

        <div className="contact-reveal flex flex-wrap justify-center gap-6 md:gap-8">
          <MagneticButton intensity={0.4}>
            <a 
              href="mailto:hungnm@sidcorp.co" 
              onClick={(e) => {
                navigator.clipboard.writeText("hungnm@sidcorp.co");
                alert("Đã copy email: hungnm@sidcorp.co");
              }}
              className="group flex items-center justify-center w-24 h-24 md:w-32 md:h-32 bg-[#EA4335]/10 text-[#EA4335] rounded-full border border-[#EA4335]/30 hover:bg-[#EA4335] hover:text-white hover:scale-110 transition-all duration-500 shadow-[0_0_30px_rgba(234,67,53,0)] hover:shadow-[0_0_40px_rgba(234,67,53,0.4)]"
              aria-label="Email"
            >
              <Mail size={32} className="group-hover:scale-110 transition-transform duration-300" />
            </a>
          </MagneticButton>

          <MagneticButton intensity={0.4}>
            <a 
              href="https://zalo.me/0826831724" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-24 h-24 md:w-32 md:h-32 bg-[#0068FF]/10 text-[#0068FF] rounded-full border border-[#0068FF]/30 hover:bg-[#0068FF] hover:text-white hover:scale-110 transition-all duration-500 shadow-[0_0_30px_rgba(0,104,255,0)] hover:shadow-[0_0_40px_rgba(0,104,255,0.4)]"
              aria-label="Zalo"
            >
              <Phone size={32} className="group-hover:rotate-12 transition-transform duration-300" />
            </a>
          </MagneticButton>
          
          <MagneticButton intensity={0.4}>
            <a 
              href="https://www.linkedin.com/in/hugmin04/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-24 h-24 md:w-32 md:h-32 bg-[#0A66C2]/10 text-[#0A66C2] rounded-full border border-[#0A66C2]/30 hover:bg-[#0A66C2] hover:text-white hover:scale-110 transition-all duration-500 shadow-[0_0_30px_rgba(10,102,194,0)] hover:shadow-[0_0_40px_rgba(10,102,194,0.4)]"
              aria-label="LinkedIn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform duration-300"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
          </MagneticButton>

          <MagneticButton intensity={0.4}>
            <a 
              href="https://www.facebook.com/profile.php?id=61579530929295" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-24 h-24 md:w-32 md:h-32 bg-[#1877F2]/10 text-[#1877F2] rounded-full border border-[#1877F2]/30 hover:bg-[#1877F2] hover:text-white hover:scale-110 transition-all duration-500 shadow-[0_0_30px_rgba(24,119,242,0)] hover:shadow-[0_0_40px_rgba(24,119,242,0.4)]"
              aria-label="Facebook"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-rotate-12 transition-transform duration-300"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
          </MagneticButton>
        </div>
      </div>
      
      {/* Cinematic Footer Info */}
      <div className="relative z-10 w-full px-6 mt-32 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3 text-white/50 text-sm font-mono tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/10">
          <Clock size={16} className="text-primary" />
          <span>HO CHI MINH CITY, VN</span>
          <span className="text-white/30">|</span>
          <span className="text-white">{time}</span>
        </div>

        <div className="text-white/40 text-sm">
          <p dangerouslySetInnerHTML={{ __html: t("contact.copyright").replace(/SID CORP/g, "<span class='text-secondary font-medium'>SID CORP</span>") }} />
        </div>
      </div>
    </section>
  );
}
