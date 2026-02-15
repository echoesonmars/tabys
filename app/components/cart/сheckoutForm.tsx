/** @jsxImportSource hono/jsx */
import { AVAILABLE_HOUSES } from '../../utils/availableHouses';

export const CheckoutForm = ({ formData, handleInput, lang = 'ru' }: any) => {
	const t = {
		delivery: lang === 'kk' ? 'Жеткізу' : 'Доставка',
		name: lang === 'kk' ? 'Есіміңіз' : 'Имя',
		select_address:
			lang === 'kk' ? 'Мекен-жайды таңдаңыз' : 'Выберите адрес',
		apartment: lang === 'kk' ? 'Пәтер нөмірі' : 'Номер квартиры',
		comment:
			lang === 'kk'
				? 'Пікір (домофон коды, кіреберіс...)'
				: 'Комментарий (код домофона, подъезд...)',
	};

	return (
		<div className="bg-white rounded-[2.5rem] p-6 md:p-10 border border-gray-100 space-y-6 text-left">
			<h3 className="text-2xl font-black uppercase tracking-tighter text-left">
				📍 {t.delivery}
			</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<input
					name="name"
					value={formData.name}
					onInput={handleInput}
					placeholder={t.name}
					className="bg-gray-50 p-5 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-green-500 placeholder:text-gray-400"
				/>

				<input
					name="phone"
					type="tel"
					value={formData.phone}
					onInput={handleInput}
					maxLength={16}
					placeholder="+7 (___) ___-__-__"
					className="bg-gray-50 p-5 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-green-500 placeholder:text-gray-400"
				/>

				<div className="relative">
					<select
						name="address"
						value={formData.address}
						onChange={handleInput}
						className="w-full bg-gray-50 p-5 rounded-2xl font-bold outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-green-500 pr-12">
						<option value="">{t.select_address}</option>
						{AVAILABLE_HOUSES.map((h) => (
							<option key={h} value={h}>
								{h}
							</option>
						))}
					</select>
					<div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
						<svg
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="3"
							strokeLinecap="round"
							strokeLinejoin="round">
							<path d="M6 9l6 6 6-6" />
						</svg>
					</div>
				</div>

				<input
					name="apartment"
					value={formData.apartment}
					onInput={handleInput}
					inputMode="numeric"
					placeholder={t.apartment}
					className="bg-gray-50 p-5 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-green-500 placeholder:text-gray-400"
				/>

				<div className="md:col-span-2">
					<input
						name="comment"
						value={formData.comment}
						onInput={handleInput}
						placeholder={t.comment}
						className="w-full bg-gray-50 p-5 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-green-500 placeholder:text-gray-400"
					/>
				</div>
			</div>
		</div>
	);
};
