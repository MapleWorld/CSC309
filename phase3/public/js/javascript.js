function errorMessage(urlAddress, formID, errorDivID){
	$.ajax({     
		url: urlAddress,
		type:"post",
		data:$(formID).serialize(),
		success:function(res){
			window.location = res.redirect;
			return false;
		},
		
		error:function(xhr, status, error){
			console.log(xhr.responseText);
			var err = '<div class="alert alert-danger">';
			$.each(JSON.parse(xhr.responseText) , function(i, item) {
				 err +='<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>'+item.msg;
				 err += '</br>'
			});
			err += '</div>'
			$(errorDivID).html(err);    
			return false;
		}
    
   });
}

function loginUser(formID, errorDivID){
	urlAddress = '/login';
	errorMessage(urlAddress, formID, errorDivID);
}

function registerUser(formID, errorDivID){
	urlAddress = '/register';
	errorMessage(urlAddress, formID, errorDivID);
}












