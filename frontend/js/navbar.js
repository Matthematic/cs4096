(function() {
    $.ajax({
        url: "/api/load-messages",
        method: "post",
        success: function(data){
            if(data.success == true) {
                console.log("data received");
                console.log(data);

                for( var i=0; i < data.length; i++ )
                {
                    $('#message_list').prepend('<li>' +
                        '<a href="#">' +
                        '<div>' +
                        '<strong>From:' + data[i].sender + '</strong>' +
                        '<span class="pull-right text-muted">' +
                        '<em>To:' + data[i].receiver +'</em>' +
                        '</span></div>' +
                        '<div>' + data[i].content + '</div></a></li>'
                    );
                }
            } else {
                console.log("error getting message data");
            }
        }
    });

	$.ajax({
		url: "/api/load-username-display",
		method: "post",
		success: function(data){
			console.log("data received");
			console.log(data);
			$("#userNameDisplay").html(function(index, oldhtml) {
				return data + oldhtml;
			});
		},
		callback: function(){
			console.log("data received");
		},
		failure: function(){
			console.log("error getting data");
		},
	});

	function getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1);
			if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
		}
		return "";
	}

	function deleteAllCookies() {
		var cookies = document.cookie.split(";");

		for (var i = 0; i < cookies.length; i++) {
			var cookie = cookies[i];
			var eqPos = cookie.indexOf("=");
			var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
			document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
		}
	}

	// check for cookie token
	var token = getCookie('token');
	if(token != "") {
		$('#profile-logged-out').hide();
	} else {
		$('#alerts').hide();
		$('#tasks').hide();
		$('#messages').hide();
		$('#friends').hide();
		$('#profile-logged-in').hide();
		var path = window.location.pathname;
		var page = path.split("/").pop();
		if (page != "") {
			window.location.href = "/";
		}
	}



})()