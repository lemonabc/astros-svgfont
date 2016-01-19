##说明
astros中间件  
自动通过img/svg目录下的svg图标生成eot,svg,ttf,woff四种字体,并自动生成对应svg名的css代码，插入到通用less之后和对应页面less之前。  

* 自动生成的@font-face为：

```
@font-face {
	font-family: '@fontName';
	src:url('@fontUrl/@fontName.eot?v=@{version}');
	src:url('@fontUrl/@fontName.eot?v=@{version}') format('embedded-opentype'),
		url('@fontUrl/@fontName.woff?v=@{version}') format('woff'),
		url('@fontUrl/@fontName.ttf?v=@{version}') format('truetype'),
		url('@fontUrl/@fontName.svg?v=@{version}') format('svg');
	font-weight: normal;
	font-style: normal;
 }
```
 
* class名会根据svg名称自动生成，例如：  
img/svg下面的存在i-house,i-next等svg图标  
生成的css代码为:

```
    .i-loading:before {
	     content: "\e900";
	    
	 }
	 .i-quirt-right:before {
	    content: "\e605";
	 }
```

###配置
static.js需要配置两个参数

    fontUrl:'/img/fonts/',
    fontName:'cashierIconFont',

* fontUrl为生成的css内，@font-face引用的font的路径  
* fontName为生成的字体名称和font-family名。