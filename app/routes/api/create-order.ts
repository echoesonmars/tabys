import { createRoute } from 'honox/factory';

export const POST = createRoute(async (c) => {
	try {
		const body = await c.req.json();

		const response = await fetch(`${c.env.API_BASE}/api/create-order`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		});

		const result = await response.json();
		return c.json(result, response.status as any);
	} catch (e: any) {
		return c.json({ error: e.message }, 500);
	}
});
