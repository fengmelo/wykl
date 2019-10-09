import {  throttle } from "@/common/js/util";

export const sliderBarMixin= {
	data(){
		return {
			scrollTop:0
		}
	},
  mounted() {
    this.$refs.pageScroll.addEventListener(
      "scroll",
		  throttle(()=>{
				this.listenerScroll()
			},50),
      false
		);
  },
  methods: {
		goToTop() {
      this.$refs.pageScroll.scrollTo({
        top: 0,
        behavior: "smooth"
      });
		}
	},
	watch:{
		scrollTop(scrollTop){
			scrollTop >= 300 && this.$refs.sliderBar.tipShow == false && (this.$refs.sliderBar.tipShow = true);
      scrollTop < 300 &&  this.$refs.sliderBar.tipShow == true && (this.$refs.sliderBar.tipShow = false);
		}
	}
}