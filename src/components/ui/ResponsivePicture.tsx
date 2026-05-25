import type { ImgHTMLAttributes } from "react";

export type PictureSrc = {
  sources: Record<string, string>;
  img: { src: string; w: number; h: number };
};

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "width" | "height"> & {
  src: PictureSrc;
  alt: string;
  sizes?: string;
  eager?: boolean;
  priority?: boolean;
  pictureClassName?: string;
};

/**
 * Renders a <picture> with AVIF + WebP sources from vite-imagetools.
 * Usage:
 *   import hero from "@/assets/hero.png?w=400;800;1200&format=avif;webp&as=picture";
 *   <ResponsivePicture src={hero} alt="..." sizes="100vw" />
 */
export function ResponsivePicture({
  src,
  alt,
  sizes = "100vw",
  eager,
  priority,
  className,
  pictureClassName,
  ...imgProps
}: Props) {
  return (
    <picture className={pictureClassName}>
      {Object.entries(src.sources).map(([type, srcset]) => (
        <source key={type} type={`image/${type}`} srcSet={srcset} sizes={sizes} />
      ))}
      <img
        {...imgProps}
        src={src.img.src}
        width={src.img.w}
        height={src.img.h}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className={className}
      />
    </picture>
  );
}
