const path = require('path')
// const defaultSetting = require('./src/setting.js')

function resolve(dir) {
    return path.join(__dirname, dir)
}

// const name = defaultSetting.title || '小罗修车' // page title
// const name = '小罗修车' // page title

const isProduction = process.env.NODE_ENV === 'production'
const cdn = {
    css: [],
    js: [
        'https://cdn.jsdelivr.net/npm/vue@2.6.11',
        'https://cdn.jsdelivr.net/npm/vuex@3.4.0',
        'https://cdn.jsdelivr.net/npm/vue-router@3.1.6',
        'https://unpkg.com/axios@0.19.2/dist/axios.min.js',
        // 'https://unpkg.com/element-ui@2.13.2/lib/index.js'
    ]
}

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || 8086 // dev port

module.exports = {
    publicPath: './',
    // assetsDir: 'meet',
    outputDir: process.env.NODE_ENV == 'development' ? 'devdist' : 'dist',
    devServer: {
        port: port,
        open: true,
        overlay: {
            warnings: false,
            errors: true
        },
        // before: require('./mock/mock-server.js')
    },
    // css相关配置
    css: { //向所有 Sass 样式传入共享的全局变量 一次配置全局使用，这个scss每个文件都需要
        loaderOptions: {
            sass: {
                prependData: `@import "~@/style/common";`,
            }
        },
        // 是否使用css分离插件 ExtratTextPlugin
        extract: true,
        // 开启 css source maps
        sourceMap: false,
        //启用 css modules for all css / pre-processor files
        //css.modules" option in vue.config.js is deprecated now, please use "css.requireModuleExtension" instead
        // modules: false,
        // 为所有的 CSS 及其预处理文件开启 CSS Modules
        requireModuleExtension: true,
    },
    lintOnSave: false, //关闭eslint
    productionSourceMap: false, // 如果不需要生产的源映射，将其设置为false可以加速生产构建。
    devServer: { //开发服务器
        // port: 8086,
        // open: true,
        // https: false,
        // overlay: {
        //     warnings: true,
        //     errors: true
        // },
        proxy: {
            '/api': {
                target: 'http://192.168.1.76:31998',
                changeOrigin: true,
                bypass: function (req, res, proxyOptions) {
                    if (req.headers.accept.indexOf('html') !== -1) {
                        console.log('Skipping proxy for browser request.');
                        return '/index.html';
                    } else if (process.env.mock === 'mock') {
                        if (RegExp(/\/getCurrentAuth/).test(req.path)) {
                            const name = req.path.split('/').slice(2).join('_')
                            const moke = require(`./src/moke/${name}`)
                            const result = moke('guest')
                            return res.send(result)
                        }
                    }
                },
                pathRewrite: { '^/api': '/' }
            }
        }
    },
    // configureWebpack: { //覆盖webpack默认配置
    //     // provide the app's title in webpack's name field, so that
    //     // it can be accessed in index.html to inject the correct title.
    //     name: name,
    //     resolve: { // 配置解析别名
    //         alias: {
    //             '@': path.resolve(__dirname, './src'),
    //             // '@h':path.resolve(__dirname, './src/assets/hotcss'),
    //             // '@s':path.resolve(__dirname, './src/assets/style'),
    //             // '@i':path.resolve(__dirname, './src/assets/images'),
    //         }
    //     },
    //     plugins: [
    //         // new UglifyJsPlugin({
    //         //     uglifyOptions: {
    //         //         ie8: false,
    //         //         ecma: 8,
    //         //         mangle: true,
    //         //         output: {
    //         //             comments: false,
    //         //             beautify: false,
    //         //         },
    //         //         compress: {
    //         //             drop_console: true,
    //         //         },
    //         //         warnings: false
    //         //     }
    //         // })
    //         // new PrerenderSPAPlugin({
    //         //     // Required - The path to the webpack-outputted app to prerender.
    //         //     staticDir: path.join(__dirname, 'dist'),
    //         //     // Required - Routes to render.
    //         //     // routes: [ '/', '/product', '/contact' ],
    //         //     routes: ['/', '/registration', '/success', '/instruction'],
    //         // })
    //     ]
    // },
    configureWebpack: config => {
        if (isProduction) {
            // 用cdn方式引入
            config.externals = {
                'vue': 'Vue',
                'vuex': 'Vuex',
                'vue-router': 'VueRouter',
                'axios': 'axios',
                // 'element-ui': 'ELEMENT'
            }
        }
        return {
            // name: name,
            resolve: { // 配置解析别名
                alias: {
                    '@': path.resolve(__dirname, './src'),
                }
            }
        }
    },
    chainWebpack: (config) => {
        // 设置svg-sprite-loader 方式1
        // const svgRule = config.module.rule('svg')
        // svgRule.uses.clear()
        // svgRule
        //     .use('svg-sprite-loader')
        //     .loader('svg-sprite-loader')
        //     .options({
        //         symbolId: 'icon-[name]'
        //     })

        // set svg-sprite-loader 方式2
        config.module
            .rule('svg')
            .exclude.add(resolve('src/assets/icon'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/assets/icon'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
        // https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
        // // 移除 prefetch 插件
        // config.plugins.delete('prefetch')
        // // 移除 preload 插件
        // config.plugins.delete('preload')

        // 生产环境配置
        if (isProduction) {
            // 删除预加载
            // config.plugins.delete('preload')
            // config.plugins.delete('prefetch')
            // 压缩代码
            config.optimization.minimize(true)
            // 分割代码
            config.optimization.splitChunks({
                chunks: 'all'
            })
            // 生产环境注入cdn
            config.plugin('html')
                .tap(args => {
                    args[0].cdn = cdn;
                    return args;
                })
        }
    },
}
