// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './src/**/*.e2e-spec.ts'
  ],

  seleniumAddress: 'http://192.168.99.103:4544/wd/hub',
  capabilities: {
    keepAlive: false,
    "browserName": 'chrome',
    chromeOptions: {
       args: ['--window-size=1920,1080', '--headless', '--disable-gpu']
    }
  },

  baseUrl: 'http://192.168.19.76:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};
