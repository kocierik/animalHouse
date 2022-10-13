function encodeImageFileAsURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        var reader = new FileReader();
        reader.onloadend = function () {
            //console.log(String(reader.result));
            imgString = String(reader.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
var imgString = "";         //stringa usata per immagazzinare l'immagine da inviare; TODO: implementare salvataggio immagine su server e usare path sul DB
$("#grid-image").change(function () {
    encodeImageFileAsURL(this);
});

//TODO FIX SOME ERRS ON ASYNC RESPONSE

$("#addProduct").click(function () {
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
        "image": imgString
    };
    console.log(data);
    fetch("/v1/market/products", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    }).then((response) => response.json()).then(data => {
        //console.log(data);
        window.location.assign("../");
        //$("#productPostResult").html("<h3>Here is the product you added</h3>");
        //$("#productPostResult").append([{ displaySize: '-md-12', img: data.image, name: data.name, price: data.price, id: data._id }].map(Item));
        //retrieveProduct('#productDeleteItems', "");
    }).catch(function () {
        alert("ERRORE");
    });
});