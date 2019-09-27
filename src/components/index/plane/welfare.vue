<template>
	<plane title="福利专区" class="welfare">
		<img src="https://haitao.nosdn2.127.net/009ad4b9-cca2-44c6-9092-b83cdc690442T1908021539_960_200.jpg?imageView&thumbnail=750x156&quality=80&type=webp"/>
		<scroll class="welfare-scroll" :scrollX="true">
			<article class="welfare-scroll-wrapper">
				<div  class="welfare-scroll-wrapper-item" v-for="(item,index) in welfares" :key="index">
					<div class="item-top">
						<div class="item-top-left">
							<p class="money">
								<span>￥</span><span class="number">{{item.money}}</span>
							</p>
							<p>{{getLimitText(item.limit)}}</p>
						</div>
						<div class="item-top-right">
							<span>立即领劵</span>
						</div>
					</div>
					<div class="item-wave">
						<span class="item-wave-circle"></span>
						<span class="item-wave-circle"></span>
						<span class="item-wave-circle"></span>
						<span class="item-wave-circle"></span>
						<span class="item-wave-circle"></span>
						<span class="item-wave-circle"></span>
						<span class="item-wave-circle"></span>
						<span class="item-wave-circle"></span>
						<span class="item-wave-circle"></span>
						<span class="item-wave-circle"></span>
						<span class="item-wave-circle"></span>
						<span class="item-wave-circle"></span>
						<span class="item-wave-circle"></span>
						<span class="item-wave-circle"></span>
					</div>
					<span class="item-bottom">领取后{{item.day}}天内有效</span>
				</div>

				<div  class="welfare-scroll-wrapper-item">
					<div class="item-top">
						<span>领劵中心</span>
					</div>
					<span class="item-bottom">点击进入 ></span>
				</div>
			</article>
		</scroll>
	</plane>
</template>
<script>
import Plane from "@/components/plane.vue";
import Scroll from "@/components/scroll.vue";
export default {
	name:'Welfare',
	components:{
		Plane,
		Scroll
	},
	props:{
		welfares:{
			type:Array,
			default:[]
		}
	},
	methods: {
		getLimitText(limit){
			return limit?`满${limit}使用`:'无金额门槛'
		}
	},
}
</script>
<style lang="scss" scoped>
@import "@/common/scss/color.scss";

.welfare{
	width:100%;
	padding-left:0 !important;
	>img{
		display:block;
		width:100%;
		height:156px;
	}
	&-scroll{
		width:100%;
		display:flex;
		&-wrapper{
			display:flex;
			&-item{
				position:relative;
				width:308px;
				height:170px;
				margin-left:10px;
				margin-top:6px;
				display:flex;
				flex-direction: column;
				color:$white;
				border-radius:10px;
				box-sizing:border-box;
				
				.item-top{
					display:flex;
					width:100%;
					height:65%;
					background:$red_5;	
					border-top-left-radius:10px;
    			border-top-right-radius: 10px;
					.item-top-left{
						display:flex;
						flex-direction: column;
						justify-content: center;
						align-items: flex-start;
						padding-left:18px;
						width:55%;
						box-sizing: border-box;
						.money{
							margin-bottom:10px;
							.number{
								font-size:40px;
								font-weight: bold
							}
						}
					}
					.item-top-right{
						display:flex;
						justify-content: center;
						align-items: center;
						>span{
							padding:10px 12px;
							background:$white;
							font-size:20px;
							color:$red_5;
							border-radius: 20px;	
						}
					}
					
				}
				.item-wave{
					position:absolute;
					display: flex;
					padding:0 20px;
					top:104px;
					&-circle{
						width:14px;
						height:14px;
						border-radius: 50%;
						background:$white_2;
						margin-right:6px;
					}
				}
				.item-bottom{
					display: flex;
					align-items: center;
					padding-left:22px;
					border-bottom-left-radius:10px;
    			border-bottom-right-radius: 10px;
					color:$gray_3;
					background:$white_2;
					height:35%;
				}
				&:last-child{
					margin-right:10px;
					.item-top{
						display:flex;
						justify-content: center;
						align-items: center;
					}
					.item-bottom{
						display:flex;
						justify-content: center;
						color:$red_5;
					}
				}
			}
			
		}
	}
}

</style>
