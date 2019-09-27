<template>
	<section class="comment-list">
		<div class="item" v-for="(item,index) in comments" :key="index">
			<div class="top">
				<img :src="item.user.avatar" />
				<div class="info">
					<p class="p1">{{item.user.nickname}}</p>
					<p class="p2">加入考拉海购{{item.user.createdAt}}天</p>
				</div>
				<span class="create_at abs-r">
					{{item.createdAt}}
				</span>
			</div>
			<p class="content">{{item.content}}</p>
			<p class="color">颜色：{{item.color}}</p>
			<ul class="img">
				<li @click="sliderImages=item.imgs" v-for="(imgItem,imgIndex) in item.imgs" :key="imgIndex">
					<img :src="imgItem" />
				</li>
			</ul>
			<div class="reply">
				<p class="name">考拉客服小班长回复：</p>
				<p class="content">{{item.reply}}</p>
			</div>
		</div>
		<div class="mask fixed"  v-show="sliderImages.length" @click="sliderImages=[]">
			<carousel class="carousel" :sHeight="100" :sliderImages="sliderImages"></carousel>
		</div>
	</section>
</template>
<script>
import Carousel from "@/components/common/carousel.vue";
export default {
  name: "CommentList",
  data() {
    return {
      sliderImages: [],
      comments: [
        {
          user: {
            avatar:
              "https://haitao.nos.netease.com/e43a19a6fc864450ad189cc271bd63ff.jpeg?imageView&thumbnail=70x0&quality=60&type=webp",
            nickname: "asdfadf",
            createdAt: 15611112222
          },
          createdAt: 15611122222,
          content:
            "包装很仔细，内里填充都有没变型，防尘袋是叠放在包里的。颜色很漂亮，满意！加了个毛球感觉更可爱！",
          color: "胡椒梗绿30F6GM9T2L",
          imgs: [
            "https://haitao.nos.netease.com/20190625085721659876487bc34bf2867189316a25310b.jpeg?klsize=1080x1080&imageView&thumbnail=240y240&quality=90&type=webp",
            "https://haitao.nos.netease.com/2019062508572104a986b9c83443a0bfb6385f9832c51f.jpeg?klsize=1080x1080&imageView&thumbnail=240y240&quality=90&type=webp",
            "https://haitao.nos.netease.com/2019062508572145f350d8c6a74a7d9bafd1e6f9e4d66b.jpeg?klsize=1080x1080&imageView&thumbnail=240y240&quality=90&type=webp"
          ],
          reply:
            "首先谢谢您的信任选择祥云家，更是小店的万分荣幸！北鼻的评价不仅仅是对于我们包包以及店铺的认可，更是给那些犹豫不决的宝宝一道光一样的指引。因为您的评价使我们更有动力的去挖掘更美的包包，我们甘心做您的美包搬运工，也甘心做您美丽路上的垫脚石！您可以晒图分享日常穿搭，也可以将您的意见与建议告诉我们，让我们不断完善北鼻们的购物体验，让我们更好更快的成长~~最后，祝您遇见更美丽的自己，成为整条街最靓的崽~~爱您么么么~~"
        },
        {
          user: {
            avatar:
              "https://haitao.nos.netease.com/e43a19a6fc864450ad189cc271bd63ff.jpeg?imageView&thumbnail=70x0&quality=60&type=webp",
            nickname: "asdfadf",
            createdAt: 15611112222
          },
          createdAt: 15611122222,
          content:
            "包装很仔细，内里填充都有没变型，防尘袋是叠放在包里的。颜色很漂亮，满意！加了个毛球感觉更可爱！",
          color: "胡椒梗绿30F6GM9T2L",
          imgs: [
            "https://haitao.nos.netease.com/20190625085721659876487bc34bf2867189316a25310b.jpeg?klsize=1080x1080&imageView&thumbnail=240y240&quality=90&type=webp",
            "https://haitao.nos.netease.com/2019062508572104a986b9c83443a0bfb6385f9832c51f.jpeg?klsize=1080x1080&imageView&thumbnail=240y240&quality=90&type=webp",
            "https://haitao.nos.netease.com/2019062508572145f350d8c6a74a7d9bafd1e6f9e4d66b.jpeg?klsize=1080x1080&imageView&thumbnail=240y240&quality=90&type=webp"
          ],
          reply:
            "首先谢谢您的信任选择祥云家，更是小店的万分荣幸！北鼻的评价不仅仅是对于我们包包以及店铺的认可，更是给那些犹豫不决的宝宝一道光一样的指引。因为您的评价使我们更有动力的去挖掘更美的包包，我们甘心做您的美包搬运工，也甘心做您美丽路上的垫脚石！您可以晒图分享日常穿搭，也可以将您的意见与建议告诉我们，让我们不断完善北鼻们的购物体验，让我们更好更快的成长~~最后，祝您遇见更美丽的自己，成为整条街最靓的崽~~爱您么么么~~"
        },
        {
          user: {
            avatar:
              "https://haitao.nos.netease.com/e43a19a6fc864450ad189cc271bd63ff.jpeg?imageView&thumbnail=70x0&quality=60&type=webp",
            nickname: "asdfadf",
            createdAt: 15611112222
          },
          createdAt: 15611122222,
          content:
            "包装很仔细，内里填充都有没变型，防尘袋是叠放在包里的。颜色很漂亮，满意！加了个毛球感觉更可爱！",
          color: "胡椒梗绿30F6GM9T2L",
          imgs: [
            "https://haitao.nos.netease.com/20190625085721659876487bc34bf2867189316a25310b.jpeg?klsize=1080x1080&imageView&thumbnail=240y240&quality=90&type=webp",
            "https://haitao.nos.netease.com/2019062508572104a986b9c83443a0bfb6385f9832c51f.jpeg?klsize=1080x1080&imageView&thumbnail=240y240&quality=90&type=webp",
            "https://haitao.nos.netease.com/2019062508572145f350d8c6a74a7d9bafd1e6f9e4d66b.jpeg?klsize=1080x1080&imageView&thumbnail=240y240&quality=90&type=webp"
          ],
          reply:
            "首先谢谢您的信任选择祥云家，更是小店的万分荣幸！北鼻的评价不仅仅是对于我们包包以及店铺的认可，更是给那些犹豫不决的宝宝一道光一样的指引。因为您的评价使我们更有动力的去挖掘更美的包包，我们甘心做您的美包搬运工，也甘心做您美丽路上的垫脚石！您可以晒图分享日常穿搭，也可以将您的意见与建议告诉我们，让我们不断完善北鼻们的购物体验，让我们更好更快的成长~~最后，祝您遇见更美丽的自己，成为整条街最靓的崽~~爱您么么么~~"
        },
        {
          user: {
            avatar:
              "https://haitao.nos.netease.com/e43a19a6fc864450ad189cc271bd63ff.jpeg?imageView&thumbnail=70x0&quality=60&type=webp",
            nickname: "asdfadf",
            createdAt: 15611112222
          },
          createdAt: 15611122222,
          content:
            "包装很仔细，内里填充都有没变型，防尘袋是叠放在包里的。颜色很漂亮，满意！加了个毛球感觉更可爱！",
          color: "胡椒梗绿30F6GM9T2L",
          imgs: [
            "https://haitao.nos.netease.com/20190625085721659876487bc34bf2867189316a25310b.jpeg?klsize=1080x1080&imageView&thumbnail=240y240&quality=90&type=webp",
            "https://haitao.nos.netease.com/2019062508572104a986b9c83443a0bfb6385f9832c51f.jpeg?klsize=1080x1080&imageView&thumbnail=240y240&quality=90&type=webp",
            "https://haitao.nos.netease.com/2019062508572145f350d8c6a74a7d9bafd1e6f9e4d66b.jpeg?klsize=1080x1080&imageView&thumbnail=240y240&quality=90&type=webp"
          ],
          reply:
            "首先谢谢您的信任选择祥云家，更是小店的万分荣幸！北鼻的评价不仅仅是对于我们包包以及店铺的认可，更是给那些犹豫不决的宝宝一道光一样的指引。因为您的评价使我们更有动力的去挖掘更美的包包，我们甘心做您的美包搬运工，也甘心做您美丽路上的垫脚石！您可以晒图分享日常穿搭，也可以将您的意见与建议告诉我们，让我们不断完善北鼻们的购物体验，让我们更好更快的成长~~最后，祝您遇见更美丽的自己，成为整条街最靓的崽~~爱您么么么~~"
        },
        {
          user: {
            avatar:
              "https://haitao.nos.netease.com/e43a19a6fc864450ad189cc271bd63ff.jpeg?imageView&thumbnail=70x0&quality=60&type=webp",
            nickname: "asdfadf",
            createdAt: 15611112222
          },
          createdAt: 15611122222,
          content:
            "包装很仔细，内里填充都有没变型，防尘袋是叠放在包里的。颜色很漂亮，满意！加了个毛球感觉更可爱！",
          color: "胡椒梗绿30F6GM9T2L",
          imgs: [
            "https://haitao.nos.netease.com/20190625085721659876487bc34bf2867189316a25310b.jpeg?klsize=1080x1080&imageView&thumbnail=240y240&quality=90&type=webp",
            "https://haitao.nos.netease.com/2019062508572104a986b9c83443a0bfb6385f9832c51f.jpeg?klsize=1080x1080&imageView&thumbnail=240y240&quality=90&type=webp",
            "https://haitao.nos.netease.com/2019062508572145f350d8c6a74a7d9bafd1e6f9e4d66b.jpeg?klsize=1080x1080&imageView&thumbnail=240y240&quality=90&type=webp"
          ],
          reply:
            "首先谢谢您的信任选择祥云家，更是小店的万分荣幸！北鼻的评价不仅仅是对于我们包包以及店铺的认可，更是给那些犹豫不决的宝宝一道光一样的指引。因为您的评价使我们更有动力的去挖掘更美的包包，我们甘心做您的美包搬运工，也甘心做您美丽路上的垫脚石！您可以晒图分享日常穿搭，也可以将您的意见与建议告诉我们，让我们不断完善北鼻们的购物体验，让我们更好更快的成长~~最后，祝您遇见更美丽的自己，成为整条街最靓的崽~~爱您么么么~~"
        },
        {
          user: {
            avatar:
              "https://haitao.nos.netease.com/e43a19a6fc864450ad189cc271bd63ff.jpeg?imageView&thumbnail=70x0&quality=60&type=webp",
            nickname: "asdfadf",
            createdAt: 15611112222
          },
          createdAt: 15611122222,
          content:
            "包装很仔细，内里填充都有没变型，防尘袋是叠放在包里的。颜色很漂亮，满意！加了个毛球感觉更可爱！",
          color: "胡椒梗绿30F6GM9T2L",
          imgs: [
            "https://haitao.nos.netease.com/20190625085721659876487bc34bf2867189316a25310b.jpeg?klsize=1080x1080&imageView&thumbnail=240y240&quality=90&type=webp",
            "https://haitao.nos.netease.com/2019062508572104a986b9c83443a0bfb6385f9832c51f.jpeg?klsize=1080x1080&imageView&thumbnail=240y240&quality=90&type=webp",
            "https://haitao.nos.netease.com/2019062508572145f350d8c6a74a7d9bafd1e6f9e4d66b.jpeg?klsize=1080x1080&imageView&thumbnail=240y240&quality=90&type=webp"
          ],
          reply:
            "首先谢谢您的信任选择祥云家，更是小店的万分荣幸！北鼻的评价不仅仅是对于我们包包以及店铺的认可，更是给那些犹豫不决的宝宝一道光一样的指引。因为您的评价使我们更有动力的去挖掘更美的包包，我们甘心做您的美包搬运工，也甘心做您美丽路上的垫脚石！您可以晒图分享日常穿搭，也可以将您的意见与建议告诉我们，让我们不断完善北鼻们的购物体验，让我们更好更快的成长~~最后，祝您遇见更美丽的自己，成为整条街最靓的崽~~爱您么么么~~"
        },
        {
          user: {
            avatar:
              "https://haitao.nos.netease.com/e43a19a6fc864450ad189cc271bd63ff.jpeg?imageView&thumbnail=70x0&quality=60&type=webp",
            nickname: "asdfadf",
            createdAt: 15611112222
          },
          createdAt: 15611122222,
          content:
            "包装很仔细，内里填充都有没变型，防尘袋是叠放在包里的。颜色很漂亮，满意！加了个毛球感觉更可爱！",
          color: "胡椒梗绿30F6GM9T2L",
          imgs: [
            "https://haitao.nos.netease.com/20190625085721659876487bc34bf2867189316a25310b.jpeg?klsize=1080x1080&imageView&thumbnail=240y240&quality=90&type=webp",
            "https://haitao.nos.netease.com/2019062508572104a986b9c83443a0bfb6385f9832c51f.jpeg?klsize=1080x1080&imageView&thumbnail=240y240&quality=90&type=webp",
            "https://haitao.nos.netease.com/2019062508572145f350d8c6a74a7d9bafd1e6f9e4d66b.jpeg?klsize=1080x1080&imageView&thumbnail=240y240&quality=90&type=webp"
          ],
          reply:
            "首先谢谢您的信任选择祥云家，更是小店的万分荣幸！北鼻的评价不仅仅是对于我们包包以及店铺的认可，更是给那些犹豫不决的宝宝一道光一样的指引。因为您的评价使我们更有动力的去挖掘更美的包包，我们甘心做您的美包搬运工，也甘心做您美丽路上的垫脚石！您可以晒图分享日常穿搭，也可以将您的意见与建议告诉我们，让我们不断完善北鼻们的购物体验，让我们更好更快的成长~~最后，祝您遇见更美丽的自己，成为整条街最靓的崽~~爱您么么么~~"
        },
        {
          user: {
            avatar:
              "https://haitao.nos.netease.com/e43a19a6fc864450ad189cc271bd63ff.jpeg?imageView&thumbnail=70x0&quality=60&type=webp",
            nickname: "asdfadf",
            createdAt: 15611112222
          },
          createdAt: 15611122222,
          content:
            "包装很仔细，内里填充都有没变型，防尘袋是叠放在包里的。颜色很漂亮，满意！加了个毛球感觉更可爱！",
          color: "胡椒梗绿30F6GM9T2L",
          imgs: [
            "https://haitao.nos.netease.com/20190625085721659876487bc34bf2867189316a25310b.jpeg?klsize=1080x1080&imageView&thumbnail=240y240&quality=90&type=webp",
            "https://haitao.nos.netease.com/2019062508572104a986b9c83443a0bfb6385f9832c51f.jpeg?klsize=1080x1080&imageView&thumbnail=240y240&quality=90&type=webp",
            "https://haitao.nos.netease.com/2019062508572145f350d8c6a74a7d9bafd1e6f9e4d66b.jpeg?klsize=1080x1080&imageView&thumbnail=240y240&quality=90&type=webp"
          ],
          reply:
            "首先谢谢您的信任选择祥云家，更是小店的万分荣幸！北鼻的评价不仅仅是对于我们包包以及店铺的认可，更是给那些犹豫不决的宝宝一道光一样的指引。因为您的评价使我们更有动力的去挖掘更美的包包，我们甘心做您的美包搬运工，也甘心做您美丽路上的垫脚石！您可以晒图分享日常穿搭，也可以将您的意见与建议告诉我们，让我们不断完善北鼻们的购物体验，让我们更好更快的成长~~最后，祝您遇见更美丽的自己，成为整条街最靓的崽~~爱您么么么~~"
        }
      ]
    };
	},
  components: {
    Carousel
	},
	watch: {
		sliderImages(arr){
			this.$emit('canScroll',arr)
		}
	},
};
</script>
<style lang="scss">
.comment-list {
  .mask {
		.slider{
			overflow: inherit !important;
		}
    .dots {
      bottom: -100px !important;
    }
  }
}
</style>

