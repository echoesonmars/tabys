/** @jsxImportSource hono/jsx */
import { useState, useEffect, useRef } from 'hono/jsx/dom';

export default function SearchInput({
	initialValue = '',
	placeholder = 'Поиск...',
	lang = 'ru',
	selectedCategory = '',
}) {
	const [query, setQuery] = useState(initialValue);
	const [isMobileOpen, setIsMobileOpen] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (query === initialValue) return;

		const timeoutId = setTimeout(() => {
			const url = new URL(window.location.href);

			url.searchParams.set('lang', lang);

			if (selectedCategory) {
				url.searchParams.set('category', selectedCategory);
			}

			if (query.trim()) {
				url.searchParams.set('q', query);
			} else {
				url.searchParams.delete('q');
			}

			window.location.href = url.toString();
		}, 600);

		return () => clearTimeout(timeoutId);
	}, [query]);

	return (
		<div className="flex items-center justify-end flex-1">
			{/* ДЕСТОПНАЯ ВЕРСИЯ */}
			<div className="hidden sm:flex relative items-center w-full max-w-[280px]">
				<svg
					className="absolute left-3 w-4 h-4 text-gray-400"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="3"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
				<input
					type="text"
					value={query}
					onInput={(e: any) => setQuery(e.target.value)}
					placeholder={placeholder}
					className="w-full bg-gray-100/60 border-none rounded-xl py-2 pl-9 pr-4 text-[13px] font-bold outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
				/>
			</div>

			{/* МОБИЛЬНАЯ ВЕРСИЯ */}
			<div className="sm:hidden flex items-center">
				<button
					onClick={() => setIsMobileOpen(!isMobileOpen)}
					className={`p-2 rounded-xl transition-colors ${
						isMobileOpen
							? 'text-green-600 bg-green-50'
							: 'text-gray-900 bg-gray-100'
					}`}>
					<svg
						xmlns="http://www.w3.org"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="3"
						strokeLinecap="round"
						strokeLinejoin="round">
						<circle cx="11" cy="11" r="8" />
						<path d="m21 21-4.3-4.3" />
					</svg>
				</button>

				{isMobileOpen && (
					<div className="absolute top-full left-0 right-0 p-4 bg-white border-b border-gray-100 shadow-xl animate-in slide-in-from-top duration-200 z-50">
						<div className="relative flex items-center">
							<input
								ref={inputRef}
								type="text"
								autoFocus
								value={query}
								onInput={(e: any) => setQuery(e.target.value)}
								placeholder={placeholder}
								className="w-full bg-gray-100 border-none rounded-2xl py-3 pl-4 pr-10 text-base font-bold outline-none ring-2 ring-green-500/10"
							/>
							{query && (
								<button
									onClick={() => setQuery('')}
									className="absolute right-3 text-gray-400 p-1">
									✕
								</button>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
