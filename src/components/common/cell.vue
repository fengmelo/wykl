<template>
	<div class="cell" :class="{line:line}" @click="clickCell">
		<span class="title">{{title}}</span>
		<div class="content">
			<slot></slot>
		</div>
		<span class="desc" v-if="desc">{{desc}}</span>
		<i class="icon-right" v-if="arrow">&#xe68b;</i>
	</div>
</template>
<script>
export default {
  name: "Cell",
  props: {
    title: {
      type: String,
      default: ""
    },
    cellName: {
      type: String,
      default: ""
    },
    line: {
      type: Boolean,
      default: true
		},
		desc:{
			type: String,
      default: ""
		},
		arrow:{
			type: Boolean,
      default: true
		}
  },

  methods: {
    clickCell() {
      this.$emit("clickCell", this.cellName);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/icon.scss";
@import "@/common/scss/mixin.scss";

.cell {
  position: relative;
  display: flex;
  align-content: center;
  padding: 26px 20px 30px;
  text-align: left;
  font-size: 26px;
  &.line {
    &:after {
      @include border-1px();
    }
  }
  .title {
    font-size: 28px;
    width: 100px;
    flex-shrink: 1;
	}
	.desc{
		font-size: 22px;
		margin-right:50px;
		color:$black_3;
	}
  .content {
    flex: 1;
    margin-right: 60px;
    span {
      font-size: 20px;
    }
  }
  .icon-right {
    position: absolute;
    right: 0;
    width: 60px;
    flex-shrink: 1;
  }
}
</style>



