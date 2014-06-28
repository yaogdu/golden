<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<div class="BackToTop">
	<a href="#" title="回顶部"><span></span>回顶部</a>
</div>

<div class="footer">
	<p>新东方教育科技集团旗下成员公司 全国客服专线：400-676-2300 上海客服专线：021-65017211 购卡咨询(上海)：021-65026384</p>
	<p>Copyright &copy; 2000-2012 koolearn.com Inc. All rights reserved. 新东方在线 版权所有 </p>
	<p>京ICP证050421号京ICP备05067669号京公安备110-1081940 网络视听许可证0110531号</p>
</div>

<script type="text/javascript">
	if($('.BackToTop').length > 0){
		$(window).scroll(function(){
			if ($(window).scrollTop()>100){
		 		$('.BackToTop').show();
		 	}else{
			  	$('.BackToTop').hide();
		 	}
		});
	}
</script>

	