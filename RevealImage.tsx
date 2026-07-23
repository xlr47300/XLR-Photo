"use client";

import type { ImgHTMLAttributes } from "react";

type RevealImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "alt"> & {
  alt: string;
};

export function RevealImage({ alt, className = "", onLoad, ...props }: RevealImageProps) {
  return (
    <img
      {...props}
      alt={alt}
      className={className}
      onLoad={onLoad}
    />
  );
}
