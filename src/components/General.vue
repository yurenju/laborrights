<template>
  <div class="container">
    <form>
      <div class="form-group">
        <label class="control-label">勞工身分</label>
        <div class="form-control-static">
          {{laborType.text}}

          <p class="help-block type-desc">說明：{{laborType.desc}}</p>
        </div>
      </div>

      <div class="form-group">
        <label for="" class="control-label">最低特休天數</label>
        <div class="form-control-static">{{paidLeaves}} 天</div>
      </div>
      <div class="form-group">
        <label for="" class="control-label">計算加班費用的平均時薪</label>
        <div class="form-control-static">{{wages}} 元</div>
      </div>
      <div class="form-group">
        <label for="" class="control-label">是否可申請退休</label>
        <div class="form-control-static">{{retirement}}</div>
      </div>
    </form>

    <result v-if="!result.value.legal" :result="result" :penalties="penalties"></result>
  </div>

</template>

<script>
import { mapState } from 'vuex'

import Result from '@/components/Result'
import { Labor, ChildLaborType } from 'labor-standards-tw'

export default {
  components: {
    Result
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
           .setMonthlySalary(this.monthlySalary)

      return labor
    },
    result () {
      return this.labor.validateChildLabor()
    },
    penalties () {
      return this.result.violations.map(v => v.penalize())
    },
    laborType () {
      const type = this.result.value.type
      let text = '一般勞工'
      let desc = '滿十八歲以上為一般勞工。'

      if (type === ChildLaborType.FOLLOW_CHILD_LABOR_ARTICLES) {
        text = '適用童工法規'
        desc = '未滿十五歲，但國民中學畢業或經主管機關認定其工作性質及環境無礙' +
               '其身心健康而許可者，準用童工保護之規定並且' +
               '不得從事危險性或有害性之工作。'
      } else if (type === ChildLaborType.CHILD_LABOR) {
        text = '童工'
        desc = '十五歲以上未滿十六歲，不得從事危險性或有害性之工作。'
      } else if (type === ChildLaborType.PRE_ADULT) {
        text = '準一般勞工'
        desc = '未滿十八歲，不得從事危險性或有害性之工作。'
      } else if (type === ChildLaborType.ILLEGAL) {
        text = '違法勞工'
        desc = '未滿十五歲且不符合相關條件'
      }

      return {text, desc}
    },
    paidLeaves () {
      return this.labor.paidLeaves(this.today).value.leaves
    },
    wages () {
      return this.labor.getHourlyWages() || 150
    },
    retirement () {
      return this.labor.retire(this.today).value.retirement ? '可' : '不可'
    }
  }
}
</script>

<style>
.type-desc {
  margin-top: 10px;
  font-size: small;
}
</style>
