require('chromedriver')
const seleniumWebdriver = require('selenium-webdriver')
const {Options} = require('selenium-webdriver/chrome')
const { defineSupportCode } = require('cucumber')

function CustomWorld () {
  const options = new Options()
  options.addArguments('--headless')
  this.driver = new seleniumWebdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build()
}

defineSupportCode(function ({ Given, When, Then, setWorldConstructor }) {
  setWorldConstructor(CustomWorld)

  Given('使用者進入網站', function () {
    return this.driver.get('http://localhost:8080/')
  })
})
