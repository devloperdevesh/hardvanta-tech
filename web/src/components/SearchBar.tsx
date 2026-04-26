"use client";

import { useState, useEffect } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (!query) return;

      const res = await fetch(`/api/products?search=${query}`);
      const data = await res.json();
      setResults(data);
    }, 300); // debounce

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div>
      <input
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div>
        {results.map((p: any) => (
          <div key={p.id}>{p.name}</div>
        ))}
      </div>
    </div>
  );
}
