<template>
  <draggable class="dragArea list-group" :list="entity" group="people" @change="log">
    <div class="list-group-item" v-for="element in entity" :key="element.name">基础组件{{ element.name }}</div>
  </draggable>
</template>
<script>
import draggable from "vuedraggable";
export default {
  name: "BaseComponet",
  components: {
    draggable
  },
  props: {
    entity: { type: Array }
  },
  methods:{
    log(evt){
      console.log(evt)
    }
  }
};
</script>
