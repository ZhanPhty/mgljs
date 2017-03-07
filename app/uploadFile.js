/**
 * ============
 * 上传文件、图片
 * ============
 * @author 詹小灰@461632311
 */

define(["jquery", "jqFiler"], function($, filer) {
    var obj = {
        image: function(options) {
            var opts = $.extend({
                extensions: ['jpg', 'png', 'gif', 'bmp'],
                changeInput: '<div class="jFiler-input-dragDrop"><div class="jFiler-input-inner"><div class="jFiler-input-icon"><i class="icon-jfi-cloud-up-o"></i></div><div class="jFiler-input-text"><h3>拖放文件在这里</h3> <span style="display:inline-block; margin: 15px 0">or</span></div><a class="jFiler-input-choose-btn blue">选择文件</a></div></div>',
                theme: "dragdropbox",
                templates: {
                    box: '<ul class="jFiler-items-list jFiler-items-grid"></ul>',
                    item: '<li class="jFiler-item">\
                        <div class="jFiler-item-container">\
                            <div class="jFiler-item-inner">\
                                <div class="jFiler-item-thumb">\
                                    <div class="jFiler-item-del"><a class="icon-remove jFiler-item-trash-action"></a></div>\
                                    <div class="jFiler-item-status"></div>\
                                    <div class="jFiler-item-thumb-overlay">\
                                        <div class="jFiler-item-info">\
                                            <div style="display:table-cell;vertical-align: middle;">\
                                                <span class="jFiler-item-others">{{fi-size2}}</span>\
                                            </div>\
                                        </div>\
                                    </div>\
                                    {{fi-image}}\
                                </div>\
                                <div class="jFiler-item-assets jFiler-row">\
                                    <ul class="list-inline pull-left">\
                                        <li>{{fi-progressBar}}</li>\
                                    </ul>\
                                </div>\
                            </div>\
                        </div>\
                    </li>',
                    itemAppend: '<li class="jFiler-item">\
                            <div class="jFiler-item-container">\
                                <div class="jFiler-item-inner">\
                                    <div class="jFiler-item-thumb">\
                                        <div class="jFiler-item-status"></div>\
                                        <div class="jFiler-item-thumb-overlay">\
                                            <div class="jFiler-item-info">\
                                                <div style="display:table-cell;vertical-align: middle;">\
                                                    <span class="jFiler-item-others">{{fi-size2}}</span>\
                                                </div>\
                                            </div>\
                                        </div>\
                                        {{fi-image}}\
                                    </div>\
                                    <div class="jFiler-item-assets jFiler-row">\
                                        <ul class="list-inline pull-left">\
                                            <li><span class="jFiler-item-others">{{fi-icon}}</span></li>\
                                        </ul>\
                                        <ul class="list-inline pull-right">\
                                            <li><a class="icon-jfi-trash jFiler-item-trash-action"></a></li>\
                                        </ul>\
                                    </div>\
                                </div>\
                            </div>\
                        </li>',
                    progressBar: '<div class="bar"></div>',
                    _selectors: {
                        list: '.jFiler-items-list',
                        item: '.jFiler-item',
                        progressBar: '.bar',
                        remove: '.jFiler-item-trash-action'
                    }
                },
                uploadFile: {
                    synchron: true,
                    beforeSend: function() {},
                    success: function(data, itemEl, listEl, boxEl, newInputEl, inputEl, id) {
                        var parent = itemEl.find(".jFiler-jProgressBar").parent(),
                            filerKit = inputEl.prop("jFiler");
                        itemEl.find(".jFiler-jProgressBar").fadeOut("slow", function() {
                            $("<div class=\"jFiler-item-others text-success\"><i class=\"icon-wancheng\"></i>上传成功<input type='hidden' value='" + data.adr + "' name='crmContactCard.contactNameCard'></div>").hide().appendTo(parent).fadeIn("slow");
                        });
                    },
                    error: function(el) {
                        var parent = el.find(".jFiler-jProgressBar").parent();
                        el.find(".jFiler-jProgressBar").fadeOut("slow", function() {
                            $("<div class=\"jFiler-item-others text-error\"><i class=\"icon-guanbi2\"></i>上传失败</div>").hide().appendTo(parent).fadeIn("slow");
                        });
                    }
                },
                allowDuplicates: true,
                clipBoardPaste: true,
                captions: {
                    button: "上传图片",
                    feedback: "仅支持jpg、gif、png、bmp格式，单张小于30M",
                    feedback2: "张图片（最多20张）",
                    drop: "上传文件",
                    removeConfirmation: "确实要删除此文件吗？",
                    errors: {
                        filesLimit: "只能上传 {{fi-limit}} 个文件",
                        filesType: "只能上传图片",
                        filesSize: "{{fi-name}} 文件太大! 文件大小不能大于 {{fi-maxSize}} MB.",
                        filesSizeAll: "你选择的文件太大！文件大小不能大于 {{fi-maxSize}} MB."
                    }
                }
            }, options);

            $(opts.selector).filer(opts);
        },
        file: function(options) {
            var opts = $.extend({
                captions: {
                    button: "上传文件",
                    feedback: "选择要上传的文件",
                    feedback2: "个文件",
                    drop: "上传文件",
                    removeConfirmation: "确实要删除此文件吗？",
                    errors: {
                        filesLimit: "只能上传 {{fi-limit}} 个文件",
                        filesType: "请上传正确格式",
                        filesSize: "{{fi-name}} 文件太大! 文件大小不能大于 {{fi-maxSize}} MB.",
                        filesSizeAll: "你选择的文件太大！文件大小不能大于 {{fi-maxSize}} MB."
                    }
                }
            }, options);

            $(opts.selector).filer(opts);
        }
    }

    return obj;
});