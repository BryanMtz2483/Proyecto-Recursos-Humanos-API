window.onload = init;

function init(){
    if(!localStorage.getItem("token")){
        document.querySelector('.btn-secondary').addEventListener('click', function (){
            window.location.href = "login.html";
        });
        document.querySelector('.btn-primary').addEventListener('click', signin);
    }else{
        window.location.href= "rh.html";
    }    
}

function signin(){
    var name = document.getElementById('input-name').value;
    var mail = document.getElementById('input-mail').value;
    var pass = document.getElementById('input-password').value;
    console.log(mail,pass);
    
    if(mail && pass && name){    
        axios({
            method:'post',
            url: 'http://localhost:3000/user/signin',
            data: {
                user_name: name,
                user_mail: mail,
                user_password: pass
            }
        }).then( function(res){
            console.log(res);
            alert("Registered Successfully");
            window.location.href="login.html";
        }).catch(function(err){
            console.log(err);
        })
    }else{
        alert("Incomplete Fields");
    }
}