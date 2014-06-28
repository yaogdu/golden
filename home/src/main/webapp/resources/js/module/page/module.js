/**
 * Author : Lance lance7in_gmail_com
 * Date: 28/01/2014  11:31
 * Since  : 0.1
 */
define(function (require, exports, module) {
    var $ = require('jquery');
    Topic.loadModuleList1();
    $("#btn_new").bind("click", function () {
        $("#modal_new_module").modal();
    });
    $("#submit_module").bind("click", function () {
//        Topic.createModule($("#module_name").val().trim(), Topic.appendModuleTr);
        Topic.createModule1($("#module_name").val().trim(),"1","1", Topic.appendModuleTr);
    });
});