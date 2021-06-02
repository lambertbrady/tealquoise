module.exports = {
  webpack: (config) => {
    // syntax for webpack 5 (but custom next.js config uses webpack 4)
    // config.module.rules.push({
    //   test: /\.py/,
    //   type: 'asset/resource'
    // })
    config.module.rules.push({
      test: /\.py/,
      use: 'raw-loader'
    })

    return config
  }
}
