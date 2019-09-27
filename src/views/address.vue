<template>
	<div class="address">
		<div class="wrapper">
			<top-bar title="收货地址"></top-bar>
			<section class="address-list">
				<div class="item">
					<checkbox class="item-l"></checkbox>
					<div class="item-m">
						<p class="p1">
							<span class="s1">默认</span>
							<span class="s2">天津市 天津市 河西区</span>
						</p>
						<p class="p2">asdf</p>
						<p class="p3">
							<span class="s1">fasdfasd</span>
							<span class="s2">135****2222</span>
						</p>
					</div>
					<div class="item-r" @click="$router.push({name:'addressAdd'})">
						<i class="icon-edit">&#xe700;</i>
					</div>
				
				</div>
			</section>
			<div class="address-button" @click="$router.push({name:'addressAdd'})">
				<span>新建地址</span>
			</div>
		</div>
	</div>
</template>
<script>
import TopBar from '@/components/common/top-bar'
import Checkbox from '@/components/common/checkbox'

export default {
	components:{
		TopBar,
		Checkbox
	}
}
</script>
<style lang="scss" scoped>
@import "@/common/scss/color.scss";
@import "@/common/scss/icon.scss";
@import "@/common/scss/mixin.scss";

.address{
	height:100%;
	background:$white_7;
	.wrapper{
		padding-top:100px;
		background:$white_7;

	}
	&-button{
		position:fixed;
		left:0;
		right:0;
		bottom:0;
		height:100px;
		line-height: 100px;
		background:$red_7;
		color:$white;
		font-size:30px;
	}
	&-list{
		background:$white;
		.item{
			position:relative;
			display:flex;
			flex-direction: row;
			padding:30px 0;
			&:after{
				@include border-1px()
			}
			&-l{
				padding:0 20px;
			}
			&-m{
				margin-left:20px;
				text-align: left;
				flex:1;
				color:$gray_7;
				.p1{
					margin-bottom:20px;
					.s1{
						position: relative;
						color:$white;
						background:$red_2;
						padding:4px 10px;
						border-radius: 20px;
						margin-right:20px;
					}
					.s2{
						font-size:28px;
					}
				}
				.p2{
					margin-bottom:16px;
					font-size:32px;
					font-weight: bold;
				}
				.p3{
					.s1{
						font-size:28px;
						margin-right:20px;
					}
					.s2{
						font-size:26px;
					}
				}
			}
			&-r{
				display: flex
			}
			.icon-edit{
				display: inline-block;
				font-size:40px;
				padding:30px;
				color:$gray_7;
			}
		}
	}
}
</style>


