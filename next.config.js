/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/projects/project-1',
        destination: '/portfolio/hope-street-clinic',
        permanent: true,
      },
      {
        source: '/projects/project-2',
        destination: '/portfolio/personal-content',
        permanent: true,
      },
      {
        source: '/projects/project-3',
        destination: '/portfolio/kung-fu-tea',
        permanent: true,
      },
      {
        source: '/projects/project-4',
        destination: '/portfolio',
        permanent: true,
      },
      {
        source: '/portfolio/community-engagement',
        destination: '/portfolio',
        permanent: true,
      },
      {
        source: '/portfolio/personal-content',
        destination: '/portfolio',
        permanent: true,
      },
      {
        source: '/gift-giving',
        destination: '/goals',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
