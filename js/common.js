var win_w = $(window).width();
var win_h = $(window).height();
$(function(){
	my_jungle();
	search_onoff();
	edit_menu();
	edit_check();
	slider();
	mouse_ovot();
	reply_del();
	select_cl();
	faq();
	profile();
	my_collection();
	form_pop();
	member_change();
	career();
	$(window).resize(function(){
		re_size();
	});
	initialize();
});

/*search 활성화*/
var search_count = 0;	
function search_onoff(){	
	$("._sub_top p label").click(function(){
		if(search_count++%2 == 0){
			$("._sub_top p img").attr({
				"src":"images/icon_search_c.gif"
			});
			var search_h = 102;
			$(".search_box").animate({
				height:search_h
			},{queue:false,duration:300});
			
			$(".my_jungle h2").removeClass("on");
			$(".my_jungle ul").slideUp(300);
			$(".edit_mypage").fadeOut(300);
			my_jungle_count = 0;
		}else{
			$("._sub_top p img").attr({
				"src":"images/icon_search.gif"
			});
			$(".search_box").animate({
				height:0
			},{queue:false,duration:300});
		}
	});
	$("#search").keyup(function(e){
		$("._search_box .now").text($("#search").val().length);
	});
}
/*MY JUNGLE 메뉴*/
var my_jungle_count = 0;
function my_jungle(){
	$(".my_jungle h2 a").click(function(e){
		e.preventDefault();
		if(my_jungle_count++%2 == 0){
			$(".my_jungle h2").addClass("on");
			$(".my_jungle ul").slideDown(300);
			
			$("._sub_top p img").attr({
				"src":"images/icon_search.gif"
			});
			$(".search_box").animate({
				height:0
			},{queue:false,duration:300});
			search_count = 0;
		}else{
			$(".my_jungle h2").removeClass("on");
			$(".my_jungle ul").slideUp(300);
			$(".edit_mypage").fadeOut(300);
		}
	});
	$(".my_jungle ul li").each(function(num){
		$(this).find("a").click(function(e){
			if(num == 0){
				$(".edit_mypage").fadeIn(300);
			}
		});
	});
}
/*main profile*/
function profile(){
	$(".main_profile").draggable({ 
		scroll: true, 
		scrollSensitivity: 100,
		containment: ".contents"
	});
}
/*career path*/
function career(){
	var puzzle_idx = 0;
	$(".career_top .choice_box select").change(function(){
		$(".puzzle_piece:eq("+puzzle_idx+")").text($(this).find("option:selected").text());
	});
	$(".puzzle_piece").draggable({
		scroll: false, 
		scrollSensitivity: 100,
		containment: ".contents"
	}).mouseup(function(){
		if(Math.abs(parseInt($(".puzzle"+puzzle_idx).css("left"))-parseInt($(this).css("left")))<20 && Math.abs(parseInt($(".puzzle"+puzzle_idx).css("top"))-parseInt($(this).css("top")))<20){
			$(this).animate({
				left:$(".puzzle"+puzzle_idx).css("left"),
				top:$(".puzzle"+puzzle_idx).css("top")
			},{queue:false,duration:500, easing:"easeOutElastic"});
			puzzle_idx++;
			$(".choice_slide").animate({
				left:puzzle_idx*-1200
			},{queue:false,duration:400});
			$(".puzzle_piece:eq("+puzzle_idx+")").addClass("select");
			$(this).unbind("mousedown mouseup");
		}
	});
}
/*edit menu*/
function edit_menu(){
	$(".edit_mypage").css({
		left:(win_w-$(".edit_mypage").width())/2
	}).draggable({ 
		handle: ".edit_top",
		scroll: true, 
		scrollSensitivity: 100,
		containment: ".contents"
	});
	$(".edit_menu li").each(function(num){
		$(this).find("a").click(function(){
			$(".edit_menu li").removeClass("select");
			$(".edit_menu li:eq("+num+")").addClass("select");
			$(".edit_contents").removeClass("select");
			$(".edit_contents:eq("+num+")").addClass("select");
		});
	});
	$(".edit_mypage .close").click(function(e){
		e.stopPropagation();
		$(".edit_mypage").fadeOut(300);
	});

	$(".ul_title li a").each(function(num){
		$(this).click(function(e){
			e.preventDefault();
			$(".info_box").removeClass("select");
			$(".info_box:eq("+num+")").addClass("select");
			$(".ul_title li").removeClass("select");
			$(this).parent().addClass("select");
		});
	});
}

