/**
 * Created by Administrator on 2017/3/27.
 */
$(function () {
    //获取报价
    $('.j_get').click(function () {
        $('body').css('overflow-y', 'hidden');
        $('#let-talk-window').css('margin-top', $(window).scrollTop()).show();
        $('#let-talk-window form').show();
        $('#let-talk-window .input-box').find('input[type=\'text\'], textarea').val('');
        $('#let-talk-window form .yzm img').attr('src', 'image/verifycode.gif?w=120&amp;h=40&amp;i=2&amp;rand='+Math.random());
        $('.response').remove();
        return false;
    });
    //banner部分
    $(function () {
        if($(window).width()<=768){
            $('.banner .banner-slides li').eq(0).remove();
            $('.banner .banner-slides li').eq(0).addClass('active');
            bannerFun();
        }else{
            $('.banner .banner-slides video').hide().bind('canplay', function(){
                $(this).show();
                $(window).resize(function(){
                    if ( $('header nav .phone').is(':hidden') ) $('.banner').height(parseInt(720*($(window).width()/1280)));
                });
            });
            bannerFun();
        }
        function bannerFun(){
            $('.banner').height($(window).height());
            var curIndex = 0;
            var minIndex = 0;
            var maxIndex = $('.banner .banner-slides li').length - 1;
            $('.banner .arrows').html('');
            for(var i=0; i<=maxIndex; i++){
                $('.banner .arrows').append('<li></li>');
            }
            $('.banner .arrows li').eq(0).addClass('active');
            var getIndex = function(index){
                if(index <= minIndex){
                    curIndex = minIndex;
                    return curIndex;
                }else if(index >= maxIndex){
                    curIndex = maxIndex;
                    return curIndex;
                }else{
                    curIndex = index;
                    return curIndex;
                }
            };

            //鼠标图点击事件
            $('.banner .next').click(function(){
                if(curIndex + 1 > maxIndex){
                    $('.banner').slideUp('300', function(){
                        $('.indHeader2').parent().css({ 'height':$('.indHeader2').outerHeight(true) });
                        $('.indHeader2').addClass('on');
                    });
                }else{
                    $('.banner .banner-slides li').eq(curIndex).removeClass('active').fadeOut('300');
                    $('.banner .banner-slides li').eq(getIndex(curIndex+1)).fadeIn('300', function(){$(this).addClass('active')});
                    $('.banner .arrows li').eq(curIndex).addClass('active').siblings().removeClass('active');
                }
            });

            //li按钮点击事件
            $('.banner .arrows li').each(function(index){
                $(this).click(function(){
                    if(curIndex != index){
                        $(this).addClass('active').siblings().removeClass('active');
                        $('.banner .banner-slides li').eq(curIndex).removeClass('active').fadeOut('300');
                        $('.banner .banner-slides li').eq(getIndex(index)).fadeIn('300', function(){$(this).addClass('active')});
                    }
                });
            });

            //手机端触摸事件
            var startPos = 0,
                endPos = 0;
            $('.banner').bind('touchstart', function(e){
                startPos = e.originalEvent.targetTouches[0].screenY;
                endPos = 0;
            });
            $('.banner').bind('touchmove', function(e){
                e.preventDefault();
                endPos = e.originalEvent.targetTouches[0].screenY;
            });
            $('.banner').bind('touchend', function(){
                var v = endPos - startPos;
                if(Math.abs(v) > 20 && endPos != 0){
                    if(v < 0){
                        if(curIndex + 1 > maxIndex){
                            $('.banner').slideUp('300', function(){
                                $('.indHeader2').parent().css({ 'height':$('.indHeader2').outerHeight(true) });
                                $('.indHeader2').addClass('on');
                            });
                        }else{
                            $('.banner .banner-slides li').eq(curIndex).removeClass('active').fadeOut('300');
                            $('.banner .banner-slides li').eq(getIndex(curIndex+1)).fadeIn('300', function(){$(this).addClass('active')});
                            $('.banner .arrows li').eq(curIndex).addClass('active').siblings().removeClass('active');
                        }
                    }else{
                        if(curIndex - 1 < minIndex){
                        }else{
                            $('.banner .banner-slides li').eq(curIndex).removeClass('active').fadeOut('300');
                            $('.banner .banner-slides li').eq(getIndex(curIndex-1)).fadeIn('300', function(){$(this).addClass('active')});
                            $('.banner .arrows li').eq(curIndex).addClass('active').siblings().removeClass('active');
                        }
                    }
                }
            });

            //鼠标滚动事件
            $('.banner .banner-slides').bind('mousewheel', function(event, delta, deltaX, deltaY){
                if(deltaY < 0){
                    if(curIndex + 1 > maxIndex){
                        event.preventDefault();
                        $('.banner').slideUp('300', function(){
                            $('.indHeader2').parent().css({ 'height':$('.indHeader2').outerHeight(true) });
                            $('.indHeader2').addClass('on');
                        });
                    }else{
                        event.preventDefault();
                        $('.banner .banner-slides li').eq(curIndex).removeClass('active').fadeOut('300');
                        $('.banner .banner-slides li').eq(getIndex(curIndex+1)).fadeIn('300', function(){$(this).addClass('active')});
                        $('.banner .arrows li').eq(curIndex).addClass('active').siblings().removeClass('active');
                    }
                }else{
                    if(curIndex - 1 >= minIndex){
                        $('.banner .banner-slides li').eq(curIndex).removeClass('active').fadeOut('300');
                        $('.banner .banner-slides li').eq(getIndex(curIndex-1)).fadeIn('300', function(){$(this).addClass('active')});
                        $('.banner .arrows li').eq(curIndex).addClass('active').siblings().removeClass('active');
                    }
                }
            });

            //滚动条事件
            $(window).scroll(function(){
                //滚动条垂直位置小于或等于0时：显示被掩藏的class为banner的div
                if($(window).scrollTop() <= 0){
                    $('.banner').slideDown('300');
                }
            });

            //window窗口变化事件
            $(window).resize(function(){
                $('.banner').height($(window).height());
            });

        }

        //导航图标点击事件
        var isShowNav = true;
        $('.navBtn').each(function(){
            var _this = $(this);
            _this.click(function(e){
                e.stopPropagation();
                if( isShowNav ){
                    _this.parent().addClass('menuOn');
                    _this.addClass('on');
                    _this.siblings('.phoneNav').addClass('on');
                    isShowNav = false;
                }else{
                    _this.parent().removeClass('menuOn');
                    _this.removeClass('on');
                    _this.siblings('.phoneNav').removeClass('on');
                    isShowNav = true;
                }
            });
        });

        $(window).scroll(function(){
            if( $('.indHeader2').parent().offset().top <= $(window).scrollTop() ){
                $('.indHeader2').parent().css({ 'height':$('.indHeader2').outerHeight(true) });
                $('.indHeader2').addClass('on');
                $('.indHeader').addClass('unon');
            }else{
                $('.indHeader2').parent().removeAttr('style');
                $('.indHeader2').removeClass('on');
                $('.indHeader').removeClass('unon');
            }
        });
        if ( $('header nav .phone').is(':hidden') ) {
            $('.banner').height(parseInt(720*($(window).width()/1280)));
        }

    });

//    服务部分
    $(function(){
        //获取class为marketing-slider的div
        var s = $('.marketing-slider');
        //遍历class为slides的ul
        var sUl = s.find('.slides');
        //遍历ul下面的li
        var sLi = s.find('.slides li');
        //获取li的长度
        var sLength = s.find('.slides li').length;
        //获取s的宽度
        var vWidth = s.outerWidth();
        var vNum = 3;
        //显示的每张图片的宽度
        var sLiBigWidth = vWidth / vNum;
        //每张图片的宽度
        var sLiSmallWidth = sLiBigWidth * 0.8;

        var isScroll = true;
        var sTime = null;

        //在li前面复制
        for( var i = sLength; i >= 1; i--){
            sLi.eq(i-1).clone().addClass('clone').removeClass('active').css({'width': sLiSmallWidth,'margin-top': (sLiBigWidth-sLiSmallWidth) /2}).prependTo(sUl);
        }
        //在li后面复制
        for( var i = 1; i <= sLength; i++){
            sLi.eq(i-1).clone().addClass('clone').removeClass('active').css({'width': sLiSmallWidth,'margin-top': (sLiBigWidth-sLiSmallWidth) /2}).appendTo(sUl);
        }
        var sInit = function(){
            if( !sTime ){
                clearTimeout(sTime);
            }

            vWidth = s.outerWidth();
            sLiBigWidth = vWidth / vNum;
            sLiSmallWidth = sLiBigWidth * 0.8;

            sUl.css({'left': -(sLength * sLiSmallWidth)+'px', 'width': ( sLength * sLiSmallWidth * 2) + (( sLength -3 ) * sLiSmallWidth) + (3 * sLiBigWidth) +'px'});
            sLi = s.find('.slides li');
            sLi.removeClass('active').css({'width': sLiSmallWidth,'margin-top': (sLiBigWidth-sLiSmallWidth) /2 });
            for( var i=sLength; i< sLength+vNum; i++ ){
                sLi.eq(i).addClass('active').css({'width': sLiBigWidth,'margin-top':0 });
            }
            s.find('.arrow').css({'top': sLiBigWidth/2 });
            s.height(sUl.height());
            setTimeout(function(){
                s.height(sUl.height());
            },600);
        };
        sInit();

        var slider_arrow_prev = function(){
            if( !isScroll ){
                return;
            }
            isScroll = false;

            sLi = s.find('.slides li');
            sLi.removeClass('active').css({'width': sLiSmallWidth,'margin-top': (sLiBigWidth-sLiSmallWidth) /2 });
            for( var i=sLength-vNum+1; i< sLength+1; i++ ){
                sLi.eq(i).addClass('active').css({'width': sLiBigWidth,'margin-top':0 });
            }

            sUl.css({'left': (parseInt(sUl.css('left'))) - (sLiSmallWidth * 3) });
            s.find('.slides li:gt('+(sLength*3 -vNum)+')').prependTo(sUl);
            sUl.animate({'left': (sLiSmallWidth * 3) + (parseInt(sUl.css('left')))  },1000,'swing',function(){ isScroll = true;});
        };

        var slider_arrow_next = function(){
            if( !isScroll ){
                return;
            }
            isScroll = false;

            sLi = s.find('.slides li');
            sLi.removeClass('active').css({'width': sLiSmallWidth,'margin-top': (sLiBigWidth-sLiSmallWidth) /2 });
            for( var i=sLength+vNum; i< sLength+(vNum*2); i++ ){
                sLi.eq(i).addClass('active').css({'width': sLiBigWidth,'margin-top':0});
            }

            sUl.css({'left': (sLiSmallWidth * 3) + (parseInt(sUl.css('left'))) +'px'});
            s.find('.slides li:lt('+(vNum)+')').appendTo(sUl);
            sUl.animate({'left': (parseInt(sUl.css('left'))) - (sLiSmallWidth * 3) },1000,'swing',function(){ isScroll = true;});
        }

        s.find('.arrow li').eq(0).click(function(){
            slider_arrow_prev();
        });
        s.find('.arrow li').eq(1).click(function(){
            slider_arrow_next();
        });

        $(window).resize(function(){
            sInit();
        });
    });
    
    $(function () {
        var sysPro = function(obj){
            var obj = $(obj);
            var objBigBox = obj.find('.slides');
            var objSmallBox = obj.find('.slides li');
            var objSBLength = obj.find('.slides li').length;
            var viewWidth = obj.outerWidth();
            var smallBoxWidth = viewWidth;
            var bigBoxWidth = ((objSBLength - 1) * smallBoxWidth) + viewWidth;

            var init = function(){
                viewWidth = obj.outerWidth();
                smallBoxWidth = viewWidth;
                bigBoxWidth = ((objSBLength - 1) * smallBoxWidth) + viewWidth;
            }

            obj.find('.pic-slides-bd').css({'width': bigBoxWidth+'px'});
            objSmallBox.css({'width': viewWidth+'px'});
            objSmallBox.eq(0).addClass('active');
            obj.siblings('.txt-slides').find('.txt-slider-item').eq(0).addClass('active');
            objBigBox.css({'position':'relative','left': -(obj.find('.active').index() * smallBoxWidth)+'px','top':'0','width': bigBoxWidth+'px'});
            obj.find('.arrow').css({'top': (obj.find('.active .pic').height() / 2)+'px'})

            var currentSmallBox = obj.find('.active');
            var currentIndex = currentSmallBox.index() + 1;
            var currentLeft = '0';


            var boxscroll = function(){
                objSmallBox.css({'width': viewWidth+'px'});
                obj.find('.pic-slides-bd').css({'width': bigBoxWidth+'px'});
                objSmallBox.eq(currentIndex-1).addClass('active').siblings().removeClass('active');

                currentLeft = -((currentIndex-1)*smallBoxWidth);
                objBigBox.css({'left': currentLeft+'px'});
                obj.siblings('.txt-slides').find('.txt-slider-item').eq(currentIndex-1).addClass('active').siblings().removeClass('active');
            }


            var arrowPrev = function(){
                if ( currentIndex <= objSBLength && currentIndex > 1){
                    currentIndex -= 1;
                    boxscroll();
                }
            }
            var arrowNext = function(){
                if ( currentIndex < objSBLength && currentIndex >= 1){
                    currentIndex += 1;
                    boxscroll();
                }
            }
            objSmallBox.each(function(index){
                var _this = $(this);
                _this.click(function(){
                    currentIndex = $(this).index()+1;
                    boxscroll();
                });
            });

            obj.siblings('.arrow').find('li').eq(0).click(function(){
                arrowPrev();
            });
            obj.siblings('.arrow').find('li').eq(1).click(function(){
                arrowNext();
            });
        }
        $(function(){
            sysPro('.sysPro-slider .pic-slides');
        });
    })
});