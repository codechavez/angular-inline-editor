var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry:path.resolve(__dirname,'demo/main.ts'),
    output:{
        path: path.resolve(__dirname,'dist'),
        filename:'app.[hash].bundle.js'
    },
    module:{
        rules:[
            { test: /\.component.ts$/, loaders: 'angular2-template-loader'},
            { test: /\.ts$/,loaders:'awesome-typescript-loader'},
            { test: /\.html$/, loaders:'html-loader'},
            { test: /\.css$/, use: ExtractTextPlugin.extract({fallback:"style-loader",use: "css-loader"}) },
            { test: /\.(jpg|png|gif|svg)$/, loader: 'file-loader' }
        ]
    },
    resolve:{
        extensions: ['*', '.js', '.ts', '.html', '.css', '.less','.scss','.ttf','.eot','.svg','.woff','.woff2', '.jpg', '.png', '.gif']
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./demo/index.html'
        }),
        new ExtractTextPlugin("app.[hash].css"),
    ]
};