$(function () {
    //TODO asynchronous loading of paper meta
    var path = window.location.toString();
    var paperId = path.substring(path.lastIndexOf("/") + 1);
    $('#audio_upload').fileupload({
        dataType: 'json',
        url: '/doc/upload/',
        sequentialUploads: true,
        submit: function () {
            $("#audio_upload").hide();
            $("#audio_progress").show();
        },
        done: function (e, data) {
            //TODO
//                $.each(data.result.files, function (index, file) {
//                    $('<p/>').text(file.name).appendTo(document.body);
//                });
        },
        progress: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#audio_progress .bar').css(
                'width',
                progress + '%'
            );
        }
    });
    $('#video_upload').fileupload({
        dataType: 'json',
        url: '/doc/upload/',
        sequentialUploads: true,
        submit: function () {
            $("#video_upload").hide();
            $("#video_progress").show();
        },
        done: function (e, data) {
        },
        progress: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#video_progress .bar').css(
                'width',
                progress + '%'
            );
        }
    });
    $('#word_upload').fileupload({
        dataType: 'json',
        url: '/doc/upload/',
        sequentialUploads: true,
        submit: function () {
            $("#word_upload").hide();
            $("#word_progress").show();
        },
        done: function (e, data) {
        },
        progress: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#word_progress .bar').css(
                'width',
                progress + '%'
            );
        }
    });

    Evaluation.loadPaperMeta();
    Evaluation.loadQuestions();
    Evaluation.loadModuleList();
});

var Evaluation = {
    toggleZhuantiModal: function () {
        $('#zhuanti_modal').modal('toggle');
    },
    toggleZhutiModal: function () {
        $('#zhuti_modal').modal('toggle');
    },
    togglePaperMetaEditModal: function () {
        initCities($("#paper_location_prov"), $("#paper_location_city"), null, null);
        $('#paper_meta_edit_modal').modal('toggle');
    },
    toggleDocAddModal: function () {
        $('#doc_upload_modal').modal('toggle');
    },
    loadPaperMeta: function () {
        $.getJSON("/static/js/sampledata/papermeta.js").done(function (data) {

            var paperMetaTmpl;
            $.get("/static/js/template/papermeta.html").done(function (tmpl) {
                paperMetaTmpl = $.templates(tmpl);
                var html = paperMetaTmpl.render(data);
                var $container = $("#paper_meta");
                $container.empty();
                $container.append(html);
            });
        });
    },
    loadQuestions: function () {
        $.getJSON("/static/js/sampledata/questions.js").done(function (data) {
            var quesitonTmpl;
            $.get("/static/js/template/question.html").done(function (tmpl) {
                quesitonTmpl = $.templates(tmpl);
                var $container = $("#paper_questions");
                $container.empty();
                $.each(data, function (idx, itm) {
                    var html = quesitonTmpl.render(itm);
                    $container.append(html);
                });
                $container.find(".qbody").bind("click", function () {
                    alert($(this).data("id"));
                });
            });
        });
    },
    loadModuleList: function () {
        $.getJSON("/topic/module").done(function (data) {
            var $containerZhuanti = $("#zhuanti_module");
            var $containerZhuti = $("#zhuti_module");
            $containerZhuti.empty();
            $containerZhuti.append($("#option_pattern").render(data));
            $containerZhuanti.html($containerZhuti.html());
        });
    },
    refreshModuleList: function () {

    },
    refreshSeriesList: function () {
        $.getJSON("/topic/subseries/" + $("#zhuanti_module").val()).done(function (data) {
            var $container = $("#zhuanti_series");
            $container.empty();
            var html = $("#option_pattern").render(data);
            $container.append(html);
        });
    },
    refreshUnitList: function () {
        $.getJSON("/topic/sub/" + $("#zhuti_module").val()).done(function (data) {
            var $container = $("#zhuti_unit");
            $container.empty();
            var html = $("#option_pattern").render(data);
            $container.append(html);
        });
    },
    refreshTopicList: function () {
        $.getJSON("/topic/sub/" + $("#zhuti_unit").val()).done(function (data) {
            var $container = $("#zhuti_topic");
            $container.empty();
            var html = $("#option_pattern").render(data);
            $container.append(html);
        });
    }
};

var QuestionEdit = {
    loadSingleType1: function () {
        $.getJSON("/static/js/sampledata/selection.js").done(function (data) {
            var quesitonTmpl;
            $.get("/static/js/template/q_single_type1.html").done(function (tmpl) {
                quesitonTmpl = $.templates(tmpl);
                var $container = $("#detail_container");
                $container.empty();
                var html = quesitonTmpl.render(data);
                $container.append(html);
                var $optionbox = $container.find("#optionbox");
                for (var i = 0; i < data.optionCount; i++) {
                    var option = String.fromCharCode(65 + i);
                    $optionbox.append("<input name='answer' value=" + option + " type='checkbox' />" + option + "&nbsp;&nbsp;&nbsp;&nbsp;");
                }
                $optionbox.find("[value=" + data.answer + "]").attr("checked", true);
            });
        });
    },
    loadSingleType2: function () {
        $.getJSON("/static/js/sampledata/nonselection.js").done(function (data) {
            var quesitonTmpl;
            $.get("/static/js/template/q_single_type2.html").done(function (tmpl) {
                quesitonTmpl = $.templates(tmpl);
                var $container = $("#detail_container");
                $container.empty();
                var html = quesitonTmpl.render(data);
                $container.append(html);
            });
        });
    },
    bindMouseClick: function () {

    },
    linkTopic: function () {

    },
    unlinkTopic: function () {

    }

};

