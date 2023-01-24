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
            color: stringToColour(el._id+"as"),
            name: el.name,
            id: el._id,
            description: el.description,
          }
        ].map(Item)
      )
    })
  })
}

var stringToColour = function(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = '#';
  for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}

//item template
const Item = ({ color, name, description, id }) => `
<div class="w-full lg:w-1/2">
  <section class="m-4 bg-white border border-gray-300 border-solid rounded shadow"  style="background-color: ${color}; filter: saturate(50%)">
    <a href="?id=${id}">
      <section class="overflow-x-auto w-full">
        <div class="w-full h-48 flex items-end justify-center">
          <div class="margin-bottom: 2rem;"><h2 class="text-3xl text-slate-100 font-extrabold break-all">${name}</h2></div>
        </div>  
        <div class="w-full h-48 flex items-top justify-center">
          <div><p class="text-l text-slate-200 my-4">${description}</p></div>
        </div> 

      </section>
    </a>
  </section>
</div>
`

$(document).ready(function () {
  retrieveProducts('#forums_place')
})
