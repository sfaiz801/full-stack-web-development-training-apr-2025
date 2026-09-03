import { revalidateTag, revalidatePath } from 'next/cache';

/**
 * Next.js 15 Caching & Revalidation Strategies
 */

// 1. Time-based ISR (Incremental Static Regeneration)
export async function getLiveCatalog() {
  const res = await fetch('https://api.indixpert.dev/catalog', {
    next: {
      revalidate: 60, // Automatically regenerate this static cache every 60 seconds
      tags: ['catalog-collection']
    }
  });
  return res.json();
}

// 2. On-Demand Cache Purging (Server Action / Webhook)
export async function purgeCatalogCache() {
  'use server';
  // Invalidates all cached queries tagged with 'catalog-collection' instantly
  revalidateTag('catalog-collection');
  revalidatePath('/products');
  return { purged: true, timestamp: Date.now() };
}

// 3. Opt-out of Caching for Real-Time Dynamic Data
export async function getRealTimeOrders() {
  const res = await fetch('https://api.indixpert.dev/live-orders', {
    cache: 'no-store' // Equivalent to dynamic SSR on every request
  });
  return res.json();
}
