<template>
  <div class="container female">
    <div class="miscarriage" v-if="miscarriage">
      <div class="form-group">
        <label for="birth">小產日期</label>
        <input type="date" id="birth" class="form-control" v-model="leaveDate">
      </div>

      <div class="form-group">
        <label for="pregnantMonth">懷孕時間（單位為月）</label>
        <input id="pregnantMonth" type="number" class="form-control" v-model="pregnantMonth">
      </div>
    </div>
    <div class="birth" v-else>
      <div class="form-group">
        <label for="birth">產假開始日期</label>
        <input type="date" id="birth" class="form-control" v-model="leaveDate">
      </div>

    </div>
    <div class="form-group">
      <label for="" class="control-label">產假天數</label>
      <div class="form-control-static">{{maternityLeaveResult.value.leaves}} 周</div>
    </div>

    <div class="form-group">
      <label for="" class="control-label">產假期間薪資</label>
      <div class="form-control-static">{{maternityLeaveResult.value.wages}} 元</div>
    </div>

    <div class="checkbox">
      <label>
        <input type="checkbox" v-model="miscarriage"> 小產資訊
      </label>
    </div>
  </div>
</template>

<script>
import * as moment from 'moment'
import { mapState } from 'vuex'
import { Labor, Gender } from 'labor-standards-tw'

export default {
  data () {
    return {
      miscarriage: false,
      pregnantMonth: 3,
      leaveDate: moment().format('YYYY-MM-DD')
    }
  },
  computed: {
    ...mapState([
      'onboard', 'age', 'gender', 'monthlySalary'
    ]),
    labor () {
      const labor = new Labor()
      labor.setAge(this.age)
        .setGender(this.gender)
        .onBoard(this.onboard)
        .setMonthlySalary(this.monthlySalary)

      return labor
    },
    maternityLeaveResult () {
      if (this.labor.getGender() === Gender.FEMALE) {
        const leaveDate = new Date(...this.leaveDate.split('-').map(num => parseInt(num)))
        return this.labor.takeMaternityLeave(leaveDate, this.miscarriage, this.pregnantMonth)
      } else {
        return { value: {} }
      }
    }
  }
}
</script>
