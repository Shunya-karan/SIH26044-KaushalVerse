import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  PlayCircle,
  TrendingUp,
  Target,
  Sparkles,
  Landmark,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
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
              {/* Larger portrait */}
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

              {/* Name + designation */}
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
    <section className="relative overflow-hidden bg-gradient-to-b from-orange-100/70 via-accent-light/40 to-background">
      <GovStrip />

      <div className="container-page grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:py-24">
        
        {/* Left Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel>Smart India Hackathon Prototype</SectionLabel>

          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl">
            Bridging Academia and Industry Through Skills
          </h1>

          <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            KaushalVerse connects students, institutions and industry through
            intelligent skill mapping, internships, placement opportunities
            and personalized career pathways.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link to="/register">
                Explore Opportunities
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <Button size="lg" variant="outline" asChild>
              <Link to="/how-it-works">
                <PlayCircle className="h-4 w-4" />
                See How It Works
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Career Snapshot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <Card className="shadow-soft">
            <CardContent className="p-6">
              
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">
                  Your Career Snapshot
                </p>

                <Badge variant="muted">
                  Live Preview
                </Badge>
              </div>

              <div className="mb-4 grid grid-cols-2 gap-4">
                <div className="rounded-lg border border-border p-3">
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                    Skill Score
                  </p>

                  <p className="mt-1 text-2xl font-bold text-foreground">
                    78%
                  </p>
                </div>

                <div className="rounded-lg border border-border p-3">
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Target className="h-3.5 w-3.5 text-accent" />
                    Skill Gap
                  </p>

                  <p className="mt-1 text-2xl font-bold text-foreground">
                    22%
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-muted-foreground">
                    Placement Readiness
                  </span>

                  <span className="font-semibold text-foreground">
                    74%
                  </span>
                </div>

                <Progress value={74} />
              </div>

              <div className="mb-3 rounded-lg bg-roadmap-light/50 p-3">
                <p className="flex items-center gap-1 text-xs font-medium text-roadmap">
                  <TrendingUp className="h-3.5 w-3.5" />
                  Recommended Learning Path
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Docker → Testing → AWS Fundamentals
                </p>
              </div>

              <div className="flex items-center justify-between gap-3 rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    3 New Internship Matches
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Frontend, Backend & Cloud roles
                  </p>
                </div>

                <Badge variant="success" className="shrink-0">
                  92% match
                </Badge>
              </div>

            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}