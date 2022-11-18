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

function retrieveUser(id) {
    var url = "/v1/users/" + id;
    fetch(url, {
        headers: {
            'authorization': localStorage.token
        }
    }).then((response) => response.json()).then((el) => {
        console.log(el);
        $("#grid-firstName").val(el.firstName);
        $("#grid-lastName").val(el.lastName);
        $("#grid-category").val(el.categoryId);
        $("#grid-description").val(el.description);
        $("#grid-email").val(el.email);
        $("#grid-username").val(el.username);
        if (el.address) {
            $("#grid-street").val(el.address.street);
            $("#grid-city").val(el.address.city);
            $("#grid-zip").val(el.address.zip);
            $("#grid-country").val(el.address.country);
        }


        let img = el.profilePicture;
        if (img) {
            $("#imgplaceholder").attr("src", "/pictures/" + img.filename);
        } else {
            $("#imgplaceholder").attr("src", "/favicon.ico");
        }
    });
}

$(document).ready(function () {
    var id = getUrlParameter('id');
    if (id) {
        retrieveUser(id);
    } else {
        window.location.href = "../"
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

$("#send").click(function () {
    fetch("/v1/users/" + getUrlParameter('id'), {
        method: "PATCH",
        headers: {
            "authorization": localStorage.token,
            "Content-Type": "application/json",
            "Access-Control-Origin": "*"
        },
        body: JSON.stringify({
            "firstName": $("#grid-firstName").val(),
            "lastName": $("#grid-lastName").val(),
            "username": $("#grid-username").val(),
            "description": $("#grid-description").val(),
            "email": $("#grid-email").val(),
            "street": $("#grid-street").val(),
            "city": $("#grid-city").val(),
            "zip": $("#grid-zip").val(),
            "country": $("#grid-country").val(),
        })
    })
    let img = $('#grid-image').prop('files')[0];
    if (img) {
        var send = new FormData()
        send.append("profile", img)
        fetch("/v1/users/" + getUrlParameter('id') + "/picture", {
            method: "PUT",
            headers: {
                "Access-Control-Origin": "*",
                "authorization": localStorage.token,
            },
            body: send
        })
    }
});