<<template>
	<div class="plane">
		<div class="header">
			<img :src="headerImage.left">
			<h3>{{title}}</h3>
			<img :src="headerImage.right">
		</div>
		<slot></slot>
	</div>
</template>
<script>
export default {
	name:'Plane',
	props:{
		headerImage:{
			type:Object,
			default:()=>{
				return {
					left:'https://haitao.nos.netease.com/EJ0vEQ8WCrerq86g1_leftT1803091717_158_50.png?imageView&thumbnail=158x50&quality=80',
					right:'https://haitao.nosdn2.127.net/7rlN6i2KGBXxs26h1_rightT1803091718_158_50.png?imageView&thumbnail=158x50&quality=80'
				}
			}
		},
		title:{
			type:String,
			default:''
		}

	}
}
</script>
<style lang="scss" scoped>
@import "@/common/scss/color.scss";

.plane {
	display: flex;
	flex-wrap: wrap;
	padding-left:20px;
  .header {
    width: 100%;
    height: 90px;
    display: flex;
    flex-direction: center;
    justify-content: center;
    align-items: center;
    img {
      height: 50px;
    }
    h3 {
      font-size: 40px;
      font-weight: bold;
      color: $white;
      margin: 0 20px;
    }
  }
}
</style>
