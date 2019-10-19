<template>
  <div class="addr">
    <div class="addr-content">{{message}}</div>
    <div class="addr-close">{{foo}}</div>
  </div>
</template>
<style scoped>
.addr {
  height: 400px;
  width: 100%;
  background-color: #dfdfdf;
  border: 1px solid #ccc;
  position: fixed;
  bottom: 0px;
  left: 0;
  transform: bottom 0.3s ease;
}
.addr .addr-content {
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.addr .addr-close {
  text-align: center;
  line-height: 10%;
}
</style>
<script>
export default {
  data() {
    return {
      message: "hello",
      foo: "abc"
    };
  }
};
</script>

