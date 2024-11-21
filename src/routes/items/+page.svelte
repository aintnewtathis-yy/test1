<script>
	import { enhance } from '$app/forms';
	import Dialog from '$lib/ui/Dialog.svelte';
	import { superForm } from 'sveltekit-superforms';

	let { data } = $props();

	let items = $derived(data.items ?? null);
	let searchTerm = $state('');

	let filteredItems = $derived.by(() => {
		if (searchTerm.length > 0) {
			return items.filter(
				(item) =>
					item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					item.id.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		return items;
	});

	const addForm = superForm(data.addForm, {
		resetForm: false,
		clearOnSubmit: 'errors-and-message'
	});
	const editForm = superForm(data.editForm, {
		resetForm: false,
		clearOnSubmit: 'errors-and-message'
	});

	let modalState = $state(false);
	let selectedItem = $state();
	let modalTitle = $state('');
	let modalDescription = $state('');
	let modalBtnText = $state('');
	let modalAction = $state('');
	let modalForm = $state(editForm);
	let modalActionType = $state('edit');
</script>

<section class="mb-28">
	<div class="container">
		<div class="mt-12 flex flex-col gap-10">
			<h1 class="text-2xl">Продукты</h1>
			<div class="flex flex-col gap-3">
				<!-- svelte-ignore a11y_consider_explicit_label -->
				<div class="flex items-center gap-3 justify-between max-md:flex-col max-md:items-start">
					<input
						class="max-md:w-full placeholder:zinc-900 rounded border-zinc-500/20 shadow-sm focus:border-zinc-500/20 focus:ring focus:ring-zinc-100 focus:ring-opacity-50"
						placeholder="Поиск"
						type="search"
						bind:value={searchTerm}
					/>
					<button
						class="btn-secondary ml-auto"
						type="button"
						onclick={() => {
							selectedItem = null;
							modalState = true;
							modalTitle = 'Добавить продукт';
							modalDescription = 'Вы можете создать продукт с новыми данными';
							modalBtnText = 'Создать';
							modalAction = '?/addItem';
							modalForm = addForm;
                            modalActionType = 'add';
						}}
					>
						Добавить продукт
					</button>
				</div>
				<div class="max-md:overflow-x-auto">
					<table class="w-full caption-bottom text-sm">
						<caption class="mt-4 text-sm text-zinc-500">
							{#if searchTerm === ''}
								Список всех продуктов
							{:else if searchTerm.length > 0 && filteredItems.length > 0}
								Список отфильтрованных продуктов
							{:else if searchTerm.length > 0 && filteredItems.length == 0}
								продуктов с таким названием или id не найдено
							{/if}
						</caption>
						<thead class="border-b">
							<tr
								class="border-b border-zinc-500/20 transition-colors hover:bg-zinc-100/50 data-[state=selected]:bg-zinc-100"
							>
								<th class="h-12 w-[100px] px-4 text-left align-middle font-medium text-zinc-500">
									Название
								</th>
								<th class="h-12 w-[100px] px-4 text-left align-middle font-medium text-zinc-500">
									ID
								</th>
								<th class="h-12 w-[100px] px-4 text-left align-middle font-medium text-zinc-500">
									Описание
								</th>
								<th class="h-12 w-[100px] px-4 text-right align-middle font-medium text-zinc-500">
									Действия
								</th>
							</tr>
						</thead>
						<tbody class="[&amp;_tr:last-child]:border-0">
							{#each filteredItems as item}
								<tr class=" border-b border-zinc-500/20 transition-colors">
									<td class="whitespace-nowrap p-4 align-middle">{item.name}</td>
									<td class="whitespace-nowrap p-4 align-middle">{item.id}</td>
									<td class="whitespace-nowrap p-4 align-middle">{item.description}</td>
									<td class="whitespace-nowrap p-4 text-right align-middle">
										<!-- svelte-ignore a11y_consider_explicit_label -->
										<div class="flex justify-end gap-2">
											<button
												onclick={() => {
													selectedItem = item;
													modalState = true;
													modalTitle = 'Редактировать продукт';
													modalDescription = 'Вы можете внести новые данные в существующий продукт';
													modalBtnText = 'Сохранить';
													modalAction = '?/editItem';
													modalForm = editForm;
													modalActionType = 'edit';
												}}
												class="btn-secondary aspect-square p-1"
											>
												<svg
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<rect width="24" height="24" />
													<path
														d="M15.6287 5.12132L4.31497 16.435M15.6287 5.12132L19.1642 8.65685M15.6287 5.12132L17.0429 3.70711C17.4334 3.31658 18.0666 3.31658 18.4571 3.70711L20.5784 5.82843C20.969 6.21895 20.969 6.85212 20.5784 7.24264L19.1642 8.65685M7.85051 19.9706L4.31497 16.435M7.85051 19.9706L19.1642 8.65685M7.85051 19.9706L3.25431 21.0312L4.31497 16.435"
														stroke="#020617"
														stroke-linecap="round"
														stroke-linejoin="round"
													/>
												</svg>
											</button>
											<!-- svelte-ignore a11y_consider_explicit_label -->
											<form action="?/deleteItem" method="POST" use:enhance>
												<input type="hidden" name="id" value={item.id} />
												<button class="btn-secondary aspect-square p-1">
													<svg
														width="24"
														height="24"
														viewBox="0 0 24 24"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<rect width="24" height="24" />
														<path
															d="M5 7.5H19L18 21H6L5 7.5Z"
															stroke="#020617"
															stroke-linejoin="round"
														/>
														<path
															d="M15.5 9.5L15 19"
															stroke="#020617"
															stroke-linecap="round"
															stroke-linejoin="round"
														/>
														<path
															d="M12 9.5V19"
															stroke="#020617"
															stroke-linecap="round"
															stroke-linejoin="round"
														/>
														<path
															d="M8.5 9.5L9 19"
															stroke="#020617"
															stroke-linecap="round"
															stroke-linejoin="round"
														/>
														<path
															d="M16 5H19C20.1046 5 21 5.89543 21 7V7.5H3V7C3 5.89543 3.89543 5 5 5H8M16 5L15 3H9L8 5M16 5H8"
															stroke="#020617"
															stroke-linejoin="round"
														/>
													</svg>
												</button>
											</form>
										</div>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</section>

{#if modalState}
	<Dialog
		bind:open={modalState}
		name={selectedItem?.name}
		id={selectedItem?.id}
		price={selectedItem?.price}
		description={selectedItem?.description}
		title={modalTitle}
		text={modalDescription}
		btnText={modalBtnText}
		action={modalAction}
		passedForm={modalForm}
		type="item"
		{modalActionType}
	/>
{/if}

<style>
	input[type='search']::-webkit-search-cancel-button {
		display: none !important;
	}
</style>
