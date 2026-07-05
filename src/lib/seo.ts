export const SITE_URL = 'https://royalcrownbearings.lk';
export const SITE_NAME = 'Royal Crown Bearings';

function hasFileExtension(pathname: string) {
  const lastSegment = pathname.split('/').pop() ?? '';
  return /\.[a-z0-9]+$/i.test(lastSegment);
}

function normalizeInternalUrl(url: URL) {
  const siteOrigin = new URL(SITE_URL).origin;
  if (url.origin === siteOrigin && url.pathname !== '/' && !url.pathname.endsWith('/') && !hasFileExtension(url.pathname)) {
    url.pathname = `${url.pathname}/`;
  }

  return url.href;
}

export function absoluteUrl(path = '/') {
  return normalizeInternalUrl(new URL(path || '/', SITE_URL));
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function productPath(product: { id: string | number; category?: string | null }) {
  const id = encodeURIComponent(String(product.id).trim());
  const category = String(product.category ?? '').trim();

  return `/product/${category ? `${encodeURIComponent(category)}-` : ''}${id}`;
}

export function productAvailabilityUrl(availability = 'In Stock') {
  if (availability === 'Out of Stock') return 'https://schema.org/OutOfStock';
  if (availability === 'Pre-order') return 'https://schema.org/PreOrder';
  return 'https://schema.org/InStock';
}
