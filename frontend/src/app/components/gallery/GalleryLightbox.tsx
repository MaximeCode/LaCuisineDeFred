import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryImage } from "../../../api/gallery";
import { ImageWithFallback } from "../figma/ImageWithFallback";

type GalleryLightboxProps = {
  images: GalleryImage[];
  selectedIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

const navButtonClassName =
  "w-11 h-11 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer";

export function GalleryLightbox({
  images,
  selectedIndex,
  onClose,
  onPrevious,
  onNext,
}: GalleryLightboxProps) {
  const selectedImage = images[selectedIndex];
  if (!selectedImage) return null;

  const hasMultiple = images.length > 1;

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#16090d]/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${selectedIndex + 1} sur ${images.length}`}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className={`absolute right-5 top-5 md:right-8 md:top-8 z-10 ${navButtonClassName}`}
        aria-label="Fermer la galerie"
      >
        <X size={22} />
      </button>

      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onPrevious();
            }}
            className={`absolute left-3 md:left-8 z-10 hidden lg:flex ${navButtonClassName}`}
            aria-label="Photo précédente"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onNext();
            }}
            className={`absolute right-3 md:right-8 z-10 hidden lg:flex ${navButtonClassName}`}
            aria-label="Photo suivante"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      <figure
        className="max-w-6xl max-h-[82vh] flex flex-col items-center"
        onClick={(event) => event.stopPropagation()}
      >
        <ImageWithFallback
          src={selectedImage.src}
          alt={selectedImage.alt}
          className="max-w-full max-h-[68vh] lg:max-h-[76vh] object-contain rounded-lg"
        />

        {hasMultiple ? (
          <div className="mt-4 flex items-center justify-center gap-4 lg:gap-0">
            <button
              type="button"
              onClick={onPrevious}
              className={`lg:hidden ${navButtonClassName}`}
              aria-label="Photo précédente"
            >
              <ChevronLeft size={24} />
            </button>
            <figcaption className="text-white/70 text-sm min-w-[4.5rem] text-center">
              {String(selectedIndex + 1).padStart(2, "0")} /{" "}
              {String(images.length).padStart(2, "0")}
            </figcaption>
            <button
              type="button"
              onClick={onNext}
              className={`lg:hidden ${navButtonClassName}`}
              aria-label="Photo suivante"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        ) : (
          <figcaption className="text-white/70 text-sm mt-4">
            {String(selectedIndex + 1).padStart(2, "0")} /{" "}
            {String(images.length).padStart(2, "0")}
          </figcaption>
        )}
      </figure>
    </div>
  );
}
