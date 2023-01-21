export const redirect = (path: string) => {
  if (import.meta.env.NODE_ENV === 'localhost') window.location.href = path
  else window.location.href = `${import.meta.env.BASE_URL}${path}`
}
