"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function MiniGallery() {
  const { t } = useLanguage();
  const container = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const itemsContainer = useRef<HTMLDivElement>(null);

  const projects = [
    {
      title: "DodgePrint",
      category: "E-commerce",
      desc: "Bán hàng đa kênh: Etsy, Amazon, Shopify, ShopBase — đăng một lần, bán mọi nơi.",
      img: "https://www.sidcorp.co/storage/store-58/sid-projects/1784107927769766055-7o1o7k.png",
      url: "https://www.sidcorp.co/vi/our-products/dodgeprint",
    },
    {
      title: "ePOD System",
      category: "E-commerce · AI",
      desc: "Nền tảng dựng gian hàng trực tuyến tích hợp AI nhanh chóng, hiệu suất cao.",
      img: "https://www.sidcorp.co/storage/store-58/sid-projects/1784107929676567512-cd9b0a.png",
      url: "https://www.sidcorp.co/vi/our-products/epod",
    },
    {
      title: "Bozuro (CDP)",
      category: "Data · CX",
      desc: "Nền tảng dữ liệu khách hàng giúp doanh nghiệp cá nhân hóa trải nghiệm và tối ưu vận hành.",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      url: "https://www.sidcorp.co/vi/our-products/bozuro",
    },
    {
      title: "SidPeak",
      category: "Operations",
      desc: "Giải pháp quản trị nội bộ toàn diện, tối ưu hóa quy trình làm việc cho doanh nghiệp.",
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
      url: "https://www.sidcorp.co/vi/our-products/sidpeak",
    }
  ];

  useGSAP(
    () => {
      // Horizontal scroll
      const items = gsap.utils.toArray<HTMLElement>(".gallery-item");
      const containerWidth = itemsContainer.current?.scrollWidth || 0;
      gsap.to(items, {
        xPercent: -100 * (items.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: wrapper.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${containerWidth}`,
        },
      });

      // Hover effects
      items.forEach((item) => {
        const img = item.querySelector(".gallery-img");
        const info = item.querySelector(".gallery-info");

        item.addEventListener("mouseenter", () => {
          gsap.to(img, { scale: 1.05, duration: 0.6, ease: "power3.out" });
          gsap.to(info, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
        });
        
        item.addEventListener("mouseleave", () => {
          gsap.to(img, { scale: 1, duration: 0.6, ease: "power3.out" });
          gsap.to(info, { y: 20, opacity: 0, duration: 0.4, ease: "power2.out" });
        });
      });
    },
    { scope: container }
  );

  return (
    <section 
      id="gallery" 
      ref={container} 
      className="relative bg-[#000810] text-white"
    >
      <div ref={wrapper} className="h-screen flex flex-col justify-center overflow-hidden pt-20">
        
        <div className="px-8 md:px-24 mb-12">
          <h2 className="text-sm font-medium tracking-widest text-primary uppercase mb-4 inline-block border border-primary/20 bg-primary/5 px-5 py-2 rounded-full">
            {t("gallery.tag")}
          </h2>
          <h3 className="text-4xl md:text-6xl font-heading font-medium leading-tight text-white max-w-2xl">
            {t("gallery.title1")} <span className="text-secondary">SID CORP</span>
          </h3>
        </div>

        <div 
          ref={itemsContainer} 
          className="flex w-[400vw] h-[50vh] px-8 md:px-24 gap-8 md:gap-16"
        >
          {projects.map((project, idx) => (
            <a 
              key={idx} 
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="gallery-item relative w-[80vw] md:w-[60vw] h-full rounded-[2rem] overflow-hidden group border border-white/5 bg-white/5"
            >
              <Image 
                src={project.img} 
                alt={project.title} 
                fill 
                className="gallery-img object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" 
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 pointer-events-none"></div>

              <div className="gallery-info absolute bottom-0 left-0 w-full p-8 md:p-12 transform translate-y-5 opacity-0 pointer-events-none flex flex-col justify-end h-full">
                <div className="text-primary font-mono text-sm uppercase tracking-widest mb-3">
                  {project.category}
                </div>
                <h4 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
                  {project.title}
                </h4>
                <p className="text-white/70 text-lg md:text-xl max-w-xl">
                  {t(`gallery.proj${idx + 1}.desc`)}
                </p>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
