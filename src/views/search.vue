<<template>
	<div class="search-view">
		<search ref='search' class="search-view-header" placeholder="飞利浦" :isDelIcon="true">
			<i slot="left" class="icon-back" @click="searchBack()">&#xe614;</i>
			<span slot="right" @click.stop="selectedItem(query)" class="search-view-header-button">搜索</span>
		</search>

		<div class="search-view-hot" v-show="!query">
			<h3>热门搜索</h3>
			<ul>
				<li @click="clickHotItem(item,index)" v-for="(item,index) in hotSearchs" :key="index">{{item}}</li>
			</ul>
		</div>

		<div class='search-view-suggestions' v-show="query && !selected">
			<ul>
				<li class="ellispis" @click="selectedItem(item)" v-for="(item,index) in suggestions" :key='index'>{{item}}</li>
			</ul>
		</div>

		<div class='search-view-list' v-show="query && selected " >
			<condition></condition>
			<scroll ref="scrollRef" :data="products" :pullup="true" @pullingUp="pullingUp">
				<section class='products'>
					<div class='products-item' v-for="(item,index) in products" :key="index" @click="goToShop(item)">
						<div class='img-wrapper' v-if="item.carousel && item.carousel.length">
							<img :src='item.carousel[0].url'/>
						</div>
						<h3 class='ellispis'>{{item.title}}</h3>
						<p></p>
						<div class="price">
							<span class="s1" v-if="item.price">
								<em>¥</em>
								<em>{{item.price}}</em>
							</span>
							<span  class="s2" v-if="item.newPrice">
								<em>¥</em>
								<em>{{item.newPrice}}</em>
							</span>
							<span  class="s3" v-if="item.vipPrice"></span>
						</div>
						<div class="tag">
							<span class="tag-1" v-for="(tag,tagIndex) in item.tags" :key="tagIndex">{{tagOptionsIndexBy[tag]?tagOptionsIndexBy[tag].label:''}}</span>
							<span class="tag-text">90%好评</span>
						</div>
					</div>
					<loading ref="loading"></loading>
				</section>
			</scroll>
		</div>
	</div>
</template>
<script>
import Search from "@/components/search.vue";
import Condition from "@/components/search/condition.vue";
import Scroll from "@/components/scroll.vue";
import Loading from "@/components/common/loading.vue";

