$(document).ready(function() {
	$(function(){
		$("#navbars").load("navbars.html");
	});

	$('#messages_table').DataTable();

	console.log('loading messages');
	var num_messages = load_messages();

});

var accept_invite = function(row_num) {
	var table = $('#messages_table').DataTable();

	alert( 'You have accepted the invite from ' + table.row(row_num).data()[0] );
	window.location.href = "/game";
};

var reject_invite = function(row_num) {
	var table = $('#messages_table').DataTable();

	alert( 'Removing the invite from ' + table.row(row_num).data()[0] );
	/*$.ajax({
		url: "/api/delete_message",
		data: message_id,
		datatype: 'json',
		method: "post",
		success: function(){
			console.log("Game created successfully");
		},
		callback: function(){
			console.log("Game created successfully");
		},
		failure: function(){
			console.log("Could not create a game");
		},
	});*/
};

var load_messages = function() {
	var t = $('#messages_table').DataTable();
	t.clear().draw();
	$.ajax({
		url: "/api/load-messages",
		method: "post",
		success: function(data){
			console.log(data);

			// data is an arbitrary object, not an array, thus data.length returns undefined. Must use this instead
			for( var i=0; i < Object.keys(data.messages).length; i++ )
			{
				t.row.add( [
					data.messages[i].sender,
					data.messages[i].subject,
					data.messages[i].content,
					data.messages[i].type =='invite' ? '<input type="button" id="accept_invite_' + i + '" value="Accept" class="btn btn-success" onClick="accept_invite(' + i + ')">' +
						'<input type="button" id="reject_invite_' + i + '" value="Reject" class="btn btn-danger" onClick="reject_invite(' + i + ')">' : 'message'
				] ).draw( true );
			}
			return Object.keys(data.messages).length;
		},
		callback: function(){
			console.log("message data received");
		},
		failure: function(){
			console.log("error getting message data");
		},
	});
};