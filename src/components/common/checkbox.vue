<template>
	<div class="circle-wrapper">
		<span class="circle" :class="{active:isSelected}" @click="boxClick">
			<i class="icon-right" v-show="isSelected">&#xe687;</i>
		</span>
	</div>
</template>
<script>
export default {
	name:'Checkbox',
	props:{
		isSelected:{
			type:Boolean,
			default:false
		},
		boxSelected:{
			type:Function
		}
	},
	methods: {
		boxClick(){
			//this.$emit('boxSelected')
			this.boxSelected()
		}
	},
}
</script>

<style lang="scss" scoped>
@import "@/common/scss/color.scss";
@import "@/common/scss/mixin.scss";
@import "@/common/scss/icon.scss";
.circle-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  .circle {
    position: relative;
    display: inline-block;
    width: 44px;
    height: 44px;
    box-sizing: border-box;
    &:not(.active)::after {
      @include border-1px(arc, $gray_3_9);
      border-radius: 50%;
    }
    &.active {
      background: $red_2;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon-right {
        font-size: 28px;
        color: $white;
      }
    }
  }
}
</style>
