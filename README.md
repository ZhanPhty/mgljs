# MglJS 说明

MglJS 是一款基于RequireJS模块化开发的前端组件；

MglJS 具有良好的兼容性，兼容IE8+、Chrome、Firefox、Safari、Opera等现代浏览器;

MglJS 整合jQuery、常规插件，只需按照规范引用组件，解决多人开发是使用插件不统一、臃肿等问题。

MglJS 组件是基于开源的第三方的组件，仅仅的进行模块化以及简单的修改。

# 解决问题

模块化不仅仅是提高效率问题，后期的维护也很方便。

一个项目的开发，毕定会使用到第三方插件或自己编写的插件。当多人同时参与一个项目是，每个人接到的任务都是不一样的，个人习惯的不同，就会造成同一个功能却使用了不一样的组件，冗余代码会很多。别人接手项目的时候也需要一定的成本去了解其中的代码。

模块化就很多的解决了这个问题，所有的前端人员去实现相同的功能时，他们只需要知道怎么添加功能所需的参数就行，无需去了解组件背后的代码。即使后续觉得组件无法再满足项目需求了，也只是修改组件，不影响前端人员的使用。

# 文档

查看文档 [http://doc.uizph.com](http://doc.uizph.com)

# 安装说明

* 下载`npm install mgljs`

* 将mgljs文件夹放入项目

* 在<head>标签中引入js

## 引入
> 注意引入路径
~~~
<html>
    <head>
        //style.css为可选。部分组件需要css，通过requirejs引用css会出现闪一下的情况。提前加载部分静态样式可解决。
        //此样式文件也只是部分样式，文件很小
        <link href="mgljs/css/mgl-style.css">   
        <script src="mgljs/app/util.js"></script>
        <script src="mgljs/require.js"></script>
        <script src="mgljs/config.js"></script>
    </head>
    <body>
    </body>
</html>
~~~