/*edit check*/
function edit_check(){
	check_cl();
	$(".box_group .box").each(function(){
		$(this).click(function(){
			$(".box_group .box").empty().removeClass("select");
			$(this).addClass("select");
			check_cl();
		});
	});
	function check_cl(){
		var check_p = $("<p>").addClass("check").appendTo($(".box_group .select"));
		$("<img/>").attr({
			src:"images/icon_check.gif",
			alt:"선택"
		}).appendTo(check_p);
	}
}
/*정보수정 에러박스 생성*/
//error_box(위치,쓰여질 텍스트)
function error_box(ta,tx){
	var message_box = $("<div>").css({
		position:"absolute",
		zIndex:10,
		left:$(ta).offset().left+294,
		top:$(ta).offset().top,
		width:130,
		height:35,
		padding:"0 0 0 5px",
		background:"url(./images/message_arrow.png) no-repeat left center"
	}).appendTo($(".edit_mypage"));
	$("<p>").css({
		color:"#fff",
		fontSize:"9px",
		lineHeight:"12px",
		padding:"6px 10px",
		margin:0,
		background:"#1d1d1d"
	}).appendTo(message_box).html(tx);
}


/* 마우스 오버효과*/
function mouse_ovot(){
	$(".ovot").mouseenter(function(){
		$(this).find("img").attr("src",$(this).find("img").attr("src").replace(".gif","_c.gif"));
	}).mouseleave(function(){
		$(this).find("img").attr("src",$(this).find("img").attr("src").replace("_c.gif",".gif"));
	});
}
/*reply 삭제버튼 활성화*/
function reply_del(){
	$(".qna .qna_reply li").each(function(){
		$(this).mouseenter(function(){
			$(this).find($(".reply_del")).show();
		}).mouseleave(function(){
			$(this).find($(".reply_del")).hide();
		}).click(function(){
			$(this).empty().remove();
		});
	});
}

/*faq 탭선택 및 질문선택*/
function faq(){
	$(".faq .faq_top li").each(function(num){
		$(this).find("a").click(function(e){
			e.preventDefault();
			$(".faq .faq_top li").removeClass("select");
			$(".faq .faq_top li:eq("+num+")").addClass("select");
			$(".faq .faq_list").removeClass("select");
			$(".faq .faq_list:eq("+num+")").addClass("select");
		});
	});
	$(".faq .faq_middle dl").each(function(num){
		$(this).find("dt a").click(function(e){
			e.preventDefault();
			$(".faq .faq_middle dl").each(function(){
				try{
					$(this).find($(".faq_icon img")).attr("src",$(this).find($(".faq_icon img")).attr("src").replace("minus","plus"));
				}catch(e){
				}
			});
			$(this).find($(".faq_icon img")).attr("src",$(this).find($(".faq_icon img")).attr("src").replace("plus","minus"));
			$(".faq .faq_middle dl").removeClass("select");
			$(this).parent().parent().addClass("select");
		});
	});
}
/*My Collection*/
function my_collection(){
	$(".people_box").mouseenter(function(){
		$(this).find($(".over_box")).css("height",$(this).height()-20);
		$(this).find($(".over_box")).addClass("select");
	}).mouseleave(function(){
		$(this).find($(".over_box")).removeClass("select");
	}).click(function(){
		$(".shadow_back").fadeIn(400, function(){
			$(".main_pbox").fadeIn(400);	
		});
	});
	$(".people_box1").mouseenter(function(){
		$(this).find($(".over_box")).css("height",$(this).height()-20);
		$(this).find($(".over_box")).addClass("select");
	}).mouseleave(function(){
		$(this).find($(".over_box")).removeClass("select");
	});
	$(".main_pbox").css({
		left:(win_w-$(".main_pbox").width())/2,
		top:(win_h-$(".main_pbox").height())/2
	});
	$(".main_pbox .close_bt, .shadow_back").click(function(){
		$(".main_pbox").fadeOut(400, function(){
			$(".shadow_back").fadeOut(400);
		});	
	});
	$(".people_bottom li").click(function(){
		$(".people_bottom li").removeClass("select");
		$(this).addClass("select");
	});
}

