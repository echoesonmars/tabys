/** @jsxImportSource hono/jsx */
import { useState, useRef, useEffect } from 'hono/jsx';

export default function MultiImageUpload({
	initialImages = [],
}: {
	initialImages?: string[];
}) {
	const [images, setImages] = useState<
		{ id: string; url: string; file?: File }[]
	>(initialImages.map((url) => ({ id: url, url })));

	const fileInputRef = useRef<HTMLInputElement>(null);
	const hiddenInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (hiddenInputRef.current) {
			const dataTransfer = new DataTransfer();
			images.forEach((img) => {
				if (img.file) dataTransfer.items.add(img.file);
			});
			hiddenInputRef.current.files = dataTransfer.files;
		}
	}, [images]);

	const handleChange = (e: any) => {
		const selectedFiles = Array.from(e.target.files as FileList);
		if (selectedFiles.length === 0) return;

		const newEntries = selectedFiles.map((file) => ({
			id: Math.random().toString(36).substr(2, 9),
			url: URL.createObjectURL(file),
			file: file,
		}));

		setImages((prev) => [...prev, ...newEntries]);
		if (fileInputRef.current) fileInputRef.current.value = '';
	};

	const removeImage = (id: string) => {
		setImages((prev) => {
			const target = prev.find((img) => img.id === id);
			if (target && !target.file) {
			} else if (target?.file) {
				URL.revokeObjectURL(target.url);
			}
			return prev.filter((img) => img.id !== id);
		});
	};

	return (
		<div className="w-full space-y-3">
			<input
				type="file"
				name="imageFiles"
				multiple
				ref={hiddenInputRef}
				className="hidden"
			/>

			<input
				type="hidden"
				name="remainingImages"
				value={JSON.stringify(
					images.filter((img) => !img.file).map((img) => img.url),
				)}
			/>

			<div className="grid grid-cols-4 gap-2">
				{images.map((img, index) => (
					<div
						key={img.id}
						className="relative aspect-square rounded-xl border border-gray-100 overflow-hidden bg-white group shadow-sm">
						<img
							src={img.url}
							className="w-full h-full object-contain p-1"
						/>
						<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
							<button
								type="button"
								onClick={() => removeImage(img.id)}
								className="bg-white text-red-500 rounded-lg px-2 py-1 text-[10px] font-black uppercase">
								Удалить
							</button>
						</div>
						{index === 0 && (
							<div className="absolute top-0 left-0 bg-green-500 text-white text-[6px] px-1 font-bold uppercase">
								Обложка
							</div>
						)}
					</div>
				))}

				<label className="cursor-pointer border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center hover:bg-green-50 aspect-square transition-colors">
					<input
						ref={fileInputRef}
						type="file"
						accept="image/*"
						multiple
						onChange={handleChange}
						className="hidden"
					/>
					<span className="text-green-500 text-xl font-bold">+</span>
					<span className="text-[7px] text-gray-400 font-bold uppercase">
						Добавить
					</span>
				</label>
			</div>
		</div>
	);
}
