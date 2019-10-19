<template>
  <div>
    <transition name="addr" v-on:after-leave="afterLeave">
      <div class="mypicker" v-show="show">
        <span class="mui-icon mui-icon-closeempty picker_close" @click.stop="show = !show">
          <span class="line1"></span>
          <span class="line2"></span>
        </span>
        <!--<div class="picker_top">-->
        <!--<span class="cancel_btn">取消</span>-->
        <!--<span class="ok_btn">确认</span>-->
        <!--</div>-->
        <div class="picker_container">
          <div class="picker_content" :style="picker_content">

            <div class="scroll_hidden" :style="sh" v-for="(item,index) in itemData" :key="index" :dataIndex="index">
              <div class="picker_select" :style="pickerItem" :dataIndex="index">
                <span class="picker_select_text">选中</span>
              </div>
              <ul class="picker_item" :style="pickerItem">
                 <li v-for="(addrDetail,i) in item" :key="i" :dataId="index+addrDetail.value">
                    <span @click="check(addrDetail,index)">{{addrDetail.text}}</span>
                 </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </transition>
    <div class="picker_mask" @click.stop="show = !show"></div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      show: false
    };
  },
  methods: {
    afterLeave() {
      this.$emit("closed");
    }
  }
};
</script>
<style scoped>
.addr-enter-active,
.addr-leave-active {
  transform: translateY(0px);
  transition: all 0.5s ease;
}
.addr-enter,
.addr-leave-to {
  transform: translateY(400px);
  transition: all 0.5s ease;
}

.picker_close .line1 {
  transform: rotate(45deg);
}
.picker_close .line2 {
  transform: rotate(135deg);
}
.picker_close {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 2000;
  cursor: pointer;
  font-weight: 600;
  width: 20px;
  height: 20px;
}
.picker_close span {
  width: 16px;
  height: 0;
  border: 1px solid #ccc;
  display: inline-block;
  position: absolute;
  top: 9px;
  left: 2px;
}

.picker_mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 500;
  transition: top 0s ease, opacity 0.3s ease 0.1s;
}
/*.picker_mask{*/
/*transition: top 0s ease .3s,opacity .3s ease;*/
/*}*/
.mypicker {
  width: 100%;
  height: 342px;
  background-color: #eee;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;
}

.picker_container {
  width: 100%;
  height: 342px;
  overflow: hidden;
  position: relative;
}
.picker_select {
  padding: 10px 0;
  height: 70px;
  line-height: 70px;
  width: 120px;
  background-color: #fff;
  text-align: center;
}
.picker_select_text {
  height: 30px;
  line-height: 30px;
  border-radius: 15px;
  background-color: #e0ecff;
  color: #888;
  width: 70%;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
  top: 10px;
}
.picker_select.active .picker_select_text {
  background: linear-gradient(
    90deg,
    rgba(53, 158, 253, 1),
    rgba(69, 119, 247, 1)
  );
  color: #fff;
}
.picker_content {
  width: 440px;
  position: absolute;
  left: 0;
  transition: all 0.3s ease;
}
.scroll_hidden {
  width: 110px;
  overflow: hidden;
  float: left;
}
.picker_item {
  width: 120px;
  float: left;
  margin: 10px 0;
  padding: 0;
  height: 252px;
  overflow: auto;
  position: relative;
}
.picker_item > li {
  width: 100%;
  height: 36px;
  line-height: 36px;
  list-style: none;
  text-align: center;
  color: #333;
  padding: 0;
  position: relative;
}
.picker_item > li > span {
  padding: 0 12px;
  height: 30px;
  line-height: 30px;
  border-radius: 15px;
  width: 70%;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
  top: 10px;
}
.picker_item > li.active > span {
  color: #2f82ff;
  background-color: #e0ecff;
}
</style>
