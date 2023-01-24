var forumName = ""
var users = []

var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=')

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1])
    }
  }
  return false
}

function getPosts(){
  fetch(`/api/v2/community/forums/${getUrlParameter('id')}/posts`)
  .then((res)=>res.json())
  .then((data)=>{
    $("#posts_place").text("")
    console.log(data)
    var count = 0
    data.forEach(el => {
      if(el.valid){
        count++
        var user = users.find(e => e._id == el.userId)
        var pic = "/pictures/"+user.profilePicture?.filename
        $("#posts_place").append([{text: el.text, username: user.username, profilePic: pic, date: el.date, id:el._id, uid:user._id}].map(Item))
      }
    });
    if(count == 0){
      $("#posts_place").append(`
      <div class="w-full">
        <section class="m-4 bg-white">
          <section class="overflow-x-auto w-full">
            <div class="w-full h-32 flex items-center justify-center">
              <div class="margin-bottom: 2rem;"><div class="text-3xl font-extrabold break-all">No posts to show for this forum</div></div>
            </div>  
          </section>
        </section>
      </div>
      `)
    }
  })
}

async function getUsers(){
  fetch(`/api/v2/users`)
  .then((res)=>res.json())
  .then(async (data)=>{
    users = await data
    console.log(users)
  })
}

function getForumName(){
  fetch(`/api/v2/community/forums/`)
  .then((res)=>res.json())
  .then((el)=>{
    el.forEach(e => {
      if(e._id==getUrlParameter('id')){
        forumName = "Animal House - "+e.name
        window.top.document.title = forumName
        document.getElementById("title_place").innerHTML = e.name
      }
    });
  })
}

async function deletePost(pid, uid){
  if (confirm('Are you sure you want to remove this post?')) {
    await fetch(`/api/v2/users/${uid}/posts/${pid}`, {
      method: 'DELETE',
      headers: {
        authorization: localStorage.bo_token
      }
    })
    window.location.reload()
  }
}

//item template
const Item = ({ text, username, profilePic, date, id, uid }) => `
<div class="w-full lg:w-1/3">
  <section class="m-4 border border-gray-300 border-solid rounded shadow">
    <section class="overflow-x-auto w-full">
      <div class="w-full h-32 flex items-center justify-center">
        <div class="m-4 h-12 w-16 block flex flex-row items-center">
          <img class="rounded-lg" src="${profilePic}" onerror="this.onerror=null; this.src='/backoffice/favicon.ico'" alt="${username} picture">
        </div>
        <div class="margin-bottom: 2rem;">
          <div class="text-2xl font-bold break-all">${username}</div>
          <div class="text-xs break-all">${date}</div>
        </div>
      </div>  
      <div class="w-full h-64 flex items-top justify-center">
        <div><p class="text-l m-8 text-justify">${text}</p></div>
      </div>
      <div class="w-full h-8 flex items-end justify-center">
        <button class="text-l m-8" style="color:red; text-decoration:underline;" onclick="deletePost('${id}','${uid}')"><i class="bi bi-trash"></i></button>
      </div>  
    </section>
  </section>
</div>
`

$(document).ready(async function () {
  await getUsers()
  getForumName()
  getPosts()
})
