/** @jsxImportSource hono/jsx */
import { CategoryRow } from './categoryRow';

export const CategoryList = ({ categories }: { categories: any[] }) => {
	const mainCategories = categories.filter((c) => !c.parent_id);

	return (
		<div className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-50 max-w-5xl mx-auto">
			<div className="flex items-center justify-between mb-8">
				<div className="flex items-center gap-3">
					<div className="w-2 h-8 bg-blue-500 rounded-full" />
					<h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter text-left">
						Список категорий
					</h2>
				</div>
			</div>

			<div className="space-y-6">
				{mainCategories.length > 0 ? (
					mainCategories.map((main) => (
						<div key={main.id} className="space-y-2">
							<CategoryRow cat={main} />
							<div className="ml-8 border-l-2 border-gray-100 pl-4 space-y-2">
								{categories
									.filter((sub) => sub.parent_id === main.id)
									.map((sub) => (
										<CategoryRow key={sub.id} cat={sub} />
									))}
							</div>
						</div>
					))
				) : (
					<div className="py-20 text-center bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
						<p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">
							Категории не найдены
						</p>
					</div>
				)}
			</div>
		</div>
	);
};
