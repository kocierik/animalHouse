function retrieveUsers(target) {
    var url = "/v1/users/";
    fetch(url, {
        headers: {
            'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoRGF0YSI6eyJ1c2VybmFtZSI6InRhcGFyaW5obyIsImlkIjoiNjM1MTFiY2E4ZGIwM2ZkM2FlNjgwNzg0In0sImlhdCI6MTY2NjI2MTEyNH0.sFzoOm7Te87ig9vH_pTmPiV14qs0vuz9UxB-0XVjwr8'
        }
    }).then((response) => response.json()).then((data) => {
        $(target).text("");

        data.forEach(function (el) {
            $(target).append([{ username: el.username, firstName: el.firstName, lastName: el.lastName, id: el._id, email: el.email, phone: el.phone, address: el.address }].map(Item));
        });
    });
}
function userRemove(id) {
    if (confirm('Are you sure you want to remove the product ' + id + '?')) {
        $.ajax({
            url: "/v1/users/" + id,
            type: 'DELETE',
            success: function (result) {
                //alert(result);
                retrieveUsers('#itemList');
            }
        });
    }
}

//item template
const Item = ({ username, firstName, lastName, id, email, phone, address }) => `
<tr>
    <td class="p-2 py-8 border-b border-solid border-gray-300">
        <div class="pl-4 flex flex-wrap flex-row items-center">
            <div class="mr-4 h-16 w-16 block flex flex-row items-center">
                <img class="rounded-lg" src="/favicon.ico"></div>
            <div class="mr-4 h-16 w-48 block flex flex-row items-center text-gray-700">${username}</div>
            <div class="mr-4 h-16 w-48 block flex flex-row items-center text-gray-700">${firstName}</div>
            <div class="mr-4 h-16 w-48 block flex flex-row items-center text-gray-700">${lastName}</div>
            <div class="mr-4 h-16 w-48 block flex flex-row items-center text-gray-700">${email}</div>
            <div class="mr-4 h-16 w-48 block flex flex-row items-center text-gray-700">${phone}</div>
            <div class="mr-4 h-16 w-64 block flex flex-row items-center text-gray-700">${address}</div>

        </div>

    </td>
    <td class="text-right p-2 pr-4 border-b border-solid border-gray-300 text-gray-700">
        <a href="view/?id=${id}"><i class="bi bi-eye-fill"></i></a>
        &nbsp;&nbsp;
        <a href="edit/?id=${id}"><i class="bi bi-pencil"></i></a>
        &nbsp;&nbsp;
        <button onclick=itemRemove("${id}")><i class="bi bi-trash"></i></button>
    </td>
</tr>
`;

$(document).ready(function () {
    retrieveUsers('#itemList');
});