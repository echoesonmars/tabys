/** @jsxImportSource hono/jsx */

export const CategoryForm = ({ categories }: { categories: any[] }) => (
	<div className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-50 max-w-5xl mx-auto">
		<div className="flex items-center justify-between mb-6">
			<div className="flex items-center gap-3">
				<div className="w-2 h-8 bg-green-500 rounded-full" />
				<h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter text-left">
					Новая категория
				</h2>
			</div>
			<a
				href="/admin/categories"
				className="text-[10px] font-black text-gray-400 hover:text-gray-900 uppercase tracking-widest transition-colors">
				← К списку
			</a>
		</div>

		<form
			method="post"
			action="/admin/categories/add"
			enctype="multipart/form-data">
			<div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start p-6 bg-gray-50/50 rounded-[2rem] border border-gray-100">
				<div className="md:col-span-8 flex flex-col gap-5 text-left h-full">
					<div className="relative group">
						<label className="text-[9px] font-black text-gray-400 uppercase ml-2 mb-1 block tracking-widest">
							Родительская категория (пусто для главной)
						</label>
						<select
							name="parent_id"
							className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white outline-none focus:border-green-500 transition-all font-bold text-gray-800 shadow-sm text-sm appearance-none cursor-pointer">
							<option value="">— Это главная категория —</option>
							{categories
								.filter((c) => !c.parent_id)
								.map((cat: any) => (
									<option key={cat.id} value={cat.id}>
										{cat.name} (RU) / {cat.name_kk} (KK)
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
								required
								placeholder="Фрукты"
								className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white outline-none focus:border-green-500 transition-all font-bold text-gray-800 shadow-sm text-sm"
							/>
						</div>

						<div className="relative group">
							<label className="text-[9px] font-black text-green-600 uppercase ml-2 mb-1 block tracking-widest">
								Атауы (KK)
							</label>
							<input
								name="name_kk"
								type="text"
								required
								placeholder="Жемістер"
								className="w-full px-5 py-4 rounded-2xl border border-green-100 bg-white outline-none focus:border-green-500 transition-all font-bold text-green-900 shadow-sm text-sm"
							/>
						</div>
					</div>

					{/* SLUG */}
					<div className="relative group">
						<label className="text-[9px] font-black text-blue-500 uppercase ml-2 mb-1 block tracking-widest">
							Slug (латиница: fruits, dairy)
						</label>
						<input
							name="slug"
							type="text"
							required
							pattern="^[a-z0-9-]+$"
							placeholder="ovoshchi"
							className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white outline-none focus:border-blue-500 transition-all font-mono text-gray-600 shadow-sm text-sm"
						/>
					</div>
				</div>

				<div className="md:col-span-4 h-full flex flex-col text-left">
					<label className="text-[9px] font-black text-gray-400 uppercase ml-2 mb-1 block tracking-widest">
						Иконка
					</label>
					<div className="relative flex items-center justify-center border-2 border-dashed border-gray-200 h-full min-h-[220px] rounded-[2rem] hover:bg-white hover:border-green-400 transition-all group overflow-hidden bg-white/50">
						<input
							id="categoryImageInput"
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
							className="text-center pointer-events-none transition-transform duration-300 group-hover:scale-110">
							<div className="text-5xl mb-2">🖼️</div>
							<p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
								Загрузить фото
							</p>
						</div>
						<img
							id="preview-img"
							src="#"
							alt="Preview"
							className="hidden absolute inset-0 w-full h-full object-contain p-4 bg-white"
						/>
					</div>
				</div>

				<div className="md:col-span-12">
					<button
						type="submit"
						className="w-full bg-green-700 text-white font-black py-5 rounded-[1.5rem] hover:bg-green-800 active:scale-[0.98] transition-all shadow-xl shadow-green-100 uppercase tracking-[0.2em] text-sm">
						СОЗДАТЬ КАТЕГОРИЮ
					</button>
				</div>
			</div>
		</form>
	</div>
);
