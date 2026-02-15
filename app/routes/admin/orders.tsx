/** @jsxImportSource hono/jsx */
import { createRoute } from 'honox/factory';
import { basicAuth } from 'hono/basic-auth';
import { AdminNav } from '../../components/admin/adminNav';
import { Order } from '../../global';

const authMiddleware = basicAuth({
	username: 'admin123',
	password: '123admin',
	realm: 'Admin Area',
});

const getFirstImage = (imageData: string): string => {
	try {
		const parsed = JSON.parse(imageData);
		if (Array.isArray(parsed) && parsed.length > 0) return parsed[0];
		return imageData || '/placeholder.png';
	} catch (e) {
		return imageData || '/placeholder.png';
	}
};

export const POST = createRoute(authMiddleware, async (c) => {
	const env = c.env as any;
	const body = await c.req.parseBody();
	const orderId = body.orderId;

	if (orderId) {
		await fetch(`${env.API_BASE}/api/orders/delete`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Basic YWRtaW4xMjM6MTIzYWRtaW4=',
			},
			body: JSON.stringify({ id: orderId }),
		});
	}

	return c.redirect('/admin/orders');
});

export default createRoute(authMiddleware, async (c) => {
	const env = c.env as any;
	const API_BASE = env.API_BASE;

	try {
		const res = await fetch(`${API_BASE}/api/orders`, {
			headers: { Authorization: 'Basic YWRtaW4xMjM6MTIzYWRtaW4=' },
		});
		const orders = (await res.json()) as Order[];

		return c.render(
			<div className="min-h-screen bg-gray-50 p-4 md:p-8 text-left">
				<div className="max-w-6xl mx-auto space-y-8">
					<AdminNav active="orders" />

					<div className="flex justify-between items-center">
						<h1 className="text-2xl md:text-3xl font-black text-gray-800 uppercase tracking-tighter">
							Панель заказов 📦
						</h1>
						<span className="bg-white px-4 py-2 rounded-2xl border border-gray-100 shadow-sm text-sm font-black text-gray-500">
							ВСЕГО: {orders.length}
						</span>
					</div>

					<div className="space-y-6">
						{orders.length > 0 ? (
							orders.map((order) => (
								<div
									key={order.id}
									className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden">
									<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
										<div>
											<div className="flex items-center gap-3">
												<h2 className="font-black text-2xl text-gray-900">
													Заказ №{order.id}
												</h2>
												<span
													className={`px-3 py-1 rounded-xl text-[10px] uppercase font-black tracking-widest ${
														order.status === 'new'
															? 'bg-blue-50 text-blue-600'
															: order.status ===
																  'completed'
																? 'bg-green-50 text-green-600'
																: 'bg-gray-100 text-gray-400'
													}`}>
													{order.status === 'new'
														? 'Новый'
														: order.status ===
															  'completed'
															? 'Выполнен'
															: 'Отменен'}
												</span>
											</div>
											<p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
												{new Date(
													order.created_at,
												).toLocaleString('ru-RU')}
											</p>
										</div>

										<form
											method="post"
											onsubmit="return confirm('Вы уверены, что хотите удалить этот заказ безвозвратно?')">
											<input
												type="hidden"
												name="orderId"
												value={order.id}
											/>
											<button
												type="submit"
												className="group flex items-center gap-2 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white px-4 py-2 rounded-2xl transition-all duration-300">
												<svg
													xmlns="http://www.w3.org"
													width="16"
													height="16"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="3"
													stroke-linecap="round"
													stroke-linejoin="round">
													<path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
												</svg>
												<span className="text-[10px] font-black uppercase tracking-widest">
													Удалить
												</span>
											</button>
										</form>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-6 text-left">
										<div className="bg-gray-50/50 p-5 rounded-3xl border border-gray-50">
											<p className="font-black text-gray-400 uppercase text-[10px] mb-3 tracking-widest text-left">
												Данные клиента
											</p>
											<p className="font-black text-gray-800 text-lg text-left">
												{order.customer_name}
											</p>
											<p className="text-green-600 font-black text-md mt-1 text-left">
												{order.customer_phone}
											</p>
										</div>
										<div className="bg-gray-50/50 p-5 rounded-3xl border border-gray-50">
											<p className="font-black text-gray-400 uppercase text-[10px] mb-3 tracking-widest text-left">
												Логистика
											</p>
											<p className="font-bold text-gray-700 text-left">
												{order.address}
											</p>
											{order.comment && (
												<div className="mt-2 p-2 bg-white rounded-xl border border-gray-100 text-xs italic text-gray-500 text-left">
													«{order.comment}»
												</div>
											)}
										</div>
									</div>

									<div className="space-y-3 mb-6">
										<p className="font-black text-gray-400 uppercase text-[10px] tracking-widest ml-2 text-left">
											Состав корзины
										</p>
										<div className="grid grid-cols-1 gap-2">
											{JSON.parse(order.items_json).map(
												(item: any) => (
													<div
														key={item.id}
														className="flex items-center gap-4 bg-white border border-gray-50 p-3 rounded-2xl hover:border-green-100 transition-colors">
														<img
															src={getFirstImage(
																item.image,
															)}
															className="w-14 h-14 rounded-xl object-contain bg-gray-50"
															alt=""
														/>
														<div className="flex-1 text-left">
															<p className="font-bold text-gray-800">
																{item.name}
															</p>
															<p className="text-[10px] text-gray-400 font-black uppercase text-left">
																{item.price} ₸ ×{' '}
																{item.quantity}
															</p>
														</div>
														<div className="text-right pr-2">
															<p className="font-black text-gray-900">
																{Math.round(
																	item.price *
																		item.quantity,
																).toLocaleString(
																	'ru-RU',
																)}{' '}
																₸
															</p>
														</div>
													</div>
												),
											)}
										</div>
									</div>

									<div className="flex justify-between items-center font-black border-t border-gray-50 pt-6 px-2">
										<span className="text-gray-400 text-[10px] uppercase tracking-widest">
											Общая сумма:
										</span>
										<span className="text-3xl text-green-700 tracking-tighter">
											{order.total_price.toLocaleString(
												'ru-RU',
											)}{' '}
											₸
										</span>
									</div>
								</div>
							))
						) : (
							<div className="text-center py-32 bg-white rounded-[3rem] shadow-sm border border-dashed border-gray-200">
								<div className="text-5xl mb-4">📭</div>
								<p className="text-gray-400 font-black uppercase tracking-widest text-xs">
									Список заказов пуст
								</p>
							</div>
						)}
					</div>
				</div>
			</div>,
		);
	} catch (e) {
		return c.text('Ошибка загрузки заказов из Rust: ' + e, 500);
	}
});
