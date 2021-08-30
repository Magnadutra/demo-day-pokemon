import { initial } from "./pages/initial/index.js";
import { cards } from "./pages/cards/index.js";
import { battle } from "./pages/battle/index.js";
import { members } from "./pages/members/index.js"

export const renderPage = () => {
  const main = document.getElementById('root');
  const routes = {
    '/': initial,
    '/cards': cards,
    '/battle': battle,
    '/members': members,
  }
  main.innerHTML = '';
  main.appendChild(routes[window.location.pathname]());
};