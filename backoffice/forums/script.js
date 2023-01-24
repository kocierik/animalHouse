function retrieveProducts(target) {
  var url = '/api/v2/community/forums/'
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      $(target).text('')
      data.forEach(function (el) {
        console.log(el)
        var img = '/backoffice/favicon.ico'
        if (el.image) img = '/pictures/' + el.image.filename
        $(target).append(
          [
            {
              name: el.name,
              id: el._id,
              description: el.description,
            }
          ].map(Item)
        )
      })
    })
  }

//item template
const Item = ({ name, description, id }) => `
<div class="w-full lg:w-1/2">
  <section class="m-4 bg-white border border-gray-300 border-solid rounded shadow">
    <a href="?id=${id}">
      <section class="overflow-x-auto w-full">
        <div class="w-full h-96 flex items-center justify-center">
          <div class="margin-bottom: 2rem;"><h2 class="text-3xl font-extrabold break-all">${name}</h2></div>
          <div><p class="text-l font-bold">${description}</p></div>
        </div>  
      </section>
    </a>
  </section>
</div>
`

$(document).ready(function () {
  retrieveProducts('#forums_place')
})
