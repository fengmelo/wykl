<template>
	<div class='comment' :class="{active:!canScrollPage}">
		<top-bar title="小伙伴们说"></top-bar>
		<div class="comment-wrapper">
			<div class="header">
				<checkbox class="header-checkbox"></checkbox>
				<span class="text">只看当前商品</span>
				<span class="good"><em class="number">94.6%</em>好评</span>
			</div>
			<div class="tag">
				<ul>
					<li @click="selectedItem(item,index)" :class="{active:index==tagIndex}" v-for="(item,index) in tags" :key="index">{{item.name}}({{item.number}})</li>
				</ul>
			</div>
			<comment-list @canScroll="canScroll"></comment-list>
		</div>
		</div>
</template>
<script>
import CommentList from "@/components/comment/list.vue";
import TopBar from "@/components/common/top-bar.vue";
import Checkbox from "@/components/common/checkbox.vue";

export default {
  name: "Comment",
  data() {
    return {
			canScrollPage:true,
			tagIndex: 0,
			isSelected:false,
      tags: [
        {
          name: "有图",
          number: 29
        },
        {
          name: "颜色漂亮",
          number: 9
        },
        {
          name: "漂亮精致",
          number: 7
        },
        {
          name: "质量很好",
          number: 3
        },
        {
          name: "价格实惠",
          number: 3
        },
        {
          name: "包装用心",
          number: 3
        },
        {
          name: "质量不错",
          number: 2
        },
        {
          name: "物流块",
          number: 2
        },
        {
          name: "宝贝不错",
          number: 2
        }
      ]
    };
  },
  computed: {
    total() {
      return this.tags.reduce((total, tag) => {
        return total + tag.number;
      }, 0);
    }
  },
  created() {
    this.tags.splice(0, 0, {
      name: "全部",
      number: this.total
    });
	},
	methods:{
		selectedItem(item,index){
			this.tagIndex=index
		},
		canScroll(arr){
			this.canScrollPage=arr.length?false:true
		}
	},
  components: {
		TopBar,
		CommentList,
		Checkbox
  }
};
</script>
<style lang="scss" scoped>
@import "@/common/scss/color.scss";
@import "@/common/scss/mixin.scss";
@import "@/common/scss/icon.scss";

.comment {
  background: $white;
	text-align: left;
	&.active{
		height:100%;
		overflow: hidden;
	}
  &-wrapper {
    position: relative;
    padding-top: 180px;
    .header {
      height: 80px;
      line-height: 80px;
      font-size: 28px;
      position: fixed;
      top: 100px;
      left: 0;
      right: 0;
      display: flex;
			align-items: center;
			background:$white;
			z-index:100;
			&-checkbox{
				padding:0 20px;
			}
      .text {
        flex: 1;
      }
      .good {
        width: 180px;
        flex-shrink: 1;
        .number {
					margin-right: 6px;
          font-weight: bold;
        }
      }

      &::after {
        @include border-1px();
      }
    }
    .tag {
      padding: 40px 20px 0 20px;
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          position: relative;
          height: 50px;
          line-height: 50px;
          margin: 0 20px 20px 0;
          padding: 0 22px;
          font-size: 26px;
          &:after {
            @include border-1px(arc, $white_4);
            border-radius: 20px;
					}
					&.active{
						color:$red_7;
						&:after {
            @include border-1px(arc, $red_7);
            border-radius: 20px;
					}
					}
        }
      }
    }
  }
}
</style>

