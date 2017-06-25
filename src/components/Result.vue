<template>
  <div class="panel result"
      :class="{'panel-info': result.value.legal, 'panel-danger': !result.value.legal}">
    <div class="panel-heading">結果</div>
    <div class="panel-body">
      <div class="row">
        <div class="col-xs-4 result-label">狀態</div>
        <div class="col-xs-8">{{legal}}</div>
      </div>
      <div class="row" v-if="result.value.overtimePay">
        <div class="col-xs-4 result-label">加班費</div>
        <div class="col-xs-8">{{parseInt(result.value.overtimePay)}} 元</div>
      </div>

      <div class="violations" v-if="!result.value.legal">
        <div class="row">
          <div class="col-xs-4 result-label">違反法條</div>
          <div class="col-xs-8">
            <ul class="articles">
              <li v-for="(violation, index) in result.violations" :key="index">
                {{formatArticle(violation)}}
              </li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-4 result-label">罰則</div>
          <div class="col-xs-8">
            <ul class="penalties">
              <li v-for="(penalty, index) in penalties" :key="index">
                <span v-html="formatPenalty(penalty)"></span>
              </li>
            </ul>
          </div>
        </div>
        <p class="note">
          公司此舉已經違反勞動基本法，請向公司所在地的勞動局檢舉。
        </p>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props: ['result', 'penalties'],
  computed: {
    legal () {
      return this.result.value.legal ? '合法' : '違法'
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
        let output = []
        if (p.fine) {
          let fineDesc = []
          if (p.fine.min) {
            fineDesc.push(` ${p.fine.min} 元以上`)
          }
          if (p.fine.max) {
            fineDesc.push(` ${p.fine.max} 元以下`)
          }
          output.push(`罰款 ${fineDesc.join('，')}`)
        }
        if (p.imprisonment) {
          let unit
          let imprisonmentDesc = []
          if (p.imprisonment.unit === 'month') {
            unit = ' 個月'
          } else if (p.imprisonment.unit === 'year') {
            unit = ' 年'
          }

          if (p.imprisonment.min) {
            imprisonmentDesc.push(` ${p.imprisonment.min} ${unit}以上`)
          }
          if (p.imprisonment.max) {
            imprisonmentDesc.push(` ${p.imprisonment.max} ${unit}以下`)
          }
          output.push(`處 ${imprisonmentDesc.join('，')}有期徒刑、拘役`)
        }
        return output.join('，')
      }).join(' <strong>或</strong> <br>')
    }
  }
}
</script>

<style scoped>
.note {
  margin-top: 10px;
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
