var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: path.resolve(__dirname, 'src/main.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
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