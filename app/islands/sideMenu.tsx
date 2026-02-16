/** @jsxImportSource hono/jsx */
import { useState, useEffect } from 'hono/jsx';
import { i18n } from '../i18n';

interface Category {
	id: number;
	name: string;
	name_kk?: string;
	image?: string;
	parent_id?: number | null;
	slug?: string;
}

export default function CategoryMenu({
	categories,
	selectedCategory,
	lang = 'ru',
}: {
	categories: Category[];
	selectedCategory?: string;
	lang?: 'ru' | 'kk';
}) {
	const [isOpen, setIsOpen] = useState(false);
	const t = i18n[lang];

	useEffect(() => {
		// Блокировка скролла при открытом меню
		document.body.style.overflow = isOpen ? 'hidden' : 'unset';
	}, [isOpen]);

	const mainCategories = categories?.filter((cat) => !cat.parent_id) || [];

	return (
		<>
			<button
				type="button"
				onClick={() => setIsOpen(true)}
				className="flex items-center justify-center gap-3 bg-green-600 text-white h-10 md:h-12 px-4 md:px-6 rounded-2xl hover:bg-green-700 active:scale-95 transition-all shadow-lg shadow-green-200/50 shrink-0 group">
				<div className="flex flex-col gap-1">
					<span
						className={`h-0.5 w-5 bg-white transition-all ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}
					/>
					<span
						className={`h-0.5 w-3 bg-white transition-all ${isOpen ? 'opacity-0' : ''}`}
					/>
					<span
						className={`h-0.5 w-5 bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}
					/>
				</div>
				<span className="font-black hidden sm:block text-xs uppercase tracking-widest">
					{selectedCategory
						? (() => {
								// Ищем категорию среди ВСЕХ (включая подкатегории) для заголовка кнопки
								const found = categories?.find(
									(c) =>
										c.name === selectedCategory ||
										c.slug === selectedCategory,
								);
								if (found) {
									return lang === 'kk'
										? found.name_kk || found.name
										: found.name;
								}
								return selectedCategory;
							})()
						: t.catalog}
				</span>
			</button>

			<div
				className={`fixed inset-0 w-full h-[100dvh] bg-[#f8f8f8] z-[999] transition-all duration-500 ease-in-out flex flex-col ${
					isOpen
						? 'translate-y-0 opacity-100 visible'
						: 'translate-y-full opacity-0 invisible'
				}`}>
				<div className="shrink-0 p-4 md:p-8 flex justify-between items-center bg-transparent">
					<h2 className="text-lg md:text-2xl font-black text-gray-800 tracking-tight uppercase">
						{lang === 'kk' ? 'Санаттар' : 'Категории'}
					</h2>
					<button
						type="button"
						onClick={() => setIsOpen(false)}
						className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white rounded-full text-gray-400 hover:text-red-500 transition-all active:scale-90 shadow-sm">
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="3"
							strokeLinecap="round"
							strokeLinejoin="round">
							<line x1="18" y1="6" x2="6" y2="18" />
							<line x1="6" y1="6" x2="18" y2="18" />
						</svg>
					</button>
				</div>

				<nav className="flex-1 overflow-y-auto p-2 md:p-8 custom-scrollbar">
					<div className="max-w-7xl mx-auto">
						<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-4">
							<a
								href={lang === 'kk' ? '/?lang=kk' : '/'}
								onClick={() => setIsOpen(false)}
								className={`group relative flex flex-col overflow-hidden rounded-[1.2rem] md:rounded-[2rem] aspect-square border-2 md:border-4 transition-all duration-500 ${
									!selectedCategory
										? 'border-green-600 shadow-2xl shadow-green-200 scale-[0.98]'
										: 'border-white hover:border-green-400 shadow-md hover:shadow-xl'
								}`}>
								<div
									className={`absolute inset-0 transition-transform duration-700 group-hover:scale-110 ${!selectedCategory ? 'bg-gradient-to-br from-green-600 via-green-700 to-green-900' : 'bg-gradient-to-br from-white via-gray-50 to-green-50'}`}>
									<div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-green-200/40 to-transparent opacity-50" />
								</div>
								<div className="relative z-10 flex flex-col items-center justify-center h-full pb-2">
									<div className="text-3xl md:text-6xl drop-shadow-md group-hover:rotate-12 transition-transform duration-500">
										🌟
									</div>
								</div>
								<div
									className={`absolute bottom-0 left-0 right-0 p-1.5 md:p-3 backdrop-blur-md border-t flex items-center justify-center text-center ${!selectedCategory ? 'bg-white/10 border-white/10' : 'bg-black/5 border-black/5'}`}>
									<span
										className={`font-black text-[9px] md:text-xs uppercase tracking-[0.1em] ${!selectedCategory ? 'text-white drop-shadow-md' : 'text-gray-500'}`}>
										{t.all_catalog}
									</span>
								</div>
							</a>

							{mainCategories.map((cat) => {
								const isActive =
									selectedCategory === cat.name ||
									selectedCategory === cat.slug;
								const displayName =
									lang === 'kk' && cat.name_kk
										? cat.name_kk
										: cat.name;
								const categoryParam = cat.id;

								return (
									<a
										key={cat.id}
										href={`/?categoryId=${encodeURIComponent(categoryParam)}${lang === 'kk' ? '&lang=kk' : ''}`}
										onClick={() => setIsOpen(false)}
										className={`group relative flex flex-col overflow-hidden rounded-[1.2rem] md:rounded-[2rem] aspect-square border-2 md:border-4 transition-all shadow-sm hover:shadow-lg ${
											isActive
												? 'border-green-600 shadow-green-100'
												: 'border-white hover:border-green-400'
										}`}>
										<div className="absolute inset-0 bg-white">
											{cat.image ? (
												<img
													src={cat.image}
													alt={displayName}
													className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
												/>
											) : (
												<div className="w-full h-full flex items-center justify-center bg-gray-100 text-xl md:text-3xl">
													📦
												</div>
											)}
										</div>
										<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90" />
										<div className="absolute bottom-0 left-0 right-0 p-1.5 md:p-4 text-center">
											<span className="block text-white font-black text-[8px] md:text-xs uppercase tracking-tighter leading-tight">
												{displayName}
											</span>
										</div>
									</a>
								);
							})}
						</div>
					</div>
				</nav>

				<div className="shrink-0 p-6 text-center">
					<p className="text-[8px] font-black text-gray-300 uppercase tracking-[0.4em]">
						Akniet shop 2026
					</p>
				</div>
			</div>
		</>
	);
}
