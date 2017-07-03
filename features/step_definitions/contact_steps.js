const { Builder, By, until } = require('selenium-webdriver');
const { defineSupportCode } = require('cucumber');

defineSupportCode(function ({ Given, When, Then }) {
  Given('點選 {stringInDoubleQuotes} 連結', function (linkText) {
    return this.driver.findElement({ linkText })
                      .then(element => element.click())
  })

  Then('應該出現工會列表', function () {
    return driver.wait(until.elementLocated(By.className('union-list')))
  })

  Then('包含 {stringInDoubleQuotes} 的聯絡方式', function (union) {
    return driver.wait(until.elementTextContains(By.className('union'), union))
  })

  Then('應該出現縣市的選擇項目', function () {
    return driver.wait(util.elementLocated(by.className('cities-selector')))
  })

  Then('點選 {stringInDoubleQuotes} 後，應該出現 {stringInDoubleQuotes} 的聯絡方式', function (city, departmentOfLabor) {
    const selector = '.cities-selector > option[value="台北市"]'
    return driver.findElement(By.css(selector)).click()
                 .then(_ => driver.wait(until.elementTextContains(By.className('city'), city)))
  })
})
