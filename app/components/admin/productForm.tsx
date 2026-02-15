/** @jsxImportSource hono/jsx */
import MultiImageUpload from '../../islands/multiImageUpload';

export const ProductForm = ({ categories }: { categories: any[] }) => (
	<div className="bg-white rounded-[2.5rem] shadow-sm p-6 md:p-10 border border-gray-100 max-w-5xl mx-auto">
		{/* ЗАГОЛОВОК */}
		<div className="flex items-center gap-4 mb-8">
			<div className="bg-green-100 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm">
				🍎
			</div>
			<div className="text-left">
				<h1 className="text-2xl font-black text-gray-800 uppercase tracking-tighter">
					Новый товар
				</h1>
				<p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mt-1">
					Карточка склада • 2026 Edition
				</p>
			</div>
		</div>

		<form
			method="post"
			action="/admin/product/add"
			enctype="multipart/form-data"
			className="grid grid-cols-1 md:grid-cols-2 gap-8">
			{/* ЛЕВАЯ КОЛОНКА: Поля ввода */}
			<div className="space-y-6">
				<div className="space-y-4 text-left">
					<label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">
						Названия
					</label>
					<input
						name="name"
						type="text"
						required
						placeholder="Название на русском"
						className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 font-bold outline-none focus:border-green-500 transition-all"
					/>
					<input
						name="name_kk"
						type="text"
						required
						placeholder="Атауы (қазақша)"
						className="w-full px-5 py-4 rounded-2xl border border-green-50 bg-green-50/30 font-bold text-green-900 outline-none focus:border-green-500 transition-all"
					/>
				</div>

				<div className="space-y-4 text-left">
					<label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">
						Категория
					</label>
					<div className="relative">
						<select
							name="category_id"
							required
							className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 font-bold appearance-none cursor-pointer outline-none focus:border-green-500 transition-all">
							<option value="">Выберите категорию...</option>
							{categories.map((cat: any) => (
								<option key={cat.id} value={cat.id}>
									{cat.parent_id ? '↳ ' : '📦 '}
									{cat.name}{' '}
									{cat.name_kk ? `| ${cat.name_kk}` : ''}
								</option>
							))}
						</select>
						<div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
							▼
						</div>
					</div>
				</div>

				{/* БЛОК ЦЕН */}
				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-1 text-left">
						<label className="text-[9px] font-black text-gray-400 uppercase ml-2">
							Цена продажи ₸
						</label>
						<input
							name="price"
							type="number"
							step="any"
							required
							placeholder="0.00"
							className="w-full px-4 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 font-black outline-none focus:border-green-500 transition-all"
						/>
					</div>
					<div className="space-y-1 text-left">
						<label className="text-[9px] font-black text-red-500 uppercase ml-2">
							Старая цена
						</label>
						<input
							name="old_price"
							type="number"
							step="any"
							placeholder="Зачеркнутая"
							className="w-full px-4 py-4 rounded-2xl border border-red-50 bg-red-50/20 font-black text-red-900 outline-none focus:border-red-400 transition-all placeholder:font-normal placeholder:text-red-300"
						/>
					</div>
				</div>

				{/* БЛОК ЕДИНИЦ И ОСТАТКА */}
				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-1 text-left">
						<label className="text-[9px] font-black text-gray-400 uppercase ml-2">
							Ед. изм.
						</label>
						<select
							name="unit"
							className="w-full px-4 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 font-bold appearance-none outline-none focus:border-green-500 transition-all text-center">
							<option value="шт">шт</option>
							<option value="кг">кг</option>
							<option value="л">л</option>
							<option value="уп">уп</option>
						</select>
					</div>
					<div className="space-y-1 text-left">
						<label className="text-[9px] font-black text-gray-400 uppercase ml-2">
							Остаток
						</label>
						<input
							name="stock"
							type="number"
							step="any"
							defaultValue="0"
							className="w-full px-4 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 font-black text-blue-600 text-center outline-none focus:border-blue-500 transition-all"
						/>
					</div>
				</div>
			</div>

			<div className="space-y-4 text-left">
				<label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">
					Галерея изображений
				</label>
				<div className="p-4 border-2 border-dashed border-gray-100 rounded-[2rem] bg-gray-50/30 min-h-[350px] h-full">
					<MultiImageUpload />
				</div>
			</div>

			<div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
				<div className="space-y-2 text-left">
					<label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 italic">
						Описание (RU)
					</label>
					<textarea
						name="description"
						rows={4}
						placeholder="Подробное описание товара..."
						className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 resize-none outline-none focus:border-green-500 transition-all"
					/>
				</div>
				<div className="space-y-2 text-left">
					<label className="text-[10px] font-black text-green-600 uppercase tracking-widest ml-2 italic">
						Сипаттамасы (KK)
					</label>
					<textarea
						name="description_kk"
						rows={4}
						placeholder="Тауардың толық сипаттамасы..."
						className="w-full px-5 py-4 rounded-2xl border border-green-50 bg-green-50/30 text-green-900 resize-none outline-none focus:border-green-500 transition-all"
					/>
				</div>
			</div>

			<div className="md:col-span-2 pt-6">
				<button
					type="submit"
					className="w-full  text-white font-black py-6 rounded-[2.5rem] bg-green-700  hover:bg-green-800 active:scale-[0.98] transition-all shadow-xl shadow-green-100 uppercase tracking-[0.2em] text-sm">
					СОЗДАТЬ ТОВАР И ВЫВЕСТИ В КАТАЛОГ
				</button>
			</div>
		</form>
	</div>
);
