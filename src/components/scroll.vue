<template>
  <div ref="wrapper" class="scroll">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    },
    refreshDelay: {
      type: Number,
      default: 20
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    pullup: {
      type: Boolean,
      default: false
    },
    pulldown: {
      type: Boolean,
      default: false
    },
    beforeScroll: {
      type: Boolean,
      default: false
    },
    scrollX: {
      type: Boolean,
      default: false
    },
    scrollY: {
      type: Boolean,
      default: true
    },
    isSnap: {
      type: Boolean,
      default: false
		}
  },
  mounted() {
    setTimeout(() => {
      this._initScroll();
    }, 20);
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }
      const options = {
        probeType: this.probeType,
        click: this.click,
        scrollX: this.scrollX,
        scrollY: this.scrollY
      };
      this.scrollX && (options.eventPassthrough = "vertical");
      if (this.isSnap) {
				options.bounce=false
        options.snap = {
          threshold: 0.1,
        }
        options.momentum = false
      }
      //下拉
      if (this.pulldown) {
        options.pullDownRefresh = {
          threshold: 30, // 当下拉到超过顶部 50px 时，触发 pullingDown 事件
          stop: 20 // 刷新数据的过程中，回弹停留在距离顶部还有 20px 的位置
        };
      }
      if (this.pullup) {
        options.pullUpLoad = {
          threshold: -20 // 在上拉到超过底部 20px 时，触发 pullingUp 事件
        };
      }
      this.scroll = new BScroll(this.$refs.wrapper, options);

      if (this.listenScroll) {
        this.scroll.on("scroll", pos => {
          this.$emit("scroll", pos);
        });
        this.scroll.on("scrollEnd", () => {
          this.$emit("scrollToEnd");
        });
      }

      if (this.pullup) {
        this.scroll.on("pullingUp", () => {
          this.$emit("pullingUp");
        });
      }
      if (this.pulldown) {
        this.scroll.on("pullingDown", () => {
          this.$emit("pullingDown");
        });
      }
      if (this.beforeScroll) {
        this.scroll.on("beforeScrollStart", () => {
          this.$emit("beforeScroll");
        });
      }
    },
    disable() {
      this.scroll && this.scroll.disable();
    },
    enable() {
      this.scroll && this.scroll.enable();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    },
    finishPullDown() {
      this.scroll && this.scroll.finishPullDown();
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
		},
		goToPage(x,y,time=400){
			this.scroll && this.scroll.goToPage(x,y,time);
		},
    getCurrentPage() {
      if (this.scroll) {
        return this.scroll.getCurrentPage();
      }
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        console.log("refresh");
        this.refresh();
      }, this.refreshDelay);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
