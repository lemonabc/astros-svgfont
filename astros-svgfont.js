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
		next(asset);
	}
    if(!asset.prjCfg.fontName){
        console.error('未设置字体名称');
        return;
    }
    if(!asset.prjCfg.fontUrl){
        console.error('未设置字体路径');
        return;
    }
    var svgDir = path.join(asset.prjCfg.img,'svg');


    var tempSvg = new svg(svgDir,asset.prjCfg.fontName);

    tempSvg.outPut(path.join(asset.prjCfg.img,'fonts'));

    var cssHead = tempSvg.getClassHead(asset.prjCfg.fontUrl,'1');
    
    var svgJson = tempSvg.getInfos();
    for(var svgObj in svgJson){
    	var temp = "."+svgJson[svgObj].fileName+":before {\n";
    	temp = temp + 'content: "\\'+svgJson[svgObj].content+'";\n';
    	temp = temp + '}\n';
    	cssHead = cssHead + temp;
    }

    asset.data = asset.data || '';
    asset.data = cssHead + asset.data;
    next(asset);
});