$(function () {
    Topic.refreshSeriesList();
    $("#submit_topic").bind("click", function () {
    });
    $("#submit_series").bind("click", function () {
        var linkedTopicIds = "";
        $.each($("#topics_selected option"), function (idx, itm) {
            linkedTopicIds += $(itm).val() + ",";
        });
        if (linkedTopicIds.lastIndexOf(",") == linkedTopicIds.length - 1) {
            linkedTopicIds = linkedTopicIds.substr(0, linkedTopicIds.length - 1);
        }
        Topic.createSeries(window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1), $("#series_name").val(), linkedTopicIds, Topic.refreshSeriesList);
    });
});