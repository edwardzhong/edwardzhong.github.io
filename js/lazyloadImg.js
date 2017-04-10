// 图片延时加载
var Imgs=$('.img-placeholder');
function lazyLoadImg(){
	var st=$(window).scrollTop(),
		wh=$(window).height();
	for(var i=0;i<Imgs.length;i++){
		var item=$(Imgs[i]);
		var ot=item.offset().top;
		var src=item.attr('src');
		if(st+wh>ot){
			item.replaceWith('<img src="'+src+'">');
			Imgs.splice(i--,1);
		}
	}
	return false;
}

scrollEventCtr(lazyLoadImg);