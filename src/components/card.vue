<<template>
	<div class="card" :style="{backgroundImage:`url(${item.bg?item.bg:defaultBg})`}">
		<div class="card-header">
			<h3>{{item.title}}</h3>
			<span>
				<i class="icon-right">&#xe68b;</i>
			</span>
		</div>
		<p class="card-num">{{item.num}}人购买</p>
		<section class="card-wrapper">
			<div class="card-wrapper-item" v-for="(product,index) in item.products" :key='index'>
				<img :src="product.img" />
				<p class="card-wrapper-item-p1">
					<span>{{product.tag}}</span>
				</p>
				<p class="card-wrapper-item-p2">¥{{product.price}}</p>
				<p class="card-wrapper-item-p3">{{product.desc}}</p>
			</div>

		</section>
	</div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: {}
    }
	},
	data(){
		return{
			defaultBg:'https://haitao.nosdn1.127.net/05c7169f-4589-44f5-b330-a32ee75aa47b.png?imageView&thumbnail=533x355.8338028169014&quality=60'
		}
	}
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/color.scss";
@import "@/common/scss/icon.scss";
@import "@/common/scss/mixin.scss";

.card {
  position: relative;
  height: 490px;
  box-sizing: border-box;
  margin: 20px;
  border-radius: 20px;
  color: $white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &::before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    content: "";

    border-radius: 20px;
  }
  &-header {
    margin-top: 40px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    > h3 {
      height: 50px;
      line-height: 50px;
      font-size: 36px;
      font-weight: 700;
      margin-left: 24px;
      //margin-right:20px;
    }
    > span {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: $white;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 12px;

      > i {
        color: $black_3;
      }
    }
  }
  &-num {
    font-size: 26px;
    font-weight: 500;
  }
  &-wrapper {
    background: $white;
    margin: 20px;
    display: flex;
    &-item {
      width: 33.333%;
      display: flex;
      flex-direction: column;
      color: $red_7;
      padding-bottom: 20px;
      > img {
        width: 100%;
        height: auto;
      }
      &-p1 {
        margin-top: -30px;
        > span {
					position: relative;
					padding: 0px 10px;
          &:after {
						@include border-1px("arc", $red_7);
						border-radius: 30px;
          }
				}
				margin-bottom:20px;
      }
      &-p2 {
        font-size: 28px;
				font-weight: 900;
				margin-bottom:20px;
      }
      &-p3 {
        color: $black_1;
      }
    }
  }
}
</style>
