$(function () {
    Topic.loadModuleList1();
    $("#btn_new").bind("click", function () {
        $("#modal_new_module").modal();
    });
    $("#submit_module").bind("click", function () {
//        Topic.createModule($("#module_name").val().trim(), Topic.appendModuleTr);
        Topic.createModule1($("#module_name").val().trim(),"1","1", Topic.appendModuleTr);
    });
});