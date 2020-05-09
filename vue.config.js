//配置文件，对于webpack等配置都在此文件中完成
module.exports = {
    devServer: {
        host:'localhost',
        port:8080,
        https: false,
        proxy: {
            //修改路径，changeOrigin:true 是跨域请求
            "/api": {
                target: " http://localhost:8443",
                pathRewrite: {
                    "^/api": "/public/api"
                }
            }
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                //设置路径别名
                styles: "@/assets/styles",
                components: "@/components",
                views: "@/views"
            }
        }
    },

};
