/** @jsxImportSource hono/jsx */
import CategoryFilter from '../../islands/categoryFilter';
import { ProductRow } from './productRow';

export const ProductList = ({
	products,
	categories = [], // Убедитесь, что этот пропс приходит из маршрута
	selectedCategories = [],
	sortConfig,
}: {
	products: any[];
	categories: any[]; // Добавьте этот тип
	selectedCategories: string[];
	sortConfig?: { column: string; order: string };
}) => {
	// Список имен для фильтра
	const allCategories = categories.map((c) => c.name);

	// Фильтрация: ищем имя категории по category_id товара
	let filteredProducts = products.filter((p) => {
		const cat = categories.find((c) => c.id === p.category_id);
		const catName = cat ? cat.name : 'Нет категории';
		return selectedCategories.length > 0
			? selectedCategories.includes(catName)
			: true;
	});

	// ... логика сортировки и getSortHref (без изменений) ...

	return (
		<div className="overflow-x-auto">
			<table className="w-full text-left border-collapse">
				<thead>
					<tr className="bg-gray-50 text-gray-400 text-[10px] uppercase tracking-widest">
						<th className="p-4 font-black">Фото</th>
						<th className="p-4 font-black">Название</th>
						<th className="p-4 font-black text-blue-500">
							<CategoryFilter allCategories={allCategories} />
						</th>
						<th className="p-4 font-black">Цена / Ед.</th>
						<th className="p-4 font-black">Остаток</th>
						<th className="p-4 font-black text-right">Действие</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-50">
					{filteredProducts.map((product: any) => (
						<ProductRow
							key={product.id}
							product={product}
							categories={categories}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
};
