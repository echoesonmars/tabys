/** @jsxImportSource hono/jsx */

export const Footer = ({ currentLang }: { currentLang: string }) => {
	const isKk = currentLang === 'kk';

	return (
		<footer className="bg-white border-t border-gray-50 pt-6 pb-12 md:pb-6 px-6 mt-10">
			<div className="max-w-6xl mx-auto">
				<div className="flex flex-row items-center justify-between gap-4 pb-4">
					<div className="flex flex-col text-left">
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

						<span className="text-[8px] md:text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1 whitespace-nowrap">
							09:00 — 21:00
						</span>
					</div>

					<div className="hidden md:flex flex-col items-start text-left">
						<p className="text-sm font-black text-gray-800 tracking-tight leading-none">
							{isKk
								? 'Астана қ., Иле 30/2'
								: 'г. Астана, Иле 30/2'}
						</p>
						<a
							href="/admin"
							className="text-[10px] font-black text-blue-500 uppercase mt-1">
							Astana, KZ
						</a>
					</div>

					<div className="flex items-center gap-2">
						<a
							href="tel:+77013518594"
							className="text-xs md:text-base font-black text-gray-900 tracking-tighter whitespace-nowrap">
							+7 771 440 08 38
						</a>
						<a
							href="https://wa.me/77714400838"
							className="bg-green-50 text-green-600 p-2 rounded-lg">
							<svg
								className="w-4 h-4"
								fill="currentColor"
								viewBox="0 0 24 24">
								<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 0 5.414 0 12.05c0 2.123.552 4.197 1.6 6.037L0 24l6.105-1.602a11.834 11.834 0 005.937 1.57h.005c6.635 0 12.05-5.414 12.05-12.05a11.85 11.85 0 00-3.527-8.494" />
							</svg>
						</a>
					</div>
				</div>

				<div className="border-t border-gray-50 pt-4 flex flex-col items-center gap-2">
					<a
						href={`/politikaKonfidentsialnosti?lang=${currentLang}`}
						className="text-[9px] font-black uppercase tracking-widest text-gray-400">
						{isKk
							? 'ҚҰПИЯЛЫЛЫҚ САЯСАТЫ'
							: 'ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ'}
					</a>

					<div className="text-[8px] font-bold text-gray-300 uppercase tracking-[0.1em] leading-none whitespace-nowrap">
						© 2026 ТАБЫСGO.{' '}
						{isKk
							? 'БАРЛЫҚ ҚҰҚЫҚТАР ҚОРҒАЛҒАН'
							: 'ВСЕ ПРАВА ЗАЩИЩЕНЫ'}
					</div>
				</div>
			</div>
		</footer>
	);
};
