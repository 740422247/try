<template>
  <div class="home">
    <div class="header-nav">
      <div class="nav-slider has-arrow">
        导航
        <ul class="nav-container">
          <li @click="linkTo('/notifycation')">notifycation</li>
          <li @click="linkTo('/flow')">Flow</li>
          <li @click="linkTo('/webgl')">Webgl</li>
          <li @click="linkTo('/calender')">calender(日历)</li>
          <li @click="linkTo('/bar')">bar</li>
          <li @click="linkTo('/pie')">pie</li>
          <li @click="linkTo('/starSky')">starSky</li>
          <li @click="linkTo('/snow')">Snow</li>
          <li @click="linkTo('/bubble')">bubble</li>
        </ul>
      </div>
      <div class="nav-slider">导航</div>
      <div class="nav-slider">导航</div>
    </div>

    <h2 class="title">WELCOME</h2>

    <h3>取色板</h3>
    <canvas id="demo" style="margin:0 auto;"></canvas>
  </div>
</template>
<script>
import store from "../store/store";
export default {
  data: () => ({
    num: 20,
    ademo: undefined
  }),
  mounted() {
    this.init();
  },
  methods: {
    linkTo(linkStr) {
      this.$router.push({ path: linkStr });
    },
    init() {
      this.initDemo();
    },
    initDemo() {
      var demo = document.querySelector("#demo");
      this.ademo = demo.getContext("2d");
      demo.width = 500;
      demo.height = 500;
      this.fillImg();
    },
    fillImg() {
      if (this.num > 500) {
        this.num = 20;
      } else {
        this.num += 5;
      }
      this.ademo.clearRect(0, 0, 500, 500);
      this.ademo.beginPath();
      this.ademo.fillStyle = 'red'//"rgba(0,0,0," + (1 - this.num / 500) + ")";
      this.ademo.arc(this.num, this.num, 2, -2 * Math.PI*0.25, 2 * Math.PI*0.5);
      this.ademo.lineTo(this.num-30,this.num-30);
      this.ademo.closePath();
      this.ademo.fill();
      window.requestAnimationFrame(this.fillImg.bind());
    }
  }
};
</script>
<style scope>
.title {
  text-align: center;
}
.header-nav {
  padding: 0 10%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.header-nav .nav-slider {
  flex: 1;
  height: 100%;
  max-width: 200px;
  cursor: pointer;
  margin-right: 8px;
  position: relative;
}
.header-nav .nav-slider.has-arrow:after {
  content: "";
  width: 8px;
  height: 8px;
  border: 1px solid #999;
  border-top: none;
  border-left: none;
  display: inline-block;
  transform: rotate(45deg);
  margin-left: 5px;
  position: relative;
  top: -3px;
}
.header-nav .nav-slider.has-arrow:hover .nav-container {
  transition: all 0.5s ease;
  opacity: 1;
  height: auto;
}
.header-nav .nav-slider.has-arrow .nav-container {
  width: 180px;
  color: #999;
  border: 1px solid #ddd;
  position: absolute;
  top: 100%;
  right: 0;
  margin: 0;
  padding: 0;
  list-style: none;
  height: 0;
  opacity: 0;
  transition: all 0.5s ease;
}
.header-nav .nav-slider.has-arrow .nav-container li {
  line-height: 36px;
  height: 36px;
  list-style: none;
  position: relative;
}

.header-nav .nav-slider.has-arrow .nav-container li:hover {
  background-color: #ececec;
}

.header-nav .nav-slider.has-arrow .nav-container li::after {
  content: "";
  display: block;
  border-bottom: 1px solid #ddd;
  position: absolute;
  bottom: 0;
  left: 5px;
  right: 5px;
}
</style>
