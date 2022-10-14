//TODO FIX SOME ERRS ON ASYNC RESPONSE

$("#addProduct").click(function () {
    var img = $('#grid-image').prop('files')[0];
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
        fetch("/v1/market/products", {
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