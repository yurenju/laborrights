const { By, until } = require('selenium-webdriver')
const { defineSupportCode } = require('cucumber')

defineSupportCode(function ({ Given, When, Then }) {
  Given('點選當天是否有天災、事變或突發事件', function () {
    return this.driver.findElement(By.css('input#accident')).click()
  })

  Then('選擇日期的下拉式選單中 {stringInDoubleQuotes} 應該被標示為 {stringInDoubleQuotes}', function (dayOfWeek, dayType) {
    const selector = `select#day>option[data-name=${dayOfWeek}]`
    return this.driver.wait(until.elementTextContains(this.driver.findElement(By.css(selector)), dayType))
  })

  Then('結果應該顯示需要補修', function () {
    return this.driver.wait(until.elementIsVisible(this.driver.findElement(By.css('.extra-leave'))))
  })
})
