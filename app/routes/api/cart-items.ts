import { createRoute } from 'honox/factory';

export const POST = createRoute(async (c) => {
	try {
		const body = await c.req.json();
		const env = c.env as any;
		const API_BASE = env.API_BASE;

		const response = await fetch(`${API_BASE}/api/cart-items`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		});

		if (!response.ok) {
			return c.json([], 500);
		}

		const products = await response.json();
		return c.json(products);
	} catch (e) {
		console.error('Proxy Error:', e);
		return c.json([], 500);
	}
});
