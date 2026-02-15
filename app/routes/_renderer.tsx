/** @jsxImportSource hono/jsx */
import { jsxRenderer } from 'hono/jsx-renderer';
import { Script } from 'honox/server';
import css from '/app/style.css?inline';

declare module 'hono' {
	interface ContextRenderer {
		(
			children: any,
			props?: { lcpImage?: string; title?: string },
		): Response | Promise<Response>;
	}
}

export default jsxRenderer(({ children, lcpImage }) => {
	return (
		<html lang="ru">
			<head>
				<meta charset="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<link rel="icon" href="/favicon.ico" />

				{lcpImage && (
					<link
						rel="preload"
						as="image"
						href={lcpImage}
						fetchpriority="high"
					/>
				)}

				<style
					dangerouslySetInnerHTML={{
						__html: css + 'html{scroll-behavior:smooth}',
					}}
				/>
				<Script src="/app/client.ts" async />
			</head>
			<body>{children}</body>
		</html>
	);
});
