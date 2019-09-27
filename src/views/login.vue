<template>
	<div class="login">
		<div class="login-header">
			<i @click="$router.go(-1)"  class="icon-back">&#xe614;</i>
			<h3>手机号登录</h3>
		</div>

		<div class="login-input login-account ">
			<input ref="account" class="login-input-content" v-model="username" placeholder="请输入手机号" />
			<i v-show="username" class="icon-del" @click="inputDel('account')">&#xe80b;</i>
		</div>
		
		<div class="login-input" v-show="loginTypeMsg">
			<input class="login-msg login-input-content" v-model="code" placeholder="请输入短信验证码" />
			<div class="login-msg-wrapper">
				<div class="login-msg-wrapper-line"></div>
				<span class="login-msg-wrapper-text" @click="sendMsg" v-show="!isSendMsg">获取验证码</span>
				<span class="login-msg-wrapper-text number"  v-show="isSendMsg">{{number}}s</span>
			</div>
		</div>


		<div class="login-input login-account " v-show="!loginTypeMsg">
			<input ref="password" class="login-input-content" v-model="password" placeholder="请输入密码" />
			<i v-show="password" class="icon-del" @click="inputDel('password')">&#xe80b;</i>
		</div>

		<p class="login-error" v-show="errorMsg">
			<i class="icon-error">&#xe606</i>{{errorMsg}}
		</p>

		<p class="login-desc">登录即代表同意 <span class="underline">服务条款</span></p>

		<div class="login-input login-button">
			<a class="login-input-content login-button-a" href="javascript:;" @click="login">手机号一键登录</a>
		</div>

		<div class="login-remain clearfix">
			<span class="login-remain-left" >{{loginTypeMsg?`遇到问题？`:`忘记密码？`}}</span>
			<span class="login-remain-right" @click="changeType">{{loginTypeMsg?`使用账号密码登录`:`短信快捷登录`}}</span>
		</div>


		<div class="login-other-type">
			<div class="login-other-type-title">
				<span>其他登录方式</span>
				<i class="icon-up-down" @click="iconDown=!iconDown">{{iconDown?`&#xe626;`:`&#xe645;`}}</i>
			</div>
			<div class="login-other-type-img" v-if="iconDown">
				<img src="//haitao.nos.netease.com/c069d541-f233-42a5-9d6c-e44f63e8939f_72_72.png" />
				<img src="//haitao.nos.netease.com/324101d8-952e-44cf-80a3-321b89ec2f73_72_72.png" />
				<img src="//haitao.nos.netease.com/82f6f014-4ef4-4105-b952-db8aa33c9d93_72_72.png" />
				<img src="//haitao.nos.netease.com/9dedbeef-c3e7-4d73-920b-a49af654036c_72_72.png" />
			</div>
		</div>

	</div>
</template>
<script>
import { userLogin } from "@/api/user";
import { setToken } from "@/common/js/cookie";
import {mapActions} from 'vuex'
const DEFAULT_DURANT = 30;

export default {
  data() {
    return {
      username: "",
      code: "",
      password: "",
      loginTypeMsg: true,
      iconDown: true,
      isSendMsg: false,
      number: DEFAULT_DURANT,
      errorMsg: ""
    };
	},
	created() {
		this.path=this.$route.query.path
	},
  methods: {
		...mapActions(['setUser']),
    inputDel(filed) {
      this[filed] = "";
    },
    changeType() {
      this.username = "";
      this.password = "";
      this.loginTypeMsg = !this.loginTypeMsg;
    },
    sendMsg() {
      if (this.isSendMsg) return;
      this.isSendMsg = true;
      clearInterval(timer);
      var timer = setInterval(() => {
        if (this.number == 0) {
          this.isSendMsg = false;
          this.number = DEFAULT_DURANT;
          clearInterval(timer);
          return;
        }
        this.number -= 1;
      }, 1000);
    },
    login() {
      this.errorMsg = "";
      userLogin({
        username: this.username,
        code: this.code
      }).then(res => {
        if (res.code != 20000) {
          this.errorMsg = res.message;
        } else {
					setToken(res.data.token);
					this.setUser({username:this.username})
					console.log(this.path)
					console.log(this.path?this.path:'/')
          this.$router.replace({
						path:this.path?this.path:'/'
					});
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/common/scss/color.scss";
@import "@/common/scss/icon.scss";
@import "@/common/scss/mixin.scss";

.login {
  width: 100%;
  height: 100%;
  background: $white;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  box-sizing: border-box;
  color: $gray_9;

  &-input {
    position: relative;
    height: 84px;
    margin-bottom: 20px;
    &-content {
      display: inline-block;
      width: 100%;
      height: 100%;
      line-height: 84px;
      background: $gray_5;
      border-radius: 40px;
      padding-left: 30px;
      box-sizing: border-box;
      font-size: 26px;
    }
  }

  &-header {
    height: 120px;
    line-height: 120px;
    font-size: 32px;
    font-weight: bold;
    position: relative;
    margin-bottom: 30px;
    .icon-back {
      position: absolute;
      left: 0;
      font-size: 40px;
      padding: 0 50px;
      margin-left: -50px;
    }
  }
  &-account {
    display: flex;
    align-items: center;
    .icon-del {
      position: absolute;
      right: 20px;
      font-size: 30px;
    }
  }
  &-msg {
    position: relative;
    margin-bottom: 20px;
    &-wrapper {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0;
      display: flex;
      align-items: center;
      padding-right: 50px;
      height: 100%;
      &-line {
        position: relative;
        height: 36px;
        &::after {
          @include border-1px("vert", $gray_9);
        }
      }
      &-text {
        display: block;
        font-size: 28px;
        color: $red_2;
        font-weight: 500;
        margin-left: 40px;
        width: 140px;
        &.number {
          color: $gray_3;
        }
      }
    }
  }
  &-error {
    color: $red_2;
    text-align: left;
    margin-bottom: 40px;
  }
  &-desc {
    text-align: left;
    margin-bottom: 34px;
  }
  &-button {
    margin-bottom: 26px;
    &-a {
      padding-left: 30px;
      background: $red_2;
      font-size: 28px;
      color: $white;
    }
  }
  &-remain {
    height: 30px;
    margin-bottom: 120px;
    &-left {
      float: left;
    }
    &-right {
      float: right;
    }
  }
  &-other-type {
    &-title {
      display: flex;
      justify-content: center;
      margin-bottom: 40px;
      > span {
        margin-right: 20px;
      }
    }
    &-img {
      display: flex;
      justify-content: space-around;
      padding: 0 120px;
      img {
        width: 72px;
      }
    }
  }
}
</style>


