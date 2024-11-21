import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { message } from 'sveltekit-superforms';
import { fail, error } from '@sveltejs/kit';
import { productSchema } from '$lib/schemas';
import { env } from '$env/dynamic/private';

export const load = async ({ fetch }) => {
	try {
		const addForm = await superValidate(zod(productSchema), {
			id: 'add321'
		});
		const editForm = await superValidate(zod(productSchema), {
			id: 'edit321'
		});

		const req = await fetch(`${env.API_URL}/api/products`);
		const res = await req.json();

		return {
			addForm,
			editForm,
			products: res
		};
	} catch (err) {
		console.log(err);
		error(400, 'Что-то пошло не так');
	}
};

export const actions = {
	addProduct: async ({ request }) => {
		const form = await superValidate(request, zod(productSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const req = await fetch(`${env.API_URL}/api/products`, {
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
	editProduct: async ({ request }) => {
		const form = await superValidate(request, zod(productSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const req = await fetch(`${env.API_URL}/api/products/${form.data.id}`, {
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
	deleteProduct: async ({ request }) => {
		const formData = await request.formData();

		try {
			const req = await fetch(`${env.API_URL}/api/products/${formData.get('id')}`, {
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