<style lang="scss" scoped>
@import "@/common/scss/color.scss";
@import "@/common/scss/mixin.scss";

.comment-list {
	&.active{
		height:100%;
		overflow: hidden;
	}
  margin-top: 10px;
  .item {
    position: relative;
    padding: 20px 20px 30px 20px;
    &:after {
      @include border-1px(line, $white_4);
    }
    .top {
      position: relative;
      width: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;
      margin-bottom: 40px;
      > img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        flex-shrink: 1;
        margin-right: 20px;
      }
      .info {
        .p1 {
          margin-bottom: 6px;
          font-size: 26px;
        }
        .p2 {
          color: $gray_7;
        }
      }
      .create_at {
      }
    }
    .content {
      font-size: 26px;
      line-height: 1.3;
      margin-bottom: 10px;
    }
    .color {
      color: $gray_7;
      height: 60px;
      line-height: 60px;
      font-size: 24px;
    }
    .img {
      width: 100%;
      overflow: hidden;
      display: flex;
      li {
        float: left;
        img {
          width: 276px;
          height: 276px;
          margin-right: 20px;
        }
      }
    }
    .reply {
      margin-top: 20px;
      padding: 20px;
      background: $white_5;
      .name {
        color: $blue_1;
        font-size: 24px;
        margin-bottom: 10px;
      }
      .content {
        font-size: 24px;
        line-height: 1.5;
      }
    }
  }
  .mask {
    z-index: 101;
    background: $gray_3_9;
    .carousel {
      width: 100%;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>


