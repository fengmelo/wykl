<template>
	<div class="condition">
		<section class='condition1'>
			<div class="condition1-item" v-for="(item,index) in condition1Tabs " :key="index" :class='{active:item.active}'  @click="condition1Click(item,index)">
				<span>{{item.text}}</span>
				<span class='triangle-icon' v-if="item.triangle">
					<i class='triangle-up' :class="triangleActive('top')"></i>
					<i class='triangle-down' :class="triangleActive('bottom')" ></i>
				</span>
				<span  v-if="item.icon" class="condition1-item-icon">
					<i class='icon-sx' v-html="item.icon"></i>
				</span>
			</div>
		</section>
		<section class='condition2'>
			<div class="condition2-item" v-for="(item,index) in condition2Tabs " :key="index"  :class="getCondition2Class(item,index)" @click="condition2Click(item,index)">
				<span v-if="index==0">
					<i class='icon-selected' v-show="item.active">&#xe687;</i>
					<em>{{item.text}}</em>
				</span>
				<span v-else  :class="{active:item.active&&item.sure}" >
					<em v-if="item.sure" class="ellispis em1" >{{condition2SureText(index)}}</em>
					<em v-else class="em2">
						{{item.text}}
						<i v-show="item.active" class='triangle-up'></i>
						<i v-show="!item.active" class='triangle-down'></i>
					</em>
				</span>
			</div>
		</section>

		<transition name='sxmask'>
			<div class='condition1-mask' v-show='sxMask' @click='sxMask=false'>
				<div class="wrapper">
					<scroll class="condition1-mask-scroll" :data="maskItems" ref="mask1Scroll" :listenScroll="true" @scroll="scroll" :probeType="3">
						<section class='condition1-mask-content' @click.stop ref='mask1ScrollContent'>
							<div class="item" v-for="(item,index) in maskItems" :key="index">
									<div class="item-header clearfix" :class="{more:(item.children&&item.children.length>3)}">
										<h3>{{item.name}}</h3>
									
										<span class="selected-item ellispis">{{selectedItemText(index)}}</span>

										<span class='more' v-show="item.children&&item.children.length>3">
											<em>更多</em>
											<i @click="toggleShow(item,index)" v-show="item.down" class="icon-down">&#xe626;</i>
											<i @click="toggleShow(item,index)" v-show="!item.down" class="icon-up">&#xe645;</i>
										</span>

									</div>
									<ul>
										<li @click="clickItem(child,childIndex)"  :ref="`li${index}-${childIndex}`"  v-show="childIndex<3||!item.down" class="item-normal-li" v-if="item.type==1||!item.type" v-for="(child,childIndex) in item.children" :key="childIndex">
											<span :class="{active:child.active}"  class="ellispis" >{{child.name}}</span>
										</li>
										<li v-if="item.type==2" class="item-f-li">
											<div class="item-f-li-input" :class="{focus:isFocus}">
												<input v-model.number="item.obj.key1" type="tel" @focus="isFocus=true" @blur="isFocus=false"  placeholder="最低价" />
											</div>
											<span>一</span>
											<div class="item-f-li-input" :class="{focus:isFocus}">
												<input v-model.number="item.obj.key2" type="tel"  @focus="isFocus=true" @blur="isFocus=false" placeholder="最高价"/>
											</div>
										</li>
									</ul>
								</dl>
							</div>
						</section>
					</scroll>
					<div class="condition1-mask-button" ref='mask1Button' @click.stop >
						<div class="condition1-mask-button-reset" @click="reset">
							<span>重置</span>
						</div>
						<div class="condition1-mask-button-confirm">
							<span>确定</span>
							<span class="desc">(5000件商品)</span>
						</div>
					</div>
				</div>
			</div>
		</transition>

		<transition name='condtion2mask'>
			<div class='condition2-mask' v-show='condtion2Mask' >
					<div class="condition2-mask-animate">
						<div class="condition2-mask-wrapper">
							<scroll  v-if="condition2CurrentIndex>0" class='condition2-mask-content' >
								<ul>
									<li @click="clickCondition2Li(item,index,condition2Tabs[condition2CurrentIndex])" :class="{active:item.active}" v-for="(item,index) in condition2Tabs[condition2CurrentIndex].children" :key="index">
										<div class="content">
											<span>{{item.name}}</span>
											<i class='icon-selected' v-show="item.active">&#xe687;</i>
										</div>
									</li>	
								</ul>
							</scroll>
						</div>
						<div class="condition2-mask-button">
							<div class="condition2-mask-button-reset" @click="condition2Rest">
								<span>重置</span>
							</div>
							<div class="condition2-mask-button-confirm" @click="condition2Sure">
								<span>确定</span>
							</div>
						</div>
					</div>
			</div>
		</transition>
	</div>
