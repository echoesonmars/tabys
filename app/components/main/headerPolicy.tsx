/** @jsxImportSource hono/jsx */

export const HeaderPolicy = ({ lang }: { lang: 'ru' | 'kk' }) => {
	const basePath = '/politikaKonfidentsialnosti';

	return (
		<header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100">
			<div className="max-w-4xl mx-auto px-4 h-16 flex justify-between items-center">
				<a
					href={lang === 'kk' ? '/?lang=kk' : '/'}
					className="flex items-center gap-3 shrink-0 group transition-transform active:scale-95">
					<div className="flex flex-col justify-center">
						<div className="flex items-end leading-none">
							<span className="text-2xl md:text-3xl font-black text-gray-900 tracking-tighter uppercase">
								Akniet
							</span>
							<span className="text-base md:text-lg font-black text-green-600 ml-0.5 tracking-tighter italic mb-[1px] group-hover:translate-x-1 transition-transform">
								SHOP
							</span>
						</div>

						<span className="text-[7px] md:text-[9px] font-medium text-gray-400 uppercase tracking-[0.4em] leading-none mt-2 pl-0.5 border-t border-gray-100 pt-1">
							Шағын Market
						</span>
					</div>
				</a>

				<div className="flex bg-gray-100 p-1 rounded-xl font-black text-[10px]">
					<a
						href={`${basePath}?lang=ru`}
						className={`px-2 py-1 rounded-lg transition-all ${
							lang === 'ru'
								? 'bg-white text-gray-900 shadow-sm'
								: 'text-gray-400 hover:text-gray-600'
						}`}>
						RU
					</a>
					<a
						href={`${basePath}?lang=kk`}
						className={`px-2 py-1 rounded-lg transition-all ${
							lang === 'kk'
								? 'bg-white text-gray-900 shadow-sm'
								: 'text-gray-400 hover:text-gray-600'
						}`}>
						KZ
					</a>
				</div>
			</div>
		</header>
	);
};
