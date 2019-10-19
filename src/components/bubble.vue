<template>
  <div class="bubble">
    <canvas id="bubble"></canvas>
  </div>
</template>
<script>
export default {
  data: () => ({
    bubble: undefined,
    width: 0,
    height: 0,
    bubbles: []
  }),
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const b = document.querySelector("#bubble");
      this.bubble = b.getContext("2d");
      b.width = window.innerWidth;
      b.height = window.innerHeight;
      this.width = b.width;
      this.height = b.height;

      this.initBubble();
    },
    initBubble() {
      const bubbleNum = this.getBubbleNum();
      this.initBubbles(bubbleNum);
      this.fillBubbles();
    },
    // 绘制气泡
    fillBubbles() {
      const self = this;
      this.clear();
      this.bubbles.forEach((item, index) => {
        this.bubble.beginPath();
        if (item.x - item.r < 0 || item.x + item.r > this.width) {
          this.bubbles[index].cx = -this.bubbles[index].cx;
        }
        if (item.y - item.r < 0 || item.y + item.r > this.height) {
          this.bubbles[index].cy = -this.bubbles[index].cy;
        }
        this.bubbles[index] = {
          ...item,
          x: item.x + item.cx,
          y: item.y + item.cy
        };
        this.bubble.arc(item.x, item.y, item.r, 0, 2 * Math.PI);

        this.bubble.strokeStyle = "red";
        this.bubble.stroke();
      });
      window.requestAnimationFrame(this.fillBubbles.bind(self));
    },

    clear() {
      this.bubble.clearRect(0, 0, this.width, this.height);
    },

    // 存储气球数据
    initBubbles(num) {
      for (let i = 0; i < num; i++) {
        this.bubbles.push({ ...this.getBubble() });
      }
    },

    // 初始化气球数量
    getBubbleNum() {
      return this.getNum(8, 3);
    },
    // 初始化气球移动值 、 半径 、 颜色
    getBubble() {
      const cx = this.getNum(10, 2.5);
      const cy = -this.getNum(10, 5);
      const r = this.getNum(100, 60);
      const x = 0 + r;
      const y = this.height - r;

      return { x, y, r, cx, cy };
    },

    getNum(max, min) {
      var m = min ? min : 0;
      return Math.random() * (max - m) + m;
    }
  }
};
</script>

