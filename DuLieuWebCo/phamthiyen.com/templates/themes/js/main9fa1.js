"use strict";
!function (l, d) {
    function e() {
        var e = l(".section-post-lotus .poster");
        991 < l(d).width() ? e.css({height: "100%", width: 2 * e.height() / 3}) : e.css({
            width: "100%",
            height: e.width() / 3.3
        })
    }

    l(function () {
        var n, s, o, i, e;

        function a() {
            l("#splash").hasClass("fadeInDown") && l("#splash").removeClass("fadeInDown"), l("#splash").addClass("fadeOutUp"), l(".page-home").css("visibility", "visible"), l(".page-home .head-content-page").addClass("animated slow zoomIn"), l("html, body").css("overflow", "hidden"), l(".menu-short").css("z-index", 999), l(".head-content-page").css("z-index", 1e3), l(".header").css("z-index", 1001), l(".splash-on .header").css("background-color", "#314d39"), l(d).scrollTop(0), setTimeout(function () {
                l("html, body").css("overflow", "auto")
            }, 800)
        }

        function t(e, n, s) {
            var o = new Date;
            o.setTime(o.getTime() + 24 * s * 60 * 60 * 1e3);
            var i = "expires=" + o.toUTCString();
            document.cookie = e + "=" + n + ";" + i + ";path=/"
        }

        function c(e) {
            for (var n = e + "=", s = document.cookie.split(";"), o = 0; o < s.length; o++) {
                for (var i = s[o]; " " == i.charAt(0);) i = i.substring(1);
                if (0 == i.indexOf(n)) return i.substring(n.length, i.length)
            }
            return ""
        }

        
        l("#menu-toggle").click(function () {
            l(this).toggleClass("open"), l("#overlay-menu").addClass("open"), l("body").addClass("menu-open"), l("html, body").css("overflow", "hidden"), setTimeout(function () {
                l("#overlay-menu").css("overflowY", "auto")
            }, 200)
        }), l(".icon-close").click(function () {
            l("#overlay-menu").removeClass("open").css("overflowY", "hidden"), l("body").removeClass("menu-open"), l("body").hasClass("splash-on") || l("html, body").css("overflow", "auto")
        }), l('<a class="icon-down icon-collapse noselect"></a>').prependTo(".main-menu .menu-item-has-children"), l(".main-menu .sub-menu").addClass("collapse"), l(".icon-collapse").click(function () {
            l(this).toggleClass("active").parent().children(".sub-menu").collapse("toggle")
        }), l(".video-on").click(function () {
            n = l(this).data("src")
            n = "https://youtube.com/embed/" + getId(n);
            console.log(n);
        }), l("#ytbModal").on("shown.bs.modal", function (e) {
            l("#ytbVideo").attr("src", n)
        }), l("#ytbModal").on("hide.bs.modal", function (e) {
            l("#ytbVideo").attr("src", n)
        }), l("body").on("click", function (e) {
            0 == l(e.target).closest(".head-menu-search").length && (600 < d.innerWidth ? l(".nav-menu").delay(400).fadeIn(300) : l(".head-menu").css("visibility", "hidden"))
        }), i = !1, l(".brand > a ").on("click", function (e) {
            e.preventDefault(), l("body").addClass("splash-on"), l("#splash").hasClass("fadeOutUp") && l("#splash").removeClass("fadeOutUp"), l("#splash").addClass("fadeInDown"), l(".splash-on .header").css("background-color", "transparent"), l(".menu-short").css("z-index", 90), l(".head-content-page").css("z-index", 100), l(".header").css("z-index", 110), i = !0
        }), "yes" != c("visit") && (t("visit", "yes", 1), l("body").addClass("splash-on"), i = !0), l(".scroll-down").on("click", function () {
            a(), l("#splash").addClass("animated slow fadeOutUp"), l(".splash-on .header").css("background-color-", "transparent"), i = !1
        }), l(d).on("wheel", function (e) {
            l("body").hasClass("menu-open") || i && 0 <= e.originalEvent.deltaY && (a(), i = !1)
        }), l(document).bind("touchstart", function (e) {
            o = e.originalEvent.touches[0].clientY
        }), l(document).bind("touchend", function (e) {
            l("body").hasClass("menu-open") || i && e.originalEvent.changedTouches[0].clientY + 5 < o && (a(), i = !1)
        }), l(".cy-carousel").each(function () {
            l(this).find(".cy-carousel-item .card").matchHeight()
        });
        // , l(d).on("scroll", function () {
        //     100 < l(this).scrollTop() ? e.fadeIn(300) : e.fadeOut(300)
        // });
        if($(".cy-carousel").length){
            l(".cy-carousel").each(function () {
                l(this).slick({autoplay: !0}), l(this).find(".cy-carousel-item .card").matchHeight({
                    byRow: !1,
                    property: "height",
                    target: null,
                    remove: !1
                })
            })
        };
    }), d.onload = function () {
        l(".item_match_height").matchHeight({byRow: !1}), l(".news-listing .card").matchHeight()
    }, l(".collapse-vandap").click(function () {
        var e = l(this), n = e.prev();
        n.slideToggle(500, function () {
            e.html(function () {
                return n.is(":visible") ? "Thu gọn <i class='icon-back'></i>" : "Câu trả lời <i class='icon-next'></i>"
            })
        })
    }), l(document).ready(function () {
        setTimeout(e, 600)
    }), l(d).resize(function () {
        setTimeout(e, 600)
    })
}(jQuery, window);
if($('.cy-mostview').length) $('.cy-mostview').slick({"slidesToShow":2,"slidesToScroll":2,"rows":2,"slidesPerRow":1,"arrows":false,"dots":true,"autoplay":true,"responsive":[{"breakpoint":768,"settings":{"slidesToShow":1,"rows":4,"slidesToScroll":1}}]});
if($('.slick-carousel-2').length) $('.slick-carousel-2').slick({"slidesToShow":2,"slidesToScroll":2,"rows":2,"slidesPerRow":1,"arrows":false,"dots":true,"autoplay":true,"responsive":[{"breakpoint":768,"settings":{"slidesToShow":1,"rows":4,"slidesToScroll":1}}]});
if($('.slick-carousel-redmor').length) $('.slick-carousel-redmor').slick({"slidesToShow":4,"slidesToScroll":1,"arrows":false,"dots":true,"autoplay":true,"responsive":[{"breakpoint":1200,"settings":{"slidesToShow":2}},{"breakpoint":576,"settings":{"slidesToShow":1}}]});
if($('.cy-carousel_111').length) $('.cy-carousel_111').slick({"slidesToShow":4,"slidesToScroll":1,"arrows":false,"dots":true,"autoplay":false,"responsive":[{"breakpoint":1200,"settings":{"slidesToShow":3}},{"breakpoint":992,"settings":{"slidesToShow":2}},{"breakpoint":480,"settings":{"slidesToShow":1}}]});
function getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
        ? match[2]
        : null;
}