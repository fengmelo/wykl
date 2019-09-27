<template>
	<div class="header">
		<span>网易考拉新人礼</span>
		<div class="header-f">
			<i class="icon-home">&#xe60d;</i>
			<span v-if="!currentUser.username" @click="$router.push({name:'login'})">登录</span>
		</div>
	</div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
	name: "WHeader",
	computed: {
		...mapGetters(['currentUser'])
	}
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/color.scss";
@import "@/common/scss/icon.scss";
@import "@/common/scss/mixin.scss";

.header {
	position: relative;
  background: $white;
  height: 90px;
  font-size: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  > span {
    font-weight: 400;
  }
  &-f {
    display: flex;
    align-items: center;
    position: absolute;
    right: 30px;
    > .icon-home {
      font-size: 40px;
      color: $red_3;
    }
    > span {
			height:25px;/*no*/
			line-height: 25px;/*no*/
      position: relative;
      font-size: 20px;
      color: $red_3;
      padding: 0 8px;/*no*/
      margin-left: 20px;
      &:after {
        @include border-1px(arc, $red_3);
        border-radius: 12px;
      }
    }
	}
	&:after{
		@include border-1px()
	}
}
</style>
<style lang="scss">
</style>

