$(function () {
    $('#doc_upload').fileupload({
        dataType: 'json',
        url: 'upload/',
        sequentialUploads: true,
        submit: function () {
            $("#doc_upload").hide();
            $("#doc_progress").show();
        },
        done: function (e, data) {
            //TODO
            $("#preview").empty();
            if (data.textStatus == "success") {
                $("#preview").append("<br>[path]" + data.result.path);
                Preview.longPolling(data.result.path, Preview.parsePaper);
            } else {
                //TODO need layouts
                $("#preview").append("<br>" + data.textStatus);
            }
        },
        progress: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#doc_progress .bar').css(
                'width',
                progress + '%'
            );
        }
    });

    $("#submit_paper").bind("click", function () {
        var paper = {
            paper_id: $("#paper_id").val(),
            paper_name: $("#paper_name").val(),
            paper_grade: $("#paper_grade").val(),
            paper_term: $("#paper_term").val(),
            paper_subject: $("#paper_subject").val(),
            paper_year: $("#paper_year").val(),
            paper_type: $("#paper_type").val(),
            paper_region: $("#paper_region").val(),
            paper_location_prov: $("#paper_location_prov").val(),
            paper_location_city: $("#paper_location_city").val()
        };
        $.ajax({
            url: "/paper",
            type: "POST",
            data: JSON.stringify(paper),
            dataType: "json",
            contentType: "application/json;charset=UTF-8",
            success: function (data) {
                alert("提交成功");
                window.location.replace = "/paper/upload";
            },
            error: function () {
                alert("提交失败");
            }
        });
    });
});

var Preview = {
    longPolling: function (path, callback) {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "parsed/" + path,
            timeout: 25000,
            success: function (data, textStatus) {
                callback(data);
            },
            //Ajax请求超时，继续查询
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (textStatus == "timeout") {
                    //TODO need layouts
                    //TODO need handling of connection shutdown by server
                    $("#preview").append("<br>[超时]");
                    Preview.longPolling(path, Preview.parsePaper);
                } else {
                    $("#preview").append("<br>" + textStatus + "      " + JSON.stringify(errorThrown) + "||" + JSON.stringify(XMLHttpRequest));
                }
            }
        });
    },
    parsePaper: function (paperJson) {
        $("#container").empty();
        Paper.parsePaperJson(paperJson, $("#preview"));
        $("#paper_id").val(paperJson.id);
        initCities($("#paper_location_prov"), $("#paper_location_city"), null, null);
        $("#paper_meta").show();
    }
}