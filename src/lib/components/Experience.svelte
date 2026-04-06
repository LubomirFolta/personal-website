<script lang="ts">
	interface Experience {
		title: string;
		company: string;
		period: string;
		description: string[];
	}

	export let title: string;
	export let experiences: Experience[];

	import { onMount } from 'svelte';

	let visible = false;
	let sectionEl: HTMLElement;

	onMount(() => {
		const obs = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) visible = true;
			},
			{ threshold: 0.08 }
		);
		obs.observe(sectionEl);
		return () => obs.disconnect();
	});
</script>

<section id="experience" bind:this={sectionEl} class="relative py-28 px-4 overflow-hidden">
	<div class="absolute inset-0 bg-void"></div>
	<div class="section-divider absolute top-0 left-0 right-0"></div>

	<!-- Ambient -->
	<div class="absolute top-1/3 -left-40 w-[400px] h-[400px] rounded-full pointer-events-none"
		style="background: radial-gradient(circle, rgba(59,130,246,0.06), transparent 70%);"></div>

	<div class="max-w-5xl mx-auto relative z-10">
		<!-- Header -->
		<div class="mb-16 text-center {visible ? 'animate-fade-up' : 'opacity-0'}">
			<h2 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gradient-subtle mb-4">
				{title}
			</h2>
			<div class="flex justify-center">
				<div class="w-16 h-px" style="background: linear-gradient(90deg, transparent, #a855f7, transparent);"></div>
			</div>
		</div>

		<div class="space-y-6 relative">
			<!-- Timeline line (desktop) -->
			<div class="absolute left-7 top-0 bottom-0 w-px hidden md:block"
				style="background: linear-gradient(180deg, transparent, rgba(168,85,247,0.25) 10%, rgba(168,85,247,0.25) 90%, transparent);"></div>

			{#each experiences as exp, index}
				<div
					class="relative pl-0 md:pl-20 {visible ? 'animate-fade-up' : 'opacity-0'}"
					style="animation-delay: {0.1 + index * 0.12}s;"
				>
					<!-- Timeline dot -->
					<div class="absolute left-7 top-8 hidden md:flex items-center justify-center -translate-x-1/2">
						<div class="w-3 h-3 rounded-full border-2 border-void z-10"
							style="background: linear-gradient(135deg, #a855f7, #d946ef);
								box-shadow: 0 0 12px rgba(168,85,247,0.4);">
						</div>
					</div>

					<!-- Card -->
					<div class="glass-card glass-card-hover p-6 md:p-8">
						<div class="flex flex-col md:flex-row md:items-start md:justify-between mb-5 gap-3">
							<div>
								<h3 class="text-xl md:text-2xl font-bold text-white mb-1">{exp.title}</h3>
								<p class="text-sm font-semibold text-gradient">{exp.company}</p>
							</div>
							<span class="badge text-xs whitespace-nowrap">
								<svg class="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
								</svg>
								{exp.period}
							</span>
						</div>

						<ul class="space-y-2.5">
							{#each exp.description as desc}
								<li class="flex items-start text-muted text-sm leading-relaxed">
									<span class="w-1 h-1 rounded-full bg-neon-purple/60 mr-3 mt-2 flex-shrink-0"></span>
									<span>{desc}</span>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
