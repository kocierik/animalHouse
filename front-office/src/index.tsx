import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from 'react-router-dom'
import './index.scss'
import App from './App'

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Router>
    <App />
  </Router>,
);