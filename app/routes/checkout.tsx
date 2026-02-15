/** @jsxImportSource hono/jsx */
import { createRoute } from 'honox/factory';
import CheckoutIsland from '../islands/checkoutIsland';
import { i18n } from '../i18n';

type Bindings = {
	API_BASE: string;
	tabys_db: D1Database;
};

export default createRoute(async (c) => {
	const env = c.env as Bindings;

	const currentLang = (c.req.query('lang') === 'kk' ? 'kk' : 'ru') as
		| 'ru'
		| 'kk';
	const t = i18n[currentLang];
	const API_BASE = env.API_BASE;

	return c.render(
		<div className="min-h-screen bg-gray-50 pb-10 text-left">
			<div className="max-w-4xl mx-auto px-4 pt-6 md:pt-10">
				<a
					href={currentLang === 'kk' ? '/?lang=kk' : '/'}
					className="inline-flex items-center gap-2 text-gray-400 hover:text-green-700 font-bold transition-colors mb-6 group">
					<div className="bg-white p-2 rounded-xl shadow-sm group-hover:shadow-md transition-all">
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
							<path d="M19 12H5M12 19l-7-7 7-7" />
						</svg>
					</div>
					<span className="text-sm md:text-base">{t.back}</span>
				</a>

				<header className="mb-8">
					<h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
						{t.my_order} 🛒
					</h1>
					<p className="text-gray-400 font-medium mt-2">
						{t.check_items}
					</p>
				</header>

				<CheckoutIsland lang={currentLang} apiBase={API_BASE} />
			</div>
		</div>,
	);
});
