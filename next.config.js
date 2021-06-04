module.exports = {
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
