import type {} from 'hono';
import type { D1Database } from '@cloudflare/workers-types';

declare module 'hono' {
	interface Env {
		Variables: {};
		Bindings: {
			[x: string]: any;
			tabys_db: D1Database;
		};
	}
}

export type Bindings = {
	tabys_db: D1Database;
	tabys_bucket: R2Bucket;
};

export interface CartItem {
	id: string;
	name: string;
	price: number;
	image: string;
	quantity: number;
	stock: number;
}

export interface Order {
	id: number;
	customer_name: string;
	customer_phone: string;
	address: string;
	comment: string;
	items_json: string;
	total_price: number;
	status: 'new' | 'completed' | 'canceled';
	created_at: string;
}

export interface Product {
	id: number;
	name: string;
	name_kk: string;
	price: number;
	old_price: number | null;
	image: string | null;
	category: string | null;
	category_id: number;
	unit: string | null;
	description: string | null;
	stock: number;
}

export interface Category {
	id: number;
	parent_id: number | null;
	name: string;
	name_kk: string;
	image: string | null;
	slug: string | null;
}
