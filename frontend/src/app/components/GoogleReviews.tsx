import { Star } from 'lucide-react';

type GoogleReviewsProps = {
  rating?: number;
  reviewsUrl?: string;
  className?: string;
};

/**
 * Bloc avis Google (conservé pour une future réintégration).
 * Non utilisé actuellement dans le Footer.
 */
export function GoogleReviews({
  rating = 4.9,
  reviewsUrl = '#',
  className = '',
}: GoogleReviewsProps) {
  return (
    <div className={className}>
      <p className="text-xl mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
        Avis clients
      </p>
      <div className="flex items-center gap-2 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={18}
            fill="var(--burgundy)"
            className="text-[var(--burgundy)]"
          />
        ))}
      </div>
      <p className="text-gray-300 mb-3">{rating}/5 basé sur les avis Google</p>
      <a href={reviewsUrl} className="text-[var(--burgundy)] hover:underline">
        Voir tous les avis
      </a>
    </div>
  );
}
