const { By, until } = require('selenium-webdriver')
const { defineSupportCode } = require('cucumber')

defineSupportCode(function ({ Given, When, Then }) {
  Given('將 {stringInDoubleQuotes} 改為 {stringInDoubleQuotes}', function (select, option) {
    const selector = `select[data-name=${select}]>option[data-name=${option}]`
    return this.driver.findElement(By.css(selector)).click()
  })

  Then('選擇日期的下拉式選單中 {stringInDoubleQuotes} 應該被標示為 {stringInDoubleQuotes}', function (dayOfWeek, dayType) {
    const selector = `select#day>option[data-name=${dayOfWeek}]`
    return this.driver.wait(until.elementTextContains(this.driver.findElement(By.css(selector)), dayType))
  })
})
