/** @jsxImportSource hono/jsx */

export const AdminNav = ({
	active = 'list',
}: {
	active?:
		| 'list'
		| 'addProduct'
		| 'orders'
		| 'addCategory'
		| 'categoryList'
		| 'promos';
}) => {
	const baseClass =
		'px-5 py-2.5 rounded-xl font-bold transition-all duration-200 flex items-center gap-2 text-sm shrink-0';
	const activeClass =
		'bg-green-700 text-white shadow-md shadow-green-100 scale-105';
	const inactiveClass =
		'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-800';

	return (
		<nav className="relative bg-white p-3 rounded-[1.5rem] shadow-sm border border-gray-100 flex items-center justify-between overflow-hidden">
			<div className="flex gap-3 overflow-x-auto no-scrollbar pr-4 py-1 scroll-smooth">
				<a
					href="/admin"
					className={`${baseClass} ${active === 'list' ? activeClass : inactiveClass}`}>
					<span>📋</span>
					<span className="hidden md:inline">Склад</span>
				</a>

				<a
					href="/admin/addProduct"
					className={`${baseClass} ${active === 'addProduct' ? activeClass : inactiveClass}`}>
					<span>➕</span>
					<span className="hidden md:inline">Товар</span>
				</a>

				<a
					href="/admin/categories"
					className={`${baseClass} ${active === 'categoryList' ? activeClass : inactiveClass}`}>
					<span>📁</span>
					<span className="hidden md:inline">Категории</span>
				</a>

				<a
					href="/admin/addCategory"
					className={`${baseClass} ${active === 'addCategory' ? activeClass : inactiveClass}`}>
					<span>
						<svg
							xmlns="http://www.w3.org"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2.5"
							stroke-linecap="round"
							stroke-linejoin="round">
							<path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
							<line
								x1="12"
								y1="10"
								x2="12"
								y2="16"
								stroke={
									active === 'addCategory'
										? '#fff'
										: '#16a34a'
								}
							/>
							<line
								x1="9"
								y1="13"
								x2="15"
								y2="13"
								stroke={
									active === 'addCategory'
										? '#fff'
										: '#16a34a'
								}
							/>
						</svg>
					</span>
					<span className="hidden md:inline">Создать категорию</span>
				</a>

				<a
					href="/admin/promos"
					className={`${baseClass} ${active === 'promos' ? activeClass : inactiveClass}`}>
					<span>🎫</span>
					<span className="hidden md:inline">Промокоды</span>
				</a>

				<a
					href="/admin/orders"
					className={`${baseClass} ${active === 'orders' ? activeClass : inactiveClass}`}>
					<span>📦</span>
					<span className="hidden md:inline">Заказы</span>
				</a>
			</div>

			<div className="flex items-center gap-4 shrink-0 bg-white pl-4 relative z-10">
				<div className="h-6 w-px bg-gray-100 hidden md:block"></div>
				<a
					href="/"
					className="text-xs font-black text-gray-400 hover:text-green-600 uppercase tracking-widest transition-colors flex items-center gap-1 whitespace-nowrap">
					Магазин
					<span className="text-lg">→</span>
				</a>
			</div>

			<style
				dangerouslySetInnerHTML={{
					__html: `
				.no-scrollbar::-webkit-scrollbar { display: none; }
				.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
			`,
				}}
			/>
		</nav>
	);
};
