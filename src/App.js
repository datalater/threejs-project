import "./assets/globalStyle.scss";
import "./App.style.scss";
import Nav from "./components/Nav";
import { Fullscreen, Earth } from "./pages";
import { initRouter, routes } from "./router";

export default function App({ $target }) {
  const $main = document.createElement("main");
  $main.classList.add("main");

  this.state = {};

  this.setState = (nextState) => {
    this.state = nextState;
  };

  new Nav({
    $target,
    initailState: {
      routes,
    },
  });

  const fullscreen = new Fullscreen({ $target: $main });
  const earth = new Earth({ $target: $main });

  const renderFuctions = {
    "/": () => fullscreen.render(),
    "/fullscreen": () => fullscreen.render(),
    "/earth": () => earth.render(),
  };

  this.route = () => {
    $main.innerHTML = "";

    const { pathname } = window.location;

    (renderFuctions[pathname] || renderFunctions["/"])();
  };

  initRouter(() => this.route());

  $target.appendChild($main);
}
