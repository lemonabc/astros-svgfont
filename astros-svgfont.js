'use strict';

var url = require('url');
var path = require('path');
var fs = require('fs');
var file = require('file-plus');
var nodeUtil = require('util');
var util = require('lang-utils');
var svg = require('svgfont');

module.exports = new astro.Middleware({
    modType: 'page',
    fileType: 'css'
}, function(asset, next) {

	//console.log(asset.prjCfg);
	if(!fs.existsSync(path.join(asset.prjCfg.img,'svg'))){
		return;
	}
    if(!asset.prjCfg.fontName){
        console.error('未设置字体名称');
        return;
    }
    if(!asset.prjCfg.fontUrl){
        console.error('未设置字体路径');
        return;
    }
    var svgJson = svg.svgToFont(path.join(asset.prjCfg.img,'svg'),path.join(asset.prjCfg.img,'fonts'),asset.prjCfg.fontName);

    var cssHead = svg.getClassHead(asset.prjCfg.fontUrl,'@{iconFont}','@{version}');
    //console.log(svgJson);
    for(var svgObj in svgJson){
    	var temp = "."+svgJson[svgObj].fileName+":before {\n";
    	temp = temp + 'content: "\\'+svgJson[svgObj].content+'";\n';
    	temp = temp + '}';
    	cssHead = cssHead + temp;
    }
    asset.data = asset.data || '';
    asset.data = cssHead + asset.data;
    next(asset);
});