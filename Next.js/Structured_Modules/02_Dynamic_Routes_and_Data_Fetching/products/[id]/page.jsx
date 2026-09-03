import { notFound } from 'next/navigation';

/**
 * Dynamic Product Detail Page (React Server Component)
 * Path: app/products/[id]/page.jsx
 * Demonstrates:
 * - Dynamic route parameter extraction via props: ({ params })
 * - Direct asynchronous server data fetching
 * - 404 trigger via notFound()
 */
async function fetchProduct(id) {
  // In real apps: fetch(`https://api.domain.com/products/${id}`, { next: { revalidate: 60 } })
  const mockDb = {
    '101': { id: '101', name: 'Next.js Cloud Cluster', price: 29, stock: 15 },
    '102': { id: '102', name: 'FastAPI Docker Fleet', price: 49, stock: 8 },
    '103': { id: '103', name: 'PostgreSQL High-Availability', price: 89, stock: 24 }
  };

  const product = mockDb[id];
  if (!product) notFound();
  return product;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  return {
    title: `Product #${id} | Indixpert Cloud Solutions`,
    description: `Explore details and deployment configuration for Product #${id}`
  };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = await fetchProduct(id);

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl max-w-xl mx-auto space-y-4">
      <span className="text-xs font-bold text-sky-400 uppercase tracking-wide">DYNAMIC ROUTE: /products/{id}</span>
      <h1 className="text-2xl font-bold text-slate-100">{product.name}</h1>
      <p className="text-emerald-400 text-xl font-bold">${product.price}.00 / mo</p>
      <div className="text-sm text-slate-400">Available Stock: {product.stock} units</div>
      <button className="px-4 py-2 bg-sky-500 text-slate-950 font-bold rounded-lg hover:bg-sky-400 transition">
        Provision Resource
      </button>
    </div>
  );
}
