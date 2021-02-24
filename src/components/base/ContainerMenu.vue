<template>
  <div class="component-container"><span class="handle">拖动</span>容器组件  {{entity.title}}</div>
</template>
<script>
export default {
  name:"ContainerMenu",
  props:{
    entity:{type:Object}
  }
}
</script>
<style>
.component-container{
  width:100%;
  height:100px;
  border:1px dashed #eee;
  border-radius: 5px;
  flex-basis: 33.33%;
}

.handle{
  cursor: all-scroll;
}
</style>

