/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'void': '#050510',
				'void-light': '#0A0A1F',
				'void-card': '#0D0D24',
				'surface': {
					DEFAULT: '#111128',
					light: '#16163A',
				},
				'neon': {
					purple: '#A855F7',
					magenta: '#D946EF',
					indigo: '#6D28D9',
					blue: '#3B82F6',
				},
				'muted': '#94A3B8',
			},
			fontFamily: {
				'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
			},
			animation: {
				'fade-up': 'fadeUp 0.7s ease-out both',
				'fade-in': 'fadeIn 0.8s ease-out both',
				'scale-in': 'scaleIn 0.5s ease-out both',
				'float': 'float 6s ease-in-out infinite',
				'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
				'gradient-shift': 'gradientShift 8s ease infinite',
				'spin-slow': 'spin 30s linear infinite',
				'drift': 'drift 20s ease-in-out infinite',
				'beam': 'beam 3s ease-in-out infinite',
			},
			keyframes: {
				fadeUp: {
					'0%': { transform: 'translateY(24px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				scaleIn: {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' },
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-16px)' },
				},
				pulseGlow: {
					'0%, 100%': { opacity: '0.4' },
					'50%': { opacity: '0.8' },
				},
				gradientShift: {
					'0%, 100%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
				},
				drift: {
					'0%, 100%': { transform: 'translate(0, 0)' },
					'25%': { transform: 'translate(10px, -10px)' },
					'50%': { transform: 'translate(-5px, 5px)' },
					'75%': { transform: 'translate(5px, 10px)' },
				},
				beam: {
					'0%, 100%': { opacity: '0.3', transform: 'scaleY(1)' },
					'50%': { opacity: '0.7', transform: 'scaleY(1.05)' },
				},
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
			},
			boxShadow: {
				'glow-sm': '0 0 20px -5px rgba(168, 85, 247, 0.3)',
				'glow': '0 0 30px -5px rgba(168, 85, 247, 0.4)',
				'glow-lg': '0 0 50px -10px rgba(168, 85, 247, 0.5)',
				'glow-magenta': '0 0 40px -10px rgba(217, 70, 239, 0.4)',
				'glow-blue': '0 0 40px -10px rgba(59, 130, 246, 0.3)',
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
};
