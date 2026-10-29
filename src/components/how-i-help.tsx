"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Search, Code2, Rocket, Headset, Lightbulb } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const steps = [
  {
    title: "Discovery & Strategy",
    description: "We start by deeply understanding your business goals, target audience, and current challenges. This phase involves thorough research to define a solid strategic foundation.",
    icon: Search,
    color: "bg-blue-900/40"
  },
  {
    title: "Solution Consulting",
    description: "Leveraging my expertise at SID CORP, I architect a scalable, future-proof solution tailored to your exact needs, selecting the right technologies and frameworks.",
    icon: Lightbulb,
    color: "bg-orange-900/40"
  },
  {
    title: "Agile Development",
    description: "We build your product using modern, high-performance tech stacks. Regular updates and agile methodologies ensure you are always in the loop.",
    icon: Code2,
    color: "bg-blue-900/40"
  },
  {
    title: "Deployment & Scaling",
    description: "Seamless deployment to cloud infrastructure ensuring high availability. We implement robust CI/CD pipelines for smooth and safe updates.",
    icon: Rocket,
    color: "bg-orange-900/40"
  },
  {
    title: "Support & Evolution",
    description: "Our partnership doesn't end at launch. I provide continuous support, optimization, and feature enhancements to keep your product ahead of the curve.",
    icon: Headset,
    color: "bg-blue-900/40"
  }
];

import { useLanguage } from "@/lib/i18n";

export function HowIHelp() {
  const { t } = useLanguage();
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".help-card") as HTMLElement[];

      cards.forEach((card, i) => {
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 20%",
            end: "bottom top",
            scrub: true,
            pin: true,
            pinSpacing: i === cards.length - 1 ? true : false,
          },
          scale: 1 - (cards.length - i) * 0.05,
          opacity: 1 - (cards.length - i) * 0.1,
        });
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative w-full bg-black py-32 px-4 text-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-sm font-medium tracking-widest text-secondary uppercase mb-4">
            {t("help.tag")}
          </h2>
          <h3 className="text-4xl md:text-5xl font-heading font-medium leading-tight">
            {t("help.title")}
          </h3>
        </div>

        <div className="relative pb-32">
          {[1, 2, 3, 4, 5].map((stepNum, index) => {
            const icons = [Search, Lightbulb, Code2, Rocket, Headset];
            const colors = ["bg-blue-900/40", "bg-orange-900/40", "bg-blue-900/40", "bg-orange-900/40", "bg-blue-900/40"];
            const IconComponent = icons[index];
            return (
              <div
                key={index}
                className="help-card relative flex flex-col md:flex-row items-center gap-8 rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12 mb-8 backdrop-blur-md shadow-2xl"
                style={{ zIndex: index }}
              >
                <div className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full ${colors[index]} border border-white/20`}>
                  <IconComponent size={32} className={index % 2 === 0 ? "text-primary" : "text-secondary"} />
                </div>
                <div>
                  <span className="text-sm font-bold text-white/30 mb-2 block">STEP 0{index + 1}</span>
                  <h4 className="text-2xl font-medium mb-4">{t(`help.step${stepNum}.t`)}</h4>
                  <p 
                    className="text-white/60 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: t(`help.step${stepNum}.d`).replace(/SID CORP/g, "<span class='text-secondary font-bold'>SID CORP</span>") }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
