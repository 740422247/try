<template>
  <div class="pie-container">
    <h3>example</h3>
    <canvas class="pie" style="border:1px solid #ddd;" :width="width" :height="height"></canvas>
  </div>
</template>
<script>
import { link } from "fs";
export default {
  data: () => ({
    c: undefined,
    ctx: undefined,
    width: 1200,
    height: 800,
    centerX: 0,
    centerY: 0,
    radius: ["60%", "50%"],
    sumValue: 0,
    centerTitle: "汇总金额(元)",
    data: [
      { name: "小米", value: 1234 },
      { name: "华为", value: 3254 },
      { name: "百度", value: 2546 },
      { name: "阿里巴巴", value: 3252 },
      { name: "阿里巴巴", value: 2222 }
    ],
    color: [
      "#e50ca1",
      "#ff9f43",
      "#10ac84",
      "#48dbfb",
      "#f368e0",
      "#fec400",
      "#1dd1a1",
      "#188BEF"
    ],
    grdColor:[
      {start:'#FD387E',end:'#FFA878'},
      {start:'#0066FF',end:'#5D9EFF'},
      {start:'#1EC250',end:'#A2EA8E'},
      {start:'#FDA701',end:'#FED501'},
    ]
  }),
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.initPie();
    },
    initPie() {
      // 中心点位计算
      this.centerX = this.width / 2;
      this.centerY = this.height / 2;
      this.c = document.querySelector(".pie");
      this.ctx = this.c.getContext("2d");
      // 处理数据信息
      const result = this.pieScale(this.data);
      // 绘制图案
      this.fillCtx(result);
      this.fillTitle();
      this.fillLogo();
    },
    // 饼图比列计算
    pieScale(data) {
      // 计算数据之和
      let sumData = 0;
      data.forEach(item => {
        sumData += item.value;
      });
      // 计算前面所有数据得已有角度比例之和
      let sumScale = 0;
      const result = data.map((item, index) => {
        // 占圆得比例
        const itemScale = item.value / sumData;

        // 记录当前数据起始角度比例
        const startScale = sumScale;
        sumScale += itemScale;
        this.sumValue += item.value;
        return {
          ...item,
          itemScale,
          startScale,
          // 结束角度 = 当前角度之和
          endScale: sumScale
        };
      });

      return result;
    },

    // 绘制中心
    fillTitle() {
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "bottom";
      this.ctx.font = "60px Arial";
      this.ctx.fillStyle = "#333";
      this.ctx.fillText(this.sumValue, this.centerX, this.centerY + 20);

      this.ctx.textBaseline = "top";
      this.ctx.font = "16px Arial";
      this.ctx.fillStyle = "#ccc";
      this.ctx.fillText(this.centerTitle, this.centerX, this.centerY + 20);
    },

    // 绘制图形
    fillCtx(result) {
      const size = this.width > this.height ? this.height : this.width;
      // 外圆半径
      const bigCircleR =
        this.radius[0].indexOf("%") > -1
          ? (size * parseInt(this.radius[0])) / 200
          : this.radius[0] * 1;
      // 内径半径
      const depthCircleR =
        this.radius[1].indexOf("%") > -1
          ? (size * parseInt(this.radius[1])) / 200
          : this.radius[0] * 1;
      // 中间连接圆弧
      const smallCircleR = (bigCircleR - depthCircleR) * 0.5;

      result.forEach((item, index) => {
        this.ctx.beginPath();
        // 第一段外圆弧
        this.ctx.arc(
          this.centerX,
          this.centerY,
          bigCircleR,
          item.startScale * 2 * Math.PI,
          item.endScale * 2 * Math.PI
        );
        // 末端拐角小圆弧
        this.ctx.arc(
          this.centerX +
            (bigCircleR - smallCircleR) * Math.cos(item.endScale * Math.PI * 2),
          this.centerY +
            (bigCircleR - smallCircleR) * Math.sin(item.endScale * Math.PI * 2),
          smallCircleR,
          item.endScale * Math.PI * 2,
          (item.endScale + 0.5) * Math.PI * 2
        );

        // 内圆圆弧
        this.ctx.arc(
          this.centerX,
          this.centerY,
          depthCircleR,
          item.endScale * 2 * Math.PI,
          item.startScale * 2 * Math.PI,
          true
        );
        // 起始段闭合小圆弧;
        this.ctx.arc(
          this.centerX +
            (bigCircleR - smallCircleR) *
              Math.cos(item.startScale * Math.PI * 2),
          this.centerY +
            (bigCircleR - smallCircleR) *
              Math.sin(item.startScale * Math.PI * 2),
          smallCircleR,
          (item.startScale + 0.5) * Math.PI * 2,
          item.startScale * Math.PI * 2,
          true
        );

        var grd = this.ctx.createLinearGradient(
          this.centerX + bigCircleR*Math.cos(item.startScale*Math.PI*2),
          this.centerY + bigCircleR*Math.sin(item.startScale*Math.PI*2),
          this.centerY + bigCircleR*Math.cos(item.endScale*Math.PI*2),
          this.centerY + bigCircleR*Math.sin(item.endScale*Math.PI*2),
        );
        grd.addColorStop(0, this.grdColor[index % this.grdColor.length].start);
        grd.addColorStop(1, this.grdColor[index % this.grdColor.length].end);

        this.ctx.fillStyle = grd;
        this.ctx.fill();
      });
    },
    // 绘制Logo
    fillLogo() {
      this.ctx.beginPath();
      this.ctx.arc(100, 75, 50, 0, 2 * Math.PI * 0.75);
      this.ctx.fillStyle = "red";
      this.ctx.lineTo(100, 60);
      this.ctx.arc(
        100,
        75 - 35 - 7.5,
        7.5,
        2 * Math.PI * 0.75,
        2 * Math.PI * 1.25
      );
      this.ctx.arc(100, 75, 35, 2 * Math.PI * 0.75, 0, true);
      this.ctx.arc(100 + 35 + 7.5, 75, 7.5, Math.PI, 0, true);
      this.ctx.fill();

      this.ctx.beginPath();
      this.ctx.arc(100, 75 - 35 - 7.5, 2, 0, 2 * Math.PI);
      this.ctx.fillStyle = "#fff";
      this.ctx.fill();

      this.ctx.font = "16px Arial";
      this.ctx.textBaseline = "middle";
      this.ctx.textAlign = "center";
      this.ctx.fillStyle = "rgb(239,54,251)";
      this.ctx.fillText("Logo", 100, 75);
    }
  }
};
</script>
<style scoped>
</style>
