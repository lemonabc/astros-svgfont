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
    var assets = asset.prjCfg.assets;
    var svgDir = path.join(assets,'svg');

    if(!fs.existsSync(svgDir)){
        console.error('不存在svg目录');
        next(asset);
    }
    var self = this;
    if(!self.config.fontPath){
        self.config.fontPath = self.config.fontUrl || '/fonts/';
    }

    //获取svg目录下所有文件夹，文件夹名称为字体名称
    var dirs = file.getAllDirsSync(svgDir);
    if (dirs.length) {
        dirs.forEach(function(dir, index) {
            var svgDir = path.join(dir);
            var fontName = path.basename(dir);
            var tempSvg = new svg({
                svgDir:svgDir,
                nameToMD5:true,
                fontFaceName:fontName
            });
            tempSvg.outPut(path.join(assets,'fonts'));

            var cssHead = tempSvg.getClassHead(self.config.fontPath,!!self.config.base64);
            var svgJson = tempSvg.getInfos();
            for(var svgObj in svgJson){
                var temp = "."+svgJson[svgObj].fileName+"{\n";
                temp = temp + 'font-family: "'+fontName+'";\n';
                temp = temp + '}\n';

                var temp = temp+"."+svgJson[svgObj].fileName+":before {\n";
                temp = temp + 'content: "\\'+svgJson[svgObj].content+'";\n';
                temp = temp + '}\n';
                cssHead = cssHead + temp;
            }
            asset.data = asset.data || '';
            asset.data = cssHead + asset.data;
        });
    }
    
    next(asset);
});