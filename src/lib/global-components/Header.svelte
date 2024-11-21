<script>
	const navigation = [
		{
			label: 'Главная',
			href: '/'
		},
		{
			label: 'Продукты',
			href: '/items'
		},
		{
			label: 'Товары',
			href: '/products'
		}
	];
</script>

<header
	class="bg-white/60 border-zinc-500/20 fixed bottom-8 left-1/2 z-10 max-w-xl -translate-x-1/2 rounded-lg border px-4 py-2 shadow backdrop-blur"
>
	<nav>
		<ul class="flex gap-6">
			{#each navigation as link}
				<li>
					<a class="transition duration-300 hover:opacity-70" href={link.href}>{link.label}</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>
