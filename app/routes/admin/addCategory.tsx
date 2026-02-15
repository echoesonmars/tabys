/** @jsxImportSource hono/jsx */
import { createRoute } from 'honox/factory';
import { basicAuth } from 'hono/basic-auth';
import { AdminNav } from '../../components/admin/adminNav';
import { CategoryForm } from '../../components/admin/categoryForm';

const authMiddleware = basicAuth({
	username: 'admin123',
	password: '123admin',
	realm: 'Admin Area',
});

export default createRoute(authMiddleware, async (c) => {
	const env = c.env as any;
	const API_BASE = env.API_BASE;

	try {
		const catRes = await fetch(`${API_BASE}/api/categories`);
		const categories = (await catRes.json()) as any[];

		return c.render(
			<div className="min-h-screen bg-gray-50 p-4 md:p-8">
				<div className="max-w-6xl mx-auto space-y-8">
					<AdminNav active="addCategory" />
					<CategoryForm categories={categories} />
				</div>
			</div>,
		);
	} catch (e) {
		return c.text('Ошибка загрузки категорий из Rust бэкенда', 500);
	}
});
