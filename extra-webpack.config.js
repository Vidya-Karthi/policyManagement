console.log('> Run webpack extra config');

const fs = require('fs');

// Using push form instead of the static webpack config (should be resolved with Angular 8)  
// see: https://github.com/meltedspark/angular-builders/issues/235
module.exports = (config, options) => {
  config.plugins.push({
    apply: (compiler) => {
      console.debug("> Relocate index.html ");
      compiler.hooks.afterEmit.tap('MyAfterEmitPlugin', (compilation) => {
        console.debug('Execute afterEmit hook');
        fs.renameSync('./dist/isp-app/scripts/index.html', './dist/isp-app/index.html');
        fs.renameSync('./dist/isp-app/scripts/assets', './dist/isp-app/assets');
      });
    }
  });
  return config;
};