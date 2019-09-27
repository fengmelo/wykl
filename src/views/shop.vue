<template>
	<div class="shop" ref="pageScroll">
		<ad></ad>
		<div class="shop-header" ref="header">
			<i class="icon-back" @click="$router.go(-1)">&#xe614;</i>
			<div class="tab">
				<div>
					<span  :class="{active:tabIndex==0}" @click="pageScroll(0)">商品</span>
				</div>
				<div>
					<span  :class="{active:tabIndex==1}" @click="pageScroll(1)">评论</span>
				</div>
				<div>
					<span  :class="{active:tabIndex==2}" @click="pageScroll(2)">推荐</span>
				</div>
				<div>
					<span  :class="{active:tabIndex==3}" @click="pageScroll(3)">详情</span>
				</div>
			</div>
			<i class="icon-home" @click="$router.push('/')">&#xe60d;</i>
		</div>
		<carousel class="carousel" v-show="!showImageBanner" :sliderImages="carouselImageUrls" :sHeight="80" :sWidth="80"></carousel>
		<div class="shop-img" v-show="showImageBanner">
			<img :src="showImageBanner"/>
		</div>
		<scroll  class="tab-scroll" ref="tabScroll" :scrollX="true">
			<div class="tab-scroll-wrapper">
				<img @click="showImageBanner=''" class="scroll-img" :src="carouselImageUrls[0]"/>
				<span>颜色:</span>
				<ul>
					<li @click="showImageBanner=item.url" v-for="(item,index) in shop.carousel" :key="index">
						<img :src="item.url"/>
					</li>
				</ul>
			</div>
		</scroll>
		<div class="shop-price">
			<span class="shop-price-current">
				<em>¥</em><em>{{shop.newPrice}}</em><em>起</em>
			</span>
			<span class="shop-price-cost del">
				<em>¥{{shop.price}}</em>
			</span>
			<span class="shop-price-tag" v-for="(item,index) in shop.tags">{{tagOptionsIndexBy[item]?tagOptionsIndexBy[item].label:''}}</span>
			<span class="shop-price-favor">
				<i class="icon-favor">&#xe634;</i>
				<em>收藏</em>
			</span>
		</div>
		<scroll class="shop-coupon" :scrollX="true">
			<ul>
				<li v-for="(item,index) in coupons" :key="index">
					<span><em class="ellispis">{{item.name}}</em><em>|</em><em>{{item.cash}}元</em></span>
				</li>
			</ul>
		</scroll>

		<p class="shop-title">{{shop.title}}</p>

		<p class="shop-desc">{{shop.desc}}</p>
		<div class="shop-brand">
			<img src="https://haitao.nos.netease.com/1077833fa2854dcb97502084f24f449d1419659976324i46kw8bh10001.png?imageView&thumbnail=32x0&quality=75" />
			<span class="s">美国品牌</span>
			<img src="https://haitao.nosdn2.127.net/13bd59e6e29a4f06b278c586629e690d.png?imageView&thumbnail=32x0&quality=75" />
			<span>跨境商品</span>
		</div>

		<div class="cut"></div>
		<cell title="请选择:" @clickCell="clickCell('color')">
			<span >颜色</span>
		</cell>
		<cell title="配 送:" @clickCell="clickCell('deliver')">
			<span>香港 至<i class="icon-location">&#xe604;</i> {{regionArr.join(' ')}}</span>
		</cell>
		<cell title="运 费:" @clickCell="clickCell('fee')">
			<span>免运费</span>
		</cell>
		<cell title="说 明:" :line="false">
			<div class="shop-cell-desc"> 
				<span>商品税费</span>
				<span>不支持7天无理由退货</span>
				<span>不可使用优惠券</span>
				<span>XIANGYUN海外奢侈品专营店发货</span>
				<span>会员96折</span>
			</div>
		</cell>

		<div class="cut"></div>
		<comment-cell ref="commentCell"></comment-cell>
		<div class="cut"></div>

		<section class="brand-cate" ref="recommend">
			<div class="brand-cate-top">
				<img src='https://pop.nosdn.127.net/9ce741f7-b208-45f0-8d4f-f3b7086fe8ff?imageView&thumbnail=100x0&quality=75&type=webp'   />
				<div class="brand-cate-top-right">
					<h3 class="ellispis">XIANGYUN海外奢侈品专营店</h3>
					<div class="text">
						<span class="in"><i></i><em>品牌商入驻</em></span>
						<span class="service"><i></i><em>服务保障</em></span>
					</div>
				</div>
			</div>
			<div class="brand-cate-bottom">
				<div class="brand-cate-bottom-data">
					<div class="d1">
						<p class="number">257</p>
						<p class="text">全部商品</p>
					</div>
					<div class="d2">
						<p class="number"><em class="em1">4.93</em><em class="em2">高</em></p>
						<p class="text">综合评分</p>
					</div>
				</div>
				<div class="brand-cate-bottom-button">
					<span class="s1">查看分类</span>
					<span class="s2">进店看看</span>
				</div>
			</div>
		</section>
		<div class="cut"></div>
		<brand-cell ref="brandCell"></brand-cell>
		<div class="cut"></div>
		<div class="shop-detail">
			<div class="shop-detail-header">
					<img  src="https://haitao.nos.netease.com/8cdd326d-c127-4f53-8183-85fac74233de.jpg?imageView&thumbnail=960x0&quality=75" />
					<span class="shop-detail-header-desc">详情介绍</span>
			</div>
			<div class="shop-detail-promise">
				<div class="wrapper">
					<p>考拉承诺</p>
					<p>所售商品均为正品，假一赔十！</p>
				</div>
			</div>
		</div>
		<div class="cut"></div>
		<div class="shop-detail-product" ref="detailInfo">
			<div class="info">产品信息</div>
			<div class="wrapper">
				<p class="title">关键属性</p>
				<p class="cell" v-for="(item,index) in keyAttrs">
					<span class="s1">{{item.name}}</span>
					<span class="s2 ellispis">{{item.tags.join(' ')}}</span>
				</p>
				<div v-show="!detailToggle">	
					<p class="title">其他属性</p>
					<p class="cell"  v-for="(item,index) in otherAttrs">
						<span class="s1">{{item.name}}</span>
						<span class="s2 ellispis">{{item.tags.join(' ')}}</span>
					</p>
				</div>
			</div>
			<div class="toggle" @click="detailToggle=!detailToggle">
				<span>{{detailToggle?'展开':'收起'}}</span><i class="icon-toggle" v-html="detailToggle?'&#xe626;':'&#xe645;'"></i>
			</div>
			<div class="content" v-html="shop.content"></div>
		</div>
		<w-footer></w-footer>


		<transition-bottom  ref="color" title="color" class="transition-color" @show="show">
			<div class="wrapper">
				<div class="top">
					<img :src="currentColor.url||(shop.models.length && shop.models[0].url)"/>
					<div class="right">
						<div class="price">
							<span class="s1">¥{{currentColor.price?currentColor.price:'799起'}}</span>
							<span v-show="!currentColor.tag" class="tag">3折</span>
							<span v-show="!currentColor.tag" class="tag">特价</span>
							<span v-show="currentColor.tag&&currentColor.tag.length" class="tag" v-for="(item,index) in currentColor.tag" :key="index">{{item}}</span>

						</div>
						<p>{{currentColor.title?currentColor.title:'请选择颜色'}}</p>
					</div>
				</div>
				<scroll class="color-scroll" ref="colorScroll">
					<div class="color-select">
						<p>颜色</p>
						<ul>
							<li @click="selectedColor(item,index)" :class="{active:activeIndex.color==index}" v-for="(item,index) in shop.models" :key="index">
								<span>{{item.name}}</span>
							</li>
						</ul>
						<p>数量</p>
						<count ref="count" class="count" @count="count" :countNumber="countNumber"></count>
					</div>
				</scroll>
        <div class="button abs-b">
					<span v-show="isBuy==false" class="cart" @click="addCart(shop,'cart')">加入购物车</span>
					<span v-show="isBuy==false" class="buy" @click="addCart(shop,'buy')">立即购买</span>
					<span v-show="isBuy.length" class="sure" @click="addCart(shop)">确定</span>
				</div>
			</div>
		</transition-bottom>
		<transition-bottom  ref="deliver" title="deliver"  @show="show" rightButton="sure" @deliverData="deliverData">
			<div class="wrapper">
				<region ref="region"></region>
			</div>
		</transition-bottom>
		<transition-bottom  class="transition-fee"  ref="fee" title="fee">
			<div class="content">配送至{{regionArr.join('')}}免运费。</div>
		</transition-bottom>
		<tip ref='tip'></tip>	
		<slider-bar ref='sliderBar' @goToTop="goToTop"></slider-bar>


		<div class="bottom-button">
			<div class="shop-entry d1">
				<i class="icon-shop">&#xe63f;</i>
				<span>店铺入口</span>
			</div>
			<div class="customer-service d1">
				<i class="icon-customer-service">&#xe6bc;</i>
				<span>客服</span>
			</div>
			<div class="to-cart d1" @click="$router.push({name:'cart'})">
				<i class="icon-cart">&#xe603;</i>
				<span>购物车</span>
				<span class="number" v-show="cartTotalCount">{{cartTotalCount}}</span>
			</div>
			<div class="get-to-cart b1" @click="clickCell('color','cart')">
				<span>加入购物车</span>
			</div>
			<div class="now-buy b1"  @click="clickCell('color','buy')">
				<span>立即购买</span>
			</div>
		</div>
	</div>
