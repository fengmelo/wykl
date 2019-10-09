import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import {
	fetchList
} from "@/api/config";
import BigNumber from 'bignumber.js'
import { isiOS } from "@/common/js/util";

Vue.use(Vuex)


const debug = process.env.NODE_ENV !== 'production'

const getIndex = (carts, item) => {
	return carts.findIndex((cart) => {
		return cart.shop._id === item._id
	})
}

export default new Vuex.Store({
	state: {
		// 存储当前用户的数据
		currentUser: window.localStorage.getItem('fuser') ? JSON.parse(window.localStorage.getItem('fuser')) : {},
		cart: [], //购物车
		query: '', //搜索页  搜索关键词
		tagOptions: [],
		app:{
			isiOS:isiOS()
		}
	},
	getters: {
		currentUser: state => state.currentUser,
		query: state => state.query,
		cart: state => state.cart,
		cartTotalCount(state) {
			return state.cart.reduce((total, item) => {
				return total + item.count
			}, 0)
		},
		cartTotalPrice(state) {
			return state.cart.reduce((total, item) => {
				return parseInt(total) + parseInt(new BigNumber(item.shop.price).times(item.count))
			}, 0)
		},
		tagOptions(state) {
			return state.tagOptions.length ? state.tagOptions : []
		},
		app:state=> state.app
	},
	mutations: {
		/*
		 * 设置当前用户mutations
		 */
		setUser(state, user) {
			state.currentUser = user
			// 将当前用户数据储存在localStorage里
			window.localStorage.setItem('fuser', JSON.stringify(user))
		},
		/*
		 * 添加购物车
		 */
		addCart(state, {
			shop,
			count
		}) {
			let cart = state.cart.slice()
			const index = getIndex(cart, shop)

			if (index > -1) {
				const sumCount = parseInt(cart[index].count) + parseInt(count)
				if (sumCount < 1) {
					return
				}
				//已存在
				state.cart.splice(index, 1, {
					shop,
					count: sumCount,
					selected: cart[index].selected
				})
			} else {
				state.cart.push({
					shop,
					count,
					selected: false
				})
			}
		},
		deleteCart(state, shop) {
			const index = getIndex(state.cart, shop)
			state.cart.splice(index, 1)
		},
		selectCart(state, {
			item,
			bool
		}) {
			const index = getIndex(state.cart, item.shop)
			let selected = null
			if (bool === true) {
				selected = true
			} else if (bool === false) {
				selected = false
			} else {
				selected = !item.selected
			}
			const newItem = Object.assign(item, {
				selected
			})
			state.cart.splice(index, 1, newItem)
		},
		setQuery(state, query) {
			state.query = query
		},
		setTagOptions(state, tagOptions) {
			state.tagOptions = tagOptions
		}
	},
	actions: {
		setUser(context, {
			username
		}) {
			context.commit('setUser', {
				username
			})
		},
		addCartAction(context, {
			shop,
			count
		}) {
			// 增加action
			context.commit('addCart', {
				shop,
				count
			})
		},
		deleteCartAction(context, shop) {
			context.commit('deleteCart', shop)
		},
		selectCart(context, {
			item,
			bool
		}) {
			console.log('bool1=', bool)
			context.commit('selectCart', {
				item,
				bool
			})
		},
		setQuery(context, query) {
			context.commit('setQuery', query)
		},
		async getTagOptions(context) {
			if (!context.state.tagOptions.length) {
				const res = await fetchList({
					type: "tagOptions"
				});
				if (res.code === 20000) {
					console.log('res.data.tagOptions=', res.data.tagOptions)
					context.commit('setTagOptions', res.data.tagOptions)
				}
			}
		}
	},
	strict: debug,
	plugins: debug ? [createLogger()] : []
})