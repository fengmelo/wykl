<template>
	<div class="loading" v-show="show">
		<i class='icon-loading' >&#xe612;</i>
	</div>
</template>
<script>
export default {
	data(){
		return {
			show:true
		}
	}
}
</script>

<style lang="scss" scoped>
@import "@/common/scss/icon.scss";
@import "@/common/scss/color.scss";

@keyframes loader {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(720deg);
  }
}
.loading{
	width:100%;
	height:100px;
	display:flex;
	justify-content: center;
	align-items: center;
	.icon-loading{
		color:$red_7;
		font-size:40px;
		animation: loader 3s ease-in-out infinite;
	}
}
</style>
