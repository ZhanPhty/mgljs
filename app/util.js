/**
 * ===========
 * 前端前端组件
 * ===========
 * 组件大部分依赖jquery
 * @ require(['util'], function(util){...}) @
 * 执行requirejs AMD
 * @author 詹小灰@461632311
 */

(function(window) {
    var util = {
        //datepicker日期选择
        datePicker: function(options) {
            var opts = $.extend({
                dateRange: false,
                selector: options.dateRange == true ? ['.daterange-start', '.daterange-end'] : '.date-time', //如果是日期区间默认值为数组
                showToday: true,
                format: 'yyyy-mm-dd',
                disableDblClickSelection: true,
                leftArrow: '<',
                rightArrow: '>',
                closeIcon: '×',
                closeButton: false,
                language: 'zh-CN'
            }, options);
            var nowTemp = new Date();
            var dateNow = new Date();
            var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

            if (opts.showToday) {
                opts.onRender = function(date) {
                    dateNow = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
                    //当前日期加标记
                    return dateNow.valueOf() == now.valueOf() ? 'current' : '';
                }
            }

            require(['datepicker'], function() {
                if (!opts.dateRange) {
                    if (typeof(opts.selector) === 'string') {
                        $(opts.selector).mgldatepicker(opts);
                    }
                    if ($.isArray(opts.selector)) {
                        $(opts.selector[0]).mgldatepicker(opts);
                    }
                }
                if (opts.dateRange && $.isArray(opts.selector)) {
                    datepickerRange(); //日期区间函数
                }
            })

            function datepickerRange() {
                var checkin = $(opts.selector[0]).mgldatepicker(opts).on('changeDate', function(ev) {
                    if (ev.date.valueOf() > checkout.date.valueOf()) {
                        var newDate = new Date(ev.date)
                        newDate.setDate(newDate.getDate() + 1);
                        checkout.update(newDate);
                    }
                    checkin.hide();
                    $(opts.selector[1])[0].focus();
                }).data('datepicker');

                var optRange = $.extend({}, opts);

                if (opts.showToday) {
                    optRange.onRender = function(date) {
                        return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
                    }
                }

                var checkout = $(opts.selector[1]).mgldatepicker(optRange).on('changeDate', function(ev) {
                    checkout.hide();
                }).data('datepicker');
            }
        },
        //swiper图片切换
        swiper: function(options) {
            require(['swiper'], function() {
                var opts = $.extend({
                    containerClass: '.banner-container',
                    direction: 'horizontal',
                    pagination: '.swiper-pagination',
                    paginationClickable: true
                }, options);

                var mySwiper = new Swiper(opts.containerClass, opts)
            })
        },
        //swiper的tab功能切换
        swiperTab: function(options) {
            require(['swiper'], function() {
                var opts = $.extend({
                    speed: 250,
                    tabNavClass: '.swiper-navgation',
                    containerClass: '.tab-container',
                    onSlideChangeStart: function() {
                        var actIndex = tabSwiper.activeIndex;
                        $(opts.tabNavClass).find('li').removeClass('active').eq(actIndex).addClass('active');
                    }
                }, options);

                var tabSwiper = new Swiper(opts.containerClass, opts);

                $(opts.tabNavClass).find('li').on('click', function(event) {
                    event.preventDefault();
                    //得到当前索引
                    var i = $(this).index();
                    $(opts.tabNavClass).find('li').removeClass('active').eq(i).addClass('active');
                    tabSwiper.slideTo(i, opts.speed, false);
                });
            });
        },
        //swiper图片切换
        imagesGrid: function(options) {
            var opts = $.extend({
                selector: '.images-grid',
                cells: 6,
                align: true,
                nextOnClick: true,
                bgClose: true
            }, options);

            require(['imagesGrid'], function(imagesGrid) {
                $(opts.selector).imagesGrid(opts);
            })
        },
        //文件上传
        uploadFile: function(options) {
            var opts = $.extend({
                selector: '#filerUpdate',
                type: 'file',
                showThumbs: true,
                addMore: true,
                allowDuplicates: false,
                uploadFile: {
                    url: ""
                }
            }, options);

            require(['uploadFile'], function(uploadFile) {
                switch(opts.type) {
                    case 'image':
                        uploadFile.image(opts);
                        break;
                    case 'file':
                        uploadFile.file(opts);
                        break;
                    default:
                        uploadFile.file(opts);
                }
            })
        },
        //dialog弹窗
        dialog: function(options) {
            var opts = $.extend({
                title: '提示',
                content: '世界，你好！',
                contentDom: '',
                modal: true,
                width: 440,
                skin: 'crm-form',
                okValue: '确定',
                ok: function() {},
                cancelValue: '取消',
                cancel: function() {}
            }, options);

            if (opts.contentDom != '') {
                $(opts.contentDom).hide();
                opts.content = $(opts.contentDom).html();
            }

            require(['dialog'], function() {
                var dialogMsg = dialog(opts);
                dialogMsg.show();
            });
        },
        //tip提示
        promptMsg: function(options) {
            var opts = $.extend({
                content: '消息提示',
                stayTime: 0,
                getid: '',
                id: '',
                icon: '',
                type: 'tip',
                appendTo: '',
            }, options);

            //判断type风格
            switch (opts.type) {
                case 'load':
                    if (opts.appendTo === '' || opts.appendTo === 'body') {
                        opts.content = '<span class="ui-dialog-loading"></span>';
                    } else {
                        opts.icon = 'ui-dialog-loading popmsg-tip-load';
                        opts.content = '';
                    }
                    break;
            }

            require(['dialog'], function() {
                if (opts.appendTo === '' || opts.appendTo === 'body') {
                    var diamsg = dialog(opts);
                    diamsg.show();
                    if (opts.getid != '') {
                        dialog.get(opts.getid).close().remove();
                    }
                    if (opts.stayTime > 0) {
                        setTimeout(function() {
                            diamsg.close().remove();
                        }, opts.stayTime);
                    }
                } else {
                    if (opts.getid != '') {
                        $('#' + opts.getid).remove();
                    }
                    //tip自定义父级。
                    $.mglmessage(opts)
                }
            });
        },
        //select选择框
        select2: function(options) {
            var opts = $.extend({
                selector: '.select-control'
            }, options);

            require(['select'], function() {
                $(opts.selector).select2(opts);
            })
        },
        //城市联动
        city: function(options) {
            var opts = $.extend({
                selector: '.distpicker',
                minimumResultsForSearch: 10
            }, options);

            require(['city'], function() {
                $(opts.selector).distpicker(opts);
                $(opts.selector + '> select').select2(opts);

                if ($('[data-toggle="distpicker"] > select').length > 0) {
                    $('[data-toggle="distpicker"] > select').select2(opts);
                }
            })
        },
        // 富文本
        editor: function(options) {
            var opts = $.extend({
                selector: '#editor',
                svgPath: '/mgljs/fonts/trumbowyg.svg',
                resetCss: true,
                lang: 'zh_cn',
                btnsDef: {
                    // Customizables dropdowns
                    image: {
                        dropdown: ['insertImage', 'upload'],
                        ico: 'insertImage'
                    }
                },
                btns: [
                    ['viewHTML'],
                    ['undo', 'redo'],
                    ['formatting'],
                    'btnGrp-design', ['superscript', 'subscript'],
                    ['link'],
                    ['image'],
                    'btnGrp-justify',
                    'btnGrp-lists', ['foreColor', 'backColor'],
                    ['table'],
                    ['preformatted'],
                    ['horizontalRule'],
                    ['removeformat'],
                    ['fullscreen']
                ],
                plugins: {
                    // 图片上传配置
                    upload: {
                        serverPath: 'https://api.imgur.com/3/image',
                        fileFieldName: 'image',
                        headers: {
                            'Authorization': 'Client-ID 9e57cb1c4791cea'
                        },
                        urlPropertyName: 'data.link'
                    }
                }
            }, options);

            require(['editor'], function() {
                $(opts.selector).trumbowyg(opts);
            })
        },
        //获取get参数值
        get: function(par) {
            //获取当前URL
            var local_url = document.location.href;
            //获取要取得的get参数位置
            var get = local_url.indexOf(par + "=");
            if (get == -1) {
                return false;
            }
            //截取字符串
            var get_par = local_url.slice(par.length + get + 1);
            //判断截取后的字符串是否还有其他get参数
            var nextPar = get_par.indexOf("&");
            if (nextPar != -1) {
                get_par = get_par.slice(0, nextPar);
            }
            return get_par;
        },
        //替换get参数
        getReplace: function(paramName, replaceWith) {
            var oUrl = location.href.toString();
            if (oUrl.indexOf(paramName) >= 0) {
                var re = eval('/(' + paramName + '=)([^&]*)/gi');
                return oUrl.replace(re, paramName + '=' + replaceWith);
            } else {
                return oUrl + '&' + paramName + '=' + replaceWith;
            }
        },
        //常用正则验证
        reg: function(type, val) {
            switch (type) {
                case 'email':
                    return /^([a-zA-Z0-9_\-\.])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/i.test(val);
                case 'http':
                    return /^(http[s]?:)?(\/{2})?([a-z0-9]+\.)?[a-z0-9]+(\.(com|cn|cc|org|net|com.cn))$/i.test(val);
                case 'tel':
                    return /(?:\(\d{3,4}\)|\d{3,4}-?)\d{8}/.test(val);
                case 'phone':
                    return /^\d{11}$/.test(val);
                case 'id':
                    return /^(\d{15}|\d{18})$/.test(val);
            }
        }
    };
    if (typeof define === "function" && define.amd) {
        define(function() {
            return util;
        });
    } else {
        window.util = util;
    }
})(window);
