/** @jsxImportSource hono/jsx */
import { createRoute } from 'honox/factory';
import { basicAuth } from 'hono/basic-auth';
import { AdminNav } from '../../../../components/admin/adminNav';
import MultiImageUpload from '../../../../islands/multiImageUpload';

const authMiddleware = basicAuth({
	username: 'admin123',
	password: '123admin',
	realm: 'Admin Area',
});

export default createRoute(authMiddleware, async (c) => {
	const id = c.req.param('id');
	const env = c.env as any;
	const API_BASE = env.API_BASE;

	try {
		const [prodRes, catRes] = await Promise.all([
			fetch(`${API_BASE}/api/products/${id}`),
			fetch(`${API_BASE}/api/categories`),
		]);

		if (!prodRes.ok) return c.text('Товар не найден в Rust API', 404);

		const p = (await prodRes.json()) as any;
		const categories = (await catRes.json()) as any[];

		const currentImages = (() => {
			if (Array.isArray(p.image)) return p.image;
			try {
				return JSON.parse(p.image);
			} catch {
				return p.image ? [p.image] : [];
			}
		})();

		return c.render(
			<div className="min-h-screen bg-gray-50 p-4 md:p-8 text-left">
				<div className="max-w-5xl mx-auto space-y-8">
					<AdminNav active="list" />
					<div className="bg-white rounded-[2.5rem] shadow-sm p-6 md:p-10 border border-gray-100">
						<div className="flex items-center gap-4 mb-8">
							<div className="bg-blue-100 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl">
								📝
							</div>
							<h1 className="text-2xl font-black text-gray-800 uppercase tracking-tighter">
								Редактирование: {p.name}
							</h1>
						</div>

						<form
							method="post"
							enctype="multipart/form-data"
							className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<div className="space-y-6">
								<div className="space-y-4 text-left">
									<label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">
										Названия
									</label>
									<input
										name="name"
										value={p.name || ''}
										required
										className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 font-bold outline-none focus:border-blue-500 transition-all"
									/>
									<input
										name="name_kk"
										value={p.name_kk || ''}
										required
										className="w-full px-5 py-4 rounded-2xl border border-green-50 bg-green-50/30 font-bold text-green-900 outline-none focus:border-green-500 transition-all"
									/>
								</div>

								<div className="space-y-4 text-left">
									<label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">
										Категория
									</label>
									<select
										name="category_id"
										className="w-full px-5 py-4 rounded-2xl border border-gray-100 font-bold appearance-none bg-gray-50 cursor-pointer outline-none focus:border-blue-500 transition-all text-sm">
										<option value="">
											Выберите категорию...
										</option>
										{categories.map((cat: any) => (
											<option
												key={cat.id}
												value={cat.id}
												selected={
													Number(p.category_id) ===
													cat.id
												}>
												{cat.parent_id ? '↳ ' : '📦 '}{' '}
												{cat.name}
											</option>
										))}
									</select>
								</div>

								<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
									<div className="space-y-1">
										<label className="text-[9px] font-black text-gray-400 uppercase ml-1">
											Цена ₸
										</label>
										<input
											name="price"
											type="number"
											step="0.01"
											value={p.price}
											required
											className="w-full px-3 py-4 rounded-2xl border border-gray-100 font-black text-sm outline-none focus:border-blue-500"
										/>
									</div>
									<div className="space-y-1">
										<label className="text-[9px] font-black text-red-500 uppercase ml-1">
											Старая ₸
										</label>
										<input
											name="old_price"
											type="number"
											step="0.01"
											value={p.old_price || ''}
											className="w-full px-3 py-4 rounded-2xl border border-red-50 bg-red-50/20 font-black text-red-900 text-sm outline-none focus:border-red-400"
										/>
									</div>
									<div className="space-y-1">
										<label className="text-[9px] font-black text-gray-400 uppercase ml-1 text-center block">
											Ед.
										</label>
										<select
											name="unit"
											className="w-full px-2 py-4 rounded-2xl border border-gray-100 font-bold text-center appearance-none bg-gray-50 outline-none text-sm">
											{['шт', 'кг', 'л', 'уп'].map(
												(u) => (
													<option
														key={u}
														value={u}
														selected={u === p.unit}>
														{u}
													</option>
												),
											)}
										</select>
									</div>
									<div className="space-y-1">
										<label className="text-[9px] font-black text-gray-400 uppercase ml-1 text-center block">
											Склад
										</label>
										<input
											name="stock"
											type="number"
											step="any"
											value={p.stock}
											className="w-full px-3 py-4 rounded-2xl border border-gray-100 font-black text-blue-600 text-center text-sm outline-none focus:border-blue-500"
										/>
									</div>
								</div>
							</div>

							<div className="space-y-4 text-left">
								<label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">
									Галерея
								</label>
								<div className="p-4 border-2 border-dashed border-gray-100 rounded-[2rem] bg-gray-50/30 min-h-[280px] h-full transition-all">
									<MultiImageUpload
										initialImages={currentImages}
									/>
								</div>
							</div>

							<div className="space-y-2 text-left">
								<label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 italic">
									Описание (RU)
								</label>
								<textarea
									name="description"
									rows={4}
									className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 resize-none outline-none focus:border-blue-500 font-medium text-sm">
									{p.description || p.description_ru || ''}
								</textarea>
							</div>

							<div className="space-y-2 text-left">
								<label className="text-[10px] font-black text-green-600 uppercase tracking-widest ml-2 italic">
									Сипаттамасы (KK)
								</label>
								<textarea
									name="description_kk"
									rows={4}
									className="w-full px-5 py-4 rounded-2xl border border-green-50 bg-green-50/30 resize-none text-green-900 outline-none focus:border-green-500 font-medium text-sm">
									{p.description_kk || p.descriptionKk || ''}
								</textarea>
							</div>

							<div className="md:col-span-2 pt-6 flex gap-4">
								<button
									type="submit"
									className="w-full px-8 py-5 rounded-3xl bg-green-700 text-white font-black uppercase tracking-[0.2em] shadow-xl shadow-green-100 hover:bg-green-800 active:scale-[0.98] transition-all text-sm">
									Сохранить изменения
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>,
		);
	} catch (e) {
		return c.text('Ошибка при загрузке данных из Rust API', 500);
	}
});

export const POST = createRoute(authMiddleware, async (c) => {
	const id = c.req.param('id');
	const env = c.env as any;
	const API_BASE = env.API_BASE;

	const formData = await c.req.formData();

	const response = await fetch(`${API_BASE}/api/products/edit/${id}`, {
		method: 'POST',
		headers: {
			Authorization: 'Basic YWRtaW4xMjM6MTIzYWRtaW4=',
		},
		body: formData,
	});

	if (response.ok) {
		return c.redirect('/admin');
	} else {
		const err = await response.text();
		return c.text(`Ошибка Rust: ${err}`, 500);
	}
});
