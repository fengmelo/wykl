<template>
	<div class="top-bar">
		<span class="top-bar-left">
			<i v-if="leftType=='back'" @click="backIcon" class="icon-back">&#xe614;</i>
		</span>
		<span class="top-bar-title">{{title}}</span>
		<span class="top-bar-right">
			<slot></slot>
		</span>
	</div>
</template>
<script>
export default {
	name:'TopBar',
	props:{
		title:{
			type:String,
			default:''
		},
		leftType:{
			type:String,
			default:'back'
		}
	},
	mounted() {},
	methods: {
		backIcon(){
			this.$listeners.back?this.$emit('back'):this.$router.go(-1)
		}
	},
}
</script>
<style lang="scss" scoped>
@import "@/common/scss/color.scss";
@import "@/common/scss/icon.scss";
@import "@/common/scss/mixin.scss";
.top-bar{
	position:fixed;
	top:0;
	left:0;
	right:0;
	height:100px;
	background:$white;
	z-index:100;
	display:flex;
	align-items:center;
	&::after{
		@include border-1px()
	}
	&-left,&-right{
		text-align: center;
		width:100px;
		flex-shrink:1;
	}
	.icon-back{
	
		//width:100px;
		font-size:30px;
	}
	
	&-title{
		text-align: center;
		flex:1;
		font-size:30px;
		color:$gray_3;
	}
}
</style>


