(function($) {
    var popOpts = {
        premiumPrice: 100, //升贴水
        basePrice: 11800, //参考基价
        helpUrl: '#', //帮助中心的url
        helpIcon: 'icon-warning', //帮助中心的url
        target: true,
        align: false, //气泡风格
        content: '',
        width: '',
        callfn: function() {} //加载完成后的回调事件
    };

    //选择筛选列表
    var selectedOpts = {
        selectList: 'selectList', //选择部分的选择器
        listClass: 'listIndex', //每个列表的选择器
        hasBeenSelected: 'hasBeenSelected', //显示部分的选择器
        clearList: 'clearList', //选择后展示的选择器
        elCriter: 'eliminateCriteria', //清空筛选条件选择器
        selectedShow: 'selectedShow', //删除按钮
        clearDd: 'clearDd', //已选择的悬着期
        clearBtn: 'clearBtn', //删除按钮的class
        inputForm: '<input type="hidden" name="">', //用于传数据的隐藏input
        customBtn: 'customBtn',
        moreBtn: 'more', //显示更多选择器
        customRange: 'customRange', //自定义的范围
        listOther: 'listOther', //其他列表部分
        listHidden: 'listHidden', //隐藏的筛选列表部分
        showNum: 3,
        callfn: function() {} //加在完成后的回调事件
    };

    //check全选
    var checkAllOpts = {
        itemBoxClass: '.check-items', //check组的class
        checkAllClass: '.check-all', //全选按钮的class
        callfn: function() {} //加载完成后的回调事件
    }


    $.fn.extend({
        hoverPop: function(options) {
            var opts = $.extend({}, popOpts, options);
            return this.each(function() {
                var $this = $(this);
                var orderSum = opts.premiumPrice + opts.basePrice;
                var _blank = '_blank';
                var _self = '_self';
                var isAlign = opts.align;

                var html = '<div class="explain-box"><ul class="explain-box-num"><li>' + opts.premiumPrice + '</li><li>' + opts.basePrice + '</li><li>' + orderSum + '</li></ul><ul class="explain-box-txt"><li>升贴水</li><li>+</li><li>参考基价</li><li>=</li><li>订货价</li><li><a href="' + opts.helpUrl + '" target="' + (opts.target == true ? _blank : _self) + '"><i class="' + opts.helpIcon + '"></i></a></li></ul></div>';
                //将视图添加到页面
                if (isAlign) {
                    html = '<div class="explain-box explain-align" style="width:'+ opts.width +'px">' + opts.content +'</div>';
                }

                $this.append(html);

                $this.hover(function() {
                    $this.find('.explain-box').show();
                }, function() {
                    $this.find('.explain-box').hide();
                });

                opts.callfn($this);
            });
        },
        selectedList: function(options) {
            var opts = $.extend({}, selectedOpts, options);

            return this.each(function() {
                var $this = $(this);
                var listIndex = $this.find('.' + opts.listClass);
                var listOther = $this.find('.' + opts.listOther);
                var listHidden = $this.find('.' + opts.listHidden);
                var beenSelected = $this.find('.' + opts.hasBeenSelected);
                var $listA = listIndex.find('a');
                var $elCriter = $this.find('.' + opts.elCriter);
                var $clearDd = beenSelected.find('.' + opts.clearDd);
                var customBtn = listIndex.find('.' + opts.customBtn);

                listIndex.each(function(index, el) {
                    beenSelected.find('.' + opts.clearList).append(
                        '<div class="selectedInfor ' + opts.selectedShow + '" style="display:none">\
                        <span></span><label></label>' + opts.inputForm + '\
                        <strong class="' + opts.clearBtn + '"></strong></div>');
                });

                var selectedShow = $('.' + opts.selectedShow);

                $listA.on('click', function() {
                    var text = $(this).text();
                    var textTypeIndex = $(this).parents('dl').index();
                    var textType = $(this).parent('dd').siblings('dt').text();
                    index = textTypeIndex - (2);

                    $clearDd.show();
                    selectedShow.eq(index).show();
                    $(this).addClass('selected').siblings().removeClass('selected');
                    selectedShow.eq(index).find('span').text(textType);
                    selectedShow.eq(index).find('label').text(text);
                    var show = selectedShow.length - $('.' + opts.selectedShow + ':hidden').length;
                    if (show >= opts.showNum) {
                        $elCriter.show();
                    }
                });

                //删除按钮
                selectedShow.find('.' + opts.clearBtn).on('click', function() {
                    $(this).parents('.' + opts.selectedShow).hide();
                    var textTypeIndex = $(this).parents('.' + opts.selectedShow).index();
                    index = textTypeIndex;

                    listIndex.eq(index - (listIndex.length - 2)).find('a').removeClass('selected');
                    listIndex.eq(index - (listIndex.length - 2)).find('span').removeClass('selected');

                    if (listIndex.find('.selected').length < opts.showNum) {
                        $elCriter.hide();
                    }
                });

                listIndex.find('.' + opts.moreBtn).on('click', function() {
                    $(this).parent('.' + opts.listClass).toggleClass('open');
                });

                customBtn.on('click', function() {
                    var customIndex = $(this).parents('dl').index();
                    var customPar = $(this).parents('.' + opts.customRange);
                    var inputNum = $(this).prevAll('input');
                    var inputText = $(inputNum[1]).val() + ' - ' + $(inputNum[0]).val();
                    var textType = $(this).parents('dd').siblings('dt').text();
                    var index = customIndex - (2);

                    if ($(inputNum[0]).val() != '' && $(inputNum[1]).val() != '') {
                        customPar.addClass('selected').siblings().removeClass('selected');
                        $clearDd.show();
                        selectedShow.eq(index).show();
                        $(this).addClass('selected').siblings().removeClass('selected');
                        selectedShow.eq(index).find('span').text(textType);
                        selectedShow.eq(index).find('label').text(inputText);
                        var show = selectedShow.length - $('.' + opts.selectedShow + ':hidden').length;
                        if (show >= opts.showNum) {
                            $elCriter.show();
                        }
                    }
                });

                var isHover = false;

                listOther.find('li').hover(function() {
                    isHover = true;
                    var i = $(this).index();
                    $(this).addClass('hover').siblings().removeClass('hover');
                    listHidden.eq(i).show().siblings('.' + opts.listHidden).hide();
                }, function() {
                    isHover = false;
                    setTimeout(function() {
                        if (!isHover) {
                            listOther.find('li').removeClass('hover');
                            listHidden.hide();
                        };
                    }, 10);
                });

                listHidden.hover(function() {
                    isHover = true;
                }, function() {
                    isHover = false;
                    listOther.find('li').removeClass('hover');
                    listHidden.hide();
                });

                $elCriter.on('click', function() {
                    selectedShow.hide();
                    $(this).hide();
                    $listA.removeClass('selected');
                });

                opts.callfn($this, listIndex, beenSelected);
            });
        },
        checkAll: function(options) {
            var opts = $.extend({}, checkAllOpts, options);
            return this.each(function() {
                var $this = $(this);
                var $body = $('body');
                var checkall = $this.find(opts.checkAllClass);
                var item = $this.find('input:checkbox');
                var itemTr = $this.find('tr').siblings(':not(:first-child)');
                var isCheck;

                item.each(function(index,val){  
                    if ($(val).hasClass('check-all')) {
                        item.splice(index,1);
                    }
                 });

                $(checkall).on('click', function() {
                    if($(this).is(':checked')) {
                        item.prop('checked', true);
                        itemTr.addClass('selected');
                    } else {
                        item.prop('checked', false);
                        itemTr.removeClass('selected');
                    }
                }); 

                $(itemTr).on('click', function() {
                    $(this).toggleClass('selected');
                    if ($(this).hasClass('selected')) {
                        $(this).find('input:checkbox').prop('checked', true);
                    }
                    if (!$(this).hasClass('selected')) {
                        $(this).find('input:checkbox').prop('checked', false);
                    }
                });

                $body.on('click',item, function() {
                    var chknum = $(item).length;
                    var chk = 0;
                    
                    $(item).each(function() {
                        if ($(this).prop('checked') == true) {
                            chk++;
                        }
                    });
                    if (chknum == chk) {
                        //全选
                        $(checkall).prop('checked', true);
                    } else {
                        //不全选
                        $(checkall).prop('checked', false);
                    }
                });

                opts.callfn($this);
            });
        }
    });

})(jQuery);