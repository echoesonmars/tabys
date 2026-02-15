/** @jsxImportSource hono/jsx */

export const ProductRow = ({
	product,
	categories = [],
}: {
	product: any;
	categories: any[];
}) => {
	const isWeight = product.unit === 'кг';
	const displayStock = isWeight
		? parseFloat(Number(product.stock).toFixed(3))
		: product.stock;

	const categoryName =
		categories.find((c) => Number(c.id) === Number(product.category_id))
			?.name || 'Нет категории';

	const imageUrls = (() => {
		try {
			const parsed = JSON.parse(product.image);
			if (Array.isArray(parsed) && parsed.length > 0) return parsed;
			return [product.image];
		} catch (e) {
			return [product.image || ''];
		}
	})();

	const mainImageUrl = imageUrls[0] || '/placeholder.png';

	return (
		<tr
			key={product.id}
			className="group hover:bg-gray-50/80 transition-all duration-300 border-b border-gray-50 last:border-0">
			<td className="p-4">
				<div className="relative w-16 h-20 rounded-[1.2rem] overflow-hidden border border-gray-100 bg-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
					<img
						src={mainImageUrl}
						alt={product.name}
						className="w-full h-full object-contain p-1"
					/>
					{imageUrls.length > 1 && (
						<div className="absolute bottom-1 right-1 bg-black/60 backdrop-blur-sm text-white text-[7px] px-1.5 py-0.5 rounded-md font-black uppercase">
							+{imageUrls.length - 1}
						</div>
					)}
				</div>
			</td>

			<td className="p-4 text-left">
				<div className="font-black text-gray-800 text-sm tracking-tight">
					{product.name}
				</div>
				{product.description && (
					<div className="text-[10px] text-gray-400 font-medium line-clamp-1 max-w-[180px] mt-0.5 italic">
						{product.description}
					</div>
				)}
			</td>

			<td className="p-4 text-left">
				<span className="inline-flex items-center gap-1.5 text-gray-500 text-[9px] font-black uppercase tracking-widest bg-gray-100/80 border border-gray-100 px-2.5 py-1.2 rounded-xl whitespace-nowrap">
					<span className="w-1 h-1 bg-gray-400 rounded-full" />
					{categoryName}
				</span>
			</td>

			<td className="p-4 text-left">
				<div className="font-black text-gray-900 text-base leading-none">
					{product.price} ₸
				</div>
				<div className="text-[9px] text-gray-400 font-bold uppercase mt-1">
					за {product.unit || 'шт'}
				</div>
			</td>

			<td className="p-4 text-left">
				<div
					className={`inline-flex items-center px-3 py-1.5 rounded-xl text-[10px] font-black tracking-tighter shadow-sm border ${
						Number(product.stock) > 0
							? 'bg-green-50 text-green-700 border-green-100'
							: 'bg-red-50 text-red-700 border-red-100'
					}`}>
					{displayStock} {product.unit || 'шт.'}
				</div>
			</td>

			<td className="p-4 text-right">
				<div className="flex justify-end items-center gap-2">
					<a
						href={`/admin/product/edit/${product.id}`}
						className="w-9 h-9 flex items-center justify-center text-blue-500 bg-white border border-blue-50 hover:bg-blue-500 hover:text-white rounded-xl shadow-sm transition-all duration-200 active:scale-90"
						title="ИЗМЕНИТЬ">
						<svg
							xmlns="http://www.w3.org"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2.5"
							stroke-linecap="round"
							stroke-linejoin="round">
							<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
							<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
						</svg>
					</a>

					<form
						method="post"
						action="/admin/product/delete"
						className="inline"
						onsubmit={`return confirm('Удалить товар «${product.name}»?')`}>
						<input type="hidden" name="id" value={product.id} />

						<input
							type="hidden"
							name="image"
							value={product.image}
						/>

						<button
							type="submit"
							className="w-9 h-9 flex items-center justify-center text-red-400 bg-white border border-red-50 hover:bg-red-500 hover:text-white rounded-xl shadow-sm transition-all duration-200 active:scale-90"
							title="УДАЛИТЬ">
							<svg
								xmlns="http://www.w3.org"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2.5"
								stroke-linecap="round"
								stroke-linejoin="round">
								<path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
								<line x1="10" y1="11" x2="10" y2="17"></line>
								<line x1="14" y1="11" x2="14" y2="17"></line>
							</svg>
						</button>
					</form>
				</div>
			</td>
		</tr>
	);
};
