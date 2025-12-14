"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { workExperience } from "@/data";

const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const cards = Array.from(
      document.querySelectorAll("[data-experience-card]")
    ) as HTMLElement[];

    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            if (!Number.isNaN(index)) {
              setActiveIndex(index);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "-30% 0px -50% 0px",
        threshold: 0.2,
      }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full py-20" id="experience" ref={containerRef}>
      <div className="text-center mb-12">
        <h1 className="heading">
          My <span className="text-purple">Work Experience</span>
        </h1>
        <p className="text-white-200 mt-4 max-w-3xl mx-auto text-lg">
          My professional journey building scalable solutions and leading engineering teams.
        </p>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 lg:gap-12 relative">
        {/* Sticky Sidebar (Desktop only) */}
        <div className="hidden md:flex flex-col md:w-2/5 lg:w-1/3 sticky top-24 h-fit">
          <div className="relative mb-8 rounded-2xl px-4 py-5 overflow-hidden">
            <div
              className="absolute inset-0 opacity-60 pointer-events-none"
              style={{
                background: "radial-gradient(circle at 30% 20%, rgba(88,28,135,0.15), transparent 55%), radial-gradient(circle at 70% 40%, rgba(14,165,233,0.12), transparent 55%)",
              }}
            />
            <div className="relative flex items-center gap-3 mb-3">
              <span className="px-3 py-1 text-[11px] uppercase tracking-[0.2em] rounded-full bg-white/[0.06] border border-white/[0.08] text-white/70">
                Experience
              </span>
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple to-cyan-400 shadow-[0_0_10px_rgba(56,189,248,0.5)]" />
            </div>
            <h2 className="relative text-3xl font-bold text-white leading-tight">Roles & Impact</h2>
            <p className="relative text-white-200 mt-3 text-sm">
              Designing, shipping, and evolving systems with measurable outcomes.
            </p>
          </div>

          <div className="relative pl-9 space-y-7">
            <span className="absolute left-3 top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple/70 via-white/10 to-cyan-400/60" />
            {workExperience.map((bg, index) => (
              <ExperienceLink key={bg.id} index={index} item={bg} active={activeIndex === index} />
            ))}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="w-full md:w-2/3 flex flex-col gap-12 lg:gap-20">
          {workExperience.map((card, index) => (
            <ExperienceCard key={card.id} card={card} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Component for the left sidebar links (with scroll spy logic)
const ExperienceLink = ({ item, index, active }: { item: any; index: number; active: boolean }) => {
  const cardId = `experience-card-${index}`;
  return (
    <a
      href={`#${cardId}`}
      onClick={(e) => {
        e.preventDefault();
        const element = document.getElementById(cardId);
        element?.scrollIntoView({ behavior: "smooth", block: "center" });
      }}
      className="group block relative pl-6 transition-transform duration-300"
      style={{ transform: active ? "translateX(4px)" : "translateX(0px)" }}
    >
      <span
        className={`absolute -left-[9px] top-[6px] w-3 h-3 rounded-full border border-white/[0.18] transition-all duration-300 group-hover:bg-purple group-hover:shadow-[0_0_12px_rgba(168,85,247,0.6),0_0_24px_rgba(34,211,238,0.4)] ${active ? "bg-purple shadow-[0_0_12px_rgba(168,85,247,0.7),0_0_26px_rgba(56,189,248,0.5)] scale-110" : "bg-white/10"}`}
      />
      <span className={`block text-[11px] uppercase tracking-[0.18em] mb-1 transition-colors ${active ? "text-white" : "text-white-200/80 group-hover:text-white"}`}>
        {item.period}
      </span>
      <span className={`block text-base font-semibold transition-colors ${active ? "text-white" : "text-white-100 group-hover:text-white"}`}>
        {item.company}
      </span>
    </a>
  );
};

const ExperienceCard = React.memo(({ card, index }: { card: any; index: number }) => {
  const cardId = `experience-card-${index}`;

  return (
    <motion.div
      id={cardId}
      data-experience-card
      data-index={index}
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`relative p-8 rounded-3xl border border-white/[0.1] bg-black-100/50 backdrop-blur-sm
        transition-colors duration-500 hover:border-white/[0.2]
      `}
    >
      <div className="flex flex-col gap-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl md:text-3xl font-bold">{card.role}</h3>
            <img
              src={card.thumbnail}
              alt={card.company}
              width={64}
              height={64}
              className="w-16 h-16 md:w-20 md:h-20 object-contain"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3 text-white-200 mb-4">
            <span className="text-purple font-semibold">{card.company}</span>
            <span>•</span>
            <span className="text-sm">{card.period}</span>
            <span>•</span>
            <span className="text-sm text-purple">{card.location}</span>
          </div>

          <p className="text-white-100 leading-relaxed mb-6 font-light">
            {card.description}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-purple uppercase tracking-wider mb-4">
            Key Achievements
          </h4>
          <ul className="space-y-3">
            {card.achievements.map((achievement: string, i: number) => (
              <li key={i} className="flex gap-3 text-sm text-white-200">
                <span className="mt-1.5 min-w-[6px] h-[6px] rounded-full bg-purple" />
                {achievement}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex flex-wrap gap-2 mt-4">
            {card.technologies.map((tech: string) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs rounded-full bg-white/[0.05] border border-white/[0.1] text-purple"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

ExperienceCard.displayName = 'ExperienceCard';

export default Experience;