'use client';

import { useState, useMemo } from 'react';
import { products as initialProducts } from '../api/products/route';

export default function ProductsPage() {
  const [products] = useState(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [cart, setCart] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCartDrawer, setShowCartDrawer] = useState(false);

  const categories = ['All', 'Electronics', 'Wearables', 'Office', 'Accessories'];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory =
          selectedCategory === 'All' || p.category === selectedCategory;
        const matchesSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  const addToCart = (product) => {
    setCart((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1,
    }));
  };

  const removeFromCart = (productId) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (updated[productId] > 1) {
        updated[productId] -= 1;
      } else {
        delete updated[productId];
      }
      return updated;
    });
  };

  const totalCartCount = Object.values(cart).reduce((sum, count) => sum + count, 0);

  const totalCartPrice = Object.entries(cart).reduce((sum, [id, count]) => {
    const product = products.find((p) => p.id === Number(id));
    return sum + (product ? product.price * count : 0);
  }, 0);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '30px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span className="badge badge-indigo">Task 1: Next.js Client Component</span>
            <span className="badge badge-emerald">Interactive Catalog</span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
            Product Catalog & Cart Showcase
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            Browse items, filter by categories, live search, sort prices, and manage active cart state.
          </p>
        </div>

        {/* Floating Cart Button */}
        <button
          onClick={() => setShowCartDrawer(true)}
          className="btn-primary"
          style={{ position: 'relative' }}
        >
          <i className="fa-solid fa-cart-shopping"></i>
          <span>View Cart</span>
          {totalCartCount > 0 && (
            <span
              style={{
                background: '#ef4444',
                color: '#fff',
                fontSize: '0.75rem',
                borderRadius: '999px',
                padding: '2px 8px',
                marginLeft: '4px',
                fontWeight: 800
              }}
            >
              {totalCartCount}
            </span>
          )}
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div
        className="glass-card"
        style={{
          padding: '20px',
          marginBottom: '30px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '15px',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                background: selectedCategory === cat ? '#6366f1' : 'rgba(255, 255, 255, 0.05)',
                color: selectedCategory === cat ? '#ffffff' : '#94a3b8',
                border: selectedCategory === cat ? '1px solid #818cf8' : '1px solid rgba(255, 255, 255, 0.08)',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search and Sort */}
        <div style={{ display: 'flex', gap: '12px', flex: '1', minWidth: '280px', maxWidth: '500px' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <i
              className="fa-solid fa-magnifying-glass"
              style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}
            ></i>
            <input
              type="text"
              placeholder="Search products by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control"
              style={{ paddingLeft: '40px' }}
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="form-select"
            style={{ width: '160px' }}
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="glass-card" style={{ padding: '50px', textAlign: 'center' }}>
          <i className="fa-solid fa-box-open" style={{ fontSize: '3rem', color: '#64748b', marginBottom: '15px' }}></i>
          <h3>No products found</h3>
          <p style={{ color: '#94a3b8', marginTop: '6px' }}>Try adjusting your search query or selected category filter.</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="btn-secondary"
            style={{ marginTop: '16px' }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
            gap: '24px'
          }}
        >
          {filteredProducts.map((product) => {
            const countInCart = cart[product.id] || 0;
            return (
              <div
                key={product.id}
                className="glass-card glass-card-hover"
                style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
              >
                {/* Product Image & Badge */}
                <div style={{ position: 'relative', height: '190px', background: '#0b1120', overflow: 'hidden' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                    <span className={`badge badge-${product.badgeType}`}>
                      {product.badge}
                    </span>
                  </div>
                  {!product.inStock && (
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ background: '#ef4444', color: '#fff', padding: '6px 14px', borderRadius: '8px', fontWeight: 700, fontSize: '0.85rem' }}>
                        OUT OF STOCK
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#818cf8', textTransform: 'uppercase' }}>
                      {product.category}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fbbf24', fontSize: '0.85rem', fontWeight: 700 }}>
                      <i className="fa-solid fa-star"></i>
                      <span>{product.rating}</span>
                      <span style={{ color: '#64748b', fontSize: '0.75rem' }}>({product.reviews})</span>
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px', lineHeight: 1.4 }}>
                    {product.name}
                  </h3>

                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '16px', flex: 1 }}>
                    {product.description}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>
                        ${product.price.toFixed(2)}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b', textDecoration: 'line-through' }}>
                        ${product.originalPrice.toFixed(2)}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => setSelectedProduct(product)}
                        title="View Details"
                        style={{
                          background: 'rgba(255,255,255,0.06)',
                          color: '#cbd5e1',
                          border: 'none',
                          borderRadius: '10px',
                          width: '38px',
                          height: '38px',
                          cursor: 'pointer'
                        }}
                      >
                        <i className="fa-solid fa-eye"></i>
                      </button>

                      {product.inStock ? (
                        <button
                          onClick={() => addToCart(product)}
                          className="btn-primary"
                          style={{ padding: '8px 14px', fontSize: '0.85rem' }}
                        >
                          <i className="fa-solid fa-cart-plus"></i>
                          {countInCart > 0 ? `Add (${countInCart})` : 'Add'}
                        </button>
                      ) : (
                        <button
                          disabled
                          style={{
                            background: 'rgba(255,255,255,0.05)',
                            color: '#64748b',
                            border: 'none',
                            borderRadius: '10px',
                            padding: '8px 12px',
                            fontSize: '0.85rem',
                            cursor: 'not-allowed'
                          }}
                        >
                          Unavailable
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Quick View Modal */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div
            className="glass-card"
            style={{ maxWidth: '540px', width: '100%', padding: '24px', background: '#0f172a' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span className={`badge badge-${selectedProduct.badgeType}`}>{selectedProduct.badge}</span>
              <button
                onClick={() => setSelectedProduct(null)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '12px', marginBottom: '16px' }}
            />

            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '8px' }}>
              {selectedProduct.name}
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '16px' }}>
              {selectedProduct.description}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
              <div>
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f8fafc' }}>
                  ${selectedProduct.price.toFixed(2)}
                </span>
                <span style={{ fontSize: '0.9rem', color: '#64748b', textDecoration: 'line-through', marginLeft: '8px' }}>
                  ${selectedProduct.originalPrice.toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                disabled={!selectedProduct.inStock}
                className="btn-primary"
              >
                <i className="fa-solid fa-cart-plus"></i>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer Modal */}
      {showCartDrawer && (
        <div className="modal-overlay" onClick={() => setShowCartDrawer(false)}>
          <div
            className="glass-card"
            style={{
              maxWidth: '480px',
              width: '100%',
              padding: '24px',
              background: '#0f172a',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fa-solid fa-basket-shopping" style={{ color: '#6366f1' }}></i>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Your Shopping Cart</h3>
              </div>
              <button
                onClick={() => setShowCartDrawer(false)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', marginBottom: '20px' }}>
              {totalCartCount === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8' }}>
                  <i className="fa-solid fa-cart-arrow-down" style={{ fontSize: '2.5rem', color: '#475569', marginBottom: '12px' }}></i>
                  <p>Your cart is empty.</p>
                </div>
              ) : (
                Object.entries(cart).map(([id, count]) => {
                  const item = products.find((p) => p.id === Number(id));
                  if (!item) return null;
                  return (
                    <div
                      key={id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 0',
                        borderBottom: '1px solid rgba(255,255,255,0.06)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }}
                        />
                        <div>
                          <h4 style={{ fontSize: '0.9rem', fontWeight: 600 }}>{item.name}</h4>
                          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                            ${item.price.toFixed(2)} each
                          </span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'rgba(255,255,255,0.08)', color: '#fff', border: 'none', cursor: 'pointer' }}
                        >
                          -
                        </button>
                        <span style={{ fontWeight: 700, fontSize: '0.9rem', minWidth: '18px', textAlign: 'center' }}>
                          {count}
                        </span>
                        <button
                          onClick={() => addToCart(item)}
                          style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'rgba(255,255,255,0.08)', color: '#fff', border: 'none', cursor: 'pointer' }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {totalCartCount > 0 && (
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#94a3b8' }}>Subtotal</span>
                  <span style={{ fontWeight: 700 }}>${totalCartPrice.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span style={{ color: '#94a3b8' }}>Estimated Tax (8%)</span>
                  <span style={{ fontWeight: 700 }}>${(totalCartPrice * 0.08).toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '1.15rem' }}>
                  <span style={{ fontWeight: 800 }}>Total</span>
                  <span style={{ fontWeight: 800, color: '#818cf8' }}>
                    ${(totalCartPrice * 1.08).toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => alert(`Simulated Checkout: Payment of $${(totalCartPrice * 1.08).toFixed(2)} processed!`)}
                  className="btn-primary"
                  style={{ width: '100%' }}
                >
                  <i className="fa-solid fa-lock"></i>
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
