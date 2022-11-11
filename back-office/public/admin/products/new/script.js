//TODO FIX SOME ERRS ON ASYNC RESPONSE
//TODO SEND IMAGE TO API

$("#addProduct").click(function () {
    //var img = $('#grid-image').prop('files')[0];
    let img = document.getElementById("grid-image").files[0];
    if (img) {
        var headers = {
            "Content-Type": "application/json",
            "Access-Control-Origin": "*"
        }
        var data = {
            "name": $("#grid-prod-name").val(),
            "price": $("#grid-price").val(),
            "categoryId": $("#grid-category").val(),
            "description": $("#grid-description").val(),
            "animalTargets": [],
            "image": img
        };
        console.log(data);
        fetch("/v1/products", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        }).then((response) => response.json()).then(data => {
            //console.log(data);
            window.location.assign("../");
        }).catch(function () {
            alert("ERRORE");
        });
    }
});


function showImage() {
    var file = $('#grid-image').prop('files')[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        //console.log(reader.result);
        document.getElementById("imgplaceholder").innerHTML = "<img src='" + String(reader.result) + "'>";

    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}
