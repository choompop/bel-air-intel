const path = require('path')

const nextConfig = {
  output: 'export',
  turbopack: {
    root: path.resolve(__dirname),
  },
}

module.exports = nextConfig
