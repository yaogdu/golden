/**
 * create by liujianbin
 */

latte.schedule.coursebyweek = {
        currentColumn : null,
		deleteschedule :function (id, day, period){
			var url = static_ctx + "/teacher/course/delete/" + id;
			if(!confirm("您确定要删除该课程安排吗？")){
				return;
			}
			$.ajax(
					{ 
						url: url, 
						success: function(value){
							if(value.success){
								var table = document.getElementById("maincontent");
								table.rows[period].cells[1 + day].innerHTML = "&nbsp;";
							}
							else{
								alert(value.message);
							}
						}
					});

			return false;
		},
		showData:function (disid, clsid) {
			var table = document.getElementById("maincontent");
			var dataindex = 0;
			for ( var d in data) {
				var s1 = data[d];
				var days = getMillisecondsSpan(s1.start_time.time, firstdate.getTime());
				s1.dayofweek = days;
				if (days >= 0 && days <= 5) {
					if ((disid == null || disid == s1.disciplineid) && (clsid == null || clsid == 0 || clsid == s1.clazzid)) {
						var html = "";
						html += '<div class="listBox">';
						html += '<div class="listBoxTp">';
						html += '	<div class="listTxt">{0}</div>'.format(isteachermode ? s1.clazzname : s1.teachername);
						switch(s1.state){
						case 0:
							html += '	<div class="stateBg"><p class="unreleased">未发布</p></div>';
							break;
						case 1:
							html += '	<div class="stateBg"><p class="released">已发布</p></div>';
							break;
						case 2:
							html += '	<div class="stateBg"><p class="class">上课中</p></div>';
							break;
						}
						html += '</div>';
						html += "<div class=\"listBoxBt\">\n";
						//html += "	<a href=\"\">{0}</a>\n".format(s1.sectionname1);
						html += "	{0}\n".format(s1.sectionname1);
						html += "</div> \n";
						html += "<div class=\"BtnWrap\">\n";
						
						if(s1.state == 1) {
							html += "	<div class=\"BtnOrange24\">";
							var gotoClassUrl = ctx + '/teacher/course/gotoclass';
							gotoClassUrl += '?scheduleId=' + s1.id;
							gotoClassUrl += '&classMode=' + s1.class_mode;
							gotoClassUrl += '&courseWareId=' + s1.courseid;
							gotoClassUrl += '&file=' + s1.resource_md5;
							gotoClassUrl += '&classId=' + s1.class_id;
							html += '<a id="btnSaveattendclass" class="btnSave" target="_blank" href="'+gotoClassUrl+'" >去上课</a>';
								//"		<a id=\"btnSaveattendclass\" class=\"btnSave\" href=\"#\" '>去上课</a>\n".format(dataindex);
							html += "	</div>";
						}
						if(s1.state == 0) {
							html += "	<div class=\"BtnOrange24\">";
							html += '		<a class="btnSave" href="javascript:void(0);" onclick="latte.schedule.coursebyweek.issueCourse('+s1.class_period_id+','+s1.id+','+s1.class_mode+');">发布课程</a>';
							html += "	</div>";
							html += "	<div class=\"BtnOrange24\">";
							html += "		<a id=\"btnSave\" class=\"btnSave\" href=\"#\" onclick='return latte.schedule.coursebyweek.deleteschedule({0}, {1}, {2})''>删除</a>\n".format(s1.id, days, s1.period);
							html += "	</div>";
						}
						
						html += "</div>";
						html += '</div>';
						html += '';

						console.log(s1.period + ' ' + days);
						table.rows[s1.period].cells[days+1].innerHTML = html;
					}
				}
				dataindex++;
			}
		},
		
		//days + 1 == this.currentColumn && 
		gotoClass : function(){
			
		},
		issueCourse:function (periodid,scheduleid,mode){
			var url = ctx + "/teacher/course/issue";
			$.ajax({
				url : url,
				type : 'get',
				dataType : 'json',
				contentType : "application/x-www-form-urlencoded; charset=UTF-8",
				data :  {"periodid":periodid,"scheduleid":scheduleid,"classMode":mode},
				error : function(data) {
				},
				success : function(data) {
					alert("发布成功！");
				},
			});
		},
		// 上课
		attendclass: function(dataindex){
			var schole = data[dataindex];
			var res_name = schole.period_resource_name;
			var res = schole.period_resource;
			if(schole.resourse_md5){
				res_name = schole.resourse_md5;
			}
			if(schole.resourse){
				res = schole.resourse;
			}
			// 上课页面地址
			var popuppath = ctx + "/res/viewresource?resid=" + res;
			art.dialog({
				lock: true,
			    opacity: 0.5,	// 透明度
			    top: 0,
				width : 1000,
				height : 580,
				zIndex : 1000,
				id : "sys_setting_res",
				title : '查看资源, "' + res_name + '"',
				content : "<iframe style='width:990px; height:560px; border:0px;' src='"+popuppath+"'></iframe>",
				okValue : '确认',
				ok : function(){

				},
				padding : '0px',
				model : true
			});
			return false;
		},
		initTable:function () {
			var table = document.getElementById("maincontent");
			var insertrowcount = 8;
			for (var i = 0; i < insertrowcount; i++) {
				var tr = table.insertRow(i + 1);
				var td = tr.insertCell(0);
				td.innerHTML = '<div class="listBox">第' + (i + 1) + '节</div>';
				td.className = "period";
				for (var j = 0; j < 5; j++) {
					var cell = tr.insertCell(j + 1);
					cell.innerHTML = "&nbsp;";
				}
			}
			document.getElementById("timeinfo").value = firstdate
					.format("yyyy/M/d")
					+ "-" + weekend.format("yyyy/M/d");
			/*document.getElementById("lastweeklink").href = "?firstdate="
					+ laststart.format("yyyy/MM/dd")
					+ (isteachermode ? ("&teacherid=" + teacherid) : "");
			document.getElementById("nextweeklink").href = "?firstdate="
					+ nextstart.format("yyyy/MM/dd")
					+ (isteachermode ? ("&teacherid=" + teacherid) : "");*/
			var last = document.getElementsByName("lastweeklink");
			for(i=0;i<last.length;i++){
				last[i].href = "?firstdate="
					+ laststart.format("yyyy/MM/dd")
					+ (isteachermode ? ("&teacherid=" + teacherid) : "");
			}
			var next = document.getElementsByName("nextweeklink");
			for(i=0;i<next.length;i++){
				next[i].href = "?firstdate="
					+ nextstart.format("yyyy/MM/dd")
					+ (isteachermode ? ("&teacherid=" + teacherid) : "");
			}
	
			var month = firstdate.getMonth() + 1;
			var year = firstdate.getFullYear();
			if (month <= 5) {
				document.getElementById("xueqiinfo").innerHTML = "下学期";
				document.getElementById("xuenianinfo").innerHTML = (year - 1).toString()+ "-" + (year).toString() + "学年";
			} else {
				document.getElementById("xueqiinfo").innerHTML = "上学期";
				document.getElementById("xuenianinfo").innerHTML = (year).toString()+ "-" + (year + 1).toString() + "学年";
			}
			document.title = document.getElementById("xuenianinfo").innerHTML;
			this.showData(null);
		},
		clearTable:function () {
			var table = document.getElementById("maincontent");
			for (var i = 1; i <= 5; i++) {
				for (var j = 1; j <= 8; j++) {
					table.rows[j].cells[i].innerHTML = "&nbsp;";
				}
			}
		},
		initDisciplineList:function () {
			var select = document.getElementById("xuekelist");
			select.options.length = 0;
			select.options.add(new Option("全部学科", ""));
			for ( var index in disciplinelist) {
				var disdata = disciplinelist[index];
				select.options.add(new Option(disdata.name, disdata.id));
			}
			select.onchange = function() {
				latte.schedule.coursebyweek.clearTable();
				var sv = select.options[select.selectedIndex].value;
				var classid = $("#classlist").val();
				latte.schedule.coursebyweek.showData(sv == "" ? null : parseInt(sv), classid == "" ? null : parseInt(classid));
			};
		},
		onload: function(){
			
			// 当前日期
			var now = new Date();
			if(now - firstdate >= 0 && weekend - now >= 0){
				//var days = (now - firstdate) / 1000 / 60 / 60 / 24;
				//days = parseInt(days);
				var days = getDateSpan(now, firstdate);
				var table = document.getElementById("maincontent");
				table.rows[0].cells[days + 1].className = "current";
				this.currentColumn = days + 1;
			}
			
			this.initTable();
			this.initDisciplineList();
			

			//$('#startTime').datetimepicker({ dateFormat: 'yy-mm-dd', timeFormat: 'HH:mm'});
			$('#viewhistory').click(function(){

				art.dialog({
					lock: true,
				    opacity: 0.5,	// 透明度
					width : 320,
					height : 100,
					zIndex : 1000,
					id : "sys_setting",
					title : '查看学年历史',
					content : document.getElementById("divviewhistory").innerHTML,
					okValue : '确认',
					ok : function(){
						var starttime = $('#startTime').val();
						if(!starttime){
							alert("日期不能为空！");
							return false;
						}
						var query = [];
						doEachQueryString(document.location.search, function(k, v){
							if(k.toLowerCase() != 'firstdate'.toLowerCase()){
								query.push(k + "=" + v);
							}
						});
						query.push("firstdate=" + $.trim(starttime));
						window.location = "?" + query.join("&");
					},
					padding : '0px',
					model : true
				});
				$('#startTime').datepicker({ dateFormat: 'yy/mm/dd', timeFormat: ''});
				$('#startTime').val((new Date).format("yyyy/MM/dd"));
				return false;
			});
			
			if(isteachermode){
				$("#classinfo").hide();
				//var cl = $("#classlist");
				var select = document.getElementById("classlist");
				select.options.length = 0;
				select.options.add(new Option("全部班级", 0));
				$.each(classlist, function(n,value){
					select.options.add(new Option(value.name, value.id));
				});
				select.onchange = function() {
					latte.schedule.coursebyweek.clearTable();
					var sv = select.options[select.selectedIndex].value;
					var xuekeid = $("#xuekelist").val();
					latte.schedule.coursebyweek.showData(xuekeid == "" ? null : parseInt(xuekeid), sv == "" ? null : parseInt(sv));
				};
			}
			else{
				$("#classlist").hide();
				$("#btnviewcourse").hide();
			}
		}
};

$(document).ready(function() {
	$('#nav_course').addClass('current');
	latte.schedule.coursebyweek.onload();
});