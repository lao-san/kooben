$(function(){
	banner();
	tools();
	share();	
});
// banner焦点图
function banner() {
	if (!$("#banner").length || $("#banner li").length <= 1) {	return false; }
	$("#banner ul li:gt(0)").css({"display":"none"});
	var b = $("#banner"),
		me = $("#banner ul"),
		tip = $("#banner .tip"),
		t, interval = 10000,
		speed = 1000,
		speed2 = 700,
		n = 0,
		N = me.children("li").length;
		wid = b.children("li").width();
		step = 200,time = 3000;
	if ($("#banner .tip").length) {
		var htmlTip = "";
		for (var i = 0; i < N; i++) {
			if (i == 0) {
				htmlTip += "<span class='cur'>"+(i+1)+"</span>";
			} else {
				htmlTip += "<span>"+(i+1)+"</span>";
			}
		}
		tip.html(htmlTip);
	}
	var func = function() {
		if (n >= N - 1) {
			n = 0;
		}else if(n < -1){
			n = N-1;
		}
		else {
			n++;
		}
		me.children("li").eq(n).css({
			"z-index": 2
		}).stop().fadeIn(speed).siblings("li").css({
			"z-index": 1
		}).stop().fadeOut(speed2);
		if ($("#banner .tip").length) {
			tip.children("span").eq(n).addClass("cur").siblings("span").removeClass("cur");
		}
	}
	$("#banner").hover(function(){
		$("#btn_prev,#btn_next").fadeIn()
		},function(){
		$("#btn_prev,#btn_next").fadeOut()
		})
	$dragBln = false;
	 $("#btn_prev").click(function(){
	      clearInterval(t); 
		  n -= 2;
	      func();
	      t = setInterval(func, time)
	  });
	  $("#btn_next").click(function(){
	      clearInterval(t);
	      func();
	      t = setInterval(func, time)
	  });
	  
	tip.children("span").click(function() {
		clearInterval(t);
		n = $(this).index() - 1;
		func();
		t = setInterval(func, interval);
	})
	$("#banner ul.list li").mouseenter(function() {
		clearInterval(t);
	}).mouseleave(function() {
		t = setInterval(func, time);
	});
	t = setInterval(func, interval);
}
// 集成JS效果
function tools(){
	// 设为首页
	$(".setHome").click(function(){
		var hm = window.location.host;
		SetHome(this, location.href);
	});
	// 加入收藏
	$(".addFavo").click(function(){
		var fm = $("title").html();
		AddFavorite(fm, location.href, '');
	});
	var sflag=true;
	$(".search_btn").click(function(){
		if(sflag){
			$(".topsearch").addClass("addy");
			sflag=false;
		}else{
			$(".topsearch").removeClass("addy");
			sflag=true;
		}
	});
	$("#searchbox").hover(function () {
        $("#infoSer").stop().slideDown(200);
    }, function () {
        $("#infoSer").stop().slideUp(200);
    });
	// 合作模式
	$(".steps").slide({titCell:".hd ul",mainCell:".bd ul",autoPage:true,effect:"left",autoPlay:true,scroll:1,vis:6});
	$(".slideTxtBox").slide({effect:"left"});
	// 首页合作案例
	$(".slideBox .smallScroll li img").on("click",function(){
		  var index = $(this).index();
		$(this).parents(".slideBox").find(".bigImg img").attr("src",$(this).attr("src"));
		$(this).parents(".slideBox").find(".txt h3").text($(this).attr('title'));
		$(this).parents(".slideBox").find(".txt p").text($(this).attr("data-p"));
	})  ;
	$(".slideGroup .btn span").hover(function(){
	    $(this).addClass("cur").siblings().removeClass("cur")
	  },function(){
	  });
	  $(".vistbox .hdtit li").eq(0).addClass("hover");
	
    $(".ksdh a.mobile").click(function () {
        $("#ewm").stop().toggle(500);
    });
    
    $(".floor_1 .item").eq(1).addClass("hover");
    $(".floor_1 .item").hover(function() {
		  	$(this).addClass("hover").siblings().removeClass("hover");
		},function() {
//			$(this).removeClass("hover");
		}
    );
    $(".return-webtop").click(function() {
	$("body, html").stop().animate({
			"scrollTop": 0
	});
});
	$(".float-right-box").hover(function() {
		$(".float-right-box").removeClass('on');
	}, function() {
			$(".float-right-box").addClass('on');
	});
	$('.float-right-box li .weix').mouseover(function(){
			$(this).find(".sidebox").stop().animate({"right":"250px","opacity":"1"}).show(); 
		})
	$('.float-right-box li .weix').mouseout(function(){
			$(this).find(".sidebox").stop().animate({"right":"250px","opacity":"0"}).hide(); 
		})

	
}
// 设置主页
function SetHome(obj,url){
	try{
		obj.style.behavior='url(#default#homepage)';
		obj.setHomePage(url);
   }catch(e){
	   if(window.netscape){
		  try{
			  netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
		 }catch(e){
			  alert("抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入并回车然后将[signed.applets.codebase_principal_support]设置为'true'");
		  }
	   }else{
		alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【"+url+"】设置为首页。");
	   }
  }
}
//收藏本站
function AddFavorite(title, url) {
  try {
	  window.external.addFavorite(url, title);
  }
catch (e) {
	 try {
	   window.sidebar.addPanel(title, url, "");
	}
	 catch (e) {
		 alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加");
	 }
  }
}

function share(){
	window._bd_share_config = {
    "common": {
        "bdSnsKey": {},
        "bdText": "",
        "bdMini": "2",
        "bdMiniList": false,
        "bdPic": "",
        "bdStyle": "0",
        "bdSize": "16"
    },
    "share": {},
    "slide": { // 跟图标式的代码相比，这里是添加了浮窗式 slide 属性配置
        "type": "slide",
        "bdImg": "5",
        "bdPos": "left",
        "bdTop": "100"
    }
};
	window._bd_share_config = {
		share : [{
			"bdSize" : 16
		}],
	}
	with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion='+~(-new Date()/36e5)];
}
jQuery(".game163").slide({ 
			titCell:".smallImg li", mainCell:".bigImg", autoPlay:true,delayTime:200,
			startFun:function(i,p){
				if(i==0){ jQuery(".game163 .sPrev").click() 
				} else if( i%3==0 ){jQuery(".game163 .sNext").click()}
				}
			});
		jQuery(".game163 .smallScroll").slide({ mainCell:"ul",delayTime:200,vis:3,scroll:1,effect:"left",autoPage:true,prevCell:".sPrev",nextCell:".sNext",pnLoop:false });