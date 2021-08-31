const withPlugins = require('next-compose-plugins')
const withMDX = require('@next/mdx')({
  extension: /\.mdx$/
})

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx'],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.py/,
      type: 'asset/source'
    })

    return config
  }
}

module.exports = withPlugins([[withMDX]], nextConfig)
