/** @jsxImportSource hono/jsx */
import CartStatus from '../../islands/cartStatus';
import SideMenu from '../../islands/sideMenu';
import SearchInput from '../../islands/searchInput';

export const Header = ({
	categories,
	selectedCategory,
	lang,
	searchQuery,
}: {
	categories: any[];
	selectedCategory?: string;
	lang: 'ru' | 'kk';
	searchQuery?: string;
}) => {
	const getLangLink = (targetLang: string) => {
		const params = new URLSearchParams();
		params.set('lang', targetLang);
		if (searchQuery) params.set('q', searchQuery);
		if (selectedCategory) params.set('category', selectedCategory);
		return `/?${params.toString()}`;
	};

	return (
		<header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
			<div className="max-w-6xl mx-auto px-4 h-16 md:h-20 flex justify-between items-center gap-2 md:gap-6">
				<div className="flex items-center gap-2 md:gap-6 overflow-hidden flex-1">
					<a
						href={lang === 'kk' ? '/?lang=kk' : '/'}
						className="flex items-center gap-3 shrink-0 group transition-transform active:scale-95">
						<div className="flex flex-col justify-center">
							<div className="flex items-end leading-none">
								<span className="text-2xl md:text-3xl font-black text-gray-900 tracking-tighter uppercase">
									ТАБЫС
								</span>
								<span className="text-base md:text-lg font-black text-green-600 ml-0.5 tracking-tighter italic mb-[1px] group-hover:translate-x-1 transition-transform">
									Go
								</span>
							</div>

							<span className="text-[7px] md:text-[9px] font-medium text-gray-400 uppercase tracking-[0.4em] leading-none mt-2 pl-0.5 border-t border-gray-100 pt-1">
								Шағын Market
							</span>
						</div>
					</a>

					<SideMenu
						categories={categories}
						selectedCategory={selectedCategory}
						lang={lang}
					/>
				</div>

				<SearchInput
					initialValue={searchQuery}
					lang={lang}
					selectedCategory={selectedCategory}
					placeholder={lang === 'kk' ? 'Іздеу...' : 'Поиск...'}
				/>

				<div className="flex items-center gap-2 md:gap-4 shrink-0">
					<div className="flex bg-gray-100 p-1 rounded-xl font-black text-[10px]">
						<a
							href={getLangLink('ru')}
							className={`px-2 py-1 rounded-lg transition-all ${
								lang === 'ru'
									? 'bg-white text-gray-900 shadow-sm'
									: 'text-gray-400 hover:text-gray-600'
							}`}>
							RU
						</a>
						<a
							href={getLangLink('kk')}
							className={`px-2 py-1 rounded-lg transition-all ${
								lang === 'kk'
									? 'bg-white text-gray-900 shadow-sm'
									: 'text-gray-400 hover:text-gray-600'
							}`}>
							KZ
						</a>
					</div>

					{/* КОРЗИНА */}
					<a
						href={lang === 'kk' ? '/checkout?lang=kk' : '/checkout'}
						className="shrink-0 active:scale-95 transition-transform">
						<CartStatus />
					</a>
				</div>
			</div>
		</header>
	);
};
