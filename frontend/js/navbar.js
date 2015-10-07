(function() {
	$.ajax({
		url: "/api/load-messages",
		method: "post",
		success: function(data){
			console.log("data received");
			console.log(data);

			// data is an arbitrary object, not an array, thus data.length returns undefined. Must use this instead
			for( var i=0; i < Object.keys(data).length; i++ )
			{
				$('#message_list').prepend('<li>' +
					'<a href="#">' +
					'<div>' +
					'<em>From: <strong>' + data.messages[i].sender + '</strong></em>' +
					'<span class="pull-right text-muted">' +
					'</span></div>' +
					'<div>' + data.messages[i].content + '</div></a></li>'
				);
			}
		},
		callback: function(){
			console.log("message data received");
		},
		failure: function(){
			console.log("error getting message data");
		},
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
		$('#profile-logged-in').hide();
	}



})()