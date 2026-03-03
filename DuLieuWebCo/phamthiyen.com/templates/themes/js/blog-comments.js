$(function () {
    $("body").on("click", ".comment-reply-link", function(event){
        let $this = $(this);
        let $replyTitle = $('#reply-title');
        $replyTitle.removeClass('d-none');
        $replyTitle.find('a.name').text($this.data('name'));
        $('.parent_id').val($this.data('reply'));
        $(window).scrollTop($(".sec-views").offset().top - 200);
    });

    $('#cancel-comment-reply-link').on('click', () => {
        let $replyTitle = $('#reply-title');
        $replyTitle.addClass('d-none');
        $('.parent_id').val(0);
    })
    $('.reload-captcha').on('click', function (){
        let image = $('.img-captcha');
        let $this = $(this);
        $this.text('Loading');
        $.ajax({
            url: $this.data('url'),
            success: function(result){
                image.attr('src', result.img);
                $this.text('Lấy mã khác');
            }
        });
    });


    $('.btn-load-more-comments').on('click', function (){
        let $this = $(this);
        let url = $this.data('url'), page = parseInt($this.data('page')), postId = $this.data('post-id');
        $this.attr('disable', true);
        $('.spinner-border', $this).removeClass('d-none');
        $.ajax({
            type: "GET",
            url: url,
            data: {
                page: page + 1,
                postId: postId,
            },
            dataType: "json",
            success: function(res){
                let data = res.data;
                if(data.length){
                    $this.data('page', page + 1);
                    $('#comment-posts').append(res.data);
                    $this.attr('disable', false);
                    $('.spinner-border', $this).addClass('d-none');
                }else{
                    $this.remove();
                }
            }
        });
    });
});
