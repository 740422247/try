<template>
  <div class="snow" :style="{'background':'url('+aa+') no-repeat'}">
    <img src="./../assets/search_bg.jpg" id="bg" style="display:none;" />
    <canvas id="snow"></canvas>
  </div>
</template>
<script>
export default {
  data: () => ({
    snow: undefined,
    width: 0,
    height: 0,
    snows: [],
    num: 0,
    aa: require("../assets/search_bg.jpg")
  }),
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const s = document.querySelector("#snow");
      this.snow = s.getContext("2d");
      s.width = window.innerWidth;
      s.height = window.innerHeight;
      this.width = s.width;
      this.height = s.height;
      this.saveSnowCircle();
      this.drawBg();
    },
    // 绘制背景
    drawBg() {
      const img = document.getElementById("bg");
      img.onload = () => {
        this.snow.drawImage(img, 0, 0, this.width, this.height);
        // this.drawSnow();
        this.drawSnowCircle();
      };
    },
    // 绘制雪花
    drawSnow() {
      this.snow.beginPath();
      this.snow.moveTo(50, 50);
      this.snow.lineTo(56, 56);
      this.snow.moveTo(50, 56);
      this.snow.lineTo(56, 50);
      this.snow.moveTo(50 - 1.5, 50 + 1.5 * 1.7);
      this.snow.lineTo(56 + 1.5, 50 + 1.5 * 1.7);
      this.snow.strokeStyle = "#fff";
      this.snow.lineWidth = 1;
      this.snow.stroke();
    },
    // 制作并存储圆点雪花
    saveSnowCircle() {
      const snowNum = this.getSnows();
      for (let i = 0; i < snowNum; i++) {
        const pos = this.getDownSnow();
        const r = this.getSnowSize();
        this.snows.push({ pos, r });
      }
    },

    // 绘制雪花
    drawSnowCircle() {
      this.clear();
      const self = this;

      this.snows.forEach((item, index) => {
        this.snow.beginPath();
        this.snows[index] = this.editPosition(item);
        this.snow.arc(item.pos.x, item.pos.y, item.r, 0, 2 * Math.PI);
        this.snow.fillStyle = "rgba(255,255,255,0.9)";
        this.snow.shadowColor = "rgba(255,255,255,0.9)";
        this.snow.shadowBlur = this.getNum(5, 3);
        this.snow.fill();
      });
      window.requestAnimationFrame(this.drawSnowCircle.bind(self));
    },
    //清空
    clear() {
      this.snow.clearRect(0, 0, this.width, this.height);
    },
    // 修改雪花坐标位置
    editPosition(item) {
      if (item.pos.y > this.height * 0.55 || item.pos.x < 0) {
        return { pos: this.getDownSnow(), r: this.getSnowSize() };
      }
      return {
        ...item,
        pos: { x: item.pos.x - 0.25 * item.r, y: item.pos.y + item.r }
      };
    },

    // 获取雪花数量
    getSnows() {
      return this.getNum(300, 15);
    },
    // 获取雪花大小
    getSnowSize() {
      return this.getNum(2, 1);
    },
    // 获取雪花飘落区域
    getDownSnow() {
      return {
        x: this.getNum(this.width, this.width / 10),
        y: -this.getNum(this.height * 0.6)
      };
    },
    // 获取随机值
    getNum(max, min) {
      var m = min ? min : 0;
      return Math.random() * (max - m) + m;
    }
  }
};
</script>
<style>
#app {
  margin: 0;
}
</style>
