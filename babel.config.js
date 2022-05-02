module.exports = {
  'presets': [
    ['@vue/app'],
    [
      '@babel/preset-env',
      {
        'targets': {
          'browsers': [
            '> 1%',
            'last 2 versions',
            'not ie <= 8'
          ]
        }
      }
    ]
  ],
  'plugins': [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-runtime',
    [
      'component',
      {
        'libraryName': 'element-ui',
        'styleLibraryName': '~src/assets/styles/theme'
      }
    ]
  ],
  'env': {
    'test': {
      'presets': [
        '@babel/preset-env'
      ],
      'plugins': [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-syntax-dynamic-import',
        'dynamic-import-node',
        'require-context-hook',
        'transform-es2015-modules-commonjs'
      ]
    }
  }
}
