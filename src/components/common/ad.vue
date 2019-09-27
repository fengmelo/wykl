<template>
	<div class="ad">
		<div class="ad-left">
			<img src="https://haitao.nos.netease.com/3f581abf-9add-4877-a754-27c51bbdd597T1908152122_180_180.png?imageView&thumbnail=80x0&quality=95" alt="网易考拉">
			<div class="ad-left-text">
				<p>新人领1000元现金红包</p>
				<h3>网易考拉 就像你的网上免税店</h3>
			</div>
		</div>
		<div class="ad-right">
			下载领取
		</div>
	</div>
</template>
<script>
export default {
	name:'Ad'
}
</script>
<style lang="scss" scoped>
@import "@/common/scss/color.scss";
@import "@/common/scss/mixin.scss";

.ad{
	display:flex;
	width:100%;
	height:120px;
	position:relative;
	&-left{
		position:relative;
		flex:1;
		height:100%;
		display:flex;
		align-items:center;
		background:$white;
		padding-left:20px;
		&:after{
			@include border-1px()
		}
		img{
			display:block;
			width:90px;
			height:90px;
			box-shadow:0 0 0.04rem 0 rgba(0, 0, 0, 0.15);
			border-radius:10px;
			margin-right:20px;
		}
		&-text{
			text-align:left;
			>p{
				font-size:28px;
				color:$black_3;
				font-weight:900;
				margin-bottom:14px;
			}
			>h3{
				font-size:24px;
				color:$gray_9;
			}
		}
	}
	&-right{
		width:189px;
		height:100%;
		line-height:120px;
		background:$red_2;
		color:$white;
		font-size:32px;
	}
	&:after{
		@include border-1px()
	}
}
	
</style>
