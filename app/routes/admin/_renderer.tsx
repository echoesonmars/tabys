import { jsxRenderer } from 'hono/jsx-renderer';
import { Link, Script } from 'honox/server'; // Добавили Script здесь

export default jsxRenderer(({ children }) => {
	return (
		<html lang="ru">
			<head>
				<meta charset="UTF-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<title>Админка</title>

				<Link href="/app/style.css" rel="stylesheet" />

				<Script src="/app/client.ts" async />
			</head>
			<body className="bg-gray-50">
				<main>{children}</main>
			</body>
		</html>
	);
});
