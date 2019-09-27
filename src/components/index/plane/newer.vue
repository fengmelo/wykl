<template>
	<plane title="新人专享" class="newer">
		<div class="newer-content">
			<img src="https://haitao.nosdn1.127.net/fac999b1-2686-41bd-b25d-ae604c3828a1T1908021548_960_673.jpg?imageView&thumbnail=750x526&quality=80&type=webp"/>
			<a class="newer-content-top" href="javascript:;" @click="clickAd(1)"></a>
			<div>
				<a class="newer-content-bottom-left" href="javascript:;" @click="clickAd(2)"></a>
				<div>
					<a class="newer-content-bottom-right1" href="javascript:;" @click="clickAd(3)"></a>
					<a class="newer-content-bottom-right2" href="javascript:;" @click="clickAd(4)"></a>
				</div>
			</div>
		</div>
	</plane>
</template>
<script>
import Plane from "@/components/plane.vue";

export default {
	methods: {
		clickAd(number){
			console.log(number)
		}
	},
	components:{
		Plane
	}
}
</script>

<style lang="scss" scoped>
.newer{
	width:100%;
	padding-left:0 !important;
	&-content{
		width:100%;
		height:526px;
		position:relative;
		>img{
			width:100%;
			height:100%;
		}
		a{
			display:block;
		}
		&-top{
			position:absolute;
			top:0;
			height:170px;
			width:100%;
		}
		&-bottom-left{
			position:absolute;
			top:170px;
			height:350px;
			width:50%;
		}
		&-bottom-right1{
			position:absolute;
			top:170px;
			right:0;
			height:175px;
			width:50%;

		}
		&-bottom-right2{
			position:absolute;
			top:350px;
			right:0;
			height:175px;
			width:50%;
		}
	}
}
</style>
