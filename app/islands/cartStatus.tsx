/** @jsxImportSource hono/jsx */
import { useState, useEffect } from 'hono/jsx';

export default function CartStatus() {
	const [totalCount, setTotalCount] = useState(0);
	const [positions, setPositions] = useState(0);

	useEffect(() => {
		const update = () => {
			const cart = JSON.parse(localStorage.getItem('cart') || '{}');
			const keys = Object.keys(cart);

			const count = keys.reduce(
				(sum: number, key: string) => sum + Number(cart[key]),
				0,
			);

			setPositions(keys.length);
			setTotalCount(parseFloat(count.toFixed(3)));
		};

		update();
		window.addEventListener('cart-updated', update);
		window.addEventListener('storage', update);

		return () => {
			window.removeEventListener('cart-updated', update);
			window.removeEventListener('storage', update);
		};
	}, []);

	if (positions === 0) {
		return (
			<div className="bg-white px-3 md:px-5 py-2 rounded-full shadow-sm flex items-center gap-3 border border-gray-100 transition-all">
				<span className="text-xl">🛒</span>

				<span className="hidden md:block font-bold text-gray-400 text-sm uppercase tracking-wider">
					Пусто
				</span>
			</div>
		);
	}

	return (
		<div className="bg-white px-3 md:px-5 py-2 rounded-full shadow-md flex items-center gap-3 border border-green-100 animate-in fade-in zoom-in duration-200">
			<div className="relative">
				<span className="text-xl">🛒</span>

				<span className="absolute -top-2 -right-2 bg-green-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
					{positions}
				</span>
			</div>

			<span className="hidden md:flex items-baseline font-bold text-green-700 tabular-nums">
				{totalCount % 1 !== 0 ? totalCount.toFixed(1) : totalCount}
				<span className="ml-1 text-[10px] uppercase">ед.</span>
			</span>
		</div>
	);
}
