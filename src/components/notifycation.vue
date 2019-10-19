<template>
  <div class="notify-container">
    <button class="btn" @click="goBack()">返回</button>
    <h2 class="title">notifycation</h2>
    <button class="btn" @click="showOne()">只能显示一个</button>
    <button class="btn" @click="showAny()">可显示多个</button>
  </div>
</template>
<script>
import { window } from "rxjs-compat/operator/window";
export default {
  data: () => ({
    index: 1
  }),
  methods: {
    goBack() {
      console.log(this.$router.go(-1))
    },
    showAny() {
      this.$notify({
        content: `<a style='color:red;'>这是第${this.index}个提示</a>`,
        btn: "确定",
        time: 3000,
        allow: true
      });
      this.index++;
    },
    showOne() {
      this.$notify({
        content: `只能显示一个的提示：allow为false`,
        btn: "知道了",
        time: "5000"
      });
    }
  }
};
</script>
<style scope>
.title {
  width: 100%;
  text-align: center;
}
.btn {
  border: 1px solid #ededed;
  color: #999;
  height: 36px;
  line-height: 36px;
  border-radius: 4px;
  padding: 0 12px;
  text-align: center;
}
</style>
