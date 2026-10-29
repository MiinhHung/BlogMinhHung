"use client";

import { useEffect, useState } from "react";
import { Intro } from "./intro";
import { Hero } from "./hero";
import { About } from "./about";
import { HowIHelp } from "./how-i-help";
import { SidCorp } from "./sid-corp";
import { Services } from "./services";
import { Industries } from "./industries";
import { Blog } from "./blog";
import { MiniGallery } from "./mini-gallery";
import { Contact } from "./contact";
import { ScrollToTop } from "./scroll-to-top";

export function HomeWrapper() {
  const [showIntro, setShowIntro] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setIsMounted(true);
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    const hasVisited = localStorage.getItem("hung-portfolio-visited");
    if (!hasVisited) {
      setShowIntro(true);
    } else {
      setIntroFinished(true);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setIntroFinished(true);
    localStorage.setItem("hung-portfolio-visited", "true");
  };

  // ... (keeping intro logic identical, we'll just rewrite the nav part)
  
  // Lock body scroll during intro to prevent scrolling while it plays
  useEffect(() => {
    if (showIntro && !introFinished) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showIntro, introFinished]);

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-black text-foreground">
      {/* Navbar with Language Toggle */}
      <Nav />

      {showIntro && <Intro onComplete={handleIntroComplete} />}
      <div>
        <Hero introFinished={introFinished} skipIntro={!showIntro && introFinished} />
        <About />
        <HowIHelp />
        <SidCorp />
        <div id="services">
          <Services />
        </div>
        <Industries />
        <Blog />
        <MiniGallery />
        <Contact />
      </div>
      <ScrollToTop />
    </main>
  );
}

import { useLanguage } from "@/lib/i18n";
function Nav() {
  const { language, setLanguage, t } = useLanguage();
  return (
    <nav className="fixed top-0 left-0 w-full z-40 flex items-center justify-between px-6 py-4 mix-blend-difference text-white">
      <button 
        onClick={(e) => { 
          e.preventDefault(); 
          localStorage.removeItem("hung-portfolio-visited"); 
          window.scrollTo(0, 0);
          setTimeout(() => window.location.reload(), 10);
        }} 
        className="font-heading font-medium tracking-widest text-lg hover:text-primary transition-colors cursor-pointer"
      >
        HUNG NGUYEN
      </button>
      <div className="flex items-center gap-6 text-sm">
        <a href="#about" className="hidden md:block hover:text-primary transition-colors">{t("nav.about")}</a>
        <a href="#services" className="hidden md:block hover:text-primary transition-colors">{t("nav.services")}</a>
        <a href="#blog" className="hidden md:block hover:text-primary transition-colors">{t("nav.blog")}</a>
        <a href="#contact" className="hidden md:block hover:text-primary transition-colors">{t("nav.contact")}</a>
        <div className="flex items-center gap-2 border border-white/20 rounded-full px-3 py-1 bg-white/5 backdrop-blur-md">
          <button onClick={() => setLanguage("EN")} className={`hover:text-primary font-medium ${language === "EN" ? "text-primary" : "text-white/50"}`}>EN</button>
          <span className="text-white/30">|</span>
          <button onClick={() => setLanguage("VI")} className={`hover:text-primary font-medium ${language === "VI" ? "text-primary" : "text-white/50"}`}>VI</button>
        </div>
      </div>
    </nav>
  );
}
