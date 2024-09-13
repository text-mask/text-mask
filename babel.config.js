module.exports = {
  presets: [
    [
      '@babel/env',
      {
        corejs: '3',
        useBuiltIns: 'usage',
        targets: '>0.25% in US, not dead, Chrome 118, Samsung 24',
      },
    ],
  ],
  plugins: ['@babel/transform-object-assign'],
  sourceType: 'unambiguous',
}
