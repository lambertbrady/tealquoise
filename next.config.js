const withPlugins = require('next-compose-plugins')
const withMDX = require('@next/mdx')({
  extension: /\.mdx$/
})

const nextConfig = {
  future: {
    webpack5: true
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.py/,
      type: 'asset/source'
    })

    return config
  }
}

module.exports = withPlugins(
  [
    withMDX({
      pageExtensions: ['js', 'jsx', 'mdx']
    })
  ],
  nextConfig
)
