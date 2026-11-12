import { useEffect } from 'react';
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL, buildTitle } from '../../utils/seo';

type SeoProps = {
  title: string;
  description?: string;
  image?: string;
  /** Ne pas indexer (ex. page 404). */
  noindex?: boolean;
  /** Utiliser `title` tel quel, sans suffixe site. */
  absoluteTitle?: boolean;
  /** Données structurées JSON-LD (schema.org). */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

const JSON_LD_SCRIPT_ID = 'lcdf-jsonld';

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

function resolveAbsoluteImage(image?: string): string | undefined {
  if (!image) return undefined;
  if (image.startsWith('http://') || image.startsWith('https://')) return image;
  const origin =
    (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') ||
    (typeof window !== 'undefined' ? window.location.origin : SITE_URL);
  return `${origin}${image.startsWith('/') ? image : `/${image}`}`;
}

/**
 * Met à jour title / description / Open Graph côté client (SPA Vite).
 * Le HTML initial (index.html) reste le fallback pour les crawlers sans JS.
 */
export function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  image,
  noindex = false,
  absoluteTitle = false,
  jsonLd,
}: SeoProps) {
  useEffect(() => {
    const fullTitle = absoluteTitle ? title : buildTitle(title);
    document.title = fullTitle;

    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:locale', 'fr_FR');
    upsertMeta('property', 'og:site_name', SITE_NAME);

    const canonicalUrl = `${window.location.origin}${window.location.pathname}`;
    upsertCanonical(canonicalUrl);
    upsertMeta('property', 'og:url', canonicalUrl);

    const absoluteImage = resolveAbsoluteImage(image);
    if (absoluteImage) {
      upsertMeta('property', 'og:image', absoluteImage);
    }

    upsertMeta('name', 'twitter:card', absoluteImage ? 'summary_large_image' : 'summary');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
    if (absoluteImage) {
      upsertMeta('name', 'twitter:image', absoluteImage);
    }

    const existing = document.getElementById(JSON_LD_SCRIPT_ID);
    if (jsonLd) {
      const script = existing ?? document.createElement('script');
      script.id = JSON_LD_SCRIPT_ID;
      script.setAttribute('type', 'application/ld+json');
      script.textContent = JSON.stringify(jsonLd);
      if (!existing) {
        document.head.appendChild(script);
      }
    } else if (existing) {
      existing.remove();
    }

    return () => {
      const script = document.getElementById(JSON_LD_SCRIPT_ID);
      if (script && jsonLd) {
        script.remove();
      }
    };
  }, [title, description, image, noindex, absoluteTitle, jsonLd]);

  return null;
}
