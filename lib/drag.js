(function($){
        /** 默认配置 */
    var defaults = {
        dragText: '按住滑块，拖动到最右边',
        dragSucces: '验证通过',
        inputName: 'dragVaild',
        onDragOk: function(el, drag, input){}
    };

    $.fn.drag = function(options){

        var x, drag = this, isMove = false;
        var options = $.extend(defaults, options);
        //添加背景，文字，滑块
        var html = '<div class="drag"><div class="drag_bg"></div>'+
                    '<div class="drag_text" onselectstart="return false;" unselectable="on">'+ options.dragText +'</div>'+
                    '<input class="drag_vaild" name="'+ options.inputName +'" type="text">'+
                    '<div class="handler handler_bg"></div></div>';
        this.append(html);
        
        var drag = this;
        var handler = drag.find('.handler');
        var drag_bg = drag.find('.drag_bg');
        var text = drag.find('.drag_text');
        var vaild = drag.find('.drag_vaild');
        var maxWidth = drag.width() - handler.width();  //能滑动的最大间距
        
        //鼠标按下时候的x轴的位置
        handler.mousedown(function(e){
            isMove = true;
            x = e.pageX - parseInt(handler.css('left'), 10);
        });
        
        //鼠标指针在上下文移动时，移动距离大于0小于最大间距，滑块x轴位置等于鼠标移动距离
        $(document).mousemove(function(e){
            var _x = e.pageX - x;
            if(isMove){
                if(_x > 0 && _x <= maxWidth){
                    handler.css({'left': _x});
                    drag_bg.css({'width': _x});
                }else if(_x > maxWidth){  //鼠标指针移动距离达到最大时清空事件
                    dragOk();
                    options.onDragOk(e,drag,vaild);
                }
            }
        }).mouseup(function(e){
            isMove = false;
            var _x = e.pageX - x;
            if(_x < maxWidth){ //鼠标松开时，如果没有达到最大距离位置，滑块就返回初始位置
                handler.css({'left': 0});
                drag_bg.css({'width': 0});
            }
        });
        
        //清空事件
        function dragOk(){
            handler.removeClass('handler_bg').addClass('handler_ok_bg');
            text.text(options.dragSucces);
            drag.css({'color': '#fff'});
            handler.off('mousedown');
            vaild.val('true');
            $(document).off('mousemove');
            $(document).off('mouseup');
        }
    };
})(jQuery);


