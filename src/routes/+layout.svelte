<script>
	import Header from '$lib/global-components/Header.svelte';
	import '../app.css';
	let { children } = $props();
</script>

	{@render children()}

<Header />
