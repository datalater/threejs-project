import "./Nav.style.scss";
import { push } from "@router";

export default function Nav({ $target, initailState }) {
  const $nav = document.createElement("nav");

  this.state = initailState || {
    routes: [],
  };

  this.render = () => {
    const { routes } = this.state;

    $nav.innerHTML = `
      <ul class="nav">
        ${routes
          .map(
            ({ name, path }) =>
              `<li class="nav__item"><a href="${path}">${name}</a></li>`
          )
          .join("")}
      </ul>
    `;

    $target.appendChild($nav);
  };

  this.render();

  $nav.addEventListener("click", (e) => {
    e.preventDefault();

    const $page = e.target.closest("a");

    if ($page) {
      push($page.href);
    }
  });
}
