const { By, until } = require('selenium-webdriver')
const { defineSupportCode } = require('cucumber')

defineSupportCode(function ({ Given, When, Then }) {
  Given('將 {stringInDoubleQuotes} 改為 {stringInDoubleQuotes}', function (select, option) {
    const selector = `select[data-name=${select}]>option[data-name=${option}]`
    return this.driver.findElement(By.css(selector)).click()
  })

  Given('點選 {stringInDoubleQuotes} 連結', function (linkText) {
    const promise = this.driver.findElement(By.linkText(linkText))
      .then(element => element.click())

    if (linkText === '更多選項') {
      promise.then(() => {
        this.driver.sleep(350) // bootstrap default transition time
        return this.driver.wait(until.elementIsVisible(this.driver.findElement(By.css('#more-options'))))
      })
    }

    return promise
  })
})
