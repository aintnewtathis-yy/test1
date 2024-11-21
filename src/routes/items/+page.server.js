import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { message } from 'sveltekit-superforms';
import { fail, error } from '@sveltejs/kit';
import { itemSchema } from '$lib/schemas';
import { env } from '$env/dynamic/private';

export const load = async ({ fetch }) => {
	try {
		const addForm = await superValidate(zod(itemSchema), {
			id: 'add321321'
		});
		const editForm = await superValidate(zod(itemSchema), {
			id: 'edit321321'
		});

		const req = await fetch(`${env.API_URL}/api/items`);
		const res = await req.json();

		return {
			addForm,
			editForm,
			items: res
		};
	} catch (err) {
		console.log(err);
		error(400, 'Что-то пошло не так');
	}
};

export const actions = {
	addItem: async ({ request }) => {
		const form = await superValidate(request, zod(itemSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const req = await fetch(`${env.API_URL}/api/items`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(form.data)
			});

			if (req.status != 200) {
				return fail(400, 'Что-то пошло не так');
			}
		} catch (err) {
			console.log(err);
			return fail(400, 'Что-то пошло не так');
		}

		return message(form, 'Успешно!');
	},
	editItem: async ({ request }) => {
		const form = await superValidate(request, zod(itemSchema));


		console.log(form)
		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const req = await fetch(`${env.API_URL}/api/items/${form.data.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(form.data)
			});

			if (req.status != 200) {
				return fail(400, 'Что-то пошло не так');
			}
		} catch (err) {
			console.log(err);
			return fail(400, 'Что-то пошло не так');
		}

		return message(form, 'Успешно!');
	},
	deleteItem: async ({ request }) => {
		const formData = await request.formData();

		try {
			const req = await fetch(`${env.API_URL}/api/items/${formData.get('id')}`, {
				method: 'DELETE'
			});

			if (req.status != 200) {
				return fail(400, 'Что-то пошло не так');
			}
		} catch (err) {
			console.log(err);
			return fail(400, 'Что-то пошло не так');
		}
	}
};
