<template>
  <div class="worktime container">
    <form>

      <div class="form-group">
        <label for="day" class="control-label">哪天</label>
        <select id="day" class="form-control" v-model="day">
          <option v-for="(day, i) in dayOfWeek" :key="i" :value="day.value">{{day.text}}</option>
        </select>
      </div>

      <div class="checkbox">
        <label>
          <input type="checkbox" v-model="holiday"> 是否是國定假日
        </label>
      </div>

      <div class="form-group">
        <label for="start" class="control-label">上班時間</label>
        <input type="text" id="start" class="form-control" v-model="start">
      </div>

      <div class="form-group">
        <label for="end" class="control-label">下班時間</label>
        <input type="text" id="end" class="form-control" v-model="end">
      </div>

      <div class="checkbox">
        <label>
          <input type="checkbox" v-model="nextDay"> 下班時間為隔天
        </label>
      </div>

      <div class="form-group">
        <label for="" class="control-label">上班時數</label>
        <div class="form-control-static">{{workHours}} 小時</div>
      </div>

      <a class="more-options-toggle collapsed" href="#more-options" data-toggle="collapse">更多選項</a>

      <div id="more-options" class="collapse">

        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="agreed"> 勞工是否同意加班
          </label>
        </div>

        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="accident"> 當天是否有天災、事變或突發事件
          </label>
        </div>
      </div>

      <result :result="result" :penalties="penalties"></result>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import * as moment from 'moment'

import Result from '@/components/Result'
import { Labor, WorkTime, Duration, Day } from 'labor-standards-tw'

export default {
  components: {
    Result
  },
  data () {
    return {
      day: 1,
      holiday: false,
      nextDay: false,
      agreed: true,
      accident: false,
      start: '8:00',
      end: '18:00',
      dayOfWeek: [
        { text: '星期一', value: 1 },
        { text: '星期二', value: 2 },
        { text: '星期三', value: 3 },
        { text: '星期四', value: 4 },
        { text: '星期五', value: 5 },
        { text: '星期六', value: 6 },
        { text: '星期日', value: 0 }
      ]
    }
  },
  computed: {
    ...mapState(['age', 'gender', 'monthlySalary', 'restDay', 'regularLeave']),
    labor () {
      const labor = new Labor()
      labor.setAge(this.age)
           .setGender(this.gender)
           .monthlySalary(this.monthlySalary)

      return labor
    },
    workHours () {
      return this.endDate.diff(this.startDate, 'hours', true)
    },
    startDate () {
      const date = moment(new Date(2017, 5, 11 + this.day))
      const [startHour, startMinute] = this.start.split('-').map(num => parseInt(num))
      const start = date.clone()
      start.hour(startHour).minute(startMinute)

      return start
    },
    endDate () {
      const date = moment(new Date(2017, 5, 11 + this.day))
      const [endHour, endMinute] = this.end.split('-').map(num => parseInt(num))
      const end = date.clone()
      end.hour(endHour).minute(endMinute)

      if (this.nextDay) {
        end.add(1, 'days')
      }

      return end
    },
    result () {
      const worktime = new WorkTime(Duration.DAY, this.labor)

      let dayType = Day.REGULAR_DAY
      if (this.holiday) {
        dayType = Day.HOLIDAY
      } else if (this.restDay === this.day) {
        dayType = Day.REST_DAY
      } else if (this.regularLeave === this.day) {
        dayType = Day.REGULAR_LEAVE
      }

      worktime.add(this.startDate.toDate(), this.workHours, dayType)
      const validation = worktime.validate()
      if (!validation.value.legal) {
        return validation
      } else {
        return worktime.overtimePay(this.accident, this.agreed)
      }
    },
    penalties () {
      return this.result.violations.map(v => v.penalize())
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
