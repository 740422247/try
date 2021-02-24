<template>
  <div class="screen-edit-container">
    <div class="screen-edit-components">
      <draggable
        class="dragArea list-group"
        :list="list1"
        :group="{ name: 'people', pull: 'clone', put: false }"
        @start="log"
      >
        <div class="list-group-item" v-for="element in list1" :key="element.name">{{ element.name }}</div>
      </draggable>
    </div>
    <div class="screen-simulate">
      <img src="./../../assets/screen.jpg" alt />
      <div class="screen-client">
        <drag-nested :tasks="tasks"></drag-nested>
      </div>
    </div>
    <div class="screen-edit-tools">
      <label for="w">宽度:</label>
      <select id="w" v-model="w" @change="changeWidth">
        <option value="1">25%</option>
        <option value="2">50%</option>
        <option value="3">75%</option>
        <option value="4">100%</option>
      </select>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import dragNested from "./nested";
export default {
  name: "Nested",
  components: {
    draggable,
    dragNested
  },
  data() {
    return {
      w: 0,
      list1Style: {},
      list2Style: {},
      listFlag: 0,
      a: 0,
      list1: [
        { name: "容器组件", type: "container", id: 10, tasks: [] },
        { name: "John", id: 1, type: "container", tasks: [] },
        { name: "Joao", id: 2, type: "container", tasks: [] },
        { name: "Jean", id: 3, type: "container", tasks: [] },
        { name: "Gerard", id: 4, type: "container", tasks: [] }
      ],
      tasks: [
        // {
        //   name: "容器组件",
        //   type: "container",
        //   tasks: []
        // }
      ]
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.setClientHeight();
    },
    setClientHeight() {
      document.querySelector(".screen-simulate").style.height =
        window.innerHeight + "px";
    },
    log: function(evt) {
      // window.console.log(this.list1[0]);
      // this.a++;
      // this.list1[0].name = "容器组件" + this.a;
    },
    end(e) {
      // console.log("end:", e);
    },
    selectContainer(flag) {
      // this.listFlag = flag;
    },
    changeWidth() {
      // this.list1Style.width = (this.w/4)*document.querySelector('.screen-client').getBoundingClientRect().width + 'px'
    }
  }
};
</script>
<style>
.screen-edit-container {
  display: flex;
  overflow: auto;
}
.screen-edit-container .screen-edit-tools,
.screen-edit-container .screen-edit-components {
  flex: 0 0 300px;
  border: 1px solid #ccc;
}
.screen-edit-container .screen-simulate {
  flex: 1;
  position: relative;
  overflow: auto;
}
.screen-edit-container .screen-simulate img {
  width: 100%;
}
.screen-edit-container .screen-client {
  position: absolute;
  top: 8%;
  background: #fff;
  left: 5%;
  right: 5%;
  display: flex;
  flex-direction: row;
  /* flex-wrap: wrap; */
  overflow-x: hidden;
}
.list-group-item {
  height: 30px;
  line-height: 30px;
  border-bottom: 1px solid #eee;
}
.list-container {
  height: 100%;
  /* width: 30%; */
}
.screen-client > .dragArea {
  width: 100%;
  border: none !important;
}
.list-container.active {
  background: #67c23a;
}
</style>
