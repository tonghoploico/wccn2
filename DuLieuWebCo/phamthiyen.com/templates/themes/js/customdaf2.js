( function( $ ) {
    function carouselInit() {
        var carousel = $('.cy-carousel');
        carousel.each(function() {
            $(this).find('.cy-carousel-item .card').matchHeight(
                {
                    byRow: false,
                    property: 'height',
                    target: null,
                    remove: false
                }
            );

        });
    }
    carouselInit();
    if ( $('#dwqa-search').length ) {
        $('#dwqa-search').on( 'submit', function(){
            var qs = $('input[name="qs"]').val();
            if ( '' == qs ) {
                alert( "Vui lòng nhập dữ liệu tìm kiếm!" );
                return false;
            }
        });
    }

    var ulParent = $('.child-active').closest('ul');
    var liParent2 =  ulParent.closest('li');
    var ulParent2 =  liParent2.closest('ul');
    ulParent.closest('li').addClass('current');
    ulParent2.closest('li').addClass('current');
    $('.post-detail :header').attr("style", "");
    // $('.post-detail div, .post-detail p').filter(function() {
    $('.post-detail p').filter(function() {
        return $.trim($(this).text()) === '' && $(this).children().length == 0
    }).remove();
    // Forum submit
    if( $('form.dwqa-content-ask-form').length ) {
        $('form.dwqa-content-ask-form').on( 'submit', function(event){
            event.preventDefault();
            var _name = $('input[name="full_name"]').val(),
                _email = $('input[name="inf_contact"]').val(),
                _title = $('input[name="title"]').val(),
                _content = $('textarea[name="content"]').val();

            if ($('input[name="full_name"]').length && '' == _name ) {
                alert( 'Vui lòng nhập Họ và tên.' );
                return false;
            } else if ($('input[name="title"]').length && '' == _title ){
                alert( 'Vui lòng nhập Tiêu đề.' );
                return false;
            } else if ( $('textarea[name="content"]').length && '' == _content ){
                alert( 'Vui lòng nhập Câu hỏi.' );
                return false;
            }else {
                _name = _name.replace(/[&\/\\#+()$~%'":*?<>{}]/g, ''); // string = string.replace(/[^a-zA-Z0-9]/g, '');
                _title = _title.replace(/[&\/\\#+()$~%'":*?<>{}]/g, '');
                $('input[name="user_name"]').val(_name.trim());
                $('input[name="inf_contact"]').val(_email.trim());
                $('input[name="title"]').val(_title.trim());
                $('textarea[name="content"]').val(_content.trim());
            }

            if(!_email || _email!=""){
                var is_email = _email.indexOf("@");
                if( '-1' == is_email ) {
                    // check format mobile phone
                    /*
                    *   Viettel: 09, 03
                        MobiFone: 09, 07
                        VinaPhone: 09, 08
                        Vietnamobile và Gmobile: 09, 05
                        ktra sdt theo 2 tiêu chí:
                        1. Thỏa mãn đầu số
                        2. Có từ 10 số
                    * */
                    var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
                    if (vnf_regex.test(_email) == false) {
                        alert('Bạn vui lòng nhập đúng định dạng số điện thoại đầu số (09 hoặc 03 hoặc 07 hoặc 08 hoặc 05) và đủ 10 số!\nHoặc nhập email của bạn!');
                        return false;
                    }
                } else {
                    // check format email
                    if( !validateEmail(_email) ) {
                        alert('Vui lòng nhập đúng định dạng email!.');
                        return false;
                    }
                }
            }else{
                alert( 'Vui lòng nhập email hoặc số điện thoại.' );
                return false;
            }

            var form = document.getElementById('dwqa-content-ask-form'); 
            var formData = new FormData(form);
            $.ajax({ 
                url: "/?mod=iframe&act=sendhoidap", 
                method: 'POST', 
                data: formData, 
                processData: false, 
                contentType: false, 
                success: function (response) {                       
                     myFunction_Toast('Cảm ơn bạn đã để lại câu hỏi, câu hỏi của bạn đã được gửi tới quản trị viên để xác nhận!');
                }, 
                error: function (xhr, status, error) {                        
                    alert('Câu hỏi của bạn chưa được gửi!\nVui lòng gửi lại sau!'); 
                    console.error(error); 
                } 
            }); 
        });
    }
    function myFunction_Toast(txt) {
      var x = document.getElementById("snackbar");
      x.className = "show";
      x.textContent  = txt;
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }
    function sendForm() {
        var sendForm = $('.icon-text');
        sendForm.on('click', function(e) {
            var offset = $(sendForm.attr('data-top')).offset();
            e.preventDefault();
            $('html, body').animate(
                {
                    scrollTop: offset.top
                },
                600
            );
        });
    }

    sendForm();

    // Van dap submit
    if( $('form.van_dap_form').length ) {
        $('form.van_dap_form').on( 'submit', function(){
            if ( $('input[name="v_author_name"]').length ) {
                var _v_author_name = $('input[name="v_author_name"]').val();
                if ( '' == _v_author_name ) {
                    alert( 'Vui lòng nhập Họ và tên.' );
                    return false;
                } else {
                    _v_author_name = _v_author_name.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
                    $('input[name="v_author_name"]').val( _v_author_name.trim() );
                }
            }

            if ( $('input[name="v_title"]').length ) {
                var _title = $('input[name="v_title"]').val();
                if ( '' == _title ) {
                    alert( 'Vui lòng nhập tiêu đề.' );
                    return false;
                } else {
                    _title = _title.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
                    $('input[name="v_title"]').val( _title.trim() );
                }
            }

            if ( $('textarea[name="v_content"]').length ) {
                var _content = $('textarea[name="v_content"]').val();
                if ( '' == _content ) {
                    alert( 'Vui lòng nhập Câu hỏi.' );
                    return false;
                } else {
                    //_content = _content.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
                    $('textarea[name="v_content"]').val( _content.trim() );
                }
            }

        });
    }


    if( $('form#dwqa-answer-form').length ) {
        $('form#dwqa-answer-form').on( 'submit', function(){
            var _this = $(this);
            var _name = $('input[name="user_name"]', _this).val(),
                _email = $('input[name="user_email"]', _this).val(),
                _content = $('textarea[name="answer_content"]', _this).val();

            if( '' == _name ) {
                alert( 'Vui lòng nhập họ và tên.' );
                return false;
            }

            if(!_email || _email!=""){
                var is_email = _email.indexOf("@");
                if( '-1' == is_email ) {
                    // check format mobile phone
                    /*
                    *   Viettel: 09, 03
                        MobiFone: 09, 07
                        VinaPhone: 09, 08
                        Vietnamobile và Gmobile: 09, 05
                        ktra sdt theo 2 tiêu chí:
                        1. Thỏa mãn đầu số
                        2. Có từ 10 số
                    * */
                    var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
                    if (vnf_regex.test(_email) == false) {
                        alert('Bạn vui lòng nhập đúng định dạng số điện thoại đầu số (09 hoặc 03 hoặc 07 hoặc 08 hoặc 05) và đủ 10 số!\nHoặc nhập email của bạn!');
                        return false;
                    }
                } else {
                    // check format email
                    if( !validateEmail(_email) ) {
                        alert('Vui lòng nhập đúng định dạng email!.');
                        return false;
                    }
                }
            }else{
                alert( 'Vui lòng nhập email hoặc số điện thoại.' );
                return false;
            }

            if( '' == _content ) {
                alert( 'Vui lòng nhập bình luận.' );
                return false;
            }
        });
    }

    // Reply Form
    if( $('.dwqa-comment-form form.comment-form').length ) {

        $('form.comment-form').each( function(){
            $(this).on( 'submit', function(){
                var __name = $(this).find('input[name="user_name"]').val(),
                    __email = $(this).find('input[name="user_email"]').val(),
                    __content = $(this).find('textarea[name="answer_content"]').val();


                if( '' == __name ) {
                    alert( 'Vui lòng nhập họ và tên.' );
                    return false;
                }




                if( '' == __content ) {
                    alert( 'Vui lòng nhập bình luận.' );
                    return false;
                }

                if( '' !== __email ) {
                    // Check if email
                    var is_email = __email.indexOf("@");
                    if( '-1' == is_email ) {
                        // check format mobile phone
                        /*
                        *   Viettel: 09, 03
                            MobiFone: 09, 07
                            VinaPhone: 09, 08
                            Vietnamobile và Gmobile: 09, 05
                            ktra sdt theo 2 tiêu chí:
                            1. Thỏa mãn đầu số
                            2. Có từ 10 số
                        * */
                        var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
                        if (vnf_regex.test(__email) == false) {
                            alert('Số điện thoại của bạn không đúng định dạng: nhập đúng đầu số nhà mạng(09 hoặc 03 hoặc 07 hoặc 08 hoặc 05), và phải có 10 số. Hoặc để trống trường này.');
                            return false;
                        }
                    } else {
                        // check format email
                        if( !validateEmail(__email) ) {
                            alert('Vui lòng nhập đúng định dạng email hoặc để trống trường này.');
                            return false;
                        }
                    }
                }



            });
        });


    }

    // Comment post form
    if( $('#commentform').length ) {
        $('#commentform').on( 'submit', function(){
            event.preventDefault();
            var __name = $(this).find('input[name="user_name"]').val(),
                __email = $(this).find('input[name="user_email"]').val(),
                __content = $(this).find('textarea[name="content"]').val();

            if( '' == __name ) {
                alert( 'Vui lòng nhập họ và tên.' );
                return false;
            }

            if(!__email || __email!=""){
                var is_email = __email.indexOf("@");
                if( '-1' == is_email ) {
                    var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
                    if (vnf_regex.test(__email) == false) {
                        alert('Bạn vui lòng nhập đúng định dạng số điện thoại đầu số (09 hoặc 03 hoặc 07 hoặc 08 hoặc 05) và đủ 10 số!\nHoặc nhập email của bạn!');
                        return false;
                    }
                } else {
                    // check format email
                    if( !validateEmail(__email) ) {
                        alert('Vui lòng nhập đúng định dạng email!.');
                        return false;
                    }
                }
            }else{
                alert( 'Vui lòng nhập email hoặc số điện thoại.' );
                return false;
            }

            if( '' == __content ) {
                alert( 'Vui lòng nhập bình luận.' );
                return false;
            }

            var form = document.getElementById('commentform'); 
            var formData = new FormData(form);
            $.ajax({ 
                url: "/?mod=iframe&act=sendcomment", 
                method: 'POST', 
                data: formData, 
                processData: false, 
                contentType: false, 
                success: function (response) {                       
                     myFunction_Toast('Cảm ơn bạn đã để lại bình luận, bình luận của bạn đã được gửi tới quản trị viên để xác nhận!');
                }, 
                error: function (xhr, status, error) {                        
                    alert('Bình luận của bạn chưa được gửi!\nVui lòng gửi lại sau!'); 
                    console.error(error); 
                } 
            });
        });
    }


    // contact page
    if ( $('#sent_contact').length ) {
        $('#sent_contact').on( 'submit', function( e ) {
            event.preventDefault();
            var __name = $(this).find('input[name="name"]').val(),
                __email = $(this).find('input[name="email"]').val(),
                __content = $(this).find('textarea[name="content"]').val();

            if( '' == __name ) {
                alert( 'Vui lòng nhập họ và tên.' );
                return false;
            }

            if(!__email || __email!=""){
                var is_email = __email.indexOf("@");
                // check format email
                if( !validateEmail(__email) ) {
                    alert('Vui lòng nhập đúng định dạng email!.');
                    return false;
                }
                
            }else{
                alert( 'Vui lòng nhập email!' );
                return false;
            }

            if( '' == __content ) {
                alert( 'Vui lòng nhập bình luận.' );
                return false;
            }

            var form = document.getElementById('sent_contact'); 
            var formData = new FormData(form);
            $.ajax({ 
                url: "/?mod=iframe&act=sendcontact", 
                method: 'POST', 
                data: formData, 
                processData: false, 
                contentType: false, 
                success: function (response) {                       
                    myFunction_Toast('Cảm ơn bạn đã liên hệ, nội dung của bạn đã được gửi tới quản trị viên để xác nhận!');
                    setTimeout(function(){ window.location.reload(); }, 5000);

                }, 
                error: function (xhr, status, error) {                        
                    alert('Liên hệ của bạn chưa được gửi!\nVui lòng gửi lại sau!'); 
                    console.error(error); 
                } 
            });
        });
    }

    // Change caption image
    // $('figcaption').contents().unwrap().wrap('<span class="span-caption"></span>');
    // $('.span-caption').wrapAll('<p class="wp-caption-text"/>');

    if( $('.clb_syn').length ) {
        $('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.slider-nav'
        });
        $('.slider-nav').slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            dots: false,
            arrows: true,
            centerMode: true,
            focusOnSelect: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 414,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    /*  if ( $('#btn_more').length ) {
          $('#btn_more').on( 'click', function(){
              if ( $(this).hasClass('full') ) {
                  $(this).removeClass('full');
                  $('.intro-history-p2 .post-detail-content').css( 'max-height', '310px' );
                  $('.intro-history-p2 .post-detail-content').css( 'overflow', 'hidden' );
                  $('#btn_more').html('Xem thêm<span class="ml-2 icon-next"></span>');

                  var offset_top = $('#intro-history-p2').offset();
                  $('html, body').animate({scrollTop: offset_top.top}, 600);
              } else {
                  $(this).addClass('full');
                  $('.intro-history-p2 .post-detail-content').css( 'max-height', 'inherit' );
                  $('.intro-history-p2 .post-detail-content').css( 'overflow', 'inherit' );
                  $('#btn_more').html('Rút gọn<span class="ml-2 icon-next"></span>');
              }
          });
      }
      */
    if ( $('.btn_more').length ) {
        $('.btn_more').on( 'click', function(){
            if ( $(this).hasClass('full') ) {
                $(this).removeClass('full');
                $(this).closest('.intro-history-p2').find('.post-detail-content').css( 'max-height', '655px' );
                $(this).closest('.intro-history-p2').find('.post-detail-content').css( 'overflow', 'hidden' );
                $(this).html('Xem thêm<span class="ml-2 icon-next"></span>');

                var offset_top = $(this).closest('div[class="intro-history-p2"]').offset();
                $('html, body').animate({scrollTop: offset_top.top}, 600);
            } else {
                $(this).addClass('full');
                $(this).closest('.intro-history-p2').find('.post-detail-content').css( 'max-height', 'inherit' );
                $(this).closest('.intro-history-p2').find('.post-detail-content').css( 'overflow', 'inherit' );
                $(this).html('Rút gọn<span class="ml-2 icon-next"></span>');
                var offset_top = $(this).closest('div[class="intro-history-p2"]').offset();
                $('html, body').animate({scrollTop: offset_top.top}, 600);
            }
        });
    }

    if ( $('.js_see-more-content').length ) {
        $('.js_see-more-content').each(function(){
            $(this).on( 'click', function(){
                let obj_content = $(this).closest('.content-obj-wrap').find('.content-obj-more');
                let obj_text = $(this).attr('data-title');
                if( obj_content.hasClass('hide') ) {
                    obj_content.removeClass('hide');
                    $(this).html('Rút gọn<span class="ml-2 icon-next"></span>');
                    $(this).closest('.content-obj-wrap').find('.content-obj1').addClass('active');
                } else {
                    obj_content.addClass('hide');
                    $(this).html(obj_text + '<span class="ml-2 icon-next"></span>');
                    var offset_top = $(this).closest('.content-obj-wrap').offset();
                    $('html, body').animate({scrollTop: (offset_top.top - 100) }, 600);
                }
            });
        });

        // $('#obj1 .content-obj1').on('click', function(){
        //     let obj_text_1 = $('#obj1 .js_see-more-content').attr('data-title');
        //     $('#obj1 .content-obj-more').addClass('hide');
        //     $(this).removeClass('active');
        //     $('#obj1').find('.js_see-more-content').html(obj_text_1 + '<span class="ml-2 icon-next"></span>');
        // });
        //
        // $('#obj2 .content-obj1').on('click', function(){
        //     let obj_text_2 = $('#obj2 .js_see-more-content').attr('data-title');
        //     $('#obj2 .content-obj-more').addClass('hide');
        //     $(this).removeClass('active');
        //     $('#obj2').find('.js_see-more-content').html(obj_text_2 + '<span class="ml-2 icon-next"></span>');
        // });
    }

    $('.openmore').on( 'click', function(){
        $(this).parents('.sub-menu').find('.none_temp').removeClass('none_temp');
        $(this).parents('.loadmoreopen').remove();
    });
    $('.opendallchild').on('click', function(){
        var id = $(this).attr('data-id');
        if($('.childincate.pr_'+id).hasClass('show')){
            $('.childincate.pr_'+id).removeClass('show');
        }else{
            $('.childincate.pr_'+id).addClass('show');
        }
    });

    // scroll menu
    var lastScrollTop = 0, delta = 5;
    $(window).scroll(function(){
        var nowScrollTop = $(this).scrollTop();
        if(Math.abs(lastScrollTop - nowScrollTop) >= delta){
            if (nowScrollTop > lastScrollTop ){
                // ACTION ON
                // SCROLLING DOWN
                if ( nowScrollTop > 100 ) {
                    $('.menu-short').hide();
                }
            } else {
                // ACTION ON
                // SCROLLING UP
                $('.menu-short').css('position', 'fixed');
                $('.menu-short').show();
            }
            lastScrollTop = nowScrollTop;
        }
    });

    function subCategory(){
        if ( $('.sub-category-tab-slider .frame').length ) {
            var $frame = $('.sub-category-tab-slider .frame');
            var $wrap = $frame.parent();
            $frame.sly({
                horizontal: 1,
                itemNav: 'basic',
                smart: 0,
                activateOn: 'click',
                mouseDragging: 1,
                touchDragging: 1,
                releaseSwing: 1,
                startAt: 0,
                scrollBar: $wrap.find('.scrollbar'),
                scrollBy: 1,
                pagesBar: $wrap.find('.pages'),
                activatePageOn: 'click',
                speed: 300,
                elasticBounds: 1,
                easing: 'easeOutExpo',
                dragHandle: 1,
                dynamicHandle: 1,
                clickBar: 1,
            });
        }
    }
    // subCategory();

    function scrollMenu_BK(){
        if ( $('.menu-slider .frame').length ) {
            var $frame = $('.menu-slider .frame');
            var $wrap = $frame.parent();
            var sly = new Sly('#frame');
            $frame.sly({
                horizontal: 1,
                itemNav: 'basic',
                smart: 0,
                activateOn: 'click',
                mouseDragging: 1,
                touchDragging: 1,
                releaseSwing: 1,
                startAt: 5,
                scrollBar: $wrap.find('.scrollbar'),
                scrollBy: 1,
                cancelable:false,
                pagesBar: $wrap.find('.pages'),
                activatePageOn: 'click',
                speed: 300,
                elasticBounds: 1,
                easing: 'easeOutExpo',
                dragHandle: 1,
                dynamicHandle: 1,
                clickBar: 1,
            });
        }
    }

    function force_height(){
        if ( $('body').hasClass('archive_tin_tuc') && $('body').hasClass('wp_mobile') ) {} else {
            $('.news-listing .news-item').matchHeight(
                {
                    byRow: false,
                    property: 'height',
                    target: null,
                    remove: false
                }
            );
        }
    }
    force_height();

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    window.onload = function() {
        function scrollMenu(){
            if ( $('.menu-slider .frame').length ) {
                var $frame = $('.menu-slider .frame');
                var $wrap = $frame.parent();
                var sly = new Sly('.menu-slider .frame', {
                    horizontal: 1,
                    itemNav: 'basic',
                    smart: 0,
                    activateOn: 'click',
                    mouseDragging: 1,
                    touchDragging: 1,
                    releaseSwing: 1,
                    startAt: 0,
                    scrollBar: $wrap.find('.scrollbar'),
                    scrollBy: 1,
                    cancelable:false,
                    pagesBar: $wrap.find('.pages'),
                    activatePageOn: 'click',
                    speed: 300,
                    elasticBounds: 1,
                    easing: 'easeOutExpo',
                    dragHandle: 1,
                    dynamicHandle: 1,
                    clickBar: 1,
                }).init();
                if ( $('#menu-focus-menu li').length ) {
                    $('#menu-focus-menu li').each(function(i, l){
                        if ( $(this).hasClass('current-menu-item') ) {
                            sly.toStart(i);
                        }
                    });
                }
            }
        }
        scrollMenu();

        // custom next previous
        if( $('.slick-custom-arrow').length ) {
            $('.slick-custom-arrow').each(function(){
                $(this).on('click', function(){
                    if ( $(this).hasClass('prev') ) {
                        $(this).parent().parent().find('.cy-carousel').slick('slickPrev');
                    } else {
                        $(this).parent().parent().find('.cy-carousel').slick('slickNext');
                    }
                });
            });
        }

        if( $('.cy-prev-next .slick-custom-arrow').length ) {
            $('.cy-prev-next .slick-custom-arrow').each(function(){
                $(this).on('click', function(){
                    console.log("clicked");
                    if ( $(this).hasClass('prev') ) {
                        $(this).closest('.cy-carousel').slick('slickPrev');
                    } else {
                        $(this).closest('.cy-carousel').slick('slickNext');
                    }
                });
            });
        }

        if( $('.special-item-wrapper .special-item').length ) {
            $('.special-item-wrapper .special-item .card').matchHeight(
                {
                    byRow: false,
                    property: 'height',
                    target: null,
                    remove: false
                }
            );
        }

        $('.head-content-page .home-top-slider').css('max-height', 'inherit');
    };

} )( jQuery );


$('#countries_id_change').select2();
$('#provinces_id_change').select2();
$('#district_id_change').select2();