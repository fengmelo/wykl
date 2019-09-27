<template>
	<div class="brand">
		<div class="brand-top">
			<div class="c1">
				<img src="https://haitao.nos.netease.com/id2q3etz98.jpg?imageView&thumbnail=100x0&quality=75&type=webp" />
			</div>
			<div class="c2">
				<h3>MICHAEL KORS 迈克高仕</h3>
				<p>在售商品<span>3311</span>件</p>
			</div>
			<div class="c3">
				<i></i>
				<span>进入品牌</span>
			</div>
		</div>
		<scroll class="brand-scroll" :scrollX="true">
			<ul class="brand-scroll-list">
				<li v-for="(item,index) in brandProducts" :key="index">
					<img :src="item.img"/>
					<span class="tag" v-if="item.isSpecial">特价</span>
					<h4>{{item.title}}</h4>
					<p><span>¥{{item.price}}</span></p>
				</li>
			</ul>	
		</scroll>
		
	</div>
</template>
<script>
import Scroll from "@/components/scroll.vue";
export default {
  name: "BrandCell",
  data() {
    return {
      brandProducts: [
        {
          id: 1,
          img:
            "https://pop.nosdn.127.net/1abeb288-8f21-4c8d-9f2e-e191a9f4b09e?imageView&thumbnail=250x0&quality=75&type=webp",
          isSpecial: 1,
          title: "【春夏新】MICHAEL KORS 迈克高仕 女士简约信封款 单肩斜挎包",
          price: 599
        },
        {
          id: 1,
          img:
            "https://pop.nosdn.127.net/1abeb288-8f21-4c8d-9f2e-e191a9f4b09e?imageView&thumbnail=250x0&quality=75&type=webp",
          isSpecial: 1,
          title: "【春夏新款】MICHAEL KORS 迈克高仕 女士简约信封款 单肩斜挎包",
          price: 599
        },
        {
          id: 1,
          img:
            "https://pop.nosdn.127.net/1abeb288-8f21-4c8d-9f2e-e191a9f4b09e?imageView&thumbnail=250x0&quality=75&type=webp",
          isSpecial: 1,
          title: "【春夏新款】MICHAEL KORS 迈克高仕 女士简约信封款 单肩斜挎包",
          price: 599
        },
        {
          id: 1,
          img:
            "https://pop.nosdn.127.net/1abeb288-8f21-4c8d-9f2e-e191a9f4b09e?imageView&thumbnail=250x0&quality=75&type=webp",
          isSpecial: 1,
          title: "【春夏新款】MICHAEL KORS 迈克高仕 女士简约信封款 单肩斜挎包",
          price: 599
        },
        {
          id: 1,
          img:
            "https://pop.nosdn.127.net/1abeb288-8f21-4c8d-9f2e-e191a9f4b09e?imageView&thumbnail=250x0&quality=75&type=webp",
          isSpecial: 1,
          title: "【春夏新款】MICHAEL KORS 迈克高仕 女士简约信封款 单肩斜挎包",
          price: 599
        },
        {
          id: 1,
          img:
            "https://pop.nosdn.127.net/1abeb288-8f21-4c8d-9f2e-e191a9f4b09e?imageView&thumbnail=250x0&quality=75&type=webp",
          isSpecial: 1,
          title: "【春夏新款】MICHAEL KORS 迈克高仕 女士简约信封款 单肩斜挎包",
          price: 599
        },
        {
          id: 1,
          img:
            "https://pop.nosdn.127.net/1abeb288-8f21-4c8d-9f2e-e191a9f4b09e?imageView&thumbnail=250x0&quality=75&type=webp",
          isSpecial: 1,
          title: "【春夏新款】MICHAEL KORS 迈克高仕 女士简约信封款 单肩斜挎包",
          price: 599
        },
        {
          id: 1,
          img:
            "https://pop.nosdn.127.net/1abeb288-8f21-4c8d-9f2e-e191a9f4b09e?imageView&thumbnail=250x0&quality=75&type=webp",
          isSpecial: 1,
          title: "【春夏新款】MICHAEL KORS 迈克高仕 女士简约信封款 单肩斜挎包",
          price: 599
        },
        {
          id: 1,
          img:
            "https://pop.nosdn.127.net/1abeb288-8f21-4c8d-9f2e-e191a9f4b09e?imageView&thumbnail=250x0&quality=75&type=webp",
          isSpecial: 1,
          title: "【春夏新款】MICHAEL KORS 迈克高仕 女士简约信封款 单肩斜挎包",
          price: 599
        }
      ]
    };
  },
  components: {
    Scroll
  }
};
</script>
<style lang="scss" scoped>
@import "@/common/scss/mixin.scss";
.brand {
  &-top {
		display: flex;
		align-items: center;
		padding:20px 20px 0 20px;
		.c1{
			position:relative;
			width:100px;
			height:100px;
			&:after{
				@include border-1px(arc)
			}
			>img{
				width:100%;
			}
		}
		.c2{
			text-align: left;
			margin-left:20px;
			flex:1;
			>h3{
				font-size:28px;
				margin-bottom:12px;
			}
			p{
				color:$gray_7;
				>span{
					color:$red_2;
				}
			}
		}
		.c3{
			position: relative;
			height:60px;
			line-height:60px;
			padding:0 30px;
			&::after{
				@include border-1px(arc);
				border-radius: 36px;
			}
			i{
				display:inline-block;
				width:24px;
				height:24px;
				background-image:url('//w.kl.126.net/goods/dist/m/img/producticon.b67ad86.png');
				background-size: 400px;
				background-position: -700px 120px;
				margin-right:16px;
				vertical-align: center;
			}
			span{
				vertical-align: 1px;/*no*/
			}
		}
  }
  &-scroll {
		display: flex;
		width: 100%;
		overflow: hidden;
		text-align:left;
    &-list {
      padding: 0 20px;      
      display: flex;
      li {
				width: 250px;
				flex-shrink:1;
				margin-right:20px;			
				.tag{
					position: relative;
					top:-50px;
					color:$red-2;
					padding:10px 0;
					&::after{
						@include border-1px(arc,$red_2)
					}
				}
				>img{
					width:100%;
				}
				>h4{
					font-size:20px;
					margin-bottom:20px;
					@include max-line()
				}
				p{
					font-size:28px;
					color:$red_2;
					text-align:center;
				}
      }
    }
  }
}
</style>

