"use client";

import React, { useEffect, useRef, useState } from "react";

type PaperImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "onLoad" | "onError">;

/**
 * <img> with a Dó-paper skeleton while loading. The parent must be `position: relative`
 * (the skeleton is absolutely positioned over it).
 */
export default function PaperImage({ style, alt, src, ...rest }: PaperImageProps) {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  // Reset when the source changes; also catch images that finished loading before hydration.
  useEffect(() => {
    setFailed(false);
    const img = ref.current;
    setLoaded(!!img && img.complete && img.naturalWidth > 0);
  }, [src]);

  const baseOpacity = style?.opacity ?? 1;
  const transition = [style?.transition, "opacity 0.5s ease"].filter(Boolean).join(", ");

  return (
    <>
      {!loaded && (
        <div
          aria-hidden="true"
          className={failed ? "paper-skeleton paper-skeleton-failed" : "paper-skeleton"}
        />
      )}
      <img
        {...rest}
        ref={ref}
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        style={{ ...style, opacity: loaded ? baseOpacity : 0, transition }}
      />
    </>
  );
}
