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
    } else {
        window.location.href = "../"
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
    //patch product fields
    fetch("/v1/products/" + getUrlParameter('id'), {
        method: "PATCH",
        headers: {
            "authorization": localStorage.token,
            "Content-Type": "application/json",
            "Access-Control-Origin": "*"
        },
        body: JSON.stringify({
            "name": $("#grid-prod-name").val(),
            "price": $("#grid-price").val(),
            "categoryId": $("#grid-category").val(),
            "description": $("#grid-description").val(),
            "animalTargets": CsvToArr($("#grid-targets").val()),
            "colors": CsvToArr($("#grid-colors").val()),
            "sizes": CsvToArr($("#grid-sizes").val()),
            "types": [],
            "details": $("#grid-details").val(),
        })
    }).then((response) => response.json()).then(data => {
        console.log(data)
        if (img) {
            //edit image
            var send = new FormData()
            send.append('product', img)
            fetch("/v1/products/" + getUrlParameter('id') + "/picture", {
                method: "PUT",
                headers: {
                    "authorization": localStorage.token,
                    "Access-Control-Origin": "*"
                },
                body: send
            }).then((response) => response.json()).then(data => {
                console.log(data)
            })
        }
    })
});