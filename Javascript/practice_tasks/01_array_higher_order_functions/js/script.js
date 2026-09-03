// Task 5: Higher-Order Functions (Filter, Map, Reduce, Sort)
// Problem: Given an array of store inventory items:
// 1. Filter items that are in stock
// 2. Apply a 10% discount on prices
// 3. Calculate total inventory valuation using reduce
// 4. Sort items by rating descending

const inventory = [
    { id: 101, name: 'Mechanical Keyboard', price: 120, inStock: true, rating: 4.8, category: 'Electronics' },
    { id: 102, name: 'USB-C Cable', price: 15, inStock: false, rating: 4.2, category: 'Accessories' },
    { id: 103, name: 'Ergonomic Mouse', price: 65, inStock: true, rating: 4.6, category: 'Electronics' },
    { id: 104, name: 'Monitor Arm', price: 80, inStock: true, rating: 4.9, category: 'Office' },
    { id: 105, name: 'Desk Mat', price: 25, inStock: false, rating: 4.1, category: 'Accessories' },
    { id: 106, name: 'Webcam 1080p', price: 90, inStock: true, rating: 4.5, category: 'Electronics' }
];

console.log('--- Task 5: Array Higher-Order Functions ---');

// 1. Filter in-stock items
const availableItems = inventory.filter(item => item.inStock);
console.log('1. Available Items:', availableItems);

// 2. Map: Apply 10% discount
const discountedItems = availableItems.map(item => ({
    ...item,
    discountedPrice: Number((item.price * 0.90).toFixed(2))
}));
console.log('2. Discounted Items (10% OFF):', discountedItems);

// 3. Reduce: Calculate total cart/inventory valuation
const totalValue = discountedItems.reduce((acc, item) => acc + item.discountedPrice, 0);
console.log('3. Total Inventory Valuation: $' + totalValue.toFixed(2));

// 4. Sort by rating descending
const topRated = [...discountedItems].sort((a, b) => b.rating - a.rating);
console.log('4. Top Rated Available Products:', topRated);

// Render summary to DOM if running in browser
if (typeof document !== 'undefined') {
    const outputEl = document.getElementById('output');
    if (outputEl) {
        outputEl.innerHTML = `
            <p><strong>Available Items:</strong> ${availableItems.length} of ${inventory.length}</p>
            <p><strong>Total Value (after 10% discount):</strong> $${totalValue.toFixed(2)}</p>
            <p><strong>Top Rated Product:</strong> ${topRated[0].name} (⭐ ${topRated[0].rating})</p>
            <pre>${JSON.stringify(topRated, null, 2)}</pre>
        `;
    }
}
