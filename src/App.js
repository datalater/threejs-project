import "./assets/globalStyle.scss";
import "./App.style.scss";
import { Nav } from "@components";
import { initRouter, routes, render } from "@router";

export default function App({ $target }) {
  const $main = document.createElement("main");
  $main.classList.add("main");

  new Nav({
    $target,
    initailState: {
      routes,
    },
  });

  this.route = () => {
    $main.innerHTML = "";

    const { pathname } = window.location;

    render({ path: pathname, $target: $main });

    $target.appendChild($main);
  };

  initRouter(() => this.route());

  this.route();
}
