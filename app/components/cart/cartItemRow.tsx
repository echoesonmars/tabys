/** @jsxImportSource hono/jsx */
export const CartItemRow = ({
	item,
	updateQuantity,
	lang = 'ru',
}: {
	item: any;
	updateQuantity: any;
	lang?: 'ru' | 'kk';
}) => {
	const displayUnit =
		item.unit === 'шт' ? (lang === 'kk' ? 'дана' : 'шт') : item.unit;

	const displayName =
		lang === 'kk' && item.name_kk ? item.name_kk : item.name;

	// 1. ПАРСИНГ ИЗОБРАЖЕНИЙ
	const images = (() => {
		try {
			const parsed = JSON.parse(item.image);
			return Array.isArray(parsed) ? parsed : [item.image];
		} catch (e) {
			return [item.image];
		}
	})();

	return (
		<div
			key={item.id}
			className="flex gap-4 md:gap-8 border-b border-gray-50 pb-6 last:border-0 items-center text-left">
			<div className="w-20 h-20 md:w-32 md:h-32 shrink-0 bg-gray-50 rounded-2xl overflow-hidden p-2">
				<img
					src={images[0]}
					alt={displayName}
					className="w-full h-full object-contain"
				/>
			</div>
			<div className="flex-1 flex flex-col md:flex-row justify-between gap-4">
				<div className="text-left">
					<h3 className="font-bold text-gray-800 text-lg leading-tight">
						{displayName}
					</h3>
					<p className="text-green-600 font-bold mt-1">
						{item.price} ₸ / {displayUnit}
					</p>
				</div>
				<div className="flex items-center gap-4">
					<div className="flex items-center bg-gray-50 rounded-2xl p-1 border border-gray-100 w-32 md:w-44 justify-between">
						<button
							type="button"
							onClick={() => updateQuantity(item.id, -1)}
							className="w-8 h-8 md:w-11 md:h-11 bg-white rounded-xl shadow-sm text-green-700 font-bold text-xl active:scale-90 transition-transform">
							–
						</button>
						<div className="flex flex-col items-center">
							<span className="font-black text-gray-800 text-sm md:text-xl tabular-nums">
								{item.unit && item.unit.includes('кг')
									? item.quantity
											.toFixed(3)
											.replace(/\.?0+$/, '')
									: item.quantity}
							</span>

							<span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">
								{displayUnit}
							</span>
						</div>
						<button
							type="button"
							onClick={() => updateQuantity(item.id, 1)}
							className="w-8 h-8 md:w-11 md:h-11 bg-white rounded-xl shadow-sm text-green-700 font-bold text-xl active:scale-90 transition-transform">
							+
						</button>
					</div>
					<div className="text-right min-w-[80px]">
						<p className="font-black text-gray-900 md:text-2xl whitespace-nowrap">
							{Math.round(
								item.price * item.quantity,
							).toLocaleString('ru-RU')}{' '}
							₸
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
