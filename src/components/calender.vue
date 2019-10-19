<template>
  <div class="page-container">
    <div class="page-header">{{year}}年{{month}}月</div>
    <div class="calender-container">
      <div class="calender-row calender-week">
        <div class="calender-item">日</div>
        <div class="calender-item">一</div>
        <div class="calender-item">二</div>
        <div class="calender-item">三</div>
        <div class="calender-item">四</div>
        <div class="calender-item">五</div>
        <div class="calender-item">六</div>
      </div>
      <div class="calender-row" v-for="(row,i) in rows" :key="i">
        <div
          class="calender-item"
          :class="{notActive:item.isActive,isCurrDay:!item.isActive && item.day === dateMsg.day && item.month === dateMsg.month && item.year === dateMsg.year}"
          v-for="(item,j) in row"
          :key="j"
        >
          <span
            class="item-date"
            :class="{isCurrDay:!item.isActive && item.day === dateMsg.day && month === dateMsg.month && year === dateMsg.year}"
          >{{item.day}}</span>
          <div class="item-add">
            <div class="add-line1"></div>
            <div class="add-line2"></div>
          </div>

          <div class="item-todo" title="fdsafdsafsdafdsafsa">
            fdsafdsafsdafdsafsa
            <div class="item-close">
              <div class="close-line1"></div>
              <div class="close-line2"></div>
            </div>
          </div>
          <div class="item-todo" title="fdsafdsafsdafdsafsa">
            fdsafdsafsdafdsafsa
            <div class="item-close">
              <div class="close-line1"></div>
              <div class="close-line2"></div>
            </div>
          </div>
          <div class="item-todo" title="fdsafdsafsdafdsafsa">
            fdsafdsafsdafdsafsa
            <div class="item-close">
              <div class="close-line1"></div>
              <div class="close-line2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* 添加按钮 */
.item-add {
  float: right;
  width: 0px;
  height: 20px;
  transform: translate(-5px, 5px);
  position: relative;
  overflow: hidden;
}
.calender-item:hover .item-add {
  width: 20px;
}
.calender-item.notActive .item-add {
  display: none;
}
.item-add div {
  width: 12px;
  height: 2px;
  background-color: #26a59a;
  position: absolute;
  top: 9px;
  left: 4px;
  transition: all 0.5s ease;
}
.calender-item:hover .item-add .add-line1 {
  transform: rotate(180deg);
}
.calender-item:hover .item-add .add-line2 {
  transform: rotate(270deg);
}

.calender-container {
  border: 1px solid #aaa;
  width: 1050px;
  margin: 0 auto;
  border-right: none;
  display: flex;
  flex-direction: column;
}
.calender-row {
  border-bottom: 1px solid #aaa;
  display: flex;
  width: 1050px;
}

.calender-item {
  height: 120px;
  flex: 1;
  border-right: 1px solid #aaa;
  text-align: left;
  color: #888;
  width: 149px;
}
.calender-item.isCurrDay {
  background-color: #dae7ff;
}
.calender-item.notActive {
  color: #ccc;
}
.calender-item:hover{
  background-color:
}
.calender-week .calender-item {
  height: 36px;
  line-height: 36px;
  text-align: center;
}
.calender-item .item-date {
  padding: 0 8px;
  font-size: 20px;
  font-weight: 600;
  line-height: 36px;
}
.calender-item .item-date.isCurrDay {
  color: #2879ff;
}
.calender-item .item-todo {
  height: 28px;
  line-height: 28px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  position: relative;
  padding: 0 20px 0 8px;
}
.calender-item.notActive .item-todo {
  display: none;
}
.calender-item .item-todo:hover,
.calender-item .item-todo.active {
  background-color: #c9e9e6;
  color: #26a59a;
}
.item-todo .item-close {
  position: absolute;
  right: 0;
  top: 5px;
  width: 0px;
  height: 20px;
  /* background-color: rgba(0, 0, 0, 0.08); */
  border-radius: 50%;
}
.item-close div {
  width: 12px;
  height: 1px;
  position: absolute;
  top: 10px;
  left: 4px;
  background-color: #fff;
  transform: rotate(0deg);
  transition: all 0.5s ease-in;
}
.item-todo:hover .item-close {
  width: 20px;
}
.item-todo:hover .item-close div {
  background-color: #888;
}
.item-todo:hover .close-line1 {
  transition: all 0.5s ease-in;
  transform: rotate(135deg);
}
.item-todo:hover .close-line2 {
  transition: all 0.5s ease-in;
  transform: rotate(-135deg);
}
</style>
<script>
export default {
  data: () => ({
    rows: [],
    year: "",
    month: "",
    dateMsg: undefined
  }),
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const t = this.getDate(2019, 8);
      this.dateMsg = t;

      this.year = t.tYear;
      this.month = t.tMonth;
      console.log(this.dateMsg, this.year, this.month);
      // 获取上月最后一天
      let prevDay = this.getMonthLastDay(t.tYear, t.tMonth);
      // 获取本月最后一天
      let currMaxDay =
        t.tMonth === 12
          ? this.getMonthLastDay(t.tYear + 1, 1)
          : this.getMonthLastDay(t.tYear, t.tMonth + 1);
      // 获取1号是周几
      const tWeek = t.tWeek;
      // prevDay:上月的最后一天；currMaxDay:当月最后一天；tWeek:当月第一天是周几
      this.dealData(prevDay, currMaxDay, tWeek);
    },

    // 处理数据
    dealData(prevDay, currMaxDay, tWeek) {
      // 1号以前计算方法：(prevDay - tWeek + 1)
      let n = 0;
      let cols = [];
      this.rows = [];
      for (let i = 0; i < 42; i++) {
        if (i < tWeek) {
          // 前一月分
          cols.push({ day: prevDay - tWeek + i + 1, isActive: true });
        } else if (i >= tWeek && i < tWeek + currMaxDay) {
          // 当前月份
          cols.push({ day: i - tWeek + 1, isActive: false });
          // 换行处理
          if (!((i + 1) % 7)) {
            this.rows.push([...cols]);
            n++;
            cols = [];
          }
        } else {
          // 后一月份
          cols.push({ day: i - tWeek - currMaxDay + 1, isActive: true });
          if (!((i + 1) % 7)) {
            this.rows.push([...cols]);
            n++;
            cols = [];
          }
        }
      }
    },

    // 获取一个月最后一天
    getMonthLastDay(year, month) {
      if (
        month === 1 ||
        month === 2 ||
        month === 4 ||
        month === 6 ||
        month === 8 ||
        month === 9 ||
        month === 11
      ) {
        return 31;
      } else if (month === 5 || month === 7 || month === 10 || month === 12) {
        return 30;
      } else if (!year % 400 || (!year % 4 && year % 100)) {
        return 29;
      } else {
        return 28;
      }
    },
    // 获取日期
    getDate(year, month) {
      const now = new Date();
      const y = year ? year : now.getFullYear(),
        m = month ? month - 1 : now.getMonth();
      const targetDate = new Date(y, m, 1);
      return {
        // 当前日期
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        week: now.getDay(),
        day: now.getDate(),
        // 目标日期
        tYear: targetDate.getFullYear(),
        tMonth: targetDate.getMonth() + 1,
        tDay: targetDate.getDate(),
        tWeek: targetDate.getDay()
      };
    }
  }
};
</script>
