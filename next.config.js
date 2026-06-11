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
        destination: '/portfolio/community-engagement',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
