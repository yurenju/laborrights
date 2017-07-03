<template>

  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">勞工權益 <span class="label label-info">alpha</span></a>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse">
        <ul class="nav navbar-nav">
          <li>
            <router-link to="/general" data-toggle="collapse" data-target=".navbar-collapse.in">一般資訊</router-link>
          </li>
          <li v-if="showFemale">
            <router-link to="/female" data-toggle="collapse" data-target=".navbar-collapse.in">產假資訊</router-link>
          </li>
          <li>
            <router-link to="/worktime" data-toggle="collapse" data-target=".navbar-collapse">工作時間</router-link>
          </li>
          <li>
            <router-link to="/termination" data-toggle="collapse" data-target=".navbar-collapse.in">資遣與離職</router-link>
          </li>
          <li>
            <router-link to="/contact" data-toggle="collapse" data-target=".navbar-collapse.in">檢舉或諮詢</router-link>
          </li>
          <li>
            <a href="https://goo.gl/forms/4dRTCJbWnkaiWZ3v2" target="_blank">意見回饋</a>
          </li>

        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li>
            <router-link to="/profile" data-toggle="collapse" data-target=".navbar-collapse">編輯基本資料</router-link>
          </li>
        </ul>
      </div>
      <!-- /.navbar-collapse -->
    </div>
    <!-- /.container-fluid -->
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import { Gender } from 'labor-standards-tw'

export default {
  computed: {
    ...mapState(['gender']),
    showFemale () {
      return this.gender === Gender.FEMALE
    }
  }
}
</script>
