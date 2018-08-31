var path = require('path');

//这个插件就是将所有的css提取出来，并生成一个main.css文件,最终在index.html中通过link引入
var ExtractTextPlugin = require("extract-text-webpack-plugin");
//webpack4版本的需要　才将其引入
var VueLoaderPlugin = require('vue-loader/lib/plugin');
var config = {
    entry:{
        main:'./main'//入口文件
    },
    output:{//配置后，打包的文件就会存储到demo/dist/main.js
        path:path.join(__dirname,'./dist'),//path选项是打包后文件的输出目录
        publicPath:'/dist/',//是资源引用的目录
        filename:'[name].js',//文件输出的名字
        chunkFilename:'[name].chunk.js'
    },
    module:{
        rules:[
            {//配置的意思就是当加载到一个css文件，需要先通过css-loader转化，再通过style-loader转化然后再打包
                //test 和　use是rules属性里面必须的两个选项
                test:/\.css$/,
                use:ExtractTextPlugin.extract({
                    use:'css-loader',
                    fallback:'style-loader'
                })
                // use:[
                //     'style-loader',
                //     'css-loader'
                // ]
            },
            {//对.vue文件的处理配置
                test:/\.vue$/,
                loader:'vue-loader',
                options:{
                    loaders:{
                        css:ExtractTextPlugin.extract({
                            use:'css-loader',
                            fallback:'vue-style-loader'
                        })
                    }
                }
            },
            {//由于用到es6语法,所以对js文件需要用到babel-loader
                test:/\.js$/,
                loader:'babel-loader',
                exclude:/node_modules/
            },
            {//对图片的加载配置，用url-loader转化打包
                test:/\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader:'url-loader?limit=1024'
            }
        ]
    },
    plugins:[

        //提取后的css文件
        new ExtractTextPlugin({
            filename:'[name].css',
            allChunks:true
        }),
        // make sure to include the plugin for the magic
        new VueLoaderPlugin()
    ]
    
};

module.exports = config;