require('chromedriver')
const seleniumWebdriver = require('selenium-webdriver');
const { defineSupportCode } = require('cucumber');

function CustomWorld() {
  this.driver = new seleniumWebdriver.Builder()
    .forBrowser('chrome')
    .build();
}

defineSupportCode(function ({Given, When, Then, setWorldConstructor }) {
  setWorldConstructor(CustomWorld)

  Given('使用者進入網站', function () {
    return this.driver.get('http://localhost:8080/')
  })
})
