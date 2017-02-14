/**
 * ==============
 * 前端模块配置文件
 * ==============
 * @author 詹小灰@461632311
 */

var mgljs = {
    //框架js根目录
    'base': '/mgljs'
};

require.config({
    baseUrl: mgljs.base + '/app',
    paths: {
        'jquery': ['../lib/jquery.min', 'http//libs.baidu.com/jquery/2.1.4/jquery.min.js'],
        'css': '../lib/css.min',
        'util': 'util',
        //日期选择器
        'datepicker': '../lib/datepicker.min',
        //slide切换
        'swiper': '../lib/swiper.jquery.min',
        //消息提示
        'dialog': '../lib/dialog'
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'util': {
            deps: ['jquery']
        },
        'datepicker': {
            exports: '',
            deps: ['jquery']
        },
        'swiper': {
            exports: '$',
            deps: ['jquery', 'css!../css/swiper.min.css']
        },
        'dialog': {
            exports: 'dialog',
            deps: ['jquery', 'css!../css/ui-dialog.css']
        }
    }
});
