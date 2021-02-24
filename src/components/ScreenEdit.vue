<template>
  <div class="screen-edit-container">
    <div class="screen-edit-components">
      <draggable
        class="dragArea list-group"
        :list="list1"
        :group="{ name: 'people', pull: 'clone', put: false }"
        @change="log"
      >
        <div class="list-group-item" v-for="element in list1" :key="element.name">{{ element.name }}</div>
      </draggable>
    </div>
    <div class="screen-simulate">
      <img src="./../assets/screen.jpg" alt />
      <div class="screen-client">
        <div class="list-container" :style="list1Style" :class="{active:listFlag === 1}" @click="selectContainer(1)">
          <draggable class="dragArea list-group" :list="list2" group="people" @change="log">
            <div
              class="list-group-item"
              v-for="element in list2"
              :key="element.name"
            >{{ element.name }}</div>
          </draggable>
        </div>
        <div class="list-container" :style="list2Style" :class="{active:listFlag === 2}" @click="selectContainer(2)">
          <draggable
            class="dragArea list-group"
            :list="list3"
            group="people"
            @change="log"
          >
            <div
              class="list-group-item"
              v-for="element in list3"
              :key="element.name"
            >{{ element.name }}</div>
          </draggable>
        </div>
      </div>
    </div>
    <div class="screen-edit-tools">
      <label for="w">宽度:</label>
      <select id="w" v-model='w' @change="changeWidth">
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
export default {
  name: "ScreenEdit",
  components: {
    draggable
  },
  data() {
    return {
      w:0,
      list1Style:{},
      list2Style:{},
      listFlag: 0,
      list1: [
        { name: "John", id: 1 },
        { name: "Joao", id: 2 },
        { name: "Jean", id: 3 },
        { name: "Gerard", id: 4 }
      ],
      list2: [
        { name: "Juan", id: 5 },
        { name: "Edgard", id: 6 },
        { name: "Johnson", id: 7 }
      ],
      list3: []
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
      const container = document
        .querySelector(".screen-client")
        .getBoundingClientRect();
      const h = (container.width * 9) / 16;
      document.querySelector(".screen-client").style.height = h + "px";
    },
    log: function(evt) {
      window.console.log(evt);
    },
    selectContainer(flag) {
      this.listFlag = flag;
    },
    changeWidth(){
      console.log(document.querySelector('.screen-client').getBoundingClientRect().width)
      this.list1Style.width = (this.w/4)*document.querySelector('.screen-client').getBoundingClientRect().width + 'px'
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
  width: 30%;
}
.list-container.active {
  background: #67c23a;
}
</style>

