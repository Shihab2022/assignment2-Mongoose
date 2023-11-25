import { z } from 'zod';

const addressSchema = z.object({
    street: z.string().min(1, { message: 'Street address is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    country: z.string().min(1, { message: 'Country is required' }),
});

const fullNameSchema = z.object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
});
const orderSchema = z.object({
    productName: z.string().min(1, { message: 'Product name is required' }),
    price: z.number().min(1, { message: 'Price is required' }),
    quantity: z.number().min(1, { message: 'Quantity is required' }),
});
z.array(z.string());
export const validationSchema = z.object({
    userId: z.number(),
    username: z.string().min(1, { message: 'Username is required' }),
    password: z.string().min(1, { message: 'Password is required' }),
    fullName: fullNameSchema,
    age: z.number().min(1, { message: 'Age is required' }),
    email: z.string().email({ message: 'Invalid email format' }),
    isActive: z.boolean(),
    hobbies: z.array(z.string().min(1, { message: 'Hobby is required' })),
    address: addressSchema,
    orders: z.array(orderSchema).optional(),
});

