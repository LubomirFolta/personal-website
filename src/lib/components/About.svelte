<script lang="ts">
	export let title: string;
	export let content: string;
	export let authorName: string;
	export let authorRole: string;

	import { onMount } from 'svelte';

	let visible = false;
	let sectionEl: HTMLElement;

	onMount(() => {
		const obs = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) visible = true;
			},
			{ threshold: 0.15 }
		);
		obs.observe(sectionEl);
		return () => obs.disconnect();
	});
</script>

<section id="about" bind:this={sectionEl} class="relative py-28 px-4 overflow-hidden">
	<!-- Background -->
	<div class="absolute inset-0 bg-void-light"></div>
	<div class="section-divider absolute top-0 left-0 right-0"></div>

	<!-- Ambient glow -->
	<div class="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full opacity-30 pointer-events-none"
		style="background: radial-gradient(circle, rgba(168,85,247,0.08), transparent 70%);"></div>

	<div class="max-w-4xl mx-auto relative z-10">
		<!-- Header -->
		<div class="mb-14 text-center {visible ? 'animate-fade-up' : 'opacity-0'}">
			<h2 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gradient-subtle mb-4">
				{title}
			</h2>
			<div class="flex justify-center">
				<div class="w-16 h-px" style="background: linear-gradient(90deg, transparent, #a855f7, transparent);"></div>
			</div>
		</div>

		<!-- Card -->
		<div class="glass-card glass-card-hover p-8 md:p-12 {visible ? 'animate-fade-up' : 'opacity-0'}" style="animation-delay: 0.15s;">
			<!-- Quote mark -->
			<div class="text-5xl text-neon-purple/15 font-serif leading-none mb-2">"</div>

			<div class="space-y-5 text-base md:text-lg text-muted leading-relaxed">
				{#each content.split('\n').filter((p) => p.trim()) as paragraph, i}
					<p class="{visible ? 'animate-fade-up' : 'opacity-0'}" style="animation-delay: {0.2 + i * 0.08}s;">
						{paragraph}
					</p>
				{/each}
			</div>

			<!-- Author -->
			<div class="mt-10 pt-8 border-t border-white/[0.06] flex items-center gap-4">
				<div class="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white"
					style="background: linear-gradient(135deg, #7c3aed, #a855f7);">
					LF
				</div>
				<div>
					<div class="text-white font-medium text-sm">{authorName}</div>
					<div class="text-muted text-xs">{authorRole}</div>
				</div>
			</div>
		</div>
	</div>
</section>
