/**
 * ==============
 * 前端模块配置文件
 * ==============
 * @author 詹小灰@461632311
 */

var mgljs = {
    'base': './mgljs',  //框架js根目录
    'lib': './lib/',  //框架三方库目录
    'css': '../mgljs/css/'   //框架依赖css目录
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
        //消息提示
        'dialog': mgljs.lib + 'dialog',
        //select多选
        'select': mgljs.lib + 'select2.min',
        //distpicker地区联动
        'cityJSON': mgljs.lib + 'cityJSON',
        'city': mgljs.lib + 'distpicker',
        //validate表单验证
        'validate': mgljs.lib + 'jquery.validate.min',
        //富文本
        'editor': mgljs.lib + 'trumbowyg.min',
        //cookie操作
        'cookie': mgljs.lib + 'js.cookie',
        //Dom加载
        'domReady': mgljs.lib + 'domReady'
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
        }
    }
});
