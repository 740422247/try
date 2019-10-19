<template>
  <div class="bar">
    <div class="chart">
      <h3>example</h3>
      <canvas class="bar-chart" style="border:1px solid #ccc;"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    width: 1200,
    height: 800,
    yMax: 0,
    chart: {
      xAxis: {
        data: [
          "苹果",
          "谷歌",
          "三星",
          "华为",
          "阿里巴巴",
          "腾讯",
          "谷歌",
          "百度",
          "微软"
        ]
      },
      yAxis: {
        data: [1000, 10000, 12001,200]
      }
    }
  }),
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.canvasBar();
    },
    // canvas画布绘制
    canvasBar() {
      let barChart = document.querySelector(".bar-chart");
      let bar = barChart.getContext("2d"); //建立2D模型
      barChart.width = this.width;
      barChart.height = this.height;
      this.coordinate(bar);
      this.yAxis(bar);
      this.xAxis(bar);
    },

    // 坐标绘制
    coordinate(bar) {
      const coorHeight = this.height - 100;
      const coorWidth = this.width - 100;
      bar.beginPath();
      bar.moveTo(110, 110);
      bar.lineTo(100, 100);
      bar.lineTo(100, coorHeight);
      bar.lineTo(coorWidth, coorHeight);
      bar.lineTo(coorWidth - 10, coorHeight - 10);
      bar.moveTo(coorWidth, coorHeight);
      bar.lineTo(coorWidth - 10, coorHeight + 10);
      bar.moveTo(100, 100);
      bar.lineTo(90, 110);
      // 坐标轴配置
      bar.strokeStyle = "#ccc";
      bar.lineWidth = 1;
      // 坐标轴配置
      bar.stroke();
    },
    // y 坐标轴刻度线及分割线绘制
    yAxis(bar) {
      // y轴起点
      const yStart = this.height - 100;
      // y轴终点
      const yEnd = 100 + 30;
      // 刻度线长度
      const yLength = 8;
      // 刻度数量
      const ticks = 8;
      // 刻度的步长
      const yStep = (yStart - yEnd) / ticks;
      // 刻度绘制

      // 文本宽度
      const yTick = this.yTickLabel(bar, ticks);
      const yStepLabel = yTick.yStepLabel;
      const labelWidth = yTick.labelWidth;

      // 文本属性设置
      bar.font = "12px Arial";
      bar.textBaseline = "middle";
      bar.textAlign = "end";
      bar.fillStyle = "rgb(239,54,251)";

      for (let i = 1; i <= ticks; i++) {
        bar.beginPath();
        bar.moveTo(100, yStart - yStep * i);
        bar.lineTo(90, yStart - yStep * i);
        bar.strokeStyle = "#ccc";
        bar.stroke();
        // 绘制label
        bar.fillText(yStepLabel * i, 100 - 15, yStart - yStep * i);
      }
      // console.log(this.chart.yAxis.data);
    },
    // y轴显示标签
    yTickLabel(bar, ticks) {
      const arr = this.chart.yAxis.data;
      // 找出数组中的最大值
      const arrMax = eval("Math.max(" + arr.toString() + ")");
      // 最大值的第一个数字
      const arrMaxFirstInt = Math.floor(arrMax / 10).toString()[0];
      // 最大值的幂
      const power = Math.floor(arrMax / 10).toString().length;
      // 最大值下舍入
      const powerInt = Math.pow(10, power) * arrMaxFirstInt;
      // 最大值的商
      const consult = Math.floor(arrMaxFirstInt / ticks);
      // 获取下一个可以除尽8的值
      const nextMax = this.getNextMaxMinStep(arrMax,ticks)//this.getNextMax(arrMaxFirstInt, consult, power, ticks);
      console.log(nextMax)
      this.yMax = nextMax;
      // step值
      const yStepLabel = nextMax / ticks;
      const labelWidth = 60;

      return {
        arrMaxFirstInt,
        power,
        powerInt,
        consult,
        yStepLabel,
        labelWidth
      };
    },

    // 直接获取下一个可以除尽ticks得值
    getNextMaxMinStep(arrMax,ticks){
      for(let i = arrMax;i<arrMax+ticks;i++){
        if(!((i*100)%8)){
          return i;
        }
      }
    },

    // 获取下一个可以除尽8的值
    getNextMax(arrMaxFirstInt, consult, power, ticks) {
      for (let i = (arrMaxFirstInt % ticks) + 1; i <= ticks; i++) {
        if (!(((consult * ticks + i) * Math.pow(10, power)) % ticks)) {
          return (consult * ticks + i) * Math.pow(10, power);
        }
      }
    },
    // x 坐标轴相关处理
    xAxis(bar) {
      // y轴起点
      const yStart = this.height - 100;
      // y轴终点
      const yEnd = 100 + 30;
      // y轴高度
      const yHeight = yStart - yEnd;
      // x轴起点坐标(0,0)设置
      const xStart = 100;
      // x轴终点坐标
      const xEnd = this.width - 100 - 50;
      // x轴显示长度
      const xLength = xEnd - xStart;
      // x轴显示数据长度
      const yData = this.chart.yAxis.data;
      const xData = this.chart.xAxis.data;
      const xDataLenth = xData.length;
      // x步宽
      const xStep = Math.floor(xLength / xDataLenth);
      // x半步宽
      const xStepMiddle = xStep / 2;

      // 数据宽度
      const xItemWidth = "50%";
      // 数据宽度
      const dataItemLength = xStep * (parseInt(xItemWidth) / 100);
      const dataItemMiddle = dataItemLength / 2;
      bar.fillStyle = "rgb(15,168,249)";
      bar.textAlign = "center";
      for (let i = 0; i < xDataLenth; i++) {
        const rectStartX = xStepMiddle - dataItemMiddle + i * xStep + xStart;
        const rectHeight = (yData[i] * yHeight) / this.yMax;
        const rectStartY = yStart - rectHeight;

        // 刻度绘制
        bar.beginPath();
        bar.moveTo(xStepMiddle + i * xStep + xStart, yStart);
        bar.lineTo(xStepMiddle + i * xStep + xStart, yStart + 10);
        bar.stroke();
        // 刻度label
        bar.fillText(xData[i], xStepMiddle + i * xStep + xStart, yStart + 20);
        // 值得绘制
        bar.fillText(
          yData[i],
          xStepMiddle + i * xStep + xStart,
          yStart - rectHeight - 10
        );
        // 条形绘制
        bar.fillRect(rectStartX, rectStartY, dataItemLength, rectHeight);
      }

      // 折线绘制
      this.strokeLine(bar, {
        xStepMiddle,
        xStep,
        xStart,
        yStart,
        yHeight
      });
    },
    // 折线绘制
    strokeLine(bar, { xStepMiddle, xStep, xStart, yStart, yHeight }) {
      const data = this.chart.yAxis.data;
      bar.beginPath();
      bar.moveTo(
        xStepMiddle + xStart,
        yStart - (yHeight * data[0]) / this.yMax
      );
      bar.strokeStyle = "rgb(239,54,251)";
      for (let i = 1; i < data.length; i++) {
        bar.lineTo(
          xStepMiddle + i * xStep + xStart,
          yStart - (yHeight * data[i]) / this.yMax
        );
      }
      bar.stroke();
    }
  }
};
</script>


