<template>
	<div class="address">
		<div class="wrapper">
			<top-bar title="新建收货地址"></top-bar>
			<div class="address-button">
				<span>保存</span>
			</div>
			<div class="address-form">
				<cell class="c1" title="收货人" :arrow="false">
					<input type="text" placeholder="真实姓名" v-model="form.name"/>
				</cell>
				<cell class="c1" title="手机号码"  :arrow="false">
					<input type="text" placeholder="11位手机号"   v-model="form.tel" />
				</cell>
				<cell class="c1" title="所在地区" @clickCell="selectCity" >
					<span>{{regionsText}}</span>
				</cell>
				<cell class="c1" title="详细地址"  :arrow="false">
					<input type="text" placeholder="街道、小区门牌等，不超过40个字" v-model="form.address" />
				</cell>
			</div>
		</div>
		<address-select ref="addressSelect" @getCitys="getCitys"></address-select>
	</div>
</template>
<script>
import TopBar from "@/components/common/top-bar";
import Cell from "@/components/common/cell";
import AddressSelect from "@/components/address/select";

export default {
  data() {
    return {
			form:{
				name:'',
				tel:'',
				address:'',
				regions:[]
			}
    };
	},
	mounted() {
		console.log(this.form)
	},
  methods: {
    selectCity() {
			this.$refs.addressSelect.addressSelectMask=true
		},
		getCitys(citys){
			console.log('citys=',citys)
			this.form.regions=citys
		}
  },
  computed: {
		regionsText(){
			console.log('this.form.regions=',this.form.regions)
			return  (this.form.regions&&this.form.regions.length)?this.form.regions.reduce((text, region) => {
          return text + region.name;
        }, ''):'所在地区'
		}
  },
  components: {
    TopBar,
		Cell,
		AddressSelect
  }
};
</script>
<style lang="scss">
@import "@/common/scss/color.scss";
.address {
  &-form {
    .c1 {
      font-size: 30px;
      color: $gray_7;
      .title {
        display: inline-block;
        width: 160px !important;
      }
      .content {
        margin-right: 0;
        span {
					font-size: 30px !important;
					color:$black_1;
        }
      }
      input {
				width: 100%;
				color:$black_1;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
@import "@/common/scss/color.scss";

.address {
  height: 100%;
  background: $white;
  .wrapper {
    padding-top: 100px;
    background: $white;
  }
  &-button {
    position: fixed;
    left: 20px;
    right: 20px;
    bottom: 20px;
    height: 80px;
    line-height: 80px;
    background: $red_7;
    color: $white;
    font-size: 30px;
    border-radius: 10px;
  }
}
</style>
