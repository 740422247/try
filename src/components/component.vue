<template>
  <div id="comp">
    <h2>组件</h2>
    <router-link to="/">返回</router-link>
    <h3>{{initMoney}}</h3>
    <h3>{{result.text}}:{{result.id}}</h3>
    <h3>getterData:{{result1.text}}:{{result1.id}}</h3>
    <h3>
      <button @click="subtract({num:5})">-</button>
      <button @click="increment(5)">+</button>
      <span>{{count2}}</span>
    </h3>
    <h3>{{count3}}</h3>
    <h3>
      <button @click="subtractAsync()">Async-</button>
      <button @click="incrementAsync()">Async+</button>
      <span>{{count1}}</span>
    </h3>
    <h3>
      <button @click="expert()">123</button>
    </h3>

    <button @click.stop="notify">提示</button>
    <button @click="addr">显示picker</button>
    <hr />
    <span>picker结果：{{addrResult}}</span>

    <!-- <addr></addr> -->
  </div>
</template>

<script>
import Rx from "rxjs/Rx";
import store from "@/store/store";
import { mapMutations, mapActions, mapState } from "vuex";

export default {
  name: "comp",

  data() {
    return {
      count: 1,
      result: {},
      result1: {},
      addrResult: "",
      addrSelect: []

      // myObservable : new Rx.Subject()
    };
  },

  mounted() {
    // 调用时this.$store = store
    this.result = store.state.todos.find(item => item.done);
    this.result1 = this.$store.getters.getById(2);
  },
  computed: {
    ...mapState({
      count1: function() {
        return store.state.count * 2;
      },
      count2() {
        return store.state.count * 2;
      },
      count3: state => state.todos.find(item => item.id === 2).num,
      initMoney: function() {
        return `$${store.state.count}`;
      }
    })
  },
  methods: {
    ...mapMutations(["subtract", "increment"]),
    ...mapActions(["incrementAsync", "subtractAsync"]),
    expert() {
      // myObservable.subscribe(value => console.log(value));
      // myObservable.next('foo');
    },
    notify() {
      this.$notify({
        content: "<a style='color:red;'>保存成功</a>",
        btn: "确定",
        time: 3000,
        allow: true
      });
    },
    addr() {
      const _this = this;

      this.$addrPicker({
        layer: 5,
        addr: _this.addrSelect,
        callback: function() {
          const data = [
            { value: "1", text: "四川" },
            { value: "2", text: "重庆" },
            { value: "3", text: "浙江" },
            { value: "4", text: "上海" },
            { value: "5", text: "北京" },
            { value: "10", text: "四川" },
            { value: "21", text: "重庆" },
            { value: "32", text: "浙江" },
            { value: "41", text: "上海" },
            { value: "51", text: "北京" },
            { value: "12", text: "四川" },
            { value: "23", text: "重庆" },
            { value: "34", text: "浙江" },
            { value: "45", text: "上海" },
            { value: "56", text: "北京" },
            { value: "67", text: "广东" }
          ];
          this.refresh(data);
        },
        result: function(selectIds) {
          _this.addrSelect = selectIds;
          let str = "";
          selectIds.forEach(item => {
            str += str ? "——" + item.text : item.text;
          });
          _this.addrResult = str;
        }
      });
    }
    // onMutation(num){
    //   this.$store.commit('increment',num);
    //   this.count = store.state.count
    // },
    // subtract(num){
    //   store.commit({type:'subtract',num});
    //   this.count = store.state.count
    // },
    // add(){
    //   store.dispatch('incrementAsync').then(() => {this.count = store.state.count});
    // },
    // asyncSubtract(){
    //   store.dispatch('subtractAsync').then(() => {this.count = store.state.count});
    // }
  }
};
</script>

<style scoped>
</style>
