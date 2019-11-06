//声明一些全局变量
var index=0,//当前显示图片的索引，默认值为0，
	timer = null,
	main = byId("main"),
	prev = byId("prev"),
	next = byId("next"),
	pics = byId("banner").getElementsByTagName("div"),
	dots = byId("dots").getElementsByTagName("span"),
	banner = byId("banner"),
	menuContent = byId("menu-content"),
	menuItems = menuContent.getElementsByClassName("menu-item"),
	subMenu = byId("sub-menu"),
	innerBox = subMenu.getElementsByClassName("inner-box"),
	size = pics.length;
	






//封装getElementById()
function byId(id) {
	return typeof(id) === "string" ? document.getElementById(id):id;
}

/*
封装通用事件绑定方法
	element绑定事件的DOM元素
	事件名
	事件处理程序
*/
function addHandler(element,type,handler){
	//非IE浏览器
	if(element.addEventListener){
		element.addEventListener(type,handler,true);
	}else if(element.attachEvent){
		element.attachEvent("on"+type,handler);
	}else{
		element["on"+type] = handler;
	}
}

//清除定时器，停止自动轮播
function stopAutoPlay(){
	if(timer){
		clearInterval(timer);
	}
}

//自动轮播
function startAutoPlay(){
	timer = setInterval(function(){
		index++;
		if(index>=size) index=0;
		changeImg();
	},3000)
}

//切换图片
function changeImg(){
	for(var i=0;i<size;i++){
		pics[i].style.display = "none";
		dots[i].className = "";
	}
	pics[index].style.display = "block";
	dots[index].className = "active";
}
//点击下一张按钮显示下一张图片
addHandler(next,"click",function(){
	index++;
	if(index>=size) index=0;
	changeImg();
})

//点击上一张按钮显示上一张图片
addHandler(prev,"click",function(){
	index--;
	if(index<0) index = size-1;
	changeImg();
})

for(var d=0;d<size;d++){
	dots[d].setAttribute("data-id",d);
	addHandler(dots[d],"click",function(){
		index = this.getAttribute("data-id");
		changeImg();
	})
}

//鼠标划过主菜单
for(var m=0,idx,mlen=menuItems.length;m<mlen;m++){
	menuItems[m].setAttribute("data-index",m);
	addHandler(menuItems[m],"mouseover",function(){
		subMenu.className = "sub-menu";
		idx = this.getAttribute("data-index");
		for(var j=0,jlen=innerBox.length;j<jlen;j++){
			innerBox[j].style.display = "none";
			menuItems[j].style.background = "none";
		}
		innerBox[idx].style.display = "block";
		menuItems[idx].style.background = "rgba(0,0,0,0.1)";
	})
}

addHandler(banner,"mouseout",function(){
	subMenu.className="sub-menu hide";
})

addHandler(menuContent,"mouseout",function(){
	subMenu.className="sub-menu hide";
})

addHandler(subMenu,"mouseover",function(){
	this.className = "sub-menu";
})

addHandler(subMenu,"mouseout",function(){
	this.className = "sub-menu hide";
})

//鼠标滑入main,停止轮播
addHandler(main,"mouseover",stopAutoPlay);

//鼠标滑入main,停止轮播
addHandler(main,"mouseout",startAutoPlay);

//自动轮播
startAutoPlay();