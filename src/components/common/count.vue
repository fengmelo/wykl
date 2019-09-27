<template>
	<div class="count" :class="getClass">
		<span class="subtraction" @click="count(-1)">➖</span>
		<span class="number">{{countNumber}}</span>
		<span class="addition" @click="count(1)">➕</span>
	</div>
</template>
<script>
export default {
  name: "Count",
  props: {
    size: {
      type: Number,
      default: 70
		},
		countNumber:{
			type: Number,
			default:1
		}
  },
  computed: {
    getClass() {
      return `size-${this.size}`;
    }
  },
  methods: {
    count(number) {
			this.$emit('count',number,this)
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/common/scss/mixin.scss";
.count {
  display: flex;
  &.size-70 {
    .subtraction,
    .addition,
    .number {
      width: 70px;
      height: 70px;
      line-height: 70px;
      font-size: 28px;
    }
    .number {
      width: 110px;
      font-size: 38px;
    }
	}
	&.size-50 {
    .subtraction,
    .addition,
    .number {
      width: 50px;
      height: 50px;
      line-height: 50px;
      font-size: 24px;
    }
    .number {
      width: 90px;
      font-size: 30px;
    }
  }
  .subtraction,
  .addition,
  .number {
    text-align: center;
    position: relative;
    &::after {
      @include border-1px(arc);
    }
  }
}
</style>


