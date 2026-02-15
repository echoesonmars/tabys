/** @jsxImportSource hono/jsx */
import { useState } from 'hono/jsx';

export default function CategoryFilter({
	allCategories,
}: {
	allCategories: string[];
}) {
	const [isOpen, setIsOpen] = useState(false);

	const [selected, setSelected] = useState<string[]>(() => {
		if (typeof window !== 'undefined') {
			const params = new URLSearchParams(window.location.search);
			const catParam = params.get('categories');
			return catParam ? catParam.split(',') : [];
		}
		return [];
	});

	const applyFilter = () => {
		const params = new URLSearchParams(window.location.search);
		if (selected.length > 0) {
			params.set('categories', selected.join(','));
		} else {
			params.delete('categories');
		}

		window.location.href = `${
			window.location.pathname
		}?${params.toString()}`;
	};

	const toggleCategory = (cat: string) => {
		setSelected((prev) =>
			prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
		);
	};

	return (
		<div className="relative inline-block text-left normal-case tracking-normal">
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="flex items-center gap-1 hover:text-blue-600 transition-colors focus:outline-none uppercase font-black text-[10px] tracking-widest cursor-pointer">
				КАТЕГОРИЯ
				<svg
					className={`transition-transform duration-200 ${
						isOpen ? 'rotate-180' : ''
					}`}
					width="10"
					height="10"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="4">
					<path d="M6 9l6 6 6-6" />
				</svg>
			</button>

			{isOpen && (
				<div className="absolute left-0 mt-2 w-56 bg-white border border-gray-100 shadow-2xl rounded-2xl z-50 p-2 border border-gray-100">
					<div className="max-h-48 overflow-y-auto custom-scrollbar p-1">
						{allCategories.map((cat) => (
							<label
								key={cat}
								className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl cursor-pointer text-[11px] font-bold text-gray-700 uppercase transition-colors">
								<input
									type="checkbox"
									checked={selected.includes(cat)}
									onChange={() => toggleCategory(cat)}
									className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
								/>
								{cat}
							</label>
						))}
					</div>
					<div className="pt-2 mt-2 border-t border-gray-100 flex gap-2">
						<button
							onClick={applyFilter}
							className="flex-1 bg-black text-white text-[10px] font-black py-2.5 rounded-xl uppercase hover:opacity-80 transition-opacity cursor-pointer">
							Применить
						</button>
						<button
							onClick={() => {
								window.location.href = window.location.pathname;
							}}
							className="flex-1 bg-gray-100 text-gray-500 text-[10px] font-black py-2.5 rounded-xl uppercase hover:bg-gray-200 transition-colors cursor-pointer">
							Сброс
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
