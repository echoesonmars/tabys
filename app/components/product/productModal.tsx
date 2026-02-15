/** @jsxImportSource hono/jsx */
import { useState, useRef } from 'hono/jsx';
import Counter from '../../islands/counter';

export default function ProductModal({
	isOpen,
	onClose,
	product,
	images,
	activeImgIndex,
	setActiveImgIndex,
	displayName,
	displayCategory,
	displayUnit,
	totalPrice,
	quantity,
	step,
	rawUnit,
	lang,
	t,
}: any) {
	if (!isOpen) return null;

	// Логика свайпа закрытия вниз
	const [touchStart, setTouchStart] = useState(0);
	const [translateY, setTranslateY] = useState(0);
	const scrollRef = useRef<HTMLDivElement>(null);

	const handleTouchStart = (e: any) => setTouchStart(e.touches.clientY);
	const handleTouchMove = (e: any) => {
		const diff = e.touches.clientY - touchStart;
		if (diff > 0) setTranslateY(diff);
	};
	const handleTouchEnd = () => {
		if (translateY > 120) onClose();
		setTranslateY(0);
	};

	// Обновление точек при свайпе фото
	const handleScroll = (e: any) => {
		const index = Math.round(e.target.scrollLeft / e.target.offsetWidth);
		if (index !== activeImgIndex) setActiveImgIndex(index);
	};

	return (
		<div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
			<div
				className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
				style={{ opacity: Math.max(0, 1 - translateY / 300) }}
				onClick={onClose}
			/>

			<div
				className="relative bg-white w-full max-w-lg rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl h-[88vh] sm:h-auto sm:max-h-[90vh] flex flex-col overflow-hidden transition-transform duration-200 ease-out"
				style={{ transform: `translateY(${translateY}px)` }}>
				<div
					className="h-8 w-full flex items-center justify-center shrink-0 cursor-grab active:cursor-grabbing z-50"
					onTouchStart={handleTouchStart}
					onTouchMove={handleTouchMove}
					onTouchEnd={handleTouchEnd}>
					<div className="h-1.5 w-12 bg-gray-200 rounded-full mt-1" />
				</div>

				<button
					onClick={onClose}
					className="absolute top-8 right-5 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-500 shadow-sm border border-gray-100 z-[60] active:scale-90 transition-transform">
					<svg
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="3"
						stroke-linecap="round"
						stroke-linejoin="round">
						<line x1="18" y1="6" x2="6" y2="18"></line>
						<line x1="6" y1="6" x2="18" y2="18"></line>
					</svg>
				</button>

				<div className="flex-1 overflow-y-auto no-scrollbar pt-0">
					{/* Слайдер фотографий */}
					<div className="relative">
						<div
							onScroll={handleScroll}
							className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar touch-pan-x">
							{images.map((img: string, idx: number) => (
								<div
									key={idx}
									className="w-full shrink-0 snap-center flex items-center justify-center aspect-square p-6">
									<img
										src={img}
										className="max-w-full max-h-full object-contain pointer-events-none"
										draggable={false}
									/>
								</div>
							))}
						</div>

						{images.length > 1 && (
							<div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 pointer-events-none">
								{images.map((_: any, idx: number) => (
									<div
										key={idx}
										className={`h-1.5 rounded-full transition-all duration-300 ${activeImgIndex === idx ? 'w-8 bg-green-500' : 'w-2 bg-gray-300/50'}`}
									/>
								))}
							</div>
						)}
					</div>

					{/* Текстовая информация */}
					<div className="px-6 pb-44">
						<span className="text-green-600 font-bold text-[10px] uppercase tracking-[0.2em] block mb-1">
							{displayCategory}
						</span>
						<h2 className="text-2xl font-black text-gray-900 leading-tight mb-6">
							{displayName}
						</h2>

						<div className="h-px bg-gray-50 w-full mb-6" />

						<div className="space-y-3">
							<p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
								Описание
							</p>
							<div className="text-gray-600 text-base leading-relaxed font-medium">
								{lang === 'kk' && product.description_kk
									? product.description_kk
									: product.description || t.noDesc}
							</div>
						</div>
					</div>
				</div>

				{/* Нижняя панель: Цена/Юнит и Каунтер */}
				<div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 p-6 flex items-center justify-between gap-4 shadow-[0_-15px_30px_rgba(0,0,0,0.03)] pb-[calc(1.5rem+env(safe-area-inset-bottom))] z-50">
					<div className="flex flex-col">
						<span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">
							{quantity > 0 ? t.totalLabel : 'Цена'}
						</span>
						<div className="flex items-baseline font-black text-gray-900 tracking-tighter">
							<span className="text-3xl">{totalPrice}</span>
							<span className="text-lg mx-1">₸</span>
							<span className="text-xl text-gray-300 font-light mx-0.5">
								/
							</span>
							<span className="text-lg text-gray-500 font-bold ml-1">
								{displayUnit}
							</span>
						</div>
					</div>

					<div
						className="w-[145px]"
						onClick={(e) => e.stopPropagation()}>
						<div className="transform scale-105 shadow-lg shadow-green-100/50 rounded-2xl">
							<Counter
								id={product.id.toString()}
								step={step}
								unit={rawUnit}
								lang={lang}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
