<template>
	<div class="input">
		<input type="text" v-model="query" :placeholder="placeholder" />
		<slot></slot>
	</div>
</template>
<script>
export default {
	data(){
		return {
			query:''
		}
	},
	props:{
		placeholder:{
			type:String,
			default:''
		}
	},
	watch: {
		query(newQ,oldQ){
			if(newQ!=oldQ){
				this.$emit('query',newQ)
			}
		}
	},
}
</script>
<style lang="scss" scoped>
@import "@/common/scss/color.scss";

.input{
	position: relative;
	height: 84px;
	>input{
		width:100%;
		height: 100%;
		background:$gray_5;
		border-radius: 40px;
		padding-left:30px;
		box-sizing: border-box;
		font-size:26px;
	}
}
</style>


