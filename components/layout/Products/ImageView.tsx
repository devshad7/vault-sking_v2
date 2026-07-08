"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";

interface Props {
  images?: string;
  isStock?: number;
}

const ImageView = ({ images, isStock }: Props) => {
  const active = images;

  if (!active) return null;

  return (
    <div className="w-full lg:w-[42%] flex flex-col gap-4">
      <div
        className="
          relative
          w-full
          h-105
          lg:h-130
          bg-surface
          border border-border
          rounded-2xl
          overflow-hidden
          shadow-sm
        "
      >
        <AnimatePresence>
          <motion.div
            key={active}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              duration: 0.15,
              ease: "easeInOut",
            }}
            className="absolute inset-0"
          >
            <Image
              src={active}
              alt="Product Image"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={`
                object-contain
                p-4
                transition-all
                duration-350
                ease-out
                hover:scale-[1.03]
                ${isStock === 0 ? "opacity-50" : ""}
              `}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap gap-3">
        {images && (
          <button
            key={images}
            // onClick={() => setActive(images)}
            className={`
              h-20
              w-20
              rounded-xl
              overflow-hidden
              border-2
              bg-white
              transition-all
              duration-300
              ${
                active === images
                  ? "border-primary shadow-md scale-105"
                  : "border-border hover:border-primary/40 hover:scale-105"
              }
            `}
          >
            <Image
              src={images}
              alt="Thumbnail"
              width={100}
              height={100}
              className="w-full h-full object-contain"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageView;
