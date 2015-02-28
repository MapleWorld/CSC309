function saveUser(){
       
   $.ajax({     
			url:"/register",
			type:"post",
			data:$("#the-form").serialize(),
			success:function(res){
				window.location.reload();
				return false;
			},
			
			error:function(xhr, status, error){
				console.log(xhr.responseText);
				var err = '';
				$.each(JSON.parse(xhr.responseText) , function(i, item) {
					 err +='<li>'+item.msg+'</li>';
				});
				$(".err-area").html(err);    
				return false;
			}
        
       });
}