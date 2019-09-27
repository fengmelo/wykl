<template>
	<div class="select"  v-show="addressSelectMask">
		<div class="select-wrapper">
			<top-bar title="所在地区" @back="back"></top-bar>
			<div class="tab">
				<div><span :class="{active:tabIndex==0}" @click="tabClick(0)">{{provinceName}}</span></div>
				<div><span :class="{active:tabIndex==1}" @click="tabClick(1)">{{cityName}}</span></div>
				<div><span :class="{active:tabIndex==2}" @click="tabClick(2)">{{areaName}}</span></div>
			</div>

			<div class="select-transition">
				<div class="select-transition-wrapper" ref="slider">
					<div class="content-1 content">
						<ul>
							<li v-for="(item,index) in regions" :key="index" @click="provinceClick(index)">
								<span>{{item.name}}</span><i  v-show="getClass(0,item)" class="icon-right">&#xe687;</i>
							</li>
						</ul>
					</div>

					<div class="content-2 content">
						<ul>
							<li v-for="(item,index) in currentCitys" :key="index" @click="cityClick(index)">
								<span>{{item.name}}</span><i  v-show="getClass(1,item)" class="icon-right">&#xe687;</i>
							</li>
						</ul>
					</div>

					<div class="content-3 content">
						<ul>
							<li v-for="(item,index) in currentAreas" :key="index" @click="areaClick(index)">
								<span>{{item.name}}</span><i  v-show="getClass(2,item)" class="icon-right">&#xe687;</i>
							</li>
						</ul>
					</div>
				</div>
			</div>
		
			
		
		</div>
	</div>
</template>
<script>
import TopBar from "@/components/common/top-bar"
import {prefixStyle} from '@/common/js/dom'