</template>
<script>
import Ad from "@/components/common/ad.vue";
import Carousel from "@/components/common/carousel.vue";
import Scroll from "@/components/scroll.vue";
import Cell from "@/components/common/cell.vue";
import TransitionBottom from "@/components/shop/transition-bottom.vue";
import Tip from "@/components/common/tip.vue";
import SliderBar from "@/components/common/sliderbar.vue";
import Region from "@/components/common/region.vue";
import CommentCell from "@/components/shop/comment-cell.vue";
import BrandCell from "@/components/shop/brand-cell.vue";
import WFooter from "@/components/common/footer.vue";
import { sliderBarMixin } from "@/common/js/mixin";
import Count from "@/components/common/count.vue";

import { mapActions, mapGetters } from "vuex";
import { fetchList } from "@/api/config";
import { fetchProductDetail } from "@/api/product";
import * as R from "ramda";

export default {
  mixins: [sliderBarMixin],
  data() {
    return {
      shop: {
        carousel: [],
        attrs: [],
        models: []
      },
      showImageBanner: "",
      tabIndex: 0,
      imageBanners: [
        "https://pop.nosdn.127.net/9493db42-a969-4023-8d8a-01eda24cc7eb?imageView&thumbnail=750x0&quality=75&type=webp",
        "https://pop.nosdn.127.net/ba64f6c6-0c02-4422-a0ba-07ba2eca783d?imageView&thumbnail=750x0&quality=75&type=webp",
        "https://pop.nosdn.127.net/6b56e9e1-f9f2-4041-8173-feea20342d49?imageView&thumbnail=750x0&quality=75&type=webp",
        "https://pop.nosdn.127.net/9493db42-a969-4023-8d8a-01eda24cc7eb?imageView&thumbnail=750x0&quality=75&type=webp",
        "https://pop.nosdn.127.net/ba64f6c6-0c02-4422-a0ba-07ba2eca783d?imageView&thumbnail=750x0&quality=75&type=webp",
        "https://pop.nosdn.127.net/6b56e9e1-f9f2-4041-8173-feea20342d49?imageView&thumbnail=750x0&quality=75&type=webp",
        "https://pop.nosdn.127.net/9493db42-a969-4023-8d8a-01eda24cc7eb?imageView&thumbnail=750x0&quality=75&type=webp",
        "https://pop.nosdn.127.net/ba64f6c6-0c02-4422-a0ba-07ba2eca783d?imageView&thumbnail=750x0&quality=75&type=webp",
        "https://pop.nosdn.127.net/6b56e9e1-f9f2-4041-8173-feea20342d49?imageView&thumbnail=750x0&quality=75&type=webp",
        "https://pop.nosdn.127.net/9493db42-a969-4023-8d8a-01eda24cc7eb?imageView&thumbnail=750x0&quality=75&type=webp",
        "https://pop.nosdn.127.net/ba64f6c6-0c02-4422-a0ba-07ba2eca783d?imageView&thumbnail=750x0&quality=75&type=webp",
        "https://pop.nosdn.127.net/6b56e9e1-f9f2-4041-8173-feea20342d49?imageView&thumbnail=750x0&quality=75&type=webp"
      ],
      coupons: [
        {
          name: "杨幂同款1799",
          cash: 799
        },
        {
          name: "杨幂同款1799杨幂同款1799杨幂同款1799",
          cash: 799
        },
        {
          name: "杨幂同款1799杨幂同款1799",
          cash: 799
        },
        {
          name: "杨幂同款1799",
          cash: 799
        },
        {
          name: "杨幂同款1799",
          cash: 799
        },
        {
          name: "杨幂同款1799",
          cash: 799
        },
        {
          name: "杨幂同款1799",
          cash: 799
        },
        {
          name: "杨幂同款1799",
          cash: 799
        },
        {
          name: "杨幂同款1799",
          cash: 799
        }
      ],
      activeIndex: {
        color: -1
      },
      regionArr: [],
      detailToggle: true,
			isBuy: "" ,//点击加入购物车 和立即购买,
			countNumber:1
    };
  },
  computed: {
    ...mapGetters(["cart", "cartTotalCount", "tagOptions"]),
    currentColor() {
      return this.shop.models[this.activeIndex.color]
        ? this.shop.models[this.activeIndex.color]
        : {};
    },
    carouselImageUrls() {
      return R.pluck("url")(this.shop.carousel);
    },
    tagOptionsIndexBy() {
      return this.tagOptions.length
        ? R.indexBy(R.prop("value"), this.tagOptions)
        : [];
    },
    keyAttrs() {
      return this.shop.attrs.slice(0, 3);
    },
    otherAttrs() {
      return this.shop.attrs.slice(3);
    }
  },
  watch: {
    shop(shop) {
      this.$nextTick(() => {
        this.getTabTop();
      });
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.getTagOptions();
    this.getDetail();
  },
  mounted() {},
  methods: {
		...mapActions(["addCartAction", "getTagOptions"]),
		count(number){

		},
    getTabTop() {
      const tabTop = [];
      const headerHeight = this.$refs.header.clientHeight;
      tabTop.push(0);
      tabTop.push(this.$refs.commentCell.$el.offsetTop - headerHeight);
      tabTop.push(this.$refs.recommend.offsetTop - headerHeight);
      tabTop.push(this.$refs.detailInfo.offsetTop - headerHeight);
      this.tabTop = tabTop;
    },
    getDetail() {
      fetchProductDetail({ id: this.id }).then(res => {
        this.shop = res.data.product;
      });
    },
    pageScroll(index) {
      if (index == this.tabIndex) return;
      this.tabIndex = index;
      this.$refs.pageScroll.scrollTo(0, this.tabTop[index]);
    },
    listenerScroll() {
      let scrollTop = this.$refs.pageScroll.scrollTop;
      const lastItem = this.tabTop[this.tabTop.length - 1];
      let index = 0;
      if (scrollTop >= lastItem) {
        index = this.tabTop.length - 1;
      } else {
        index = this.tabTop.findIndex((top, index) => {
          // scrollY>=当前top && scrollY<下一个top
          return scrollTop >= top && scrollTop < this.tabTop[index + 1];
        });
        index = index < 0 ? 0 : index;
      }
      this.tabIndex = index;
    },
    deliverData(arr) {
      this.regionArr = arr;
    },
    show(title) {
      this.$nextTick(() => {
        title == "color" && this.$refs.colorScroll.refresh();
        if (title == "deliver") {
          this.$refs.region.$refs.province.refresh();
          this.$refs.region.$refs.city.refresh();
          this.$refs.region.$refs.area.refresh();
        }
      });
    },
    addCart(shop, type) {
      if (this.activeIndex.color < 0) {
        this.$refs.tip.showTip();
        return;
      }
      this.$refs.color.show = false;
      this.addCartAction({
        shop,
        count: this.countNumber
      });
      if (this.isBuy == "buy" || type == "buy") {
        //立即购买
        this.$router.push({
          name: "cart"
        });
      }
		},
		count(number,$vm){
			this.countNumber+=number
		},
    clickCell(ref, isBuy = false) {
      this.$refs[ref].show = true;
      if (ref == "color") this.isBuy = isBuy;
    },
    selectedColor(item, index) {
      this.activeIndex.color = this.activeIndex.color == index ? -1 : index;
    }
  },
  components: {
    Ad,
    Carousel,
    Scroll,
    Cell,
    TransitionBottom,
    Tip,
    SliderBar,
    Region,
    CommentCell,
    BrandCell,
    WFooter,
    Count
  }
};
</script>
<style lang="scss" scoped>
@import "@/common/scss/color.scss";
@import "@/common/scss/icon.scss";
@import "@/common/scss/mixin.scss";

.shop {
  height: 100%;
  overflow: auto;
  background: $white;
  padding-bottom: 110px;
  box-sizing: border-box;
  .cut {
    width: 100%;
    height: 20px;
    background: $white_6;
  }
  &-header {
    position: sticky !important;
    z-index: 9999;
    top: 0px;
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    background: $white;
    .tab {
      flex: 1;
      display: flex;
      flex-direction: row;
      font-size: 28px;
      color: $gray_7;
      div {
        flex: 1;
        line-height: 100px;
        span {
          padding-bottom: 6px;
          position: relative;
          &.active {
            &:after {
              @include border-1px(line, $red_3);
            }
          }
        }
      }
    }
    .icon-back {
      font-size: 30px;
      width: 100px;
      flex-shrink: 1;
    }
    .icon-home {
      font-size: 40px;
      width: 100px;
      color: $red_2;
      flex-shrink: 1;
    }
    &:after {
      @include border-1px();
    }
  }
  .tab-scroll {
    width: 100%;
    color: $gray_7;
    display: flex;
    overflow: hidden;
    .tab-scroll-wrapper {
      display: flex;
      align-items: center;
      height: 100px;
      background: $white_1;
      img {
        width: 70px;
        height: 70px;
      }
      .scroll-img {
        margin-left: 20px;
        margin-right: 20px;
      }
      > span {
        width: 70px;
        font-size: 30px;
        flex-shrink: 1;
        margin-right: 40px;
      }
      ul {
        display: flex;
        flex-direction: row;
        li {
          margin-right: 20px;
        }
      }
    }
  }
  .carousel {
    width: 100%;
  }
  &-img {
    width: 100%;
    display: flex;
    justify-content: center;
    img {
      width: 80%;
      height: 80%;
    }
  }
  &-price {
    text-align: left;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    align-items: center;
    vertical-align: text-top;
    &-current {
      color: $red_7;
      margin-right: 25px;
      vertical-align: 0;
      em:nth-child(1) {
        font-size: 24px;
      }
      em:nth-child(2) {
        font-size: 52px;
        font-weight: bold;
      }
      em:nth-child(3) {
        font-size: 28px;
        color: $red_2;
      }
    }
    &-cost {
      font-size: 26px;
      color: $gray_8;
      margin-right: 25px;
    }
    &-tag {
      color: $white;
      background: $red_8;
      padding: 4px 10px;
      font-size: 22px;
      margin-right: 20px;
      border-radius: 10px;
    }
    &-favor {
      float: right;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 40px;
      margin-top: -10px;
      i {
        font-size: 50px;
      }
      em {
        font-size: 24px;
      }
    }
  }
  &-coupon {
    background: $white;
    width: 100%;
    height: 80px;
    overflow: hidden;
    padding-top: 20px;
    margin-bottom: 20px;
    box-sizing: border-box;
    ul {
      padding-left: 20px;
      font-size: 0;
      float: left;
      white-space: nowrap;
      color: $gray_8;
      li {
        display: inline-block;
        margin-right: 20px;
        span {
          display: flex;
          align-items: center;
          position: relative;
          height: 48px;
          line-height: 48px;
          font-size: 22px;
          padding: 0 20px;
          em:nth-child(1) {
            display: inline-block;
            max-width: 200px;
            margin-right: 4px;
          }
          em:nth-child(3) {
            margin-left: 6px;
          }
          &:after {
            @include border-1px(arc, $gray_7);
            border-radius: 20px;
          }
        }
      }
    }
  }
  &-title {
    text-align: left;
    margin: 0 20px;
    padding-top: 20px;
    line-height: 1.3;
    font-size: 28px;
    font-weight: bold;
    position: relative;
    @include max-line();
    &:after {
      @include border-1px(line, $gray_1, 0);
    }
  }
  &-desc {
    text-align: left;
    padding: 0 20px;
    font-size: 26px;
    color: #333;
    line-height: 42px;
    margin-top: 20px;
  }
  &-brand {
    margin: 20px;
    background: $white_3;
    display: flex;
    padding: 20px;
    align-items: center;
    img {
      width: 32px;
      height: 32px;
      margin-right: 14px;
    }
    span {
      margin-right: 20px;
      font-size: 24px;
    }
  }
  &-cell-desc {
    display: flex;
    flex-wrap: wrap;
    span {
      position: relative;
      margin: 0 20px 20px 16px;
      font-size: 24px;
      &::before {
        position: absolute;
        left: -16px;
        top: 6px;
        content: "";
        display: inline-block;
        width: 10px;
        height: 10px;
        background: $red_1;
        border-radius: 50%;
      }
    }
  }
  .brand-cate {
    margin-top: 20px;
    &-top {
      position: relative;
      padding: 20px;
      display: flex;
      align-items: center;
      &:after {
        @include border-1px();
      }
      > img {
        width: 100px;
        height: 100px;
      }
      &-right {
        margin-left: 20px;
        > h3 {
          font-size: 30px;
          font-weight: bold;
          width: 400px;
          margin-bottom: 10px;
        }
        .text {
          color: $gray_9;
          font-size: 24px;
          text-align: left;
          .in {
            margin-right: 50px;
            i {
              display: inline-block;
              width: 24px;
              height: 24px;
              background-image: url("//w.kl.126.net/goods/dist/m/img/producticon.b67ad86.png");
              background-size: 400px;
              background-position: -700px 120px;
              margin-right: 6px;
            }
          }
          .service {
            i {
              display: inline-block;
              width: 24px;
              height: 24px;
              background-image: url("//w.kl.126.net/goods/dist/m/img/producticon.b67ad86.png");
              background-size: 400px;
              background-position: -706px 66px;
              margin-right: 6px;
            }
          }
        }
      }
    }
    &-bottom {
      padding: 30px;
      &-data {
        display: flex;
        .d1,
        .d2 {
          width: 50%;
          height: 100px;
          padding: 0 20px;
          box-sizing: border-box;
          .number {
            font-size: 36px;
            height: 60px;
            line-height: 60px;
            margin-bottom: 10px;
          }
          .text {
            font-size: 22px;
            color: $gray_9;
          }
          .em2 {
            display: inline-block;
            margin-left: 6px;
            color: $white;
            font-size: 40px;
            background: $red_2;
            width: 56px;
            height: 56px;
            line-height: 56px;
            border-radius: 50%;
            transform: scale(0.5);
          }
        }
      }
      &-button {
        display: flex;
        justify-content: space-around;
        color: $red_7;
        padding: 20px 100px;
        .s1,
        .s2 {
          position: relative;
          display: inline-block;
          width: 190px;
          height: 56px;
          line-height: 56px;
          box-sizing: border-box;
          &:after {
            @include border-1px(arc, $red_7);
            border-radius: 40px;
          }
        }
      }
    }
  }
  &-detail {
    &-header {
      position: relative;
      img {
        width: 100%;
      }
      &-desc {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 28px;
        font-weight: bold;
      }
    }
    &-promise {
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
      height: 140px;
      color: $white;

      border-radius: 5%;
      .wrapper {
        background: $red_7;
        border-radius: 10px;
        padding: 20px;
        text-align: left;
        font-size: 28px;
        p {
          height: 40px;
          line-height: 40px;
        }
      }
    }
    &-product {
      padding: 0 20px 20px 20px;
      .info {
        text-align: left;
        font-size: 28px;
        font-weight: bold;
        height: 80px;
        line-height: 80px;
      }
      .wrapper {
        position: relative;
        &::after {
          @include border-1px(arc);
        }
        p {
          position: relative;
          height: 80px;
          line-height: 80px;
          padding-left: 20px;
          box-sizing: border-box;
          color: $gray_7;
          text-align: left;
          &.title {
            background: $white_3;
          }
          .s1,
          .s2 {
            display: inline-block;
          }
          .s1 {
            width: 20%;
            overflow: hidden;
          }
          .s2 {
            position: relative;
            width: 80%;
            box-sizing: border-box;
            padding-left: 20px;
            color: $black_1;
            &::after {
              @include border-1px(vert);
            }
          }
          &:after {
            @include border-1px();
          }
        }
      }
      .toggle {
        margin-top: 20px;
        span {
          margin-right: 12px;
        }
      }
      .content {
        margin-top: 20px;
      }
    }
  }
  .bottom-button {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 110px;
    display: flex;
    align-items: center;
    z-index: 200;
    background: $white;
    &::after {
      @include border-1px(line, $gray_6, 0);
    }
    .d1 {
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 24px;
      i {
        font-size: 44px;
      }
      span {
        margin-top: 12px;
      }
    }
    .shop-entry {
      flex: 5;
    }
    .customer-service {
      flex: 3;
    }
    .to-cart {
      position: relative;
      flex: 4;
      .number {
        position: absolute;
        top: -18px;
        left: 74px;
        color: $red_2;
        font-weight: bold;
        padding: 2px 8px;
        font-size: 28px;
        &:after {
          @include border-1px(arc, $red_2);
          border-width: 2px !important;
          border-radius: 30px;
        }
      }
    }
    .b1 {
      flex: 6;
      color: $white;
      font-size: 28px;
    }
    .get-to-cart {
      height: 100%;
      line-height: 110px;
      background: $gray_3_9;
    }
    .now-buy {
      height: 100%;
      line-height: 110px;
      background: $red_2;
    }
  }
}
.icon-location {
  font-size: 26px;
  margin-left: 6px;
}
.transition-color {
  .wrapper {
    padding: 20px;
    padding-bottom: 120px;
  }
  .top {
    display: flex;
    margin-bottom: 50px;
    > img {
      width: 150px;
      height: 150px;
    }
    .right {
      margin-left: 40px;
      .price {
        text-align: left;
        font-size: 20px;
        margin-bottom: 20px;
        .s1 {
          font-size: 24px;
          color: $red_7;
          margin-right: 20px;
        }
        .tag {
          color: $white;
          background: $red_7;
          padding: 0 10px;
          margin-right: 20px;
        }
      }
      > p {
        text-align: left;
        font-size: 28px;
        color: $gray_8;
      }
    }
  }
  .color-scroll {
    max-height: 600px;
    overflow: hidden;
    .count {
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .color-select {
      text-align: left;
      p {
        margin-top: 20px;
        color: $gray_8;
        font-size: 32px;
      }
      ul {
        padding-left: 0px;
        li {
          height: 64px;
          line-height: 64px;
          margin-top: 20px;

          > span {
            display: inline-block;
            position: relative;
            height: 100%;
            padding: 0 40px;
            font-size: 24px;
            border-radius: 20px;
          }
          &:not(.active) {
            > span {
              &::after {
                @include border-1px(arc);
                border-radius: 40px;
              }
            }
          }
          &.active {
            span {
              background: $red_7;
              color: $white;
            }
          }
        }
      }
    }
  }
  .button {
    display: flex;
    align-items: center;
    height: 100px;
    span {
      height: 100%;
      line-height: 100px;
      flex: 1;
      color: $white;
      font-size: 30px;
    }
    .cart {
      background: $black_1;
    }
    .buy {
      background: $red_2;
    }
    .sure {
      background: $red_2;
    }
  }
}
.transition-fee {
  .content {
    height: 300px;
    text-align: left;
    padding: 40px;
    font-size: 26px;
  }
}
</style>
<style lang="scss">
.shop-detail-product {
  .content {
    img {
      width: 100%;
    }
  }
}
</style>


