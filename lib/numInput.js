/** 
× JQUERY 模拟淘宝控件银行帐号输入 
**/
(function($) {
    // 输入框格式化 
    $.fn.numInput = function(options) {
        var defaults = {
            min: 10, // 最少输入字数 
            max: 24, // 最多输入字数 
            deimiter: ' ', // 账号分隔符 
            onlyNumber: true, // 只能输入数字 
            copy: true // 允许复制 
        };
        var opts = $.extend({}, defaults, options);
        var obj = $(this);
        obj.css({
            imeMode: 'Disabled',
            borderWidth: '1px',
            color: '#000',
            fontFamly: 'Times New Roman'
        }).attr('maxlength', opts.max);
        if (obj.val() != '') obj.val(obj.val().replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1" + opts.deimiter));
        obj.bind('keyup', function(event) {
            if (opts.onlyNumber) {
                if (!(event.keyCode >= 48 && event.keyCode <= 57)) {
                    this.value = this.value.replace(/\D/g, '');
                }
            }
            this.value = this.value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1" + opts.deimiter);
        }).bind('dragenter', function() {
            return false;
        }).bind('onpaste', function() {
            return !clipboardData.getData('text').match(/\D/);
        }).bind('blur', function() {
            this.value = this.value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1" + opts.deimiter);
            if (this.value.length < opts.min) {
                alertMsg.warn('最少输入' + opts.min + '位账号信息！');
                obj.focus();
            }
        })
    }
        // 列表显示格式化 
    $.fn.numList = function(options) {
        var defaults = {
            deimiter: ' ' // 分隔符 
        };
        var opts = $.extend({}, defaults, options);
        return this.each(function() {
            $(this).text($(this).text().replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1" + opts.deimiter));
        })
    }

        // 输入框格式化 
    $.fn.idInput = function(options) {
        var defaults = {
            min: 18, // 最少输入字数 
            max: 21, // 最多输入字数 
            deimiter: ' ', // 账号分隔符 
            onlyNumber: false, // 只能输入数字 
            copy: true // 允许复制 
        };
        var opts = $.extend({}, defaults, options);
        var obj = $(this);
        obj.css({
            imeMode: 'Disabled',
            borderWidth: '1px',
            color: '#000',
            fontFamly: 'Times New Roman'
        }).attr('maxlength', opts.max);
        if (obj.val() != '') obj.val(obj.val().replace(/\s/g, '').replace(/(^(\d{6})|(\d{8}))(?=[^\s])/g,'$1' + opts.deimiter));
        obj.bind('keyup', function(event) {
            if (opts.onlyNumber) {
                if (!(event.keyCode >= 48 && event.keyCode <= 57  && event.keyCode == 88)) {
                    this.value = this.value.replace(/\W/g, '');
                }
            }
            this.value = this.value.replace(/\W/g, '').replace(/(^(\d{6})|(\d{8}))(?=[^\s])/g,'$1' + opts.deimiter);
        }).bind('dragenter', function() {
            return false;
        }).bind('onpaste', function() {
            return !clipboardData.getData('text').match(/\W/);
        }).bind('blur', function() {
            this.value = this.value.replace(/\s/g, '').replace(/(^(\d{6})|(\d{8}))(?=[^\s])/g,'$1' + opts.deimiter);
            if (this.value.length < opts.min) {
                alertMsg.warn('最少输入' + opts.min + '位账号信息！');
                obj.focus();
            }
        })
    }

        // 手机号输入方式 
    $.fn.telInput = function(options) {
        var defaults = {
            min: 11, // 最少输入字数 
            max: 13, // 最多输入字数 
            deimiter: ' ', // 账号分隔符 
            onlyNumber: true, // 只能输入数字 
            copy: true // 允许复制 
        };
        var opts = $.extend({}, defaults, options);
        var obj = $(this);
        obj.css({
            imeMode: 'Disabled',
            borderWidth: '1px',
            color: '#000',
            fontFamly: 'Times New Roman'
        }).attr('maxlength', opts.max);
        if (obj.val() != '') obj.val(obj.val().replace(/\s/g, '').replace(/(^(\d{3})|(\d{4}))(?=[^\s])/g,'$1' + opts.deimiter));
        obj.bind('keyup', function(event) {
            if (opts.onlyNumber) {
                if (!(event.keyCode >= 48 && event.keyCode <= 57)) {
                    this.value = this.value.replace(/\D/g, '');
                }
            }
            this.value = this.value.replace(/\s/g, '').replace(/(^(\d{3})|(\d{4}))(?=[^\s])/g,'$1' + opts.deimiter);
        }).bind('dragenter', function() {
            return false;
        }).bind('onpaste', function() {
            return !clipboardData.getData('text').match(/\D/);
        }).bind('blur', function() {
            this.value = this.value.replace(/\s/g, '').replace(/(^(\d{3})|(\d{4}))(?=[^\s])/g,'$1' + opts.deimiter);
            if (this.value.length < opts.min) {
                alertMsg.warn('最少输入' + opts.min + '位账号信息！');
                obj.focus();
            }
        })
    }


})(jQuery);
