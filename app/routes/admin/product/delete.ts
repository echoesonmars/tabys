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
	const formData = await c.req.parseBody();

	try {
		const response = await fetch(`${API_BASE}/api/products/delete`, {
			method: 'POST',
			headers: {
				Authorization: 'Basic YWRtaW4xMjM6MTIzYWRtaW4=',
				'Content-Type': 'application/json',
			},
			// Передаем данные как JSON
			body: JSON.stringify({
				id: formData['id'],
				image: formData['image'],
			}),
		});

		if (response.ok) {
			return c.redirect('/admin');
		} else {
			const errorText = await response.text();
			return c.text(`Ошибка Rust при удалении: ${errorText}`, 500);
		}
	} catch (err: any) {
		return c.text(`Ошибка проксирования удаления: ${err.message}`, 500);
	}
});
