<script>
	import SuperDebug, { superForm } from 'sveltekit-superforms';

	let {
		open = $bindable(),
		name,
		id,
		price,
		description,
		title,
		text,
		btnText,
		action,
		passedForm = $bindable(),
		type,
		modalActionType
	} = $props();

	const { form, errors, enhance, message } = passedForm;

	$inspect(modalActionType);

	$effect(() => {
		$form.name = name;
		$form.id = id;
		$form.price = price;
		$form.description = description;
	});
</script>

<div
	tabindex="-1"
	aria-hidden="true"
	class="fixed inset-0 z-50 bg-[#fff]/40 backdrop-blur-sm"
	onclick={() => {
		open = false;
		$errors = {};
		$message = null;
	}}
></div>
<div
	id="CowvYVGCgv"
	role="dialog"
	aria-modal="true"
	tabindex="-1"
	class="fixed left-[50%] top-[50%] z-50 grid w-[calc(100%-20px)] max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg sm:max-w-[425px] sm:rounded-lg md:w-full"
>
	<div class="flex flex-col space-y-1.5 text-center sm:text-left">
		<h2 class="text-lg font-semibold leading-none tracking-tight">
			{title}
		</h2>
		<div class="text-muted-foreground text-sm">
			{text}
		</div>
	</div>
	<form {action} method="POST" use:enhance>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-[1fr_4fr] items-center gap-4 gap-y-1">
				<label
					class="text-right text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					for="name">Название</label
				>
				<input
					bind:value={$form.name}
					class=" placeholder:zinc-900 w-full rounded border-zinc-500/20 shadow-sm focus:border-zinc-500/20 focus:ring focus:ring-zinc-100 focus:ring-opacity-50"
					id="name"
					name="name"
				/>
				{#if $errors.name}
					<div></div>
					<small class="">{$errors.name[0]}</small>
				{/if}
			</div>
			<div class="grid grid-cols-[1fr_4fr] items-center gap-4 gap-y-1">
				<label
					class="text-right text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					for="id">ID</label
				>
				{#if modalActionType === 'edit'}
					<input
						bind:value={$form.id}
                        type="hidden"
						name="id"
						class="placeholder:zinc-900 w-full rounded border-zinc-500/20 shadow-sm focus:border-zinc-500/20 focus:ring focus:ring-zinc-100 focus:ring-opacity-50 disabled:bg-zinc-100"
						id="id"
					/>
                    <input
						bind:value={$form.id}
						name="id1"
						class="placeholder:zinc-900 w-full rounded border-zinc-500/20 shadow-sm focus:border-zinc-500/20 focus:ring focus:ring-zinc-100 focus:ring-opacity-50 disabled:bg-zinc-100"
						id="id1"
						disabled={modalActionType === 'edit'}
					/>
                {:else}
					<input
						bind:value={$form.id}
						name="id"
						class="placeholder:zinc-900 w-full rounded border-zinc-500/20 shadow-sm focus:border-zinc-500/20 focus:ring focus:ring-zinc-100 focus:ring-opacity-50 disabled:bg-zinc-100"
						id="id"
					/>
				{/if}

				{#if $errors.id}
					<div></div>
					<small>{$errors.id[0]}</small>
				{/if}
			</div>
			{#if type === 'product'}
				<div class="grid grid-cols-[1fr_4fr] items-center gap-4 gap-y-1">
					<label
						class="text-right text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						for="price">Цена</label
					>
					<input
						bind:value={$form.price}
						name="price"
						class=" placeholder:zinc-900 w-full rounded border-zinc-500/20 shadow-sm focus:border-zinc-500/20 focus:ring focus:ring-zinc-100 focus:ring-opacity-50"
						id="price"
					/>
					{#if $errors.price}
						<div></div>
						<small>{$errors.price[0]}</small>
					{/if}
				</div>
			{:else}
				<div class="grid grid-cols-[1fr_4fr] items-center gap-4 gap-y-1">
					<label
						class="text-right text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						for="description">Описание</label
					>
					<input
						bind:value={$form.description}
						name="description"
						class=" placeholder:zinc-900 w-full rounded border-zinc-500/20 shadow-sm focus:border-zinc-500/20 focus:ring focus:ring-zinc-100 focus:ring-opacity-50"
						id="description"
					/>
					{#if $errors.description}
						<div></div>
						<small>{$errors.description[0]}</small>
					{/if}
				</div>
			{/if}
		</div>
		<div class="flex items-center justify-between gap-2">
			{#if $message}
				<p class="text-green-500">{$message}</p>
			{/if}
			<button type="submit" tabindex="0" class="btn ml-auto" data-button-root="">{btnText}</button>
		</div>
	</form>

	<button
		onclick={() => {
			open = false;
			$errors = {};
			$message = null;
		}}
		type="button"
		class="ring-offset-background focus:ring-ring absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none"
	>
		<svg
			width="24"
			height="24"
			class="h-4 w-4"
			role="img"
			aria-label="cross 2,"
			viewBox="0 0 15 15"
			fill="#18181b"
			xmlns="http://www.w3.org/2000/svg"
			><path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
				fill="#18181b"
			></path></svg
		>
		<span class="sr-only">Закрыть</span></button
	>
</div>

<style>
	small {
		color: #ef4444;
	}
</style>
