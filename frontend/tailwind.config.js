/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F766E', // Teal 700
          hover: '#115E59',   // Teal 800
          light: '#CCFBF1',   // Teal 100
          soft: '#F0FDFA',    // Teal 50
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
        },
        secondary: {
          DEFAULT: '#059669', // Emerald 600
          hover: '#047857',
          light: '#D1FAE5',
        },
        accent: {
          DEFAULT: '#F97316', // Orange 500
          hover: '#EA580C',
          light: '#FFEDD5',
        },
        roadmap: {
          DEFAULT: '#7C3AED', // Violet 600
          hover: '#6D28D9',
          light: '#EDE9FE',
          soft: '#F5F3FF',
        },
        background: '#F8FAFC', // Slate 50
        surface: '#FFFFFF',
        border: '#E2E8F0',     // Slate 200
        main: '#0F172A',       // Slate 900
        subtext: '#64748B',    // Slate 500
        muted: '#94A3B8',      // Slate 400
        success: '#16A34A',
        warning: '#D97706',
        error: '#DC2626',
        info: '#0284C7',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)',
        'card': '0 4px 6px -1px rgba(15, 23, 42, 0.05), 0 2px 4px -2px rgba(15, 23, 42, 0.05)',
        'card-hover': '0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04)',
      }
    },
  },
  plugins: [],
};
