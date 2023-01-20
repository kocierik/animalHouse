
getCustomersNumber()

function getCustomersNumber(){
    var url = "/api/v2/users/";
    fetch(url, {
        headers: {
            'authorization': localStorage.token
        }
    }).then((response) => response.json()).then((data) => {
        document.getElementById("customers_place").innerHTML = data.length
    });
}