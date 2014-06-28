var Topic = {
    createModule: function (text, callback) {
        var module = {
            name: text,
            type: "模块"
        };
        $.ajax({
            url: '/topic',
            type: 'POST',
            data: JSON.stringify(module),
            dataType: 'json',
            contentType: 'application/json;charset=UTF-8',
            success: function (data) {
                callback(data);
            }
        });

    },
    createModule1: function (text,subject,stage, callback) {
        var module = {
            name: text,
            subject: subject,
            stage: stage
        };
        $.ajax({
            url: '/module',
            type: 'POST',
            data: JSON.stringify(module),
            dataType: 'json',
            contentType: 'application/json;charset=UTF-8',
            success: function (data) {
                callback(data);
            }
        });

    },
    createUnit: function (parent_id, text, callback) {
        var module = {
            parent_id: parent_id,
            name: text,
            type: "单元"
        };
        $.ajax({
            url: '/topic',
            type: 'POST',
            data: JSON.stringify(module),
            dataType: 'json',
            contentType: 'application/json;charset=UTF-8',
            success: function (data) {
                callback(data);
                $("#unit_add_modal").modal("hide");
            }
        });
    },
    createTopic: function (parent_id, text, mastery, callback) {
        var module = {
            parent_id: parent_id,
            mastery: mastery,
            name: text,
            type: "主题"
        };
        $.ajax({
            url: '/topic',
            type: 'POST',
            data: JSON.stringify(module),
            dataType: 'json',
            contentType: 'application/json;charset=UTF-8',
            success: function (data) {
                callback(data);
                $("#unit_add_modal").modal("hide");
            }
        });
    },
    createSeries: function (parent_id, text, linkedTopicIds, callback) {
        var module = {
            parent_id: parent_id,
            topics: linkedTopicIds,
            name: text,
            type: "主题"
        };
        $.ajax({
            url: '/topic/series',
            type: 'POST',
            data: JSON.stringify(module),
            dataType: 'json',
            contentType: 'application/json;charset=UTF-8',
            success: function (data) {
                callback(data);
                $("#series_add_modal").modal("hide");
            }
        });

    },
    appendModuleTr: function (data) {
        var moduleTrTmpl;
        $.get("static/js/template/t_module_row.html").done(function (tmpl) {
            moduleTrTmpl = $.templates(tmpl);
            var html = moduleTrTmpl.render(data);
            var $container = $("#module_list");
            $container.append(html);
        });
    },
    loadModuleList: function () {
        $.getJSON("topic/module").done(function (data) {
            var $container = $("#module_list");
            $container.empty();
            Topic.appendModuleTr(data);
        });
    },
    loadModuleList1: function () {
        $.getJSON("module").done(function (data) {
            var $container = $("#module_list");
            $container.empty();
            Topic.appendModuleTr(data);
        });
    },
    prepareUnitAddModal: function () {
        $("#unit_add_modal").modal();
    },
    prepareSeriesAddModal: function () {
        $("#series_add_modal").modal();
        Topic.refreshUnitList();
    },
    deleteUnit: function () {
    },
    deleteSeries: function () {
    },
    deleteTopic: function () {
    },
    linkTopic: function () {
        var added = false;
        var $selected = $("#select_topic :selected");
        $.each($("#topics_selected option"), function (idx, itm) {
            if ($selected.val() == $(itm).val()) {
                added = true;
            }
        });
        if (!added) {
            $("#topics_selected").append($("#select_topic :selected"));
        }  else{
            alert("已经添加")
        }
    },
    unlinkTopic: function () {
        $("#topics_selected :selected").remove();
        Topic.refreshTopicList();
    },
    refreshTopicList: function () {
        $.getJSON("/topic/sub/" + $("#select_unit").val()).done(function (data) {
            var $container = $("#select_topic");
            $container.empty();
            var html = $("#option_pattern").render(data);
            $container.append(html);
            $("#topic_add_modal").modal("hide");
        });
    },
    refreshUnitList: function () {
        $.getJSON("/topic/sub/" + window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1)).done(function (data) {
            var $container = $("#select_unit");
            $container.empty();
            var html = $("#option_pattern").render(data);
            $container.append(html);
        });
    },
    refreshSeriesList: function () {
        $.getJSON("/topic/subseries/" + window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1)).done(function (data) {
            var $container = $("#series_list");
            $container.empty();
            var html = $("#series_tr").render(data);
            $container.append(html);
        });
    },
    prepareTopicAddModal: function () {
        if ($("#select_unit").val() != null) {
            $("#topic_add_modal").modal();
        } else {
            alert("请选择单元!")
        }
    }
}