/** @jsxImportSource hono/jsx */
import { useState, useEffect } from 'hono/jsx';
import { i18n } from '../i18n';

interface Props {
	id: string;
	step?: number;
	unit?: string;
	lang?: 'ru' | 'kk';
}

export default function Counter({
	id,
	step = 1,
	unit = 'шт',
	lang = 'ru',
}: Props) {
	const [count, setCount] = useState(0);

	const t = i18n[lang];

	useEffect(() => {
		const cart = JSON.parse(localStorage.getItem('cart') || '{}');
		if (cart[id]) setCount(cart[id]);
	}, [id]);

	const updateCount = (newCount: number) => {
		const fixedCount = parseFloat(newCount.toFixed(3));
		const finalCount = fixedCount < 0 ? 0 : fixedCount;

		setCount(finalCount);

		const cart = JSON.parse(localStorage.getItem('cart') || '{}');
		if (finalCount <= 0) {
			delete cart[id];
		} else {
			cart[id] = finalCount;
		}
		localStorage.setItem('cart', JSON.stringify(cart));
		window.dispatchEvent(new Event('cart-updated'));
	};

	if (count === 0) {
		return (
			<button
				onClick={() => updateCount(step)}
				className="w-full h-11 md:h-13 bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 rounded-[1.2rem] transition-all active:scale-95 shadow-sm shadow-green-100 group">
				<svg
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="3"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="group-hover:rotate-90 transition-transform duration-300">
					<line x1="12" y1="5" x2="12" y2="19"></line>
					<line x1="5" y1="12" x2="19" y2="12"></line>
				</svg>
				<span className="font-black text-xs md:text-sm uppercase tracking-wider">
					{t.add}
				</span>
			</button>
		);
	}

	return (
		<div className="flex items-center justify-between bg-gray-100 h-11 md:h-13 rounded-[1.2rem] p-1 w-full border border-gray-200/50 transition-all animate-in fade-in zoom-in-95 duration-200">
			<button
				onClick={() => updateCount(count - step)}
				className="w-9 h-9 md:w-11 md:h-11 flex items-center justify-center rounded-[0.9rem] bg-white text-gray-800 shadow-sm transition-all active:scale-75 hover:text-red-500">
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="3"
					strokeLinecap="round"
					strokeLinejoin="round">
					<line x1="5" y1="12" x2="19" y2="12"></line>
				</svg>
			</button>

			<div className="flex flex-col items-center min-w-[3rem]">
				<span className="font-black text-gray-900 text-base md:text-lg tabular-nums leading-none">
					{unit === 'кг'
						? count.toFixed(3).replace(/\.?0+$/, '')
						: count}
				</span>
				<span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mt-0.5 leading-none">
					{unit === 'шт' ? (lang === 'kk' ? 'дана' : 'шт') : unit}
				</span>
			</div>

			<button
				onClick={() => updateCount(count + step)}
				className="w-9 h-9 md:w-11 md:h-11 flex items-center justify-center rounded-[0.9rem] bg-green-600 text-white shadow-sm transition-all active:scale-75 hover:bg-green-700">
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="3"
					strokeLinecap="round"
					strokeLinejoin="round">
					<line x1="12" y1="5" x2="12" y2="19"></line>
					<line x1="5" y1="12" x2="19" y2="12"></line>
				</svg>
			</button>
		</div>
	);
}
