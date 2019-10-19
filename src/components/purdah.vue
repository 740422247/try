<template>
  <div class="purdah-container" :style="containerStyle" :class="{active:active}">
    <span class="test" @click="toggle()">test</span>
    <div class="purdah" :style="style">jkfldjs</div>



  </div>
</template>
<script>
import { window } from "rxjs-compat/operator/window";
export default {
  data: () => ({
    active: false,
    style: {
      width: 0,
      height: 0
    },
    containerStyle: {
      width: 0,
      height: 0
    }
  }),
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.style = {
        width: document.documentElement.clientWidth + "px",
        height: document.documentElement.clientHeight + "px"
      };
      this.containerStyle = this.style;
    },
    toggle() {
      this.containerStyle =
        this.containerStyle.width === 0
          ? (this.containerStyle = this.containerStyle.marginLeft = 0)
          : {
              width: 0,
              marginLeft: document.documentElement.clientWidth / 2 + "px"
            };
      this.style.marginLeft = -this.containerStyle.marginLeft;
    }
  }
};
</script>
<style scope>
#app {
  margin-top: 0;
}
body {
  margin: 0;
}
.purdah-container,
.purdah {
  transition: all 0.5s ease;
  overflow: hidden;
}
.purdah {
  background-color: #eee;
}
.purdah-container {
  background-color: #000;
}
.purdah-container.active {
  width: 0;
  margin-left: 50%;
  transition: all 0.5s ease;
}
.test {
  border: 1px solid red;
  height: 36px;
  line-height: 36px;
  border-radius: 4px;
  padding: 0 12px;
  width: 60px;
  z-index: 10000;
  position: fixed;
  top: 20px;
  right: 20px;
  display: inline-block;
}



</style>
