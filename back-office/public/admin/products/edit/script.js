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

$(document).ready(function () {
    var id = getUrlParameter('id');
    if (id) {
        retrieveProducts(id);
    }
});

function retrieveProducts(id) {
    var url = "/v1/products/" + id;
    fetch(url).then((response) => response.json()).then((el) => {
        console.log(el);
        $("#grid-prod-name").val(el.name);
        $("#grid-price").val(el.price);
        $("#grid-category").val(el.categoryId);
        $("#grid-description").val(el.description);
        $("#grid-targets").val(ArrToCsv(el.animalTargets));
        $("#grid-colors").val(ArrToCsv(el.colors))
        $("#grid-sizes").val(ArrToCsv(el.sizes))
        $("#grid-highlights").val(ArrToCsv(el.highlights))
        $("#grid-details").val(el.details)

        $("#imgplaceholder").attr("src", "/pictures/" + el.image.filename);
    });
}

function showImage() {
    var file = $('#grid-image').prop('files')[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        $("#imgplaceholder").attr("src", String(reader.result))
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

function ArrToCsv(arr) {
    return arr.join(", ")
}
function CsvToArr(csv) {
    return csv.replace(/\s/g, '').split(",")
}

$("#send").click(function () {
    var img = $('#grid-image').prop('files')[0];
    if (img) {

        fetch("/v1/products/" + getUrlParameter('id') + "/picture", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Origin": "*"
            },
            body: JSON.stringify({
                "file": img
            })
        }).then((response) => response.json()).then(data => {
            console.log(data);
        }).catch(function () {
            alert("ERRORE");
        });
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