/** @jsxImportSource hono/jsx */
import { createRoute } from 'honox/factory';
import { basicAuth } from 'hono/basic-auth';
// Используем unknown cast, если Bindings еще не обновлен
import { AdminNav } from '../../components/admin/adminNav';
import { ProductList } from '../../components/admin/productList';

const authMiddleware = basicAuth({
	username: 'admin123',
	password: '123admin',
	realm: 'Admin Area',
});

export default createRoute(authMiddleware, async (c) => {
	// Достаем API_BASE из конфига
	const env = c.env as unknown as { API_BASE: string };
	const API_BASE = env.API_BASE;

	const categoriesParam = c.req.query('categories');
	const sort = c.req.query('sort');
	const order = c.req.query('order');
	const selectedCategories = categoriesParam
		? categoriesParam.split(',')
		: [];

	try {
		const [prodRes, catRes] = await Promise.all([
			fetch(`${API_BASE}/api/products?admin=true`),
			fetch(`${API_BASE}/api/categories`),
		]);

		const products = (await prodRes.json()) as any[];
		const categories = (await catRes.json()) as any[];

		return c.render(
			<div className="min-h-screen bg-gray-50 p-4 md:p-8">
				<div className="max-w-6xl mx-auto space-y-8">
					<AdminNav active="list" />
					<div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
						<div className="p-6 border-b border-gray-50 flex justify-between items-center">
							<h2 className="text-xl font-black text-gray-800 uppercase tracking-tighter">
								Список товаров
							</h2>
							<span className="text-[10px] bg-gray-100 px-2 py-1 rounded-lg font-bold text-gray-500">
								ВСЕГО: {products?.length || 0}
							</span>
						</div>
						<ProductList
							products={products || []}
							categories={categories || []}
							selectedCategories={selectedCategories}
							sortConfig={{
								column: sort || '',
								order: order || '',
							}}
						/>
					</div>
				</div>
			</div>,
		);
	} catch (e) {
		console.error('Admin Load Error:', e);
		return c.render(
			<div className="p-10 text-center">
				Ошибка связи с Rust-бэкендом
			</div>,
		);
	}
});
