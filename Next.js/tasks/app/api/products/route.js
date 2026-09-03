import { NextResponse } from 'next/server';

export const products = [
  {
    id: 1,
    name: 'Quantum Sound Wireless Headphones',
    category: 'Electronics',
    price: 189.99,
    originalPrice: 249.99,
    rating: 4.8,
    reviews: 142,
    badge: 'Best Seller',
    badgeType: 'amber',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    description: 'Active noise cancelling with 40-hour battery life and spatial audio capability.',
    inStock: true
  },
  {
    id: 2,
    name: 'AeroGlide Mechanical Gaming Keyboard',
    category: 'Electronics',
    price: 129.50,
    originalPrice: 159.00,
    rating: 4.7,
    reviews: 89,
    badge: 'Popular',
    badgeType: 'purple',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80',
    description: 'Hot-swappable linear mechanical switches with customizable per-key RGB backlighting.',
    inStock: true
  },
  {
    id: 3,
    name: 'Minimalist Titanium Smart Watch',
    category: 'Wearables',
    price: 299.00,
    originalPrice: 349.00,
    rating: 4.9,
    reviews: 215,
    badge: 'Trending',
    badgeType: 'emerald',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    description: 'Ultra-lightweight titanium chassis with continuous heart rate, SpO2, and sleep tracking.',
    inStock: true
  },
  {
    id: 4,
    name: 'Ergonomic Mesh Executive Chair',
    category: 'Office',
    price: 349.99,
    originalPrice: 420.00,
    rating: 4.6,
    reviews: 64,
    badge: 'Sale',
    badgeType: 'rose',
    image: 'https://images.unsplash.com/photo-1580481077197-734ed1c40a5b?w=500&q=80',
    description: 'Adaptive lumbar support with breathable Korean mesh and multi-angle recline lock.',
    inStock: true
  },
  {
    id: 5,
    name: 'Ultra-Fast 65W GaN Travel Charger',
    category: 'Accessories',
    price: 45.00,
    originalPrice: 59.99,
    rating: 4.8,
    reviews: 310,
    badge: 'Essential',
    badgeType: 'indigo',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&q=80',
    description: 'Compact 3-port fast charger compatible with laptops, smartphones, and tablets.',
    inStock: true
  },
  {
    id: 6,
    name: 'Curved UltraWide 34" Monitor',
    category: 'Electronics',
    price: 599.99,
    originalPrice: 699.00,
    rating: 4.9,
    reviews: 97,
    badge: 'Premium',
    badgeType: 'amber',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80',
    description: 'WQHD 3440x1440 resolution, 144Hz refresh rate with HDR400 for immersive productivity.',
    inStock: false
  }
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const query = searchParams.get('q');

  let filtered = [...products];

  if (category && category !== 'All') {
    filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (query) {
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) || 
      p.description.toLowerCase().includes(query.toLowerCase())
    );
  }

  return NextResponse.json({
    success: true,
    total: filtered.length,
    products: filtered
  });
}
