$(function(){
	// 场景设置
	for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 20; j++) {
	// var r = Math.floor(Math.random()*20)
	// var g = Math.floor(Math.random()*256)
	// var b = Math.floor(Math.random()*20)
	$('<div>')
	.addClass('block')
	.attr('id',i+'-'+j)
	.css({
		'backgroundColor':'#0C6E00'
	})
	.appendTo('.changjing')
		};		
	};
	
   //为蛇定义一个表格
   var she = [
     {
     	x:5,
     	y:3
     },
     {
     	x:5,
     	y:4
     },
     {
     	x:5,
     	y:5
     }
   ];
   var biaoge1={
   	'0-0':true,
   	'0-1':true,
   	'0-2':true

   }

   // 添加蛇类
  for (var i = 0; i < she.length ; i++) {
  	 $('#'+she[i].x+'-'+she[i].y)
  	 .addClass('she');
  }

  //添加食物类
  function fangshiwu(){
  	var a = Math.floor(Math.random()*20);
  	var b = Math.floor(Math.random()*20);
  	$('#' + a + '-' + b).addClass('shiwu');
  	return{
  		x: a,
  		y: b
  	};
  }
  var shiwu = fangshiwu();
  fangxiang = 'you';

   // 让蛇移动起来
   var move = function(){
   	var jiutou = she[she.length - 1];
   	//撞墙
   	if(fangxiang === 'you'){
   		var xintou ={
   			x:jiutou.x,
   			y:jiutou.y+1
   		}

   		if (xintou.y>19){
          $('<div>')
          .addClass('jieshu')
          .appendTo('.changjing');
          zanting();
          return
   		} 
   	}
     if (fangxiang === 'zuo') {
       var xintou = {
           x:jiutou.x,
           y:jiutou.y - 1
       }
       if (xintou.y<0) {
         $('<div>').addClass('jieshu').appendTo('.changjing');
         zanting();
         return
       }
     }

     if (fangxiang === 'xia') {
       var xintou = {
           x:jiutou.x + 1,
           y:jiutou.y
       }
       if (xintou.x>19) {
         $('<div>').addClass('jieshu').appendTo('.changjing');
         zanting();
         return
       }
     }

     if (fangxiang === 'shang') {
       var xintou = {
           x:jiutou.x - 1,
           y:jiutou.y 
       }
       if (xintou.x<0) {
         $('<div>').addClass('jieshu').appendTo('.changjing');
         zanting();
         return
       }
     }
     if(biaoge1[xintou.x+'-'+xintou.y]){
     	$('<div>').addClass('jieshu').appendTo('.changjing');
     	console.log('装自己');
     	zanting();
     	return;
     }

     //插入新头  减去尾巴
     she.push(xintou);
     biaoge1[xintou.x+'-'+xintou.y]=true;
     $('#'+xintou.x + '-' + xintou.y).addClass('she');
     if (xintou.x === shiwu.x && xintou.y === shiwu.y){
        $('#' + shiwu.x + '-' + shiwu.y).removeClass('shiwu');
        shiwu = fangshiwu();
     }else{
     	var weiba = she.shift();
     	delete biaoge1[weiba.x + '-' + weiba.y];
     	$('#' + weiba.x + '-' + weiba.y).removeClass('she');
     }

   }

   // 移动
   var yidong;
   var kaishi=function(){
   	yidong=setInterval(move,200);
   }
   var zanting=function(){
   	clearInterval(yidong)
   }
   $(document).on('keyup',function(e){
   	e.precentDefault;
   	var biao2={
   		'zuo':37,
   		'you':39,
   		'shang':38,
   		'xia':40
   	}
   	if (Math.abs(e.keyCode-biao2[fangxiang])===2){
   		return
   	}
   	if (e.keyCode === 37) {
   		fangxiang = 'zuo';
   	}
   	if (e.keyCode === 39) {
   		fangxiang = 'you';
   	}
   	if (e.keyCode === 38) {
   		fangxiang = 'shang';
   	}
   	if (e.keyCode === 40) {
   		fangxiang = 'xia';
   	}
   });
   $('.play').on('click',function(){
      	kaishi();
      	$('.play').toggle()
   })

   $('.kaichang').on('click',function(){
     	$('.kaichang').toggleClass('animation');
     	$('.kaichang').toggle(3000)
     })

    })
 