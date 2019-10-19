<template>
  <transition name="addrShow" v-on:after-leave="afterLeave()">
    <div class="addr active" v-show="active">
      <div class="addr-content">{{content}}</div>
      <div class="addr-close" @click="addrClose()">{{btn}}</div>
    </div>
  </transition>
</template>
<style scoped>
.addrShow-enter-active,
.addrShow-leave-active {
  transform: translateY(00px);
  transition: all 0.5s ease;
}
.addrShow-enter,
.addrShow-leave-to {
  transform: translateY(400px);
  transition: all 0.5s ease;
}

.addr {
  height: 400px;
  width: 100%;
  background-color: #dfdfdf;
  border: 1px solid #ccc;
  position: fixed;
  left: 0;
  bottom:0px;
}
.addr .addr-content {
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.addr .addr-close {
  text-align: center;
  line-height: 10%;
}
</style>
<script>
export default {
  name: "addr",
  props: {
    content: {
      type: String,
      required: true
    },
    btn: {
      type: String,
      default: "关闭"
    },
    style1: {
      type: Object,
      default: function() {
        return { bottom: "-400px" };
      }
    }
  },
  data() {
    return {
      active: false
    };
  },
  mounted() {},
  methods: {
    addrClose() {
      this.active = false;
    }
  }
};
</script>

