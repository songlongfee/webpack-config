var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        app: path.resolve(__dirname, 'src/main.js'),
        login: path.resolve(__dirname, 'src/login.js'), //多入口文件
        vendors: ['react'] //打包到通用js文件的模块列表
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },{
                test: /\.jsx$/,
                use: 'babel-loader'
            },{
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },{
                test: /\.less$/,
                use: ['style-loader','css-loader','less-loader']
            },{
                test: /\.(png|jpe?g|gif|svg)$/, //转base64，小于2kb
                use: 'url-loader?limit=2000'
            }
        ]
    },
    devtool: '#eval-source-map', //生成Source Maps，配置有4种，详见http://web.jobbole.com/87408/
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({name: 'vendors', filename: 'vendors.js'}), //打包公共模块
        new webpack.HotModuleReplacementPlugin()
    ]
}

if (process.env.NODE_ENV == 'production') {
  module.exports.devtool = '#source-map';
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: 'production'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
      }
    })
  ])
}