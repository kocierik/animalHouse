import { useNavigate } from 'react-router-dom'
export const redirect = (path: string) => {
  useNavigate()(path)
}
