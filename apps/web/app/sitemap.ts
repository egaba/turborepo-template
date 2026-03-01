import type { MetadataRoute } from 'next'

const BASE_URL = process.env['NEXT_PUBLIC_APP_URL'] ?? 'http://localhost:3000'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/dashboard`,
      lastModified: new Date(),
    },
  ]
}
