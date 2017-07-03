const { Builder, By, until } = require('selenium-webdriver');
const { defineSupportCode } = require('cucumber');

defineSupportCode(function ({ Given, When, Then }) {
  Given('點選 {stringInDoubleQuotes} 連結', function (linkText) {
    return this.driver.findElement(By.linkText(linkText))
                      .then(element => element.click())
  })

  Then('應該出現工會列表', function () {
    return this.driver.wait(until.elementLocated(By.className('union-list')))
  })

  Then('包含 {stringInDoubleQuotes} 的聯絡方式', function (union) {
    return this.driver.wait(until.elementTextContains(By.className('union'), union))
  })

  Then('應該出現縣市的選擇項目', function () {
    return this.driver.wait(until.elementLocated(By.className('cities-selector')))
  })

  Then('點選 {stringInDoubleQuotes} 後，應該出現 {stringInDoubleQuotes} 的聯絡方式', function (city, departmentOfLabor) {
    const selector = `.cities-selector > option[data-city="${city}"]`
    const department = this.driver.findElement(By.className('department-name'))
    return this.driver.findElement(By.css(selector)).click()
                      .then(() => this.driver.wait(until.elementTextContains(department, departmentOfLabor)))
  })
})
