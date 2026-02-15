/** @jsxImportSource hono/jsx */

export const CategoryRow = ({ cat }: { cat: any }) => (
	<div
		key={cat.id}
		className="group p-3 md:p-4 bg-white rounded-[1.5rem] border border-gray-100 shadow-sm hover:shadow-md hover:border-green-100 transition-all duration-300">
		<div className="flex items-center justify-between gap-4">
			<div className="flex items-center gap-4 flex-1 min-w-0">
				<div className="shrink-0">
					<img
						src={cat.image || '/no-image.png'}
						alt={cat.name}
						className="w-12 h-12 md:w-14 md:h-14 rounded-2xl object-contain bg-gray-50 border border-gray-50 p-1 group-hover:scale-105 transition-transform"
					/>
				</div>

				<div className="flex flex-col min-w-0 text-left">
					<div className="flex items-center gap-2">
						<span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">
							RU
						</span>
						<span className="font-black text-gray-800 text-sm md:text-base truncate">
							{cat.name}
						</span>
					</div>
					{cat.name_kk && (
						<div className="flex items-center gap-2 mt-0.5">
							<span className="text-[9px] font-black text-green-300 uppercase tracking-widest">
								KK
							</span>
							<span className="font-bold text-green-700 text-[11px] md:text-xs truncate">
								{cat.name_kk}
							</span>
						</div>
					)}
				</div>
			</div>

			<div className="flex items-center gap-1 md:gap-2">
				<a
					href={`/admin/categories/edit/${cat.id}`}
					className="w-10 h-10 flex items-center justify-center text-blue-500 hover:bg-blue-500 hover:text-white rounded-xl transition-all duration-200 active:scale-95 border border-blue-50 hover:border-blue-500"
					title="Изменить">
					<svg
						xmlns="http://www.w3.org"
						width="18"
						height="18"
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
					action="/admin/categories/delete"
					onsubmit={`return confirm('⚠️ ВНИМАНИЕ: Удалить категорию «' + this.dataset.name + '»? Все товары этой категории могут потерять связь с ней!')`}
					data-name={cat.name}>
					<input type="hidden" name="id" value={cat.id} />

					<input type="hidden" name="image" value={cat.image} />

					<button
						type="submit"
						className="w-10 h-10 flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all duration-200 active:scale-90"
						title="Удалить">
						<svg
							xmlns="http://www.w3.org"
							width="18"
							height="18"
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
		</div>
	</div>
);
