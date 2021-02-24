<template>
  <div class="screen-page">
    <div class="screen-header">头部</div>
    <div class="screen-body">
      <div class="screen-nav">导航</div>
      <div class="screen-content">
        <screen-edit></screen-edit>
      </div>
    </div>
  </div>
</template>
<script>
import ScreenEdit from "./base/dragEdit";
export default {
  name: "screenPc",
  components: {
    ScreenEdit
  }
};
</script>
<style scoped>
.screen-header {
  height: 60px;
  background: #eee;
  text-align: center;
  line-height: 60px;
}
.screen-body{
  display: flex;
}
.screen-body>.screen-nav{
  flex: 0 0 200px;
  background-color: burlywood;
}
.screen-body>.screen-content{
  flex: 1;
}
</style>
