import "./Nav.style.scss";
import { push } from "@router";

export default function Nav({ $target, initailState }) {
  const $nav = document.createElement("nav");
  $nav.classList.add("nav");

  this.state = initailState || {
    routes: [],
  };

  this.render = () => {
    const { routes } = this.state;

    $nav.innerHTML = `
      <div class="nav__button"></div>
      <ul class="menu">
        ${routes
          .map(
            ({ name, path }) =>
              `<li class="menu__item"><a href="${path}">${name}</a></li>`
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

  $nav.addEventListener("click", (e) => {
    e.preventDefault();

    const $button = e.target.closest(".nav__button");

    if ($button) {
      $nav.classList.toggle("nav--open");

      setTimeout(() => {
        $nav.classList.toggle("nav--open");
      }, 3000);
    }
  });
}