import { mapGetters, mapActions } from "vuex";
import { fetchList } from "@/api/config";
import { fetchProductList } from "@/api/product";
import * as R from "ramda";
export default {
  name: "SearchPage",
  data() {
    return {
      hotSearchs: [
        "吕洗发水",
        "飞利浦电动牙刷",
        "mk女包",
        "简爱酸奶",
        "冠军卫衣",
        "耐克童鞋",
        "耐克女鞋",
        "葡萄籽swisse",
        "蔻驰女包",
        "阿迪达斯女鞋",
        "戴森吹风机",
        "凌美钢笔",
        "碧然德滤芯",
        "牛排大希地"
      ],
      suggestions: [],
      selected: 0,
      clickItem: 0,
      products: [],
      page: 1,
			limit: 10,
			total:0,
			loadingAll:false
    };
  },
  computed: {
    ...mapGetters(["query","tagOptions"]),
    tagOptionsIndexBy() {
      return this.tagOptions ? R.indexBy(R.prop("value"), this.tagOptions) : {};
    }
	},
	created() {
		this.getTagOptions()
	},
  mounted() {
    this.query && this.getList();
    this.selected = this.query ? 1 : 0;
    this.$refs.search.$refs.input.focus();
  },
  methods: {
    ...mapActions(["setQuery","getTagOptions"]),
    goToShop(item) {
      this.$router.push({
        path: `/shop/${item._id}`
      });
    },
    searchBack() {
      this.$router.go(-1);
      this.setQuery("");
    },
    selectedItem(item) {
      if (!item) return;
			this.setQuery(item);
			this.loadingAll=false
      this.selected = 1;
      this.clickItem = 1;
      this.getList();
    },
    clickHotItem(item, index) {
			this.setQuery(item);
			this.loadingAll=false
      this.selected = 1;
      this.clickItem = 1;
      this.getList();
    },
    getList() {
			if(this.loadingAll) return
			this.$refs.loading.show = true
			if(this.page==1){
				this.products=[]
			}
      setTimeout(() => {
        fetchProductList({
          title: this.query,
          page: this.page,
          limit: this.limit
        })
          .then(res => {
						this.$refs.scrollRef.finishPullUp();
						if(res.data.items.length!=this.limit){
							this.$refs.loading.show = false;
						}
						this.products = (this.page==1 ?res.data.items:this.products.concat(res.data.items))
						this.total=res.data.total
						this.loadingAll=(this.products.length>=this.total?true:false)
            this.clickItem = 0
          })
          .catch(() => {
            this.$refs.loading.show = false;
            this.$refs.scrollRef.finishPullUp();
          });
      }, 2000);
    },
    pullingUp() {
      this.page++;
      this.getList();
    }
  },
  watch: {
    query(newQ, oldQ) {
      if (newQ && !this.clickItem) {
				this.selected = 0
				this.loadingAll=false
        fetchProductList({ title: newQ }).then(res => {
          this.suggestions = R.pluck("title")(res.data.items);
        });
      }
    }
  },
  components: {
    Search,
    Condition,
    Scroll,
    Loading
  }
};
</script>
<style lang="scss" scoped>
@import "@/common/scss/color.scss";
@import "@/common/scss/mixin.scss";
.search-view {
  background: $white;
  width: 100%;
  height: 100%;
  &-header {
    .icon-back {
      display: flex;
      font-size: 30px;
      width: 60px;
      align-items: center;
    }
    &-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80px;
      color: $gray_8;
      padding: 0 20px;
      font-size: 30px;
      margin-right: -20px;
    }
  }
  &-hot {
    padding: 40px 20px;
    background: $white;
    > h3 {
      color: $gray_9;
      font-size: 30px;
      height: 40px;
      line-height: 40px;
      text-align: left;
      margin-bottom: 20px;
    }
    > ul {
      display: flex;
      flex-wrap: wrap;
      li {
        position: relative;
        padding: 0 20px;
        margin-right: 20px;
        margin-bottom: 20px;
        font-size: 24px;
        height: 44px;
        line-height: 44px;
        &::after {
          @include border-1px("arc", $gray_8);
          border-radius: 20px;
        }
      }
    }
  }
  &-suggestions {
    padding: 0 20px;
    ul {
      li {
        text-align: left;
        height: 80px;
        line-height: 80px;
        font-size: 28px;
        position: relative;
        &:after {
          @include border-1px();
        }
      }
    }
  }
  &-list {
    .scroll {
      position: fixed;
      width: 100%;
      top: 280px;
      bottom: 0;
      z-index: 0;
    }
    .products {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      padding-left: 20px;
      box-sizing: border-box;
      &-item {
        width: 50%;
        padding-right: 20px;
        box-sizing: border-box;
        text-align: left;
        margin-bottom: 20px;
        .img-wrapper {
          position: relative;
          width: 100%;
          height: 0;
          padding-top: 100%;
          > img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
        }

        > h3 {
          margin-top: 10px;
          font-size: 26px;
          height: 40px;
          line-height: 40px;
        }
        > p {
          font-size: 24px;
          color: $gray_8;
          height: 30px;
          line-height: 30px;
        }
        .price {
          margin-bottom: 10px;
          .s1 {
            color: $red_7;
            font-size: 30px;
            margin-right: 20px;
          }
          .s2 {
            font-size: 26px;
            margin-right: 20px;
          }
          .s3 {
            background-image: url("https://haitao.nos.netease.com/3dc929e9-5d44-42f1-a6db-72080e28dfbf.png");
            width: 75px;
            height: 23px;
            display: inline-block;
            background-size: 100% auto;
          }
        }
        .tag {
          width: 200%;
          font-size: 45px;
          transform: scale(0.5);
          transform-origin: left top;
          &-1 {
            position: relative;
            background: $white;
            color: $red_7;
            padding: 6px 20px;
            margin-right: 20px;
            &:after {
              @include border-1px(arc, $red_7);
            }
          }
          &-2 {
            background: $red_7;
            color: $white;
            padding: 6px 20px;
            margin-right: 20px;
          }
          &-text {
            color: $gray_8;
          }
        }
        // &:nth-of-type(odd) {
        //   padding-right: 10px;
        // }
        // &:nth-of-type(even) {
        //   padding-left: 10px;
        // }
      }
    }
  }
}
</style>
