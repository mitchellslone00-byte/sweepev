import { imgSize } from "@/lib/img-size";

/**
 * Plain <img> for an image in /public, with intrinsic width/height filled in from the
 * file so the browser reserves aspect-ratio space and the page doesn't shift as it loads
 * (CLS). Tailwind Preflight's `height: auto` keeps it responsive within the given classes.
 * Server component only — reads the file at build time.
 */
export function PublicImg({
  src,
  alt,
  className,
  loading = "lazy",
}: {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
}) {
  const d = imgSize(src);
  // Always force height:auto so the intrinsic height attribute reserves aspect-ratio
  // space (no CLS) without stretching the image, independent of any global img reset.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className ? `${className} h-auto` : "h-auto"}
      loading={loading}
      {...(d ? { width: d.width, height: d.height } : {})}
    />
  );
}
