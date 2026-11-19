import { Images } from "lucide-react";
import {
  limitGallery,
  type GalleryImage,
} from "../../api/gallery";
import {
  GalleryLightbox,
  GalleryTile,
  useGalleryLightbox,
} from "./gallery";

export type { GalleryImage };

type ImageGalleryProps = {
  images: GalleryImage[];
  eyebrow: string;
  title: string;
  className?: string;
};

/**
 * Façade galerie : compose grille + lightbox sans connaître Strapi.
 */
export function ImageGallery({
  images,
  eyebrow,
  title,
  className = "",
}: ImageGalleryProps) {
  const gallery = limitGallery(images);
  const lightbox = useGalleryLightbox(gallery.length);

  if (gallery.length === 0) return null;

  return (
    <>
      <section
        className={`mt-12 md:mt-16 ${className}`.trim()}
        aria-labelledby="gallery-title"
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-[var(--burgundy)] mb-3">
              <Images size={18} />
              <span className="text-sm uppercase tracking-[0.18em]">
                {eyebrow}
              </span>
            </div>
            <h2
              id="gallery-title"
              className="text-4xl md:text-5xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {title}
            </h2>
          </div>
          <p className="text-muted-foreground">
            {gallery.length.toString().padStart(2, "0")} photographie
            {gallery.length > 1 ? "s" : ""}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 md:auto-rows-[180px] gap-3">
          {gallery.map((photo, index) => (
            <GalleryTile
              key={`${photo.src}-${index}`}
              image={photo}
              index={index}
              total={gallery.length}
              onSelect={lightbox.open}
            />
          ))}
        </div>
      </section>

      {lightbox.isOpen && lightbox.selectedIndex !== null && (
        <GalleryLightbox
          images={gallery}
          selectedIndex={lightbox.selectedIndex}
          onClose={lightbox.close}
          onPrevious={lightbox.previous}
          onNext={lightbox.next}
        />
      )}
    </>
  );
}