/*form 팝업*/
function form_pop(){
	$(".join_formT .log_bt a").click(function(){
		$(".shadow_back").fadeIn(400, function(){
			$(".message_box").fadeIn(400);	
		});
	});
	$(".message_box .bt_box a,.shadow_back").click(function(){
		$(".message_box").fadeOut(400, function(){
			$(".shadow_back").fadeOut(400);
		});
	});
	$(".message_box").css({
		left:(win_w-$(".message_box").width())/2,
		top:(win_h-$(".message_box").height())/2
	});
}
/*회원정보수정*/
function member_change(){
	$(".join_form_box .join2 .change_pass").click(function(){
		$(".shadow_back").fadeIn(400, function(){
			$(".pass_change").fadeIn(400);	
		});
	});
	$(".bt_box .join a").click(function(e){
		e.preventDefault();
		$(".shadow_back").fadeIn(400, function(){
			$(".all_change").fadeIn(400);	
		});
	});
	$(".message_box1 .close_bt a,.shadow_back").click(function(e){
		e.preventDefault();
		$(".message_box1:visible").fadeOut(400, function(){
			$(".shadow_back").fadeOut(400);
		});
	});
	$(".message_box1").css({
		left:(win_w-$(".message_box1").width())/2,
		top:(win_h-$(".message_box1").height())/2
	});		
}
/* resize 이벤트*/
function re_size(){
	win_w = $(window).width();
	win_h = $(window).height();
	$(".shadow_back").css({
		width:win_w,
		height:win_h
	});
	$(".main_pbox").css({
		left:(win_w-$(".main_pbox").width())/2,
		top:(win_h-$(".main_pbox").height())/2
	});
}
/* 구글 맵*/
function initialize() {
	var mapOptions = {
		center: new google.maps.LatLng(37.537355,127.009591), //좌표
		zoom: 15, //확대정도
		mapTypeId: google.maps.MapTypeId.ROADMAP //기본지도사용(위성지도및 기타지도도있음~)
	};
	var map = new google.maps.Map(document.getElementById("map_canvas"),mapOptions);
}
/*select box 효과*/
function select_cl(){
	$(".select_box_").click(function(){
		$(this).find(".select_box").css({
			//"background-position":"right -41px"
		});
	});
}
/*슬라이더*/
function slider(){
	$( ".slider1" ).slider({
		range: "min",
		value: 50,
		min: 0,
		max: 100,
		slide: function( event, ui ) {
			$( "#amount1" ).val( ui.value  + "%" );
		}
	});
	$( "#amount1" ).val( $( ".slider1" ).slider( "value" ) + "%" );
	$( ".slider2" ).slider({
		range: "min",
		value: 50,
		min: 0,
		max: 100,
		slide: function( event, ui ) {
			$( "#amount2" ).val( ui.value  + "%" );
		}
	});
	$( "#amount2" ).val( $( ".slider2" ).slider( "value" ) );
	$( ".slider3" ).slider({
		range: "min",
		value: 50,
		min: 0,
		max: 150,
		slide: function( event, ui ) {
			$( "#amount3" ).val( ui.value );
		}
	});
	$( "#amount3" ).val( $( ".slider3" ).slider( "value" ) );
	$( ".slider4" ).slider({
		range: "min",
		value: 50,
		min: 0,
		max: 150,
		slide: function( event, ui ) {
			$( "#amount4" ).val( ui.value );
		}
	});
	$( "#amount4" ).val( $( ".slider4" ).slider( "value" ) );
	$( ".slider5" ).slider({
		range: "min",
		value: 12,
		min: 0,
		max: 24,
		slide: function( event, ui ) {
			$( "#amount5" ).val( ui.value );
		}
	});
	$( "#amount5" ).val( $( ".slider5" ).slider( "value" ) );
	$( ".slider6" ).slider({
		range: "min",
		value: 50,
		min: 0,
		max: 100,
		slide: function( event, ui ) {
			$( "#amount6" ).val( ui.value );
		}
	});
	$( "#amount6" ).val( $( ".slider6" ).slider( "value" ) );
}