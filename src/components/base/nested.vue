<template>
  <draggable class="dragArea nested" :list="tasks" @end="log" :group="{ name: 'people' }">
    <div v-for="(el,index) in tasks" class="client-item" :key="el.name + index">
      <p>{{ el.name }}</p>
      <p>设置</p>
      <base-component :entity="el.tasks"></base-component>
      <!-- <draggable v-if="el.type === 'container'" :tasks="el.tasks" class="drag-item">

      <draggable/>-->
    </div>
  </draggable>
</template>
<script>
import draggable from "vuedraggable";
import BaseComponent from "./BaseComponent";

export default {
  name: "nested-draggable",

  props: {
    tasks: {
      type: Array
    }
  },
  components: {
    draggable,
    BaseComponent
  },
  methods: {
    log(e) {
      console.log("end:", this.tasks);
    }
  }
};
</script>
<style scoped>
.nested {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  min-height: 50px;
  margin-bottom: 10px;
}
.nested .client-item {
  flex-basis: 33%;
  position: relative;
  height: 200px;
  border: 1px solid #ccc;
}
.dragArea .drag-item {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
