"use client";

import { useState, type ImgHTMLAttributes } from "react";

type RevealImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "alt"> & {
  alt: string;
};

export function RevealImage({ alt, className = "", onLoad, ...props }: RevealImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      {...props}
      alt={alt}
      className={`${className} transition-opacity duration-700 ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
      onLoad={(event) => {
        setLoaded(true);
        onLoad?.(event);
      }}
      onError={() => setLoaded(true)}
    />
  );
}
