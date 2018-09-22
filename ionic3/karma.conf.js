module.exports = function (config) {
  var _config = {

    frameworks: [ 'jasmine', 'karma-typescript' ],

    files: [
      { pattern: 'test/index.spec.ts' },
      { pattern: 'src/**/*.+(ts|html)' },
      { pattern: 'test/**/*.+(ts|html)' }
    ],

    preprocessors: {
      "**/*.ts": [ 'karma-typescript' ]
    },

    karmaTypescriptConfig: {
      tsconfig: './tsconfig.test.json'
    },

    reporters: [ 'progress', 'karma-typescript' ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: [ 'PhantomJS' ],
    singleRun: true
  };

  config.set(_config);
};