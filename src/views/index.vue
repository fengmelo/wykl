<template>
	<div class="index" ref="pageScroll">
		<div class="index-content" >
			<ad></ad>
			<w-header></w-header>
			<search placeholder="飞利浦"></search>
			<carousel :sliderImages="sliderImages"></carousel>
			<tab :activities="activities" @tabClick="tabClick" ref="tab"></tab>
			<welfare :welfares="welfares" ref="tab0"></welfare>
			<newer ref="tab1"></newer>
			<plane  :title="item.text" v-for="(item,index) in activitiesWithPlanes" :key="`tab-${index}`" :ref="`tab${index+2}`">
				<loading v-show="!products[index+1]||!products[index+1].length"></loading>
				<product v-for="(item,index) in products[index+1]" @setCartTransitionEndState="setCartTransitionEndState" :cartPos="cartPos" :key="index" :item="item"></product>
			</plane>
			<card :item="item" v-for="(item,index) in topItems" :key="index"></card>
			<w-footer></w-footer>
			<div class="index-cart" ref="indexCart" @click="goToCart">
				<span v-if="newCartCount">{{newCartCount}}</span>
				<i class="icon-cart">&#xe621;</i>
			</div>
			<slider-bar ref='sliderBar' @goToTop="goToTop"></slider-bar>
		</div>
	</div>
</template>
<script>
import Ad from "@/components/common/ad.vue";
import WHeader from "@/components/header.vue";
import Search from "@/components/search.vue";
import Tab from "@/components/index/tab.vue";
import Carousel from "@/components/common/carousel.vue";

import Plane from "@/components/plane.vue";
import Card from "@/components/card.vue";
import Welfare from "@/components/index/plane/welfare.vue";
import Newer from "@/components/index/plane/newer.vue";
import Product from "@/components/index/plane/product.vue";
import WFooter from "@/components/common/footer.vue";
import SliderBar from "@/components/common/sliderbar.vue";
import Loading from "@/components/common/loading.vue";

import { sliderBarMixin } from "@/common/js/mixin";
import { fetchList } from "@/api/config";
import { fetchProductList } from "@/api/product";

import { mapGetters } from "vuex";
const KEEP_DISTANCE = 100;

