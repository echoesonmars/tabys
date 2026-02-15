/** @jsxImportSource hono/jsx */
import { useState, useEffect } from 'hono/jsx';
import { getDisplayUnit, parseImages } from '../utils/helpers';
import { i18n } from '../i18n';
import Counter from './counter';
import ProductModal from '../components/product/productModal';

export default function ProductCard({
	product,
	lang = 'ru',
	isPriority = false,
}: {
	product: any;
	lang?: 'ru' | 'kk';
	isPriority?: boolean;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [quantity, setQuantity] = useState(0);
	const [activeImgIndex, setActiveImgIndex] = useState(0);

	const images = parseImages(product.image);
	const t = i18n[lang];
	const displayName =
		lang === 'kk' && product.name_kk ? product.name_kk : product.name;
	const displayCategory =
		lang === 'kk' && product.category_kk
			? product.category_kk
			: product.category;

	const rawUnit = (product.unit || 'шт').trim().toLowerCase();
	const displayUnit = getDisplayUnit(rawUnit, lang, t);
	const isWeight = rawUnit.includes('кг') || rawUnit.includes('kg');
	const step = isWeight ? 0.2 : 1;

	const syncQuantity = () => {
		const cart = JSON.parse(localStorage.getItem('cart') || '{}');
		if (cart[product.id] !== quantity) {
			setQuantity(cart[product.id] || 0);
		}
	};

	useEffect(() => {
		syncQuantity();
		window.addEventListener('cart-updated', syncQuantity);

		if (isOpen) {
			document.body.style.overflow = 'hidden';
		}

		return () => {
			window.removeEventListener('cart-updated', syncQuantity);
			if (isOpen) document.body.style.overflow = 'unset';
		};
	}, [isOpen, product.id]);

	const totalPrice =
		quantity > 0 ? Math.round(product.price * quantity) : product.price;

	return (
		<>
			<div
				onClick={() => setIsOpen(true)}
				className="bg-white rounded-[2rem] p-3 md:p-5 shadow-sm border border-gray-100 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group cursor-pointer text-left h-full">
				<div className="relative aspect-square mb-3 md:mb-5 bg-gray-50 rounded-[1.5rem] flex justify-center overflow-hidden shrink-0">
					<img
						src={images[0]}
						alt={displayName}
						width="300"
						height="300"
						fetchpriority={isPriority ? 'high' : 'auto'}
						loading={isPriority ? 'eager' : 'lazy'}
						decoding="async"
						style={{ contentVisibility: 'auto' }}
						className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500"
					/>
					{images.length > 1 && (
						<div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md text-white text-[8px] font-black px-2 py-1 rounded-full border border-white/20">
							+{images.length - 1}{' '}
							{lang === 'kk' ? 'СУРЕТ' : 'ФОТО'}
						</div>
					)}
				</div>

				<div className="flex-1 flex flex-col">
					<h2 className="text-sm md:text-lg font-bold text-gray-800 leading-tight line-clamp-2">
						{displayName}
					</h2>
					<p className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-wider">
						{displayCategory}
					</p>
				</div>

				<div className="mt-4 space-y-3">
					<div className="flex flex-col gap-1">
						<div className="flex items-baseline gap-2 flex-wrap">
							<span className="text-lg md:text-2xl font-black text-gray-900">
								{product.price} ₸
							</span>

							<span className="text-[10px] md:text-xs text-gray-400 font-bold uppercase">
								/{displayUnit}
							</span>

							{product.old_price &&
								product.old_price > product.price && (
									<span className="text-sm md:text-base text-gray-400 line-through font-bold ml-auto">
										{product.old_price} ₸
									</span>
								)}
						</div>
					</div>

					<div
						className="w-full"
						onClick={(e) => e.stopPropagation()}>
						<Counter
							id={product.id.toString()}
							step={step}
							unit={rawUnit}
							lang={lang}
						/>
					</div>
				</div>
			</div>

			{isOpen && (
				<ProductModal
					isOpen={isOpen}
					onClose={() => setIsOpen(false)}
					product={product}
					images={images}
					activeImgIndex={activeImgIndex}
					setActiveImgIndex={setActiveImgIndex}
					displayName={displayName}
					displayCategory={displayCategory}
					displayUnit={displayUnit}
					totalPrice={totalPrice}
					quantity={quantity}
					step={step}
					rawUnit={rawUnit}
					lang={lang}
					t={t}
				/>
			)}
		</>
	);
}
