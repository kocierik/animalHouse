function ArrToCsv(arr) {
    return arr.join(", ")
}
function CsvToArr(csv) {
    return csv.replace(/\s/g, '').split(",")
}

$("#send").click(function () {
    let img = $('#grid-image').prop('files')[0];
    if (img) {
        fetch("/v1/products", {
            method: "POST",
            headers: {
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
            var send = new FormData()
            send.append("product", img)
            //window.location.assign("../");
            console.log(data)
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
