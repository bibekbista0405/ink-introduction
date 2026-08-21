// Kicks off the dynamic import for a lazy route chunk ahead of navigation
// (e.g. on link hover/focus) so that by the time the user actually clicks,
// the chunk is already in the browser cache and the route swap feels
// instant instead of waiting on a network request mid-transition.
// Each loader is only ever invoked once — the resulting promise is cached
// so repeated hovers don't refetch.

const prefetched = new Map<string, Promise<unknown>>();

const routeLoaders: Record<string, () => Promise<unknown>> = {
  '/about': () => import('../components/About'),
  '/features': () => import('../components/Features'),
  '/premium': () => import('../components/Premium'),
  '/faq': () => import('../components/FAQ'),
  '/safety': () => import('../components/Safety'),
  '/contact': () => import('../components/Contact'),
  '/bibek': () => import('../components/BibekDimension'),
  '/terms': () => import('../components/legal/LegalPageWrapper'),
  '/privacy': () => import('../components/legal/LegalPageWrapper'),
  '/cookies': () => import('../components/legal/LegalPageWrapper'),
  '/community-guidelines': () => import('../components/legal/LegalPageWrapper'),
  '/disclaimer': () => import('../components/legal/LegalPageWrapper'),
};

export function prefetchRoute(path: string) {
  const loader = routeLoaders[path];
  if (!loader || prefetched.has(path)) return;
  prefetched.set(path, loader().catch(() => {
    // Allow a retry later (e.g. transient network blip) instead of
    // permanently caching a failed fetch.
    prefetched.delete(path);
  }));
}
