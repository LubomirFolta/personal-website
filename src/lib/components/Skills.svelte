<script lang="ts">
	interface Skill {
		name: string;
		category: string;
	}

	export let title: string;
	export let skills: Skill[];
	export let footer: string;

	import { onMount } from 'svelte';

	let visible = false;
	let sectionEl: HTMLElement;

	onMount(() => {
		const obs = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) visible = true;
			},
			{ threshold: 0.1 }
		);
		obs.observe(sectionEl);
		return () => obs.disconnect();
	});

	$: groupedSkills = skills.reduce(
		(acc, skill) => {
			if (!acc[skill.category]) acc[skill.category] = [];
			acc[skill.category].push(skill);
			return acc;
		},
		{} as Record<string, Skill[]>
	);

	$: categories = Object.keys(groupedSkills);

	const categoryIcons: Record<string, string> = {
		'Programovanie': '{ }',
		'AI & Modely': 'AI',
		'Systémy & Cloud': '~$',
		'Servis & Hardvér': '//',
		'Osobné zručnosti': '>>',
		'Programming': '{ }',
		'AI & Models': 'AI',
		'Systems & Cloud': '~$',
		'Service & Hardware': '//',
		'Personal Skills': '>>',
	};

	function getIcon(cat: string): string {
		return categoryIcons[cat] || '##';
	}
</script>

<section id="skills" bind:this={sectionEl} class="relative py-28 px-4 overflow-hidden">
	<div class="absolute inset-0 bg-void-light"></div>
	<div class="section-divider absolute top-0 left-0 right-0"></div>

	<!-- Ambient glow -->
	<div class="absolute top-20 left-10 w-72 h-72 rounded-full pointer-events-none"
		style="background: radial-gradient(circle, rgba(168,85,247,0.06), transparent 70%);"></div>
	<div class="absolute bottom-20 right-10 w-72 h-72 rounded-full pointer-events-none"
		style="background: radial-gradient(circle, rgba(59,130,246,0.06), transparent 70%);"></div>

	<div class="max-w-6xl mx-auto relative z-10">
		<!-- Header -->
		<div class="mb-16 text-center {visible ? 'animate-fade-up' : 'opacity-0'}">
			<h2 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gradient-subtle mb-4">
				{title}
			</h2>
			<div class="flex justify-center">
				<div class="w-16 h-px" style="background: linear-gradient(90deg, transparent, #a855f7, transparent);"></div>
			</div>
		</div>

		<!-- Grid -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
			{#each categories as category, catIndex}
				<div
					class="glass-card glass-card-hover p-6 {visible ? 'animate-fade-up' : 'opacity-0'}"
					style="animation-delay: {0.1 + catIndex * 0.08}s;"
				>
					<!-- Category header -->
					<div class="flex items-center gap-3 mb-5 pb-4 border-b border-white/[0.06]">
						<span class="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-mono font-bold text-neon-purple"
							style="background: rgba(168,85,247,0.1); border: 1px solid rgba(168,85,247,0.15);">
							{getIcon(category)}
						</span>
						<h3 class="text-base font-bold text-white">{category}</h3>
					</div>

					<!-- Skill tags -->
					<div class="flex flex-wrap gap-2">
						{#each groupedSkills[category] as skill}
							<span class="skill-tag">{skill.name}</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<!-- Footer note -->
		<div class="mt-10 text-center">
			<p class="text-muted/40 text-xs tracking-wide">
				{footer}
			</p>
		</div>
	</div>
</section>
