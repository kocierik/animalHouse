import swal from 'sweetalert'

export const saveResult = () => {
  const score: number = JSON.parse(localStorage.getItem('game-state-4')).score
  console.log(score)
  swal({
    title: 'Do you want save your result?',
    text: 'Login to save your result!',
    icon: 'success',
    buttons: true,
    dangerMode: false,
  }).then((willSaved) => {
    if (willSaved) {
      window.location.href = '/login'
      swal('Poof!', {
        icon: 'success',
      })
    } else {
      swal('Poof!')
    }
  })
}
