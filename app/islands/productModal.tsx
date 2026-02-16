/** @jsxImportSource hono/jsx */
import { useState, useRef, useEffect } from 'hono/jsx';
import Counter from './counter';

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

	const [translateY, setTranslateY] = useState(0);
	const [touchStart, setTouchStart] = useState(0);
	const contentRef = useRef<HTMLDivElement>(null);

	// Блокируем скролл body, когда модалка открыта
	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, []);

	const handleTouchStart = (e: TouchEvent) => {
		setTouchStart(e.touches[0].clientY);
	};

	const handleTouchMove = (e: TouchEvent) => {
		const touchCurrent = e.touches[0].clientY;
		const diff = touchCurrent - touchStart;

		// Свайпаем вниз только если мы в самом верху контента
		if (diff > 0 && contentRef.current?.scrollTop === 0) {
			setTranslateY(diff);
			if (e.cancelable) e.preventDefault();
		}
	};

	const handleTouchEnd = () => {
		if (translateY > 150) {
			onClose();
		}
		setTranslateY(0);
	};

	const handleImageScroll = (e: any) => {
		const index = Math.round(e.target.scrollLeft / e.target.offsetWidth);
		if (index !== activeImgIndex) setActiveImgIndex(index);
	};

	return (
		<div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center overflow-hidden">
			<div
				className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
				style={{ opacity: Math.max(0, 1 - translateY / 400) }}
				onClick={onClose}
			/>

			<div
				className="relative bg-white w-full max-w-lg rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl h-[88vh] sm:h-auto sm:max-h-[90vh] flex flex-col transition-transform duration-200 ease-out"
				style={{ transform: `translateY(${translateY}px)` }}
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}>
				{/* Индикатор свайпа (Handle) */}
				<div className="h-8 w-full flex items-center justify-center shrink-0">
					<div className="h-1.5 w-12 bg-gray-200 rounded-full mt-1" />
				</div>

				<button
					onClick={onClose}
					className="absolute top-8 right-5 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-500 shadow-sm border border-gray-100 z-[60]">
					✕
				</button>

				<div
					ref={contentRef}
					className="flex-1 overflow-y-auto no-scrollbar pt-0 text-left">
					{/* Слайдер фото */}
					<div className="relative">
						<div
							onScroll={handleImageScroll}
							className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar touch-pan-x">
							{images.map((img: string, idx: number) => (
								<div
									key={idx}
									className="w-full shrink-0 snap-center flex items-center justify-center h-[35vh] sm:h-[40vh] p-4">
									<img
										src={img}
										className="w-full h-full object-contain pointer-events-none"
									/>
								</div>
							))}
						</div>
						{images.length > 1 && (
							<div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 pointer-events-none">
								{images.map((_: any, idx: number) => (
									<div
										key={idx}
										className={`h-1.5 rounded-full transition-all duration-300 ${activeImgIndex === idx ? 'w-8 bg-green-500' : 'w-2 bg-gray-300/50'}`}
									/>
								))}
							</div>
						)}
					</div>

					{/* Описание */}
					<div className="px-6 pb-48 pt-2">
						<span className="text-green-600 font-bold text-[10px] uppercase tracking-[0.2em] block mb-1">
							{displayCategory}
						</span>
						<h2 className="text-2xl font-black text-gray-900 leading-tight mb-4">
							{displayName}
						</h2>
						<div className="h-px bg-gray-50 w-full mb-5" />
						<div className="space-y-2">
							<p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
								Описание
							</p>
							<div className="text-gray-600 text-base leading-relaxed font-medium whitespace-pre-wrap">
								{lang === 'kk' && product.description_kk
									? product.description_kk
									: product.description || t.noDesc}
							</div>
						</div>
					</div>
				</div>

				{/* Футер */}
				<div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-100 p-6 flex items-center justify-between gap-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))] z-50">
					<div className="flex flex-col">
						<span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">
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
