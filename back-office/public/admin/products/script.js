function retrieveProduct(target, id) { //leave id blank to retrieve all products
    var url = "/v1/market/products/" + id;
    fetch(url).then((response) => response.json()).then((data) => {
        $(target).text("");

        data.forEach(function (el) {
            $(target).append([{ img: el.image, name: el.name, price: el.price, id: el._id }].map(Item));
        });
    });
}
function itemRemove(id) {
    if (confirm('Are you sure you want to remove the product ' + id + '?')) {
        $.ajax({
            url: "/v1/market/products/" + id,
            type: 'DELETE',
            success: function (result) {
                //alert(result);
                retrieveProduct('#itemList', "");
            }
        });
    }
}

//item template
const Item = ({ img, name, price, id }) => `
<tr>
    <td class="p-2 py-4 border-b border-solid border-gray-300">
        <div class="pl-4 flex flex-wrap flex-row items-center">
            <div class="mr-4 h-12 w-12 bg-red-600 rounded-full block flex flex-row justify-center items-center text-white">
                <img src="${img}"></div>
            <div class="text-gray-700">${name}</div>
            <div class="text-gray-700">${price}</div>
        </div>

    </td>
    <td class="text-right p-2 pr-4 border-b border-solid border-gray-300 text-gray-700">
        <button><i class="bi bi-pencil"></i></button>
        &nbsp;&nbsp;
        <button onclick=itemRemove("${id}")><i class="bi bi-trash"></i></button>
    </td>
</tr>
`;

$(document).ready(function () {
    retrieveProduct('#itemList', "");
});