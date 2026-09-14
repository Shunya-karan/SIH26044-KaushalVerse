import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  PlayCircle,
  Target,
  Sparkles,
  Landmark,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/common/States";

const LEADERSHIP_REFERENCES = [
  {
    photo: "/gov/pm-portrait.png",
    name: "Shri Narendra Modi",
    designation: "Hon'ble Prime Minister of India",
  },
  {
    photo: "/gov/minister-jp-nadda.png",
    name: "Shri Jagat Prakash Nadda",
    designation:
      "Hon'ble Union Minister of Health & Family Welfare and Chemicals & Fertilizers",
  },
  {
    photo: "/gov/Prataprao_Jadhav.png",
    name: "Shri Prataprao Jadhav",
    designation:
      "Hon'ble Minister of State (Independent Charge), Ministry of Ayush & Minister of State, Health & Family Welfare",
  },
];

function GovStrip() {
  return (
    <div className="border-b border-accent/20 bg-accent-light/50">
      <div className="container-page flex flex-col gap-4 py-4 xl:flex-row xl:items-center xl:justify-between">
        
        {/* Left side */}
        <div className="flex shrink-0 items-center gap-2 text-xs font-medium text-accent">
          <Landmark className="h-4 w-4" />
          <span>
            Smart India Hackathon · Institutional Context Reference
          </span>
        </div>

        {/* Leadership */}
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3 xl:w-auto xl:gap-5">
          {LEADERSHIP_REFERENCES.map((person) => (
            <div
              key={person.name}
              className="
                flex items-center gap-3
                rounded-lg
                border border-border/60
                bg-white/70
                px-3 py-2.5
                shadow-sm
                backdrop-blur-sm
                sm:min-w-[210px]
                lg:min-w-[240px]
              "
            >
              <img
                src={person.photo}
                alt={person.name}
                className="
                  h-14 w-14
                  shrink-0
                  rounded-full
                  border-2 border-white
                  object-cover
                  shadow-sm
                  lg:h-16 lg:w-16
                "
              />

              <div className="min-w-0 leading-tight">
                <p className="text-xs font-semibold text-foreground lg:text-sm">
                  {person.name}
                </p>

                <p className="mt-1 max-w-[210px] text-[10px] leading-snug text-muted-foreground lg:text-[11px]">
                  {person.designation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-orange-100/70 via-accent-light/30 to-background">
      
      <GovStrip />

      {/* Subtle background glow */}
      <div className="pointer-events-none absolute left-1/2 top-[42%] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[110px]" />

      <div className="container-page relative flex min-h-[650px] items-center justify-center py-20 sm:py-24 lg:py-28">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto flex w-full max-w-5xl flex-col items-center text-center"
        >
          {/* SIH Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionLabel>
              Smart India Hackathon 2026 · PS26044
            </SectionLabel>
          </motion.div>

          {/* Main Heading */}
          <h1 className="mt-6 max-w-5xl text-5xl font-extrabold leading-[1.05] tracking-[-0.045em] text-foreground sm:text-6xl lg:text-7xl">
            Bridging Academia and Industry
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Through Skills
            </span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8 lg:text-xl">
            KaushalVerse connects students, institutions and industry through
            intelligent skill mapping, verified competencies, internships,
            placement opportunities and personalized career pathways.
          </p>

          {/* CTA Buttons */}
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              asChild
              className="h-12 rounded-xl px-7 text-sm font-semibold shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
            >
              <Link to="/register">
                Explore Opportunities
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              asChild
              className="h-12 rounded-xl border-border/80 bg-white/70 px-7 text-sm font-semibold backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white"
            >
              <Link to="/how-it-works">
                <PlayCircle className="mr-1 h-4 w-4" />
                See How It Works
              </Link>
            </Button>
          </div>

          {/* Product Value Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-medium text-muted-foreground sm:text-sm"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              <span>Skill Assessment</span>
            </div>

            <span className="hidden text-border sm:inline">•</span>

            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-accent" />
              <span>Skill Gap Analysis</span>
            </div>

            <span className="hidden text-border sm:inline">•</span>

            <div className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-accent" />
              <span>Industry Matching</span>
            </div>

            <span className="hidden text-border sm:inline">•</span>

            <div className="flex items-center gap-2">
              <span className="flex h-4 w-4 items-center justify-center rounded-full border border-accent/50 text-[9px] font-bold text-accent">
                ✓
              </span>
              <span>Placement Pathways</span>
            </div>
          </motion.div>

          {/* Bottom trust statement */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 text-xs text-muted-foreground/80"
          >
            From skill discovery to verified industry readiness
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}