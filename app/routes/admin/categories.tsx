/** @jsxImportSource hono/jsx */
import { createRoute } from 'honox/factory';
import { AdminNav } from '../../components/admin/adminNav';
import { CategoryList } from '../../components/admin/categoryList';

export default createRoute(async (c) => {
	const env = c.env as any;
	const API_BASE = env.API_BASE;

	try {
		const response = await fetch(`${API_BASE}/api/categories`);

		if (!response.ok) {
			throw new Error('Ошибка загрузки категорий из Rust API');
		}

		const categories = (await response.json()) as any[];

		return c.render(
			<div className="min-h-screen bg-gray-50/50 p-4 md:p-8">
				<div className="max-w-6xl mx-auto space-y-6">
					<AdminNav active="categoryList" />
					<CategoryList categories={categories} />
				</div>
			</div>,
		);
	} catch (e) {
		console.error(e);
		return c.render(
			<div className="p-10 text-center text-red-500 font-bold">
				Ошибка связи с Rust-бэкендом
			</div>,
		);
	}
});
