<template>
  <transition name="notify" v-on:after-leave="afterLeave()">
    <div class="notify" v-show="show" :style="containerStyle">
      <div class="notify-header">
        <span class="notify-title" v-html="text"></span>
        <span class="notify-close" @click.stop="show = !show">{{btnTxt}}</span>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "notify",
  data: () => ({})
};
</script>
<style scoped>
.notify-enter-active,
.notify-leave-active {
  opacity: 1;
  transition: all 2s ease;
}
.notify-enter,
.notify-leave-to {
  opacity: 0;
  transition: all 2s ease;
}

.notify {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 330px;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease;
  /* transform: translateY(-50px); */
}
.notify .notify-header {
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}
.notify-title {
  color: #999;
  font-size: 13px;
  margin-left: 12px;
  flex: 1;
  overflow: auto;
  height: 80px;
  display: flex;
  align-items: center;
}
.notify-close {
  margin-right: 12px;
  width: 20px;
  height: 20px;
  text-align: right;
  cursor: pointer;
  flex: 0 0 80px;
  color: #666;
}
</style>
