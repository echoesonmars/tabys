/** @jsxImportSource hono/jsx */
import { useState, useEffect } from 'hono/jsx';
import { CartItem } from '../global';

import { CartItemRow } from '../components/cart/cartItemRow';
import { CheckoutForm } from '../components/cart/сheckoutForm';
import { CheckoutSummary } from '../components/cart/checkoutSummary';
import { i18n } from '../i18n';
import { formatKZPhone } from '../utils/number formatting';

interface ExtendedCartItem extends CartItem {
	stock: number;
	unit: string;
	name_ru: string;
}

export default function CheckoutIsland({
	lang = 'ru',
	apiBase,
}: {
	lang?: 'ru' | 'kk';
	apiBase: string;
}) {
	const [items, setItems] = useState<ExtendedCartItem[]>([]);
	const [loading, setLoading] = useState(true);
	const t = i18n[lang];

	const [promoCode, setPromoCode] = useState('');
	const [appliedDiscount, setAppliedDiscount] = useState(0);
	const [promoError, setPromoError] = useState('');

	const MIN_ORDER_PRICE = 2000;

	const [formData, setFormData] = useState({
		name: '',
		phone: '+7 ',
		address: '',
		apartment: '',
		comment: '',
	});

	const subTotal = Math.round(
		items.reduce((sum, item) => sum + item.price * item.quantity, 0),
	);
	const discountValue = Math.round(subTotal * appliedDiscount);
	const totalPrice = subTotal - discountValue;

	const isOrderValid = subTotal >= MIN_ORDER_PRICE;
	const remainingAmount = MIN_ORDER_PRICE - subTotal;
	const progressPercentage = Math.min(
		(subTotal / MIN_ORDER_PRICE) * 100,
		100,
	);

	useEffect(() => {
		const fetchCartItems = async () => {
			const cart = JSON.parse(localStorage.getItem('cart') || '{}');
			const itemIds = Object.keys(cart);
			if (itemIds.length === 0) {
				setLoading(false);
				return;
			}
			try {
				const response = await fetch('/api/cart-items', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ ids: itemIds }),
				});

				if (!response.ok) throw new Error('Failed to fetch');

				const products = (await response.json()) as any[];

				const cartItems = products
					.map((p: any) => ({
						id: p.id.toString(),
						name: lang === 'kk' && p.name_kk ? p.name_kk : p.name,
						name_ru: p.name,
						price: p.price,
						image: p.image,
						stock: p.stock || 0,
						unit: (p.unit || 'шт').trim().toLowerCase(),
						quantity: cart[p.id.toString()] || 0,
					}))
					.filter((item) => item.quantity > 0);

				setItems(cartItems);
			} catch (error) {
				console.error('Cart Error:', error);
			} finally {
				setLoading(false);
			}
		};
		fetchCartItems();
	}, [lang]);

	const handleApplyPromo = async () => {
		const code = promoCode.trim().toUpperCase();
		if (!code) {
			setAppliedDiscount(0);
			setPromoError('');
			return;
		}

		try {
			const response = await fetch(`${apiBase}/api/check-promo`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ code }),
			});

			if (response.ok) {
				const data = (await response.json()) as { discount: number };
				setAppliedDiscount(data.discount / 100);
				setPromoError('');
			} else {
				setAppliedDiscount(0);
				setPromoError(
					lang === 'kk' ? 'Промокод қате' : 'Неверный промокод',
				);
			}
		} catch (e) {
			setPromoError(lang === 'kk' ? 'Сервер қатесі' : 'Ошибка сервера');
		}
	};

	const updateQuantity = (id: string, direction: number) => {
		const item = items.find((i) => i.id === id);
		if (!item) return;

		const cart = JSON.parse(localStorage.getItem('cart') || '{}');
		const step = item.unit.includes('кг') ? 0.2 : 1;
		const newQty = parseFloat(
			((cart[id] || 0) + (direction > 0 ? step : -step)).toFixed(3),
		);

		if (direction > 0 && newQty > item.stock) {
			alert(`${t.stock_limit} ${item.stock} ${item.unit}`);
			return;
		}

		if (newQty <= 0) {
			if (!confirm(t.confirm_delete)) return;
			delete cart[id];
		} else {
			cart[id] = newQty;
		}

		localStorage.setItem('cart', JSON.stringify(cart));
		window.dispatchEvent(new Event('cart-updated'));
		setItems((prev) =>
			prev
				.map((i) => (i.id === id ? { ...i, quantity: newQty } : i))
				.filter((i) => i.quantity > 0),
		);
	};

	const handleInput = (e: any) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: name === 'phone' ? formatKZPhone(value) : value,
		}));
	};

	const handleOrder = async () => {
		if (
			!isOrderValid ||
			!formData.name ||
			formData.phone.length < 16 ||
			!formData.address
		) {
			alert(t.fill_delivery);
			return;
		}

		try {
			const response = await fetch('/api/create-order', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					customer: {
						...formData,
						address: `${formData.address}, кв. ${formData.apartment}`,
					},
					items: items.map((i) => ({ ...i, name: i.name_ru })),
					total: totalPrice,
					promo: appliedDiscount > 0 ? promoCode : null,
					lang,
				}),
			});

			if (response.ok) {
				const waMessage = encodeURIComponent(
					`${t.wa_greeting} *${formData.name}*\n` +
						`${t.wa_sum} *${totalPrice.toLocaleString('ru-RU')} ₸*` +
						(appliedDiscount > 0
							? `\nПромокод: ${promoCode} (-${discountValue} ₸)`
							: ''),
				);
				localStorage.removeItem('cart');
				window.dispatchEvent(new Event('cart-updated'));
				window.location.href = `whatsapp://send?phone=7014400838&text=${waMessage}`;

				setTimeout(() => {
					window.location.href = lang === 'kk' ? '/?lang=kk' : '/';
				}, 500);
			}
		} catch (e) {
			console.error('Order error:', e);
		}
	};

	if (loading)
		return (
			<div className="p-20 text-center text-gray-400 font-bold">
				{t.loading}
			</div>
		);

	if (items.length === 0)
		return (
			<div className="min-h-[60vh] flex flex-col justify-center p-6 text-center">
				<div className="text-8xl mb-8">🛒</div>
				<h2 className="text-2xl font-black text-gray-800 uppercase mb-4">
					{t.cart_empty}
				</h2>
				<a
					href={lang === 'kk' ? '/?lang=kk' : '/'}
					className="bg-green-600 text-white px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest inline-block mx-auto">
					{t.go_shop}
				</a>
			</div>
		);

	return (
		<div className="flex flex-col gap-6 max-w-4xl mx-auto px-2 pb-20 text-left">
			<div className="bg-white rounded-[2.5rem] shadow-xl p-4 md:p-10 border border-gray-100">
				<h2 className="text-2xl font-black mb-8 uppercase tracking-tighter text-left">
					{t.your_order}
				</h2>
				<div className="space-y-6">
					{items.map((item) => (
						<CartItemRow
							key={item.id}
							item={item}
							updateQuantity={updateQuantity}
							lang={lang}
						/>
					))}
				</div>
			</div>

			{!isOrderValid && (
				<div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 rounded-[2rem] p-6 shadow-sm">
					<div className="flex justify-between items-end mb-4">
						<div className="space-y-1">
							<p className="text-amber-800 font-black text-xs uppercase tracking-widest">
								{lang === 'kk'
									? 'Минималды тапсырыс'
									: 'Минимальный заказ'}
							</p>
							<p className="text-amber-700 text-sm font-bold">
								{lang === 'kk'
									? `Тағы ${remainingAmount.toLocaleString()} ₸ сомасына тауар қосыңыз`
									: `Добавьте товаров еще на ${remainingAmount.toLocaleString()} ₸`}
							</p>
						</div>
						<div className="text-right">
							<span className="text-amber-900 font-black text-xl">
								{subTotal.toLocaleString()}
							</span>
							<span className="text-amber-400 font-bold text-sm">
								{' '}
								/ {MIN_ORDER_PRICE} ₸
							</span>
						</div>
					</div>
					<div className="h-3 w-full bg-amber-200/40 rounded-full overflow-hidden p-0.5">
						<div
							className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-1000"
							style={{ width: `${progressPercentage}%` }}
						/>
					</div>
				</div>
			)}

			<CheckoutForm
				formData={formData}
				handleInput={handleInput}
				lang={lang}
			/>

			<div className="bg-white rounded-[2rem] p-6 md:p-8 border border-gray-100 shadow-sm">
				<label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 mb-2 block">
					{lang === 'kk' ? 'Промокод' : 'Промокод'}
				</label>
				<div className="flex gap-3">
					<input
						type="text"
						placeholder="..."
						value={promoCode}
						onInput={(e: any) =>
							setPromoCode(e.target.value.toUpperCase())
						}
						className="flex-grow px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 font-bold outline-none focus:border-green-500 uppercase transition-all"
					/>
					<button
						onClick={handleApplyPromo}
						className="px-8 py-4  text-white rounded-2xl font-black text-xs uppercase bg-green-700  hover:bg-green-800  transition-all shadow-lg active:scale-95">
						OK
					</button>
				</div>
				{appliedDiscount > 0 && (
					<p className="text-green-600 text-[10px] font-black uppercase mt-3 ml-2 flex items-center gap-1">
						<span>✅</span>{' '}
						{lang === 'kk'
							? `Жеңілдік белсенді: -${discountValue} ₸`
							: `Скидка активна: -${discountValue} ₸`}
					</p>
				)}
				{promoError && (
					<p className="text-red-500 text-[10px] font-black uppercase mt-3 ml-2 flex items-center gap-1">
						<span>❌</span> {promoError}
					</p>
				)}
			</div>

			<CheckoutSummary
				totalPrice={totalPrice}
				handleOrder={handleOrder}
				lang={lang}
				disabled={!isOrderValid}
			/>
		</div>
	);
}
