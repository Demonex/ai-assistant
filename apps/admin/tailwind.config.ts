import type { Config } from "tailwindcss";
import {
	isolateInsideOfContainer,
	scopedPreflightStyles,
} from "tailwindcss-scoped-preflight";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
	darkMode: ["class", "selector"],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		// "../web/index.html",
		"../web/src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		screens: {
			tablet: "768px",
			laptop: "1024px",
			desktop: "1280px",
			sm: "640px",
			md: "768px",
			lg: "1024px",
			"2lg": "1100px",
			xl: "1280px",
			"2xl": "1536px",
			"3xl": "1600px",
			"4xl": "1980px",
		},
		extend: {
			gridTemplateColumns: {
				"auto-fit-290": "repeat(auto-fit, minmax(300px, 1fr))",
				"auto-fit-225": "repeat(auto-fit, minmax(224px, 1fr))",
				"auto-fit-172": "repeat(auto-fit, minmax(172px, 1fr))",
				"auto-fit-156": "repeat(auto-fit, minmax(156px, 1fr))",
			},
			fontFamily: {
				sans: ["Lab Grotesque", ...fontFamily.sans],
			},
			fontSize: {
				h1Desctop: [
					"4.68rem",
					{
						lineHeight: "110%",
						fontWeight: "700",
					},
				],
				h1Medium: [
					"3.5rem",
					{
						lineHeight: "110%",
						fontWeight: "700",
					},
				],
				h1Mobile: [
					"2rem",
					{
						lineHeight: "110%",
						fontWeight: "700",
					},
				],
				h2Desctop: [
					"3.5rem",
					{
						lineHeight: "110%",
						fontWeight: "700",
					},
				],
				h2Medium: [
					"2.5rem",
					{
						lineHeight: "110%",
						fontWeight: "700",
					},
				],
				h2Mobile: [
					"1.5rem",
					{
						lineHeight: "110%",
						fontWeight: "700",
					},
				],
				h3Desctop: [
					"2rem",
					{
						lineHeight: "110%",
						fontWeight: "700",
					},
				],
				h4Desctop: [
					"1.5rem",
					{
						lineHeight: "110%",
						fontWeight: "700",
					},
				],
				h3Mobile: [
					"1.25rem",
					{
						lineHeight: "110%",
						fontWeight: "500",
					},
				],
				t1Regular: [
					"1.5rem",
					{
						lineHeight: "150%",
						fontWeight: "400",
					},
				],
				t1Mobile: [
					"1.125rem",
					{
						lineHeight: "150%",
						fontWeight: "400",
					},
				],
				t1Semi_deck: [
					"2rem",
					{
						lineHeight: "38.4px",
						fontWeight: "500",
					},
				],
				t1Semi_ipad: [
					"1.5rem",
					{
						lineHeight: "36px",
						fontWeight: "500",
					},
				],
				t1Semi_mob: [
					"1.5rem",
					{
						lineHeight: "36px",
						fontWeight: "500",
					},
				],
				t2Regular: [
					"1.125rem",
					{
						lineHeight: "150%",
						fontWeight: "400",
					},
				],
				t1Sem2_deck: [
					"1.5rem",
					{
						lineHeight: "28.8px",
						fontWeight: "500",
					},
				],
				t2Semi_ipad: [
					"1.25rem",
					{
						lineHeight: "4px",
						fontWeight: "500",
					},
				],
				btnText: [
					"1.125rem",
					{
						lineHeight: "120%",
						fontWeight: "500",
					},
				],
				captionText: [
					"1rem",
					{
						lineHeight: "150%",
						fontWeight: "300",
					},
				],
				caption_m_desk: [
					"1rem",
					{
						lineHeight: "150%",
						fontWeight: "500",
					},
				],
				caption_r_desk: [
					"1rem",
					{
						lineHeight: "24px",
						fontWeight: "400",
					},
				],
				caption_s_desk: [
					"13px",
					{
						lineHeight: "15.6px",
						fontWeight: "400",
					},
				],
			},
			colors: {
				medium_grey: "#7B7B7B",
				dark_grey: "#333333",
				secondary_dark_gray: "#484848",
				popup_gray: "#272727",
				light_grey: "#CCCCCD",
				primary_blue: "#0A5DFC",
				yellow: "#E4FF29",
				secondary_green: "#B3FF00",
				light_blue: "#2067FF",
				secondary_red: "#FF4633",
				magenta: "#A51BC8",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				chart: {
					"1": "hsl(var(--chart-1))",
					"2": "hsl(var(--chart-2))",
					"3": "hsl(var(--chart-3))",
					"4": "hsl(var(--chart-4))",
					"5": "hsl(var(--chart-5))",
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
					from: {
						height: "0",
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
						height: "0",
					},
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [
		// ...
		require("@tailwindcss/forms"),
		require("tailwindcss-animate"),
		scopedPreflightStyles({
			isolationStrategy: isolateInsideOfContainer(".tailwind-container"),
		}),
	],
} satisfies Config;
