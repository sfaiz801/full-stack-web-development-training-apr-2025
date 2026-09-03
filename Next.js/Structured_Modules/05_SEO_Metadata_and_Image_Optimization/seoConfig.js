/**
 * Next.js 15 SEO Configuration
 * Demonstrates static & dynamic metadata definitions
 */

// 1. Static Metadata for Root/Page
export const defaultMetadata = {
  metadataBase: new URL('https://faiz-portfolio.indixpert.dev'),
  title: {
    default: 'Mohammad Faiz | Full Stack Web Developer',
    template: '%s | Mohammad Faiz'
  },
  description: 'Production-ready web applications built with Next.js 15, React 19, FastAPI, and Cloud Architecture.',
  keywords: ['Next.js', 'React', 'FastAPI', 'Full Stack Developer', 'Cloud Architecture'],
  authors: [{ name: 'Mohammad Faiz' }],
  openGraph: {
    title: 'Mohammad Faiz | Full Stack Portfolio',
    description: 'Explore live web apps, REST APIs, and responsive architectures.',
    url: 'https://faiz-portfolio.indixpert.dev',
    siteName: 'Faiz Full Stack Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Faiz Portfolio Banner'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohammad Faiz | Full Stack Portfolio',
    description: 'Explore live web apps, REST APIs, and responsive architectures.',
    creator: '@faiz_dev'
  }
};
