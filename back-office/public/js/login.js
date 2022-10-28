async function doLogin() {
  const username = $('#usernameInput').val()
  const password = $('#passwordInput').val()

  const url = "/v1/admins/login"

  if (username && username !== "" && password && password !== "") {
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
      window.location = "/index.html"
    } else {
      $("#errorDiv").text(body.mex)
    }
  }
}

function loginCheck() {
  if (!localStorage.token) {
    window.location.href = "/login.html"
  }
}
function logout() {
  localStorage.removeItem("token")
}
