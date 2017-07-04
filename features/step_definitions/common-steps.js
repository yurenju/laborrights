const { By, until } = require('selenium-webdriver')
const { defineSupportCode } = require('cucumber')

defineSupportCode(function ({ Given, When, Then }) {
  Given('點選 {stringInDoubleQuotes} 連結', function (linkText) {
    const promise = this.driver.findElement(By.linkText(linkText))
      .then(element => element.click())

    if (linkText === '更多選項') {
      promise.then(() => {
        return this.driver.wait(until.elementIsVisible(this.driver.findElement(By.css('select[data-name=例假日]'))))
      })
    }

    return promise
  })
})
