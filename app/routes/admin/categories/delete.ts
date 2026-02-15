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
	const { id, image } = await c.req.parseBody();

	try {
		const response = await fetch(`${API_BASE}/api/categories/delete`, {
			method: 'POST',
			headers: {
				Authorization: 'Basic YWRtaW4xMjM6MTIzYWRtaW4=',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id, image }),
		});

		if (response.ok) {
			return c.redirect('/admin/categories');
		} else {
			const err = await response.text();
			return c.text(`Ошибка Rust при удалении категории: ${err}`, 500);
		}
	} catch (err: any) {
		return c.text(`Ошибка проксирования: ${err.message}`, 500);
	}
});
