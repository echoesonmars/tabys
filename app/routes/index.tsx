/** @jsxImportSource hono/jsx */
import { createRoute } from 'honox/factory';
import { Header } from '../components/main/header';
import { i18n } from '../i18n';
import { Footer } from '../components/main/footer';
import SubCategorySticky from '../islands/subCategorySticky';
import { Category, Product } from '../global';
import { SubCategoryCarousel } from '../components/main/subCategoryCarousel';
import ProductCard from '../islands/productCard';

export default createRoute(async (c) => {
	const currentLang = (c.req.query('lang') === 'kk' ? 'kk' : 'ru') as
		| 'ru'
		| 'kk';
	const t = i18n[currentLang];
	const selectedCategoryIdParam = c.req.query('categoryId');
	const selectedCategoryParam = c.req.query('category');
	const searchQuery = c.req.query('q');

	const env = c.env as unknown as { API_BASE: string };
	const API_BASE = env.API_BASE;

	const productUrl = new URL(`${API_BASE}/api/products`);
	if (selectedCategoryIdParam)
		productUrl.searchParams.set('categoryId', selectedCategoryIdParam);
	if (searchQuery) productUrl.searchParams.set('q', searchQuery);

	try {
		const [catRes, prodRes] = await Promise.all([
			fetch(`${API_BASE}/api/categories`),
			fetch(productUrl.toString()),
		]);

		const categories = (await catRes.json()) as Category[];
		const products = (await prodRes.json()) as Product[];

		const selectedCategoryId =
			selectedCategoryIdParam && /^\d+$/.test(selectedCategoryIdParam)
				? Number(selectedCategoryIdParam)
				: null;

		const activeCategory =
			(selectedCategoryId !== null
				? categories.find((cat) => cat.id === selectedCategoryId)
				: null) ||
			categories?.find(
				(cat) =>
					cat.slug === selectedCategoryParam ||
					cat.name === selectedCategoryParam,
			) ||
			null;

		const parentCategory = activeCategory?.parent_id
			? categories.find((cat) => cat.id === activeCategory.parent_id) ||
				null
			: null;

		let subCategoriesForCarousel: Category[] = [];
		if (activeCategory) {
			const children = categories.filter(
				(cat) => cat.parent_id === activeCategory.id,
			);
			subCategoriesForCarousel =
				children.length > 0
					? children
					: categories.filter(
							(cat) => cat.parent_id === activeCategory.parent_id,
						);
		}

		return c.render(
			<div className="min-h-screen bg-gray-50 flex flex-col">
				<Header
					categories={categories}
					selectedCategory={
						activeCategory?.name || selectedCategoryParam
					}
					lang={currentLang}
					searchQuery={searchQuery}
				/>
				<main className="max-w-6xl mx-auto w-full p-4 md:p-6 pb-12 flex-grow text-left">
					<SubCategorySticky
						currentLang={currentLang}
						active={!!(!searchQuery && activeCategory)}
						key="stable-nav">
						<SubCategoryCarousel
							categories={subCategoriesForCarousel}
							activeCategory={activeCategory as Category}
							parentCategory={parentCategory}
							currentLang={currentLang}
						/>
					</SubCategorySticky>

					<div className="mb-6 mt-4">
						<h1 className="text-3xl font-black tracking-tighter">
							{searchQuery
								? `«${searchQuery}»`
								: activeCategory
									? currentLang === 'kk'
										? activeCategory.name_kk
										: activeCategory.name
									: t.all_catalog}
						</h1>
					</div>

					<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
						{products && products.length > 0 ? (
							products.map((product, index) => (
								<ProductCard
									key={product.id}
									product={product}
									lang={currentLang}
									isPriority={index < 8}
								/>
							))
						) : (
							<div className="col-span-full py-16 px-6 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100">
								<h3 className="text-xl font-black text-gray-800 uppercase tracking-tighter mb-2">
									{currentLang === 'kk'
										? 'Тауарлар табылмады'
										: 'Товаров не найдено'}
								</h3>
							</div>
						)}
					</div>
				</main>
				<Footer currentLang={currentLang} />
			</div>,
		);
	} catch (e) {
		console.error('API Error:', e);
		return c.render(
			<div className="p-10 text-center font-bold">
				Ошибка получения данных с бэкенда
			</div>,
		);
	}
});
