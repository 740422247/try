<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!--<h2> Vuex : {{state.count}}</h2>-->
    <span>
       {{result.text}}
      :{{result.id}}
    </span>
    <h2 v-if="isShow">fullName:{{getFullName}}--{{isChecked}}</h2>
    <h2>{{showChecked}}</h2>
    <a @click="alertFullName()">弹出全名</a><br>
    <button @click.ctrl="altClick()">即使 Alt 或 Shift 被一同按下时也会触发</button>
    <br>
    <button @click.ctrl.exact="ctrlExact()">有且只有 Ctrl 被按下的时候才触发</button>
    <br>
    <button @click.exact="exactClick()">没有任何系统修饰符被按下的时候才触发</button>
    <br>
    <input type="text" v-model="msg">

    <input type="checkbox" value="hello world" v-model="isChecked">
    <input type="checkbox" value="hello world" v-model="showChecked">

    <div>
      复选框绑定值特点： <br>
      1、初始值不是数组，初始不败你，结果是返回Boolean值； <br>
          2、初始值为数组，结果返回value中的值。 <br>
      <div id='example-3'>
        <input type="checkbox" value="hello" v-model="checkedNames">

        <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
        <label for="jack">Jack</label>
        <input type="checkbox" id="john" value="John" v-model="checkedNames">
        <label for="john">John</label>
        <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
        <label for="mike">Mike</label>
        <br>
        <span>Checked names: {{ checkedNames }}</span>
      </div>
    </div>

    <div>
      单选框：结果均为字符串
      <div id="example-4">
        <input type="radio" id="one" value="One" v-model="picked">
        <label for="one">One</label>
        <br>
        <input type="radio" id="two" value="Two" v-model="picked">
        <label for="two">Two</label>
        <br>
        <span>Picked: {{ picked }}</span>
      </div>
      <input type="radio" id="first" value="first" v-model="pickedFirst">
      <label for="first">{{pickedFirst}}</label>
    </div>

    <div>
      选项框： <br>
      单选select为字符串
      <div id="example-5">
        <select v-model="selected">
          <option disabled value="">请选择</option>
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </select>
        <span>Selected: {{ selected }}</span>
      </div>
    </div>

    <div>
      v-model.lazy:为失去焦点时触发 <br>
      <span>{{msg1}}</span>
      <input type="text" v-model.lazy="msg1">
      <br>
      <span>{{msgNum}}</span>
      <input v-model.number="msgNum" type="number">
      <br>
      首位去空白：
      <span @click="look()" style="width:80px;border:1px solid #ccc;border-radius:4px;display:inline-block;">{{msgTrim.length}}</span>
      <input type="text" v-model.trim="msgTrim">
      <router-link to="/comp">查看</router-link>
    </div>

  </div>
</template>

<script>
  import store from '../store/store'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      isShow:true,
      fullName:'',
      isChecked:false,
      checkedNames:[],
      showChecked:[],
      picked:[],
      pickedFirst:false,
      selected:'',
      msg1:'',
      msgNum:0,
      msgTrim:'fdssd',
      result:[]
    }
  },
  computed:{
    getFullName: function () {
      return store.state.fullName.firstName + ' ' + store.state.fullName.lastName
    }
  },
  watch: {

  },
  mounted() {
    this.result = store.state.todos.find(item => item.id === 1)
    console.log(store.state.count)
  },
  methods:{
    look(){
      this.$notify({})
    },
    alertFullName(){
      this.fullName = store.state.fullName.firstName + ' ' + store.state.fullName.lastName
      alert(this.fullName)
    },
    altClick(){
      alert('即使 Alt 或 Shift 被一同按下时也会触发')
    },
    ctrlExact() {
      alert('有且只有 Ctrl 被按下的时候才触发')
    },
    exactClick(){
      alert('没有任何系统修饰符被按下的时候才触发')
    }
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
  button{
    margin:8px;
  }
</style>
