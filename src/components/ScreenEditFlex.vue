<template>
  <div class="screen-edit-container">
    <div class="screen-edit-components">
      <draggable
        class="dragArea"
        :list="list1"
        :group="{ name: 'people', pull: 'clone', put: false }"
        @change="log"
      >
        <menu-list v-for="item in list1" :key="item.id" :entity="item"></menu-list>
        <!-- <div
          class="list-group-item"
          v-for="element in list1"
          :key="element.title"
        >{{ element.title }}</div>-->
      </draggable>
    </div>
    <div class="screen-simulate">
      <img src="./../assets/screen.jpg" alt />
      <div class="screen-client">
        <div class="drop-container">
          <draggable
            class="wrap row dragArea list-group"
            handle=".handle"
            :list="list"
            group="people"
            @change="log"
          >
            <ContainerMenu :entity="item" v-for="(item,index) in list" :key="index"></ContainerMenu>
          </draggable>
        </div>


      </div>
    </div>
    <div class="screen-edit-tools">
      <label for="w">宽度:</label>
      <select id="w" @change="editItem()" v-model="itemConfig.w">
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
import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import MenuList from "./base/MenuList";
import ContainerMenu from "./base/ContainerMenu";

Vue.use(Vuetify);

export default {
  name: "ScreenEdit",
  display: "Transitions",
  components: {
    draggable,
    MenuList,
    ContainerMenu
  },
  data: () => ({
    itemFlag: 0,
    itemConfig: { w: 0 },
    list1: [
      { title: "容器组件", id: 1, type: "container" },
      { title: "Joao", id: 2, type: "snow" },
      { title: "Jean", id: 3, type: "fly" },
      { title: "Gerard", id: 4, type: "sky" }
    ],
    list: [],
    rows: [
      {
        items: [
          {
            title: "item 4"
          },
          {
            title: "item 5"
          },
          {
            title: "item 6"
          },
          {
            title: "item 7"
          },
          {
            title: "item 8"
          },
          {
            title: "item 116"
          },
          {
            title: "item 17"
          },
          {
            title: "item 18"
          },
          {
            title: "item 9"
          },
          {
            title: "item 16"
          },
          {
            title: "item 3"
          }
        ]
      }
    ]
  }),
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
    log(e) {
      console.log(e);
    }
    // choiceItem(index) {
    //   this.itemFlag = index;
    //   this.itemConfig.w = "";
    // },
    // editItem() {
    //   this.rows[0].items[this.itemFlag].style = {
    //     flexBasis: (this.itemConfig.w / 4) * 100 + "%"
    //     // height:this.itemConfig.w > 2 ? '200px' : '100px'
    //   };
    // }
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
  overflow-x: hidden;
}

.layout.row {
  justify-content: flex-start;
  align-items: baseline;
}
.theme--light.v-sheet.active {
  background-color: aquamarine;
}
.flex.xs4 {
  max-width: none;
}

/* 2020/05/12 17:09 */
.list-group {
  height: auto;
  width: 100%;
}
.list-group.active {
  background-color: aquamarine;
}
/* 2020/05/13 */
.drop-container {
  width: 100%;
  min-height: 100px;
  height: auto;
}
.drop-container .dragArea {
  display: flex;
  flex-wrap: wrap;
  min-height: 100px;
}
</style>

