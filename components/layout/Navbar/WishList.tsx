"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";

const WishList = () => {
  const { wishlistCount } = useWishlist();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  return (
    <Link href="/wishlist" className="relative group flex items-center">
      <Heart className="w-5 h-5 text-text group-hover:text-accent transition-colors duration-300" />
      <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-primary text-white text-[10px] flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
        {isMounted ? wishlistCount : 0}
      </span>
    </Link>
  );
};

export default WishList;