</template>
<script>
import scroll from "@/components/scroll.vue";
import { getStyle } from "@/common/js/dom.js";
export default {
  name: "Condition",
  data() {
    return {
      condition1Tabs: [
        {
          text: "综合",
          triangle: 0,
          icon: ""
        },
        {
          text: "销量",
          triangle: 0,
          icon: ""
        },
        {
          text: "价格",
          triangle: 1,
          icon: ""
        },
        {
          text: "新品",
          triangle: 0,
          icon: ""
        },
        {
          text: "筛选",
          triangle: 0,
          icon: "&#xe624;"
        }
      ],
      condition2Tabs: [
        {
          text: "考拉自营",
          triangle: 0
        },
        {
          text: "品牌",
          triangle: 1,
          children: [
            {
              id: 1,
              name: "好孩子"
            },
            {
              id: 2,
              name: "Gerbera嘉宝"
            },
            {
              id: 3,
              name: "乐高"
            }
          ]
        },
        {
          text: "分类",
          triangle: 1,
          children: [
            {
              id: 1,
              name: "婴幼儿牛奶粉"
            },
            {
              id: 2,
              name: "童装/婴儿装/亲子装"
            },
            {
              id: 3,
              name: "床上用品"
            },
            {
              id: 1,
              name: "婴幼儿牛奶粉"
            },
            {
              id: 2,
              name: "童装/婴儿装/亲子装"
            },
            {
              id: 3,
              name: "床上用品"
            },
            {
              id: 1,
              name: "婴幼儿牛奶粉"
            },
            {
              id: 2,
              name: "童装/婴儿装/亲子装"
            },
            {
              id: 3,
              name: "床上用品"
            },
            {
              id: 1,
              name: "婴幼儿牛奶粉"
            },
            {
              id: 2,
              name: "童装/婴儿装/亲子装"
            },
            {
              id: 3,
              name: "床上用品"
            },
            {
              id: 1,
              name: "婴幼儿牛奶粉"
            },
            {
              id: 2,
              name: "童装/婴儿装/亲子装"
            },
            {
              id: 3,
              name: "床上用品"
            },
            {
              id: 1,
              name: "婴幼儿牛奶粉"
            },
            {
              id: 2,
              name: "童装/婴儿装/亲子装"
            },
            {
              id: 3,
              name: "床上用品"
            }
          ]
        },
        {
          text: "产品材质",
          triangle: 1,
          children: [
            {
              id: 1,
              name: "一段"
            },
            {
              id: 2,
              name: "全阶段"
            }
          ]
        }
      ],
      maskItems: [
        {
          id: 1,
          name: "考拉服务",
          type: 1,
          children: [
            {
              id: 1,
              name: "促销"
            },
            {
              id: 2,
              name: "考拉自营"
            },
            {
              id: 3,
              name: "仅看有货"
            },
            {
              id: 4,
              name: "会员价"
            },
            {
              id: 5,
              name: "考拉工厂店"
            }
          ]
        },
        {
          id: 2,
          name: "价格",
          type: 2,
          obj: {
            key1: null,
            key2: null
          }
        },
        {
          id: 3,
          name: "品牌",
          type: 1,
          children: [
            {
              id: 1,
              name: "迈克高仕"
            },
            {
              id: 2,
              name: "MIRACLE KILL"
            },
            {
              id: 3,
              name: "万宝龙"
            }
          ]
        },
        {
          id: 4,
          name: "分类",
          type: 1,
          children: [
            {
              id: 1,
              name: "女士单肩/单肩斜挎包"
            },
            {
              id: 2,
              name: "女士单肩手提包"
            },
            {
              id: 3,
              name: "单肩斜挎包"
            }
          ]
        },
        {
          id: 5,
          name: "产品材质",
          type: 1,
          children: [
            {
              id: 1,
              name: "牛皮"
            },
            {
              id: 2,
              name: "PVC"
            },
            {
              id: 3,
              name: "真皮"
            },
            {
              id: 4,
              name: "真皮"
            },
            {
              id: 5,
              name: "皮革"
            },
            {
              id: 6,
              name: "帆布"
            },
            {
              id: 7,
              name: "羊皮"
            },
            {
              id: 8,
              name: "尼龙"
            }
          ]
        },
        {
          id: 6,
          name: "分类",
          children: [
            {
              id: 1,
              name: "洗护发套装"
            },
            {
              id: 2,
              name: "洗发水"
            },
            {
              id: 3,
              name: "护发素"
            }
          ]
        },
        {
          id: 7,
          name: "功能",
          children: [
            {
              id: 1,
              name: "止痒"
            },
            {
              id: 2,
              name: "去头屑"
            },
            {
              id: 3,
              name: "互黑亮泽"
            }
          ]
        },
        {
          id: 7,
          name: "功能",
          children: [
            {
              id: 1,
              name: "止痒"
            },
            {
              id: 2,
              name: "去头屑"
            },
            {
              id: 3,
              name: "互黑亮泽"
            }
          ]
        },
        {
          id: 8,
          name: "包装",
          children: [
            {
              id: 1,
              name: "罐装"
            },
            {
              id: 2,
              name: "盒装"
            },
            {
              id: 3,
              name: "箱装"
            }
          ]
        },
        {
          id: 9,
          name: "国家/地区",
          children: [
            {
              id: 1,
              name: "中国香港"
            },
            {
              id: 2,
              name: "瑞典"
            },
            {
              id: 3,
              name: "捷克共和国"
            },
            {
              id: 4,
              name: "新加坡"
            },
            {
              id: 5,
              name: "韩国"
            },
            {
              id: 6,
              name: "瑞士"
            },
            {
              id: 7,
              name: "斯洛伐克"
            },
            {
              id: 8,
              name: "印度尼西亚"
            },
            {
              id: 9,
              name: "希腊"
            },
            {
              id: 10,
              name: "巴西"
            }
          ]
        }
      ],
      triangleMode: "",
      sxMask: false,
      condtion2Mask: false,
      isFocus: false,
      scrollY: 0
    };
  },
  computed: {
    condition2CurrentIndex() {
      return this.condition2Tabs.findIndex((tab, index) => {
        return index > 0 && tab.active;
      });
    }
  },
  created() {
    this.maskItems = this.maskItems.map(item => {
      item.down = true;
      item.children &&
        (item.children = item.children.map(child => {
          child.active = false;
          return Object.assign({}, child);
        }));
			return Object.assign({}, item);
		});
    this.condition1Tabs = this.condition1Tabs.map((item, index) => {
      item.active = index == 0 ? true : false;
      return Object.assign({}, item);
    });

    this.condition2Tabs = this.condition2Tabs.map(item => {
      item.sure = false;
      item.active = false;
      item.children &&
        (item.children = item.children.map(child => {
          child.active = false;
          return Object.assign({}, child);
        }));
      return Object.assign({}, item);
    });
  },
  methods: {
    condition1Click(item, index) {
      if (index == 2) {
        if (this.triangleMode == "" || this.triangleMode == "bottom") {
          this.triangleMode = "top";
        } else {
          this.triangleMode = "bottom";
        }
      } else {
        this.triangleMode = "";
        if (index == 4) {
          this.sxMask = !this.sxMask;
        }
      }
      this.condition1Tabs.forEach((item, tabIndex) => {
        item.active = tabIndex == index ? true : false;
      });
    },
    triangleActive(mode) {
      return this.triangleMode == mode ? "triangle-active" : "";
    },
    clickCondition2Li(item, index, parent) {
      console.log(item);
      item.active = !item.active;
      this.condition2CurrentItem = parent;
    },
    condition2SureText(index) {
      let arr = [];
      this.condition2Tabs[index].children.forEach(child => {
        child.active == true && arr.push(child.name);
      });

      return arr.join(",");
    },
    condition2Sure() {
      this.condition2CurrentItem.sure = true;
      this.condtion2Mask = false;
      this.condition2Tabs.forEach((tab, index) => {
        index > 0 && (tab.active = false);
      });
    },
    condition2Rest() {
      this.condition2CurrentItem.sure = false;
      this.condition2CurrentItem.children &&
        this.condition2CurrentItem.children.map(child => {
          child.active = false;
        });
      this.condtion2Mask = false;
      this.condition2Tabs.forEach((tab, index) => {
        index > 0 && (tab.active = false);
      });
    },
    condition2Click(item, index) {
			this.condition2CurrentItem = item
			item.active = !item.active;
		
      if (index == 0) {
        this.condtion2Mask = false;
      } else {
        this.condtion2Mask = item.active;
      }
      this.condition2Tabs.forEach((tab,tabIndex) => {
        !tab.sure &&
          (tab.children &&
            tab.children.forEach(child => {
              child.active = false;
						}))
				
				index>0 && tabIndex!=index && (tab.active=false)

      });
    },
    getCondition2Class(item, index) {
			let className=''
			index == 0 && item.active && (className='active1')
			index > 0 && item.active && (className='active')
			return className
    },
    toggleShow(item, index) {
      item.down = !item.down;
      this.$nextTick(() => {
        this.$refs.mask1Scroll.refresh();
        const liEl = this.$refs[`li${index}-${item.children.length - 1}`][0];
        const liElRect = liEl.getBoundingClientRect();
        const mask1ScrollHeight = this.$refs.mask1Scroll.$el.getBoundingClientRect()
          .height;
        const buttonHeight = this.$refs.mask1Button.getBoundingClientRect()
          .height;
        const marginTop = parseInt(getStyle(liEl, "marginTop"));

        const delax =
          liElRect.top -
          mask1ScrollHeight +
          buttonHeight +
          Math.abs(this.scrollY) +
          liElRect.height +
          marginTop;
        if (delax > 0) {
          this.$refs.mask1Scroll.scrollTo(0, -delax, 100);
        }
      });
    },
    scroll(pos) {
      this.scrollY = pos.y;
    },
    selectedItemText(index) {
      let arr = [];
      this.maskItems[index].children &&
        this.maskItems[index].children.forEach(item => {
          item.active && arr.push(item.name);
        });
      return arr.join(",");
    },
    clickItem(item, index) {
      item.active = !item.active;
    },
    reset() {
      this.maskItems.forEach(item => {
        item.children &&
          item.children.map(child => {
            child.active = false;
            return child;
          });

        item.obj &&
          Object.keys(item.obj).forEach(key => {
            item.obj[key] = null;
          });
      });
    }
  },
  components: {
    scroll
  }
};
</script>
<style lang="scss" scoped>
@import "@/common/scss/color.scss";
@import "@/common/scss/mixin.scss";
@import "@/common/scss/icon.scss";
.condition {
  .condition1 {
    position: relative;
    z-index: 1000;
    display: flex;
    justify-content: space-around;
    height: 80px;
    line-height: 80px;
    font-size: 30px;
    color: $gray_9;
    background: $white;
    box-sizing: border-box;
    &-item {
      display: flex;
      justify-content: center;
      position: relative;
      &.active {
        color: $red_2;
      }
      &-icon {
        &::before {
          @include border-1px("vert", $gray_6);
        }
        .icon-sx {
          margin-left: 4px;
        }
      }
    }

    &::before {
      @include border-1px("line", $gray_6, 0);
    }
    &::after {
      @include border-1px("line", $gray_6);
    }

    div {
      flex: 1;
    }
  }
  .condition2 {
    height: 100px;
    line-height: 100px;
    padding: 0 20px;
    display: flex;
    justify-content: space-around;
    position: relative;
    z-index: 1000;
    margin-bottom: 20px;
    overflow: hidden;
    background: $white;
    &-item {
      width: 25%;
      flex-shrink: 1;
      flex: 1;
      height: 100%;
      &.active {
        position: relative;
        z-index: 1001;
        span {
          display: inline-block;
          height: 100% !important;
          padding: 0 !important;
          background: $white !important;
          &::after {
            @include border-1px(arc, $gray_6);
            border-radius: 20px;
          }
          em {
            position: relative;
            top: 1px; /*no*/
          }
        }
      }
      &:not(.active) {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      &.active1 {
        span {
          background: $white !important;
          color: $red_2 !important;
          &::after {
            @include border-1px(arc, $red_2);
            border-radius: 20px;
          }
        }
      }
      span {
        position: relative;
        display: inline-block;
        width: 91%;
        height: 60px;
        line-height: 60px;
        font-size: 24px;
        background: $gray_5;
        border-radius: 10px;

        &.active {
          top: 20px;
        }
        &:not(.active) {
          .em1 {
            position: relative;
            &:after {
              @include border-1px(arc, $red_2);
              border-radius: 20px;
            }
          }
        }
        .em1 {
          display: inline-block;
          width: 100%;
          height: 100%;
          background: $white;
          color: $red_2;
        }
      }
    }
    &::after {
      @include border-1px(line, $gray_6);
    }
  }

  .condition1-mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: $gray_3_9;
    z-index: 1001;
    .wrapper {
      width: 100%;
      height: 100%;
    }
    &-scroll {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 110px;
      right: 0;
      background: $white;
    }
    &-content {
      width: 100%;
      text-align: left;
      padding-bottom: 120px;
      .item {
        &-header {
          padding-right: 20px;
          display: flex;
          position: relative;
          &.more {
            padding-right: 100px;
          }
          h3 {
            flex-shrink: 1;
            font-size: 30px;
            margin-right: 20px;
          }
          .selected-item {
            text-align: right;
            flex: 1;
            color: $red_2;
            margin-right: 20px;
            font-size: 20px;
          }
          .more {
            position: absolute;
            width: 100px;
            flex-shrink: 1;
            right: 0;
            color: $gray_3;
            font-size: 20px;
            > em {
              margin-right: 6px;
            }
          }
        }
        padding-top: 40px;
        padding-left: 20px;
        > ul {
          display: flex;
          flex-wrap: wrap;
          font-size: 24px;
          li {
            margin-top: 20px;
          }
          .item-normal-li {
            flex-shrink: 1;
            width: 33.3333333%;
            height: 60px;
            line-height: 60px;
            text-align: center;
            padding-right: 20px;
            box-sizing: border-box;
            span {
              position: relative;
              display: inline-block;
              width: 100%;
              background: $gray_5;
              &.active {
                background: $white;
                color: $red_2;
                &::after {
                  @include border-1px(arc, $red_2);
                  border-radius: 20px;
                }
              }
            }
          }
        }
        &-f-li {
          display: flex;
          justify-content: space-around;
          width: 100%;
          height: 60px;
          line-height: 60px;
          padding-right: 20px;
          box-sizing: border-box;
          span {
            width: 20px;
            color: $gray_9;
            background: transparent !important;
          }
          &-input {
            position: relative;
            width: 270px;
            border-radius: 20px;
            input {
              width: 100%;
              height: 100%;
              text-align: center;
              background: $gray_5;
              color: $red_2;
            }
            &.focus {
              &::after {
                @include border-1px(arc, $red_2);
                border-radius: 20px;
              }
            }
          }
        }
      }
    }
    &-button {
      position: fixed;
      bottom: 0;
      left: 110px;
      right: 0;
      height: 100px;
      display: flex;
      font-size: 30px;
      background: $white;
      div {
        flex: 1;
        text-align: center;
        line-height: 100px;
      }
      &-confirm {
        color: $white;
        background: $red_2;
        .desc {
          margin-left: 10px;
          font-size: 20px;
        }
      }
      &::before {
        @include border-1px("line", $gray_6, 0);
      }
    }
  }
  .sxmask-enter-active {
    transition: all 0.4s;
    .wrapper {
      transition: all 0.4s;
    }
  }
  .sxmask-leave-active {
    transition: all 0.1s;
    .wrapper {
      transition: all 0.4s;
    }
  }
  .sxmask-enter,
  .sxmask-leave-to {
    .wrapper {
      transform: translate3d(100%, 0, 0);
    }
  }
  .condition2-mask {
    position: absolute;
    top: 270px;
    bottom: 0;
    left: 0;
    right: 0;
    background: $gray_3_9;
    z-index: 999;
    &-wrapper {
      position: relative;
      top: -1px;
      background: $white;
    }
    &-content {
      min-height: 260px;
      max-height: 440px;
      padding: 0px 20px;
      overflow: hidden;
      text-align: left;
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          padding-top: 34px;
          padding-right: 40px;
          box-sizing: border-box;
          width: 50%;
          box-sizing: border-box;
          flex-shrink: 1;
          height: 70px;
          font-size: 26px;
          .content {
            display: flex;
            height: 100%;
            span {
              flex: 1;
            }
            i {
              color: $red_2;
              font-size: 24px;
              width: 40px;
              flex-shrink: 1;
            }
          }

          &.active {
            .content {
              position: relative;
              &::after {
                @include border-1px(line, $red_2);
              }
            }
          }
        }
      }
    }
    &-button {
      display: flex;
      height: 100px;
      line-height: 100px;
      background: $white;
      position: relative;
      &::after {
        @include border-1px("line", $gray_6, 0);
      }
      div {
        font-size: 26px;
        width: 50%;
      }
      &-confirm {
        background: $red_2;
        color: $white;
      }
    }
  }
  .condtion2mask-enter-active,
  .condtion2mask-leave-active {
    transition: all 0.1s ease-out;
    .condition2-mask-animate {
      transition: all 0.1s ease-out;
    }
  }
  .condtion2mask-enter,
  .condtion2mask-leave-to {
    opacity: 0;
    .condition2-mask-animate {
      transform: translate3d(0, -100%, 0);
    }
  }

  .triangle-icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .triangle-down {
      @include triangle(bottom, $gray_9);
    }
  }
  .triangle-up {
    margin-left: 8px;
    @include triangle(top, $gray_9);
    vertical-align: 4px;
    margin-bottom: 4px;
    &.triangle-active {
      @include triangle(top, $red_2);
    }
  }
  .triangle-down {
    margin-left: 8px;
    @include triangle();
    vertical-align: -4px;
    &.triangle-active {
      @include triangle(bottom, $red_2);
    }
  }
}
</style>


