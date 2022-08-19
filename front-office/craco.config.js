const path = require('path')
const { getLoader, loaderByName } = require('@craco/craco')

const packages = []
console.log(__dirname)
packages.push(path.join(__dirname, '../shared')) //you can add as many as you need, but this gets slightly annoying

module.exports = {
  webpack: {
    configure: (webpackConfig, arg) => {
      const { isFound, match } = getLoader(webpackConfig, loaderByName('babel-loader'))
      if (isFound) {
        const include = Array.isArray(match.loader.include) ? match.loader.include : [match.loader.include]

        match.loader.include = include.concat(packages)
      }
      return webpackConfig
    }
  }
}
