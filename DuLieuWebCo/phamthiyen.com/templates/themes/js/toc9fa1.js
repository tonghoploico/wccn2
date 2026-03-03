$((function () {
    function t(t) {
        // var e = $("span." + t.replace("#", ""));
        var e = $("#" + t.replace("#", ""));
        if (e.length) {
            var o = 120, n = $("#admin_bar");
            n.length > 0 && n.is(":visible") && (o += n.height()), $(document.documentElement, document.body).animate({scrollTop: e.offset().top - o}, 1e3), window.location.hash = t
        }
    }

    window.location.hash && $(".toc-containers ul").length && t(window.location.hash), $(document).on("click", '.toc-containers ul a[href^="#"]', (function (e) {
        $('.toc-containers li a').removeClass('active');
        $(this).addClass('active');
        e.preventDefault(), t($(e.currentTarget).attr("href"))
    }));
    var e = $(".toc-container p.toc_title");

    function o() {
        e.find("a").html(e.data("hide-text")), $(".toc-container").addClass("contracted"), $(".toc-container ul:first").show("fast")
    }

    "1" == localStorage.getItem("visibilityTextToC") && o(), $(document).on("click", "span.toc_toggle a", (function (t) {
        t.preventDefault(), $(t.currentTarget).closest(".toc-container").hasClass("contracted") ? (localStorage.setItem("visibilityTextToC", "0"), e.find("a").html(e.data("show-text")), $(".toc-container ul:first").hide("fast"), $(".toc-container").removeClass("contracted")) : (localStorage.setItem("visibilityTextToC", "1"), o())
    }));
    $('.toc_btn').click(function (e) {
        e.preventDefault();
        $('.toc_content').slideToggle(300)
    });
    $('.toc_close').click(function (e) {
        e.preventDefault();
        $('.toc_content').css('display', 'none')
    });
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 450 && $(window).scrollTop() < $('.card-body_dt').height()) {
            $('.toc_btn').addClass('show');
        } else {
            $('.toc_btn').removeClass('show');
            $('.toc_content').css('display', 'none')
        }
    });
    $('.toc_fixed li a').click(function (e) {
        e.preventDefault();
        $('.toc_content').css('display', 'none')
    });
        $vWidth = $(window).width();
        if($vWidth < 767){
            $('.toc_btn').click(function (e) {
                e.preventDefault();
                $('body,html').addClass('hidden')
            });
            $('.toc_fixed li a').click(function (e) {
                e.preventDefault();
                $('body,html').removeClass('hidden')
            });
            $('.toc_close').click(function (e) {
                e.preventDefault();
                $('body,html').removeClass('hidden')
            });
        }
}));
