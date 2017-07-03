<template>
  <div class="contact container">
    <p>若你遇到公司有可能違反勞基法的情況，這邊提供工會以及各地勞動局提供勞工諮詢的聯絡方法。</p>


    <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
      <div class="panel panel-info">
        <div class="panel-heading" role="tab" id="heading-department">
          <div class="panel-title">
            <a role="button" data-toggle="collapse" data-parent="#accordion" href="#department-panel" aria-expanded="false" aria-controls="department-panel">
              各地勞動局
            </a>
          </div>
        </div>
        <div id="department-panel" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading-department">
          <div class="panel-body">
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
              <dd class="department-name" :data-name="selectedCity.name">
                {{selectedCity.name}}
              </dd>
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
          </div>
        </div>
      </div>

      <div class="panel panel-info">
        <div class="panel-heading" role="tab" id="heading-union">
          <a role="button" data-toggle="collapse" data-parent="#accordion" href="#union-panel" aria-expanded="false" aria-controls="union-panel">
            工會
          </a>
        </div>
        <div id="union-panel" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading-union">
          <div class="panel-body">
            <form>
              <div class="form-group">
                <label class="control-label" for="unions-selector">請選擇工會</label>
                <select class="form-control unions-selector" id="unions-selector" v-model="selectedUnion">
                  <option v-for="union in unions" :data-union="union.name" :key="union.name" :value="union">{{union.name}}</option>
                </select>
              </div>
            </form>
            <dl>
              <dt>工會名稱</dt>
              <dd class="department-name" :data-name="selectedUnion.name">
                {{selectedUnion.name}}
              </dd>
            </dl>
            <dl v-if="selectedUnion.website">
              <dt>網站</dt>
              <dd>
                <a :href="selectedUnion.website" target="_blank">{{selectedUnion.website}}</a>
              </dd>
            </dl>
            <dl v-if="selectedUnion.facebook">
              <dt>Facebook</dt>
              <dd><a :href="selectedUnion.facebook" target="_blank">{{selectedUnion.facebook}}</a></dd>
            </dl>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>

const cities = require('../assets/department-of-labor').cities
const unions = require('../assets/unions').unions

export default {
  data () {
    return {
      cities,
      unions,
      selectedCity: cities[0],
      selectedUnion: unions[0]
    }
  }
}
</script>

<style>
.contact-label {
  font-weight: bold;
}
</style>
