<template>
	<div class="product" @click="$router.push({path:`/shop/${item._id}`})">
		<div class="product-wrapper">
			<div class="product-img">
				<img v-lazy="item.carousel[0].url" />
			</div>
			<h3 class="ellispis">{{item.recommend}}</h3>
			<p class="desc">{{item.title}}</p>
			<div class="product-price">
				<span>
					<em>¥</em>
					<em class="product-price-current">{{item.newPrice}}</em>
				</span>
				<span class="product-price-cost" v-if="item.price">
					<em>¥</em>
					<em class="del">{{item.price}}</em>
				</span> 
				 <transition name="addCart"
                @leave="leave"
                @after-leave="afterLeave">
					<span ref="cart" class="product-price-cart" v-show="hasInCart===false" @click.stop="addCart(item,$event)">
						<i class="icon-cart">&#xe603;</i>
					</span>
				 </transition>
				 
			</div>
			<div class="product-button">
				<span>立即购买</span>
			</div>
		</div>
	</div>
</template>
<script>
import animations from "create-keyframe-animation";
import { prefixStyle } from "@/common/js/dom";
import { mapActions } from "vuex";

const transform = prefixStyle("transform");
const transitionDuration = prefixStyle("transitionDuration");
export default {
  name: "Product",
  props: {
    item: {
      type: Object,
      default: {}
		},
		cartPos:{
			type: Object
		}
  },
  data() {
    return {
			hasInCart: false,
			posGap:{}
    };
	},
  methods: {
		...mapActions(["addCartAction"]),
    addCart(shop, $event) {
			const {x,y}=$event.target.getBoundingClientRect()
      this.posGap={
				x:this.cartPos.x-x,
				y:this.cartPos.y-y
			}
			this.hasInCart = !this.hasInCart
			this.$emit('setCartTransitionEndState',false)
			this.addCartAction({
				shop,
				count:1
			})
    },
    leave(el, done) {
      let animation = {
        0: {
          transform: `translate3d(0,0,0) scale(0.5)`
        },
        60: {
          transform: `translate3d(0,0,0) scale(1.5)`
        },
        100: {
          transform: `translate3d(${this.posGap.x}px,${this.posGap.y}px,0) scale(1)`
        }
      };
      animations.registerAnimation({
        name: "move",
        animation,
        presets: {
          duration: 1000,
          easing: "linear"
        }
      });
      animations.runAnimation(this.$refs.cart, "move", done);
    },
    afterLeave() {
      animations.unregisterAnimation("move");
			this.$refs.cart.style.animation = "";
			this.$emit('setCartTransitionEndState',true)
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/common/scss/color.scss";
@import "@/common/scss/icon.scss";
@import "@/common/scss/mixin.scss";

.product {
  width: 33.33%;
  color: $black_1;
  text-align: left;
  word-break: break-all;
  padding-right: 20px;
  box-sizing: border-box;
  margin-bottom: 10px;
  &-wrapper {
    background: $white;
    padding-bottom: 10px;
  }
  &-img {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
    > img {
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
      margin-top: -100%;
    }
  }
  h3 {
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    font-size: 20px;
    background: $gray_4;
    margin-bottom: 10px;
  }
  .desc {
    font-size: 24px;
    color: $black_3;
    font-weight: 400;
    line-height: 1.3;
    padding-left: 10px;
    margin-bottom: 10px;
    @include max-line();
  }
  &-price {
    color: $red_6;
    padding-left: 10px;
    margin-bottom: 10px;
    height: 40px;
    display: flex;
    align-items: center;
    position: relative;
    &-new {
      font-size: 20px;
      margin-right: 4px;
    }
    &-current {
      font-size: 20px;
      font-weight: bold;
      margin-right: 4px;
    }
    &-cost {
      color: $gray_8;
      .del {
        font-size: 20px;
      }
    }
    &-cart {
      position: absolute;
      right: 8px;
      margin-right: 8px;
      .icon-cart {
        font-size: 36px;
      }
    }
  }
  &-button {
    display: flex;
    justify-content: center;
    height: 45px;
    margin-bottom: 10px;
    text-align: center;
    span {
      width: 90%;
      background: $red_5;
      color: $white;
      line-height: 45px;
      border-radius: 8px;
    }
  }
}
</style>
