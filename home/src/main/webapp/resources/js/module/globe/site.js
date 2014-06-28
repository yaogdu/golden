/**
 * Author : Lance lance7in_gmail_com
 * Date: 16/01/2014  01:33
 * Since  : 0.1
 */

    //site.js
define(function (require, exports, module) {
    seajs.config({
        base: 'static/js/module/',
        alias: {
            'jquery': 'jquery/1.10.2/jquery'
        },
        charset: 'utf-8',
        timeout: 20000,
        debug: false
    });
});