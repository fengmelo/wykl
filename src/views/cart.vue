<template>
	<div class="cart">
		<div class="wrapper">
			<top-bar :title="`购物车（${cartTotalCount}）`">
				<div class="cart-f" @click="$router.push({name:'login'})">
					<i class="icon-home">&#xe60d;</i>
					<span>登录</span>
				</div>
			</top-bar>
			<!-- <div class="cart-shop">
				<checkbox class="ch-b"></checkbox><span>XIANGYUN海外奢侈品专营店</span>
			</div> -->
			<section class="cart-list">
				<div class="cart-list-item" v-for="(item,index) in cart">
					<checkbox class="l ch-b" :boxSelected="boxSelected(item)" :isSelected="item.selected" ></checkbox>
					<div class="m">
						<img :src="item.shop.carousel[0].url" />
					</div>
					<div class="r">
						<div class="r-top">
							<span class="s1">特价</span>
							<span class="s2">{{item.shop.title}}</span>
						</div>
						<div class="r-bottom">
							<div class="r-bottom-l">
								<p class="ellispis p1">颜色:风琴款灰拼30S9SM9M1T </p>
								<p class="ellispis p2">预估税费 ¥{{mult(mult(item.shop.price,item.count),0.01)}}</p>
								<p class="p3">¥{{mult(item.shop.price,item.count)}}</p>
							</div>
							<div class="r-bottom-r">
								<count :size="50" :shopId="item.shop._id" @count="count" :countNumber="item.count"></count>
								<i class="icon-rubbish" @click="handleDeleteCart(item)">&#xe613;</i>
							</div> 
						</div>
					</div>
				</div>
			</section>
			<div class="cart-bottom">
				<p>活动优惠：-¥0</p>
				<p>本仓总计（不含税）：-¥{{cartTotalPrice}}</p>
			</div>
			<div class="cut"></div>

			<div class="cart-footer">
				<checkbox class="l ch-b" :boxSelected="selectAll" :isSelected="allCartSelected || allCartSeletedCheck" ></checkbox>
				<span>全选</span>
				<div class="price">
					<p class="p1">总价（不含税）¥<span>{{selectedCartPriceTotal}}</span></p>
					<p>预估税费：¥{{mult(selectedCartPriceTotal,0.01)}}</p>
				</div>
				<div class="button" @click="goToOrder">
					<span>结算({{selectedCart.length}})</span>
				</div>
			</div>
			<confirm ref="confirm" @sure="sure"></confirm>
		</div>
	</div>
</template>
<script>
import TopBar from "@/components/common/top-bar.vue";
import Checkbox from "@/components/common/checkbox.vue";
import Count from "@/components/common/count.vue";
import Confirm from "@/components/common/confirm.vue";

import { mapActions, mapGetters } from "vuex";
import BigNumber from "bignumber.js";

