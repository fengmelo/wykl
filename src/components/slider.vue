<template>
	<div class="slider" ref="slider">
		<div class="slider-group" ref="sliderGroup">
			<slot></slot>
		</div>
		<div class="dots">
			<span :class="{active:index===currentIndex}" v-for="(item,index) in dots" :key="index"></span>
		</div>
	</div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  name: "Slider",
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 5000
    }
  },
  data() {
    return {
      dots: [],
      currentIndex: 0
    };
  },
  mounted() {
    this.$nextTick(()=>{
			this._setSliderWidth();
      this._initDots();
      this._initSlider();
      if (this.autoPlay) {
        this._play();
      }
		});

    window.addEventListener("resize", () => {
      if (!this.slider || !this.slider.enabled) {
        return;
      }
      this.resizeTimer = setTimeout(() => {
        if (this.slider.isInTransition) {
          this._changePageIndex();
        } else {
          if (this.autoPlay) {
            this._play();
          }
        }
        this.refreshSlider();
      }, 60);
    });
  },
  activated() {
    this.slider.enable();
    let index = this.slider.getCurrentPage().pageX;
    this.currentIndex = index;
    this.slider.goToPage(index, 0, 400);
    if (this.autoPlay) {
      this._play();
    }
  },
  methods: {
    refreshSlider() {
      this._setSliderWidth(true);
      this.slider.refresh();
    },
    _play() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.slider.next();
      }, this.interval);
    },
    _initDots() {
      this.dots = new Array(this.children.length);
    },
    _setSliderWidth(resize) {
      this.children = this.$refs.sliderGroup.children;
      let width = 0;
			let sliderWidth = this.$refs.slider.clientWidth;
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i];
				child.style.width = sliderWidth + "px";
        width += sliderWidth;
      }
      if (this.loop && !resize) {
        width += 2 * sliderWidth;
      }
      this.$refs.sliderGroup.style.width = width + "px";
    },
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
				momentum: false,
				eventPassthrough:'vertical',
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
				}
      })

      this.slider.on("scrollEnd", this._changePageIndex);
    },
    _changePageIndex() {
      this.currentIndex = this.slider.getCurrentPage().pageX;
      if (this.autoPlay) {
        this._play();
      }
    }
  }
};
</script>



<style lang="scss" scoped>
.slider {
	position:relative;
	width: 100%;
	height:0px;
	overflow:hidden;
	.slider-group {
		position:absolute;
		display: flex;
		width: 100%;
		>div {
			width: 100%;
			display: flex;
			justify-content: center;
			>a {
				img {
					width: 100%;
				}
			}
		}
	}
	.dots {
		position: absolute;
		bottom: 6px;
		left: 0;
		right: 0;
		display: flex;
		justify-content: center;

		span {
			display: inline-block;
			width: 8px;
			height: 8px;
			border-radius: 50%;
			background: rgba(255, 255, 255, 0.5);
			margin-right: 10px;

			&:last-of-type {
				margin-right: 0px;
			}
		}

		.active {
			background: rgba(255, 255, 255, 0.9);
			width: 20px;
			border-radius: 8px;
		}
	}
}
</style>