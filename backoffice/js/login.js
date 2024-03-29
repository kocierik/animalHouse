async function doLogin() {
  if (localStorage.bo_token) {
    if (localStorage.prevPage) {
      window.location.href = localStorage.prevPage
      localStorage.removeItem('prevPage')
    } else {
      window.location.href = '/backoffice'
    }
    return
  }
  const username = $('#usernameInput').val()
  const password = $('#passwordInput').val()

  const url = '/api/v2/admins/login'

  if (username && username !== '' && password && password !== '') {
    localStorage.bo_user = username
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
      localStorage.bo_token = body.token
      if (localStorage.prevPage) {
        window.location.href = localStorage.prevPage
        localStorage.removeItem('prevPage')
      } else {
        window.location.href = '/backoffice'
      }
    } else {
      localStorage.removeItem('user')
      swal("Error",body.mex, "error")
    }
  }
}

function loginCheck() {
  if (!localStorage.bo_token) {
    if (!window.location.href.includes('login')) localStorage.prevPage = window.location.href
    window.location.href = '/backoffice/login'
  }
}
function logout() {
  localStorage.removeItem('bo_token')
  localStorage.removeItem('bo_user')
  localStorage.removeItem('userId')
  window.location.href = '/backoffice'
}
