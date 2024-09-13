module.exports = {
  extends: '../babel.config.js',
  presets: [
    [
      '@babel/react',
      {
        runtime: 'automatic',
      },
    ],
  ],
  include: ['../**/*.js'],
}
