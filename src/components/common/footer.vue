<template>
	<div class="footer">
		<p class="footer-link">
			<span>首页</span>
			<span class="footer-link-line"></span>
			<span>客户端</span>
			<span class="footer-link-line"></span>
			<span>登录</span>
			<span class="footer-link-line"></span>
			<span>注册</span>
		</p>
		<p>网易公司版权所有@1997-2019</p>
	</div>
</template>
<script>
export default {
	name:'Footer'
}
</script>

<style lang="scss" scoped>
@import "@/common/scss/color.scss";
@import "@/common/scss/mixin.scss";

.footer{
	position: relative;
	background: $white;
	margin-top:40px;
	margin-bottom:40px;
	color:$gray_9;
	padding-bottom: 20px;
	&::before{
		@include border-1px(line,$gray_1,0)
	}
	&-link{
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		height: 100px;
		line-height: 100px;
		font-size:28px;
		padding:0 40px;
		&-line{
			position: relative;
			height:30px;
			background:$gray_9;
			&::after{
				@include border-1px('vert',$gray_9)
			}
		}
	}
}
</style>
