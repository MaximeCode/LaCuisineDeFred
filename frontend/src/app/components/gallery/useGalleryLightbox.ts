import { useEffect, useState } from "react";

/**
 * État + navigation clavier de la lightbox.
 * Isolé du rendu (SRP) pour réutilisation / tests.
 */
export function useGalleryLightbox(imageCount: number) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedIndex === null || imageCount <= 0) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedIndex(null);
      if (event.key === "ArrowLeft") {
        setSelectedIndex(
          (current) =>
            current === null ? null : (current - 1 + imageCount) % imageCount,
        );
      }
      if (event.key === "ArrowRight") {
        setSelectedIndex((current) =>
          current === null ? null : (current + 1) % imageCount,
        );
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, imageCount]);

  return {
    selectedIndex,
    isOpen: selectedIndex !== null,
    open: (index: number) => setSelectedIndex(index),
    close: () => setSelectedIndex(null),
    previous: () => {
      if (selectedIndex === null || imageCount <= 0) return;
      setSelectedIndex((selectedIndex - 1 + imageCount) % imageCount);
    },
    next: () => {
      if (selectedIndex === null || imageCount <= 0) return;
      setSelectedIndex((selectedIndex + 1) % imageCount);
    },
  };
}
