! function($) {
    // 默认参数
    var defaults = {
        content: '消息提示',
        stayTime: 1500,
        type: 'info',
        icon: '',
        skin: '',
        messageClass: '.message-tip',
        appendTo: 'body',
        callback: function() {}
    }

    function Plugin(option) {
        var opts = $.extend(defaults, option);

        switch (opts.type) {
            case 'info':
                opts.icon = 'fa-info-circle';
                break;
        }

        //默认模板
        var msgTpl = '<div class="popmsg-tip '+ opts.skin +'">' +
            '<div class="popmsg-tip-cnt">' +
            '<i class="' + opts.icon + '"></i><span>' + opts.content + '</span>' +
            '</div>' +
            '</div>';

        $(opts.appendTo).append(msgTpl);

        var timeClear = setTimeout(function() {
            $('.popmsg-tip').remove();
        }, opts.stayTime);
    }

    $.fn.mglmessage = $.mglmessage = Plugin;
}(window.jQuery)
