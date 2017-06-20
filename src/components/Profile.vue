<template>
  <div class="profile container">
    <form>
      <div class="form-group">
        <label for="onboard">到職日</label>
        <input id="onboard" type="date" class="form-control">
      </div>

      <div class="form-group">
        <label for="age">年齡</label>
        <input type="number" id="age" class="form-control">
      </div>

      <div class="form-group">
        <label for="gender">性別</label>
        <select name="" id="" class="form-control">
          <option value="">男</option>
          <option value="">女</option>
          <option value="">不指定</option>
        </select>
      </div>

      <a class="more-options-toggle collapsed" href="#more-options" data-toggle="collapse">更多選項</a>

      <div id="more-options" class="collapse">
        <div class="form-group">
          <label for="rest-day">休息日</label>
          <select name="" id="" class="form-control">
            <option value="1">星期一</option>
            <option value="2">星期二</option>
            <option value="3">星期三</option>
            <option value="4">星期四</option>
            <option value="5">星期五</option>
            <option value="6">星期六</option>
            <option value="7">星期日</option>
          </select>
        </div>

        <div class="form-group">
          <label for="regular-leave">例假日</label>
          <select name="" id="" class="form-control">
            <option value="1">星期一</option>
            <option value="2">星期二</option>
            <option value="3">星期三</option>
            <option value="4">星期四</option>
            <option value="5">星期五</option>
            <option value="6">星期六</option>
            <option value="7">星期日</option>
          </select>
        </div>
      </div>

      <div class="text-center">
        <button type="submit" class="btn btn-primary btn-lg">儲存</button>
      </div>

    </form>
  </div>
</template>

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
