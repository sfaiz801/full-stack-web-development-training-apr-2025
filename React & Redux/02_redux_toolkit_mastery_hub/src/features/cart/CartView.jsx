import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity, applyCoupon, clearCart } from './cartSlice';

const CATALOG = [
  { id: 'p3', name: '4K Ultra HD Monitor', price: 299.99, icon: 'fa-desktop' },
  { id: 'p4', name: 'Noise-Canceling Headset', price: 129.99, icon: 'fa-headphones' },
  { id: 'p5', name: 'USB-C Docking Hub', price: 59.99, icon: 'fa-plug' }
];

export default function CartView() {
  const { items, couponCode, discountPercent } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [couponInput, setCouponInput] = useState('');

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const tax = (subtotal - discountAmount) * 0.08;
  const grandTotal = subtotal - discountAmount + tax;

  return (
    <div className="glass-panel" style={{ padding: '35px', maxWidth: '850px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '25px' }}>
        <span style={{ color: '#818cf8', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Task 03: Complex State & Financial Calculations
        </span>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '6px' }}>E-Commerce Shopping Cart</h2>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Items tally, quantity modifiers, coupon validation and dynamic tax calculations.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '25px' }}>
        {/* Left Side: Items & Catalog */}
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '14px', display: 'flex', justifyContent: 'space-between' }}>
            <span>Cart Items ({items.reduce((a, b) => a + b.quantity, 0)})</span>
            {items.length > 0 && (
              <span onClick={() => dispatch(clearCart())} style={{ color: '#fb7185', fontSize: '0.8rem', cursor: 'pointer' }}>
                Clear All
              </span>
            )}
          </h3>

          {items.length === 0 ? (
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '30px', borderRadius: '14px', textAlign: 'center', color: '#64748b' }}>
              Your shopping cart is empty.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '25px' }}>
              {items.map(item => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(99,102,241,0.15)', color: '#818cf8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
                      <i className={`fa-solid ${item.icon || 'fa-box'}`}></i>
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>{item.name}</div>
                      <div style={{ color: '#94a3b8', fontSize: '0.82rem' }}>${item.price.toFixed(2)} each</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <button 
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                        style={{ padding: '4px 8px', background: 'transparent', border: 'none', color: '#cbd5e1', cursor: 'pointer' }}
                        disabled={item.quantity <= 1}
                      >-</button>
                      <span style={{ padding: '0 6px', fontSize: '0.85rem', fontWeight: 600 }}>{item.quantity}</span>
                      <button 
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                        style={{ padding: '4px 8px', background: 'transparent', border: 'none', color: '#cbd5e1', cursor: 'pointer' }}
                      >+</button>
                    </div>
                    <span style={{ fontWeight: 700, minWidth: '65px', textAlign: 'right' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button 
                      onClick={() => dispatch(removeFromCart(item.id))}
                      style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', padding: '4px' }}
                      onMouseOver={(e) => e.target.style.color = '#f43f5e'}
                      onMouseOut={(e) => e.target.style.color = '#64748b'}
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Catalog to add more */}
          <h4 style={{ fontSize: '0.9rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '10px' }}>Add From Catalog</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {CATALOG.map(prod => (
              <div key={prod.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '10px', borderRadius: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{prod.name}</div>
                <div style={{ color: '#818cf8', fontWeight: 700, fontSize: '0.85rem', marginBottom: '8px' }}>${prod.price}</div>
                <button 
                  className="btn-primary" 
                  style={{ padding: '4px 10px', fontSize: '0.75rem', width: '100%' }}
                  onClick={() => dispatch(addToCart(prod))}
                >
                  + Add
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Order Summary */}
        <div style={{ background: 'rgba(10, 14, 23, 0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '18px', padding: '24px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '18px' }}>Order Summary</h3>

          {/* Coupon Input */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Have a Coupon? (Try: REDUX20 or SAVE10)</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                placeholder="Enter coupon"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                style={{ flex: 1, padding: '8px 12px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '0.85rem' }}
              />
              <button className="btn-secondary" style={{ padding: '8px 12px', fontSize: '0.82rem' }} onClick={() => dispatch(applyCoupon(couponInput))}>
                Apply
              </button>
            </div>
            {discountPercent > 0 && (
              <div style={{ color: '#34d399', fontSize: '0.8rem', marginTop: '6px', fontWeight: 600 }}>
                ✓ Coupon '{couponCode}' applied ({discountPercent}% OFF)
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: '#cbd5e1', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {discountAmount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#34d399' }}>
                <span>Discount ({discountPercent}%):</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Estimated Tax (8%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '16px', marginBottom: '20px' }}>
            <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>Total:</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#818cf8' }}>${grandTotal.toFixed(2)}</span>
          </div>

          <button 
            className="btn-primary" 
            style={{ width: '100%', padding: '12px', fontSize: '0.95rem' }}
            onClick={() => alert(`Order placed for $${grandTotal.toFixed(2)}! 🚀`)}
            disabled={items.length === 0}
          >
            Checkout Securely
          </button>
        </div>
      </div>
    </div>
  );
}
