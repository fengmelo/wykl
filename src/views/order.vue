<template>
	<div class="order">
		<div class="wrapper">
			<top-bar title="提交订单"></top-bar>
			<div class="address"  @click="$router.push({name:'address'})">
				<div class="address-icon">
					<i class="icon-add">&#xe600;</i>
					<span>添加地址</span>
				</div>
			</div>

			<div class="order-title">XIANGYUN海外奢侈品专营店</div>
			<section class="order-list">
				<div class="order-list-item">
					<div class="l">
						<img src="https://pop.nosdn.127.net/1e111255-fd01-4c7e-ac3a-7aad5df0bde9?imageView&thumbnail=100x0&quality=75&type=webp" />
					</div>
					<div class="m">
						<p class="p1">【杨幂同款】迈克高仕 MICHAEL KORS 女包 2019新款MERCER小号经典手提包单肩斜挎【杨幂同款】迈克高仕 MICHAEL KORS 女包 2019新款MERCER小号经典手提包单肩斜挎锁头包【杨幂同款】迈克高仕 MICHAEL KORS 女包 2019新款MERCER小号经典手提包单肩斜挎锁头包锁头包</p>
						<p class="p2">颜色：风琴款灰拼30S9SM9M1T</p>
						<p class="p2"><i class="icon-7">&#xe678;</i><em>不支持7天无理由退货</em></p>
					</div>
					<div class="r">
						<p class="p1">¥1399.00</p>
						<p class="p2">×1</p>
					</div>
				</div>
				<div class="order-list-item">
					<div class="l">
						<img src="https://pop.nosdn.127.net/1e111255-fd01-4c7e-ac3a-7aad5df0bde9?imageView&thumbnail=100x0&quality=75&type=webp" />
					</div>
					<div class="m">
						<p class="p1">【杨幂同款】迈克高仕 MICHAEL KORS 女包 2019新款MERCER小号经典手提包单肩斜挎【杨幂同款】迈克高仕 MICHAEL KORS 女包 2019新款MERCER小号经典手提包单肩斜挎锁头包【杨幂同款】迈克高仕 MICHAEL KORS 女包 2019新款MERCER小号经典手提包单肩斜挎锁头包锁头包</p>
						<p class="p2">颜色：风琴款灰拼30S9SM9M1T</p>
						<p class="p2"><i class="icon-7">&#xe678;</i><em>不支持7天无理由退货</em></p>
					</div>
					<div class="r">
						<p class="p1">¥1399.00</p>
						<p class="p2">×1</p>
					</div>
				</div>
				<div class="order-list-item">
					<div class="l">
						<img src="https://pop.nosdn.127.net/1e111255-fd01-4c7e-ac3a-7aad5df0bde9?imageView&thumbnail=100x0&quality=75&type=webp" />
					</div>
					<div class="m">
						<p class="p1">【杨幂同款】迈克高仕 MICHAEL KORS 女包 2019新款MERCER小号经典手提包单肩斜挎【杨幂同款】迈克高仕 MICHAEL KORS 女包 2019新款MERCER小号经典手提包单肩斜挎锁头包【杨幂同款】迈克高仕 MICHAEL KORS 女包 2019新款MERCER小号经典手提包单肩斜挎锁头包锁头包</p>
						<p class="p2">颜色：风琴款灰拼30S9SM9M1T</p>
						<p class="p2"><i class="icon-7">&#xe678;</i><em>不支持7天无理由退货</em></p>
					</div>
					<div class="r">
						<p class="p1">¥1399.00</p>
						<p class="p2">×1</p>
					</div>
				</div>
				<div class="order-list-item">
					<div class="l">
						<img src="https://pop.nosdn.127.net/1e111255-fd01-4c7e-ac3a-7aad5df0bde9?imageView&thumbnail=100x0&quality=75&type=webp" />
					</div>
					<div class="m">
						<p class="p1">【杨幂同款】迈克高仕 MICHAEL KORS 女包 2019新款MERCER小号经典手提包单肩斜挎【杨幂同款】迈克高仕 MICHAEL KORS 女包 2019新款MERCER小号经典手提包单肩斜挎锁头包【杨幂同款】迈克高仕 MICHAEL KORS 女包 2019新款MERCER小号经典手提包单肩斜挎锁头包锁头包</p>
						<p class="p2">颜色：风琴款灰拼30S9SM9M1T</p>
						<p class="p2"><i class="icon-7">&#xe678;</i><em>不支持7天无理由退货</em></p>
					</div>
					<div class="r">
						<p class="p1">¥1399.00</p>
						<p class="p2">×1</p>
					</div>
				</div>
			</section>

			<div class="order-message">
				<input type="text"  placeholder="给商家留言，选填，最多100个字" />
			</div>

			<cell class="cel" title="红包" desc="暂无可用"></cell>
			<cell class="cel" title="发票" desc="跨境商品暂不支持开发票"></cell>
			
			<div class="cellli first">
				<span class="s1">商品总额</span>
				<span class="s2">¥111111</span>
			</div>
			<div class="cellli">
				<span class="s1">运费</span>
				<span class="s2">¥0.00</span>
			</div>
			<div class="cellli">
				<span class="s1">税费</span>
				<span class="s2">¥263.72</span>
			</div>

			<p class="order-agree">提交订单则表示您同意《用户购买协议》</p>

			<div class="order-footer">
				<span class="s1">实付款：&nbsp;&nbsp;¥20000</span>
				<span class="s2">提交订单</span>
			</div>
		</div>
	</div>
