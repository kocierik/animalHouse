function retrieveUsers(target) {
    var url = "/v1/users/";
    fetch(url, {
        headers: {
            'authorization': localStorage.token
        }
    }).then((response) => response.json()).then((data) => {
        $(target).text("");

        data.forEach(function (el) {
            console.log(el)
            pic = "/favicon.ico"
            let addr = ""
            if (el.profilePicture)
                pic = "/pictures/" + el.profilePicture.filename
            if (el.address != undefined) {
                el.address.street != " " ? addr+=el.address.street + ", " : ""
                el.address.city != " " ? addr+=el.address.city + ", " : ""
                el.address.zip != " " ? addr+=el.address.zip + ", " : ""
                el.address.country != " " ? addr+= el.address.country : ""
            }
            $(target).append([{ username: el.username, firstName: el.firstName, lastName: el.lastName, id: el._id, email: el.email, address: addr, picture: pic }].map(Item));
        });
    });
}
function userRemove(username, id) {
    if (confirm('Are you sure you want to remove the user ' + username + " | " + id + '?')) {
        fetch("/v1/users/" + id, {
            method: "DELETE",
            headers: {
                "authorization": localStorage.token
            }
        })
        retrieveUsers('#itemList');
    }
}

//item template
const Item = ({ username, firstName, lastName, id, email, address, picture }) => `
<tr>
    <td class="p-2 py-8 border-b border-solid border-gray-300">
        <div class="pl-4 flex flex-wrap flex-row items-center">
            <div class="mr-4 h-16 w-16 block flex flex-row items-center">
                <img class="rounded-lg" src="${picture}" onerror="this.onerror=null; this.src='/favicon.ico' alt="${username}\'s picture"></div>
            <div class="mr-4 h-16 w-48 block flex flex-row items-center text-gray-700">${username}</div>
            <div class="mr-4 h-16 w-48 block flex flex-row items-center text-gray-700">${firstName}</div>
            <div class="mr-4 h-16 w-48 block flex flex-row items-center text-gray-700">${lastName}</div>
            <div class="mr-4 h-16 w-48 block flex flex-row items-center text-gray-700">${email}</div>
            <div class="mr-4 h-16 w-64 block flex flex-row items-center text-gray-700">${address}</div>

        </div>

    </td>
    <td class="text-right p-2 pr-4 border-b border-solid border-gray-300 text-gray-700">
        <a href="edit/?id=${id}"><i class="bi bi-pencil"></i></a>
        &nbsp;&nbsp;
        <button onclick='userRemove("${username}","${id}")'><i class="bi bi-trash"></i></button>
    </td>
</tr>
`;

$(document).ready(function () {
    retrieveUsers('#itemList');
});