export default {
  data() {
    return {
      allCartSelected: false
    };
  },
  created() {
    if (!this.cartTotalCount) {
      this.$router.replace({
        name: "index"
      });
      return;
    }
  },
  methods: {
    ...mapActions(["addCartAction", "deleteCartAction", "selectCart"]),
    mult(number1, number2) {
      return new BigNumber(number1).times(number2);
    },
    goToOrder() {
      if (this.selectedCart.length) {
        if (!this.currentUser.username) {
          this.$router.push({
						name: "login",
						query:{
							path:this.$route.path
						}
					});
					return
        }
        this.$router.push({
          name: "order"
        });
      }
    },
    count(number, $vm) {
      const cart = this.cart.find(item => {
        if (item.shop._id == $vm.$attrs.shopId) {
          return true;
        }
      });
      this.addCartAction({
        shop: cart.shop,
        count: number
      });
    },
    handleDeleteCart(item) {
      this.currentItem = item;
      this.$refs.confirm.show = true;
    },
    sure() {
      this.deleteCartAction(this.currentItem);
    },
    boxSelected(item) {
      const fn = this.selectCart;
      return fn.bind(this, { item });
    },
    selectAll() {
      this.allCartSelected = !this.allCartSelected;
      const bool = this.allCartSelected ? true : false;
      console.log("selectAll=", bool);
      this.cart.forEach(item => {
        this.selectCart({
          item,
          bool
        });
      });
    }
  },
  computed: {
    ...mapGetters(["cart", "cartTotalCount", "cartTotalPrice","currentUser"]),
    selectedCart() {
      return this.cart.filter(item => {
        return item.selected === true;
      });
    },
    selectedCartPriceTotal() {
      return this.selectedCart.reduce((total, item) => {
        return (
          parseInt(total) + parseInt(this.mult(item.shop.price, item.count))
        );
      }, 0);
    },
    allCartSeletedCheck() {
      return this.cart.every(item => {
        return item.selected === true;
      });
    }
  },
  watch: {
    allCartSeletedCheck(bool) {
      this.allCartSelected = bool;
    },
    cartTotalCount(count) {
      if (count == 0) {
        this.$router.back();
      }
    }
  },
  components: {
    TopBar,
    Checkbox,
    Count,
    Confirm
  }
};
</script>
<style lang="scss" scoped>
@import "@/common/scss/color.scss";
@import "@/common/scss/icon.scss";
@import "@/common/scss/mixin.scss";
.cut {
  width: 100%;
  height: 20px;
  background: $white_6;
}
.ch-b {
  padding: 0 20px;
}
.cart {
  height: 100%;

  background: $white_7;
  box-sizing: border-box;
  .wrapper {
    padding-top: 100px;
    padding-bottom: 100px;
  }
  &-f {
    display: flex;
    align-items: center;
    float: right;
    width: 180px;
    > .icon-home {
      font-size: 40px;
      color: $red_3;
    }
    > span {
      height: 25px; /*no*/
      line-height: 25px; /*no*/
      position: relative;
      font-size: 20px;
      color: $red_3;
      padding: 0 8px; /*no*/
      margin-left: 20px;
      &:after {
        @include border-1px(arc, $red_3);
        border-radius: 12px;
      }
    }
  }
  &-shop {
    position: relative;
    display: flex;
    align-items: center;
    height: 80px;
    background: $white;
    &::after {
      @include border-1px();
    }
  }
  &-list {
    background: $white;
    &-item {
      position: relative;
      display: flex;
      padding: 20px 0;
      overflow: hidden;
      &:after {
        @include border-1px();
        margin-left: 90px;
      }
      .l {
        flex-shrink: 1;
      }
      .m {
        width: 180px;
        flex-shrink: 1;
        margin-right: 20px;
        > img {
          width: 100%;
          margin-bottom: 20px;
        }
        > span {
          color: $red_2;
        }
      }
      .r {
        flex: 1;
        text-align: left;
        font-size: 26px;
        overflow: hidden;
        .s1 {
          position: relative;
          color: $red_2;
          padding: 2px 10px;
          &::after {
            @include border-1px(arc, $red_2);
            border-radius: 30px;
          }
        }
        .s2 {
        }
        &-top {
          @include max-line(1);
          line-height: 2;
          box-sizing: border-box;
        }
        &-bottom {
          display: flex;
          flex-direction: row;
          margin-top: 14px;
          font-size: 24px;
          color: $gray_9;
          &-l {
            width: 50%;
            p {
              width: 100%;
              &.p1 {
                margin-bottom: 20px;
              }
              &.p2 {
                margin-bottom: 8px;
              }
              &.p3 {
                color: $red_2;
              }
            }
          }
          &-r {
            margin-left: 14px;
            .icon-rubbish {
              float: right;
              margin-top: 10px;
              font-size: 46px;
            }
          }
        }
      }
    }
  }
  &-bottom {
    text-align: right;
    background: $white;
    padding: 12px 20px 12px 0;
    line-height: 1.8;
    font-size: 26px;
  }
  &-footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100px;
    background: $white;
    display: flex;
    align-items: center;
    z-index: 100;
    &::after {
      @include border-1px(line, $gray_3_9, 0);
    }
    .price {
      text-align: right;
      flex: 1;
      margin-right: 26px;
      font-size: 26px;
      .p1 {
        margin-bottom: 10px;
      }
    }
    .button {
      background: $red_2;
      color: $white;
      width: 190px;
      height: 100%;
      line-height: 100px;
      flex-shrink: 1;
      font-size: 30px;
    }
  }
}
</style>
