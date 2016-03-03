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
    console.log(this);
	//console.log(this.config);
	if(!fs.existsSync(path.join(this.config.img,'svg'))){
		next(asset);
	}
    if(!this.config.fontName){
        console.error('未设置字体名称');
        return;
    }
    if(!this.config.fontUrl){
        console.error('未设置字体路径');
        return;
    }
    var ver = this.config.fontVersion || '';

    var svgDir = path.join(this.config.img,'svg');


    var tempSvg = new svg(svgDir,this.config.fontName);

    tempSvg.outPut(path.join(this.config.img,'fonts'));

    var cssHead = tempSvg.getClassHead(this.config.fontUrl,ver);
    
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