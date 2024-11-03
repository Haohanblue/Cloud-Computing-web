<template>
  <div class="app-container">
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>


</script>

<style scoped>
.app-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
}

#sell{
  margin-left: 0;
  padding: 0;
}
#purchase{
  margin-left: 0;
  padding: 0;
}
#pane-purchase > div{
  padding: 0;
  margin: 0;
}
.app-title {
  text-align: center;
  margin: 20px 0;
  font-size: 24px;
  color: #333;
}

.main-container {
  display: flex;
  flex: 1;
  position: relative;
}

.aside-container {
  background-color: #fff;
  overflow: hidden;
  transition: width 0.2s;
}

.stock-container {
  background-color: #fff;
  overflow: auto;
  flex-grow: 1;
}

.drag-bar {
  width: 5px;
  background-color: #ccc;
  cursor: ew-resize;
  z-index: 10;
}
</style>
