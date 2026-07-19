"use client";

import { AnimatePresence, m } from "motion/react";
import Image from "next/image";
import { useState } from "react";

interface Props {
  images?: Array<{
    src: string;
    alt: string;
  }>;
  isStock?: number;
}

const ImageView = ({ images = [], isStock }: Props) => {
  const validImages = images.filter(
    (image): image is { src: string; alt: string } =>
      typeof image?.src === "string" && image.src.trim().length > 0,
  );

  const [active, setActive] = useState(validImages[0]);

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
        <AnimatePresence mode="wait">
          <m.div
            key={active.src}
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
              src={active.src}
              alt={active.alt}
              fill
              priority
              fetchPriority="high"
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
          </m.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap gap-3">
        {validImages.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActive(image)}
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
                active.src === image.src
                  ? "border-primary shadow-md scale-105"
                  : "border-border hover:border-primary/40 hover:scale-105"
              }
            `}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={100}
              height={100}
              priority={index === 0}
              fetchPriority={index === 0 ? "high" : "auto"}
              loading={index === 0 ? undefined : "lazy"}
              className="w-full h-full object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageView;