/**
 * 配置参考:
 * https://cli.vuejs.org/zh/config/
 */
const url = 'http://cloud-gateway:9999';
/**
 * compression-webpack-plugin  Gzip压缩插件
 * 相关文档链接：https://www.jianshu.com/p/26849b857dce
 * 后台配置：https://blog.csdn.net/cxu123321/article/details/103969748
 */
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
module.exports = {
    lintOnSave: true,
    productionSourceMap: false,
    chainWebpack: config => {
        const entry = config.entry('app');
        // polyfill 在英文中有垫片的意思，意为兜底的东西。在计算机科学中，指的是对未能实现的客户端上进行的"兜底"操作。
        //Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。

        // 举例来说，ES6在Array对象上新增了Array.from方法。Babel就不会转码这个方法。如果想让这个方法运行，必须使用babel-polyfill，为当前环境提供一个垫片。
        entry
            .add('babel-polyfill')
            .end();
        //Polyfill for element.classList.
        //Cross-browser JavaScript shim that fully implements element.classList (referenced on MDN)
        entry
            .add('classlist-polyfill')
            .end()
    },
    css: {
        // 忽略 CSS order 顺序警告
        extract: { ignoreOrder: true }
    },
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            // 仅在生产环境下启用该配置
            return {
                performance: {
                    maxAssetSize: 1024000 // 打包后最大文件大小限制
                },
                plugins: [
                    new CompressionWebpackPlugin({
                        filename: '[path].gz[query]',
                        algorithm: 'gzip',
                        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                        threshold: 1024, // 只有大于该值的资源会被处理,当前配置为对于超过1k的数据进行处理，不足1k的可能会越压缩越大
                        minRatio: 0.99, // 只有压缩率小于这个值的资源才会被处理
                        deleteOriginalAssets: true // 删除原文件
                    })
                ]
            }
        }
    },
    // 配置转发代理
    devServer: {
        disableHostCheck: true,
        port: 8080,
        proxy: {
            '/': {
                target: url,
                ws: false, // 需要websocket 开启
                pathRewrite: {
                    '^/': '/'
                }
            }
            // 3.5 以后不需要再配置
        }
    }
}