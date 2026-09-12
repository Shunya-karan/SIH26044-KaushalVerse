/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],

  content: ["./index.html", "./src/**/*.{js,jsx}"],

  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1320px",
      },
    },

    extend: {
      colors: {
        /*
         * ==========================================
         * GOVERNMENT / SIH COLOR SYSTEM
         * ==========================================
         */

        // Primary: Deep Government Navy / Indigo
        primary: {
          DEFAULT: "#1E1B4B",
          hover: "#312E81",
          light: "#E0E7FF",
          soft: "#EEF2FF",
          foreground: "#FFFFFF",
        },

        // Secondary: Saffron / Indian Orange
        secondary: {
          DEFAULT: "#F97316",
          hover: "#EA580C",
          light: "#FFEDD5",
          soft: "#FFF7ED",
          foreground: "#FFFFFF",
        },

        // Accent: Deeper Saffron
        accent: {
          DEFAULT: "#EA580C",
          hover: "#C2410C",
          light: "#FFEDD5",
          soft: "#FFF7ED",
          foreground: "#FFFFFF",
        },

        // Purple: Used sparingly for intelligence / technology
        roadmap: {
          DEFAULT: "#6D28D9",
          hover: "#5B21B6",
          light: "#EDE9FE",
          soft: "#F5F3FF",
        },

        /*
         * ==========================================
         * PAGE COLORS
         * ==========================================
         */

        background: "#F8FAFC",

        surface: "#FFFFFF",

        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#111827",
        },

        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#111827",
        },

        /*
         * ==========================================
         * TEXT
         * ==========================================
         */

        foreground: "#111827",

        heading: "#111827",

        body: "#374151",

        muted: {
          DEFAULT: "#F1F5F9",
          foreground: "#64748B",
        },

        subtle: "#94A3B8",

        /*
         * ==========================================
         * BORDERS / INPUTS
         * ==========================================
         */

        border: "#E2E8F0",

        input: "#CBD5E1",

        ring: "#F97316",

        /*
         * ==========================================
         * STATUS COLORS
         * ==========================================
         */

        success: "#15803D",

        warning: "#D97706",

        error: "#B91C1C",

        destructive: {
          DEFAULT: "#B91C1C",
          foreground: "#FFFFFF",
        },

        info: "#0369A1",

        /*
         * ==========================================
         * GOVERNMENT / INDIAN FLAG INSPIRED COLORS
         * ==========================================
         */

        saffron: {
          DEFAULT: "#FF9933",
          light: "#FFF4E6",
          soft: "#FFF8F0",
        },

        indiaGreen: {
          DEFAULT: "#138808",
          light: "#DCFCE7",
          soft: "#F0FDF4",
        },

        navy: {
          DEFAULT: "#000080",
          light: "#E0E7FF",
          soft: "#EEF2FF",
        },

        /*
         * ==========================================
         * GRADIENT SUPPORT COLORS
         * ==========================================
         */

        orange: {
          50: "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          300: "#FDBA74",
          400: "#FB923C",
          500: "#F97316",
          600: "#EA580C",
          700: "#C2410C",
          800: "#9A3412",
          900: "#7C2D12",
        },

        purple: {
          50: "#FAF5FF",
          100: "#F3E8FF",
          200: "#E9D5FF",
          300: "#D8B4FE",
          400: "#C084FC",
          500: "#A855F7",
          600: "#9333EA",
          700: "#7E22CE",
          800: "#6B21A8",
          900: "#581C87",
        },
      },

      /*
       * ==========================================
       * BORDER RADIUS
       * ==========================================
       */

      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.375rem",
        xl: "1rem",
        "2xl": "1.25rem",
      },

      /*
       * ==========================================
       * TYPOGRAPHY
       * ==========================================
       */

      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },

      /*
       * ==========================================
       * SHADOWS
       * ==========================================
       */

      boxShadow: {
        card:
          "0 1px 2px 0 rgba(15, 23, 42, 0.04), 0 1px 3px 0 rgba(15, 23, 42, 0.06)",

        soft:
          "0 4px 16px -4px rgba(15, 23, 42, 0.08)",

        government:
          "0 8px 24px -8px rgba(15, 23, 42, 0.12)",
      },

      /*
       * ==========================================
       * ANIMATIONS
       * ==========================================
       */

      keyframes: {
        "accordion-down": {
          from: {
            height: 0,
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },

        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: 0,
          },
        },
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },

  plugins: [],
};