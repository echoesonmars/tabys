/** @jsxImportSource hono/jsx */
import { Category } from '../../global';

export const SubCategoryCarousel = ({
	categories,
	activeCategory,
	parentCategory,
	currentLang,
}: any) => {
	return (
		<div className="flex gap-3 md:gap-4">
			{parentCategory && (
				<a
					href={`/?categoryId=${parentCategory.id}${currentLang === 'kk' ? '&lang=kk' : ''}`}
					className="flex flex-col items-center gap-2 shrink-0 w-20">
					<div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center border-2 border-gray-200">
						<svg
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="3"
							className="text-gray-400">
							<rect x="3" y="3" width="7" height="7" rx="1" />
							<rect x="14" y="3" width="7" height="7" rx="1" />
							<rect x="14" y="14" width="7" height="7" rx="1" />
							<rect x="3" y="14" width="7" height="7" rx="1" />
						</svg>
					</div>
					<span className="text-[9px] font-black text-gray-400 uppercase text-center">
						{currentLang === 'kk' ? 'Барлығы' : 'Все товары'}
					</span>
				</a>
			)}
			{categories.map((sub: Category) => {
				const isCurrent = sub.id === activeCategory?.id;
				return (
					<a
						key={sub.id}
						data-active={isCurrent ? 'true' : 'false'}
						href={`/?categoryId=${sub.id}${currentLang === 'kk' ? '&lang=kk' : ''}`}
						className={`flex flex-col items-center gap-2 shrink-0 w-20 ${isCurrent ? 'pointer-events-none' : ''}`}>
						<div
							className={`w-14 h-14 rounded-2xl p-2 border-2 transition-all ${isCurrent ? 'border-green-500 bg-green-50' : 'bg-white border-gray-100'}`}>
							<img
								src={sub.image || '/placeholder.png'}
								className="w-full h-full object-contain"
								alt=""
							/>
						</div>
						<span
							className={`text-[9px] font-black uppercase text-center leading-tight ${isCurrent ? 'text-green-700' : 'text-gray-500'}`}>
							{currentLang === 'kk'
								? sub.name_kk || sub.name
								: sub.name}
						</span>
					</a>
				);
			})}
		</div>
	);
};
