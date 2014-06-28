/**
 * create by liujianbin
 */

latte.schedule = {
		
};

function doEachQueryString(search, fun) {
    if (search.substr(0, 1) == '?')
    {
        search = search.substr(1);
    }
	var paras = search.split('&');
	for (var index = 0; index < paras.length; index++) {
		var para = paras[index].split('=');
		if(para.length < 2){
			continue;
		}
		fun(para[0], para[1]);
	}
}

//获取date1 - date2之茶的日期
function getMillisecondsSpan(m1, m2){
	var datediff = m1 - m2;
	var days = Math.floor(datediff / (24 * 3600 * 1000));
	return days;
}

// 获取date1 - date2之茶的日期
function getDateSpan(date1, date2){
	return getMillisecondsSpan(date1.getTime(), date2.getTime());
}

Date.prototype.format = function(fmt) { //author: meizz 
	var o = {
		"M+" : this.getMonth() + 1, //月份 
		"d+" : this.getDate(), //日 
		"h+" : this.getHours(), //小时 
		"m+" : this.getMinutes(), //分 
		"s+" : this.getSeconds(), //秒 
		"q+" : Math.floor((this.getMonth() + 3) / 3), //季度 
		"S" : this.getMilliseconds()
	//毫秒 
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1,
					(RegExp.$1.length == 1) ? (o[k])
							: (("00" + o[k])
									.substr(("" + o[k]).length)));
	return fmt;
}
//var template1 = "我是{0}，今年{1}了";
//var template2 = "我是{name}，今年{age}了";
//var result1 = template1.format("loogn", 22);
//var result2 = template1.format({ name: "loogn", age: 22 });
String.prototype.format = function (args) {
	if (arguments.length > 0) {
		var result = this;
		if (arguments.length == 1 && typeof (args) == "object") {
			for (var key in args) {
				var reg = new RegExp("({" + key + "})", "g");
				result = result.replace(reg, args[key]);
			}
		}
		else {
			for (var i = 0; i < arguments.length; i++) {
				 {
					var reg = new RegExp("({[" + i + "]})", "g");
					result = result.replace(reg, arguments[i]);
				}
			}
		}
		return result;
	}
	else {
		return this;
	}
}
