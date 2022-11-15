function ArrToCsv(arr) {
    return arr.join(", ")
}
function CsvToArr(csv) {
    return csv.replace(/\s/g, '').split(",")
}

$("#send").click(function () {
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
            "animalTargets": CsvToArr($("#grid-targets").val()),
            "colors": CsvToArr($("#grid-colors").val()),
            "sizes": CsvToArr($("#grid-sizes").val()),
            "types": [],
            "details": $("#grid-details").val(),
            "image": "/favicon.ico"
            //TODO: implement highlights
            //TODO: implement image upload
        };
        console.log(data);
        fetch("/v1/products", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        }).then((response) => response.json()).then(data => {
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
        $("#imgplaceholder").attr("src", String(reader.result))
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}
