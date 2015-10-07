
(function() {
    $(function(){
      console.log("called");
      $("#navbars").load("navbars.html", function() {
          $('#sidebar').hide();
      });
    });

    $(document).ready(function () {

        $('#register-form').validate({
            rules: {
                username: {
                    required: true,
                    minlength: 2,
                    maxlength: 15,
                    alphanumeric: true
                },
                email: {
                    required: true,
                    email: true
                },
                password: {
                    required: true,
                    minlength: 6,
                    maxlength: 15,
                },
                verify_password: {
                    required: true,
                    equalTo: '#register-password'
                }

            },
            messages: {
                email: "Invalid email address"
            },
            errorPlacement: function(error, element) {
                if(typeof $(element).data('errorList') == "undefined") {
                    $(element).data('errorList', []);
                }

                if($(element).val() == '') {
                    $(element).closest('.form-group').removeClass('input-error').addClass('success');
                    $(element).popover('disable');
                    $(element).popover('hide');
                    $(element).removeData('errorList');
                    return;
                }

                var errorList = $(element).data('errorList');
                var i = 0;
                var existed = false;
                for(i = 0; i < errorList.length; i++) {
                    if($(error).text() == errorList[i]) {
                        return;
                    }
                }

                errorList.push($(error).text());

                var newList = $(document.createElement('ul'));
                for(i = 0; i < errorList.length; i++) {
                    var newelement = $(document.createElement('li'));
                    newelement.text(errorList[i]);
                    newList.append(newelement);
                }

                $(element).popover('destroy');
                $(element).popover({
                    placement: "right",
                    content: newList.prop('outerHTML'),
                    html: true,
                    trigger: "focus"
                });
                $(element).popover('enable');
            },
            highlight: function(element) {
                $(element).closest('.form-group').removeClass('success').addClass('input-error');
            },
            unhighlight: function(element) {
                $(element).closest('.form-group').removeClass('input-error').addClass('success');
            },
            success: function (label, element) {
                $(element).text('OK!').addClass('valid').closest('.control-group').removeClass('error').addClass('success');
                $(element).popover('disable');
                $(element).removeData('errorList');
            }
        });
    });

    var setCookie = function(cname, cvalue, exdays) {
        var expires = "expires="+exdays.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    };

    var addAlert = function(obj, type, text) {
            var classes = 'alert ';

            console.log(type);

            if(type === 'success') {
                    console.log("up here");
                    classes = classes + 'alert-success ';
            } else if(type === 'info') {
                    console.log("and here");
                    classes = classes + 'alert-info ';
            } else if(type === 'warning') {
                    console.log('here?');
                    classes = classes + 'alert-warning ';
            } else if(type === 'danger') {
                    console.log("prolly not here");
                    classes = classes + 'alert-danger ';
            } else {
                    console.log("here")
                    classes = classes + 'alert-info ';
            }

            console.log(classes);

            newobj = $(document.createElement('div'))
                    .addClass(classes)
                    .attr('data-dismiss', 'alert')
                    .text(text);

            console.log(obj);
            obj.append(newobj);
    };

    $('#login-button').click(function() {
        var loginForm = $("#loginForm");
        var data = loginForm.serializeArray();
        console.log(data);
        var new_data = {};

        var i;
        for (i = 0; i < data.length; i++) {
            new_data[data[i]["name"]] = data[i]["value"];
        }
        console.log(new_data);

        $.ajax({
            url: "/api/login",
            datatype: "json",
            data: new_data,
            method: "post",
            success: function(){
                alert("login successful");
                console.log("login successful");
            },
            callback: function(){
                alert("login successful");
                console.log("login successful");
            },
            failure: function(){
                alert("login unsuccessful");
                console.log("login unsuccessful");
            },
        });

        document.location.href = '/profile';
    });

    $('#register-button').click(function() {
        var registerForm = $("#register-form");
        var validator = $('#register-form').validate();

        if(!registerForm.valid()) {
            addAlert($('#alert-field'), "danger", "Invalid registration data! All fields required!");
            return;
        }

        var data = registerForm.serializeArray();

        var new_data = {};

        var i;
        for (i = 0; i < data.length; i++) {
            new_data[data[i]["name"]] = data[i]["value"];
        }

        $.ajax({
            url: "/api/create-login",
            datatype: "json",
            data: new_data,
            method: "post",
            success: function(res){
                if(res.success) {
                        console.log("account created");
                        addAlert($('#alert-field'), 'success', "Success! Redirecting to profile page...");
                        var expiryDate = new Date();
                        expiryDate.setMinutes(expiryDate.getMinutes() + 30);
                        setCookie('token', res.token, expiryDate);
                        setTimeout(function() {window.location.href = '/profile';}, 3000);
                } else {
                        console.log(res.message);
                        addAlert($('#alert-field'), 'danger', res.message);
                }
            }
        });
    });

})();