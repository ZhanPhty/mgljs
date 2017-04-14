/**
 * ==============
 * 前端模块配置文件
 * ==============
 * @author 詹小灰@461632311
 */

// var localObj = window.location;
// var contextPath = localObj.pathname.split("/")[1];
// var basePath = localObj.protocol+"//"+localObj.host+"/"+contextPath;

// var mgljs = {
//     base : basePath+"/mgljs",
//     lib : "./lib/",
//     css : "../mgljs/css/"
// };

var mgljs = {
    base : "./mgljs",
    lib : "./lib/",
    css : "../mgljs/css/"
};

require.config({
    baseUrl: mgljs.base,
    paths: {
        'jquery': [mgljs.lib + 'jquery.min', 'http//libs.baidu.com/jquery/2.1.4/jquery.min.js'],
        'css': mgljs.lib + 'css.min',
        'util': './app/util',
        //上传
        'uploadFile': './app/uploadFile',
        //日期选择器
        'datepicker': mgljs.lib + 'datepicker.min',
        //slide切换
        'swiper': mgljs.lib + 'swiper.jquery.min',
        //图片预览
        'imagesGrid': mgljs.lib + 'images.grid',
        //上传文件
        'jqFiler': mgljs.lib + 'jquery.filer',
        //兼容ie8的文件上传
        'uploadify': mgljs.lib + 'jquery.uploadify.min',
        //消息提示
        'dialog': mgljs.lib + 'dialog',
        //select多选
        'select': mgljs.lib + 'select2.min',
        //distpicker地区联动
        'cityJSON': mgljs.lib + 'cityJSON',
        'city': mgljs.lib + 'distpicker',
        //validate表单验证
        'validate': mgljs.lib + 'jquery.validate',
        //富文本
        'editor': mgljs.lib + 'trumbowyg.min',
        //cookie操作
        'cookie': mgljs.lib + 'js.cookie',
        //Dom加载
        'domReady': mgljs.lib + 'domReady',
        //输入格式化
        'inputformat':  mgljs.lib + 'cleave',
        //拖动滑块
        'drag':  mgljs.lib + 'jquery.slideunlock',
        //兼容ie8的placeholder属性
        'placeholder':  mgljs.lib + 'jquery.placeholder',
        //中文转换成英文首字母
        'charfirst':  mgljs.lib + 'jquery.charfirst',
        //按字母排序筛选
        'listnav':  mgljs.lib + 'jquery.listnav',
        //列表筛选条件选择
        'mallList':  mgljs.lib + 'mgl.mall',
        //根据div打印页面
        'jqprint':  mgljs.lib + 'jquery.jqprint'
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'util': {
            exports: 'util',
            deps: ['jquery']
        },
        'datepicker': {
            exports: '',
            deps: ['jquery']
        },
        'swiper': {
            exports: '$',
            deps: ['jquery', 'css!'+ mgljs.css +'swiper.css']
        },
        'imagesGrid': {
            exports: 'imagesGrid',
            deps: ['jquery', 'css!'+ mgljs.css +'images-grid.css']
        },
        'jqFiler': {
            exports: 'jqFiler',
            deps: ['jquery', 'css!'+ mgljs.css +'jquery.filer.css']
        },
        'uploadify': {
            deps: ['jquery', 'css!'+ mgljs.css +'uploadify.css']
        },
        'dialog': {
            exports: 'dialog',
            deps: ['jquery', 'css!'+ mgljs.css +'ui-dialog.css']
        },
        'select': {
            deps: ['jquery', 'css!'+ mgljs.css +'select2.css']
        },
        'city': {
            exports: 'distpicker',
            deps: ['select', 'cityJSON']
        },
        'validate': {
            exports: '$',
            deps: ['jquery']
        },
        'editor': {
            exports: 'trumbowyg',
            deps: ['jquery', 'css!'+ mgljs.css +'trumbowyg.css']
        },
        'cookie': {
            exports: 'cookie'
        },
        'drag': {
            deps: ['jquery']
        },
        'placeholder': {
            deps: ['jquery']
        },
        'listnav': {
            deps: ['jquery', 'charfirst']
        },
        'mallList': {
            deps: ['jquery', 'css!'+ mgljs.css +'mgl.mall.css']
        },
        'jqprint': {
            exports: '',
            deps: ['jquery']
        }
    }
});
