svg自动合成字体中间件

本项目为[Astros](https://github.com/lemonabc/astros-example)中间件

`astros-svgfont`会把`img/svg`目录下的svg图标生成eot，svg，ttf，woff四种字体，并自动生成对应svg名的css代码，插入到对应页面样式之前。

### SVG文件存放位置
  
```
--assets
  --svg
      --icons（生成的字体名称就是目录名称，即icons）
        --car.svg
        --user.svg
      --button
        --loading.svg
```


根据以上目录结构，生成的字体分别icons和button

### 该中间件会根据svg名称自动生成对应的class，以icons为例：

#### @font-face（自动生成的）

```
@font-face {
    font-family: "icons";
    src: url("/fonts/font2.eot?v=true");
    src: url("/fonts/font2.eot?v=true") format("embedded-opentype"), url("/fonts/font2.woff?v=true") format("woff"), url("/fonts/font2.ttf?v=true") format("truetype"), url("/fonts/font2.svg?v=true") format("svg");
    font-weight: normal;
    font-style: normal;
}
```

##### CSS(自动生成)
```
.i-loading:before {
     content: "\e900";
    
 }
 .i-car:before {
    content: "\e605";
 }
```

### 使用方式

### CSS
```
/* ICON基础类 */
.m-icon{
    display: inline-block;
    width: 50px;
    height: 50px;
    font-size: 24px;
    color: #dedede;
    font-family: "icons";
}
```

> 注意，这里需要你自己实现icon基类，引用对应的字体

### HTML

```
<i class="m-icon i-loading"></i>
```


### 配置
如果需要指定字体生成目录，可以通过 fontPath参数配置

```
{
    name:'astros-svgfont',
    config:{
        fontPath:'/fonts/',  //字体文件存放路径，相对于 root/asset 路径
        base64:true          //移动端兼容性最好，pc不建议使用
    }
}