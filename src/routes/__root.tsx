import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { CollectionProvider } from '../components/CollectionProvider'
import { SolvedProvider } from '../components/SolvedTracker'
import { GlobalFocusIndicator } from '../components/GlobalFocusIndicator'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var resolved;if(stored==='light'){resolved='light';}else if(stored==='dark'){resolved='dark';}else if(stored==='auto'){resolved=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';}else{resolved='dark';}var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);root.setAttribute('data-theme',resolved);root.style.colorScheme=resolved;}catch(e){}})();`

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'DSA Mastery — 38,000+ problems across 14 topics',
      },
      {
        name: 'description',
        content: 'Master Data Structures & Algorithms with 38,000+ curated problems across 14 topics. Practice with LeetCode, Codeforces, and 25+ platforms. Track your progress.',
      },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'DSA Mastery' },
      { property: 'og:title', content: 'DSA Mastery — 38,000+ problems across 14 topics' },
      { property: 'og:description', content: 'Master Data Structures & Algorithms with 38,000+ curated problems across 14 topics.' },
      { property: 'og:url', content: 'https://learn-dsa.frontendx.dev' },
      { property: 'og:image', content: 'https://learn-dsa.frontendx.dev/og-image.png' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'DSA Mastery — 38,000+ problems across 14 topics' },
      { name: 'twitter:description', content: 'Master Data Structures & Algorithms with 38,000+ curated problems across 14 topics.' },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      { rel: 'canonical', href: 'https://learn-dsa.frontendx.dev' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'DSA Mastery',
            url: 'https://learn-dsa.frontendx.dev',
            description: 'Master Data Structures & Algorithms with 38,000+ curated problems across 14 topics and 25+ platforms.',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://learn-dsa.frontendx.dev/explore?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          }),
        }} />
      </head>
      <body className="font-sans antialiased [overflow-wrap:anywhere] selection:bg-[rgba(79,184,178,0.24)]">
        <CollectionProvider>
          <SolvedProvider>
            <Header />
            {children}
            <Footer />
            <GlobalFocusIndicator />
          </SolvedProvider>
        </CollectionProvider>
        <Scripts />
      </body>
    </html>
  )
}
