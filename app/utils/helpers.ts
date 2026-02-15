export const parseImages = (imageField: any): string[] => {
	try {
		const parsed = JSON.parse(imageField);
		return Array.isArray(parsed) ? parsed : [imageField];
	} catch (e) {
		return [imageField];
	}
};

export const getDisplayUnit = (unit: string, lang: 'ru' | 'kk', t: any) => {
	const u = (unit || 'шт').trim().toLowerCase();
	if (u.includes('кг') || u.includes('kg')) return t.kg;
	if (u.includes('шт') || u.includes('дана'))
		return lang === 'kk' ? 'дана' : 'шт';
	if (u.includes('литр') || u.includes('л'))
		return lang === 'kk' ? 'литр' : 'литр';
	if (u.includes('уп')) return lang === 'kk' ? 'жинақ' : 'уп';
	return u;
};