</template>
<script>
import Cell  from "@/components/common/cell"
import TopBar from "@/components/common/top-bar";
export default {
  components: {
		TopBar,
		Cell
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/icon.scss";
@import "@/common/scss/color.scss";
@import "@/common/scss/mixin.scss";

.order {
  height: 100%;
	text-align: left;
  .wrapper {
		padding-top: 100px;
		padding-bottom: 100px;
		background: $white_6;
  }
  .address {
    height: 80px;
    background: $white;
    &-icon {
      height: 100%;
      line-height: 80px;
      text-align: center;
      i {
        font-size: 40px;
        color: $gray_3_9;
        margin-right: 20px;
      }
      span {
        font-size: 30px;
        color: $gray_3_9;
      }
    }
  }
  &-title {
    position: relative;
    margin-top: 20px;
    height: 70px;
    line-height: 70px;
    padding-left: 20px;
    background: $white;
    font-size: 26px;
    &:after {
      @include border-1px();
    }
  }
  &-list {
    background: $white;
    &-item {
			position:relative;
      display: flex;
			padding: 20px;
			overflow:hidden;
			&::after{
				@include border-1px();
				margin-left:20px;
			}
      .l {
        width: 160px;
        flex-shrink: 1;
        > img {
          width: 100%;
        }
      }
      .m {
				flex: 1;
				margin-left:10px;
				margin-right:40px;
				.p1{
					line-height: 1.4;
					margin-bottom:14px;
				}
				.p2,.p3{
					color:$gray_7;
					margin-bottom:14px;
				}
      }
      .r {
				flex-shrink: 1;
				text-align: right;
				.p1{
					font-size:28px;
				}
				.p2{
					margin-top:10px;
					color:$gray_7;
					font-size:30px;
				}
      }
    }
	}
	&-message{
		position: relative;
		height:80px;
		&::after{
			@include border-1px()
		}
		input{
			width:100%;
			height:80px;
			line-height:80px;
			padding-left:20px;
			box-sizing:border-box;
		}
	}
	.cel{
		background: $white;
	}
	.cellli{
		position: relative;
		background: $white;
		height: 76px;
		line-height: 76px;
		padding:0 20px;
		&:after{
			@include border-1px()
		}
		&.first{
			margin-top:20px;
		}
		.s1{
			float:left;
		}
		.s2{
			float:right;
		}
	}
	&-agree{
		text-align:left;
		padding-left:20px;
		height:50px;
		line-height: 50px;
	}
	&-footer{
		position:fixed;
		left:0;
		right:0;
		bottom:0;
		z-index:100;
		height:100px;
		background:$white;
		display:flex;
		align-items: center;
		justify-content: flex-end;
		&::after{
			@include border-1px(line,$gray_1,0)
		}
		.s1{
			font-size:32px;
			color:$red_7;
			margin-right:20px;
		}
		.s2{
			background:$red_7;
			color:$white;
			height:80px;
			line-height:80px;
			padding:0 20px;
			font-size:32px;
			margin-right:20px;
		}
	}
}
</style>

