import React, { useState, useMemo, useCallback, memo } from 'react';

/**
 * FastItem Component
 * Protected by React.memo - Prevents re-rendering when other items are selected
 */
const FastItem = memo(({ item, isSelected, onSelect }) => {
  return (
    <li
      onClick={() => onSelect(item.id)}
      className={`p-3 rounded cursor-pointer transition ${
        isSelected ? 'bg-sky-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
      }`}
    >
      {item.title}
    </li>
  );
});

/**
 * OptimizedList Component
 * Demonstrates:
 * - useMemo to filter large datasets without recalculating on unrelated renders
 * - useCallback to maintain stable function references passed down to FastItem
 */
export default function OptimizedList({ items = [] }) {
  const [selectedId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // 1. useMemo: Caches filtered list unless items or searchTerm change
  const filteredItems = useMemo(() => {
    return items.filter(it => it.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [items, searchTerm]);

  // 2. useCallback: Prevents creating a new function reference every time parent re-renders
  const handleSelect = useCallback((id) => {
    setSelectedId(id);
  }, []);

  return (
    <div className="p-4 space-y-3">
      <input
        type="text"
        placeholder="Filter items..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-slate-100"
      />
      <ul className="space-y-2">
        {filteredItems.map(item => (
          <FastItem
            key={item.id}
            item={item}
            isSelected={item.id === selectedId}
            onSelect={handleSelect}
          />
        ))}
      </ul>
    </div>
  );
}
