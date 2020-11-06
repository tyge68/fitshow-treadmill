const webpack = require('webpack')
let commitHash = require('child_process')
  .execSync('git rev-parse --short HEAD')
  .toString()

console.log("commitHash", commitHash)

module.exports = {
    chainWebpack: config => {
        config.plugin('define').tap(definitions => {
            definitions[0]['process.env']['GIT_HASH'] = JSON.stringify(commitHash.trim())
            return definitions
        })
    }
}