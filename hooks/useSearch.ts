import { useState, useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';
import { SearchResult, rankResults } from '@/types/search';
import { getProducts } from '@/data/products';

export function useSearch(query: string) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const fetchResults = (searchTerm: string) => {
    if (!searchTerm || searchTerm.trim().length === 0) {
      setResults([]);
      setLoading(false);
      setError(null);
      setHighlightedIndex(-1);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const allProducts = getProducts();
      // Map local products to SearchResult format
      const searchData: SearchResult[] = allProducts.map(p => ({
        id: p._id,
        name: p.name,
        slug: p.slug.current,
        price: p.price.toString(),
        imageUrl: p.images?.[0]?.url || "",
        category: p.category,
        brand: p.brand,
        variant: p.variant || "",
        status: p.status || null,
        rating: p.ratings
      }));
      
      const ranked = rankResults(searchTerm, searchData);
      setResults(ranked);
      setHighlightedIndex(-1);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Error fetching results';
      setError(msg);
      setResults([]);
      setHighlightedIndex(-1);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetch = useMemo(() => debounce(fetchResults, 300), []);

  const onArrowDown = () => {
    setHighlightedIndex((prev) => {
      const next = prev + 1;
      return next >= results.length ? results.length - 1 : next;
    });
  };

  const onArrowUp = () => {
    setHighlightedIndex((prev) => {
      const next = prev - 1;
      return next < 0 ? 0 : next;
    });
  };

  const onEnter = (onSubmit: (q: string) => void) => {
    if (highlightedIndex >= 0 && highlightedIndex < results.length) {
      onSubmit(results[highlightedIndex].name);
    }
  };

  useEffect(() => {
    debouncedFetch(query);
    return () => {
      debouncedFetch.cancel();
    };
  }, [query, debouncedFetch]);

  return {
    results,
    loading,
    error,
    highlightedIndex,
    setHighlightedIndex,
    onArrowDown,
    onArrowUp,
    onEnter,
  };
}
