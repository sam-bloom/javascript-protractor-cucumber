var {Given, When, Then} = require('cucumber');
var {Before,BeforeAll,After,AfterAll} = require('cucumber');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

After(function (scenarioResult) {
  let self = this;

  if (scenarioResult.result.status === 'failed') {
    return browser.takeScreenshot()
      .then(function (screenshot) {
        const decodedImage = new Buffer(screenshot.replace(/^data:image\/png;base64,/, ''), 'base64');
        self.attach(decodedImage, 'image/png');
        console.log("scenarioResult = ", scenarioResult.result.status);
      });

  }

});

Given(/^I go to "([^"]*)"$/, function (website) {

  //browser.get(website);
  //browser.driver.ignoreSynchronization = true;
  //browser.waitForAngularEnabled(false);
  //browser.driver.manage().window().maximize();
  return browser.get(website);
  //return console.log('Given - user launches livetraffic website ' + website);
});

When(/^user validate the homepage title as "([^"]*)"$/, function (title) {

    var actualTitle = browser.getTitle();
    console.log("Expected:"+title);
    console.log("Actual:"+actualTitle);
    return expect(actualTitle).to.eventually.equal(title);
    //return console.log('When - user validate the homepage title '+title);
  });
