<template>
	<div class="confirm" v-show="show">
		<div class="wrapper">
			<span  class="cancel" @click="cancel">{{cancelText}}</span>
			<span  class="sure" @click="sure">{{sureText}}</span>
		</div>
	</div>
</template>
<script>
export default {
	name:'Confirm',
	props:{
		cancelText:{
			type:String,
			default:'取消'
		},
		sureText:{
			type:String,
			default:'确定'
		}
	},
	data(){
		return {
			show:false
		}
	},
	methods: {
		cancel(){
			this.show=false
			this.$emit('cancel')
		},
		sure(){
			this.show=false
			this.$emit('sure')
		}
	},
}
</script>
<style lang="scss" scoped>
@import "@/common/scss/color.scss";
@import "@/common/scss/mixin.scss";

.confirm{
	position:fixed;
	top:0;
	bottom:0;
	left:0;
	right:0;
	z-index:10000;
	background:$gray_3_9;
	.wrapper{
		position: relative;
		width:80%;
		height:150px;
		line-height:150px;
		background:$white_1;
		top:50%;
		left:50%;
		transform: translate(-50%,-50%);
		border-radius: 10px;
		span{
			padding:10px 100px;
			font-size:30px;
		}
		.sure{
			position: relative;
			&::after{
				@include border-1px(vert);
			}
		}
	}
}
</style>


