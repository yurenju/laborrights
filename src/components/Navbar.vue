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
          <li class="active">
            <router-link to="/general" data-toggle="collapse" data-target=".navbar-collapse.in">一般資訊</router-link>
          </li>
          <li>
            <router-link to="/worktime" data-toggle="collapse" data-target=".navbar-collapse">工作時間</router-link>
          </li>
          <li>
            <router-link to="/termination" data-toggle="collapse" data-target=".navbar-collapse.in">資遣與離職</router-link>
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
export default {
}
</script>
