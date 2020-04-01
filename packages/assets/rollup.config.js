import typescript from '@rollup/plugin-typescript';
import svgr from '@svgr/rollup'

export default [
  {
    input: 'src/layers.ts',
    output: {
      dir: 'dist',
      format: 'cjs',
    },
    plugins: [
      typescript({
        declaration: true,
        declarationDir: 'dist',
        rootDir: 'src/'
      }),
    ],
  },
  {
    input: 'src/assets.ts',
    output: {
      dir: 'dist',
      format: 'cjs',
    },
    plugins: [
      svgr(),
      typescript({
        declaration: true,
        declarationDir: 'dist',
        rootDir: 'src/'
      }),
    ],
    external: ['react'],
  },
]
