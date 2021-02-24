<template>
  <div class="screen-edit-container">
    <div class="screen-edit-components">
      <div class="list-group-item" @click="add">添加容器组件</div>
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
      <drag-nested :tasks="tasks"></drag-nested>
    </div>
    <div class="screen-edit-tools">
      <div @click="getResult">获取结果</div>
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
        // { name: "容器组件", type: "container", id: 10, tasks: [] },
        // { name: "John", id: 1, type: "container", tasks: [] },
        // { name: "Joao", id: 2, type: "container", tasks: [] },
        // { name: "Jean", id: 3, type: "container", tasks: [] },
        // { name: "Gerard", id: 4, type: "container", tasks: [] }
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
      // this.setClientHeight();
      this.initList();
    },
    initList() {
      document.querySelector(".screen-simulate").style.height =
        window.innerHeight - 100 + "px";
      for (let i = 0; i < 10; i++) {
        this.list1.push({ name: "组件" + i, id: 10 + i });
      }
    },
    add() {
      // console.log("tasks:", this.tasks);
      this.a++;
      this.tasks.push({
        name: "",
        type: "container",
        id: 10 + this.a,
        tasks: []
      });
    },
    getResult() {
      console.log("result:", this.tasks);
    },
    // setClientHeight() {
    //   const container = document
    //     .querySelector(".screen-client")
    //     .getBoundingClientRect();
    //   const h = (container.width * 9) / 16;
    //   document.querySelector(".screen-client").style.height = h + "px";
    // },
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
}
.screen-edit-container .screen-edit-tools,
.screen-edit-container .screen-edit-components {
  flex: 0 0 300px;
  border: 1px solid #ccc;
}
.screen-edit-container .screen-simulate {
  flex: 1;
  position: relative;
  margin: 10px 20px;
  border: 1px solid #eee;
  border-radius: 5px;
  overflow: auto;
}

.list-group-item {
  height: 30px;
  line-height: 30px;
  border-bottom: 1px solid #eee;
}

.list-container.active {
  background: #67c23a;
}
</style>
