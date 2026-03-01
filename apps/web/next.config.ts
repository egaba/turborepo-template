import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  poweredByHeader: false,
  eslint: {
    dirs: ['app', 'components', 'features', 'lib', 'providers', 'types'],
  },
}

export default nextConfig
