/** @jsxImportSource hono/jsx */
import { createRoute } from 'honox/factory';
import { basicAuth } from 'hono/basic-auth';
import { AdminNav } from '../../../../components/admin/adminNav';

const authMiddleware = basicAuth({
	username: 'admin123',
	password: '123admin',
	realm: 'Admin Area',
});

// Сохраняем
export const POST = createRoute(authMiddleware, async (c) => {
	const id = c.req.param('id');
	const env = c.env as any;
	const formData = await c.req.formData();

	const response = await fetch(`${env.API_BASE}/api/categories/edit/${id}`, {
		method: 'POST',
		headers: { Authorization: 'Basic YWRtaW4xMjM6MTIzYWRtaW4=' },
		body: formData,
	});

	if (response.ok) return c.redirect('/admin/categories');
	return c.text('Ошибка Rust при обновлении', 500);
});

export default createRoute(authMiddleware, async (c) => {
	const id = c.req.param('id');
	const env = c.env as any;
	const API_BASE = env.API_BASE;

	const [catRes, allCatsRes] = await Promise.all([
		fetch(`${API_BASE}/api/categories/${id}`),
		fetch(`${API_BASE}/api/categories`),
	]);

	if (!catRes.ok) return c.text('Категория не найдена', 404);

	const cat = (await catRes.json()) as any;
	const categories = (await allCatsRes.json()) as any[];

	return c.render(
		<div className="min-h-screen bg-gray-50 p-4 md:p-8">
			<div className="max-w-6xl mx-auto space-y-8">
				<AdminNav active="categoryList" />

				<div className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-50 max-w-5xl mx-auto">
					<div className="flex items-center justify-between mb-6">
						<div className="flex items-center gap-3">
							<div className="w-2 h-8 bg-orange-500 rounded-full" />
							<h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter text-left">
								Редактирование: {cat.name}
							</h2>
						</div>
						<a
							href="/admin/categories"
							className="text-[10px] font-black text-gray-400 hover:text-gray-900 uppercase tracking-widest transition-colors">
							← К списку
						</a>
					</div>

					<form method="post" enctype="multipart/form-data">
						<input
							type="hidden"
							name="current_image"
							value={cat.image || ''}
						/>

						<div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start p-6 bg-gray-50/50 rounded-[2rem] border border-gray-100">
							<div className="md:col-span-8 flex flex-col gap-5 text-left h-full">
								<div className="relative group">
									<label className="text-[9px] font-black text-gray-400 uppercase ml-2 mb-1 block tracking-widest">
										Родительская категория
									</label>
									<select
										name="parent_id"
										className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white outline-none focus:border-orange-500 transition-all font-bold text-gray-800 shadow-sm text-sm appearance-none cursor-pointer">
										<option value="">
											— Это главная категория —
										</option>
										{categories
											.filter(
												(c) =>
													!c.parent_id &&
													c.id !== cat.id,
											)
											.map((item: any) => (
												<option
													key={item.id}
													value={item.id}
													selected={
														cat.parent_id ===
														item.id
													}>
													{item.name} (RU) /{' '}
													{item.name_kk} (KK)
												</option>
											))}
									</select>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="relative group">
										<label className="text-[9px] font-black text-gray-400 uppercase ml-2 mb-1 block tracking-widest">
											Название (RU)
										</label>
										<input
											name="name"
											type="text"
											value={cat.name}
											required
											className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white outline-none focus:border-orange-500 transition-all font-bold text-gray-800 shadow-sm text-sm"
										/>
									</div>
									<div className="relative group">
										<label className="text-[9px] font-black text-green-600 uppercase ml-2 mb-1 block tracking-widest">
											Атауы (KK)
										</label>
										<input
											name="name_kk"
											type="text"
											value={cat.name_kk}
											required
											className="w-full px-5 py-4 rounded-2xl border border-green-100 bg-white outline-none focus:border-green-500 transition-all font-bold text-green-900 shadow-sm text-sm"
										/>
									</div>
								</div>

								<div className="relative group">
									<label className="text-[9px] font-black text-blue-500 uppercase ml-2 mb-1 block tracking-widest">
										Slug (fruits, dairy)
									</label>
									<input
										name="slug"
										type="text"
										value={cat.slug}
										required
										pattern="^[a-z0-9-]+$"
										className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white outline-none focus:border-blue-500 transition-all font-mono text-gray-600 shadow-sm text-sm"
									/>
								</div>
							</div>

							<div className="md:col-span-4 h-full flex flex-col text-left">
								<label className="text-[9px] font-black text-gray-400 uppercase ml-2 mb-1 block tracking-widest">
									Иконка
								</label>
								<div className="relative flex items-center justify-center border-2 border-dashed border-gray-200 h-full min-h-[220px] rounded-[2rem] hover:bg-white hover:border-orange-400 transition-all group overflow-hidden bg-white/50">
									<input
										name="imageFile"
										type="file"
										accept="image/*"
										className="absolute inset-0 opacity-0 cursor-pointer z-10"
										onchange={`
											const files = this.files;
											if (files && files[0]) {
												const reader = new FileReader();
												const preview = document.getElementById('preview-img');
												const placeholder = document.getElementById('preview-placeholder');
												reader.onload = (e) => {
													preview.src = e.target.result;
													preview.classList.remove('hidden');
													placeholder.classList.add('hidden');
												}
												reader.readAsDataURL(files[0]);
											}
										`}
									/>
									<div
										id="preview-placeholder"
										className={
											cat.image
												? 'hidden'
												: 'text-center pointer-events-none'
										}>
										<div className="text-5xl mb-2">🖼️</div>
										<p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
											Заменить фото
										</p>
									</div>
									<img
										id="preview-img"
										src={cat.image || '#'}
										alt="Preview"
										className={
											cat.image
												? 'absolute inset-0 w-full h-full object-contain p-4 bg-white'
												: 'hidden absolute inset-0 w-full h-full object-contain p-4 bg-white'
										}
									/>
								</div>
							</div>

							<div className="md:col-span-12">
								<button
									type="submit"
									className="w-full bg-orange-600 text-white font-black py-5 rounded-[1.5rem] hover:bg-orange-700 active:scale-[0.98] transition-all shadow-xl shadow-orange-100 uppercase tracking-[0.2em] text-sm">
									СОХРАНИТЬ ИЗМЕНЕНИЯ
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>,
	);
});
