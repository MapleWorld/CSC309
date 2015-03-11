function loginUserForm(){
       
   $.ajax({     
			url:"/login",
			type:"post",
			data:$("#login-form").serialize(),
			success:function(res){
				window.location = res.redirect;
				return false;
			},
			
			error:function(xhr, status, error){
				console.log(xhr.responseText);
				var err = '';
				$.each(JSON.parse(xhr.responseText) , function(i, item) {
					 err +='<li>'+item.msg+'</li>';
				});
				$(".login-form-err-area").html(err);    
				return false;
			}
        
       });
}

function loginUserPage(){
       
   $.ajax({     
			url:"/login",
			type:"post",
			data:$("#login-page").serialize(),
			success:function(res){
				window.location = res.redirect;
				return false;
			},
			
			error:function(xhr, status, error){
				console.log(xhr.responseText);
				var err = '';
				$.each(JSON.parse(xhr.responseText) , function(i, item) {
					 err +='<li>'+item.msg+'</li>';
				});
				$(".login-page-err-area").html(err);    
				return false;
			}
        
       });
}

function registerUser(){
       
   $.ajax({     
			url:"/register",
			type:"post",
			data:$("#register-form").serialize(),
			success:function(res){
				window.location = res.redirect;
				return false;
			},
			
			error:function(xhr, status, error){
				console.log(xhr.responseText);
				var err = '';
				$.each(JSON.parse(xhr.responseText) , function(i, item) {
					 err +='<li>'+item.msg+'</li>';
				});
				$(".register-err-area").html(err);    
				return false;
			}
        
       });
}