export default {
  name: "Index",
  mixins: [sliderBarMixin],
  data() {
    return {
      isiOS: false,
      sliderImages: [
        "https://haitao.nosdn2.127.net/a8d6ae70-f57b-4064-badf-9bc2da144365T1904091436_960_480.jpg?imageView&thumbnail=750x375&quality=60&type=webp",
        "https://haitao.nos.netease.com/5e57a9d6-2cf5-42a8-90a3-ea3ea22edf82T1907311606_960_480.jpg?imageView&thumbnail=750x375&quality=60&type=webp"
      ],
      activities: [],
      welfares: [
        {
          money: 100,
          limit: null,
          day: 7
        },
        {
          money: 10,
          limit: null,
          day: 3
        },
        {
          money: 10,
          limit: 99,
          day: 3
        },
        {
          money: 25,
          limit: 259,
          day: 3
        },
        {
          money: 40,
          limit: 499,
          day: 3
        }
      ],
      products: {},
      indexScrollTop: {},
      topItems: [
        {
          title: "母婴热卖榜",
          num: "31.8万",
          bg:
            "https://haitao.nosdn2.127.net/6f40e2f0-0e08-4bd6-9065-b09e18fe956f.png?imageView&thumbnail=533x355.8338028169014&quality=60",
          products: [
            {
              img:
                "https://haitao.nos.netease.com/54cd844f7a2c46cd9d78002deff6d7f51562568440484jxu0w68f10333.jpg?imageView&thumbnail=165x165&quality=60&type=webp",
              tag: "满1件享受8折",
              price: 260,
              desc: "花王妙而舒 拉拉裤1"
            },
            {
              img:
                "https://haitao.nos.netease.com/54cd844f7a2c46cd9d78002deff6d7f51562568440484jxu0w68f10333.jpg?imageView&thumbnail=165x165&quality=60&type=webp",
              tag: "99选3件",
              price: 39,
              desc: "花王妙而舒 拉拉裤2"
            },
            {
              img:
                "https://haitao.nos.netease.com/54cd844f7a2c46cd9d78002deff6d7f51562568440484jxu0w68f10333.jpg?imageView&thumbnail=165x165&quality=60&type=webp",
              tag: "满3件享8.5折",
              price: 126,
              desc: "花王妙而舒 拉拉裤3"
            }
          ]
        },
        {
          title: "家居生活热卖榜",
          num: "31.8万",
          bg:
            "https://haitao.nos.netease.com/05cc008e-1dcf-4f43-83a3-93c710c61f9f.png?imageView&thumbnail=533x355.8338028169014&quality=60",
          products: [
            {
              img:
                "https://haitao.nos.netease.com/54cd844f7a2c46cd9d78002deff6d7f51562568440484jxu0w68f10333.jpg?imageView&thumbnail=165x165&quality=60&type=webp",
              tag: "满1件享受8折",
              price: 260,
              desc: "花王妙而舒 拉拉裤1"
            },
            {
              img:
                "https://haitao.nos.netease.com/54cd844f7a2c46cd9d78002deff6d7f51562568440484jxu0w68f10333.jpg?imageView&thumbnail=165x165&quality=60&type=webp",
              tag: "99选3件",
              price: 39,
              desc: "花王妙而舒 拉拉裤2"
            },
            {
              img:
                "https://haitao.nos.netease.com/54cd844f7a2c46cd9d78002deff6d7f51562568440484jxu0w68f10333.jpg?imageView&thumbnail=165x165&quality=60&type=webp",
              tag: "满3件享8.5折",
              price: 126,
              desc: "花王妙而舒 拉拉裤3"
            }
          ]
        },
        {
          title: "运动户外热卖榜",
          num: "31.8万",
          products: [
            {
              img:
                "https://haitao.nos.netease.com/54cd844f7a2c46cd9d78002deff6d7f51562568440484jxu0w68f10333.jpg?imageView&thumbnail=165x165&quality=60&type=webp",
              tag: "满1件享受8折",
              price: 260,
              desc: "花王妙而舒 拉拉裤1"
            },
            {
              img:
                "https://haitao.nos.netease.com/54cd844f7a2c46cd9d78002deff6d7f51562568440484jxu0w68f10333.jpg?imageView&thumbnail=165x165&quality=60&type=webp",
              tag: "99选3件",
              price: 39,
              desc: "花王妙而舒 拉拉裤2"
            },
            {
              img:
                "https://haitao.nos.netease.com/54cd844f7a2c46cd9d78002deff6d7f51562568440484jxu0w68f10333.jpg?imageView&thumbnail=165x165&quality=60&type=webp",
              tag: "满3件享8.5折",
              price: 126,
              desc: "花王妙而舒 拉拉裤3"
            }
          ]
        },
        {
          title: "营养保健热卖榜",
          num: "31.8万",
          products: [
            {
              img:
                "https://haitao.nos.netease.com/54cd844f7a2c46cd9d78002deff6d7f51562568440484jxu0w68f10333.jpg?imageView&thumbnail=165x165&quality=60&type=webp",
              tag: "满1件享受8折",
              price: 260,
              desc: "花王妙而舒 拉拉裤1"
            },
            {
              img:
                "https://haitao.nos.netease.com/54cd844f7a2c46cd9d78002deff6d7f51562568440484jxu0w68f10333.jpg?imageView&thumbnail=165x165&quality=60&type=webp",
              tag: "99选3件",
              price: 39,
              desc: "花王妙而舒 拉拉裤2"
            },
            {
              img:
                "https://haitao.nos.netease.com/54cd844f7a2c46cd9d78002deff6d7f51562568440484jxu0w68f10333.jpg?imageView&thumbnail=165x165&quality=60&type=webp",
              tag: "满3件享8.5折",
              price: 126,
              desc: "花王妙而舒 拉拉裤3"
            }
          ]
        },
        {
          title: "营养保健热卖榜",
          num: "31.8万",
          products: [
            {
              img:
                "https://haitao.nos.netease.com/54cd844f7a2c46cd9d78002deff6d7f51562568440484jxu0w68f10333.jpg?imageView&thumbnail=165x165&quality=60&type=webp",
              tag: "满1件享受8折",
              price: 260,
              desc: "花王妙而舒 拉拉裤1"
            },
            {
              img:
                "https://haitao.nos.netease.com/54cd844f7a2c46cd9d78002deff6d7f51562568440484jxu0w68f10333.jpg?imageView&thumbnail=165x165&quality=60&type=webp",
              tag: "99选3件",
              price: 39,
              desc: "花王妙而舒 拉拉裤2"
            },
            {
              img:
                "https://haitao.nos.netease.com/54cd844f7a2c46cd9d78002deff6d7f51562568440484jxu0w68f10333.jpg?imageView&thumbnail=165x165&quality=60&type=webp",
              tag: "满3件享8.5折",
              price: 126,
              desc: "花王妙而舒 拉拉裤3"
            }
          ]
        },
        {
          title: "服装鞋靴热卖榜",
          num: "31.8万",
          products: [
            {
              img:
                "https://haitao.nos.netease.com/54cd844f7a2c46cd9d78002deff6d7f51562568440484jxu0w68f10333.jpg?imageView&thumbnail=165x165&quality=60&type=webp",
              tag: "满1件享受8折",
              price: 260,
              desc: "花王妙而舒 拉拉裤1"
            },
            {
              img:
                "https://haitao.nos.netease.com/54cd844f7a2c46cd9d78002deff6d7f51562568440484jxu0w68f10333.jpg?imageView&thumbnail=165x165&quality=60&type=webp",
              tag: "99选3件",
              price: 39,
              desc: "花王妙而舒 拉拉裤2"
            },
            {
              img:
                "https://haitao.nos.netease.com/54cd844f7a2c46cd9d78002deff6d7f51562568440484jxu0w68f10333.jpg?imageView&thumbnail=165x165&quality=60&type=webp",
              tag: "满3件享8.5折",
              price: 126,
              desc: "花王妙而舒 拉拉裤3"
            }
          ]
        },
        {
          title: "美容彩妆热卖榜",
          num: "31.8万",
          products: [
            {
              img:
                "https://haitao.nos.netease.com/54cd844f7a2c46cd9d78002deff6d7f51562568440484jxu0w68f10333.jpg?imageView&thumbnail=165x165&quality=60&type=webp",
              tag: "满1件享受8折",
              price: 260,
              desc: "花王妙而舒 拉拉裤1"
            },
            {
              img:
                "https://haitao.nos.netease.com/54cd844f7a2c46cd9d78002deff6d7f51562568440484jxu0w68f10333.jpg?imageView&thumbnail=165x165&quality=60&type=webp",
              tag: "99选3件",
              price: 39,
              desc: "花王妙而舒 拉拉裤2"
            },
            {
              img:
                "https://haitao.nos.netease.com/54cd844f7a2c46cd9d78002deff6d7f51562568440484jxu0w68f10333.jpg?imageView&thumbnail=165x165&quality=60&type=webp",
              tag: "满3件享8.5折",
              price: 126,
              desc: "花王妙而舒 拉拉裤3"
            }
          ]
        },
        {
          title: "数码家电热卖榜",
          num: "31.8万",
          products: [
            {
              img:
                "https://haitao.nos.netease.com/54cd844f7a2c46cd9d78002deff6d7f51562568440484jxu0w68f10333.jpg?imageView&thumbnail=165x165&quality=60&type=webp",
              tag: "满1件享受8折",
              price: 260,
              desc: "花王妙而舒 拉拉裤1"
            },
            {
              img:
                "https://haitao.nos.netease.com/54cd844f7a2c46cd9d78002deff6d7f51562568440484jxu0w68f10333.jpg?imageView&thumbnail=165x165&quality=60&type=webp",
              tag: "99选3件",
              price: 39,
              desc: "花王妙而舒 拉拉裤2"
            },
            {
              img:
                "https://haitao.nos.netease.com/54cd844f7a2c46cd9d78002deff6d7f51562568440484jxu0w68f10333.jpg?imageView&thumbnail=165x165&quality=60&type=webp",
              tag: "满3件享8.5折",
              price: 126,
              desc: "花王妙而舒 拉拉裤3"
            }
          ]
        },
        {
          title: "环球美食热卖榜 ",
          num: "31.8万",
          products: [
            {
              img:
                "https://haitao.nos.netease.com/54cd844f7a2c46cd9d78002deff6d7f51562568440484jxu0w68f10333.jpg?imageView&thumbnail=165x165&quality=60&type=webp",
              tag: "满1件享受8折",
              price: 260,
              desc: "花王妙而舒 拉拉裤1"
            },
            {
              img:
                "https://haitao.nos.netease.com/54cd844f7a2c46cd9d78002deff6d7f51562568440484jxu0w68f10333.jpg?imageView&thumbnail=165x165&quality=60&type=webp",
              tag: "99选3件",
              price: 39,
              desc: "花王妙而舒 拉拉裤2"
            },
            {
              img:
                "https://haitao.nos.netease.com/54cd844f7a2c46cd9d78002deff6d7f51562568440484jxu0w68f10333.jpg?imageView&thumbnail=165x165&quality=60&type=webp",
              tag: "满3件享8.5折",
              price: 126,
              desc: "花王妙而舒 拉拉裤3"
            }
          ]
        },
        {
          title: "个人洗护热卖榜 ",
          num: "31.8万",
          products: [
            {
              img:
                "https://haitao.nos.netease.com/54cd844f7a2c46cd9d78002deff6d7f51562568440484jxu0w68f10333.jpg?imageView&thumbnail=165x165&quality=60&type=webp",
              tag: "满1件享受8折",
              price: 260,
              desc: "花王妙而舒 拉拉裤1"
            },
            {
              img:
                "https://haitao.nos.netease.com/54cd844f7a2c46cd9d78002deff6d7f51562568440484jxu0w68f10333.jpg?imageView&thumbnail=165x165&quality=60&type=webp",
              tag: "99选3件",
              price: 39,
              desc: "花王妙而舒 拉拉裤2"
            },
            {
              img:
                "https://haitao.nos.netease.com/54cd844f7a2c46cd9d78002deff6d7f51562568440484jxu0w68f10333.jpg?imageView&thumbnail=165x165&quality=60&type=webp",
              tag: "满3件享8.5折",
              price: 126,
              desc: "花王妙而舒 拉拉裤3"
            }
          ]
        }
      ],
      cartPos: {},
      cartTransitionEnd: false,
      newCartCount: 0
    };
  },
  created() {
    //默认只加载第一屏tab
    this.getActivities().then(() => {
      this.getProductByPlaneId(1);
    });
    this.newCartCount = this.cartTotalCount;
  },
  mounted() {
    const {
      x,
      y,
      width,
      height
    } = this.$refs.indexCart.getBoundingClientRect();
    this.cartPos = {
      x: x + width / 2,
      y: y + height / 2
    };
  },
  computed: {
    ...mapGetters(["cartTotalCount"]),
    activitiesWithPlanes() {
      return this.activities.slice(2);
    }
  },
  methods: {
    setCartTransitionEndState(state) {
      this.cartTransitionEnd = state;
      if (state === true) {
        this.newCartCount = this.cartTotalCount;
      }
    },
    //加载 计算 top值
    getScrollTop() {
      this.$nextTick(() => {
        if (this.$refs.tab) {
          const tabHeight = this.$refs.tab.$el.clientHeight;
          for (let i = 0; i < this.activities.length; i++) {
            const rect = this.getOffsetTop(i);
            this.indexScrollTop[i] = rect - tabHeight;
          }
        }
      });
    },
    //tab的数据源
    getActivities() {
      return fetchList({ type: "activityPosition" }).then(res => {
        this.activities = res.data.activityPosition;
      });
    },
    //加载tab数据  计算top
    getProductByPlaneId(type) {
      if (type < 1) return;
      if (!this.products[type]) {
        this.products[type] = [];
        setTimeout(() => {
          fetchProductList({ type }).then(res => {
            this.products = Object.assign({}, this.products, {
              [type]: res.data.items
            });
            this.getScrollTop();
          });
        }, 2000);
      }
    },
    listenerScroll() {
      this.scrollTop = this.$refs.pageScroll.scrollTop;
      let scrollTop = this.scrollTop;
      const indexScrollTopArr = Object.values(this.indexScrollTop);
      const lastItem = indexScrollTopArr[indexScrollTopArr.length - 1];
      let index = 0;
      let apiTabIndex = 0;

      if (scrollTop >= lastItem) {
        index = indexScrollTopArr.length - 1;
        //瞬间滚动很快的时候
        [...new Array(this.activities.length).keys()].forEach(apiTabIndex => {
          const type = apiTabIndex + 1;
          this.getProductByPlaneId(type);
        });
      } else {
        index = indexScrollTopArr.findIndex((top, index) => {
          return scrollTop >= top && scrollTop < this.indexScrollTop[index + 1];
        });
        apiTabIndex = indexScrollTopArr.findIndex((top, index) => {
          return (
            scrollTop + KEEP_DISTANCE >= top &&
            scrollTop + KEEP_DISTANCE < this.indexScrollTop[index + 1]
          );
        });
        if (apiTabIndex > 0) {
          const type = apiTabIndex + 1;
          this.getProductByPlaneId(type);
        }
        index = index < 0 ? 0 : index;
      }
      this.$refs.tab.activitiesIndex = index;
      this.tabMove(index);
      this.$refs.tab.doLstenerTab && this.$refs.tab.listenerTab();
    },
    //tab条的横向滚动
    tabMove(index) {
      const positionIndex = 2;
      const indexScrollTopArr = Object.values(this.indexScrollTop);
      if (index >= positionIndex) {
        this.$refs.tab.$refs.activity.scrollToElement(
          this.$refs.tab.$refs.tabItem[index - positionIndex],
          300
        );
      }
    },
    //点击tab条
    tabClick(index) {
      this.getProductByPlaneId(index - 2);
      this.getProductByPlaneId(index - 1);
      this.getProductByPlaneId(index);
      this.$nextTick(() => {
        var tabTop = this.getOffsetTop(index);
        const tabHeight = this.$refs.tab.$el.clientHeight;
        this.$refs.pageScroll.scrollTo(0, tabTop - tabHeight);
      });
    },
    getOffsetTop(index) {
      let ref = null;
      if (index < 2) {
        ref = this.$refs[`tab${index}`];
      } else {
        ref = this.$refs[`tab${index}`][0];
      }
      return ref.$el.offsetTop;
    },
    goToCart() {
      this.cartTotalCount && this.$router.push({ name: "cart" });
    }
  },
  components: {
    Ad,
    WHeader,
    Search,
    Plane,
    Welfare,
    Newer,
    Tab,
    Carousel,
    Product,
    Card,
    WFooter,
    SliderBar,
    Loading
  }
};
</script>
<style lang="scss" scoped>
@import "@/common/scss/icon.scss";
@import "@/common/scss/color.scss";

.index {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  &-cart {
    position: fixed;
    left: 30px;
    bottom: 120px;
    background: $black_2;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.8;
    z-index: 100;
    .cart-enter-active,
    .cart-leave-active {
      transition: all 0.4s;
    }

    .cart-enter,
    .cart-leave-to {
      opacity: 0;
    }

    span {
      position: absolute;
      color: $red_2;
      top: 10px;
      right: 20px;
      font-size: 50px;
    }
    .icon-cart {
      font-size: 60px;
      color: $white;
      opacity: 0.5;
    }
  }
}
</style>




