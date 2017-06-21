<template>
  <div class="container">
    <form>
      <div class="form-group">
        <label class="control-label">勞工身分</label>
        <div class="form-control-static">
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-default active">一般勞工</button>
            <button type="button" class="btn btn-default">童工</button>
            <button type="button" class="btn btn-default">適用童工法規</button>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="" class="control-label">最低特休天數</label>
        <div class="form-control-static">{{paidLeaves}} 天</div>
      </div>
      <div class="form-group">
        <label for="" class="control-label">計算加班費用的平均時薪</label>
        <div class="form-control-static">{{wage}} 元</div>
      </div>
      <div class="form-group">
        <label for="" class="control-label">是否可申請退休</label>
        <div class="form-control-static">{{retirement}}</div>
      </div>

      <div class="female" v-show="female">
        <hr />

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
            <input type="date" id="birth" class="form-control"  v-model="leaveDate">
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
    </form>
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
      'onboard', 'age', 'gender', 'restDay', 'regularLeave', 'monthlySalary'
    ]),
    labor () {
      const labor = new Labor()
      labor.setAge(this.age)
           .setGender(this.gender)
           .onBoard(this.onboard)
           .monthlySalary(this.monthlySalary)

      return labor
    },
    paidLeaves () {
      return this.labor.paidLeaves(this.today).value.leaves
    },
    wage () {
      return this.labor.getHourlyWage() || 150
    },
    retirement () {
      return this.labor.retire(this.today).value.retirement ? '可' : '不可'
    },
    female () {
      return this.labor.getGender() === Gender.FEMALE
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
