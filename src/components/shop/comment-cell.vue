<template>
	<div class="comment-cell">
		<p>其他小伙伴说(122)<i class="icon-right">&#xe68b;</i></p>
		<scroll :scrollX="true" class="comment-cell-scroll">
			<section>
				<div class="item" v-for="(item,index) in comments" :key="index" @click="goToComment">
					<div class="item-left">
						<div class="item-left-top">
							<img :src="item.user.avatar" /><span>{{item.user.nickname}}</span>
						</div>
						<p>{{item.content}}</p>
					</div>
					<div class="item-right">
						<img :src="item.imgs[0]" />
						<span>第一张图</span>
					</div>
				</div>
			</section>
		</scroll>
	</div>
</template>
<script>
import Scroll from "@/components/scroll.vue";
export default {
  name: "CommentCell",
  components: {
    Scroll
  },
  data() {
    return {
      comments: [
        {
          user: {
            avatar:
              "https://haitao.nos.netease.com/e43a19a6fc864450ad189cc271bd63ff.jpeg?imageView&thumbnail=60x0&quality=75&type=webp",
            nickname: "sdafasfd"
          },
          content:
            "很不错～物流也很快了打算再种草橘色！很不错～物流也很快了打算再种草橘色！",
          imgs: [
            "https://haitao.nos.netease.com/20190616005012107cf73d76644f7696efade4c30e441a.jpeg?klsize=1242x1656&imageView&thumbnail=220y220&quality=75&type=webp"
          ]
        },
        {
          user: {
            avatar:
              "https://haitao.nos.netease.com/e43a19a6fc864450ad189cc271bd63ff.jpeg?imageView&thumbnail=60x0&quality=75&type=webp",
            nickname: "sdafasfd"
          },
          content:
            "很不错～物流也很快了打算再种草橘色！很不错～物流也很快了打算再种草橘色！",
          imgs: [
            "https://haitao.nos.netease.com/20190616005012107cf73d76644f7696efade4c30e441a.jpeg?klsize=1242x1656&imageView&thumbnail=220y220&quality=75&type=webp"
          ]
        },
        {
          user: {
            avatar:
              "https://haitao.nos.netease.com/e43a19a6fc864450ad189cc271bd63ff.jpeg?imageView&thumbnail=60x0&quality=75&type=webp",
            nickname: "sdafasfd"
          },
          content:
            "很不错～物流也很快了打算再种草橘色！很不错～物流也很快了打算再种草橘色！",
          imgs: [
            "https://haitao.nos.netease.com/20190616005012107cf73d76644f7696efade4c30e441a.jpeg?klsize=1242x1656&imageView&thumbnail=220y220&quality=75&type=webp"
          ]
        },
        {
          user: {
            avatar:
              "https://haitao.nos.netease.com/e43a19a6fc864450ad189cc271bd63ff.jpeg?imageView&thumbnail=60x0&quality=75&type=webp",
            nickname: "sdafasfd"
          },
          content:
            "很不错～物流也很快了打算再种草橘色！很不错～物流也很快了打算再种草橘色！",
          imgs: [
            "https://haitao.nos.netease.com/20190616005012107cf73d76644f7696efade4c30e441a.jpeg?klsize=1242x1656&imageView&thumbnail=220y220&quality=75&type=webp"
          ]
        },
        {
          user: {
            avatar:
              "https://haitao.nos.netease.com/e43a19a6fc864450ad189cc271bd63ff.jpeg?imageView&thumbnail=60x0&quality=75&type=webp",
            nickname: "sdafasfd"
          },
          content:
            "很不错～物流也很快了打算再种草橘色！很不错～物流也很快了打算再种草橘色！",
          imgs: [
            "https://haitao.nos.netease.com/20190616005012107cf73d76644f7696efade4c30e441a.jpeg?klsize=1242x1656&imageView&thumbnail=220y220&quality=75&type=webp"
          ]
        },
        {
          user: {
            avatar:
              "https://haitao.nos.netease.com/e43a19a6fc864450ad189cc271bd63ff.jpeg?imageView&thumbnail=60x0&quality=75&type=webp",
            nickname: "sdafasfd"
          },
          content:
            "很不错～物流也很快了打算再种草橘色！很不错～物流也很快了打算再种草橘色！",
          imgs: [
            "https://haitao.nos.netease.com/20190616005012107cf73d76644f7696efade4c30e441a.jpeg?klsize=1242x1656&imageView&thumbnail=220y220&quality=75&type=webp"
          ]
        }
      ]
    };
	},
	methods: {
		goToComment(){
			this.$router.push({
				path:'/comment/1'
			})
		}
	},
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/icon.scss";
@import "@/common/scss/mixin.scss";
.comment-cell {
	position:relative;
	padding-top:30px;
  height: 300px;
	overflow: hidden;
	&::before{
		@include border-1px(line,$gray_1,0)
	}
  p {
		text-align:left;
		font-size:30px;
		padding-left:20px;
		margin-bottom:20px;
    i {
			float: right;
			margin-right:40px;
			font-size:30px;
    }
  }
  &-scroll {
    width: 100%;
    overflow: hidden;
    display: flex;
    > section {
      display: flex;
      .item {
				display: flex;
				padding:20px;
        &-left {
					width:222px;
					flex-shrink: 1;
					padding-right:10px;
          &-top {
						display: flex;
						flex-direction: row;
						align-items: center;
						margin-bottom:30px;
						width:150px;
						flex-shrink: 1;
            > img {
              width: 60px;
              height: 60px;
							border-radius: 50%;
							margin-right:20px;
						}
						span{
							font-size:24px;
						}
					}
					>p{
						text-align:left;
						font-size:26px;
						line-height:1.3;
						@include max-line(3)
					}
				}
				&-right{
					position:relative;
					width:220px;
					height:220px;
					flex-shrink: 1;
					img{
						width:100%;
						height:100%;
					}
					span{
						position:absolute;
						bottom:4px;
						right:4px;
						background:$gray_3_9;
						color:$white;
						padding:4px 10px;
					}
				}
      }
    }
  }
}
</style>
