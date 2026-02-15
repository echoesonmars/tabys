import { createRoute } from 'honox/factory';
import { basicAuth } from 'hono/basic-auth';

const authMiddleware = basicAuth({
	username: 'admin123',
	password: '123admin',
	realm: 'Admin Area',
});

export const POST = createRoute(authMiddleware, async (c) => {
	const env = c.env as any;

	const API_BASE = env.API_BASE;

	try {
		const formData = await c.req.formData();

		const response = await fetch(`${API_BASE}/api/products`, {
			method: 'POST',
			headers: {
				Authorization: 'Basic YWRtaW4xMjM6MTIzYWRtaW4=',
			},
			body: formData,
		});

		if (response.ok) {
			return c.redirect('/admin');
		} else {
			const errorText = await response.text();
			return c.text(`Ошибка Rust-бэкенда: ${errorText}`, 500);
		}
	} catch (err: any) {
		console.error('Fetch failed to:', `${API_BASE}/api/products`);
		return c.text(`Ошибка проксирования: ${err.message}`, 500);
	}
});
