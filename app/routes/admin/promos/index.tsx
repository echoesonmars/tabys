/** @jsxImportSource hono/jsx */
import { createRoute } from 'honox/factory';
import { AdminNav } from '../../../components/admin/adminNav';

// --- ОБРАБОТКА (Создание/Удаление) ---
export const POST = createRoute(async (c) => {
	const env = c.env as any;
	const formData = await c.req.formData();
	const action = formData.get('_action');

	if (action === 'create') {
		const rawCode = formData.get('code')?.toString() || '';
		const cleanCode = rawCode.trim().toUpperCase();
		await fetch(`${env.API_BASE}/api/admin/promos`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				code: cleanCode,
				discount: Number(formData.get('discount')),
			}),
		});
	} else if (action === 'delete') {
		const id = formData.get('id');
		await fetch(`${env.API_BASE}/api/admin/promos/${id}`, {
			method: 'DELETE',
		});
	}

	return c.redirect('/admin/promos');
});

// --- ОТОБРАЖЕНИЕ (SSR) ---
export default createRoute(async (c) => {
	const env = c.env as any;
	const res = await fetch(`${env.API_BASE}/api/admin/promos`);
	const promos = (await res.json()) as any[];

	return c.render(
		<div className="min-h-screen bg-gray-50 p-8 text-left">
			<div className="max-w-6xl mx-auto space-y-8">
				<AdminNav active="promos" />

				{/* ЗАГОЛОВОК */}
				<div className="flex items-center gap-4">
					<div className="bg-gray-900 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm text-white">
						🎫
					</div>
					<div className="text-left">
						<h1 className="text-2xl font-black text-gray-800 uppercase tracking-tighter">
							Промокоды
						</h1>
						<p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mt-1">
							Управление скидками
						</p>
					</div>
				</div>

				<div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
					<form
						method="post"
						className="flex flex-col md:flex-row gap-4 items-end">
						<input type="hidden" name="_action" value="create" />
						<div className="flex-1 space-y-2 w-full text-left">
							<label className="text-[10px] font-black text-gray-400 uppercase ml-2 block tracking-widest">
								Новый промокод
							</label>
							<input
								name="code"
								required
								autoComplete="off"
								placeholder="SALE2026"
								className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 font-bold uppercase outline-none focus:border-green-700 transition-all"
							/>
						</div>
						<div className="w-32 space-y-2 text-left">
							<label className="text-[10px] font-black text-gray-400 uppercase ml-2 block tracking-widest">
								Скидка %
							</label>
							<input
								name="discount"
								type="number"
								required
								min="1"
								max="100"
								defaultValue="10"
								className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 font-black text-center outline-none focus:border-green-700"
							/>
						</div>
						<button
							type="submit"
							className=" text-white px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest bg-green-700  hover:bg-green-800  transition-all shadow-xl h-[58px]">
							Создать
						</button>
					</form>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{promos.map((p) => (
						<div
							key={p.id}
							className="bg-white p-6 rounded-[2rem] border border-gray-100 flex justify-between items-center shadow-sm hover:shadow-md transition-all group">
							<div className="flex items-center gap-4">
								<div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-xl shadow-inner transition-transform group-hover:scale-110">
									🎫
								</div>
								<div className="text-left">
									<span className="font-black text-lg tracking-tighter text-gray-800 uppercase block leading-none">
										{p.code}
									</span>
									<span className="text-[10px] font-black text-green-600 uppercase tracking-widest mt-1 block">
										Скидка: {p.discount}%
									</span>
								</div>
							</div>
							<form
								method="post"
								onsubmit="return confirm('🚨 ВНИМАНИЕ! Удалить этот промокод?')">
								<input
									type="hidden"
									name="_action"
									value="delete"
								/>
								<input type="hidden" name="id" value={p.id} />
								<button
									type="submit"
									className="bg-red-50 text-red-500 px-5 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all active:scale-90 border border-red-100 hover:border-red-500 shadow-sm">
									<svg
										xmlns="http://www.w3.org"
										width="18"
										height="18"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2.5"
										stroke-linecap="round"
										stroke-linejoin="round">
										<path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
										<line
											x1="10"
											y1="11"
											x2="10"
											y2="17"></line>
										<line
											x1="14"
											y1="11"
											x2="14"
											y2="17"></line>
									</svg>
								</button>
							</form>
						</div>
					))}
				</div>

				{promos.length === 0 && (
					<div className="py-20 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100">
						<p className="text-gray-300 font-black uppercase tracking-widest text-xs">
							Список промокодов пуст
						</p>
					</div>
				)}
			</div>
		</div>,
	);
});
