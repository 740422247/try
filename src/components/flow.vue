<template>
  <canvas class="flow" @mousedown="flowMouseDown($event)" @mousemove="flowMouseMove($event)"></canvas>
</template>
<script>
export default {
  data: () => ({
    flow: undefined,
    width: 0,
    height: 0,
    toolWidth: 120,
    toolHeight: 500,
    rects: []
  }),
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.initContext();
    },
    // 鼠标按下
    flowMouseDown(e) {
      let cx = e.clientX;
      let cy = e.clientY;
      if (
        cx > 20 &&
        cx < 20 + this.toolWidth &&
        cy > 30 + 3 * 40 &&
        cy < 70 + 3 * 40
      ) {
        this.drawRect(cx, cy, false);
      }
    },
    // 鼠标移动事件
    flowMouseMove(e) {
      this.flow.clearRect(0, 0, this.width, this.height);
      this.drawTools();
      this.drawRect(
        this.rects[0].x + e.movementX,
        this.rects[0].y + e.movementY,
        true
      );
    },

    // 绘制已有图形
    flowBought(){
      this.rects.forEach(item => {
        // this.drawRect
      })
    },

    // 绘制item矩形
    drawRect(x, y, isMove) {
      const width = 120;
      const height = 40;
      const r = 5;
      if (!isMove) {
        this.rects.push({ x, y });
      } else {
        this.rects[0] = { x, y };
      }
      const cx1 = x - width / 2 + 5;
      const cy1 = y - (height / 2 - r) + 5;

      this.flow.beginPath();

      // this.flow.moveTo(cx1 - 5, cy1 - 5);
      this.flow.arc(cx1, cy1, r, 0.5 * 2 * Math.PI, 0.75 * 2 * Math.PI);
      this.flow.lineTo(cx1 + width - 2 * r, cy1 - r);
      this.flow.arc(
        cx1 + width - 2 * r,
        cy1,
        r,
        0.75 * 2 * Math.PI,
        2 * Math.PI
      );
      this.flow.lineTo(cx1 + width - r, cy1 + height - 2 * r);
      this.flow.arc(
        cx1 + width - 2 * r,
        cy1 + height - 2 * r,
        r,
        0,
        0.25 * 2 * Math.PI
      );
      this.flow.lineTo(cx1, cy1 + height - r);
      this.flow.arc(
        cx1,
        cy1 + height - 2 * r,
        r,
        0.25 * 2 * Math.PI,
        0.5 * 2 * Math.PI
      );
      this.flow.closePath();
      this.flow.stroke();
    },

    initContext() {
      let flow_c = document.querySelector(".flow");
      this.flow = flow_c.getContext("2d"); //建立2D模型
      flow_c.width = window.innerWidth;
      flow_c.height = window.innerHeight;
      this.width = flow_c.width;
      this.height = flow_c.height;
      // 设置画布尺寸
      this.setCanvasSize(flow_c);
      // 绘制工具集
      this.drawTools();
    },
    // 绘制工具集
    drawTools() {
      this.flow.strokeRect(20, 20, 20 + this.toolWidth, 20 + this.toolHeight);
      const tools = [
        { text: "保存" },
        { text: "选择" },
        { text: "转换" },
        { text: "状态" }
      ];
      tools.forEach((item, index) => {
        this.drawToolsItem(item, index);
      });
    },
    // 绘制单个工具
    drawToolsItem(tool, index) {
      this.flow.font = "20px Georgia";
      this.flow.textAlign = "center";
      this.flow.textBaseline = "top";
      this.flow.fillText(tool.text, 20 + this.toolWidth / 2, 30 + index * 40);
    },

    // 设置画布尺寸
    setCanvasSize(flow_c) {
      flow_c.width = window.innerWidth;
      flow_c.height = window.innerHeight;
    }
  }
};
</script>
