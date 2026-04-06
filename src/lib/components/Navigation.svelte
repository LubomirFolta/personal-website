<script lang="ts">
	import { language } from '$lib/stores/language';
	import { translations } from '$lib/data/translations';

	type NavKey = 'about' | 'experience' | 'skills' | 'contact';
	const navSections: NavKey[] = ['about', 'experience', 'skills', 'contact'];

	let scrolled = false;
	let mobileMenuOpen = false;

	$: currentLang = $language;
	$: t = translations[currentLang];
	$: name = t.hero.name;

	function handleScroll() {
		scrolled = window.scrollY > 50;
	}

	function scrollToSection(id: string) {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
			mobileMenuOpen = false;
		}
	}

	function toggleLanguage() {
		language.toggle();
	}

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}
</script>

<svelte:window on:scroll={handleScroll} />

<nav
	class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
	class:py-3={scrolled}
	class:py-5={!scrolled}
>
	<div class="max-w-6xl mx-auto px-4 sm:px-6">
		<div
			class="flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500"
			class:glass-card={scrolled}
		>
			<!-- Logo -->
			<button
				on:click={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
				class="group relative text-xl font-bold tracking-tight text-white"
			>
				{name.split(' ').map((n) => n[0]).join('')}
				<span class="absolute -bottom-0.5 left-0 h-px w-0 bg-neon-purple group-hover:w-full transition-all duration-300"></span>
			</button>

			<div class="flex items-center gap-2">
				<!-- Desktop nav -->
				<div class="hidden md:flex items-center rounded-full border border-white/[0.06] bg-white/[0.03] px-1 py-1">
					{#each navSections as section}
						<button
							on:click={() => scrollToSection(section)}
							class="px-4 py-1.5 text-sm text-muted hover:text-white transition-colors duration-200 rounded-full hover:bg-white/[0.06]"
						>
							{t.nav[section]}
						</button>
					{/each}
				</div>

				<!-- Language toggle -->
				<button
					on:click={toggleLanguage}
					class="ml-2 px-3 py-1.5 text-sm text-muted hover:text-white rounded-full border border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-200"
					aria-label="Toggle language"
				>
					{$language === 'sk' ? 'EN' : 'SK'}
				</button>

				<!-- CTA -->
				<button
					on:click={() => scrollToSection('contact')}
					class="hidden md:block ml-1 btn-primary text-sm !px-5 !py-2"
				>
					{t.nav.contact}
				</button>

				<!-- Mobile hamburger -->
				<button
					on:click={toggleMobileMenu}
					class="md:hidden ml-1 p-2.5 rounded-xl text-muted hover:text-white transition-colors"
					aria-label="Toggle mobile menu"
				>
					<div class="w-5 h-4 relative flex flex-col justify-between">
						<span class="block w-5 h-0.5 bg-current rounded transition-all duration-300 origin-center {mobileMenuOpen ? 'translate-y-[7px] rotate-45' : ''}"></span>
						<span class="block w-5 h-0.5 bg-current rounded transition-all duration-300 {mobileMenuOpen ? 'opacity-0' : ''}"></span>
						<span class="block w-5 h-0.5 bg-current rounded transition-all duration-300 origin-center {mobileMenuOpen ? '-translate-y-[7px] -rotate-45' : ''}"></span>
					</div>
				</button>
			</div>
		</div>

		<!-- Mobile menu -->
		{#if mobileMenuOpen}
			<div class="md:hidden mt-2 glass-card p-3 animate-fade-in">
				{#each navSections as section}
					<button
						on:click={() => scrollToSection(section)}
						class="block w-full text-left px-4 py-3 text-sm text-muted hover:text-white hover:bg-white/[0.04] rounded-xl transition-colors"
					>
						{t.nav[section]}
					</button>
				{/each}
			</div>
		{/if}
	</div>
</nav>
