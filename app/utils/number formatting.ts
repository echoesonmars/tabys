export const formatKZPhone = (value: string) => {
	const digits = value.replace(/\D/g, '');
	if (digits.length <= 1) return '+7 ';

	const raw = digits.startsWith('7')
		? digits.substring(1, 11)
		: digits.substring(0, 10);
	let res = '+7 ';
	if (raw.length > 0) res += raw.substring(0, 3);
	if (raw.length > 3) res += '-' + raw.substring(3, 6);
	if (raw.length > 6) res += '-' + raw.substring(6, 8);
	if (raw.length > 8) res += '-' + raw.substring(8, 10);
	return res;
};
