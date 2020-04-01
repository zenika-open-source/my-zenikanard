import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'src/svg.js',
  output: {
    file: 'dist/svg/svg.js',
    format: 'cjs',
    exports: 'named',
  },

  plugins: [resolve({ preferBuiltins: true }), commonjs()],
  external: [ 'fs' ]
}
