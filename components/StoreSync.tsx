"use client";

import { useEffect } from "react";
import useStore from "@/store";

export default function StoreSync() {
  const _hasHydrated = useStore((state) => state._hasHydrated);
  const setHasHydrated = useStore((state) => state.setHasHydrated);

  useEffect(() => {
    if (!_hasHydrated) {
      setHasHydrated(true);
    }
  }, [_hasHydrated, setHasHydrated]);

  return null;
}
