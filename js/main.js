/** Menu **/
$('.menu_dropdown').click(function(){ 
	if ($('.orchestra_menu').css('display') == "none"){
		$('.orchestra_menu').slideDown('slow');
		$('.maincontent').addClass('menumargin');
		$('.reports ul li').css('width','18.7%');
	}
	else {
		$('.orchestra_menu').slideUp('slow');
		$('.maincontent').removeClass('menumargin');
		$('.reports ul li').css('width','');
	}
});

$('.orchestra_menu ul li, .orchestra_mobile_menu ul li').click(function(){
	if ($(this).children('ul').css('display') == "none"){
		$(this).children('ul').slideDown('slow');
		$(this).children('a').children('em').removeClass('glyphicon-menu-down').addClass('glyphicon-menu-up');
	}
	else {
		$(this).children('ul').slideUp('slow');
		$(this).children('a').children('em').removeClass('glyphicon-menu-up').addClass('glyphicon-menu-down');
	}
	$(this).siblings().children('ul').slideUp('slow').parent().children('a').children('em').removeClass('glyphicon-menu-up').addClass('glyphicon-menu-down');
});

$(window).on('resize', function(){
	$('.orchestra_menu').hide();
	$('.maincontent').removeClass('menumargin');
});

/** Fav **/
$('.reports .favorite_reports_list').click(function(){
	var imgpath = $(this).children('.reports_fav_content').children().attr("src").split('/');
	var filename = imgpath[imgpath.length-1];
	var imgname = filename.split('.')[0]
	if(imgname == 'fav_icon'){
		$(this).children('.reports_fav_content').children().attr("src", 'images/fav_icon_disable.png');
	}
	else{
		$(this).children('.reports_fav_content').children().attr("src", 'images/fav_icon.png');
	}
});

/** Jobs Setting **/
$('.setting-open').on('click', function(){
	$(this).next('.settings-in-open').show();
});
$('.icon-close').on('click', function(){
	$(this).parent().parent('.settings-in-open').hide();
});
/** Modal Tabs **/
$('.tab-info-footer-button').on('click', function(){
	$('.popup-tabs li').removeClass('current-tab');

	var getIndex = $(this).closest('.modal-tab-info').index();
	$('.popup-tabs li').eq(getIndex).addClass('current-tab');
	$('.popup-tabs li').removeClass('current-tab');
	$('.modal-tab-info').css('display','');			
	
	if($(this).hasClass('tab-info-previous')){
		$('.popup-tabs li').eq(getIndex - 1).removeClass('previous-tab');
		$('.popup-tabs li').eq(getIndex - 1).addClass('current-tab');
		$('.modal-tab-info').eq(getIndex - 1).css('display','block');
	} else if($(this).hasClass('tab-info-finish')){
		$('.popup-tabs li').eq(getIndex).addClass('previous-tab');
		$('.popup-tabs li').eq(getIndex).addClass('current-tab');
		$('.modal-tab-info').eq(getIndex).css('display','block');
	}
	else {
		$('.popup-tabs li').eq(getIndex).addClass('previous-tab');
		$('.popup-tabs li').eq(getIndex + 1).addClass('current-tab');
		$('.modal-tab-info').eq(getIndex + 1).css('display','block');
	}
});