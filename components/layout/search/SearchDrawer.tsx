import { motion, AnimatePresence } from "framer-motion";
import { FocusTrap } from "focus-trap-react";
import SearchResultCard from "./SearchResultCard";
import { useSearch } from "@/hooks/useSearch";
import { LucideX } from "lucide-react";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

type SearchDrawerProps = {
  query: string;
  setQuery: (q: string) => void;
  onClose: () => void;
  onSubmit: (q: string) => void;
  placeholder?: string;
};

const drawerVariants = {
  hidden: { opacity: 0, y: "100%" },
  visible: { opacity: 1, y: 0 },
};

export default function SearchDrawer({
  query,
  setQuery,
  onClose,
  onSubmit,
  placeholder = "Search skincare, brands, categories...",
}: SearchDrawerProps) {
  const { results, loading, error, highlightedIndex, setHighlightedIndex, onArrowDown, onArrowUp } = useSearch(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const router = useRouter();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Scroll active element into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const listEl = listRef.current;
      const activeEl = listEl.children[highlightedIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({
          block: "nearest",
          behavior: "smooth"
        });
      }
    }
  }, [highlightedIndex]);

  const handleProductSelect = (slug: string, name: string) => {
    try {
      const existing = JSON.parse(localStorage.getItem("recentSearches") || "[]");
      const updated = [name, ...existing.filter((s: string) => s !== name)].slice(0, 8);
      localStorage.setItem("recentSearches", JSON.stringify(updated));
    } catch {}
    router.push(`/product/${slug}`);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown") onArrowDown();
    else if (e.key === "ArrowUp") onArrowUp();
    else if (e.key === "Enter") {
      if (highlightedIndex >= 0 && highlightedIndex < results.length) {
        const item = results[highlightedIndex];
        handleProductSelect(item.slug, item.name);
      } else if (query.trim().length > 0) {
        onSubmit(query);
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col bg-white overflow-hidden"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={drawerVariants}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <FocusTrap>
          <div
            className="flex flex-col h-full w-full pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
          >
            {/* Sticky Header */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100 bg-white shrink-0 min-h-[64px]">
              <div className="flex-1 relative flex items-center">
                <input
                  ref={inputRef}
                  type="search"
                  placeholder={placeholder}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-gray-100 rounded-xl px-4 py-3 text-base text-gray-900 focus:outline-none min-h-[44px]"
                  aria-label="Search input"
                />
              </div>
              <button
                aria-label="Close search"
                className="shrink-0 p-2 text-gray-500 hover:text-gray-900 min-h-[44px] min-w-[44px] flex items-center justify-center"
                onClick={onClose}
              >
                <LucideX size={24} />
              </button>
            </div>
            
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              {/* Suggestions */}
            {query.trim().length === 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Trending Searches</h3>
                <ul className="flex flex-col gap-1 text-base">
                  {[
                    "Vitamin C Serum",
                    "Hyaluronic Acid Serum",
                    "SPF 50 Sunscreen",
                    "Gentle Face Cleanser",
                    "Retinol Night Cream",
                    "Hydrating Moisturizer",
                  ].map((term) => (
                    <li key={term}>
                      <button
                        className="w-full text-left py-3 px-2 text-gray-800 hover:bg-gray-50 rounded-lg min-h-[44px]"
                        onClick={() => setQuery(term)}
                      >
                        {term}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* Results */}
            <div className="mt-2">
              {loading && <p className="text-sm text-gray-500 animate-pulse">Loading...</p>}
              {error && <p className="text-sm text-red-500">Error loading results.</p>}
              {!loading && !error && results.length === 0 && query.trim().length > 0 && (
                <p className="text-sm text-gray-500">No results found.</p>
              )}
              
              {results.length > 0 && (
                <>
                  <ul ref={listRef} role="listbox" className="space-y-2">
                    {results.map((item, idx) => (
                      <li
                        key={item.id}
                        role="option"
                        aria-selected={highlightedIndex === idx}
                        onMouseEnter={() => setHighlightedIndex(idx)}
                        className={`rounded-xl ${highlightedIndex === idx ? 'bg-gray-100' : ''}`}
                      >
                        <SearchResultCard
                          result={item}
                          onSelect={() => handleProductSelect(item.slug, item.name)}
                          isHighlighted={highlightedIndex === idx}
                        />
                      </li>
                    ))}
                  </ul>
                  
                  {/* View all matching products link */}
                  <button
                    onClick={() => onSubmit(query)}
                    className="w-full text-center py-3 mt-4 bg-primary text-white text-sm font-semibold rounded-xl shadow-sm hover:bg-primary/95 transition-colors"
                  >
                    View all results for &ldquo;{query}&rdquo;
                  </button>
                </>
              )}
            </div>
          </div>
          </div>
        </FocusTrap>
      </motion.div>
    </AnimatePresence>
  );
}
