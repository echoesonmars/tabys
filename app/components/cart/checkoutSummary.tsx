/** @jsxImportSource hono/jsx */

export const CheckoutSummary = ({
	totalPrice,
	handleOrder,
	lang = 'ru',
	disabled = false,
}: any) => {
	const localT = {
		total_to_pay: lang === 'kk' ? 'Төлеуге барлығы' : 'Итого к оплате',
		pay_on_receive:
			lang === 'kk'
				? '* Тапсырысты алған кезде төлеу'
				: '* Оплата при получении заказа',
		whatsapp_btn: lang === 'kk' ? 'WhatsApp Тапсырыс' : 'WhatsApp Заказ',
		min_order_info:
			lang === 'kk'
				? 'Минималды сома жиналмады'
				: 'Сумма заказа меньше минимальной',

		agree_text:
			lang === 'kk'
				? 'Түймені басу арқылы сіз құпиялылық саясатына келісесіз'
				: 'Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности',
	};

	return (
		<div
			className={`relative overflow-hidden transition-all duration-700 rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-12 text-white shadow-2xl group text-left ${
				disabled
					? 'bg-gradient-to-br from-gray-400 to-gray-600 grayscale-[0.5]'
					: 'bg-gradient-to-br from-green-600 to-green-800 shadow-[0_20px_50px_rgba(22,163,74,0.3)]'
			}`}>
			<div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
			<div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-black/10 rounded-full blur-3xl" />

			<div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 w-full">
				<div className="text-center md:text-left space-y-1 w-full md:w-auto">
					<div className="flex items-center justify-center md:justify-start gap-2 mb-1">
						<span
							className={`w-2 h-2 rounded-full ${
								disabled
									? 'bg-gray-300'
									: 'bg-green-300 animate-pulse'
							}`}
						/>
						<span className="text-green-100 font-bold uppercase text-[10px] tracking-[0.2em]">
							{localT.total_to_pay}
						</span>
					</div>

					<div className="flex items-baseline justify-center md:justify-start gap-2">
						<span className="text-5xl md:text-8xl font-black tracking-tighter">
							{totalPrice.toLocaleString('ru-RU')}
						</span>
						<span
							className={`text-2xl md:text-4xl font-bold ${
								disabled ? 'text-gray-300' : 'text-green-300'
							}`}>
							₸
						</span>
					</div>

					<p className="text-green-100/60 text-[10px] italic">
						{disabled
							? localT.min_order_info
							: localT.pay_on_receive}
					</p>
				</div>

				<div className="flex flex-col items-center gap-3 w-full md:w-auto">
					<button
						onClick={!disabled ? handleOrder : undefined}
						disabled={disabled}
						className={`relative w-full md:w-auto group/btn overflow-hidden font-black px-10 md:px-14 py-6 md:py-8 rounded-[1.8rem] transition-all duration-300 flex items-center justify-center gap-4 text-xl uppercase ${
							disabled
								? 'bg-gray-300/20 text-white/50 cursor-not-allowed'
								: 'bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:-translate-y-1 active:scale-[0.96]'
						}`}>
						{!disabled && (
							<div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[-25deg] -translate-x-[150%] group-hover/btn:translate-x-[250%] transition-transform duration-1000" />
						)}

						<span>{localT.whatsapp_btn}</span>
					</button>

					<p className="text-[9px] md:text-[10px] text-white/70 text-center max-w-xs leading-snug">
						{localT.agree_text}
					</p>
				</div>
			</div>
		</div>
	);
};
