import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, "Пожалуйста, введите название"),
  id: z.string().min(1, "Пожалуйста, введите ID"),
  price: z.number({message: 'Введите число'}).min(1, "Пожалуйста, введите стоимость")
});

export const itemSchema = z.object({
  name: z.string().min(1, "Пожалуйста, введите название"),
  id: z.string().min(1, "Пожалуйста, введите ID"),
  description: z.string().min(1, "Пожалуйста, введите описание")
});