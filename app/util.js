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
        
        /**
         * [datepicker日期选择]
         * @param  {[dateRange]} [是否为日期区间]
         * @param  {[selector]}  [绑定Input选择器]
         * @param  {[showToday]} [是否显示今天的角标样式]
         * @return {[opts]}
         */
        
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
                language: 'zh-CN',
                render: false
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

            if (opts.onRender) {
                opts.onRender = function(date) {
                    dateNow = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
                    //当前日期加标记
                    return dateNow.valueOf() < now.valueOf() ? 'disabled' : '';
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

        /**
         * [swiper图片切换]
         * @param  {[containerClass]}      [最外层容器]
         * @param  {[direction]}           [显示方向]
         * @param  {[pagination]}          [分页器]
         * @param  {[paginationClickable]} [分页器是否可点击]
         * @return {[opts]}
         */
        
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

        /**
         * [swiper的tab功能切换]
         * @param  {[speed]}            [切换速度]
         * @param  {[tabNavClass]}      [tab菜单选择器]
         * @param  {[pagination]}       [内容选择器]
         * @return {[opts]}
         */
        
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
                    tabSwiper.swipeTo(i, opts.speed, false);
                });
            });
        },

        /**
         * [图片列表预览]
         * @param  {[selector]}     [绑定选择器]
         * @param  {[cells]}        [只展图片示个数]
         * @param  {[align]}        [显示预览]
         * @param  {[nextOnClick]}  [点击下一张]
         * @param  {[bgClose]}      [点击背景关闭]
         * @return {[opts]}
         */
        
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

        /**
         * [文件上传]
         * @param  {[selector]}     [绑定选择器]
         * @param  {[type]}         [上传类型]
         * @param  {[showThumbs]}   [显示缩略图]
         * @param  {[addMore]}      [选择多张]
         * @return {[opts]}
         */
        
        uploadFile: function(options) {
            var opts = $.extend({
                selector: '#filerUpdate',
                type: 'file',
                showThumbs: true,
                addMore: true,
                allowDuplicates: false
            }, options);

            require(['uploadFile'], function(uploadFile) {
                switch (opts.type) {
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

        /**
         * [dialog弹窗]
         * @param  {[selector]}     [绑定选择器]
         * @param  {[contentDom]}   [获取html内容]
         * @param  {[modal]}        [是否模态显示]
         * @return {[opts]}
         */
        
        dialog: function(options) {
            var opts = $.extend({
                selector: '',
                contentDom: '',
                modal: true,
                width: 440,
                skin: 'mgl-mall'
            }, options);

            if (opts.contentDom != '') {
                $(opts.contentDom).hide();
                opts.content = $(opts.contentDom).html();
            }

            require(['dialog'], function() {
                var dialogMsg;
                if (opts.selector != '') {
                    $(opts.selector).click(function(){
                        dialogMsg = dialog(opts);
                        dialogMsg.show();
                    });
                } else {
                    dialogMsg = dialog(opts);
                    dialogMsg.show();
                }
            });
        },

        /**
         * [tip提示]
         * @param  {[content]}     [内容]
         * @param  {[stayTime]}    [自动关闭时间]
         * @param  {[appendTo]}    [设置父级DOM]
         * @return {[opts]}
         */
        
        promptMsg: function(options) {
            var opts = $.extend({
                content: '消息提示',
                stayTime: 0,
                getid: '',
                id: '',
                icon: '',
                type: 'tip',
                appendTo: '',
                skin: 'dark-pormp'
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

        /**
         * [select选择框]
         * @param  {[selector]}    [绑定选择器]
         * @return {[opts]}
         */
        
        select2: function(options) {
            var opts = $.extend({
                selector: '.select-control',
                minimumResultsForSearch: 12
            }, options);

            require(['select'], function() {
                $(opts.selector).select2(opts);
            })
        },

        /**
         * [表单验证]
         * @param  {[selector]}    [绑定选择器]
         * @param  {[changeReset]} [需要手动刷新的选择器]
         * @return {[opts]}
         */
        
        formValid: function(options) {
            var opts = $.extend({
                selector: '.select-form',
                changeReset: '.select-control',
                errorPlacement: function(error, element) {
                    if (element.is(':checkbox') || element.is(':radio')) {
                        error.appendTo(element.parent().parent().parent());
                    } else {
                        error.appendTo(element.parent());
                    }
                },
                submitHandler: function(form) {
                    form.submit();
                }
            }, options);

            require(['validate'], function() {
                $(opts.selector).find(opts.changeReset).change(function() {
                    $(this).valid();
                });

                $(opts.selector).validate(opts);
            });
        },

        /**
         * [城市联动]
         * @param  {[selector]}    [绑定选择器]
         * @param  {[select2]}     [使用select2风格]
         * @return {[opts]}
         */
        
        city: function(options) {
            var opts = $.extend({
                selector: '.distpicker',
                minimumResultsForSearch: 10,
                select2: false
            }, options);

            require(['city'], function() {
                $(opts.selector).distpicker(opts);
                if (opts.select2) {
                    $(opts.selector + '> select').select2(opts);
                    if ($('[data-toggle="distpicker"] > select').length > 0) {
                        $('[data-toggle="distpicker"] > select').select2(opts);
                    }
                }
            })
        },
 
        /**
         * [富文本]
         * @param  {[selector]}    [绑定选择器]
         * @param  {[svgPath]}     [图标路径]
         * @return {[opts]}
         */
        
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

        /**
         * [获取url]
         * @method  {[get(key)]}    [获取url上的参数]
         * @return {[value]}
         */
        
        get: function(par) {
            //获取当前URL
            var local_url = document.location.href;
            //获取要取得的get参数位置
            var get = local_url.indexOf(par + '=');
            if (get == -1) {
                return false;
            }
            //截取字符串
            var get_par = local_url.slice(par.length + get + 1);
            //判断截取后的字符串是否还有其他get参数
            var nextPar = get_par.indexOf('&');
            if (nextPar != -1) {
                get_par = get_par.slice(0, nextPar);
            }
            return get_par;
        },

        /**
         * [替换get参数]
         * @method  {[getReplace(key, name)]}    [替换指定参数的值]
         * @return {[string]}
         */

        getReplace: function(paramName, replaceWith) {
            var oUrl = location.href.toString();
            if (oUrl.indexOf(paramName) >= 0) {
                var re = eval('/(' + paramName + '=)([^&]*)/gi');
                return oUrl.replace(re, paramName + '=' + replaceWith);
            } else {
                return oUrl + '&' + paramName + '=' + replaceWith;
            }
        },

        /**
         * [常用正则验证]
         * @method  {[reg(string)]}    [验证]
         * @return {[string]}
         */
        
        reg: function(type, val) {
            switch (type) {
                case 'email':
                    return /^([a-zA-Z0-9_\-\.])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/i.test(val);
                case 'http':
                    return /^(http[s]?:)?(\/{2})?([a-z0-9]+\.)?[a-z0-9]+(\.(com|cn|cc|org|net|com.cn))$/i.test(val);
                case 'tel':
                    return /(?:\(\d{3,4}\)|\d{3,4}-?)\d{8}/.test(val);
                case 'phone':
                    return /^1[3|4|5|7|8][0-9]\d{8}$/.test(val);
                case 'id':
                    return /^(\d{15}|\d{18})$/.test(val);
            }
        },
        
        /**
         * [input格式化]
         * @param  {[selector]}    [绑定选择器]
         * @param  {[type]}        [格式化默认风格]
         * @return {[opts]}
         */
        
        inputFormat: function(options) {
            var typeOpts;
            var opts = $.extend({
                selector: '.input',
                type: ''
            }, options);

            require(['inputformat'], function() {
                switch (opts.type) {
                    case 'tel':
                        typeOpts = {
                            blocks: [3, 4, 4],
                            numericOnly: true,
                            delimiter: ' '
                        };
                        break;
                    case 'bank':
                        typeOpts = {
                            creditCard: true,
                            delimiter: ' '
                        };
                        break;
                    case 'idNo':
                        typeOpts = {
                            blocks: [3, 3, 8, 4],
                            delimiter: ' '
                        };
                        break;
                    case 'date':
                        typeOpts = {
                            date: true,
                            datePattern: ['Y', 'm', 'd'],
                            delimiter: '-'
                        };
                        break;
                    default:
                        var typeOpts = opts;
                }

                var cleave = new Cleave(opts.selector, typeOpts);
            })
        },

        /**
         * [拖动滑块验证]
         * @param  {[selector]}           [绑定选择器]
         * @param  {[labelTip]}           [提示语]
         * @param  {[successLabelTip]}    [成功提示语]
         * @param  {[duration]}           [区间宽度]
         * @return {[opts]}
         */
        
        dragValid: function(options) {
            var opts = $.extend({
                selector: '.slideunlock-slider',
                labelTip: '按住滑块，拖动到最右边',
                successLabelTip: '验证通过',
                duration: 200,
                success: function(){
                    var $this = $(this);
                    var slider = $this[0].elm.find('.slideunlock-label');
                    slider.off('mousedown');
                    $this[0].elm.nextAll('.error').hide();
                },
                always: function(){}
            }, options);

            require(['drag'], function() {
                var slider = new SliderUnlock(opts.selector, opts, opts.success, opts.always);
                slider.init();
            });
        },

        /**
         * [placeholder提示语]
         * @param  {[selector]}           [绑定选择器]
         * @param  {[submitSelector]}     [提交按钮(解决input:password无效的bug)]
         * @return {[opts]}
         */
        
        placeholder: function(options) {
            var opts = $.extend({
                selector: 'input, textarea',
                submitSelector: 'input:submit, button:submit, .btn-control'
            }, options);
            //判断是不是ie
            if (navigator.appName == "Microsoft Internet Explorer") {
                require(['placeholder'], function() {
                    $(opts.selector).placeholder();

                    //使用jquery.validate验证是input：password不起作用，点击提交按钮添加的主动name
                    $(opts.submitSelector).click(function() {
                        var inputEl = $('body').find('input:password');
                        $(inputEl).each(function(index, value) {
                            var inputName = $(value).attr('name');
                            if (inputName != null) {
                                $(value).prev('input.placeholder').attr('name', inputName);
                            }
                        });
                    });
                })
            }
        },

        /**
         * [字母排序]
         * @param  {[selector]}    [绑定选择器]
         * @return {[opts]}
         */
        
        listSort: function(options){
            var opts = $.extend({
                selector: '.list-sort',
                includeAll: true,
                allText: '全部',
                includeOther: false,
                removeDisabled: false,
                noMatchText: '没有数据',
                showCounts: false
            }, options);

            require(['listnav'], function() {
                $(opts.selector).listnav(opts);
            });
        },

        /**
         * [局部打印]
         * @param  {[selector]}      [绑定选择器]
         * @param  {[printDom]}      [局部打印的DOM]
         * @param  {[importCSS]}     [引用打印前页面的样式]
         * @return {[opts]}
         */
        
        print: function(options){
            var opts = $.extend({
                selector: '',
                printDom: '.print-select',
                debug: false,
                importCSS: true, 
                printContainer: true,
                operaSupport: true
            }, options);

            require(['jqprint'], function() {
                if (opts.selector != '') {
                    $(opts.selector).click(function(){
                        $(opts.printDom).jqprint(opts);
                    });
                } else {
                    $(opts.printDom).jqprint(opts);
                }
            });
        },

        /**
         * [商城列表选项]
         * @param  {[selector]}      [绑定选择器]
         * @return {[opts]}
         */
        
        searchList: function(options){
            var opts = $.extend({
                selector: '.selectNumberScreen'
            }, options);

            require(['mallList'], function(){
                $(opts.selector).selectedList(opts);
            });
        },

        /**
         * [鼠标hover显示内容]
         * @param  {[selector]}      [绑定选择器]
         * @return {[opts]}
         */
        
        hoverExplain: function(options){
            var opts = $.extend({
                selector: '.order-pirce'
            }, options);

            require(['mallList'], function(){
                $(opts.selector).hoverPop(opts);
            });
        },

        /**
         * [全选、取消全选]
         * @param  {[itemBoxClass]}      [需要全选的容器]
         * @param  {[checkAllClass]}     [全选按钮选择器]
         * @return {[opts]}
         */
        
        checkAll: function(options){
            var opts = $.extend({
                itemBoxClass: '.check-items',
                checkAllClass: '.check-all'
            }, options);

            require(['mallList'], function(){
                $(opts.itemBoxClass).checkAll(opts);
            });
        }
    };
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return util;
        });
    } else {
        window.util = util;
    }
})(window);
