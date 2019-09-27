<template>
	<scroll ref="activity" class="activity" :data="activities" :scrollX="true">
		<article class="activity-wrapper">
			<div ref="tabItem" @click="tabClick(index)" v-for="(item,index) in activities" :key="index" class="activity-wrapper-item" :class="{active:activitySelected(index)}">
				<img :src="item.icon"></img>
				<p>{{item.text}}</p>
			</div>
		</article>
	</scroll>
</template>
<script>
import Scroll from "@/components/scroll.vue";
export default {
  name: "IndexTab",
  props: {
    activities: {
      type: Array
    }
  },
  data() {
    return {
      activitiesIndex: 0
    };
  },
  methods: {
    activitySelected(index) {
      return this.activitiesIndex == index ? true : false;
    },
    tabClick(index) {
      this.activitiesIndex = index;
      this.$emit("tabClick", index);
    }
  },
  components: {
    Scroll
  }
};
</script>
<style lang="scss" scoped>
@import "@/common/scss/color.scss";
.activity {
  display: flex;
  position: sticky !important;
  top: -2px;
  z-index: 999;
	height: 110px;
  &-wrapper {
    display: flex;
		height:100%;
    &-item {
      flex-shrink: 0;
      width: 150px;
      height:100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: $red_4;
      > img {
        display: block;
        width: 50px;
        height: 50px;
        margin-bottom: 20px;
      }
      p {
        color: $white;
        font-size: 20px;
      }
      &.active {
        background: $red_5;
      }
    }
  }
}
</style>

