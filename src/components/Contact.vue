<template>
  <div class="contact container">
    <p>若你遇到公司有可能違反勞基法的情況，這邊提供工會以及各地勞動局提供勞工諮詢的聯絡方法。</p>
    <h2>各地勞動局</h2>
      <form>
        <div class="form-group">
          <label class="control-label" for="cities-selector">請選擇公司所在地</label>
          <select class="form-control cities-selector" id="cities-selector" v-model="selectedCity">
            <option v-for="city in cities" :data-city="city.city" :key="city.city" :value="city">{{city.city}}</option>
          </select>
        </div>
      </form>
      <dl>
        <dt>勞動業務單位</dt>
        <dd class="department-name">{{selectedCity.name}}</dd>
      </dl>
      <dl>
        <dt>網站</dt>
        <dd>
          <a :href="selectedCity.website" target="_blank">{{selectedCity.website}}</a>
        </dd>
      </dl>
      <dl>
        <dt>電話</dt>
        <dd>{{selectedCity.phone}}</dd>
      </dl>
    <h2>工會</h2>
  </div>
</template>

<script>

const cities = require('../assets/department-of-labor').cities

export default {
  data () {
    return {
      cities,
      selectedCity: cities[0]
    }
  }
}
</script>

<style>
.contact-label {
  font-weight: bold;
}
</style>
