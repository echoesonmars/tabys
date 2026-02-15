/** @jsxImportSource hono/jsx */

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

	return (
		<div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center animate-in fade-in duration-300">
			<div
				className="absolute inset-0 bg-black/70 backdrop-blur-md"
				onClick={onClose}
			/>
			<div className="relative bg-white w-full max-w-xl md:rounded-[2.5rem] rounded-t-[2.5rem] shadow-2xl animate-in slide-in-from-bottom md:slide-in-from-bottom-0 md:zoom-in-95 duration-300 h-[92vh] md:h-auto md:max-h-[85vh] flex flex-col overflow-hidden text-left">
				<div className="w-12 h-1 bg-gray-200 rounded-full mx-auto my-3 md:hidden shrink-0" />
				<button
					onClick={onClose}
					className="absolute top-4 right-4 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500 hover:bg-gray-200 z-50">
					✕
				</button>

				<div className="flex-1 overflow-y-auto px-6 pb-6 pt-2 md:p-8 custom-scrollbar">
					<div className="aspect-square w-full max-w-[320px] mx-auto bg-gray-50 rounded-[2rem] p-4 flex items-center justify-center relative mb-6">
						<img
							src={images[activeImgIndex]}
							className="w-full h-full object-contain animate-in fade-in zoom-in-90"
						/>
					</div>
					{images.length > 1 && (
						<div className="flex gap-3 overflow-x-auto py-2 no-scrollbar mb-6">
							{images.map((img: string, idx: number) => (
								<button
									key={idx}
									onClick={() => setActiveImgIndex(idx)}
									className={`shrink-0 w-16 h-20 rounded-xl border-2 ${activeImgIndex === idx ? 'border-green-500 ring-4 ring-green-50' : 'border-gray-100'}`}>
									<img
										src={img}
										className="w-full h-full object-contain p-1"
									/>
								</button>
							))}
						</div>
					)}
					<div className="border-b border-gray-50 pb-4">
						<p className="text-green-600 font-black text-[10px] uppercase tracking-wider">
							{displayCategory}
						</p>
						<h2 className="text-2xl font-black text-gray-800">
							{displayName}
						</h2>
					</div>
					<div className="mt-4 text-gray-600 text-sm leading-relaxed bg-gray-50/50 p-5 rounded-3xl border border-gray-100/50 whitespace-pre-wrap">
						{lang === 'kk' && product.description_kk
							? product.description_kk
							: product.description || t.noDesc}
					</div>
				</div>

				<div className="p-6 bg-white border-t border-gray-100 flex items-center justify-between gap-4 pb-10 md:pb-6">
					<div>
						<span className="block text-[10px] text-gray-400 font-black uppercase">
							{quantity > 0
								? `${t.totalLabel}:`
								: `${displayUnit}:`}
						</span>
						<span className="text-2xl font-black text-gray-900">
							{totalPrice} ₸
						</span>
					</div>
					<div className="w-40" onClick={(e) => e.stopPropagation()}>
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
	);
}
