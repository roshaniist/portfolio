import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        brand: {
          DEFAULT: "hsl(var(--brand))",
          foreground: "hsl(var(--brand-foreground))",
        },
        "brand-alt": {
          DEFAULT: "hsl(var(--brand-alt))",
          foreground: "hsl(var(--brand-alt-foreground))",
        },
        "neon-cyan": "hsl(var(--neon-cyan))",
        "neon-violet": "hsl(var(--neon-violet))",
        "neon-blue": "hsl(var(--neon-blue))",
        surface: {
          DEFAULT: "hsl(var(--surface))",
          foreground: "hsl(var(--surface-foreground))",
        },
        "surface-alt": {
          DEFAULT: "hsl(var(--surface-alt))",
          foreground: "hsl(var(--surface-alt-foreground))",
        },
        glass: {
          DEFAULT: "hsl(var(--glass))",
          border: "hsl(var(--glass-border))",
        },
        glow: "hsl(var(--glow))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        drift: {
          "0%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(18px,-14px,0) scale(1.04)" },
          "100%": { transform: "translate3d(0,0,0) scale(1)" },
        },
        "grid-pan": {
          "0%": { transform: "translateY(0px)" },
          "100%": { transform: "translateY(48px)" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        "pulse-neon": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        drift: "drift 9s ease-in-out infinite",
        "grid-pan": "grid-pan 12s linear infinite",
        blink: "blink 1s step-end infinite",
        "pulse-neon": "pulse-neon 2s ease-in-out infinite",
        shimmer: "shimmer 4s linear infinite",
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(circle at 20% 20%, hsl(var(--neon-cyan) / 0.12), transparent 35%), radial-gradient(circle at 80% 0%, hsl(var(--neon-violet) / 0.15), transparent 45%)",
        "cosmic-mesh":
          "radial-gradient(circle at 30% 70%, hsl(var(--neon-violet) / 0.08), transparent 50%), radial-gradient(circle at 70% 30%, hsl(var(--neon-cyan) / 0.08), transparent 50%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
