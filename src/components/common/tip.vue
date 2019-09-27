<template>
	<div class="tip" v-show="show">
		<span>{{msg}}</span>
	</div>
</template>
<script>
export default {
	name:'Tip',
	props:{
		duration:{
			type:Number,
			default:1000
		}
	},
	data(){
		return {
			msg:'请选择颜色',
			show:false
		}
	},
	methods: {
		showTip(msg){
			msg&&(this.msg=msg)
			this.show=true
			setTimeout(()=>{
				this.hideTip()
			},this.duration)
		},
		hideTip(){
			this.show=false
		}
	},
}
</script>
<style lang="scss" scoped>
@import "@/common/scss/color.scss";
.tip{
	position:fixed;
	top:50%;
	left:50%;
	transform:translate(-50%,-50%);
	padding:20px 40px;
	font-size:30px;
	color:$white;
	background:$gray_3_9;
	z-index:10001
}
</style>

