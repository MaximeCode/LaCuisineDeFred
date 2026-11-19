import type { GalleryImage } from "../../../api/gallery";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { getGalleryTileLayout } from "./getGalleryTileLayout";

type GalleryTileProps = {
  image: GalleryImage;
  index: number;
  total: number;
  onSelect: (index: number) => void;
  layoutClassName?: string;
};

export function GalleryTile({
  image,
  index,
  total,
  onSelect,
  layoutClassName = getGalleryTileLayout(index),
}: GalleryTileProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(index)}
      className={`group relative overflow-hidden rounded-xl bg-muted text-left cursor-pointer aspect-[4/3] md:aspect-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--burgundy)] focus-visible:ring-offset-2 ${layoutClassName}`}
      aria-label={`Ouvrir la photo ${index + 1} sur ${total}`}
    >
      <ImageWithFallback
        src={image.src}
        alt={image.alt}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="absolute bottom-4 left-4 text-white text-sm tracking-wide opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        {String(index + 1).padStart(2, "0")} — Voir la photo
      </span>
    </button>
  );
}
