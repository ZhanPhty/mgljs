/*
* trumbowyg富文本插件压缩合并
* dos： cd  build    ==> 进入到编译目录
*       node r.js -o trumbowyg-build.js   ==> 根据trumbowyg-build编译
*/

/*
*  配置 shim --> deps 可合并依赖
*/

/**/
({
    baseUrl: './',
    paths: {
        'colors': '../build/trumbowyg/trumbowyg.colors',
        'emoji': '../build/trumbowyg/trumbowyg.emoji',
        'preformatted': '../build/trumbowyg/trumbowyg.preformatted',
        'table': '../build/trumbowyg/trumbowyg.table',
        'upload': '../build/trumbowyg/trumbowyg.upload',
        'zh': '../build/trumbowyg/trumbowyg.zh_cn',
        'trumbowyg': '../build/trumbowyg/trumbowyg'
    },
    shim: {
        'zh': {
            deps: ['preformatted', 'table', 'upload', 'colors']
        }
    },
    optimize: "uglify2",
    name: 'zh',
    out: "../lib/zh.min.js"
})

/*
({
    baseUrl: './',
    paths: {
        'colors': '../build/trumbowyg/trumbowyg.colors',
        'emoji': '../build/trumbowyg/trumbowyg.emoji',
        'insertaudio': '../build/trumbowyg/trumbowyg.insertaudio',
        'table': '../build/trumbowyg/trumbowyg.table',
        'upload': '../build/trumbowyg/trumbowyg.upload',
        'zh': '../build/trumbowyg/trumbowyg.zh_cn',
        'trumbowyg': '../build/trumbowyg/trumbowyg'
    },
    shim: {
    },
    optimize: "uglify2",
    name: 'trumbowyg',
    out: "../lib/trumbowyg.min.js"
})
*/