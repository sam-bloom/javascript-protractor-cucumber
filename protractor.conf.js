var PropertiesReader = require('properties-reader');
var prop = PropertiesReader('./prop.properties');

exports.config = {
    //seleniumAddress: 'http://localhost:4444/wd/hub',
    
    seleniumAddress: prop.get('seleniumAddress'),
    //directConnect: true,

    getPageTimeout: prop.get('pageTimeout'),
    allScriptsTimeout: prop.get('scriptTimeout'),

    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
   
    multiCapabilities: [
      {"browserName": prop.get('browser')}
      //{"browserName": 'chrome'}
    ],
    
    plugins: [{
      package: require.resolve('protractor-multiple-cucumber-html-reporter-plugin'),
      options:{
        automaticallyGenerateReport: true,
        removeExistingJsonReportFile: true,
        displayDuration: true,
        reportName: 'TfNSW-Live Traffic - E2E Test Automation Report',
        pageFooter: '<div><p>Created by Automation Team - Digital Mesh Platform </p></div>',
        pageTitle: 'TfNSW-LiveTraffic - Test Automation Report',
        customData: {
          title: 'Execution Details',
          data: [
            {label: 'Project', value: prop.get('projectName')},
            {label: 'Release', value: '01'},
            {label: 'Sprint', value: '01'},
            {label: 'Executed By', value: 'Samuel Allimuthu'}
          ]
        }
      }
    }],

    maxSessions: 2,

    specs: [prop.get('featurePath')],

    //specs: ['./pages/protractor-spec.js']

    cucumberOpts: {
      tags: false,
      //format: 'json:.tmp/results.json',
      format: 'json:./test-results/results.json',
      require: [
        prop.get('stepDefinitionsPath')
      ]
    }

  };