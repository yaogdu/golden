/**
 * Author : Lance lance7in_gmail_com
 * Date: 11/02/2014  17:12
 * Since  : 0.1
 */
define(function (require, exports, module) {

    exports.test = function () {
        return alert("success loaded");
    };

    exports.loadModule = function (callback) {
        $.getJSON("module").done(function (data) {
            callback(data);
        });
    };

    exports.loadTopicByUnitId = function (unitId) {
        $.getJSON("topic/unit/" + unitId).done(function (data) {
            callback(data);
        });
    };

    exports.loadTopicBySeriesId = function (seriesId) {
        $.getJSON("topic/series/" + seriesId).done(function (data) {
            callback(data);
        });
    };

    exports.loadUnitByModuleId = function (moduleId) {
        $.getJSON("unit/module/" + moduleId).done(function (data) {
            callback(data);
        });
    };

    exports.loadSeriesByMoudleId = function (moduleId) {
        $.getJSON("series/module/" + moduleId).done(function (data) {
            callback(data);
        });
    };

    exports.linkTopicWithSeries = function (topicId, seriesId, callback) {
        var pair;
        pair = {
            topicId: topicId,
            seriesId: seriesId
        };
        $.ajax({
            url: 'series/topic/',
            type: 'POST',
            data: JSON.stringify(pair),
            dataType: 'json',
            contentType: 'application/json;charset=UTF-8',
            success: function (data) {
                callback(data);
            }
        });
    };

    exports.unlinkTopicWithSeries = function (topicId, seriesId, callback) {
        var pair;
        pair = {
            topicId: topicId,
            seriesId: seriesId
        };
        $.ajax({
            url: 'series/topic/',
            type: 'POST',
            data: JSON.stringify(pair),
            dataType: 'json',
            contentType: 'application/json;charset=UTF-8',
            success: function (data) {
                callback(data);
            }
        });
    };

    exports.createModule = function (name, subject, stage, callback) {
        var module;
        module = {
            name: name,
            subject: subject,
            stage: stage
        };
        ajaxCreateByType("module", module, callback);
    };

    exports.createTopic =
        function (name, subject, stage, mastery, unitId, callback) {
            var topic;
            topic = {
                name: name,
                subject: subject,
                stage: stage,
                mastery: mastery,
                unitId: unitId
            };
            ajaxCreateByType("topic", topic, callback);
        };

    exports.createUnit = function (name, subject, stage, moduleId, callback) {
        var unit;
        unit = {
            name: name,
            subject: subject,
            stage: stage,
            moduleId: moduleId
        };
        ajaxCreateByType("unit", unit, callback);
    };

    exports.createSeries = function (name, subject, stage, moduleId, callback) {
        var series;
        series = {
            name: name,
            subject: subject,
            stage: stage,
            moduleId: moduleId
        };
        ajaxCreateByType("series", series, callback);
    };

    ajaxCreateByType = function (type, obj, callback) {
        $.ajax({
            url: type,
            type: 'POST',
            data: JSON.stringify(obj),
            dataType: 'json',
            contentType: 'application/json;charset=UTF-8',
            success: function (data) {
                callback(data);
            }
        });
    };

    exports.deleteModule = function (id, callback) {
        ajaxDeleteByTypeAndId("module", id, callback);
    };

    exports.deleteTopic = function (id, callback) {
        ajaxDeleteByTypeAndId("topic", id, callback);
    };

    exports.deleteUnit = function (id, callback) {
        ajaxDeleteByTypeAndId("unit", id, callback);
    };

    exports.deleteSeries = function (id, callback) {
        ajaxDeleteByTypeAndId("series", id, callback);
    };

    ajaxDeleteByTypeAndId = function (type, id, callback) {
        $.ajax({
            url: type + '/' + id,
            type: 'DELETE',
            success: function (data) {
                callback(data);
            }
        });
    };

    exports.updateModule = function (id, name, subject, stage, callback) {
        var module;
        module = {
            name: name,
            subject: subject,
            stage: stage
        };
        ajaxUpdateByTypeAndId("module", id, module, callback);
    };

    exports.updateTopic =
        function (id, name, subject, stage, mastery, unitId, callback) {
            var topic;
            topic = {
                name: name,
                subject: subject,
                stage: stage,
                mastery: mastery,
                unitId: unitId
            };
            ajaxUpdateByTypeAndId("topic", id, topic, callback);
        };

    exports.updateUnit =
        function (id, name, subject, stage, moduleId, callback) {
            var unit;
            unit = {
                name: name,
                subject: subject,
                stage: stage,
                moduleId: moduleId
            };
            ajaxUpdateByTypeAndId("unit", id, unit, callback);
        };

    exports.updateSeries =
        function (id, name, subject, stage, moduleId, callback) {
            var series;
            series = {
                name: name,
                subject: subject,
                stage: stage,
                moduleId: moduleId
            };
            ajaxUpdateByTypeAndId("series", id, series, callback);
        };

    ajaxUpdateByTypeAndId = function (type, id, obj, callback) {
        $.ajax({
            url: type + '/' + id,
            type: 'POST',
            data: JSON.stringify(obj),
            dataType: 'json',
            contentType: 'application/json;charset=UTF-8',
            success: function (data) {
                callback(data);
            }
        });
    };
});
