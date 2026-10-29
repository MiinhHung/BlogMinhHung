"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import { MagneticButton } from "./ui/magnetic-button";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  introFinished: boolean;
  skipIntro: boolean;
}

export function Hero({ introFinished, skipIntro }: HeroProps) {
  const { t } = useLanguage();
  const container = useRef<HTMLDivElement>(null);
  const bgImage = useRef<HTMLImageElement>(null);
  const bgLayer = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const spotlight = useRef<HTMLDivElement>(null);
  const scrollCue = useRef<HTMLDivElement>(null);

  // Entrance timeline — waits for the intro unless it was skipped.
  useEffect(() => {
    if (!skipIntro && !introFinished) return;
    if (!container.current) return;

    const ctx = gsap.context(() => {
      gsap.set(".hero-title-word", { y: "110%" });
      gsap.set(".hero-desc", { opacity: 0, filter: "blur(10px)" });
      gsap.set(".hero-buttons", { opacity: 0, y: 30 });
      gsap.set(".hero-badge", { opacity: 0, y: 20 });
      gsap.set(".hero-proof", { opacity: 0, y: 16 });

      gsap
        .timeline()
        .fromTo(bgImage.current, { scale: 1.2 }, { scale: 1, duration: 2, ease: "power3.out" })
        .to(".hero-badge", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=1.5")
        .to(".hero-title-word", { y: "0%", duration: 1.2, stagger: 0.2, ease: "power4.out" }, "-=1.2")
        .to(".hero-desc", { opacity: 1, filter: "blur(0px)", duration: 1.5, ease: "power2.out" }, "-=0.8")
        .to(".hero-buttons", { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=1.2")
        .to(".hero-proof", { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }, "-=0.7");
    }, container);

    return () => ctx.revert();
  }, [introFinished, skipIntro]);

  // Ambient motion, scroll parallax and the cursor spotlight.
  useEffect(() => {
    if (!container.current) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    const ctx = gsap.context(() => {
      // Badge dot and scroll cue, hand-tuned instead of Tailwind's stock keyframes.
      gsap.to(".hero-badge-dot", {
        opacity: 0.35,
        scale: 0.82,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".hero-scroll-arrow", {
        y: 7,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      if (reduced) return;

      // Parallax: the backdrop drifts slower than the page while the copy outruns
      // it. The layer is oversized so sliding it never exposes an edge.
      gsap.to(bgLayer.current, {
        yPercent: 14,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(content.current, {
        yPercent: -22,
        opacity: 0,
        filter: "blur(6px)",
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "70% top",
          scrub: true,
        },
      });

      gsap.to(scrollCue.current, {
        opacity: 0,
        y: 20,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "20% top",
          scrub: true,
        },
      });
    }, container);

    // Cursor spotlight — pointer devices only, so touch users pay nothing for it.
    let cleanupPointer: (() => void) | undefined;
    if (finePointer && !reduced && spotlight.current) {
      const el = container.current;
      gsap.set(spotlight.current, { xPercent: -50, yPercent: -50 });
      const xTo = gsap.quickTo(spotlight.current, "x", { duration: 0.9, ease: "power3" });
      const yTo = gsap.quickTo(spotlight.current, "y", { duration: 0.9, ease: "power3" });

      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        xTo(e.clientX - rect.left);
        yTo(e.clientY - rect.top);
      };
      const onEnter = () => gsap.to(spotlight.current, { opacity: 1, duration: 0.6 });
      const onLeave = () => gsap.to(spotlight.current, { opacity: 0, duration: 0.6 });

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      cleanupPointer = () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      };
    }

    return () => {
      cleanupPointer?.();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={container}
      className="relative flex h-svh w-full items-center justify-center overflow-hidden bg-black"
    >
      {/* Backdrop — oversized so the parallax drift never reveals an edge */}
      <div ref={bgLayer} className="absolute inset-x-0 -top-[12%] h-[124%] opacity-60 will-change-transform">
        <Image
          ref={bgImage as React.LegacyRef<HTMLImageElement>}
          src="https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=2070&auto=format&fit=crop"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover"
          priority
          style={{ transform: skipIntro ? "scale(1)" : "scale(1.2)" }}
        />
      </div>

      {/* Legibility stack: vertical fade, vignette, then a scrim under the copy */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_22%,rgba(0,0,0,0.92)_85%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_62%_52%_at_50%_44%,rgba(0,0,0,0.72)_0%,transparent_72%)]" />

      {/* Cursor spotlight */}
      <div
        ref={spotlight}
        className="pointer-events-none absolute left-0 top-0 h-[46rem] w-[46rem] rounded-full bg-[radial-gradient(circle,rgba(0,119,255,0.16)_0%,rgba(255,123,0,0.07)_38%,transparent_66%)] opacity-0 mix-blend-screen blur-2xl"
      />

      {/* Film grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: "url('/noise.png')", backgroundSize: "128px 128px" }}
      />

      {/* Hero Content */}
      <div ref={content} className="relative z-10 flex flex-col items-center px-4 text-center will-change-transform">
        <div className="hero-badge mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur-md">
          <span className="hero-badge-dot mr-2 flex h-2 w-2 rounded-full bg-secondary" />
          {t("hero.badge")}
        </div>

        <h1 className="mb-8 flex flex-col items-center font-heading text-5xl font-medium tracking-tight text-white md:text-7xl lg:text-[6rem]">
          <span className="block overflow-hidden pb-2 leading-[1.1]">
            <span className="hero-title-word block" style={{ transform: "translateY(110%)" }}>
              {t("hero.title1")}
            </span>
          </span>
          <span className="block overflow-hidden pb-2 leading-[1.1]">
            {/* Blue and orange are complementary — routing through a near-white
                stop keeps the midpoint from going muddy grey. */}
            <span
              className="hero-title-word block bg-gradient-to-r from-primary via-[#f2f6ff] to-secondary bg-clip-text text-transparent"
              style={{ transform: "translateY(110%)" }}
            >
              {t("hero.title2")}
            </span>
          </span>
        </h1>

        <p
          className="hero-desc mb-10 max-w-2xl text-lg font-light text-white/70 md:text-xl"
          style={{ opacity: 0, filter: "blur(10px)" }}
          dangerouslySetInnerHTML={{
            __html: t("hero.desc").replace(/SID CORP/g, "<span class='text-secondary font-bold'>SID CORP</span>"),
          }}
        />

        <div className="hero-buttons flex items-center gap-4" style={{ opacity: 0, transform: "translateY(30px)" }}>
          <MagneticButton intensity={0.2}>
            <a
              href="#contact"
              className="inline-block rounded-full bg-primary px-8 py-4 text-sm font-bold tracking-wide text-white shadow-[0_0_28px_rgba(0,119,255,0.45)] transition-all hover:scale-105 hover:bg-primary/90 hover:shadow-[0_0_44px_rgba(0,119,255,0.65)]"
            >
              {t("hero.btn.start")}
            </a>
          </MagneticButton>
          <MagneticButton intensity={0.2}>
            <a
              href="#about"
              className="inline-block rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold tracking-wide text-white transition-all hover:scale-105 hover:bg-white/10"
            >
              {t("hero.btn.about")}
            </a>
          </MagneticButton>
        </div>

        <div
          className="hero-proof mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs uppercase tracking-[0.18em] text-white/40"
          style={{ opacity: 0 }}
        >
          <span>{t("hero.proof1")}</span>
          <span className="h-1 w-1 rounded-full bg-white/25" />
          <span>{t("hero.proof2")}</span>
          <span className="h-1 w-1 rounded-full bg-white/25" />
          <span className="text-secondary/70">SID CORP</span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollCue}
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 opacity-70"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-white/50">{t("hero.scroll")}</span>
        <ArrowDown size={16} className="hero-scroll-arrow text-white/50" />
      </div>
    </section>
  );
}
