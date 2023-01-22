
getCustomersNumber()
getLocationsNumber()

function getCustomersNumber(){
    var url = "/api/v2/users/";
    fetch(url, {
        headers: {
            'authorization': localStorage.bo_token
        }
    }).then((response) => response.json()).then((data) => {
        document.getElementById("customers_place").innerHTML = data.length
    });
}

function getLocationsNumber(){
    var url = "/api/v2/locations/";
    fetch(url, {
        headers: {
            'authorization': localStorage.bo_token
        }
    }).then((response) => response.json()).then((data) => {
        document.getElementById("locations_place").innerHTML = data.length
    });
}