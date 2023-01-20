async function doLogin() {
  if (localStorage.token) {
    if (localStorage.prevPage) {
      window.location.href = localStorage.prevPage
      localStorage.removeItem("prevPage")
    } else {
      window.location.href = "/backoffice"
    }
    return
  }
  const username = $('#usernameInput').val()
  const password = $('#passwordInput').val()

  const url = "/api/v2/admins/login"

  if (username && username !== "" && password && password !== "") {
    localStorage.user = username
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const body = await response.json()
    if (response.status >= 200 && response.status < 300) {
      localStorage.token = body.token
      if (localStorage.prevPage) {
        window.location.href = localStorage.prevPage
        localStorage.removeItem("prevPage")
      } else {
        window.location.href = "/backoffice"
      }
    } else {
      localStorage.removeItem("user")
      $("#errorDiv").text(body.mex)
    }
  }
}

function loginCheck() {
  if (!localStorage.token) {
    if (!window.location.href.includes("login"))
      localStorage.prevPage = window.location.href
    window.location.href = "/backoffice/login"
  }
}
function logout() {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  window.location.href = "/backoffice"
}
