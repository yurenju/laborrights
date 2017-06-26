<template>
  <div class="termination container">
    <form>
      <div class="form-group">
        <label class="control-label">情形</label>
        <div>
          <label class="radio-inline">
            <input type="radio" value="0" v-model="situation"> 資遣
          </label>
          <label class="radio-inline">
            <input type="radio" value="1" v-model="situation"> 離職
          </label>
        </div>
      </div>

      <div class="form-group">
        <label for="end-date" class="control-label">離職日</label>
        <input type="date" id="end-date" class="form-control" v-model="endDate">
      </div>

      <p>根據你的到職日 <strong>{{onboardString}}</strong>，你總共在這間公司待了 <strong>{{seniority}}</strong> 年。</p>

      <p v-if="situation === '0'">公司應於 <strong> {{noticeDate}} ({{result.value.noticeDays}} 天前)</strong> 通知你。你每周有兩天的全薪求職假，資遣費最少為 <strong>{{result.value.severancePay}} 元</strong>。</p>

      <p v-else>勞工應於 <strong> {{noticeDate}} ({{result.value.noticeDays}} 天前)</strong> 通知公司。</p>

    </form>
  </div>
</template>

<script>
import * as moment from 'moment'
import { mapState } from 'vuex'

import { Labor } from 'labor-standards-tw'

export default {
  data () {
    return {
      situation: '0',
      endDate: moment().format('YYYY-MM-DD')
    }
  },
  computed: {
    ...mapState(['onboard', 'monthlySalary']),
    onboardString () {
      return this.onboard.replace(/-/g, '/')
    },
    seniority () {
      return moment(this.endDate)
              .diff(moment(this.onboard), 'years', true)
              .toFixed(2)
    },
    result () {
      const labor = new Labor()
                        .onBoard(moment(this.onboard).toDate())
                        .setMonthlySalary(this.monthlySalary)
      return labor.beDismissed(moment(this.endDate).toDate())
    },
    noticeDate () {
      return moment(this.endDate)
              .subtract(this.result.value.noticeDays, 'days')
              .format('YYYY/MM/DD')
    }
  }
}
</script>
