<template>
  <div id="app" ref="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "@/common/scss/color.scss";
#app {
	font: 24px/1.14 "Microsoft YaHei","微软雅黑","宋体",helvetica,"Hiragino Sans GB";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
	background:$red_1;
	width:100%;
	height:100%;
}
</style>