const transition=prefixStyle('transition')
const transform=prefixStyle('transform')
export default {
  data() {
    return {
			addressSelectMask:false,
      lastTabIndex: 0,
      tabIndex: 0,
      citys: [],
      regions: [
        {
          id: 1,
          name: "北京市",
          children: [
            {
              id: 2,
              name: "北京市",
              children: [
                {
                  id: 3,
                  name: "东城区"
                },
                {
                  id: 4,
                  name: "西城区"
                },
                {
                  id: 5,
                  name: "朝阳区"
                },
                {
                  id: 6,
                  name: "丰台区"
                },
                {
                  id: 7,
                  name: "石景山区"
                },
                {
                  id: 8,
                  name: "海淀区"
                },
                {
                  id: 9,
                  name: "门头沟区"
                },
                {
                  id: 10,
                  name: "房山区"
                }
              ]
            }
          ]
        },
        {
          id: 11,
          name: "天津市",
          children: [
            {
              id: 12,
              name: "天津市",
              children: [
                {
                  id: 13,
                  name: "和平区"
                },
                {
                  id: 14,
                  name: "河东区"
                },
                {
                  id: 15,
                  name: "河西区"
                },
                {
                  id: 16,
                  name: "南开区"
                },
                {
                  id: 17,
                  name: "河北区"
                },
                {
                  id: 18,
                  name: "红桥区"
                },
                {
                  id: 19,
                  name: "东丽区"
                },
                {
                  id: 20,
                  name: "津南区"
                }
              ]
            }
          ]
        },
        {
          id: 21,
          name: "浙江省",
          children: [
            {
              id: 22,
              name: "杭州市",
              children: [
                {
                  id: 23,
                  name: "上城区"
                },
                {
                  id: 24,
                  name: "下城区"
                },
                {
                  id: 25,
                  name: "江干区"
                },
                {
                  id: 26,
                  name: "拱墅区"
                },
                {
                  id: 27,
                  name: "西湖区"
                },
                {
                  id: 28,
                  name: "滨江区"
                },
                {
                  id: 29,
                  name: "萧山区"
                },
                {
                  id: 30,
                  name: "余杭区"
                }
              ]
            },
            {
              id: 31,
              name: "宁波市",
              children: [
                {
                  id: 32,
                  name: "象山县"
                },
                {
                  id: 33,
                  name: "宁海县"
                },
                {
                  id: 34,
                  name: "余姚市"
                },
                {
                  id: 35,
                  name: "慈溪市"
                },
                {
                  id: 36,
                  name: "奉化区"
                }
              ]
            },
            {
              id: 37,
              name: "温州市",
              children: [
                {
                  id: 38,
                  name: "鹿城区"
                },
                {
                  id: 39,
                  name: "龙湾区"
                },
                {
                  id: 40,
                  name: "瓯海区"
                },
                {
                  id: 41,
                  name: "洞头区"
                },
                {
                  id: 42,
                  name: "永嘉县"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  computed: {
    provinceName() {
      return this.citys[0] ? this.citys[0].name : "省份";
    },
    cityName() {
      return this.citys[1] ? this.citys[1].name : "城市";
    },
    areaName() {
      return this.citys[2] ? this.citys[2].name : "县区";
    },
    currentCitys() {
      return this.citys[0] ? this.regions[this.citys[0].index].children : [];
    },
    currentAreas() {
      return this.citys[1]
        ? this.currentCitys[this.citys[1].index].children
        : [];
    }
  },
  methods: {
		back(){
			this.addressSelectMask=false
		},
    getClass(index,item) {
      const { citys } = this;
      return citys[index] && citys[index].id == item.id;
    },
    tabClick(index) {
      if (index == 1 && !this.citys.length) {
        return;
      }
      if (index == 2 && this.citys.length < 2) {
        return;
      }
      this.tabIndex = index;
    },
    provinceClick(index) {
      const { id, name } = this.regions[index];
      this.citys.splice(0, 3, { id, name, index });
      this.tabIndex = 1;
    },
    cityClick(index) {
      const { id, name } = this.currentCitys[index];
      this.citys.splice(1, 2, { id, name, index });
      this.tabIndex = 2;
    },
    areaClick(index) {
      const { id, name } = this.currentAreas[index];
      this.citys.splice(2, 1, { id, name, index });			
			this.addressSelectMask=false
			this.$emit('getCitys',this.citys)
    }
  },
  watch: {
    tabIndex(tabIndex) {
      const $el = this.$refs.slider;
      const width = document.documentElement.clientWidth;
      $el.style[transition] = "all .4s";
      const gap = this.tabIndex - this.lastTabIndex;
      const translateX = -gap * width; 
      $el.style[transform] = `translateX(${translateX}px)`;
    }
  },
  components: {
    TopBar
  }
};
</script>
<style lang="scss" scoped>
@import "@/common/scss/color.scss";
@import "@/common/scss/mixin.scss";
@import "@/common/scss/icon.scss";

.select {
	position: fixed;
	top:0;
	bottom:0;
	left:0;
	right:0;
	z-index:120;
  background: $white_7;
  &-wrapper {
    padding-top: 100px;
    background: $white_7;
    .tab {
      text-align: left;
      height: 80px;
      line-height: 80px;
      display: flex;
      div {
        max-width: 120px;
        padding: 0 20px;
        font-size: 30px;
        span {
          position: relative;
          display: inline-block;
          &.active {
            &:after {
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              height: 3px;
              content: "";
              background: $red_7;
            }
          }
        }
      }
    }
  }

  &-transition {
		width:100%;
    overflow: hidden;
    &-wrapper {
      width:300%;
      .content {
				display: inline-block;
				float:left;
        text-align: left;
        background: $white;
        width:33.3333%;
        ul {
          li {
            position: relative;
            height: 80px;
            line-height: 80px;
            padding-left: 20px;
            font-size: 30px;
            i {
              float: right;
              margin-right: 40px;
              color: $red_2;
              font-size: 30px;
            }
            &:after {
              @include border-1px();
            }
          }
        }
      }
    }
  }
}
</style>

