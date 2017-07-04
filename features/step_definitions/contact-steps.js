const { By, until } = require('selenium-webdriver')
const { defineSupportCode } = require('cucumber')

defineSupportCode(function ({ Given, When, Then }) {
  Then('應該出現工會列表', function () {
    return this.driver.wait(until.elementLocated(By.className('unions-selector')))
  })

  Then('包含 {stringInDoubleQuotes} 的聯絡方式', function (union) {
    return this.driver.wait(until.elementTextContains(By.className('union'), union))
  })

  Then('應該出現縣市的選擇項目', function () {
    return this.driver.wait(until.elementLocated(By.className('cities-selector')))
  })

  Then('從城市列表中點選 {stringInDoubleQuotes} 後，應該出現 {stringInDoubleQuotes} 的聯絡方式', function (city, departmentOfLabor) {
    const selector = `.cities-selector > option[data-city="${city}"]`
    return this.driver.findElement(By.css(selector)).click()
      .then(() => this.driver.findElement(By.css(`[data-name="${departmentOfLabor}"]`)))
      .then(element => this.driver.wait(until.elementTextContains(element, departmentOfLabor)))
  })

  Then('從工會列表中點選 {stringInDoubleQuotes} 後，應該出現其聯絡方式', function (union) {
    const selector = `.unions-selector > option[data-union=${union}]`
    return this.driver.findElement(By.css(selector)).click()
      .then(() => this.driver.findElement(By.css(`[data-name="${union}"]`)))
      .then(element => this.driver.wait(until.elementTextContains(element, union)))
  })
})
