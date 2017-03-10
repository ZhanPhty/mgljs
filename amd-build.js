/*
* trumbowyg富文本插件压缩合并
* dos： cd  build    ==> 进入到编译目录
*       node r.js -o trumbowyg-build.js   ==> 根据trumbowyg-build编译
*/

/*
*  配置 shim --> deps 可合并依赖
*/

({
    baseUrl: './',
    paths: {
        'jquery': ['./lib/jquery.min', 'http//libs.baidu.com/jquery/2.1.4/jquery.min.js'],
        'css': './lib/css.min',
        'util': './app/util',
        'uploadFile': './app/uploadFile',
        'datepicker': './lib/datepicker.min',
        'swiper': './lib/swiper.jquery.min',
        'imagesGrid': './lib/images.grid',
        'jqFiler': './lib/jquery.filer',
        'dialog': './lib/dialog',
        'select': './lib/select2.min',
        'cityJSON': './lib/cityJSON',
        'city': './lib/distpicker',
        'validate': './lib/jquery.validate.min',
        'editor': './lib/trumbowyg.min',
        'cookie': './lib/js.cookie',
        'domReady': './lib/domReady'
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
            deps: ['jquery']
        },
        'imagesGrid': {
            exports: 'imagesGrid',
            deps: ['jquery']
        },
        'jqFiler': {
            exports: 'jqFiler',
            deps: ['jquery']
        },
        'dialog': {
            exports: 'dialog',
            deps: ['jquery']
        },
        'select': {
            deps: ['jquery']
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
            deps: ['jquery']
        },
    },
    optimize: "uglify2",
    name: 'zh',
    out: "../lib/zh.min.js"
})