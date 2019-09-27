<template>
	<slider v-if="sliderImages.length" :class="scaleClass" class="slider-wrapper" ref="sliderWrapper">
		<div v-for="(item,index) in sliderImages" :key="index" class="slider-wrapper-section">
			<a href="javascript:;">
				<img :src="item">
			</a>
		</div>
	</slider>
</template>
<script>
import Scroll from "@/components/scroll.vue";
import Slider from "@/components/slider.vue";

export default {
	name:'Carousel',
  props: {
    sliderImages: {
      type: Array,
      default: []
    },
    sHeight: {
      type: Number,
      default: 50
		},
		sWidth:{
			type: Number,
      default: 100
		}
  },
  data() {
    return {
      isLoadImage: false
    };
  },
  computed: {
    scaleClass() {
      return `height-${this.sHeight}  width-${this.sWidth}`;
    }
  },
  components: {
    Scroll,
    Slider
  }
};
</script>
<style lang="scss">
.slider {
  &.height-50 {
    padding-top: 50%;
    .slider-group {
      margin-top: -50%;
    }
  }
  &.height-100 {
    padding-top: 100%;
    .slider-group {
      margin-top: -100%;
    }
	}
	&.height-80 {
    padding-top: 80%;
    .slider-group {
      margin-top: -80%;
    }
	}
	
	&.width-100{
		.slider-wrapper-section{
			a{
				width:100%;
			}
		}
	}
	&.width-80{
		.slider-wrapper-section{
			a{
				width:80%;
			}
		}
	}
}
</style>

<style lang="scss" scoped>
.slider-wrapper {
  &-section {
    > a {
      display: block;
      > img {
        display: block;
      }
    }
  }
}
</style>
