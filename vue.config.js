var path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
	 lintOnSave:false,
	 chainWebpack: config => {
		config.resolve.alias
			.set('@$', resolve('src'))
			.set('common',resolve('src/common'))
			.set('components',resolve('src/components'))

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
						require('autoprefixer')({overrideBrowserslist: ['last 2 versions'] }),
            require('postcss-px2rem')({
              remUnit: 75
            })
          ]
        }
     },
	}
}