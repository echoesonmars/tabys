/** @jsxImportSource hono/jsx */
import { createRoute } from 'honox/factory';
import { basicAuth } from 'hono/basic-auth';
import { AdminNav } from '../../components/admin/adminNav';
import { ProductForm } from '../../components/admin/productForm';

const authMiddleware = basicAuth({
	username: 'admin123',
	password: '123admin',
	realm: 'Admin Area',
});

export default createRoute(authMiddleware, async (c) => {
	const env = c.env as unknown as { API_BASE: string };
	const API_BASE = env.API_BASE;

	try {
		const catRes = await fetch(`${API_BASE}/api/categories`);
		if (!catRes.ok) throw new Error('Ошибка загрузки категорий');
		const categories = (await catRes.json()) as any[];
		// --------------------------------------

		return c.render(
			<div className="min-h-screen bg-gray-50 p-4 md:p-8">
				<div className="max-w-6xl mx-auto space-y-8">
					<AdminNav active="addProduct" />

					<ProductForm categories={categories} />
				</div>
			</div>,
		);
	} catch (e) {
		console.error(e);
		return c.render(
			<div className="p-10 text-center">
				Ошибка связи с Rust-бэкендом при загрузке категорий
			</div>,
		);
	}
});
