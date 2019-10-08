var path = require('path')

function resolve(dir) {
	return path.join(__dirname, dir)
}
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const isProduction = process.env.NODE_ENV === 'production';
const cdn = {
	js: ['https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
		'https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js',
		'https://cdn.bootcss.com/vuex/3.1.1/vuex.min.js',
		'https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.min.js'
	]
}

module.exports = {
	lintOnSave: false,
	configureWebpack: config => {
		if (isProduction) {
			config.externals = {
				'vue': 'Vue',
				'vue-router': 'VueRouter',
				'vuex': 'Vuex',
				'axios': 'axios'
			}

			return {
				plugins: [
					new BundleAnalyzerPlugin()
				]
			}
		}
	},
	chainWebpack: config => {
		config.resolve.alias
			.set('@$', resolve('src'))
			.set('common', resolve('src/common'))
			.set('components', resolve('src/components'))

		if (isProduction) {
			config.plugin('html')
				.tap(args => {
					args[0].cdn = cdn;
					return args;
				})
		}

	},
	css: {
		// 是否使用css分离插件 ExtractTextPlugin
		//extract: true,
		// 开启 CSS source maps?
		sourceMap: true,
		// css预设器配置项
		loaderOptions: {
			postcss: {
				plugins: [
					require('autoprefixer')({
						overrideBrowserslist: ['last 2 versions']
					}),
					require('postcss-px2rem')({
						remUnit: 75
					})
				]
			}
		},
	}
}