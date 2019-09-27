<template>
	<div class="sliderbar">
		<transition name="cart">
			<div class="sliderbar-download" v-show="tipShow">
				<img src="https://haitao.nos.netease.com/ed0f0a69-c1c3-4d34-ae30-f97f3b073563T1908152123_180_180.png?imageView&thumbnail=100x0&quality=95">
				<span>打开考拉</span>
			</div>
		</transition>
		<div class="sliderbar-to-top" v-show="tipShow" @click="goToTop">
			<i class="icon-to-top">&#xe645;</i>
			<span>顶部</span>
		</div>
	</div>	
</template>
<script>
export default {
  name: "SliderBar",
  data() {
    return {
      tipShow: false
    };
  },
  methods: {
    goToTop() {
			console.log('goToTop1')
      this.$emit("goToTop");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/color.scss";
@import "@/common/scss/icon.scss";

.sliderbar {
	position:relative;
	 z-index: 250;
  &-download {
    position: fixed;
    right: 30px;
    bottom: 290px;
    display: flex;
    flex-direction: column;
    > img {
      width: 100px;
      height: 100px;
      border-radius: 20px;
      margin-bottom: 8px;
    }
    > span {
      color: $white;
      background: $red_2;
      padding: 6px 6px;
      border-radius: 12px;
      font-size: 20px;
      font-weight: 500;
    }
  }
  .cart-enter-active,
  .cart-leave-active {
    transition: all 0.2s;
  }

  .cart-enter,
  .cart-leave-to {
    transform: translate3d(0, 200%, 0);
    opacity: 0;
  }

  &-to-top {
    position: fixed;
    right: 30px;
    bottom: 150px;
    width: 80px;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: $white;
		>i{
			position: relative;
		}
    > span {
			position: relative;
      margin-top: 10px;
      font-weight: 900;
    }
    &::before {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      content: "";
      background: $gray_3_9;
      opacity: 0.5;
      border-radius: 50%;
    }
  }
}
</style>

