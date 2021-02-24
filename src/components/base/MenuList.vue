<template>
  <div class="list-group-item">{{entity.title}}</div>
</template>
<script>
export default {
  name: "MenuList",
  props: {
    entity: { type: Object }
  }
};
</script>
<style>
.list-group-item {
  height: 36px;
  line-height: 36px;
  border-bottom: 1px dashed #ccc;
}
</style>
