$(document).ready(function () {

    //Preloader
    var preloader = $('.preloader');

    $(window).on('load', function() {
        preloader.fadeOut(800);
    });

    //AOS
    AOS.init();

    /*Nav icon mobile*/
    $('#humbuger_icon').click(function(){
        $(this).toggleClass('open');
        $('.navmain_collapse').toggleClass('open');
        $('.overlay').toggleClass('open');
        $('html , body').toggleClass('open_menu');
    });

    /* When user clicks outside */
    $(".overlay").click(function() {
        $(this).toggleClass('open');
        $("#humbuger_icon").toggleClass("open");
        $(".navmain_collapse").toggleClass("open");
        $('html , body').toggleClass('open_menu');
    });



    //Scroll to
    var itemMenu = $('.js_scroll');

    $(itemMenu).click(function (e) {
        e.preventDefault(); // prevent hard jump, the default behavior

        var target = $(this).attr("href"); // Set the target as variable

        // perform animated scrolling by getting top-position of target-element and set it as scroll target
        $('html, body').stop().animate({
            scrollTop: $(target).offset().top
        }, 600, function() {
            //location.hash = target; //attach the hash (#jumptarget) to the pageurl
        });

        return false;
    })

    $('.ajax-loader,.alert-success').hide();
    $("#form_info").validate({
        rules: {
            name_company: "required",
            name_user: "required",
            phone: {
                required: true,
                minlength: 9
            },
            email: {
                required: true,
                email: true
            },
            detail: "required",
            accept: "required",
        },
        messages: {
            name_company: {
                required: "会社名を入力してください。"
            },
            name_user: {
                required: "ご担当者名を入力してください。",
            },
            phone: {
                required: "電話番号を入力してください。",
                minlength: "電話番号が不正です。"
            },
            email: {
                required: "メールアドレスを入力してください。",
                email : "メールアドレスが不正です。",
            },
            detail: {
                required: "詳細を入力してください。",
            },
            accept: "必要項目です。",
        },
        errorElement: "em",
        errorPlacement: function ( error, element ) {
            // Add the `help-block` class to the error element
            error.addClass( "help-block" );

            if ( element.prop( "type" ) === "checkbox" ) {
                error.insertAfter( element.parent( "label" ) );
            } else {
                error.insertAfter( element );
            }
        },
        highlight: function ( element, errorClass, validClass ) {
            $( element ).parents( ".col-sm-8" ).addClass( "error " ).removeClass( "has-success" );
        },
        unhighlight: function (element, errorClass, validClass) {
            $( element ).parents( ".col-sm-8" ).addClass( "has-success" ).removeClass( "error" );
        },
        submitHandler : function (form) {
            $(".ajax-loader").show("slow");
            var company_name = $( "#form_info_company_name" ).val();
			var representative = $( "#form_info_representative" ).val();
			var tel = $( "#form_info_phone" ).val();
			var email = $( "#form_info_email" ).val();
			var content = $( "#form_info_detail" ).val();
			var sitetype = $("input[name='gridRadios']:checked").val();
			$.ajax({
			    type: 'POST',
				url:"sendmail.php",
				data: {company_name: company_name, representative: representative, tel: tel, email: email, content: content, sitetype: sitetype},
				success: function(rs){
                    $(".ajax-loader").hide();
                    $("#form_info").trigger("reset");
                    $(".alert-success").show( "slow");
                    $(".alert-success").delay(10000).hide(0);
			　　}
		  });	
        }
    });
});