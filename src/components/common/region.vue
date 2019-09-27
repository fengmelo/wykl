<template>
	<div class="region">
		<scroll ref="province" class="row" :data="regions" :probeType="3" :listenScroll="true" @scrollToEnd="provinceScrollToEnd" :isSnap="true">
			<ul>
				<li v-for="(item,index) in regions">{{item.name}}</li>
			</ul>
		</scroll>
		<scroll ref="city"  class="row" :data="citys"  :probeType="3" :listenScroll="true" @scrollToEnd="cityScrollToEnd" :isSnap="true">
			<ul>
				<li v-for="(item,index) in citys">{{item.name}}</li>
			</ul>
		</scroll>
		<scroll ref="area"  class="row" :data="areas" :probeType="3"  :listenScroll="true" @scrollToEnd="areaScrollToEnd" :isSnap="true">
			<ul>
				<li v-for="(item,index) in areas">{{item.name}}</li>
			</ul>
		</scroll>
	</div>
</template>
<script>
import Scroll from "@/components/scroll.vue";
export default {
  name: "Region",
  computed: {
    citys() {
      const { regions, provinceIndex } = this;
      return regions[provinceIndex].children;
    },
    areas() {
      const { citys, cityIndex } = this;
      return citys[cityIndex].children;
		},
		currentAddress(){
			let arr=[]
			arr.push(this.regions[this.provinceIndex].name) 
			arr.push(this.citys[this.cityIndex].name) 
			arr.push(this.areas[this.areaIndex].name) 
			return arr
		}
  },
  data() {
    return {
      provinceIndex: 0,
      cityIndex: 0,
      areaIndex: 0,
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
  methods: {
    provinceScrollToEnd() {
			this.provinceIndex = this.$refs.province.getCurrentPage().pageY;
      this.cityIndex = 0;
      this.$nextTick(() => {
        this.$refs.city.goToPage(0, 0);
      });
    },
    cityScrollToEnd() {
      this.cityIndex = this.$refs.city.getCurrentPage().pageY;
      this.areaIndex=0
      this.$nextTick(()=>{
				this.$refs.area.goToPage(0, 0);
			})
    },
    areaScrollToEnd() {
      this.areaIndex = this.$refs.area.getCurrentPage().pageY;
    }
  },
  components: {
    Scroll
  }
};
</script>
<style lang="scss" scoped>
@import "@/common/scss/mixin.scss";
@import "@/common/scss/color.scss";

.region {
  padding: 200px 0;
  display: flex;
  overflow: hidden;
  .row {
    height: 80px;
    flex: 1;
    position: relative;
    &:before {
      @include border-1px(line, $white_4, 0);
    }
    &:after {
      @include border-1px(line, $white_4);
    }
    ul {
      li {
				font-size:28px;
        height: 80px;
        line-height: 80px;
      }
    }
  }
}
</style>

