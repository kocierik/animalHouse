//https://stackoverflow.com/questions/19491336/how-to-get-url-parameter-using-jquery-or-plain-javascript
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};

function retrieveProducts(id) {
    var url = "/v1/products/" + id;
    fetch(url).then((response) => response.json()).then((data) => {
        data.forEach(function (el) {
            console.log(el);
            $("#grid-prod-name").val(el.name);
            $("#grid-price").val(el.price);
            $("#grid-category").val(el.categoryId);
            $("#grid-description").val(el.description);
            //$("#grid-quantity").val(el.stock); TODO
            $("#imgPlaceholder").attr("src", el.image);

        });
    });
}

$(document).ready(function () {
    var id = getUrlParameter('id');
    if (id) {
        retrieveProducts(id);
    }
});

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
            "image": "/public/products/" + getUrlParameter('id') + ".jpg"
        };
        console.log(data);
        /*fetch("/v1/products", {
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
        */
    }
});