$(function () {
    Topic.refreshUnitList();
    $("#submit_unit").bind("click", function () {
        Topic.createUnit(window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1), $("#unit_name").val().trim(), Topic.refreshUnitList);
    });
    $("#submit_topic").bind("click", function () {
        var mastery = "";
        $.each($("#topic_content > :checked"), function (idx, itm) {
            mastery += $(itm).val() + ",";
        });
        if (mastery.lastIndexOf(",") == mastery.length - 1) {
            mastery = mastery.substr(0, mastery.length - 1);
        }
        Topic.createTopic($("#select_unit").val(), $("#topic_name").val(), mastery, Topic.refreshTopicList);
    });
});