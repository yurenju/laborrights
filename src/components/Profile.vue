<template>
  <div class="profile container">
    <form>
      <div class="form-group">
        <label for="onboard">到職日</label>
        <input id="onboard" type="date" class="form-control" v-model="onboard">
      </div>

      <div class="form-group">
        <label for="age">年齡</label>
        <input type="number" id="age" class="form-control" v-model.number="age">
      </div>

      <div class="form-group">
        <label for="gender">性別</label>
        <select id="gender" class="form-control" v-model.number="gender">
          <option v-for="gender in genderOptions" :value="gender.value">{{gender.text}}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="month-salary">月薪</label>
        <input type="number" id="month-salary" class="form-control" v-model.number="monthlySalary">
      </div>


      <a class="more-options-toggle collapsed" href="#more-options" data-toggle="collapse">更多選項</a>

      <div id="more-options" class="collapse">
        <div class="form-group">
          <label for="rest-day">休息日</label>
          <select id="rest-day" class="form-control"
                  v-model.number="restDay">
            <option v-for="day in dayOfWeek" :value="day.value">{{day.text}}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="regular-leave">例假日</label>
          <select id="regular-leave" class="form-control"
                  v-model.number="regularLeave">
            <option v-for="day in dayOfWeek" :value="day.value">{{day.text}}</option>
          </select>
        </div>
      </div>

      <div class="text-center">
        <button class="btn btn-primary btn-lg" @click="save">儲存</button>
      </div>

    </form>
  </div>
</template>

<script>
import { Gender } from 'labor-standards-tw'

export default {
  data () {
    const { onboard, age, gender, monthlySalary, restDay, regularLeave } = this.$store.state
    return {
      onboard,
      age,
      gender,
      monthlySalary,
      restDay,
      regularLeave,
      genderOptions: [
        { text: '男', value: Gender.MALE },
        { text: '女', value: Gender.FEMALE },
        { text: '不指定', value: Gender.UNSPECIFIED }
      ],
      dayOfWeek: [
        { text: '星期一', value: 1 },
        { text: '星期二', value: 2 },
        { text: '星期三', value: 3 },
        { text: '星期四', value: 4 },
        { text: '星期五', value: 5 },
        { text: '星期六', value: 6 },
        { text: '星期日', value: 7 }
      ]
    }
  },
  methods: {
    save () {
      const properties = {}
      const fields = ['onboard', 'age', 'gender', 'monthlySalary', 'restDay', 'regularLeave']
      fields.forEach(key => {
        properties[key] = this[key]
      })
      this.$store.commit('setProperties', properties)
      this.$router.push('/general')
    }
  }
}
</script>


<style>

a.more-options-toggle {
  text-decoration: none
}


.collapsed.more-options-toggle::before {
  content: "▶ ";
}


.more-options-toggle::before {
  content: "▼ ";
}


</style>
