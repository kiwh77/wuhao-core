const typescript = require('@rollup/plugin-typescript')

module.exports = {
  input: './src/index.ts',
  output: {
    file: './dist/index.js',
    format: 'es',
    sourcemap: true
  },
  external: ['vue', 'vue-router', 'wuhao-network'],
  plugins: [typescript()]
}
