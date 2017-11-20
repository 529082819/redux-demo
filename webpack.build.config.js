/*
 * @Author: ChenWei
 * @Date:   2017-02-01 11:25:52
 */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require("clean-webpack-plugin"); //清除文件
const Md5HashPlugin = require('webpack-md5-hash');//MD5  没改变的文件不会生成新的hash
const CompressionWebpackPlugin = require('compression-webpack-plugin'); //开启 gzip 压缩
const InlineManifestWebpackPlugin = require("inline-manifest-webpack-plugin");

//定义地址
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'src'); //__dirname 中的src目录，以此类推
const ASSET_PATH = path.resolve(ROOT_PATH, 'asset'); //__dirname 中的src目录，以此类推

module.exports = {
    devtool: 'source-map',//用于线上调试
    entry: {
        main: ['babel-polyfill','./src/entry.js'], // 入口文件
        common: ['react','react-dom','react-router','redux','react-redux','redux-thunk','mockjs'] // 这里是依赖的库文件配置，和CommonsChunkPlugin配合使用可以单独打包
    },
    output: {
        path: path.join(__dirname,'/public/dist'), //打包后的文件存放的地方
        filename: '[name].[chunkhash:8].js',
        sourceMapFilename: '[file].map',
        publicPath: './dist/' //启动本地服务后的根目录
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.css', '.sass', '.scss', '.less'],
        alias: {
          Components: path.resolve(__dirname, 'src/components/'),
          Actions: path.resolve(__dirname, 'src/actions/'),
          Reducers: path.resolve(__dirname, 'src/reducers/')
        }
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            include:[APP_PATH, ASSET_PATH]
        }, {
            test: /\.css$/,
            //use: [ 'style-loader', 'css-loader' ]
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader"]
            })
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({    // css 单独打包，（2.x 改变很大）
                fallback: 'style-loader',
                use: ['css-loader','sass-loader']
            })
        }, {
            test: /\.(png|jpg|gif)$/,
            //loader: 'url-loader?limit=25000'
            use: { loader: 'url-loader', options: { limit: 25000 } },
            exclude: /node_modules/
        }]
    },
    plugins: [
        //new webpack.BannerPlugin({banner: '这是注释'}),
        new webpack.BannerPlugin('这是注释'),
        new CleanPlugin(['public/dist/*.map','public/dist/*.gz']),//移除map gz文件
        new webpack.optimize.ModuleConcatenationPlugin(), //作用域提升 打包速度提升（目前不确定？）
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false  //去掉注释
            },
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
            },
            sourceMap: true
        }),
        //new Md5HashPlugin(),
        
        //压缩react，减少引入react的大小 去掉react中的警告
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        //new webpack.NoErrorsPlugin(),//报错但不退出webpack进程
        new webpack.NoEmitOnErrorsPlugin,
        //new webpack.optimize.DedupePlugin(), //删除类似的重复代码  wp2已移除
        new webpack.optimize.AggressiveMergingPlugin(),//合并块
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: '../index.html',
            minify:{    //压缩HTML文件
                removeComments:false,    //移除HTML中的注释
                collapseWhitespace:true    //删除空白符与换行符
            },
            //chunks: ['main', 'common', 'manifest']
        }),
        new webpack.HashedModuleIdsPlugin(),
        new ExtractTextPlugin({
            filename: "[name].[contenthash:8].css",
            disable: false,
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['common'],
            filename: '[name].[chunkhash:8].js',
            minChunks:Infinity 
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
        }),
        new InlineManifestWebpackPlugin({
            name: 'webpackManifest'
        }),
        // new CompressionWebpackPlugin({ //gzip 压缩  不过服务器可以配置gzip压缩
        //     asset: '[path].gz[query]',
        //     algorithm: 'gzip',
        //     test: new RegExp(
        //         '\\.(js|css)$'    //压缩 js 与 css
        //     ),
        //     threshold: 10240,
        //     minRatio: 0.8
        // })
    ]
};