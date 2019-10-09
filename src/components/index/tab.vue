<template>
	<div class="activityF" ref="activityF">
		<scroll ref="activity" class="activity" :class="{isiOS:app.isiOS,isFixed}"  :data="activities" :scrollX="true">
			<article class="activity-wrapper">
				<div ref="tabItem" @click="tabClick(index)" v-for="(item,index) in activities" :key="index" class="activity-wrapper-item" :class="{active:activitySelected(index)}">
					<img :src="item.icon"></img>
					<p>{{item.text}}</p>
				</div>
			</article>
		</scroll>
	</div>
</template>
<script>
import Scroll from "@/components/scroll.vue";
import { mapGetters } from "vuex";

export default {
  name: "IndexTab",
  props: {
    activities: {
      type: Array
    }
  },
  data() {
    return {
      activitiesIndex: 0,
			isFixed: false,
			doLstenerTab:false
    };
	},
	computed: {
    ...mapGetters(["app"])
  },
  mounted() {
    if (!this.app.isiOS) {
			//安卓的吸顶效果
      this.$nextTick(() => {
        this.IntersectionObserverFun();
      });
    }
  },
  methods: {
    IntersectionObserverFun: function() {
      let ele = this.$refs.activityF;
      if (IntersectionObserver) {
        let observer = new IntersectionObserver(
          () => {
            let offsetTop = ele.getBoundingClientRect().top;
            this.isFixed = offsetTop < 0;
          },
          {
            threshold: [1]
          }
        );
        observer.observe(document.getElementsByClassName("activityF")[0]);
      } else {
				this.doLstenerTab=true
      }
    },
    listenerTab() {
      let ele = this.$refs.activityF;
      let offsetTop = ele.getBoundingClientRect().top;
      this.isFixed = offsetTop < 0;
    },
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
.activityF {
  height: 110px;
  .activity {
    display: flex;
    top: 0px;
    z-index: 999;
    height: 110px;
    &.isiOS {
      position: sticky !important;
    }
    &.isFixed {
      position: fixed;
      left: 0;
    }
    &-wrapper {
      display: flex;
      height: 100%;
      &-item {
        flex-shrink: 0;
        width: 150px;
        height: 100%;
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
}
</style>

