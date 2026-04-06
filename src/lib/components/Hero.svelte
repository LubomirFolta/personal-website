<script lang="ts">
	export let name: string;
	export let title: string;
	export let subtitle: string;
	export let badge: string;
	export let cta: string;
	export let learnMore: string;
	export let scrollLabel: string;

	import { onMount } from 'svelte';

	let mounted = false;
	let canvas: HTMLCanvasElement;

	onMount(() => {
		mounted = true;
		initStars();
	});

	function initStars() {
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const dpr = window.devicePixelRatio || 1;
		let w: number, h: number;
		const stars: { x: number; y: number; r: number; a: number; speed: number }[] = [];

		function resize() {
			w = canvas.clientWidth;
			h = canvas.clientHeight;
			canvas.width = w * dpr;
			canvas.height = h * dpr;
			ctx!.scale(dpr, dpr);
		}

		function createStars() {
			stars.length = 0;
			const count = Math.floor((w * h) / 8000);
			for (let i = 0; i < count; i++) {
				stars.push({
					x: Math.random() * w,
					y: Math.random() * h,
					r: Math.random() * 1.2 + 0.3,
					a: Math.random(),
					speed: Math.random() * 0.003 + 0.001,
				});
			}
		}

		let frame: number = 0;
		function draw() {
			ctx!.clearRect(0, 0, w, h);
			for (const s of stars) {
				s.a += s.speed;
				const alpha = 0.15 + Math.sin(s.a) * 0.15;
				ctx!.beginPath();
				ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
				ctx!.fillStyle = `rgba(255,255,255,${alpha})`;
				ctx!.fill();
			}
			frame = requestAnimationFrame(draw);
		}

		resize();
		createStars();
		draw();

		const onResize = () => {
			resize();
			createStars();
		};
		window.addEventListener('resize', onResize);

		const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
		if (mql.matches) {
			cancelAnimationFrame(frame);
		}

		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener('resize', onResize);
		};
	}
</script>

<section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-void">
	<!-- Star field canvas -->
	<canvas bind:this={canvas} class="absolute inset-0 w-full h-full" style="z-index:0"></canvas>

	<!-- Cosmic aura / event horizon -->
	<div class="absolute inset-0 flex items-center justify-center pointer-events-none" style="z-index:1">
		<!-- Main purple radial glow -->
		<div class="absolute w-[700px] h-[700px] md:w-[900px] md:h-[900px] rounded-full animate-pulse-glow"
			style="background: radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(109,40,217,0.08) 35%, transparent 70%);">
		</div>
		<!-- Magenta inner ring -->
		<div class="absolute w-[400px] h-[400px] md:w-[550px] md:h-[550px] rounded-full animate-pulse-glow"
			style="background: radial-gradient(circle, rgba(217,70,239,0.12) 0%, transparent 60%); animation-delay: 1s;">
		</div>
		<!-- Vertical beam -->
		<div class="absolute w-px h-[60vh] animate-beam"
			style="background: linear-gradient(180deg, transparent, rgba(168,85,247,0.3) 30%, rgba(168,85,247,0.5) 50%, rgba(168,85,247,0.3) 70%, transparent);">
		</div>
	</div>

	<!-- Perspective grid floor -->
	<div class="absolute bottom-0 left-0 right-0 h-[40vh] overflow-hidden pointer-events-none" style="z-index:1;">
		<div class="absolute inset-0" style="
			background:
				linear-gradient(rgba(168,85,247,0.06) 1px, transparent 1px),
				linear-gradient(90deg, rgba(168,85,247,0.06) 1px, transparent 1px);
			background-size: 60px 60px;
			transform: perspective(500px) rotateX(60deg);
			transform-origin: center top;
			mask-image: linear-gradient(to top, rgba(0,0,0,0.4), transparent 80%);
			-webkit-mask-image: linear-gradient(to top, rgba(0,0,0,0.4), transparent 80%);
		"></div>
		<!-- Floor glow -->
		<div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px]"
			style="background: radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, transparent 70%);"></div>
	</div>

	<!-- Content -->
	<div class="relative z-10 text-center px-4 max-w-4xl mx-auto">
		<!-- Badge -->
		<div class="mb-8 {mounted ? 'animate-fade-in' : 'opacity-0'}">
			<span class="badge">
				<span class="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
				{badge}
			</span>
		</div>

		<!-- Name -->
		<h1
			class="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight leading-none mb-6 text-gradient-subtle {mounted ? 'animate-fade-up' : 'opacity-0'}"
			style="animation-delay: 0.15s;"
		>
			{name}
		</h1>

		<!-- Title -->
		<h2
			class="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 text-gradient {mounted ? 'animate-fade-up' : 'opacity-0'}"
			style="animation-delay: 0.3s;"
		>
			{title}
		</h2>

		<!-- Divider -->
		<div class="flex justify-center mb-6 {mounted ? 'animate-scale-in' : 'opacity-0'}" style="animation-delay: 0.4s;">
			<div class="w-24 h-px" style="background: linear-gradient(90deg, transparent, #a855f7, transparent);"></div>
		</div>

		<!-- Subtitle -->
		<p
			class="text-base md:text-lg text-muted max-w-2xl mx-auto leading-relaxed mb-12 {mounted ? 'animate-fade-up' : 'opacity-0'}"
			style="animation-delay: 0.5s;"
		>
			{subtitle}
		</p>

		<!-- CTAs -->
		<div class="flex flex-wrap justify-center gap-4 {mounted ? 'animate-fade-up' : 'opacity-0'}" style="animation-delay: 0.65s;">
			<button
				on:click={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
				class="btn-primary flex items-center gap-2"
			>
				{cta}
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
				</svg>
			</button>

			<button
				on:click={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
				class="btn-ghost"
			>
				{learnMore}
			</button>
		</div>
	</div>

	<!-- Scroll indicator -->
	<div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 {mounted ? 'animate-fade-in' : 'opacity-0'}" style="animation-delay: 1.2s;">
		<div class="flex flex-col items-center gap-2 text-muted/50">
			<span class="text-[10px] uppercase tracking-[0.2em]">{scrollLabel}</span>
			<div class="w-5 h-8 border border-white/10 rounded-full flex justify-center pt-1.5">
				<div class="w-0.5 h-1.5 bg-neon-purple/60 rounded-full animate-bounce"></div>
			</div>
		</div>
	</div>

	<!-- Bottom fade -->
	<div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-void to-transparent z-[2]"></div>
</section>
