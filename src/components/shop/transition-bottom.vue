<template>
	<transition name="bottom">
		<div class="mask fixed" v-show="show" @click="show=false">
			<div class="bottom abs-b"  @click.stop>
				<div class="header" v-if="title">
					<span class="s1" @click="show=false">{{cellName[title]}}</span>
					<template v-if="rightButton=='del'">
						<i class="icon-del" @click="show=false">&#xe628;</i>
					</template>
					<template v-if="rightButton=='sure'">
						<span class="s2" @click="sure">确定</span>
					</template>
				</div>
				<slot></slot>
			</div>
		</div>
	</transition>
</template>
<script>
export default {
  name: "TransitionBottom",
  props: {
    title: {
      type: String,
      default: ""
		},
		rightButton:{
			type:String,
			default:'del'
		}
  },
  data() {
    return {
			show: false,
			cellName:{
				color:'颜色',
				deliver:'取消',
				fee:'运费'
			}
    };
	},
	methods: {
		sure(){
			this.show=false
			this.$emit('deliverData',this.$slots.default[0].children[0].componentInstance.currentAddress)
		}
	},
	watch:{
		show(newS){
			if(newS){
				this.$emit('show',this.title)
			}
		}
	}
};
</script>
<style lang="scss" scoped>
@import "@/common/scss/color.scss";
@import "@/common/scss/mixin.scss";
@import "@/common/scss/icon.scss";

.mask {
  z-index: 10000;
  background: $gray_3_9;
  .bottom {
		background: $white;
		.header{
			position: relative;
			height:90px;
			line-height:90px;
			font-size:30px;
			text-align:left;
			padding:0 20px;
			&:after{
				@include border-1px()
			}
			.s1{
				font-size:30px;
			}
			i,.s2{
				float:right;
				font-size:30px;
				padding:0 50px;
				margin-right:-50px;
			}
		}
  }
}
.content {
  height: 200px;
}
.bottom-enter-active,
.bottom-leave-active {
	transition: all .2s;
	.bottom {
		transition: all .2s;
	}
}

.bottom-enter,
.bottom-leave-to {
	opacity: 0;
  .bottom {
    transform: translate3d(0, 100%, 0);
  }
}
</style>


