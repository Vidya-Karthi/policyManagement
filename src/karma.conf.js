// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
process.env.NO_PROXY = "localhost, 0.0.0.0/4201, 0.0.0.0/9876";
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['parallel', 'jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-parallel'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    parallelOptions: {
      executors: Math.ceil((require('os').cpus().length)/2),
      shardStrategy: 'round-robin',
      shardThreshold: 100
    },
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
      // captureConsole: false
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['CustomHeadlessChrome'],
    customLaunchers: {
      CustomHeadlessChrome: {
        base: 'ChromeHeadless',
        flags: [
          '--disable-gpu',
          '--no-sandbox',
          '--disable-web-security'
        ]
      }
    },
    singleRun: true,
    restartOnFileChange: true,
    captureTimeout: 600000,
    browserDisconnectTimeout: 600000,
    browserNoActivityTimeout: 600000,
    browserDisconnectTolerance: 1
  });
};
