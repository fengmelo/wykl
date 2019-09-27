<template>
	<div class="search">
		<slot name="left"></slot>
		<div class="search-wrapper" @click="wrapperClick">
			<i class="icon-search">&#xe60b;</i>
			<input type="search" ref="input" v-model="query"  :placeholder="placeholder" />
			<i v-show="isDelIcon && query" class="icon-del" @click="inputDel">&#xe80b;</i>
		</div>
		<slot name="right"></slot>
	</div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "Search",
  props: {
    placeholder: {
      type: String,
      default: ""
    },
    isDelIcon: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {
    query: {
      get() {
        return this.$store.state.query;
      },
      set(val) {
        this.setQuery(val)
      }
    }
  },
  methods: {
		...mapActions(['setQuery']),

    wrapperClick() {
      if (this.$router.currentRoute.name == "index") {
        this.$router.push({
          name: "search"
        });
      }
    },
    inputDel() {
      this.query = "";
      this.$refs.input.focus();
    }
  },
  watch: {
    query(newQ, oldQ) {
      if (newQ != oldQ) {
        this.$emit("query", newQ);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/common/scss/color.scss";
@import "@/common/scss/icon.scss";

.search {
  width: 100%;
  height: 90px;
  padding: 10px 20px;
  box-sizing: border-box;
  display: flex;
  background: $white;
  position: relative;
  z-index: 1000;
  &-wrapper {
    background: $gray_2;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    border-radius: 14px;
    .icon-search {
      font-size: 30px;
      font-weight: 900;
      color: $gray_8;
      margin: 0 10px;
    }
    > input {
      height: 100%;
      width: 91%;
      background: $gray_2;
      font-size: 26px;
    }
    .icon-del {
      font-size: 30px;
      padding-right: 20px;
    }
  }
}
</style>
