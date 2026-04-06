<script lang="ts">
	interface ContactInfo {
		email: string;
		location: string;
		linkedin: string;
		website: string;
	}

	interface ContactTranslations {
		email: string;
		location: string;
		linkedin: string;
		linkedinValue: string;
		subtitle: string;
		cta: string;
	}

	export let title: string;
	export let contact: ContactInfo;
	export let t: ContactTranslations;

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

<section id="contact" bind:this={sectionEl} class="relative py-28 px-4 overflow-hidden">
	<div class="absolute inset-0 bg-void"></div>
	<div class="section-divider absolute top-0 left-0 right-0"></div>

	<!-- Ambient -->
	<div class="absolute bottom-0 left-1/4 w-[500px] h-[400px] pointer-events-none"
		style="background: radial-gradient(ellipse, rgba(168,85,247,0.06), transparent 70%);"></div>

	<div class="max-w-4xl mx-auto relative z-10">
		<!-- Header -->
		<div class="mb-14 text-center {visible ? 'animate-fade-up' : 'opacity-0'}">
			<h2 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gradient-subtle mb-4">
				{title}
			</h2>
			<div class="flex justify-center mb-6">
				<div class="w-16 h-px" style="background: linear-gradient(90deg, transparent, #a855f7, transparent);"></div>
			</div>
			<p class="text-muted text-sm">{t.subtitle}</p>
		</div>

		<!-- Contact cards -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-5 {visible ? 'animate-fade-up' : 'opacity-0'}" style="animation-delay: 0.15s;">
			<!-- Email -->
			<a href="mailto:{contact.email}" class="glass-card glass-card-hover p-6 text-center group block">
				<div class="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center"
					style="background: rgba(168,85,247,0.1); border: 1px solid rgba(168,85,247,0.15);">
					<svg class="w-5 h-5 text-neon-purple group-hover:text-neon-magenta transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
					</svg>
				</div>
				<div class="text-xs text-muted mb-1">{t.email}</div>
				<div class="text-white text-sm font-medium group-hover:text-neon-purple transition-colors truncate">{contact.email}</div>
			</a>

			<!-- Location -->
			<div class="glass-card p-6 text-center">
				<div class="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center"
					style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06);">
					<svg class="w-5 h-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
					</svg>
				</div>
				<div class="text-xs text-muted mb-1">{t.location}</div>
				<div class="text-white text-sm font-medium">{contact.location}</div>
			</div>

			<!-- LinkedIn -->
			<a
				href="https://{contact.linkedin}"
				target="_blank"
				rel="noopener noreferrer"
				class="glass-card glass-card-hover p-6 text-center group block"
			>
				<div class="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center"
					style="background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.15);">
					<svg class="w-5 h-5 text-neon-blue group-hover:text-neon-purple transition-colors" fill="currentColor" viewBox="0 0 24 24">
						<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
					</svg>
				</div>
				<div class="text-xs text-muted mb-1">{t.linkedin}</div>
				<div class="text-white text-sm font-medium group-hover:text-neon-blue transition-colors">{t.linkedinValue}</div>
			</a>
		</div>

		<!-- CTA -->
		<div class="mt-14 text-center {visible ? 'animate-fade-up' : 'opacity-0'}" style="animation-delay: 0.3s;">
			<a
				href="mailto:{contact.email}"
				class="btn-primary inline-flex items-center gap-2"
			>
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
				</svg>
				{t.cta}
			</a>
		</div>
	</div>

	<!-- Footer -->
	<div class="mt-24 pt-8 relative z-10" style="border-top: 1px solid rgba(255,255,255,0.04);">
		<div class="max-w-4xl mx-auto text-center">
			<p class="text-muted/30 text-xs">
				&copy; 2024 Lubomir Folta &middot; Built with SvelteKit
			</p>
		</div>
	</div>
</section>
