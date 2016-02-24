/**
 * Created by xiaoxiaosu on 2015/12/21.
 */
var path=require("path");
module.exports={
    entry:"app/index.js",
    resolve: {
        root: path.resolve('./'),
    },
    output:{
        path:"output/",
        filename:"bundle.js"
    },
    module:{
        loaders:[
            {test:/\.(js)$/,loader:"jsx-loader?harmony"},
            {test:/\.(css)$/,loader:"style!css!"},
            {test: /\.less/,loader: 'style!css!less'},
            {test: /\.scss$/,loader: 'style!css!sass'},
            {test:/\.(png|jpg|gif)$/,loader:"url-loader?size=8192",},
        ]
    }
}