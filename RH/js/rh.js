window.onload = init;
var headers = {}
var url = "http://localhost:3000"

function init (){
    if(localStorage.getItem("token")){
        token = localStorage.getItem("token");
        headers = {
            headers: {'Authorization': "bearer " +localStorage.getItem("token")}
        }
        loadEmployees();
    }else{
        window.location.href = "index.html";
    }
}

function loadEmployees(){
    axios.get(url + "/employees", headers)
    .then(function(res){
        console.log(res);
        displayEmployees(res.data.message);
    }).catch(function(err){
        console.log(err);
    })
}
function displayEmployees(employees){
    var empdisplay = document.getElementById("empdisplay");
    for(var i=0; i < employees.length; i++){
        empdisplay.innerHTML += `<h3>${employees[i].id} - ${employees[i].name} - ${employees[i].last_name} - ${employees[i].phone} - ${employees[i].email} - ${employees[i].address}</h3>`
    }
}