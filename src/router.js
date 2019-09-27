import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index.vue'
import Config from '@/common/js/config'

Vue.use(Router)

const lazyImport = (file) => () => import(`./views/${file}.vue`)


const router=new Router({
	routes: [{
			path: '/',
			name: 'index',
			component: Index,
			meta:{
				title:'首页'
			}
		},
		{
			path: '/login',
			name: 'login',
			component: lazyImport('login'),
			meta:{
				title:'登录'
			}
		},
		{
			path: '/search',
			name: 'search',
			component: lazyImport('search'),
			meta:{
				title:'搜索'
			}
		},
		{
			path: '/cart',
			name: 'cart',
			component: lazyImport('cart'),
			meta:{
				title:'购物车'
			}
		},
		{
			path: '/order',
			name: 'order',
			component: lazyImport('order'),
			meta:{
				title:'订单'
			}
		},
		{
			path: '/address',
			name: 'address',
			component: lazyImport('address'),
			meta:{
				title:'地址'
			}
		},
		{
			path: '/address/add',
			name: 'addressAdd',
			component: lazyImport('address-add'),
			meta:{
				title:'添加地址'
			}
		},
		{
			path: '/my',
			name: 'my',
			component: lazyImport('my'),
			meta:{
				title:'我的'
			}
		},
		{
			path: '/download',
			name: 'downloadmy',
			component: lazyImport('download'),
			meta:{
				title:'下载'
			}
		},
		{
			path: '/shop/:id',
			name: 'shop',
			component: lazyImport('shop'),
			meta:{
				title:'商品详情'
			}
		},
		{
			path: '/comment/:id',
			name: 'comment',
			component: lazyImport('comment'),
			meta:{
				title:'评论列表'
			}
		}
	]
})


router.beforeEach((to, from, next) => {
  document.title = to.meta.title?(to.meta.title+'-'+Config.title):Config.title
  next()
})

export default router