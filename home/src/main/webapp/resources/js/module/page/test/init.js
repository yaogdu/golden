/**
 * Created with IntelliJ IDEA.
 * User: lianghongyun
 * Date: 16/01/2014
 * Time: 01:17
 * To change this template use File | Settings | File Templates.
 */
    //init.js
define(function (require, exports, module) {
    var $ = require('jquery');
    require('bootstrap');
    require('jsrender');
    $(function () {

        $.getJSON("static/js/sampledata/module.js").done(function (data) {
            $.get("static/js/template/t_module_row.html").done(function (tmpl) {
                var moduleTrTmpl = $.templates(tmpl);
                var html = moduleTrTmpl.render(data);
                var $container = $("#module");
                $container.append(html);
            });
        });

        $("#saveBtn").bind("click", function () {
            $.get("test1");
        });
        $("#getBtn").bind("click", function () {
            $.get("test2");
        });



    });
    $('#loadPaperBtn').bind("click", function () {
        alert("hello");
    });
});

