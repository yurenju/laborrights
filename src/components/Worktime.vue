<template>
  <div class="worktime container">
    <form>

      <div class="form-group">
        <label for="day" class="control-label">哪天</label>
        <select id="day" class="form-control" v-model="day">
          <option v-for="day in dayOfWeek" :value="day.value">{{day.text}}</option>
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

      <div class="panel panel-info result">
        <div class="panel-heading">結果</div>
        <div class="panel-body">
          <div class="row">
            <div class="col-xs-3 result-label">狀態</div>
            <div class="col-xs-9">{{legal}}</div>
          </div>
          <div class="row" v-if="result.value.overtimePay">
            <div class="col-xs-3 result-label">加班費</div>
            <div class="col-xs-9">{{parseInt(result.value.overtimePay)}} 元</div>
          </div>

          <div class="violations" v-if="!result.value.legal">
            <div class="row">
              <div class="col-xs-3 result-label">違反法條</div>
              <div class="col-xs-9">
                <ul class="articles">
                  <li v-for="violation in result.violations">
                    {{formatArticle(violation)}}
                  </li>
                </ul>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-3 result-label">罰則</div>
              <div class="col-xs-9">
                <ul class="penalties">
                  <li v-for="penalty in penalties">
                    {{formatPenalty(penalty)}}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!result.value.legal" class="alert alert-danger" role="alert">
        此加班情況為公司違法加班，請向公司所在地的勞動局檢舉。
        </div>


    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import * as moment from 'moment'
import { Labor, WorkTime, Duration, Day } from 'labor-standards-tw'

export default {
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
    legal () {
      return this.result.value.legal ? '合法' : '違法'
    },
    penalties () {
      return this.result.violations.map(v => v.penalize())
    }
  },
  methods: {
    formatArticle (violation) {
      let output = `${violation.lawTitle} 第 ${violation.id} 條`
      if (violation.paragraph !== null && violation.paragraph !== undefined) {
        output += ` 第 ${violation.paragraph + 1} 項`
      }
      return output
    },
    formatPenalty (penalty) {
      return penalty.possibilities.map(p => {
        let output = ''
        if (p.fine) {
          output += '罰款'
          if (p.fine.min) {
            output += ` ${p.fine.min} 元以上`
          }
          if (p.fine.max) {
            output += ` ${p.fine.max} 元以下`
          }
        }
        return output
      }).join('或 <br>')
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

.result {
  margin-top: 20px;
}

.result-label {
  font-weight: bold;
}

.articles, .penalties {
  padding-left: 0;
  list-style: none;
}
</style>
