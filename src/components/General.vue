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

    </form>
  </div>

</template>

<script>
import { Labor } from 'labor-standards-tw'

export default {
  props: ['labor', 'today'],
  computed: {
    paidLeaves () {
      const labor = this.labor || new Labor()
      const today = this.today || new Date()
      return labor.paidLeaves(today).value.leaves
    },
    wage () {
      const labor = this.labor || new Labor()
      return labor.getHourlyWage() || 150
    },
    retirement () {
      const labor = this.labor || new Labor()
      const today = this.today || new Date()
      return labor.retire(today).value.retirement ? '可' : '不可'
    }
  }
}
</script>
